import { NextResponse, type NextRequest } from "next/server";

import { agentConfigGaps } from "@/lib/agent";
import { isLeadNotifyConfigured, isProspectEmailConfigured } from "@/lib/notifyLead";

/**
 * Is this deployment actually able to do its job?
 *
 * lib/agent.ts has referred to "the /api/health check" since it was written;
 * the route never existed. It is worth having, because the way this site fails
 * is silent: a lead is written to the database, the visitor is thanked, and if
 * no email provider is configured nobody is ever told a person asked for help.
 * Nothing goes red. There is no error to notice.
 *
 * So this reports the gaps that stop a submitted form turning into a phone
 * call, and it returns 503 when one of them is fatal, which makes it usable as
 * an uptime check rather than something to remember to visit.
 *
 * Booleans only — never the values. Guarded by CRON_SECRET when one is set,
 * since the shape of a deployment's configuration is not public business.
 */

export const dynamic = "force-dynamic";

function authorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return process.env.NODE_ENV !== "production";
  const header = request.headers.get("authorization");
  return header === `Bearer ${secret}`;
}

export function GET(request: NextRequest) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const storageConfigured = Boolean(
    (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
  const notifyConfigured = isLeadNotifyConfigured();
  const autoReplyConfigured = isProspectEmailConfigured();

  const blocking: string[] = [];
  if (!storageConfigured) blocking.push("Leads cannot be saved: Supabase is not configured.");
  if (!notifyConfigured) {
    blocking.push(
      "A lead can be captured and nobody is told: set RESEND_API_KEY and RESEND_FROM " +
        "(or a Make webhook, or the Twilio SMS alert).",
    );
  }
  if (!autoReplyConfigured) {
    blocking.push(
      "The promised answers-by-email cannot be sent: set RESEND_API_KEY and RESEND_FROM.",
    );
  }

  const advisory = [
    ...agentConfigGaps(),
    process.env.NEXT_PUBLIC_SITE_URL
      ? null
      : "NEXT_PUBLIC_SITE_URL is unset; canonical URLs and " +
        "the share image will point at the fallback domain.",
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? null : "No bot protection on the forms.",
    process.env.NEXT_PUBLIC_META_PIXEL_ID ||
    process.env.NEXT_PUBLIC_GA4_ID ||
    process.env.NEXT_PUBLIC_NEXTDOOR_PIXEL_ID
      ? null
      : "No analytics or ad pixel is set, so no campaign can be measured or optimised.",
  ].filter((item): item is string => item !== null);

  return NextResponse.json(
    {
      ok: blocking.length === 0,
      leadPath: {
        storageConfigured,
        alertToAgentConfigured: notifyConfigured,
        autoReplyToProspectConfigured: autoReplyConfigured,
      },
      blocking,
      advisory,
    },
    { status: blocking.length === 0 ? 200 : 503 },
  );
}
