import { NextRequest, NextResponse } from "next/server";

import { AGENT, REMINDER_CONSENT_TEXT } from "@/lib/agent";
import { getClientIp, isRateLimited } from "@/lib/rateLimit";
import {
  getNextAepReminder,
  getT65Window,
  isValidBirthMonth,
  isValidBirthYear,
  type ReminderKind,
} from "@/lib/reminders";
import { sendReminderSignupConfirmation } from "@/lib/notifyLead";
import { getSupabaseAdmin, hasSupabaseAdminConfig } from "@/lib/supabase";
import { verifyTurnstile } from "@/lib/turnstile";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ReminderPayload {
  email?: string;
  full_name?: string;
  kind?: string;
  birth_month?: number;
  birth_year?: number;
  attribution?: Record<string, string> | null;
  website?: string;
  turnstile_token?: string;
}

function isValidKind(value: string | undefined): value is ReminderKind {
  return value === "t65" || value === "aep";
}

function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  try {
    if (isRateLimited(`reminders:${ip}`, { limit: 8, windowMs: 60_000 })) {
      return NextResponse.json(
        { error: "That’s a few too many in a row. Try again in a minute." },
        { status: 429 },
      );
    }

    let body: ReminderPayload;
    try {
      body = (await request.json()) as ReminderPayload;
    } catch {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    if (typeof body.website === "string" && body.website.trim().length > 0) {
      return NextResponse.json({ success: true });
    }

    const turnstile = await verifyTurnstile(body.turnstile_token, ip);
    if (!turnstile.ok) {
      return NextResponse.json(
        { error: "Couldn’t verify that you’re a person. Refresh and try once more." },
        { status: 400 },
      );
    }

    const email = body.email?.trim().toLowerCase() ?? "";
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address.", field: "email" },
        { status: 400 },
      );
    }

    if (!isValidKind(body.kind)) {
      return NextResponse.json({ error: "Pick which reminder you want." }, { status: 400 });
    }

    const full_name = body.full_name?.trim() || null;
    const now = new Date();

    let sendAfter: Date;
    let windowOpensOn: Date;
    let birth_month: number | null = null;
    let birth_year: number | null = null;
    let alreadyOpen = false;

    if (body.kind === "t65") {
      if (!isValidBirthMonth(body.birth_month) || !isValidBirthYear(body.birth_year, now)) {
        return NextResponse.json(
          { error: "Tell me the month and year you turn 65.", field: "birth_month" },
          { status: 400 },
        );
      }

      birth_month = body.birth_month;
      birth_year = body.birth_year;
      const window = getT65Window(birth_month, birth_year, now);

      // A reminder for a window that is already open would arrive in the past.
      // Say so instead — this person should be talking to someone now.
      if (window.status !== "upcoming") {
        alreadyOpen = true;
      }

      sendAfter = window.sendOn;
      windowOpensOn = window.opensOn;
    } else {
      const aep = getNextAepReminder(now);
      sendAfter = aep.sendOn;
      windowOpensOn = aep.opensOn;
    }

    if (alreadyOpen) {
      return NextResponse.json({
        success: true,
        alreadyOpen: true,
        message:
          "Your enrollment window is open right now, so a reminder would arrive too late to help.",
      });
    }

    if (!hasSupabaseAdminConfig()) {
      console.error("[reminders] Supabase not configured — reminder NOT saved.");
      return NextResponse.json(
        { error: `I couldn’t save that. Email me at ${AGENT.email} and I’ll add you by hand.` },
        { status: 503 },
      );
    }

    const supabase = getSupabaseAdmin();

    // One pending reminder per person per kind. Re-submitting updates the
    // dates rather than queueing a second email.
    const { data: existingRows } = await supabase
      .from("reminders")
      .select("id")
      .eq("email", email)
      .eq("kind", body.kind)
      .is("sent_at", null)
      .is("cancelled_at", null)
      .limit(1);

    const row = {
      email,
      full_name,
      kind: body.kind,
      birth_month,
      birth_year,
      send_after: isoDate(sendAfter),
      window_opens_on: isoDate(windowOpensOn),
      attribution: body.attribution ?? null,
      consent_text: REMINDER_CONSENT_TEXT,
      consent_at: now.toISOString(),
      consent_ip: ip,
    };

    const existing = existingRows?.[0];
    const { error } = existing
      ? await supabase.from("reminders").update(row).eq("id", existing.id)
      : await supabase.from("reminders").insert(row);

    if (error) {
      console.error("[reminders] save failed:", error.message);
      return NextResponse.json(
        { error: `I couldn’t save that. Email me at ${AGENT.email} and I’ll add you by hand.` },
        { status: 500 },
      );
    }

    // Confirm now, so they know it worked and have your details in the meantime.
    await sendReminderSignupConfirmation({
      email,
      full_name,
      kind: body.kind,
      windowOpensOn,
      sendOn: sendAfter,
    });

    return NextResponse.json({ success: true, windowOpensOn: isoDate(windowOpensOn) });
  } catch (err) {
    console.error("[reminders] Unhandled error:", err);
    return NextResponse.json(
      { error: `Something went wrong. Email me at ${AGENT.email} and I’ll sort it out.` },
      { status: 500 },
    );
  }
}
