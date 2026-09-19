import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

import { AGENT } from "@/lib/agent";
import { getSupabaseAdmin, hasSupabaseAdminConfig } from "@/lib/supabase";
import { recordSmsAutoReply, shouldAutoReplySms } from "@/lib/nurtureStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID?.trim() || "";
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN?.trim() || "";
const TWILIO_FROM_NUMBER = process.env.TWILIO_FROM_NUMBER?.trim() || "";
const ALERT_SMS_TO = process.env.ALERT_SMS_TO?.trim() || "";

/**
 * Inbound SMS auto-reply for the business text number.
 *
 * This is a response to someone who texted first — one short, informational
 * reply, at most one per number per 24 hours. It is NOT marketing and does
 * not enroll anyone in anything. Christian gets an alert with the message so
 * he can follow up personally, which is the actual point.
 *
 * Configure the Twilio number's Messaging webhook (HTTP POST) to this route.
 * Set the number's "Primary handler fails" fallback to nothing; failures here
 * are silent by design so Twilio doesn't retry-storm.
 */

const OPTOUT_KEYWORDS = ["stop", "stopall", "unsubscribe", "cancel", "end", "quit"];

function validTwilioSignature(
  url: string,
  params: Record<string, string>,
  signature: string | null,
): boolean {
  if (!signature || !TWILIO_AUTH_TOKEN) return false;
  const data =
    url +
    Object.keys(params)
      .sort()
      .map((k) => k + params[k])
      .join("");
  const expected = createHmac("sha1", TWILIO_AUTH_TOKEN).update(data).digest("base64");
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  const ten = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  return ten.length === 10 ? ten : null;
}

async function sendSms(to: string, body: string): Promise<boolean> {
  const form = new URLSearchParams({ To: to, From: TWILIO_FROM_NUMBER, Body: body });
  try {
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: form,
        signal: AbortSignal.timeout(15000),
      },
    );
    return res.ok;
  } catch (error) {
    console.error(
      "[sms-inbound] Twilio send failed:",
      error instanceof Error ? error.message : error,
    );
    return false;
  }
}

export async function POST(request: Request) {
  // Always 200: Twilio retries non-2xx, and nothing here is worth a retry storm.
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_FROM_NUMBER) {
    return NextResponse.json({ ok: true, skipped: "twilio-not-configured" });
  }

  const params: Record<string, string> = {};
  try {
    const form = await request.formData();
    for (const [k, v] of form.entries()) params[k] = String(v);
  } catch {
    return NextResponse.json({ ok: true, skipped: "bad-body" });
  }

  if (!validTwilioSignature(request.url, params, request.headers.get("x-twilio-signature"))) {
    console.error("[sms-inbound] invalid Twilio signature");
    return NextResponse.json({ ok: true, skipped: "bad-signature" });
  }

  const from = normalizePhone(params.From ?? "");
  const body = (params.Body ?? "").trim();
  if (!from) return NextResponse.json({ ok: true, skipped: "bad-from" });

  const keyword = body.toLowerCase();
  if (OPTOUT_KEYWORDS.includes(keyword)) {
    // Twilio manages SMS opt-outs itself; we just stay quiet.
    console.log(`[sms-inbound] opt-out keyword from ${from}; no reply sent`);
    return NextResponse.json({ ok: true, skipped: "opt-out" });
  }

  // Alert Christian with what they said — the personal follow-up is the point.
  if (ALERT_SMS_TO) {
    const preview = body.length > 120 ? body.slice(0, 117) + "…" : body;
    await sendSms(ALERT_SMS_TO, `Text from +1${from}: ${preview || "(no message)"}`);
  }

  if (keyword === "help") {
    await sendSms(
      `+1${from}`,
      `${AGENT.name}, licensed insurance agent in ${AGENT.city} NC. Call or text ${AGENT.phone}. Reply STOP to opt out.`,
    );
    return NextResponse.json({ ok: true, replied: "help" });
  }

  // One auto-reply per number per day, so a conversation doesn't get spammed.
  if (hasSupabaseAdminConfig()) {
    const supabase = getSupabaseAdmin();
    if (!(await shouldAutoReplySms(supabase, from))) {
      return NextResponse.json({ ok: true, skipped: "recent-reply" });
    }
    await recordSmsAutoReply(supabase, from);
  }

  await sendSms(
    `+1${from}`,
    `Hi, this is ${AGENT.name}. Thanks for texting — I got your message and I'll get back to you shortly. If it's urgent, call me at ${AGENT.phone}.`,
  );
  return NextResponse.json({ ok: true, replied: true });
}
