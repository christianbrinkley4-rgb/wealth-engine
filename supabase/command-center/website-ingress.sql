-- Additive integration for T65 Daily Command Center ONLY.
-- Do not apply the unrelated wealth-engine supabase/schema.sql to that project.
-- Applied remotely through Supabase's migration tool; this is the reviewed SQL source.

create table public.website_ingress_keys (
  name text primary key,
  key_sha256 text not null check (key_sha256 ~ '^[a-f0-9]{64}$'),
  active boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.website_ingress_keys enable row level security;
revoke all on public.website_ingress_keys from public, anon, authenticated;
grant select on public.website_ingress_keys to service_role;

create table public.website_inquiries (
  id uuid primary key default gen_random_uuid(),
  request_key text not null unique check (request_key ~ '^[a-f0-9]{64}$'),
  lead_id uuid not null references public.leads(id) on delete cascade,
  received_at timestamptz not null default now(),
  source text not null,
  interest_topic text,
  payload jsonb not null check (jsonb_typeof(payload) = 'object'),
  requires_review boolean not null default false
);
create index website_inquiries_lead_idx on public.website_inquiries(lead_id, received_at desc);
alter table public.website_inquiries enable row level security;
revoke all on public.website_inquiries from public, anon, authenticated;
grant select, insert on public.website_inquiries to service_role;
comment on table public.website_inquiries is 'Website-only inquiry and permission audit. No purchased list is treated as an opt-in.';

create or replace function public.capture_website_inquiry(p_request_key text, p_payload jsonb)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_id uuid;
  v_inquiry_id uuid;
  v_email text := lower(trim(p_payload->>'email'));
  v_phone text := nullif(p_payload->>'phone_number', '');
  v_source text := p_payload->>'source';
  v_topic text := coalesce(p_payload->>'interest_topic', 'calculator');
  v_permission boolean := coalesce((p_payload->>'consent_given')::boolean, false);
  v_sms boolean := coalesce((p_payload->>'sms_consent')::boolean, false);
  v_match_ids uuid[];
  v_review boolean := false;
  v_note text;
  v_existing public.website_inquiries%rowtype;
begin
  if p_request_key is null or p_request_key !~ '^[a-f0-9]{64}$' or
    jsonb_typeof(p_payload) is distinct from 'object' or octet_length(p_payload::text) > 32768 or
    v_email is null or v_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' or
    length(v_email) > 254 or v_source is null or
    v_source not in ('help_quiz', 'wizard_completion', 'roth_calculator', 'about_page_cta') or
    (v_phone is not null and v_phone !~ '^[0-9]{10}$') then
    raise exception 'Invalid website inquiry' using errcode = '22023';
  end if;

  -- Serialize matching and creation without changing or locking imported lead rows.
  -- One short transaction covers the inquiry, lead, activity and follow-up task.
  perform pg_advisory_xact_lock(hashtextextended('website-inquiry', 0));
  select * into v_existing from public.website_inquiries where request_key = p_request_key;
  if found then
    return jsonb_build_object('stored', true, 'duplicate', true, 'requires_review', v_existing.requires_review);
  end if;

  select array_agg(id) into v_match_ids from public.leads
  where lower(trim(email)) = v_email
    or (v_phone is not null and (
      right(regexp_replace(coalesce(phone, ''), '[^0-9]', '', 'g'), 10) = v_phone or
      right(regexp_replace(coalesce(phone2, ''), '[^0-9]', '', 'g'), 10) = v_phone
    ));

  if cardinality(v_match_ids) = 1 then
    v_id := v_match_ids[1];
    select do_not_call or coalesce(callable = false, false) into v_review from public.leads where id = v_id;
  else
    -- Ambiguous household/shared-phone matches stay separate for a human to reconcile.
    v_review := coalesce(cardinality(v_match_ids), 0) > 1;
    insert into public.leads (name, phone, email, zip, source, assigned_to, lead_type,
      status, stage_bucket, callable, ptc_on_file, sms_consent, email_consent, tags, notes)
    values (coalesce(nullif(trim(p_payload->>'full_name'), ''), 'Website inquiry'),
      v_phone, v_email, p_payload->>'zip_code', 'Website', 'Christian',
      case when p_payload#>>'{quiz_answers,medicare_stage}' = 'turning_65_soon' then 'T65'
        when v_topic = 'medicare' then 'Medicare' when v_topic = 'life_insurance' then 'Life'
        when v_topic = 'care_coverage' then 'Care' else 'Retirement' end,
      'New', 'Unscheduled', v_permission and v_phone is not null and not v_review,
      v_permission, v_sms and v_phone is not null, v_permission,
      array['Website', v_topic], 'Inbound website inquiry. See activity history for answers, source and permission proof.')
    returning id into v_id;
  end if;

  insert into public.website_inquiries(request_key, lead_id, source, interest_topic, payload, requires_review)
    values (p_request_key, v_id, v_source, v_topic, p_payload, v_review) returning id into v_inquiry_id;

  v_note := 'WEBSITE INQUIRY — assigned to Christian' || E'\n' ||
    'Topic: ' || v_topic || E'\n' ||
    'Name: ' || coalesce(p_payload->>'full_name', '(not provided)') || E'\n' ||
    'Email: ' || v_email || E'\nPhone: ' || coalesce(v_phone, '(not provided)') || E'\n' ||
    'ZIP: ' || coalesce(p_payload->>'zip_code', '(not provided)') || E'\n' ||
    'Answers: ' || coalesce((p_payload->'quiz_answers')::text, '{}') || E'\n' ||
    'Campaign: ' || coalesce((p_payload->'attribution')::text, '{}') || E'\n' ||
    'Call/email permission for selected topic: ' || v_permission::text || E'\n' ||
    'Text permission: ' || v_sms::text || E'\n' ||
    'Consent wording: ' || coalesce(p_payload->>'consent_text', '(none)') || E'\n' ||
    'Text consent wording: ' || coalesce(p_payload->>'sms_consent_text', '(none)') || E'\n' ||
    'Consent version/time: ' || coalesce(p_payload->>'consent_version', '(none)') || ' / ' || coalesce(p_payload->>'consent_at', '(none)') || E'\n' ||
    'Inquiry reference: ' || v_inquiry_id::text ||
    case when v_review then E'\nREVIEW REQUIRED: existing contact restriction or ambiguous match. Do not initiate automated outreach.' else '' end;

  insert into public.activity_log(lead_id, activity_type, outcome, notes, logged_by)
    values (v_id, 'Website Inquiry', 'Inbound request', v_note, 'Website');
  insert into public.lead_actions(lead_id, action_type, due_at, note, status, created_by, assigned_to)
    values (v_id, 'Other', now(),
      case when v_review then 'Review contact restriction / matching before responding. ' else 'Review new website inquiry and arrange a conversation. ' end || v_note,
      'pending', 'Website', 'Christian');
  return jsonb_build_object('stored', true, 'duplicate', false, 'requires_review', v_review);
end;
$$;
revoke all on function public.capture_website_inquiry(text, jsonb) from public, anon, authenticated;
grant execute on function public.capture_website_inquiry(text, jsonb) to service_role;
