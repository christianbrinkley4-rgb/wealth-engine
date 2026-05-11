import { getSupabaseAdmin, hasSupabaseAdminConfig } from "@/lib/supabase";

export interface ConfigHealthReport {
  ok: boolean;
  checks: Array<{
    id: string;
    ok: boolean;
    detail: string;
  }>;
}

function hasValue(value: string | undefined) {
  return Boolean(value && value.trim().length > 0);
}

export async function evaluateConfigHealth(): Promise<ConfigHealthReport> {
  const checks: ConfigHealthReport["checks"] = [];

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const makeWebhook = process.env.MAKE_WEBHOOK_URL;
  const adminReady = hasSupabaseAdminConfig();

  checks.push({
    id: "supabase_url",
    ok: hasValue(supabaseUrl),
    detail: hasValue(supabaseUrl) ? "Configured" : "Missing NEXT_PUBLIC_SUPABASE_URL",
  });
  checks.push({
    id: "supabase_anon",
    ok: hasValue(supabaseAnon),
    detail: hasValue(supabaseAnon)
      ? "Configured"
      : "Missing NEXT_PUBLIC_SUPABASE_ANON_KEY",
  });
  checks.push({
    id: "supabase_admin",
    ok: adminReady,
    detail: adminReady
      ? "Server Supabase admin client is configured"
      : "Missing Supabase URL or server admin credentials (see lib/supabase.ts)",
  });
  checks.push({
    id: "make_webhook",
    ok: hasValue(makeWebhook) && !String(makeWebhook).includes("REPLACE_WITH_WEBHOOK"),
    detail:
      hasValue(makeWebhook) && !String(makeWebhook).includes("REPLACE_WITH_WEBHOOK")
        ? "Configured"
        : "MAKE_WEBHOOK_URL uses placeholder or is missing",
  });

  if (adminReady) {
    try {
      const supabase = getSupabaseAdmin();
      const { error } = await supabase
        .from("leads")
        .select("id", { count: "exact", head: true });
      checks.push({
        id: "supabase_connectivity",
        ok: !error,
        detail: error ? `Query failed: ${error.message}` : "Connected and queryable",
      });
    } catch (error) {
      checks.push({
        id: "supabase_connectivity",
        ok: false,
        detail: error instanceof Error ? error.message : "Unknown connection error",
      });
    }
  }

  return {
    ok: checks.every((check) => check.ok),
    checks,
  };
}
