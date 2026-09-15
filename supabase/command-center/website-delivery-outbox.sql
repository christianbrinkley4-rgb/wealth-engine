-- NOT APPLIED. Reviewed SQL source for the website delivery outbox.
-- Additive to supabase/command-center/website-ingress.sql in the T65 Daily
-- Command Center project ONLY. Do not apply the unrelated wealth-engine
-- supabase/schema.sql to that project.
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

create table public.website_delivery_outbox (
  id uuid primary key default gen_random_uuid(),
  inquiry_id uuid not null references public.website_inquiries(id) on delete cascade,
  lead_id uuid not null references public.leads(id) on delete cascade,
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

-- Enqueue the deliveries an inquiry owes. Called from capture_website_inquiry
-- after the inquiry row exists.
--
-- prospect_reply is withheld when the contact needs review, when there is no
-- email permission on file, or when the lead is marked do-not-contact. That
-- decision lives here, once, rather than in every caller.
create or replace function public.enqueue_website_deliveries(
  p_inquiry_id uuid, p_lead_id uuid, p_requires_review boolean, p_email_consent boolean)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_jobs text[] := array['owner_alert', 'meta_capi'];
  v_outbox jsonb := '{}'::jsonb;
  v_row public.website_delivery_outbox%rowtype;
begin
  if p_requires_review is not true and p_email_consent is true then
    v_jobs := v_jobs || 'prospect_reply';
  end if;

  foreach v_row.job in array v_jobs loop
    insert into public.website_delivery_outbox(inquiry_id, lead_id, job)
      values (p_inquiry_id, p_lead_id, v_row.job)
      on conflict (inquiry_id, job) do update set job = excluded.job
      returning * into v_row;
    v_outbox := v_outbox || jsonb_build_object(v_row.job, v_row.id::text);
  end loop;

  return v_outbox;
end;
$$;
revoke all on function public.enqueue_website_deliveries(uuid, uuid, boolean, boolean)
  from public, anon, authenticated;
grant execute on function public.enqueue_website_deliveries(uuid, uuid, boolean, boolean)
  to service_role;

-- Record the outcome of one delivery.
--
-- 'sent' is terminal and wins: a row already sent ignores every later report,
-- which is what stops a replay from producing a second email to the same person.
-- A row the website reports on is never re-opened, only closed or left claimable.
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

-- Edge Function contract (website-inquiry), for whoever applies this:
--
--   Request : { "action": "mark_delivery", "outbox_id": <uuid>,
--               "status": "sent" | "failed_retryable" | "failed_permanent",
--               "error": <string|null>, "provider_id": <string|null> }
--   Response: { "marked": <bool>, "status": <string> }
--
-- The existing "capture" action gains one field in its response:
--
--   { "stored": true, "duplicate": <bool>, "requires_review": <bool>,
--     "outbox": { "owner_alert": <uuid>, "prospect_reply": <uuid>, "meta_capi": <uuid> } }
--
-- "outbox" must be omitted or empty for a duplicate, so a retried submission
-- cannot re-send anything. The website already short-circuits on duplicate; this
-- keeps the two sides agreeing rather than relying on one of them.
--
-- The website treats "outbox" as optional throughout: without it, capture and
-- email behave exactly as they do today and nothing is marked.
