/**
 * Lead delivery. Two jobs, both time-critical:
 *
 *   1. Tell Christian, immediately — email, optional webhook, optional SMS.
 *   2. Tell the prospect, immediately — the answers they were promised, plus a
 *      booking link, while the site is still open in front of them.
 *
 * Nothing here throws. The lead is already saved by the time these run, and a
 * failed email must never look like a failed submission to the visitor.
 */

import crypto from "node:crypto";

import { AGENT } from "@/lib/agent";
import { describeAnswers, getValueBeat, isHelpQuizTopic, TOPIC_LABELS } from "@/lib/helpQuiz";
import { formatLongDate } from "@/lib/reminders";

const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL?.trim() || "";
const MAKE_WEBHOOK_SECRET = process.env.MAKE_WEBHOOK_SECRET?.trim() || "";
const RESEND_API_KEY = process.env.RESEND_API_KEY?.trim() || "";
const LEAD_NOTIFY_EMAIL = process.env.LEAD_NOTIFY_EMAIL?.trim() || AGENT.email;
const RESEND_FROM = process.env.RESEND_FROM?.trim() || "";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "";

// Optional SMS alert. Set all three to switch it on.
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID?.trim() || "";
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN?.trim() || "";
const TWILIO_FROM_NUMBER = process.env.TWILIO_FROM_NUMBER?.trim() || "";
const ALERT_SMS_TO = process.env.ALERT_SMS_TO?.trim() || "";

const PLACEHOLDER_HOOK = /REPLACE_WITH_WEBHOOK|hook\.make\.com\/REPLACE/i;

export type LeadNotifyPayload = {
  source: string;
  email: string;
  full_name?: string | null;
  phone_number?: string | null;
  zip_code?: string | null;
  interest_topic?: string | null;
  quiz_answers?: Record<string, unknown> | null;
  lead_score?: number | null;
  attribution?: Record<string, unknown> | null;
  created_at?: string;
  /** True when the database write failed and this email is the only record. */
  storageFailed?: boolean;
};

function makeConfigured() {
  return MAKE_WEBHOOK_URL.length > 0 && !PLACEHOLDER_HOOK.test(MAKE_WEBHOOK_URL);
}

function resendConfigured() {
  return RESEND_API_KEY.length > 0 && RESEND_FROM.length > 0;
}

function smsConfigured() {
  return Boolean(TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_FROM_NUMBER && ALERT_SMS_TO);
}

function topicLabel(topic: string | null | undefined) {
  if (isHelpQuizTopic(topic)) return TOPIC_LABELS[topic];
  return topic || "General";
}

function formatPhone(digits: string | null | undefined) {
  if (!digits || digits.length < 10) return digits || "—";
  const d = digits.slice(0, 10);
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendEmail(options: {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}) {
  if (!resendConfigured()) return { ok: false, skipped: true as const };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: RESEND_FROM,
      to: [options.to],
      subject: options.subject,
      text: options.text,
      html: options.html,
      reply_to: options.replyTo,
    }),
  });

  if (!res.ok) {
    console.error("[notifyLead] Resend rejected:", res.status, await res.text().catch(() => ""));
  }
  return { ok: res.ok, skipped: false as const, status: res.status };
}

async function postMakeWebhook(payload: LeadNotifyPayload) {
  if (!makeConfigured()) return { ok: false, skipped: true as const };

  const body = JSON.stringify({
    event: "lead_captured",
    createdAt: payload.created_at || new Date().toISOString(),
    lead: payload,
  });
  const timestamp = new Date().toISOString();
  const signature = MAKE_WEBHOOK_SECRET
    ? crypto.createHmac("sha256", MAKE_WEBHOOK_SECRET).update(`${timestamp}.${body}`).digest("hex")
    : undefined;

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (signature) {
    headers["x-wealth-signature"] = signature;
    headers["x-wealth-timestamp"] = timestamp;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers,
      body,
      signal: controller.signal,
    });
    if (!res.ok && res.status >= 500) {
      const retry = await fetch(MAKE_WEBHOOK_URL, { method: "POST", headers, body });
      return { ok: retry.ok, skipped: false as const, status: retry.status };
    }
    return { ok: res.ok, skipped: false as const, status: res.status };
  } finally {
    clearTimeout(timeout);
  }
}

async function sendSmsAlert(payload: LeadNotifyPayload) {
  if (!smsConfigured()) return { ok: false, skipped: true as const };

  const lines = [
    `New ${topicLabel(payload.interest_topic)} lead`,
    payload.full_name || payload.email,
    formatPhone(payload.phone_number),
    payload.zip_code ? `ZIP ${payload.zip_code}` : "",
  ].filter(Boolean);

  const form = new URLSearchParams({
    To: ALERT_SMS_TO,
    From: TWILIO_FROM_NUMBER,
    Body: lines.join(" · "),
  });

  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form,
    },
  );

  return { ok: res.ok, skipped: false as const, status: res.status };
}

