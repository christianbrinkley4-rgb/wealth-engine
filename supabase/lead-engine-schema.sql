-- Portable Postgres schema. Apply only to the dedicated lead-engine staging database.
-- Existing Supabase databases and the CRM are outside this schema's scope.
begin;
create table public.engine_leads (
  id uuid primary key,
  fingerprint text not null check (fingerprint ~ '^[a-f0-9]{64}$'),
  payload jsonb not null check (jsonb_typeof(payload) = 'object'),
  received_at timestamptz not null default now(),
  status text not null default 'new' check (status in ('new','contacted','booked','enrolled','closed'))
);
create table public.engine_alerts (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.engine_leads(id) on delete cascade,
  channel text not null check (channel in ('email','sms')),
  status text not null default 'pending' check (status in ('pending','sending','sent','needs_attention','cancelled')),
  attempts integer not null default 0,
  next_attempt_at timestamptz not null default now(),
  lease_until timestamptz,
  lease_token uuid,
  provider_id text,
  last_error text,
  sent_at timestamptz,
  unique (lead_id, channel)
);
create index engine_alerts_pending on public.engine_alerts(status, next_attempt_at);
alter table public.engine_leads enable row level security;
alter table public.engine_alerts enable row level security;
revoke all on public.engine_leads, public.engine_alerts from public;

create function public.capture_engine_lead(p_id uuid, p_fingerprint text, p_payload jsonb)
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

create function public.claim_engine_alerts(p_lead_id uuid default null)
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

create function public.finish_engine_alert(p_id uuid,p_lease_token uuid,p_sent boolean,p_provider_id text,p_error text)
returns boolean language plpgsql security invoker set search_path = '' as $$
begin
  update public.engine_alerts set
    status = case when p_sent then 'sent' when attempts >= 12 then 'needs_attention' else 'pending' end,
    provider_id = left(p_provider_id,200), last_error = left(p_error,200),
    sent_at = case when p_sent then now() else null end,
    next_attempt_at = now() + interval '1 minute' * least(360,power(2,least(attempts,9))::integer),
    lease_until = null, lease_token = null
  where id = p_id and lease_token = p_lease_token and status = 'sending';
  return found;
end; $$;

create function public.engine_queue_health()
returns jsonb language sql security invoker set search_path = '' as $$
  select jsonb_build_object(
    'pending',count(*) filter (where status='pending'),
    'needs_attention',count(*) filter (where status='needs_attention' or (status='sending' and lease_until < now())),
    'oldest_pending',min(next_attempt_at) filter (where status='pending')
  ) from public.engine_alerts;
$$;
revoke all on function public.capture_engine_lead(uuid,text,jsonb), public.claim_engine_alerts(uuid), public.finish_engine_alert(uuid,uuid,boolean,text,text), public.engine_queue_health() from public;
-- Supabase predefines these roles. Neon uses the private server-side owner connection.
do $permissions$
declare role_name text;
begin
  foreach role_name in array array['anon','authenticated'] loop
    if exists(select 1 from pg_roles where rolname=role_name) then
      execute format('revoke all on public.engine_leads,public.engine_alerts from %I',role_name);
      execute format('revoke all on function public.capture_engine_lead(uuid,text,jsonb),public.claim_engine_alerts(uuid),public.finish_engine_alert(uuid,uuid,boolean,text,text),public.engine_queue_health() from %I',role_name);
    end if;
  end loop;
  if exists(select 1 from pg_roles where rolname='service_role') then
    grant select,insert,update,delete on public.engine_leads,public.engine_alerts to service_role;
    grant execute on function public.capture_engine_lead(uuid,text,jsonb),public.claim_engine_alerts(uuid),public.finish_engine_alert(uuid,uuid,boolean,text,text),public.engine_queue_health() to service_role;
  end if;
end; $permissions$;
commit;
