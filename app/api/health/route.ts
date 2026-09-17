import { NextResponse } from "next/server";

import { getReadinessReport } from "@/lib/readiness";

/**
 * Are this deployment's required settings present and valid?
 *
 * This reports launch blockers separately from optional enhancements and
 * configured services. It does not connect to providers, submit a test lead,
 * or verify that booking webhooks arrive. Production returns 503 for a blocker; development
 * stays at 200 so missing production credentials do not interrupt local work.
 *
 * This is intentionally public so a deployment platform can check it without
 * sharing CRON_SECRET. It returns categories, booleans, and remediation text
 * only — never environment-variable values or credentials.
 */

export const dynamic = "force-dynamic";

export function GET() {
  const report = getReadinessReport();
  return NextResponse.json(report, {
    status: report.ok ? 200 : 503,
    headers: { "Cache-Control": "no-store" },
  });
}
