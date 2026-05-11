import {
  getTelemetrySummaryPersistent,
  recordTelemetryPersistent,
  TelemetryEventType,
  TelemetryEvent,
} from "@/app/lib/telemetry-store";
import { resolveAdminUserId } from "@/app/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<TelemetryEvent>;
    const validTypes: TelemetryEventType[] = [
      "assessment_launched",
      "preset_selected",
      "cta_variant_assigned",
      "roadmap_requested",
      "roadmap_submitted",
      "pdf_exported",
      "pdf_export_failed",
      "plaid_link_success",
      "plaid_link_error",
    ];
    if (!body.type || !body.timestamp) {
      return Response.json({ error: "Invalid telemetry payload" }, { status: 400 });
    }
    if (!validTypes.includes(body.type as TelemetryEventType)) {
      return Response.json({ error: "Unknown telemetry event type" }, { status: 400 });
    }

    await recordTelemetryPersistent({
      type: body.type as TelemetryEventType,
      ctaVariant: body.ctaVariant,
      presetId: body.presetId,
      funnel: body.funnel,
      zip: body.zip,
      timestamp: body.timestamp,
    } as TelemetryEvent);

    return Response.json({ ok: true }, { status: 200 });
  } catch {
    return Response.json({ error: "Telemetry ingest failed" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const adminUserId = await resolveAdminUserId(request);
  if (!adminUserId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const summary = await getTelemetrySummaryPersistent();
  return Response.json(summary, { status: 200 });
}
