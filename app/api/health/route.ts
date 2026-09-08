import { NextResponse } from "next/server";

import { getReadinessReport } from "@/lib/readiness";

/**
 * Is this deployment actually able to do its job?
 *
 * This reports launch blockers separately from optional enhancements and
 * configured services. Production returns 503 for a blocker; development
 * stays at 200 so missing production credentials do not interrupt local work.
 *
 * This is intentionally public so a deployment platform can check it without
 * sharing CRON_SECRET. It returns categories, booleans, and remediation text
 * only — never environment-variable values or credentials.
 */

export const dynamic = "force-dynamic";

export function GET() {
  const report = getReadinessReport();
  return NextResponse.json(report, { status: report.ok ? 200 : 503 });
}
