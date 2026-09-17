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
import {
  describeAnswers,
  getValueBeat,
  inSentence,
  isHelpQuizTopic,
  TOPIC_LABELS,
} from "@/lib/helpQuiz";
import { timelineFromAnswers, timelineSummary } from "@/lib/enrollmentTimeline";
import { formatLongDate } from "@/lib/reminders";
import { SITE_URL as PUBLIC_SITE_URL } from "@/lib/seo";

const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL?.trim() || "";
const MAKE_WEBHOOK_SECRET = process.env.MAKE_WEBHOOK_SECRET?.trim() || "";
const RESEND_API_KEY = process.env.RESEND_API_KEY?.trim() || "";
const LEAD_NOTIFY_EMAIL = process.env.LEAD_NOTIFY_EMAIL?.trim() || AGENT.email;
const RESEND_FROM = process.env.RESEND_FROM?.trim() || "";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "";

/** Keep the selected service, never names, email addresses, or answers, in booking links. */
function bookingPageUrl(topic: string | null | undefined): string {
  const url = new URL(AGENT.schedulingUrl, PUBLIC_SITE_URL);
  if (isHelpQuizTopic(topic)) url.searchParams.set("topic", topic);
  return url.toString();
}

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

/**
 * Every outbound channel answers the same two questions: did it deliver, and
 * is it worth trying again?
 *
 * `retryable` is deliberately narrow. A refused address, a malformed payload
 * or a revoked key will fail identically forever, and re-sending those only
 * burns provider reputation. Only a transport failure, a timeout, a 429 or a
 * 5xx says "the message was fine, the moment wasn't".
 *
 * `skipped` means the channel is not configured, so nothing was attempted and
 * nothing is owed - distinct from a real failure, and never recorded as one.
 */
export type DeliveryResult = {
  ok: boolean;
  retryable: boolean;
  skipped?: boolean;
  status?: number;
  /** Provider-side message id, when the provider returns one. */
  providerId?: string;
  error?: string;
  recipient?: string;
  subject?: string;
  bodyText?: string;
  replyTo?: string;
};

const DELIVERY_SKIPPED: DeliveryResult = { ok: false, retryable: false, skipped: true };

/** Connection refused, DNS failure, dropped socket, or AbortSignal.timeout firing. */
function transportFailure(error: unknown): DeliveryResult {
  const message = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
  return { ok: false, retryable: true, error: message.slice(0, 300) };
}

function isRetryableStatus(status: number) {
  return status === 429 || status >= 500;
}

/** A body is optional on some providers and in tests; never assume one exists. */
async function readBody(res: Response): Promise<string> {
  if (typeof res.text !== "function") return "";
  return res.text().then(
    (body) => body ?? "",
    () => "",
  );
}

async function readProviderId(res: Response): Promise<string | undefined> {
  if (typeof res.json !== "function") return undefined;
  try {
    const data: unknown = await res.json();
    const id = (data as { id?: unknown } | null)?.id;
    return typeof id === "string" && id.length > 0 ? id.slice(0, 200) : undefined;
  } catch {
    return undefined;
  }
}

/** Retry-After is the provider saying when. Keep it in the recorded error text. */
function retryAfterOf(res: Response): string | null {
  const value = res.headers?.get?.("retry-after");
  return typeof value === "string" && value.length > 0 ? value : null;
}

function describeRejection(status: number, body: string, retryAfter: string | null) {
  return [`HTTP ${status}`, retryAfter ? `retry-after ${retryAfter}` : "", body.slice(0, 300)]
    .filter(Boolean)
    .join(" · ");
}

/** Resend an exact stored snapshot from the outbox (retry worker). */
export async function sendStoredEmailSnapshot(options: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string | null;
}): Promise<DeliveryResult> {
  return sendEmail({
    to: options.to,
    subject: options.subject,
    text: options.text,
    replyTo: options.replyTo || undefined,
  });
}

async function sendEmail(options: {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}): Promise<DeliveryResult> {
  if (!resendConfigured()) return DELIVERY_SKIPPED;

  let res: Response;
  try {
    res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(8000),
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
  } catch (error) {
    console.error("[notifyLead] Resend unreachable:", error);
    return {
      ...transportFailure(error),
      recipient: options.to,
      subject: options.subject,
      bodyText: options.text,
      replyTo: options.replyTo,
    };
  }

  const snapshot = {
    recipient: options.to,
    subject: options.subject,
    bodyText: options.text,
    replyTo: options.replyTo,
  };

  if (res.ok) {
    return {
      ok: true,
      retryable: false,
      status: res.status,
      providerId: await readProviderId(res),
      ...snapshot,
    };
  }

  const body = await readBody(res);
  const retryAfter = retryAfterOf(res);
  console.error("[notifyLead] Resend rejected:", res.status, body);
  return {
    ok: false,
    retryable: isRetryableStatus(res.status),
    status: res.status,
    error: describeRejection(res.status, body, retryAfter),
    ...snapshot,
  };
}

