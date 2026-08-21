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

function stripWrappingQuotes(value: string) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

function normalizeSupabaseUrl(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  let value = stripWrappingQuotes(raw);
  if (!value) return undefined;

  // Common misconfig: project ref or host without protocol.
  if (!/^https?:\/\//i.test(value) && value.includes("supabase")) {
    value = `https://${value.replace(/^\/+/, "")}`;
  }

  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return undefined;
    }
    // Reject obvious placeholders that break createClient at runtime.
    if (/YOUR_PROJECT|example\.supabase|placeholder/i.test(parsed.hostname)) {
      return undefined;
    }
    return parsed.toString().replace(/\/$/, "");
  } catch {
    return undefined;
  }
}

function resolveSupabaseUrl(): string | undefined {
  return (
    normalizeSupabaseUrl(process.env.SUPABASE_URL) ||
    normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL) ||
    undefined
  );
}

function resolveAdminKey(): string | undefined {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) return undefined;
  const cleaned = stripWrappingQuotes(key);
  if (!cleaned || /YOUR_SUPABASE|REPLACE|placeholder/i.test(cleaned)) {
    return undefined;
  }
  return cleaned;
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
    throw new Error("Missing or invalid Supabase URL / admin API key environment variables.");
  }
  adminClient = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return adminClient;
}
