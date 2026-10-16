import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse, after } from "next/server";
import { deliverEngineAlerts, engineRpc, validateEngineLead } from "@/lib/leadEngine";
import { getClientIp, isRateLimited } from "@/lib/rateLimit";
import { isTurnstileConfigured, verifyTurnstile } from "@/lib/turnstile";
import { leadEngineReadiness, leadEngineEnvironment } from "@/lib/leadEngineReadiness";

export const runtime = "nodejs";
const reply = (body: object, status = 200) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  // Production proxies can reconstruct an internal URL. Pin the browser origin
  // to the configured public site instead of trusting proxy host headers.
  const expectedOrigin =
    process.env.LEAD_ENGINE_ENVIRONMENT === "production"
      ? process.env.LEAD_ENGINE_PRODUCTION_ORIGIN
      : new URL(request.url).origin;
  if (!origin || origin !== expectedOrigin)
    return reply({ error: "Please submit from this website." }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return reply({ error: "Invalid request." }, 415);
  const ip = getClientIp(request);
  if (isRateLimited(`engine:${ip}`, { limit: 10, windowMs: 60000 }))
    return reply({ error: "Please wait a minute and try again." }, 429);
  let body: Record<string, unknown>;
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply({ error: "Invalid request." }, 400);
    let size = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 12000) {
        await reader.cancel();
        return reply({ error: "Please shorten your request." }, 413);
      }
      chunks.push(value);
    }
    body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error();
  } catch {
    return reply({ error: "Invalid request." }, 400);
  }
  if (body.website) return reply({ error: "Please refresh and try again." }, 400);
  let lead;
  try {
    lead = validateEngineLead(body);
  } catch (error) {
    return reply({ error: (error as Error).message }, 400);
  }
  if (
    process.env.LEAD_ENGINE_CAPTURE_ENABLED !== "true" ||
    !isTurnstileConfigured() ||
    !leadEngineReadiness().ready
  )
    return reply(
      {
        error:
          "Online requests aren't available right now. Your request hasn't been sent. Please call (919) 408-6671.",
      },
      503,
    );
  const checked = await verifyTurnstile(
    typeof body.turnstile_token === "string" ? body.turnstile_token : undefined,
    ip,
  );
  if (!checked.ok)
    return reply(
      { error: "The form check didn't finish. Please try again, or call (919) 408-6671." },
      checked.reason === "verification-unavailable" ? 503 : 400,
    );
  try {
    const receipt = await engineRpc("capture_engine_lead", {
      p_id: lead.id,
      p_fingerprint: lead.fingerprint,
      p_payload: lead.payload,
    });
    if (receipt?.stored !== true || receipt.id !== lead.id) throw new Error("storage_unavailable");
    // The lead and the email alert job are committed in one transaction before success.
    // A cron retries pending/expired jobs if this best-effort attempt cannot finish.
    after(async () => {
      try {
        await deliverEngineAlerts(lead.id);
      } catch {
        console.error("[engine] alert attempt incomplete; durable queue retained");
      }
    });
    return reply({ stored: true, id: lead.id, duplicate: receipt.duplicate === true });
  } catch (error) {
    const conflict = (error as Error).message === "id_conflict";
    return reply(
      {
        error: conflict
          ? "This request changed. Please submit once more."
          : "I couldn't confirm your request was saved. Please retry or call (919) 408-6671.",
      },
      conflict ? 409 : 503,
    );
  }
}

export async function GET(request: NextRequest) {
  const expected = leadEngineEnvironment().LEAD_ENGINE_CRON_SECRET;
  const received = request.headers.get("authorization") ?? "";
  const target = `Bearer ${expected ?? ""}`;
  if (
    !expected ||
    received.length !== target.length ||
    !timingSafeEqual(Buffer.from(received), Buffer.from(target))
  )
    return reply({ error: "Unauthorized" }, 401);
  try {
    const delivery = await deliverEngineAlerts();
    const queue = await engineRpc("engine_queue_health", {});
    return reply({ delivery, queue });
  } catch {
    return reply({ error: "Alert retry unavailable" }, 503);
  }
}
