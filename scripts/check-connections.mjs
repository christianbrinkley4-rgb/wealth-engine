// Read-only checks. Do not print credentials or fetch prospect records.
import nextEnv from "@next/env";
import { createClient } from "@supabase/supabase-js";

nextEnv.loadEnvConfig(process.cwd());
const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ingress = process.env.COMMAND_CENTER_INGEST_URL;
const ingressKey = process.env.COMMAND_CENTER_INGEST_KEY;
const valid = (value) =>
  Boolean(value) && !/example\.supabase|placeholder|replace|your_project/i.test(value);
const report = {
  storageCredentialsPresent: Boolean(ingress && ingressKey) || (valid(url) && valid(key)),
  emailSenderConfigured: Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM),
  bookingConfigured: Boolean(process.env.NEXT_PUBLIC_SCHEDULING_URL),
  webhookConfigured: Boolean(process.env.MAKE_WEBHOOK_URL),
  reminderCronConfigured: Boolean(process.env.CRON_SECRET),
  botProtectionConfigured: Boolean(
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && process.env.TURNSTILE_SECRET_KEY,
  ),
  tables: {},
  commandCenter: { configured: Boolean(ingress && ingressKey), reachable: false },
};
if (ingress && ingressKey) {
  try {
    const response = await fetch(ingress, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-website-key": ingressKey },
      body: JSON.stringify({ action: "health" }),
      signal: AbortSignal.timeout(15000),
    });
    report.commandCenter.reachable = response.ok && (await response.json()).ready === true;
  } catch {
    report.commandCenter.reachable = false;
  }
  if (!report.commandCenter.reachable) process.exitCode = 1;
} else if (valid(url) && valid(key)) {
  const db = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => fetch(input, { ...init, signal: AbortSignal.timeout(12000) }),
    },
  });
  for (const table of ["leads", "lead_events", "reminders"]) {
    const { error, status } = await db.from(table).select("id", { head: true, count: "exact" });
    report.tables[table] = { accessible: !error, status, code: error?.code || null };
  }
}
console.log(JSON.stringify(report, null, 2));
if (Object.values(report.tables).some((table) => !table.accessible)) process.exitCode = 1;