/**
 * Alert Christian. Never throws.
 *
 * Returns whether at least one channel actually delivered — the caller uses
 * that to decide whether a lead whose database write failed can still be
 * reported to the visitor as received.
 */
export async function notifyLeadCaptured(payload: LeadNotifyPayload): Promise<boolean> {
  if (!makeConfigured() && !resendConfigured() && !smsConfigured()) {
    console.error(
      "[notifyLead] NO ALERT CHANNEL CONFIGURED — a lead was saved and nobody was told. " +
        "Set RESEND_API_KEY + RESEND_FROM (and optionally MAKE_WEBHOOK_URL / Twilio vars).",
    );
    return false;
  }

  const topic = topicLabel(payload.interest_topic);
  const answers = isHelpQuizTopic(payload.interest_topic)
    ? describeAnswers(
        payload.interest_topic,
        (payload.quiz_answers ?? {}) as Record<string, string>,
      )
    : [];

  const attribution = payload.attribution ?? {};
  const attributionLines = Object.entries(attribution)
    .map(([k, v]) => `  ${k}: ${String(v)}`)
    .join("\n");

  const text = [
    payload.storageFailed
      ? "*** SAVE FAILED — this email is the ONLY copy of this lead. Write it down. ***\n"
      : "",
    `New ${topic} inquiry from the site.`,
    "",
    `Name:  ${payload.full_name || "—"}`,
    `Email: ${payload.email}`,
    `Phone: ${formatPhone(payload.phone_number)}`,
    `ZIP:   ${payload.zip_code || "—"}`,
    payload.lead_score != null ? `Score: ${payload.lead_score}` : "",
    "",
    "They answered:",
    ...answers.map((a) => `  ${a.question}\n    → ${a.answer}`),
    "",
    attributionLines ? `Came from:\n${attributionLines}` : "Came from: (no campaign tags)",
    "",
    "They've already received their answers by email and a link to book time.",
    "Call within one business day.",
  ]
    .filter((line) => line !== "")
    .join("\n");

  const results = await Promise.allSettled([
    sendEmail({
      to: LEAD_NOTIFY_EMAIL,
      subject: payload.storageFailed
        ? `[NOT SAVED] New ${topic} inquiry — ${payload.full_name || payload.email}`
        : `New ${topic} inquiry — ${payload.full_name || payload.email}`,
      text,
      replyTo: payload.email,
    }),
    postMakeWebhook(payload),
    sendSmsAlert(payload),
  ]);

  let delivered = false;
  for (const result of results) {
    if (result.status === "rejected") {
      console.error("[notifyLead] channel failed:", result.reason);
    } else if (result.value.skipped) {
      continue;
    } else if (result.value.ok) {
      delivered = true;
    } else {
      console.error("[notifyLead] channel returned non-OK:", result.value);
    }
  }

  if (!delivered) {
    console.error("[notifyLead] EVERY CHANNEL FAILED — nobody was told about this lead.");
  }
  return delivered;
}

/**
 * The email the site has been promising and never sending: their answers, the
 * same guidance they saw on screen, and a way to book time — inside a minute
 * of hitting submit, while they still remember filling in the form.
 */
