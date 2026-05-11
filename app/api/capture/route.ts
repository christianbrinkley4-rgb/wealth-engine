import crypto from "node:crypto";
import { StrategicDossierPayload } from "@/app/lib/dossier";
import { recordTelemetryPersistent } from "@/app/lib/telemetry-store";
import { getSupabaseAdmin, hasSupabaseAdminConfig } from "@/lib/supabase";
import { resolveAdminUserId } from "@/app/lib/admin-auth";

export const runtime = "nodejs";

const MAKE_WEBHOOK_URL =
  process.env.MAKE_WEBHOOK_URL ?? "https://hook.make.com/REPLACE_WITH_WEBHOOK";
const MAKE_WEBHOOK_SECRET = process.env.MAKE_WEBHOOK_SECRET;

async function postWebhookWithRetry(
  payload: StrategicDossierPayload,
  rawBody: string,
  signature: string | undefined,
  timestamp: string,
) {
  const runOnce = async () => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
      return await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(signature ? { "x-wealth-signature": signature } : {}),
          ...(signature ? { "x-wealth-timestamp": timestamp } : {}),
        },
        body: JSON.stringify({
          event: "wealth_engine_capture",
          createdAt: new Date().toISOString(),
          payload,
          rawDigestPreview: rawBody.length,
        }),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }
  };

  const firstAttempt = await runOnce();
  if (firstAttempt.ok) {
    return firstAttempt;
  }

  if (firstAttempt.status >= 500) {
    const secondAttempt = await runOnce();
    return secondAttempt;
  }

  return firstAttempt;
}

function resolveIrmaaRiskStatus(payload: StrategicDossierPayload) {
  const value = payload.diagnostic.irmaaAnnualPenalty;
  if (value >= 6000) return "high";
  if (value >= 1200) return "moderate";
  return "low";
}

export async function POST(request: Request) {
  try {
    if (!hasSupabaseAdminConfig()) {
      return Response.json(
        { error: "Supabase environment variables are not configured." },
        { status: 500 },
      );
    }
    const rawBody = await request.text();
    const payload = JSON.parse(rawBody) as StrategicDossierPayload;
    if (!payload?.profile?.email) {
      return Response.json({ error: "Email is required." }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    const insertPromise = supabase.from("leads").insert({
      user_id: payload.profile.userId ?? null,
      email: payload.profile.email,
      full_name: payload.profile.fullName ?? null,
      age: payload.profile.age,
      primary_zip_code: payload.profile.zip,
      estimated_income: payload.diagnostic.annualIncome,
      calculated_tax_drag: payload.diagnostic.taxDrag,
      irmaa_risk_status: resolveIrmaaRiskStatus(payload),
      filing_status: payload.profile.filingStatus,
      funnel: payload.diagnostic.funnel,
      annual_contribution: payload.diagnostic.annualContribution,
      portfolio_value: payload.diagnostic.portfolioValue,
      strategic_alpha: payload.diagnostic.strategicAlpha,
      include_nc_tax: payload.diagnostic.includeNcTax ?? true,
      nc_tax_drag: payload.diagnostic.ncTaxDrag ?? 0,
      key_outcome_label: payload.diagnostic.keyOutcomeLabel,
      key_outcome_value: payload.diagnostic.keyOutcomeValue,
      cta_variant: payload.diagnostic.ctaVariant ?? null,
      preset_id: payload.diagnostic.presetId ?? null,
      phone: payload.profile.phone ?? null,
      goals: payload.advisoryContext.goals ?? null,
      notes: payload.advisoryContext.notes ?? null,
      payload,
    });

    const webhookTimestamp = new Date().toISOString();
    const webhookSignature = MAKE_WEBHOOK_SECRET
      ? crypto
          .createHmac("sha256", MAKE_WEBHOOK_SECRET)
          .update(`${webhookTimestamp}.${rawBody}`)
          .digest("hex")
      : undefined;

    const webhookPromise = postWebhookWithRetry(
      payload,
      rawBody,
      webhookSignature,
      webhookTimestamp,
    );

    const [{ error: insertError }, webhookResponse] = await Promise.all([
      insertPromise,
      webhookPromise,
    ]);

    if (insertError) {
      throw new Error(insertError.message);
    }
    const webhookOk = webhookResponse.ok;

    await recordTelemetryPersistent({
      type: "roadmap_submitted",
      funnel: payload.diagnostic.funnel,
      zip: payload.profile.zip,
      timestamp: new Date().toISOString(),
    });

    return Response.json(
      {
        ok: true,
        webhookOk,
        warning: webhookOk
          ? null
          : "Lead saved. Automation webhook failed and should be retried by operations.",
      },
      { status: 201 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Capture failed.";
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const adminUserId = await resolveAdminUserId(request);
  if (!adminUserId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const supabase = getSupabaseAdmin();
    const { count, error } = await supabase
      .from("leads")
      .select("id", { count: "exact", head: true });
    if (error) {
      throw error;
    }
    return Response.json({ totalLeads: count ?? 0 }, { status: 200 });
  } catch {
    return Response.json({ error: "Unable to load lead summary." }, { status: 500 });
  }
}
