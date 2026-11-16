import { NextRequest, NextResponse } from "next/server";

import { AGENT } from "@/lib/agent";
import { isProspectEmailConfigured, sendStoredEmailSnapshot } from "@/lib/notifyLead";
import { formatIntakeEmail, intakeEmailSubject, validateIntake } from "@/lib/prepSheet";
import { getClientIp, isRateLimited } from "@/lib/rateLimit";
import { verifyTurnstile } from "@/lib/turnstile";

/**
 * Appointment prep intake: EMAIL ONLY.
 *
 * A client who has an appointment sends medications, doctors, pharmacy and
 * questions. Those are health details. This route sends them to Christian by
 * email through the existing Resend path in lib/notifyLead.ts, and does
 * nothing else with them.
 *
 * Rules this file must keep:
 * - No database. Do not import lib/supabase, lib/commandCenter, lib/nurture,
 *   lib/nurtureStore, or any other storage client here.
 * - No copy in the logs. Log the failure type only, never the request body.
 * - No retry queue. A queue would have to store the email text.
 * - If the email cannot be sent, tell the person plainly and ask them to
 *   call. Never report success for an email that did not go out.
 *
 * lib/__tests__/prep-intake-route.test.ts checks each rule.
 */

export const runtime = "nodejs";

const NOT_SENT = {
  error: `I could not receive this form just now. Your answers were not sent. Please call me at ${AGENT.phone} and bring your list to the appointment.`,
  code: "email_unavailable" as const,
  phone: AGENT.phone,
  phoneHref: AGENT.phoneHref,
};

/** The same inbox the lead alerts already go to. */
function notifyAddress(): string {
  return process.env.LEAD_NOTIFY_EMAIL?.trim() || AGENT.email;
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  try {
    if (isRateLimited(`prep-intake:${ip}`, { limit: 5, windowMs: 60_000 })) {
      return NextResponse.json(
        { error: "That is a few too many tries in a row. Please try again in a minute." },
        { status: 429 },
      );
    }

    let body: Record<string, unknown>;
    try {
      const raw = await request.text();
      if (raw.length > 32768) {
        return NextResponse.json(
          { error: "That is too long to send. Please shorten your answers and try again." },
          { status: 413 },
        );
      }
      const parsed: unknown = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        return NextResponse.json({ error: "Invalid request." }, { status: 400 });
      }
      body = parsed as Record<string, unknown>;
    } catch {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    // Honeypot: answer as if it worked, and send nothing.
    if (typeof body.website === "string" && body.website.trim().length > 0) {
      return NextResponse.json({ success: true });
    }

    const turnstile = await verifyTurnstile(
      typeof body.turnstile_token === "string" ? body.turnstile_token : undefined,
      ip,
    );
    if (!turnstile.ok) {
      if (turnstile.reason === "verification-unavailable") {
        return NextResponse.json(
          {
            error: `The form check is not available right now. Your answers were not sent. Please try again soon, or call me at ${AGENT.phone}.`,
            code: "verification_unavailable",
          },
          { status: 503, headers: { "Retry-After": "30" } },
        );
      }
      return NextResponse.json(
        { error: "The form check did not finish. Please refresh the page and try once more." },
        { status: 400 },
      );
    }

    const validated = validateIntake(body);
    if (!validated.ok) {
      return NextResponse.json(
        { error: validated.error, field: validated.field },
        { status: 400 },
      );
    }
    const { intake } = validated;

    if (!isProspectEmailConfigured()) {
      console.error("[prep-intake] Resend is not configured. The intake was not sent.");
      return NextResponse.json(NOT_SENT, { status: 503 });
    }

    const delivery = await sendStoredEmailSnapshot({
      to: notifyAddress(),
      subject: intakeEmailSubject(intake),
      text: formatIntakeEmail(intake),
      replyTo: intake.email || null,
    });

    if (!delivery.ok) {
      // Status only. The error text and the body stay out of the logs.
      console.error("[prep-intake] The email was not delivered.", {
        status: delivery.status ?? null,
        retryable: delivery.retryable,
      });
      return NextResponse.json(NOT_SENT, { status: 503 });
    }

    return NextResponse.json({ success: true });
  } catch {
    // The thrown value may hold request content, so it is not logged.
    console.error("[prep-intake] Unhandled error. The intake was not sent.");
    return NextResponse.json(NOT_SENT, { status: 500 });
  }
}
