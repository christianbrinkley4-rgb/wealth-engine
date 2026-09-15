-- Reviewed deployed definition for T65 Daily Command Center, project lyvhrxiukmlvrznkrtkv.
-- Applied remotely: website_delivery_outbox; website_mark_delivery; website_capture_returns_outbox.
-- Edge Function website-inquiry version 3 deployed with verify_jwt disabled (custom website key).
-- Additive to supabase/command-center/website-ingress.sql in the T65 Daily
-- Command Center project ONLY. Do not apply the unrelated wealth-engine
-- supabase/schema.sql to that project.
-- Do not rerun the CREATE TABLE against the existing deployment.
--
-- Why this exists: the website can tell Resend to send a prospect auto-reply,
-- but until now nothing recorded whether it arrived. A 5xx, a 429 or a dropped
-- connection left a visitor promised an email that never came, with no record
-- of the failure and nothing to retry from. This gives each delivery a row, an
-- outcome, and an identity that makes a replay safe.
--
-- The website never decides suppression. It asks for ids; this function decides
-- which jobs exist. A contact under review gets no prospect_reply row at all, so
-- no later retry can produce one.
--
-- Apply in the order the sections appear. Section 3 replaces the
-- capture_website_inquiry already deployed by website-ingress.sql, and that
-- version references the table in section 1, so the table and
-- enqueue_website_deliveries must exist first.

-- ===========================================================================
-- 1. The queue
-- ===========================================================================

create table public.website_delivery_outbox (
  id uuid primary key default gen_random_uuid(),
  inquiry_id uuid not null references public.website_inquiries(id) on delete cascade,
  lead_id uuid not null references public.leads(id) on delete cascade,
  -- meta_capi is a permitted value so a later task can enqueue it without an
  -- ALTER, but nothing enqueues it today. See the note in section 2.
  job text not null check (job in ('owner_alert', 'prospect_reply', 'meta_capi')),
  status text not null default 'pending'
    check (status in ('pending', 'sent', 'failed_retryable', 'failed_permanent')),
  attempts integer not null default 0,
  provider_id text,
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- One row per job per inquiry. This, not a timestamp, is what makes a replay
  -- idempotent: a second capture of the same request_key finds the same rows.
  unique (inquiry_id, job)
);
create index website_delivery_outbox_pending_idx
  on public.website_delivery_outbox(status, created_at)
  where status in ('pending', 'failed_retryable');
alter table public.website_delivery_outbox enable row level security;
revoke all on public.website_delivery_outbox from public, anon, authenticated;
grant select, insert, update on public.website_delivery_outbox to service_role;
comment on table public.website_delivery_outbox is
  'One row per owed delivery per website inquiry. sent is terminal; failed_permanent is not retried.';

-- ===========================================================================
-- 2. Enqueue
-- ===========================================================================

-- Enqueue the deliveries an inquiry owes. Called from capture_website_inquiry
-- after the inquiry row exists.
--
-- prospect_reply is withheld when the contact needs review, when there is no
-- email permission on file, or when the lead is marked do-not-contact. That
-- decision lives here, once, rather than in every caller. do_not_call is the
-- only contact restriction recorded on a lead, so it is read as a restriction
-- on automated contact of any kind. `callable` is deliberately NOT consulted:
-- website-ingress.sql sets it false for a consenting visitor who left no phone
-- number, which says nothing about whether they may be emailed.
--
-- meta_capi is NOT enqueued. The website's lib/metaCapi.ts returns void -- it
-- cannot tell "posted" from "skipped because the pixel is unconfigured" -- so
-- such a row could never be marked and would sit pending forever, which is
-- exactly the state a retry worker claims as owed work. Re-posting a
-- conversion event that may already have been sent would double-count it.
-- Enqueue meta_capi only once the website reports an outcome for it.
create or replace function public.enqueue_website_deliveries(
  p_inquiry_id uuid, p_lead_id uuid, p_requires_review boolean, p_email_consent boolean)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_jobs text[] := array['owner_alert'];
  v_job text;
  v_outbox jsonb := '{}'::jsonb;
  v_id uuid;
  v_restricted boolean;
