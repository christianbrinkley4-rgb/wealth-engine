-- Existing duplicate-review views must enforce the caller's row permissions.
-- No lead records or authenticated grants are modified.
alter view public.v_dupe_groups set (security_invoker = true);
alter view public.v_dupe_addr set (security_invoker = true);
alter view public.v_dupe_samename set (security_invoker = true);
revoke all on public.v_dupe_groups, public.v_dupe_addr, public.v_dupe_samename from anon;
