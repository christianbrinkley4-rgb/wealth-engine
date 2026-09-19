/**
 * Nurture engine: automated email follow-up for INBOUND website leads.
 *
 * The division of labor, deliberately:
 *   - The Command Center CRM is the human working layer (call queue, dialer,
 *     handset SMS, manual sequences). It owns OSCR/T65-list compliance.
 *   - This module is the automated layer for people who asked the WEBSITE to
 *     contact them. They gave consent on the site; every email carries a
 *     one-click unsubscribe and stops the moment they book, become a client,
 *     unsubscribe, or ask us to stop.
 *   - DeftSales/SmartAsset runs its own campaigns for bought leads.
 *
 * Nothing here ever touches OSCR/T65 list imports. Those leads have no email
 * consent on file and live only in the Command Center.
 *
 * Voice follows docs/CONTENT-VOICE.md: warm, plain, no invented stories or
 * statistics, no guarantees, no pressure. Educational emails carry the
 * general-information framing the site already uses.
 */

import { AGENT } from "@/lib/agent";
import { SITE_URL } from "@/lib/seo";

export const GOOGLE_REVIEW_URL = process.env.GOOGLE_REVIEW_URL?.trim() || "";

/** Lead statuses that end every automated sequence immediately. */
export const STOPPED_STATUSES = ["booked", "client", "closed"] as const;

export const REVIEW_SEQUENCE_KEY = "review";
export const REENGAGE_SEQUENCE_KEY = "reengage";

/** Days after a completed nurture with no booking before re-engagement starts. */
export const REENGAGE_AFTER_DAYS = 45;
/** Give up on a single send after this many failed attempts. */
export const MAX_SEND_ATTEMPTS = 5;

export interface NurtureEmailContext {
  firstName: string;
  unsubscribeUrl: string;
  bookingUrl: string;
  googleReviewUrl: string;
}

export interface NurtureStep {
  key: string;
  /** Days after enrollment the step becomes due. */
  dayOffset: number;
  subject: string;
  /** Paragraphs. "{greeting}" becomes "Hi {firstName},". Blank string = spacer. */
  paragraphs: string[];
  /** Educational steps carry the general-information framing. */
  generalInfo?: boolean;
}

export interface NurtureSequence {
  key: string;
  steps: NurtureStep[];
}

const GENERAL_INFO_LINE =
  "That's general information rather than advice about your particular situation — which is what I'd like to talk through with you.";

function footerText(ctx: NurtureEmailContext): string {
  return [
    "—",
    "You're receiving this because you asked me to get in touch through my website.",
    `Don't want these emails? Unsubscribe here: ${ctx.unsubscribeUrl}`,
    "",
    `${AGENT.name} · Licensed insurance agent · ${AGENT.city}, ${AGENT.state}`,
    `${AGENT.phone} · ${AGENT.email}`,
  ].join("\n");
}

