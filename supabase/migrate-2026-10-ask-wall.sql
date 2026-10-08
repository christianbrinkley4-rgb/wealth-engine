-- ============================================================================
-- 2026-10-08: "Ask Christian" public Q&A wall.
--
--   Adds an ask_questions table for visitor questions submitted from /ask.
--   Questions are informational, not leads: no email, no consent, no nurture
--   enrollment. They sit here for review before anything appears on the wall.
--   Run once in Supabase Dashboard → SQL Editor.
-- ============================================================================

create table if not exists public.ask_questions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  -- The visitor's name, optional on the form.
  name text,
  -- The question, validated to 20-2000 characters by the API route.
  question text not null,
  attribution jsonb,
  ip_hint text,
  -- Review lifecycle: new → answered | dismissed.
  status text not null default 'new'
);

create index if not exists ask_questions_created_at_idx on public.ask_questions(created_at desc);
create index if not exists ask_questions_status_idx on public.ask_questions(status);

alter table public.ask_questions enable row level security;
-- No policies at all: only the service role (which bypasses RLS) may touch it,
-- same as lead_events. Nothing in the application reads this table.
