import { commandCenterConfig } from "@/lib/commandCenter";
import {
  CalPayloadError,
  calWebhookConfig,
  parseCalAppointment,
  readCalBody,
  saveCalAppointment,
  validCalSignature,
} from "@/lib/calWebhook";

export const runtime = "nodejs";

const reply = (body: object, status: number) =>
  Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...(status === 503 ? { "Retry-After": "60" } : {}) },
  });

export async function POST(request: Request) {
  const config = calWebhookConfig();
  if (!config || !commandCenterConfig()) return reply({ error: "Calendar sync unavailable" }, 503);
  if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get("content-type") || ""))
    return reply({ error: "JSON required" }, 415);
  try {
    const raw = await readCalBody(request);
    if (!validCalSignature(raw, request.headers.get("x-cal-signature-256"), config.secret))
      return reply({ error: "Unauthorized" }, 401);
    let body: unknown;
    try {
      body = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(raw));
    } catch {
      return reply({ error: "Invalid request" }, 400);
    }
    const appointment = parseCalAppointment(body, config);
    if (!appointment) return reply({ ignored: true }, 200);
    await saveCalAppointment(appointment);
    return reply({ received: true }, 200);
  } catch (error) {
    if (error instanceof CalPayloadError) return reply({ error: "Invalid request" }, error.status);
    // Acknowledge only durable storage; retry after outages, without logging personal data.
    return reply({ error: "Calendar sync unavailable" }, 503);
  }
}