function footerHtml(ctx: NurtureEmailContext): string {
  return (
    `<p style="color:#6b7280;font-size:13px;margin-top:32px;border-top:1px solid #e5e7eb;padding-top:16px">` +
    `You're receiving this because you asked me to get in touch through my website.<br>` +
    `<a href="${escapeHtml(ctx.unsubscribeUrl)}" style="color:#6b7280">Unsubscribe</a> — no hard feelings, one click and I stop.<br><br>` +
    `${escapeHtml(AGENT.name)} · Licensed insurance agent · ${escapeHtml(AGENT.city)}, ${escapeHtml(AGENT.state)}<br>` +
    `${escapeHtml(AGENT.phone)} · ${escapeHtml(AGENT.email)}</p>`
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function linkify(text: string): string {
  return escapeHtml(text).replace(
    /(https?:\/\/[^\s)]+)/g,
    '<a href="$1" style="color:#0f2241">$1</a>',
  );
}

function fillPlaceholders(text: string, ctx: NurtureEmailContext): string {
  const firstName = ctx.firstName || "there";
  return text
    .replace("{greeting}", `Hi ${firstName},`)
    .replace("{booking}", ctx.bookingUrl)
    .replace("{review}", ctx.googleReviewUrl)
    .replace("{unsubscribe}", ctx.unsubscribeUrl)
    .replace("{site}", SITE_URL)
    .replace("{phone}", AGENT.phone);
}

function renderText(step: NurtureStep, ctx: NurtureEmailContext): string {
  const body = step.generalInfo ? [...step.paragraphs, "", GENERAL_INFO_LINE] : step.paragraphs;
  return [...body.map((p) => fillPlaceholders(p, ctx)), "", footerText(ctx)].join("\n");
}

function renderHtml(step: NurtureStep, ctx: NurtureEmailContext): string {
  const body = step.generalInfo ? [...step.paragraphs, "", GENERAL_INFO_LINE] : step.paragraphs;
  const inner = body
    .map((p) => {
      if (p === "") return "";
      if (p.startsWith("• ")) return `<p style="margin:6px 0">• ${linkify(p.slice(2))}</p>`;
      return `<p style="margin:0 0 14px">${linkify(fillPlaceholders(p, ctx))}</p>`;
    })
    .join("\n");
  return (
    `<div style="font-family:Georgia,serif;font-size:17px;line-height:1.6;color:#0f2240;max-width:560px">` +
    inner +
    footerHtml(ctx) +
    `</div>`
  );
}

/** Render a step to a sendable email. Never throws on missing context. */
export function renderStep(
  step: NurtureStep,
  ctx: NurtureEmailContext,
): { subject: string; text: string; html: string } {
  return {
    subject: fillPlaceholders(step.subject, ctx),
    text: renderText(step, ctx),
    html: renderHtml(step, ctx),
  };
}

/* ---------------------------------------------------------------------------
 * MEDICARE nurture — the core sequence.
 * ------------------------------------------------------------------------- */
const medicareNurture: NurtureSequence = {
  key: "medicare-nurture",
  steps: [
    {
      key: "medicare-penalty",
      dayOffset: 1,
      subject: "The Medicare deadline that surprises people",
      generalInfo: true,
      paragraphs: [
        "{greeting}",
        "",
        "Quick follow-up to the questions you sent through my site — I wanted to put the rule that surprises people most in writing.",
        "",
        "If you delay Part B without qualifying coverage from current employment, your Part B premium goes up 10% for every full year you waited. That higher premium stays with you as long as you have Part B.",
        "",
        "Still working with group coverage is the usual exception. COBRA and retiree coverage usually are not — that mix-up is the one I see most.",
        "",
        "If timing is on your mind, there's a free tool on my site that finds your exact enrollment dates from your birthday. No email needed, no catch:",
        "{site}/turning-65#enrollment-dates",
        "",
        "Or just reply to this email — it comes straight to me.",
        "",
        "— Christian",
      ],
    },
    {
      key: "medicare-still-working",
      dayOffset: 3,
      subject: "Still working at 65?",
      generalInfo: true,
      paragraphs: [
        "{greeting}",
        "",
        "The most common fork in the road I walk people through: enroll in Medicare at 65, or delay because of job coverage.",
        "",
        "The key question is whether the coverage comes from a group plan based on current employment — yours or your spouse's — at an employer with 20 or more employees. Get that answer right and the timing usually works out. Get it wrong and the penalties tend to find you later.",
        "",
        "This is a ten-minute conversation that saves people real headaches. If you'd like to talk it through:",
        "{booking}",
        "",
        "Or reply here with your situation and I'll give you my honest read.",
        "",
        "— Christian",
      ],
    },
    {
      key: "medicare-costs",
      dayOffset: 7,
      subject: "What Medicare actually costs in 2026",
      generalInfo: true,
      paragraphs: [
        "{greeting}",
        "",
        "People ask me for the bottom line, so here it is: for 2026, Part B is $202.90 a month for most people, and the Part B deductible is $283. But your income, your timing, and your drug coverage can all move those numbers.",
        "",
        "I published a plain-English breakdown of the moving pieces — premiums, deductibles, IRMAA, and the penalties — so you can see the whole picture in one place:",
        "{site}/medicare-costs",
        "",
        "If any of it raises a question, reply and ask. That's what I'm here for.",
        "",
        "— Christian",
      ],
    },
    {
      key: "medicare-doctor",
      dayOffset: 14,
      subject: "Can you keep your doctor?",
      generalInfo: true,
      paragraphs: [
        "{greeting}",
        "",
        "It's the first question almost everyone asks me, so let's answer it properly: it depends on which path you choose, and you have to check the specific plan — not just whether the doctor “takes Medicare.”",
        "",
        "I wrote up the five steps to check before you enroll, so there are no surprises at the first appointment:",
        "{site}/keep-my-doctor",
        "",
        "If you'd rather I walk through it with you, that's exactly what the free consultation is for:",
        "{booking}",
        "",
        "— Christian",
      ],
    },
    {
      key: "medicare-checkin",
      dayOffset: 30,
      subject: "Checking in",
      paragraphs: [
        "{greeting}",
        "",
        "Wanted to check in once more. If the timing wasn't right when you first reached out, no worries at all — Medicare questions don't expire, and neither does my offer to help.",
        "",
        "When you're ready — whether that's next week or next year — we can sit down (in person or by phone) and go through your situation one question at a time. No cost, no obligation, no pressure.",
        "",
        "{booking}",
        "",
        "Or just reply to this email. I read every one.",
        "",
        "— Christian",
      ],
    },
  ],
};

/* ---------------------------------------------------------------------------
 * LIFE INSURANCE nurture.
 * ------------------------------------------------------------------------- */
const lifeNurture: NurtureSequence = {
  key: "life-nurture",
  steps: [
    {
      key: "life-first-question",
      dayOffset: 1,
      subject: "The life insurance question to ask first",
      generalInfo: true,
      paragraphs: [
        "{greeting}",
        "",
        "Most people start with “how much does it cost?” — but the better first question is “what is it for?” Income replacement, the mortgage, final expenses, leaving something behind: the purpose decides the shape of the policy.",
        "",
        "Broadly, term covers you for a set number of years and permanent covers you for life and builds cash value. Neither is right for everyone; the right one follows from what you're protecting.",
        "",
        "If you tell me the purpose, I'll tell you honestly what fits — including when the answer is “you may not need as much as you think.”",
        "",
        "{booking}",
        "",
        "— Christian",
      ],
    },
    {
      key: "life-price",
      dayOffset: 4,
      subject: "What actually sets the price",
      generalInfo: true,
      paragraphs: [
        "{greeting}",
        "",
        "Four things move a life insurance premium more than anything else: your age, your health, how long the coverage lasts, and how much coverage you buy.",
        "",
        "The practical takeaway: all else equal, the younger and healthier you are when you apply, the less it costs. That's the entire argument for not waiting until a health scare to look into it.",
        "",
        "If you'd like a sense of where you'd land, that's a straightforward conversation:",
        "",
        "{booking}",
        "",
        "— Christian",
      ],
    },
    {
      key: "life-mistakes",
      dayOffset: 10,
      subject: "Three mistakes I see people make",
      generalInfo: true,
      paragraphs: [
        "{greeting}",
        "",
        "Three patterns come up again and again:",
        "",
        "• Waiting until a health change to apply — then the price reflects the change.",
        "• Buying on premium alone without checking what the policy actually covers.",
        "• Naming beneficiaries once and never reviewing them — marriages, divorces, and new grandchildren happen.",
        "",
        "Any of these sound familiar? A review takes less time than you'd think:",
        "",
        "{booking}",
        "",
        "— Christian",
      ],
    },
    {
      key: "life-checkin",
      dayOffset: 21,
      subject: "Checking in",
      paragraphs: [
        "{greeting}",
        "",
        "Wanted to check in once more. If the timing wasn't right when you first reached out, no worries — I'm here when it is.",
        "",
        "No cost, no obligation, no pressure. Just a conversation about what you're protecting and whether your coverage still fits.",
        "",
        "{booking}",
        "",
        "— Christian",
      ],
    },
  ],
};

/* ---------------------------------------------------------------------------
 * FINANCIAL PLANNING nurture.
 * ------------------------------------------------------------------------- */
const financialNurture: NurtureSequence = {
  key: "financial-nurture",
  steps: [
    {
      key: "financial-ss-timing",
      dayOffset: 1,
      subject: "Social Security timing is a math problem",
      generalInfo: true,
      paragraphs: [
        "{greeting}",
        "",
        "You can start Social Security at 62, wait until full retirement age, or delay to 70. Earlier means smaller checks for more years; later means bigger checks for fewer. Which wins depends on your health, whether you keep working, and what other income you have.",
        "",
        "There's no universal right answer — but there is a right answer for you, and it's worth doing the arithmetic before you file. I work with an advisor on the financial planning side, so if you'd like, we can look at the whole picture together.",
        "",
        "{booking}",
        "",
        "— Christian",
      ],
    },
    {
      key: "financial-irmaa",
      dayOffset: 4,
      subject: "The Medicare premium surprise for higher earners",
      generalInfo: true,
      paragraphs: [
        "{greeting}",
        "",
        "If your income is above certain thresholds, Medicare charges you more — it's called IRMAA, and Social Security figures it from your tax return two years back.",
        "",
        "The part people miss: if your income has dropped since then — retirement will do that — you can ask Social Security to recalculate using your current income. It's a standard request, and it often lowers the bill.",
        "",
        "I wrote up how it works here:",
        "{site}/irmaa-appeal",
        "",
        "— Christian",
      ],
    },
    {
      key: "financial-income",
      dayOffset: 10,
      subject: "Retirement income, in one paragraph",
      generalInfo: true,
      paragraphs: [
        "{greeting}",
        "",
        "Retirement flips the equation: the paycheck stops, the bills don't. Most people's income becomes some mix of Social Security, savings, and maybe a pension — and the order you draw from them matters more than most people expect.",
        "",
        "You don't need a perfect plan on day one. You need a clear picture of what's coming in, what's going out, and which levers you can pull. That's a conversation, not a product:",
        "",
        "{booking}",
        "",
        "— Christian",
      ],
    },
    {
      key: "financial-checkin",
      dayOffset: 21,
      subject: "Checking in",
      paragraphs: [
        "{greeting}",
        "",
        "Wanted to check in once more. If the timing wasn't right when you first reached out, no worries — I'm here when it is.",
        "",
        "No cost, no obligation, no pressure. Just a conversation, one question at a time.",
        "",
        "{booking}",
        "",
        "— Christian",
      ],
    },
  ],
};

/* ---------------------------------------------------------------------------
 * CARE COVERAGE nurture.
 * ------------------------------------------------------------------------- */
const careNurture: NurtureSequence = {
  key: "care-nurture",
  steps: [
    {
      key: "care-gap",
      dayOffset: 1,
      subject: "What Medicare doesn't cover",
      generalInfo: true,
      paragraphs: [
        "{greeting}",
        "",
        "Here's the gap most people don't see coming: Medicare doesn't cover long-term custodial care — help with daily living like bathing, dressing, or eating, whether at home or in a facility.",
        "",
        "It's the single biggest uncovered risk in most retirement plans, and it's worth understanding before you need it, not after.",
        "",
        "If you'd like the plain-English version of the options, reply and I'll send it — or we can talk it through:",
        "",
        "{booking}",
        "",
        "— Christian",
      ],
    },
    {
      key: "care-options",
      dayOffset: 4,
      subject: "The options, in plain English",
      generalInfo: true,
      paragraphs: [
        "{greeting}",
        "",
        "When it comes to long-term care costs, there are really three paths: pay from savings, traditional long-term care insurance, or hybrid policies that combine life insurance with care benefits.",
        "",
        "Each has real trade-offs — cost, flexibility, what happens if you never need care — and the right one depends on your assets, your health, and your family situation. No product solves it for everyone.",
        "",
        "Happy to lay out the trade-offs for your situation, no pressure:",
        "",
        "{booking}",
        "",
        "— Christian",
      ],
    },
    {
      key: "care-timing",
      dayOffset: 10,
      subject: "When to think about it",
      generalInfo: true,
      paragraphs: [
        "{greeting}",
        "",
        "Two honest facts about timing. First, looking into this earlier means more options and typically lower costs. Second, health underwriting is real — waiting until you need care means the options have mostly closed.",
        "",
        "That's not pressure; it's just how the timing works. A conversation now keeps every door open:",
        "",
        "{booking}",
        "",
        "— Christian",
      ],
    },
    {
      key: "care-checkin",
      dayOffset: 21,
      subject: "Checking in",
      paragraphs: [
        "{greeting}",
        "",
        "Wanted to check in once more. If the timing wasn't right when you first reached out, no worries — I'm here when it is.",
        "",
        "No cost, no obligation, no pressure. Just a conversation, one question at a time.",
        "",
        "{booking}",
        "",
        "— Christian",
      ],
    },
  ],
};

/* ---------------------------------------------------------------------------
 * REVIEW sequence — enrolled when a consultation is booked.
 * ------------------------------------------------------------------------- */
const reviewSequence: NurtureSequence = {
  key: REVIEW_SEQUENCE_KEY,
  steps: [
    {
      key: "review-ask",
      dayOffset: 2,
      subject: "How did our conversation go?",
      paragraphs: [
        "{greeting}",
        "",
        "Thanks for sitting down with me. I hope it was useful.",
        "",
        "If it was, an honest Google review would mean a lot — it helps other folks in the Triad find real help from a local person instead of a call center. Only write what reflects your actual experience, and no pressure either way:",
        "",
        "{review}",
        "",
        "And if anything from our conversation was unclear, just reply — I'm still here.",
        "",
        "— Christian",
      ],
    },
    {
      key: "review-reminder",
      dayOffset: 9,
      subject: "A small favor, if you have a minute",
      paragraphs: [
        "{greeting}",
        "",
        "One more note on my last email: if you have a minute and our conversation was helpful, an honest Google review goes a long way for a local practice like mine.",
        "",
        "{review}",
        "",
        "If not, no worries at all — I'm glad we talked.",
        "",
        "— Christian",
      ],
    },
  ],
};

/* ---------------------------------------------------------------------------
 * RE-ENGAGE sequence — long-term nurture for leads that went quiet.
 * ------------------------------------------------------------------------- */
const reengageSequence: NurtureSequence = {
  key: REENGAGE_SEQUENCE_KEY,
  steps: [
    {
      key: "reengage-here",
      dayOffset: 0,
      subject: "Still here when you're ready",
      paragraphs: [
        "{greeting}",
        "",
        "It's been a little while since we were in touch. I wanted you to know I'm still here in Greensboro, still answering Medicare and insurance questions for folks across the Triad — same deal as ever: no cost, no obligation.",
        "",
        "If something's come up, or the timing is better now, just reply. I read every email myself.",
        "",
        "— Christian",
      ],
    },
    {
      key: "reengage-annual",
      dayOffset: 21,
      subject: "Your Medicare plan can change every year",
      generalInfo: true,
      paragraphs: [
        "{greeting}",
        "",
        "A quick reminder most people don't get from their plan: even if you liked your coverage this year, the costs, doctors, and drug coverage can all change next year. Plans re-file annually, and the new details land each fall.",
        "",
        "That's why I do a free fall review for folks across the Triad — we go through what's changing in your plan before you're locked in. Bring your current plan information and we'll take it one question at a time.",
        "",
        "{booking}",
        "",
        "— Christian",
      ],
    },
    {
      key: "reengage-permission",
      dayOffset: 42,
      subject: "Should I keep emailing?",
      paragraphs: [
        "{greeting}",
        "",
        "Last check-in from me for a while. If these emails have been useful, you don't need to do anything — I'll keep sending the occasional helpful note.",
        "",
        "If you'd rather stop, one click and I'm gone — no hard feelings, and you can always reach me directly when you need me:",
        "",
        "{unsubscribe}",
        "",
        "— Christian",
      ],
    },
  ],
};

const SEQUENCES: Record<string, NurtureSequence> = {
  [medicareNurture.key]: medicareNurture,
  [lifeNurture.key]: lifeNurture,
  [financialNurture.key]: financialNurture,
  [careNurture.key]: careNurture,
  [reviewSequence.key]: reviewSequence,
  [reengageSequence.key]: reengageSequence,
};

const TOPIC_SEQUENCES: Record<string, string> = {
  medicare: medicareNurture.key,
  life_insurance: lifeNurture.key,
  financial_planning: financialNurture.key,
  care_coverage: careNurture.key,
};

export function getSequence(key: string): NurtureSequence | null {
  return SEQUENCES[key] ?? null;
}

export function listSequenceKeys(): string[] {
  return Object.keys(SEQUENCES);
}

/** Which nurture sequence an inbound lead's topic maps to, if any. */
export function sequenceKeyForTopic(topic: string | null | undefined): string | null {
  if (!topic) return null;
  return TOPIC_SEQUENCES[topic] ?? null;
}

/** Calendar dates each step becomes due, counting from the enrollment date. */
export function buildSendPlan(
  sequenceKey: string,
  startDate: Date,
): { stepKey: string; sendAfter: string }[] {
  const sequence = getSequence(sequenceKey);
  if (!sequence) return [];
  return sequence.steps.map((step) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + step.dayOffset);
    return { stepKey: step.key, sendAfter: d.toISOString().slice(0, 10) };
  });
}