begin
  select coalesce(do_not_call, false) into v_restricted
    from public.leads where id = p_lead_id;

  if p_requires_review is not true
    and p_email_consent is true
    and coalesce(v_restricted, true) is not true then
    v_jobs := v_jobs || 'prospect_reply';
  end if;

  foreach v_job in array v_jobs loop
    insert into public.website_delivery_outbox(inquiry_id, lead_id, job)
      values (p_inquiry_id, p_lead_id, v_job)
      on conflict (inquiry_id, job) do update set job = excluded.job
      returning id into v_id;
    v_outbox := v_outbox || jsonb_build_object(v_job, v_id::text);
  end loop;

  return v_outbox;
end;
$$;
revoke all on function public.enqueue_website_deliveries(uuid, uuid, boolean, boolean)
  from public, anon, authenticated;
grant execute on function public.enqueue_website_deliveries(uuid, uuid, boolean, boolean)
  to service_role;

-- ===========================================================================
-- 3. Capture, with the outbox attached
-- ===========================================================================

-- REPLACES the capture_website_inquiry deployed by website-ingress.sql. The
-- body below is that function unchanged except for the three lines marked
-- ADDED; if either copy is edited, both must be. No table in
-- website-ingress.sql is altered.
--
-- A duplicate returns before the enqueue and therefore carries no "outbox" key
-- at all. That is what stops a resubmitted form from producing a second email.
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
  v_outbox jsonb := '{}'::jsonb;  -- ADDED
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
    -- No "outbox" key: the deliveries for this inquiry were queued the first time.
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

  -- ADDED. Bookkeeping must never cost a lead: if the queue is unavailable the
  -- inquiry, the activity entry and Christian's task are still committed, no
  -- ids are returned, and the website sends and behaves exactly as it did
  -- before this file existed. The warning is the signal that a deploy is
  -- half-applied; it carries no contact data.
  begin
    v_outbox := public.enqueue_website_deliveries(v_inquiry_id, v_id, v_review, v_permission);
  exception when others then
    raise warning 'website delivery outbox unavailable for inquiry %', v_inquiry_id;
    v_outbox := '{}'::jsonb;
  end;

  -- ADDED: 'outbox'.
  return jsonb_build_object('stored', true, 'duplicate', false, 'requires_review', v_review,
    'outbox', v_outbox);
end;
$$;
revoke all on function public.capture_website_inquiry(text, jsonb) from public, anon, authenticated;
grant execute on function public.capture_website_inquiry(text, jsonb) to service_role;

-- ===========================================================================
-- 4. Record an outcome
-- ===========================================================================

-- Record the outcome of one delivery.
--
-- 'sent' is terminal and wins: a row already sent ignores every later report,
-- which is what stops a replay from producing a second email to the same person.
-- A row the website reports on is never re-opened, only closed or left claimable.
--
-- This function sends nothing. It writes one row and, for a permanently failed
-- prospect reply, one task for a human. There is no mail, HTTP or queue call
-- anywhere in it, so no caller can turn a delivery report into a delivery.
create or replace function public.mark_website_delivery(
  p_outbox_id uuid, p_status text, p_error text default null, p_provider_id text default null)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_row public.website_delivery_outbox%rowtype;
begin
  if p_status not in ('sent', 'failed_retryable', 'failed_permanent') then
    raise exception 'Invalid delivery status' using errcode = '22023';
  end if;

  select * into v_row from public.website_delivery_outbox where id = p_outbox_id for update;
  if not found then
    return jsonb_build_object('marked', false, 'reason', 'unknown_outbox_id');
  end if;

  -- Already delivered. Report success and change nothing.
  if v_row.status = 'sent' then
    return jsonb_build_object('marked', false, 'reason', 'already_sent', 'status', 'sent');
  end if;

  update public.website_delivery_outbox
    set status = p_status,
        attempts = attempts + 1,
        provider_id = coalesce(p_provider_id, provider_id),
        last_error = case when p_status = 'sent' then null else left(p_error, 500) end,
        updated_at = now()
    where id = p_outbox_id
    returning * into v_row;

  -- A prospect reply that failed for good is worth a human's attention: the
  -- visitor was told on screen that an email was coming.
  if v_row.job = 'prospect_reply' and p_status = 'failed_permanent' then
    insert into public.lead_actions(lead_id, action_type, due_at, note, status, created_by, assigned_to)
      values (v_row.lead_id, 'Other', now(),
        'Automated reply to this website inquiry could not be delivered: ' ||
          coalesce(left(p_error, 300), 'no detail from provider') ||
          '. Contact them another way before assuming they heard back.',
        'pending', 'Website', 'Christian');
  end if;

  return jsonb_build_object('marked', true, 'status', v_row.status, 'attempts', v_row.attempts);
