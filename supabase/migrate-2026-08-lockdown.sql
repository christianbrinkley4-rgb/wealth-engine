-- ---------------------------------------------------------------------------
-- Take the lead data out of reach of the browser roles.
-- Applied to project vmdarqjunfhpntiumchd (Greensboro Wealth Engine) on
-- 2026-08-24. Kept here so a rebuild from schema.sql does not undo it.
--
-- Why any of this was needed: nothing in this app talks to Postgres from the
-- browser. lib/supabase.ts is server-only and authenticates with the
-- service-role key, so the `anon` and `authenticated` roles have no legitimate
-- use on this project. They nonetheless held full table privileges from the
-- Supabase defaults, which left row level security as the only thing between a
-- publishable key and the lead table.
-- ---------------------------------------------------------------------------

-- 1. public.lead_summary aggregates public.leads — daily counts by campaign,
--    how many people left a phone number, how many booked, average lead score.
--    A view is SECURITY DEFINER unless told otherwise, so it ran with its
--    creator's rights and the "No client reads" policy on public.leads never
--    applied to it. anon held SELECT, so the whole campaign performance table
--    was readable with the publishable key.
alter view public.lead_summary set (security_invoker = on);

-- 2. And remove the grant, so it stays unreachable from a browser key even if
--    the invoker setting is lost the next time the view is recreated.
revoke all on public.lead_summary from anon, authenticated;

-- 3. The tables themselves. RLS already denied these reads; this makes the
--    grants say the same thing, so a future table whose RLS is accidentally
--    dropped is not immediately world-readable.
revoke all on public.leads from anon, authenticated;
revoke all on public.lead_events from anon, authenticated;
revoke all on public.reminders from anon, authenticated;
revoke all on public.telemetry_events from anon, authenticated;
revoke all on public.app_admins from anon, authenticated;

-- 4. rls_auto_enable() is the event-trigger function that switches RLS on for
--    every new table in public. Event triggers do not consult EXECUTE grants,
--    so the privilege did nothing except publish the function at
--    /rest/v1/rpc/rls_auto_enable.
--
--    Note the second revoke: the ACL carried an implicit grant to PUBLIC (the
--    "=X/postgres" entry), which every role inherits. Revoking anon and
--    authenticated by name left the function exposed until PUBLIC went too.
revoke execute on function public.rls_auto_enable() from anon, authenticated;
revoke execute on function public.rls_auto_enable() from public;

-- ---------------------------------------------------------------------------
-- If a signed-in admin dashboard is ever built on this project, this is the
-- file to revisit: grant `authenticated` exactly the reads it needs, behind an
-- RLS policy keyed on public.app_admins. Do not re-grant `anon`.
-- ---------------------------------------------------------------------------