async function postMakeWebhook(payload: LeadNotifyPayload): Promise<DeliveryResult> {
  if (!makeConfigured()) return DELIVERY_SKIPPED;

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
    let res: Response;
    try {
      res = await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers,
        body,
        signal: controller.signal,
      });
      // The one immediate in-request retry that already existed: a 5xx from
      // Make is usually a scenario restarting, and a second try lands.
      if (!res.ok && res.status >= 500) {
        res = await fetch(MAKE_WEBHOOK_URL, {
          method: "POST",
          headers,
          body,
          signal: AbortSignal.timeout(8000),
        });
      }
    } catch (error) {
      console.error("[notifyLead] Make webhook unreachable:", error);
      return transportFailure(error);
    }

    if (res.ok) return { ok: true, retryable: false, status: res.status };
    return {
      ok: false,
      retryable: isRetryableStatus(res.status),
      status: res.status,
      error: describeRejection(res.status, await readBody(res), retryAfterOf(res)),
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function sendSmsAlert(payload: LeadNotifyPayload): Promise<DeliveryResult> {
  if (!smsConfigured()) return DELIVERY_SKIPPED;

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

  let res: Response;
  try {
    res = await fetch(
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
  } catch (error) {
    console.error("[notifyLead] Twilio unreachable:", error);
    return transportFailure(error);
  }

  if (res.ok) return { ok: true, retryable: false, status: res.status };
  return {
    ok: false,
    retryable: isRetryableStatus(res.status),
    status: res.status,
    error: describeRejection(res.status, await readBody(res), retryAfterOf(res)),
  };
}

/**
 * Alert Christian. Never throws.
 *
 * `ok` is true when at least one channel actually delivered — the caller uses
 * that to decide whether a lead whose database write failed can still be
 * reported to the visitor as received. `retryable` is true when nothing landed
 * but at least one channel failed in a way a later attempt could survive, so
 * the outbox row stays claimable rather than being written off.
 */
export async function notifyLeadCaptured(payload: LeadNotifyPayload): Promise<DeliveryResult> {
  if (!makeConfigured() && !resendConfigured() && !smsConfigured()) {
    console.error(
      "[notifyLead] NO ALERT CHANNEL CONFIGURED — a lead was saved and nobody was told. " +
        "Set RESEND_API_KEY + RESEND_FROM (and optionally MAKE_WEBHOOK_URL / Twilio vars).",
    );
    return DELIVERY_SKIPPED;
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
    "Review their answers and preferred contact details in the command center.",
    "Check for an existing appointment before following up.",
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

  let delivered: DeliveryResult | null = null;
  let attempted = false;
  let retryable = false;
  const errors: string[] = [];
  let snapshot: Pick<DeliveryResult, "recipient" | "subject" | "bodyText" | "replyTo"> | undefined;

  for (const result of results) {
    const value =
      result.status === "rejected"
        ? transportFailure(result.reason)
        : (result.value ?? DELIVERY_SKIPPED);
    if (result.status === "rejected") console.error("[notifyLead] channel failed:", result.reason);
    if (value.skipped) continue;
    attempted = true;
    if (value.recipient && value.bodyText) {
      snapshot = {
        recipient: value.recipient,
        subject: value.subject,
        bodyText: value.bodyText,
        replyTo: value.replyTo,
      };
    }
    if (value.ok) {
      delivered ??= value;
      continue;
    }
    console.error("[notifyLead] channel returned non-OK:", value);
    retryable ||= value.retryable;
    if (value.error) errors.push(value.error);
  }

  // One channel landing is enough: Christian has been told.
  if (delivered) return delivered;

  if (!attempted) return DELIVERY_SKIPPED;

  console.error("[notifyLead] EVERY CHANNEL FAILED — nobody was told about this lead.");
  return {
    ok: false,
    retryable,
    error: errors.join(" | ").slice(0, 500) || undefined,
    ...snapshot,
  };
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
}): Promise<DeliveryResult> {
  if (!resendConfigured()) {
    console.error("[notifyLead] Auto-reply skipped — RESEND_API_KEY / RESEND_FROM not set.");
    return DELIVERY_SKIPPED;
  }

  // Calculator captures have figures instead of quiz answers.
  if (!isHelpQuizTopic(input.interest_topic)) {
    return sendCalculatorAutoReply(input);
  }

  const firstName = (input.full_name || "").trim().split(" ")[0] || "there";
  const beat = getValueBeat(
    input.interest_topic,
    (input.quiz_answers ?? {}) as Record<string, string>,
  );
  const topic = TOPIC_LABELS[input.interest_topic];
  const bookingUrl = bookingPageUrl(input.interest_topic);
  // "Email me my dates" from the timeline tool. Dates are recomputed here from
  // the month and year, never copied from submitted text.
  const timelineInput = timelineFromAnswers(input.quiz_answers);
  const dates = timelineInput ? timelineSummary(timelineInput) : null;
  const intro = dates
    ? `Here are the Medicare dates you looked up on my site, for turning 65 in ${dates.turns65}:`
    : `Thanks for the questions about ${inSentence(topic)}. Here’s what you saw on the site, so you have it in writing:`;

  const text = [
    `Hi ${firstName},`,
    "",
    intro,
    "",
    ...(dates
      ? [
          ...dates.rows.map((row) => `• ${row.label}: ${row.value}`),
          "",
          "These are estimates. Coverage through your job or your spouse’s job can change the right timing, so check before you delay anything.",
          "",
        ]
      : []),
    // Not upper-cased: a full sentence in caps reads as a marketing blast, and
    // this email’s whole job is to look like it came from a person.
    beat.headline,
    "",
    beat.lede,
    "",
    ...beat.points.map((p) => `• ${p}`),
    "",
    "That’s general information rather than advice about your particular situation — which is what I’d like to talk through with you.",
    "",
    `You can arrange a conversation here: ${bookingUrl}`,
    `Or just call or text me: ${AGENT.phone}`,
    "",
    "Your request came directly to me. You can reply to this email with a question.",
    "",
    AGENT.name,
    "Licensed insurance agent · " + AGENT.city + ", " + AGENT.state,
    AGENT.email,
    SITE_URL,
    "",
    "You’re receiving this because you asked me to get in touch through my website. Reply STOP and I won’t contact you again.",
  ].join("\n");

  const html = `
    <div style="font-family:Georgia,serif;font-size:17px;line-height:1.6;color:#0f2241;max-width:560px">
      <p>Hi ${escapeHtml(firstName)},</p>
      <p>${escapeHtml(intro)}</p>
      ${
        dates
          ? `<table style="border-collapse:collapse;width:100%;margin:8px 0 20px">${dates.rows
              .map(
                (row) =>
                  `<tr><td style="padding:10px 12px 10px 0;border-bottom:1px solid #d9ded8;vertical-align:top">${escapeHtml(row.label)}</td><td style="padding:10px 0;border-bottom:1px solid #d9ded8;font-weight:600;vertical-align:top;white-space:nowrap">${escapeHtml(row.value)}</td></tr>`,
              )
              .join(
                "",
              )}</table><p style="color:#4a5563;font-size:15px">These are estimates. Coverage through your job or your spouse’s job can change the right timing, so check before you delay anything.</p>`
          : ""
      }
      <p style="font-size:19px;font-weight:600;margin:24px 0 8px">${escapeHtml(beat.headline)}</p>
      <p>${escapeHtml(beat.lede)}</p>
      <ul style="padding-left:20px">
        ${beat.points.map((p) => `<li style="margin-bottom:10px">${escapeHtml(p)}</li>`).join("")}
      </ul>
      <p style="color:#4a5563;font-size:15px">That’s general information rather than advice about your particular situation — which is what I’d like to talk through with you.</p>
      <p style="margin:28px 0">
        <a href="${escapeHtml(bookingUrl)}" style="background:#0f2241;color:#f5f0e8;padding:14px 22px;border-radius:8px;text-decoration:none;display:inline-block;font-family:Helvetica,Arial,sans-serif;font-weight:600">Arrange a conversation</a>
      </p>
      <p>Or just call or text me: <strong>${AGENT.phone}</strong>. Your request came directly to me, and you can reply to this email with a question.</p>
      <p style="margin-top:28px">${escapeHtml(AGENT.name)}<br>
      <span style="color:#4a5563">Licensed insurance agent · ${AGENT.city}, ${AGENT.state}</span><br>
      <a href="mailto:${AGENT.email}" style="color:#0f2241">${AGENT.email}</a></p>
      <p style="color:#6b7280;font-size:13px;border-top:1px solid #d1d5db;padding-top:12px;margin-top:28px">
        You’re receiving this because you asked me to get in touch through my website. Reply STOP and I won’t contact you again.
      </p>
    </div>`;

  try {
    return await sendEmail({
      to: input.email,
      subject: dates
        ? `Your Medicare dates — from ${AGENT.name}`
        : `Your ${inSentence(topic)} questions — from ${AGENT.name}`,
      text,
      html,
      replyTo: AGENT.email,
    });
  } catch (error) {
    console.error("[notifyLead] auto-reply failed:", error);
    return transportFailure(error);
  }
}

/** The calculator equivalent: their numbers back, plus a way to book time. */
async function sendCalculatorAutoReply(input: {
  email: string;
  full_name?: string | null;
  source?: string;
  calculated_premium?: number | null;
  irmaa_bracket?: string | null;
}): Promise<DeliveryResult> {
  const firstName = (input.full_name || "").trim().split(" ")[0] || "there";
  const isRoth = input.source === "roth_calculator";
  const label = isRoth ? "Roth conversion estimate" : "Medicare premium estimate";
  const bookingUrl = bookingPageUrl(isRoth ? "financial_planning" : "medicare");

  const figure =
    input.calculated_premium != null && input.calculated_premium > 0
      ? `Estimated monthly Part B premium: $${input.calculated_premium.toFixed(2)}${
          input.irmaa_bracket ? ` (${input.irmaa_bracket})` : ""
        }`
      : null;

  const text = [
    `Hi ${firstName},`,
    "",
    `Here’s the ${inSentence(label)} you ran on my site.`,
    "",
    figure,
    "",
    "Two things worth knowing about that number: it’s an estimate for education rather than a quote, and Medicare sets premiums from a tax return two years old — so if your income has changed since then, the real figure can differ, and in some cases it can be appealed.",
    "",
    `Happy to walk through what applies to you. Arrange a conversation: ${bookingUrl}`,
    `Or call or text me: ${AGENT.phone}`,
    "",
    AGENT.name,
    `Licensed insurance agent · ${AGENT.city}, ${AGENT.state}`,
    AGENT.email,
    "",
    "You’re receiving this because you asked me to email your results. Reply STOP and I won’t contact you again.",
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  try {
    return await sendEmail({
      to: input.email,
      subject: `Your ${inSentence(label)} — from ${AGENT.name}`,
      text,
      replyTo: AGENT.email,
    });
  } catch (error) {
    console.error("[notifyLead] calculator auto-reply failed:", error);
    return transportFailure(error);
  }
}

export function isLeadNotifyConfigured() {
  return makeConfigured() || smsConfigured() || resendConfigured();
}

/**
 * Can this deployment actually email the person who filled the form?
 *
 * Distinct from isLeadNotifyConfigured, which answers the different question
 * of whether *Christian* would be told. Those come apart: an SMS alert or a
 * Make webhook tells him a lead arrived without giving the visitor anything,
 * and the confirmation page must not promise an email in that case. Only
 * Resend sends the prospect auto-reply, so only Resend counts here.
 */
export function isProspectEmailConfigured() {
  return resendConfigured();
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
          `I’ll email you on ${remindOn}, a couple of weeks ahead of it, so you have time to look at options rather than deciding in a hurry.`,
          "",
          "Nothing to do until then. If something changes or you’d rather talk sooner, just call me.",
        ]
      : [
          `Medicare’s annual window runs October 15 to December 7, and this year it opens on ${opens}.`,
          "",
          `I’ll email you on ${remindOn} so you have a couple of weeks to look at whether your current coverage still fits before the window closes.`,
          "",
          "Nothing to do until then. Worth knowing: drug plans change their pricing and covered medications every year, so it’s worth a look even when nothing about your health has changed.",
        ];

  const text = [
    `Hi ${firstName},`,
    "",
    "That’s set.",
    "",
    ...body,
    reminderSignature(),
    "",
    "You’re receiving this because you asked for a reminder on my website. Reply STOP and I’ll remove you.",
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
          "• There’s a separate six-month window for supplemental coverage that starts the month you’re 65 and enrolled in Part B. Inside it your health history can’t be used against you. Outside it, in most states, it can.",
          "",
          "No charge to talk any of this through, and no obligation. Book a time here:",
          bookingPageUrl("medicare"),
          "",
          `Or just call me: ${AGENT.phone}`,
        ]
      : [
          `You asked me to let you know when Medicare’s annual window opened. It opens on ${opens} and closes December 7.`,
          "",
          "It’s worth a look even if nothing about your health has changed — plans change their pricing, their networks, and their covered medications every year, so the plan that fit last year may not be the one that fits now.",
          "",
          "Happy to check whether your current coverage is still the right one. No charge, no obligation:",
          bookingPageUrl("medicare"),
          "",
          `Or just call me: ${AGENT.phone}`,
        ];

  const text = [
    `Hi ${firstName},`,
    "",
    ...body,
    reminderSignature(),
    "",
    "You’re receiving this because you asked for this reminder. Reply STOP and I won’t contact you again.",
  ].join("\n");

  try {
    const result = await sendEmail({
      to: input.email,
      subject:
        input.kind === "t65"
          ? "Your Medicare sign-up window is about to open"
          : "Medicare’s annual window opens soon",
      text,
      replyTo: AGENT.email,
    });
    return result.ok;
  } catch (error) {
    console.error("[notifyLead] reminder send failed:", error);
    return false;
  }
}
