-- Additive to website-delivery-outbox.sql on T65 Daily Command Center ONLY.
-- Project lyvhrxiukmlvrznkrtkv. Do not apply to supabase/schema.sql.
--
-- Stores the exact message the website already tried to send, then lets a
-- worker claim failed_retryable rows, re-check suppression, and resend.
-- Pending rows with no snapshot are a missing sender, not a lost email: they
-- become a task rather than looping.

alter table public.website_delivery_outbox
  add column if not exists recipient text,
  add column if not exists subject text,
  add column if not exists body_text text,
  add column if not exists reply_to text,
  add column if not exists claimed_until timestamptz;

create or replace function public.mark_website_delivery(
  p_outbox_id uuid, p_status text, p_error text default null, p_provider_id text default null,
  p_recipient text default null, p_subject text default null, p_body_text text default null,
  p_reply_to text default null)
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

  if v_row.status = 'sent' then
    return jsonb_build_object('marked', false, 'reason', 'already_sent', 'status', 'sent');
  end if;

  update public.website_delivery_outbox
    set status = p_status,
        attempts = attempts + 1,
        provider_id = coalesce(p_provider_id, provider_id),
        last_error = case when p_status = 'sent' then null else left(p_error, 500) end,
        recipient = coalesce(nullif(left(p_recipient, 254), ''), recipient),
        subject = coalesce(nullif(left(p_subject, 200), ''), subject),
        body_text = coalesce(nullif(left(p_body_text, 8000), ''), body_text),
        reply_to = coalesce(nullif(left(p_reply_to, 254), ''), reply_to),
        claimed_until = null,
        updated_at = now()
    where id = p_outbox_id
    returning * into v_row;

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
drop function if exists public.mark_website_delivery(uuid, text, text, text);
revoke all on function public.mark_website_delivery(uuid, text, text, text, text, text, text, text)
  from public, anon, authenticated;
grant execute on function public.mark_website_delivery(uuid, text, text, text, text, text, text, text)
  to service_role;

create or replace function public.claim_website_deliveries(p_limit integer default 10)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_row public.website_delivery_outbox%rowtype;
  v_claimed jsonb := '[]'::jsonb;
  v_review boolean;
  v_consent boolean;
  v_dnc boolean;
  v_found boolean;
begin
  if p_limit is null or p_limit < 1 then p_limit := 1; end if;
  if p_limit > 20 then p_limit := 20; end if;

  for v_row in
    select *
      from public.website_delivery_outbox
     where status in ('pending', 'failed_retryable')
       and job in ('owner_alert', 'prospect_reply')
       and attempts < 5
       and created_at > now() - interval '72 hours'
       and (claimed_until is null or claimed_until < now())
     order by created_at
     for update skip locked
     limit p_limit
  loop
    select wi.requires_review,
           coalesce((wi.payload->>'consent_given')::boolean, false),
           coalesce(l.do_not_call, false)
      into v_review, v_consent, v_dnc
      from public.website_inquiries wi
      join public.leads l on l.id = v_row.lead_id
     where wi.id = v_row.inquiry_id;
    v_found := found;

    if v_found is not true then
      perform public.mark_website_delivery(v_row.id, 'failed_permanent', 'inquiry missing at retry');
      continue;
    end if;

    if v_row.job = 'prospect_reply'
       and (v_review is true or v_consent is not true or v_dnc is true) then
      perform public.mark_website_delivery(v_row.id, 'failed_permanent', 'suppressed at retry');
      continue;
    end if;

    if v_row.status = 'pending'
       and coalesce(v_row.body_text, '') = ''
       and v_row.created_at < now() - interval '20 minutes' then
      perform public.mark_website_delivery(v_row.id, 'failed_permanent', 'sender was not configured');
      insert into public.lead_actions(lead_id, action_type, due_at, note, status, created_by, assigned_to)
        values (v_row.lead_id, 'Other', now(),
          'The website could not email this inquiry (sender not configured). Contact them another way before assuming they heard back.',
          'pending', 'Website', 'Christian');
      continue;
    end if;

    if coalesce(v_row.body_text, '') = '' or coalesce(v_row.recipient, '') = '' then
      if v_row.attempts >= 4 then
        perform public.mark_website_delivery(v_row.id, 'failed_permanent', 'no message snapshot to retry');
      end if;
      continue;
    end if;

    update public.website_delivery_outbox
       set claimed_until = now() + interval '3 minutes', updated_at = now()
     where id = v_row.id;

    v_claimed := v_claimed || jsonb_build_array(jsonb_build_object(
      'id', v_row.id,
      'job', v_row.job,
      'recipient', v_row.recipient,
      'subject', v_row.subject,
      'body_text', v_row.body_text,
      'reply_to', v_row.reply_to
    ));
  end loop;

  return v_claimed;
end;
$$;
revoke all on function public.claim_website_deliveries(integer) from public, anon, authenticated;
grant execute on function public.claim_website_deliveries(integer) to service_role;
