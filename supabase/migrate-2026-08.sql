-- ---------------------------------------------------------------------------
-- Run this in Supabase Dashboard → SQL Editor → New Query. Safe to re-run.
--
-- What it does:
--   1. Adds consent-proof columns, so you can show what someone agreed to.
--   2. Adds ad attribution, so you can tell which campaign produced a lead.
--   3. Adds a lead_events table for partial (abandoned) quiz sessions.
--   4. Drops the RLS insert policy that let anyone holding the public anon key
--      write rows into `leads`. Your API writes with the service role key,
--      which bypasses RLS, so nothing of yours depends on that policy.
--   5. Retires the source and topic values the site no longer uses.
--   6. Adds separate SMS consent columns — permission to call is not
--      permission to text.
--   7. Adds a reminders queue, so someone who turns 65 next June becomes a
--      lead next February instead of being lost today.
--
-- Old columns from the retired dossier product are deliberately left in place:
-- dropping them is destructive, and they cost nothing sitting empty. Clean them
-- up later once you've confirmed nothing references them.
-- ---------------------------------------------------------------------------

-- 1. Proof of consent -------------------------------------------------------
alter table public.leads add column if not exists consent_text text;
alter table public.leads add column if not exists consent_version text;
alter table public.leads add column if not exists consent_ip text;
alter table public.leads add column if not exists consent_user_agent text;
alter table public.leads add column if not exists consent_at timestamptz;

-- 2. Where the lead came from ----------------------------------------------
alter table public.leads add column if not exists attribution jsonb;

-- 3. Follow-up workflow -----------------------------------------------------
alter table public.leads add column if not exists status text default 'new';
alter table public.leads drop constraint if exists leads_status_check;
alter table public.leads
  add constraint leads_status_check
  check (status in ('new', 'contacted', 'booked', 'client', 'closed') or status is null);

create index if not exists leads_status_idx on public.leads(status);
create index if not exists leads_attribution_campaign_idx
  on public.leads((attribution ->> 'utm_campaign'));

-- 4. Partial sessions -------------------------------------------------------
-- Someone who answered the questions and then stalled at the contact step.
-- No contact details and no consent, so this is analytics, not a lead list.
create table if not exists public.lead_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  interest_topic text,
  quiz_answers jsonb,
  attribution jsonb,
  reached text,
  ip_hint text
);

create index if not exists lead_events_created_at_idx on public.lead_events(created_at desc);

alter table public.lead_events enable row level security;
-- No policies at all: only the service role (which bypasses RLS) may touch it.

-- 5. Sources and topics still in use ----------------------------------------
alter table public.leads drop constraint if exists leads_source_check;
alter table public.leads
  add constraint leads_source_check
  check (
    source in ('help_quiz', 'wizard_completion', 'roth_calculator', 'about_page_cta')
    or source is null
  );

alter table public.leads drop constraint if exists leads_interest_topic_check;
alter table public.leads
  add constraint leads_interest_topic_check
  check (
    interest_topic in ('medicare', 'financial_planning', 'life_insurance')
    or interest_topic is null
  );

-- Existing rows captured under retired names, kept rather than deleted.
update public.leads set source = 'help_quiz'
  where source in ('wizard_soft_ask', 'exit_intent', 'footer_subscribe', 'pdf_request',
                   'tax_waitlist', 'sms_optin')
    and interest_topic is not null;

update public.leads set source = 'about_page_cta'
  where source in ('wizard_soft_ask', 'exit_intent', 'footer_subscribe', 'pdf_request',
                   'tax_waitlist', 'sms_optin');

update public.leads set interest_topic = 'financial_planning'
  where interest_topic = 'annuities';

-- 6. Close the public write hole -------------------------------------------
-- "Server insert only ... with check (true)" granted INSERT to the anon role.
-- The service role key used by /api/capture-lead bypasses RLS entirely, so
-- removing this takes nothing away from the application.
drop policy if exists "Server insert only" on public.leads;

-- Reads stay closed to every browser client.
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'leads' and policyname = 'No client reads'
  ) then
    create policy "No client reads" on public.leads for select using (false);
  end if;
end $$;

-- 7. A view for answering "what did this campaign cost me per lead?" --------
create or replace view public.lead_summary as
select
  date_trunc('day', created_at) as day,
  coalesce(attribution ->> 'utm_source', 'direct')   as source,
  coalesce(attribution ->> 'utm_campaign', '—')      as campaign,
  interest_topic,
  count(*)                                           as leads,
  count(*) filter (where phone_number is not null)   as with_phone,
  count(*) filter (where status = 'booked')          as booked,
  round(avg(lead_score))                             as avg_score
from public.leads
group by 1, 2, 3, 4
order by 1 desc, 5 desc;

-- ---------------------------------------------------------------------------
-- 8. SMS consent -------------------------------------------------------------
-- Permission to call and email is not permission to text. Texting on a
-- call/email consent is the kind of thing that turns into a complaint, so SMS
-- gets its own checkbox and its own stored proof.
-- ---------------------------------------------------------------------------
alter table public.leads add column if not exists sms_consent boolean default false;
alter table public.leads add column if not exists sms_consent_text text;
alter table public.leads add column if not exists sms_consent_at timestamptz;

-- ---------------------------------------------------------------------------
-- 9. Enrollment-window reminders ---------------------------------------------
-- Someone who turns 65 next June is not a lead today and is a very good lead in
-- February. This table is the queue that turns one into the other.
--
-- `send_after` is computed by the app (lib/reminders.ts): two weeks before an
-- Initial Enrollment Period opens, or October 1 for the annual window.
-- ---------------------------------------------------------------------------
create table if not exists public.reminders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  email text not null,
  full_name text,
  kind text not null check (kind in ('t65', 'aep')),

  -- Only set for kind = 't65'.
  birth_month smallint check (birth_month between 1 and 12),
  birth_year smallint,

  -- When the reminder email should go out, and what it is announcing.
  send_after date not null,
  window_opens_on date,

  sent_at timestamptz,
  cancelled_at timestamptz,

  attribution jsonb,
  consent_text text,
  consent_at timestamptz,
  consent_ip text
);

-- The cron job's query: everything due and not yet handled.
create index if not exists reminders_due_idx
  on public.reminders (send_after)
  where sent_at is null and cancelled_at is null;

create unique index if not exists reminders_unique_pending_idx
  on public.reminders (email, kind)
  where sent_at is null and cancelled_at is null;

alter table public.reminders enable row level security;
-- No policies: service role only, same as lead_events.