export async function sendProspectAutoReply(input: {
  email: string;
  full_name?: string | null;
  interest_topic?: string | null;
  quiz_answers?: Record<string, unknown> | null;
  source?: string;
  calculated_premium?: number | null;
  irmaa_bracket?: string | null;
}): Promise<void> {
  if (!resendConfigured()) {
    console.error("[notifyLead] Auto-reply skipped — RESEND_API_KEY / RESEND_FROM not set.");
    return;
  }

  // Calculator captures have figures instead of quiz answers.
  if (!isHelpQuizTopic(input.interest_topic)) {
    await sendCalculatorAutoReply(input);
    return;
  }

  const firstName = (input.full_name || "").trim().split(" ")[0] || "there";
  const beat = getValueBeat(
    input.interest_topic,
    (input.quiz_answers ?? {}) as Record<string, string>,
  );
  const topic = TOPIC_LABELS[input.interest_topic];

  const text = [
    `Hi ${firstName},`,
    "",
    `Thanks for the questions about ${topic.toLowerCase()}. Here's what you saw on the site, so you have it in writing:`,
    "",
    beat.headline.toUpperCase(),
    "",
    beat.lede,
    "",
    ...beat.points.map((p) => `• ${p}`),
    "",
    "That's general information rather than advice about your particular situation — which is what I'd like to talk through with you.",
    "",
    `You can book a time here: ${AGENT.schedulingUrl}`,
    `Or just call or text me: ${AGENT.phone}`,
    "",
    "If I don't hear from you first, I'll reach out within one business day.",
    "",
    AGENT.name,
    "Licensed insurance agent · " + AGENT.city + ", " + AGENT.state,
    AGENT.email,
    SITE_URL,
    "",
    "You're receiving this because you asked me to get in touch through my website. Reply 'stop' and I won't contact you again.",
  ].join("\n");

  const html = `
    <div style="font-family:Georgia,serif;font-size:17px;line-height:1.6;color:#0f2241;max-width:560px">
      <p>Hi ${escapeHtml(firstName)},</p>
      <p>Thanks for the questions about ${escapeHtml(topic.toLowerCase())}. Here's what you saw on the site, so you have it in writing:</p>
      <p style="font-size:19px;font-weight:600;margin:24px 0 8px">${escapeHtml(beat.headline)}</p>
      <p>${escapeHtml(beat.lede)}</p>
      <ul style="padding-left:20px">
        ${beat.points.map((p) => `<li style="margin-bottom:10px">${escapeHtml(p)}</li>`).join("")}
      </ul>
      <p style="color:#4a5563;font-size:15px">That's general information rather than advice about your particular situation — which is what I'd like to talk through with you.</p>
      <p style="margin:28px 0">
        <a href="${AGENT.schedulingUrl}" style="background:#0f2241;color:#f5f0e8;padding:14px 22px;border-radius:8px;text-decoration:none;display:inline-block;font-family:Helvetica,Arial,sans-serif;font-weight:600">Book a time to talk</a>
      </p>
      <p>Or just call or text me: <strong>${AGENT.phone}</strong>. If I don't hear from you first, I'll reach out within one business day.</p>
      <p style="margin-top:28px">${escapeHtml(AGENT.name)}<br>
      <span style="color:#4a5563">Licensed insurance agent · ${AGENT.city}, ${AGENT.state}</span><br>
      <a href="mailto:${AGENT.email}" style="color:#0f2241">${AGENT.email}</a></p>
      <p style="color:#6b7280;font-size:13px;border-top:1px solid #d1d5db;padding-top:12px;margin-top:28px">
        You're receiving this because you asked me to get in touch through my website. Reply "stop" and I won't contact you again.
      </p>
    </div>`;

  try {
    await sendEmail({
      to: input.email,
      subject: `Your ${topic.toLowerCase()} questions — from ${AGENT.name}`,
      text,
      html,
      replyTo: AGENT.email,
    });
  } catch (error) {
    console.error("[notifyLead] auto-reply failed:", error);
  }
}