end;
$$;
revoke all on function public.mark_website_delivery(uuid, text, text, text)
  from public, anon, authenticated;
grant execute on function public.mark_website_delivery(uuid, text, text, text) to service_role;

-- ===========================================================================
-- 5. Contracts
-- ===========================================================================
--
-- Edge Function contract (website-inquiry), implemented in
-- supabase/functions/website-inquiry/index.ts:
--
--   Request : { "action": "mark_delivery", "outbox_id": <uuid>,
--               "status": "sent" | "failed_retryable" | "failed_permanent",
--               "error": <string|null>, "provider_id": <string|null> }
--   Response: { "marked": <bool>, "status": <string|null> }
--
--   400 for a malformed outbox_id or an unknown status, before any database
--   call. 401 without a valid x-website-key, as for every other action.
--   "marked": false with a 200 is the normal answer for an id that is already
--   sent or no longer exists; neither is an error the website should retry.
--
-- The existing "capture" action gains one field in its response:
--
--   { "stored": true, "duplicate": <bool>, "requires_review": <bool>,
--     "outbox": { "owner_alert": <uuid>, "prospect_reply": <uuid> } }
--
-- "outbox" is omitted or empty for a duplicate, so a retried submission cannot
-- re-send anything. The Edge Function strips it from a duplicate response as
-- well, so a stale copy of either side cannot cause a second send.
--
-- The website treats "outbox" as optional throughout: without it, capture and
-- email behave exactly as they do today and nothing is marked.
--
-- ---------------------------------------------------------------------------
-- Contract for the retry worker (NOT built by this task)
-- ---------------------------------------------------------------------------
--
-- The worker runs on the Command Center side, where suppression and consent
-- already live. The website must not gain a retry loop: it has no scheduler,
-- and a Netlify function that retries is a second sender with no shared state.
--
-- What the worker may claim:
--
--   select id, inquiry_id, lead_id, job, attempts
--     from public.website_delivery_outbox
--    where status in ('pending', 'failed_retryable')
--      and job in ('owner_alert', 'prospect_reply')
--      and attempts < 5
--      and created_at > now() - interval '72 hours'
--    order by created_at
--    for update skip locked
--    limit 20;
--
--   - status 'sent' and 'failed_permanent' are terminal. Never claim them.
--   - job 'meta_capi' is never claimed. Nothing enqueues it, and a conversion
--     event the website may already have posted must not be posted again.
--   - 'pending' includes rows the website never reported on, which is the
--     normal outcome when an email channel is unconfigured or the mark call
--     itself failed. The worker cannot tell those apart from a lost send, so
--     it must send through the same idempotency key (the outbox id) and
--     accept that a provider-side duplicate check is the last line.
--
-- What the worker must do with an outcome:
--
--   select public.mark_website_delivery(<outbox id>, <status>, <error>, <provider id>);
--
--   The same function the website calls. 'sent' is terminal, so a worker and
--   the website reporting on the same row cannot produce two deliveries.
--
-- What the worker still needs and does not have yet:
--
--   1. The message body. This table stores an outcome, not an email. The
--      worker must be able to rebuild the owner alert and the prospect reply
--      from public.website_inquiries.payload (it holds full_name,
--      interest_topic, quiz_answers and the consent wording), or a
--      body/subject column must be added to this table at enqueue time. The
--      second is the safer design: a reply rebuilt weeks later from a payload
--      can drift from what the visitor was told they would receive.
--   2. A sending credential inside the Command Center project. The Resend key
--      is a website environment variable today. A worker must have its own,
--      and it must not be read or copied by any task in this queue.
--   3. A re-check of suppression at send time, not only at enqueue time. A
--      lead marked do_not_call an hour after the inquiry must not receive a
--      reply the worker had already claimed.
--   4. A decision on 'pending' owner alerts when the website simply has no
--      email channel configured, which is a configuration problem a retry
--      cannot fix and should raise a task rather than loop.
