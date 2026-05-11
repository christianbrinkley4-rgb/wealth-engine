// DEVELOPER NOTE:
// Add the following to your .env.local file:
//   SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY (server-only admin key from Supabase Dashboard → Settings → API)
//
// NEVER commit .env.local to git. Confirm it is in your .gitignore.
//
// Import this module only from server-side code (API routes, server actions).
// The admin key must NEVER be exposed to the browser.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function resolveSupabaseUrl(): string | undefined {
  return (
    process.env.SUPABASE_URL?.trim() || process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || undefined
  );
}

function resolveAdminKey(): string | undefined {
  return process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || undefined;
}

export function hasSupabaseAdminConfig(): boolean {
  return Boolean(resolveSupabaseUrl() && resolveAdminKey());
}

let adminClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (adminClient) return adminClient;
  const url = resolveSupabaseUrl();
  const key = resolveAdminKey();
  if (!url || !key) {
    throw new Error("Missing Supabase URL or admin API key environment variables.");
  }
  adminClient = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return adminClient;
}