export interface EnrollDecision {
  enroll: boolean;
  reason: string;
}

/**
 * Pure eligibility check for automatic nurture enrollment. A lead enrolls only
 * when they gave consent on the site, have an email, are still early-stage,
 * and their topic maps to a sequence.
 */
export function shouldEnrollNurture(input: {
  consentGiven: boolean;
  email?: string | null;
  status?: string | null;
  topic?: string | null;
}): EnrollDecision {
  if (!input.consentGiven) return { enroll: false, reason: "no-consent" };
  if (!input.email || !input.email.includes("@")) return { enroll: false, reason: "no-email" };
  const status = (input.status ?? "new").toLowerCase();
  if ((STOPPED_STATUSES as readonly string[]).includes(status))
    return { enroll: false, reason: "stopped-status" };
  if (!sequenceKeyForTopic(input.topic ?? null))
    return { enroll: false, reason: "no-sequence-for-topic" };
  return { enroll: true, reason: "eligible" };
}

export function bookingUrlForTopic(topic: string | null | undefined): string {
  const base = SITE_URL.replace(/\/$/, "");
  void topic;
  return `${base}/start`;
}

export function defaultEmailContext(input: {
  fullName?: string | null;
  unsubscribeToken: string;
  topic?: string | null;
}): NurtureEmailContext {
  const firstName = (input.fullName || "").trim().split(" ")[0] || "there";
  const base = SITE_URL.replace(/\/$/, "");
  return {
    firstName,
    unsubscribeUrl: `${base}/unsubscribe?token=${encodeURIComponent(input.unsubscribeToken)}`,
    bookingUrl: bookingUrlForTopic(input.topic ?? null),
    googleReviewUrl: GOOGLE_REVIEW_URL,
  };
}
