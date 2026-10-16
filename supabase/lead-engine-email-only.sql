-- Staging-only transition after Christian selected Resend email, no SMS.
-- Retains every synthetic lead and historical job. No contacts are deleted.
begin;
alter table public.engine_alerts drop constraint engine_alerts_status_check;
alter table public.engine_alerts add constraint engine_alerts_status_check
  check (status in ('pending','sending','sent','needs_attention','cancelled'));
update public.engine_alerts set status='cancelled', last_error='sms_disabled_by_owner',
  lease_token=null, lease_until=null
  where channel='sms' and status in ('pending','needs_attention');
create or replace function public.capture_engine_lead(p_id uuid, p_fingerprint text, p_payload jsonb)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare existing public.engine_leads%rowtype;
begin
  if p_id is null or p_fingerprint is null or p_fingerprint !~ '^[a-f0-9]{64}$'
    or p_payload is null or jsonb_typeof(p_payload) <> 'object'
    or octet_length(p_payload::text) > 10000
    or coalesce(p_payload->>'source','') not in ('medicare-fit','medicare-review')
    or coalesce(p_payload->>'phone','') !~ '^[2-9][0-9]{2}[2-9][0-9]{6}$'
    or coalesce(p_payload->>'zip','') !~ '^[0-9]{5}$'
    or coalesce(length(trim(p_payload->>'name')),0) not between 1 and 120
    or p_payload->>'consent' is distinct from 'true'
    or p_payload->>'consent_version' is distinct from '2026-10-15.v1'
  then raise exception 'Invalid request' using errcode = '22023'; end if;
  -- An idempotency key is bound to one validated payload for its entire lifetime.
  perform pg_advisory_xact_lock(hashtextextended(p_id::text,0));
  select * into existing from public.engine_leads where id = p_id;
  if found then
    if existing.fingerprint <> p_fingerprint then raise exception 'Id conflict' using errcode = '23505'; end if;
    return jsonb_build_object('stored',true,'id',p_id,'duplicate',true);
  end if;
  insert into public.engine_leads(id,fingerprint,payload) values (p_id,p_fingerprint,p_payload);
  insert into public.engine_alerts(lead_id,channel) values (p_id,'email');
  return jsonb_build_object('stored',true,'id',p_id,'duplicate',false);
end; $$;
create or replace function public.claim_engine_alerts(p_lead_id uuid default null)
returns table(id uuid,lead_id uuid,channel text,payload jsonb,lease_token uuid)
language plpgsql security invoker set search_path = '' as $$
begin
  -- A crash on the final lease must become visible to an operator.
  update public.engine_alerts a set status = 'needs_attention',
    last_error = 'final_worker_lease_expired', lease_token = null, lease_until = null
    where a.status = 'sending' and a.attempts >= 12 and a.lease_until < now();
  return query with candidates as (
    select a.id from public.engine_alerts a
    where a.channel = 'email' and (p_lead_id is null or a.lead_id = p_lead_id)
      and a.attempts < 12
      and ((a.status = 'pending' and a.next_attempt_at <= now())
        or (a.status = 'sending' and a.lease_until < now()))
    order by a.next_attempt_at limit 10 for update skip locked
  ), claimed as (
    update public.engine_alerts a set status = 'sending', attempts = a.attempts + 1,
      lease_until = now() + interval '2 minutes', lease_token = gen_random_uuid()
    from candidates c where a.id = c.id
    returning a.id,a.lead_id,a.channel,a.lease_token
  ) select c.id,c.lead_id,c.channel,
      jsonb_build_object('name',l.payload->>'name','phone',l.payload->>'phone','zip',l.payload->>'zip','source',l.payload->>'source'),c.lease_token
    from claimed c join public.engine_leads l on l.id = c.lead_id;
end; $$;
commit;