/** The calculator equivalent: their numbers back, plus a way to book time. */
async function sendCalculatorAutoReply(input: {
  email: string;
  full_name?: string | null;
  source?: string;
  calculated_premium?: number | null;
  irmaa_bracket?: string | null;
}): Promise<void> {
  const firstName = (input.full_name || "").trim().split(" ")[0] || "there";
  const isRoth = input.source === "roth_calculator";
  const label = isRoth ? "Roth conversion estimate" : "Medicare premium estimate";

  const figure =
    input.calculated_premium != null && input.calculated_premium > 0
      ? `Estimated monthly Part B premium: $${input.calculated_premium.toFixed(2)}${
          input.irmaa_bracket ? ` (${input.irmaa_bracket})` : ""
        }`
      : null;

  const text = [
    `Hi ${firstName},`,
    "",
    `Here's the ${label.toLowerCase()} you ran on my site.`,
    "",
    figure,
    "",
    "Two things worth knowing about that number: it's an estimate for education rather than a quote, and Medicare sets premiums from a tax return two years old — so if your income has changed since then, the real figure can differ, and in some cases it can be appealed.",
    "",
    `Happy to walk through what applies to you. Book a time: ${AGENT.schedulingUrl}`,
    `Or call or text me: ${AGENT.phone}`,
    "",
    AGENT.name,
    `Licensed insurance agent · ${AGENT.city}, ${AGENT.state}`,
    AGENT.email,
    "",
    "You're receiving this because you asked me to email your results. Reply 'stop' and I won't contact you again.",
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  try {
    await sendEmail({
      to: input.email,
      subject: `Your ${label.toLowerCase()} — from ${AGENT.name}`,
      text,
      replyTo: AGENT.email,
    });
  } catch (error) {
    console.error("[notifyLead] calculator auto-reply failed:", error);
  }
}

export function isLeadNotifyConfigured() {
  return makeConfigured() || resendConfigured() || smsConfigured();
}

/* ---------------------------------------------------------------------------
 * Enrollment-window reminders
 *
 * Two emails: one now, confirming the reminder is set, and one months later
 * when the window actually opens. The second is the whole point — it arrives
 * on the day the person can finally act, from someone they already asked to
 * get in touch.
 * ------------------------------------------------------------------------- */

function reminderSignature() {
  return [
    "",
    AGENT.name,
    `Licensed insurance agent · ${AGENT.city}, ${AGENT.state}`,
    AGENT.phone,
    AGENT.email,
    SITE_URL,
  ].join("\n");
}

/** Sent the moment someone signs up, so they know it worked. */
export async function sendReminderSignupConfirmation(input: {
  email: string;
  full_name?: string | null;
  kind: "t65" | "aep";
  windowOpensOn: Date;
  sendOn: Date;
}): Promise<void> {
  if (!resendConfigured()) {
    console.error("[notifyLead] Reminder confirmation skipped — Resend not configured.");
    return;
  }

  const firstName = (input.full_name || "").trim().split(" ")[0] || "there";
  const opens = formatLongDate(input.windowOpensOn);
  const remindOn = formatLongDate(input.sendOn);

  const body =
    input.kind === "t65"
      ? [
          `Your Medicare sign-up window opens on ${opens}. It stays open for seven months in total — the three months before the month you turn 65, that month, and the three months after.`,
          "",
          `I'll email you on ${remindOn}, a couple of weeks ahead of it, so you have time to look at options rather than deciding in a hurry.`,
          "",
          "Nothing to do until then. If something changes or you'd rather talk sooner, just call me.",
        ]
      : [
          `Medicare's annual window runs October 15 to December 7, and this year it opens on ${opens}.`,
          "",
          `I'll email you on ${remindOn} so you have a couple of weeks to look at whether your current coverage still fits before the window closes.`,
          "",
          "Nothing to do until then. Worth knowing: drug plans change their pricing and covered medications every year, so it's worth a look even when nothing about your health has changed.",
        ];

  const text = [
    `Hi ${firstName},`,
    "",
    "That's set.",
    "",
    ...body,
    reminderSignature(),
    "",
    "You're receiving this because you asked for a reminder on my website. Reply 'stop' and I'll remove you.",
  ].join("\n");

  try {
    await sendEmail({
      to: input.email,
      subject:
        input.kind === "t65"
          ? "Your Medicare reminder is set"
          : "Your annual Medicare reminder is set",
      text,
      replyTo: AGENT.email,
    });
  } catch (error) {
    console.error("[notifyLead] reminder confirmation failed:", error);
  }
}

/**
 * The reminder itself, sent by the daily cron job when it comes due.
 * Returns whether it actually went out — the caller only marks the row sent
 * when it did, so a failure retries tomorrow rather than vanishing.
 */
export async function sendReminderDue(input: {
  email: string;
  full_name?: string | null;
  kind: "t65" | "aep";
  windowOpensOn: Date | null;
}): Promise<boolean> {
  if (!resendConfigured()) {
    console.error("[notifyLead] Reminder due but Resend is not configured.");
    return false;
  }

  const firstName = (input.full_name || "").trim().split(" ")[0] || "there";
  const opens = input.windowOpensOn ? formatLongDate(input.windowOpensOn) : "shortly";

  const body =
    input.kind === "t65"
      ? [
          `You asked me to let you know when your Medicare sign-up window opened. It opens on ${opens}.`,
          "",
          "Three things worth knowing before you decide anything:",
          "",
          "• The window runs seven months — three months before the month you turn 65, that month, and three months after. Signing up early in it means coverage starts the month you turn 65; leaving it late pushes your start date back.",
          "• If you miss it without other qualifying coverage, the Part B late penalty is 10% for every full 12 months you could have had it — and you pay it for as long as you have Part B.",
          "• There's a separate six-month window for supplemental coverage that starts the month you're 65 and enrolled in Part B. Inside it your health history can't be used against you. Outside it, in most states, it can.",
          "",
          "No charge to talk any of this through, and no obligation. Book a time here:",
          AGENT.schedulingUrl,
          "",
          `Or just call me: ${AGENT.phone}`,
        ]
      : [
          `You asked me to let you know when Medicare's annual window opened. It opens on ${opens} and closes December 7.`,
          "",
          "It's worth a look even if nothing about your health has changed — plans change their pricing, their networks, and their covered medications every year, so the plan that fit last year may not be the one that fits now.",
          "",
          "Happy to check whether your current coverage is still the right one. No charge, no obligation:",
          AGENT.schedulingUrl,
          "",
          `Or just call me: ${AGENT.phone}`,
        ];

  const text = [
    `Hi ${firstName},`,
    "",
    ...body,
    reminderSignature(),
    "",
    "You're receiving this because you asked for this reminder. Reply 'stop' and I won't contact you again.",
  ].join("\n");

  try {
    const result = await sendEmail({
      to: input.email,
      subject:
        input.kind === "t65"
          ? "Your Medicare sign-up window is about to open"
          : "Medicare's annual window opens soon",
      text,
      replyTo: AGENT.email,
    });
    return result.ok;
  } catch (error) {
    console.error("[notifyLead] reminder send failed:", error);
    return false;
  }
}
