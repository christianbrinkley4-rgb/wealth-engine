import { commandCenterConfig } from "@/lib/commandCenter";
import { REVIEW_SEQUENCE_KEY, sequenceKeyForTopic } from "@/lib/nurture";
import {
  cancelActiveEnrollments,
  enrollLead,
  handleBooking,
  newUnsubscribeToken,
} from "@/lib/nurtureStore";
import { getSupabaseAdmin, hasSupabaseAdminConfig } from "@/lib/supabase";
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
    await syncNurtureWithBooking(appointment);
    return reply({ received: true }, 200);
  } catch (error) {
    if (error instanceof CalPayloadError) return reply({ error: "Invalid request" }, error.status);
    // Acknowledge only durable storage; retry after outages, without logging personal data.
    return reply({ error: "Calendar sync unavailable" }, 503);
  }
}

/**
 * Keep automated follow-up in step with the booking. A confirmed booking
 * stops nurture and starts the review sequence; a cancellation stops the
 * review ask and resumes topic nurture. Best-effort: never fails the webhook.
 */
async function syncNurtureWithBooking(appointment: {
  status: string;
  email: string;
  full_name: string;
  topic: string | null;
}): Promise<void> {
  if (!hasSupabaseAdminConfig()) return;
  const supabase = getSupabaseAdmin();
  const email = appointment.email;
  if (appointment.status === "confirmed" || appointment.status === "requested") {
    const snapshot = await handleBooking(supabase, email);
    await enrollLead(
      supabase,
      {
        email,
        fullName: snapshot?.full_name ?? appointment.full_name,
        topic: snapshot?.interest_topic ?? appointment.topic,
        unsubscribeToken: snapshot?.unsubscribe_token ?? newUnsubscribeToken(),
      },
      REVIEW_SEQUENCE_KEY,
    );
  } else if (appointment.status === "cancelled" || appointment.status === "rejected") {
    await cancelActiveEnrollments(supabase, email, `booking-${appointment.status}`);
    const sequenceKey = sequenceKeyForTopic(appointment.topic);
    if (sequenceKey) {
      await enrollLead(
        supabase,
        {
          email,
          fullName: appointment.full_name,
          topic: appointment.topic,
          unsubscribeToken: newUnsubscribeToken(),
        },
        sequenceKey,
      );
    }
  }
}
