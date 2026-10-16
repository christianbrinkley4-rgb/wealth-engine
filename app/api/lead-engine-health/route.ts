import { NextResponse } from "next/server";
import { leadEngineReadiness } from "@/lib/leadEngineReadiness";

export const dynamic = "force-dynamic";
export function GET() {
  const report = leadEngineReadiness();
  const captureEnabled = process.env.LEAD_ENGINE_CAPTURE_ENABLED === "true";
  return NextResponse.json(
    { ...report, captureEnabled, retryEnabled: process.env.LEAD_ENGINE_RETRY_ENABLED === "true" },
    {
      status: report.ready && captureEnabled ? 200 : 503,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
