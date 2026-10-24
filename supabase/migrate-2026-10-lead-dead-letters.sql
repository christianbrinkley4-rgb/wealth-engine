-- ============================================================================
-- 2026-10-24: Lead dead-letter store for /api/capture-lead.
--
--   When both storage paths fail (Command Center, then direct Supabase
--   insert), the route writes the lead here instead of leaving the owner
--   alert email as the only copy. A dead-letter row is a lead waiting for
--   manual recovery: check the alert email, re-enter it into the leads
--   table, then delete the row.
--   Run once in Supabase Dashboard → SQL Editor. Until this runs, the
--   route's dead-letter write throws, is logged, and the alert still goes
--   out exactly as before.
-- ============================================================================

create table if not exists public.lead_dead_letters (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  -- The full lead row exactly as the route built it.
  payload jsonb not null,
  -- quiz-2026, help_quiz, wizard_completion, roth_calculator, about_page_cta.
  source text,
  -- The storage error that put the lead here, truncated by the route.
  error text,
  -- Recovery lifecycle: new → recovered | dismissed.
  status text not null default 'new'
);

create index if not exists lead_dead_letters_created_at_idx on public.lead_dead_letters(created_at desc);
create index if not exists lead_dead_letters_status_idx on public.lead_dead_letters(status);

alter table public.lead_dead_letters enable row level security;
-- No policies at all: only the service role (which bypasses RLS) may touch it,
-- same as ask_questions. Nothing in the application reads this table.
