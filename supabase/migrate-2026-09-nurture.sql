-- Nurture engine: automated follow-up for inbound website leads.
--
-- Division of labor (do not duplicate the Command Center):
--   Command Center CRM  -> human working layer: call queue, dialer, handset SMS,
--                           manual sequences, OSCR compliance of record. It is the
--                           system of record when COMMAND_CENTER_INGEST is set.
--   Website (this schema) -> automated layer for INBOUND leads: instant
--                           auto-reply (exists), timed email nurture (new),
--                           review requests (new), inbound-SMS auto-reply (new).
--   DeftSales/SmartAsset -> bought-lead world with its own FastCall campaigns.
--
-- Enrollments carry their own contact snapshot (email, name, topic, token) so
-- nurture works whichever storage path captured the lead — website database or
-- Command Center. Nothing here sends to OSCR/T65 list leads: those never touch
-- the website and have no email consent on file; the Command Center enforces it.
--
-- Run in: Supabase Dashboard -> SQL Editor -> New Query. Paste -> Run.
-- Safe to re-run (all statements are IF NOT EXISTS / guarded).

-- pgcrypto is created by supabase/schema.sql; keep this file runnable alone.
create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- 1. Nurture enrollments: who is in which sequence. Contact snapshot included
--    so this works whether the lead was stored in the website DB or the
--    Command Center.
-- ---------------------------------------------------------------------------
create table if not exists public.nurture_enrollments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  lead_id uuid, -- website leads.id when the website DB stored the lead; else null
  email text not null,
  full_name text,
  interest_topic text,
  unsubscribe_token text not null,
  sequence_key text not null,
  status text not null default 'active'
    check (status in ('active', 'completed', 'cancelled')),
  enrolled_at timestamptz not null default now(),
  completed_at timestamptz,
  cancelled_at timestamptz,
  cancel_reason text
);

create index if not exists nurture_enrollments_email_idx
  on public.nurture_enrollments(lower(email));
create index if not exists nurture_enrollments_status_idx
  on public.nurture_enrollments(status);
create index if not exists nurture_enrollments_token_idx
  on public.nurture_enrollments(unsubscribe_token);
-- One active enrollment per person per sequence.
create unique index if not exists nurture_enrollments_active_unique
  on public.nurture_enrollments(lower(email), sequence_key)
  where status = 'active';

-- ---------------------------------------------------------------------------
-- 2. Nurture sends: the queue the cron works through.
-- ---------------------------------------------------------------------------
create table if not exists public.nurture_sends (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  enrollment_id uuid not null references public.nurture_enrollments(id) on delete cascade,
  step_key text not null,
  channel text not null default 'email' check (channel in ('email')),
  send_after date not null,
  sent_at timestamptz,
  cancelled_at timestamptz,
  provider_id text,
  attempts integer not null default 0,
  last_error text
);

-- The cron's working set: due, unsent, uncancelled, retries left.
create index if not exists nurture_sends_due_idx
  on public.nurture_sends(send_after)
  where sent_at is null and cancelled_at is null;
create index if not exists nurture_sends_enrollment_idx
  on public.nurture_sends(enrollment_id);

-- ---------------------------------------------------------------------------
-- 3. Email suppressions: unsubscribes and bounces. Checked before every send.
-- ---------------------------------------------------------------------------
create table if not exists public.email_suppressions (
  email text primary key,
  reason text not null default 'unsubscribed',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 4. Inbound SMS auto-reply guard: one auto-reply per number per 24 hours.
-- ---------------------------------------------------------------------------
create table if not exists public.sms_auto_replies (
  phone text primary key,
  replied_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 5. Lock it down: service role only, like lead_events and reminders.
-- ---------------------------------------------------------------------------
alter table public.nurture_enrollments enable row level security;
alter table public.nurture_sends enable row level security;
alter table public.email_suppressions enable row level security;
alter table public.sms_auto_replies enable row level security;
-- No policies: only the service role (which bypasses RLS) may touch these.
