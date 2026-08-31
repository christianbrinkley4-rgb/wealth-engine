import { NextRequest, NextResponse } from "next/server";

import { AGENT } from "@/lib/agent";
import { scoreLead } from "@/lib/leadScoring";
import { sendMetaLeadEvent } from "@/lib/metaCapi";
import {
  isLeadNotifyConfigured,
  isProspectEmailConfigured,
  notifyLeadCaptured,
  sendProspectAutoReply,
} from "@/lib/notifyLead";
import { getClientIp, isRateLimited } from "@/lib/rateLimit";
import { getSupabaseAdmin, hasSupabaseAdminConfig } from "@/lib/supabase";
import { verifyTurnstile } from "@/lib/turnstile";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const VALID_SOURCES = [
  "help_quiz",
  "wizard_completion",
  "roth_calculator",
  "about_page_cta",
] as const;

const VALID_INTEREST_TOPICS = ["medicare", "financial_planning", "life_insurance"] as const;

type ValidSource = (typeof VALID_SOURCES)[number];
type InterestTopic = (typeof VALID_INTEREST_TOPICS)[number];

interface Attribution extends Record<string, string | undefined> {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  gclid?: string;
  referrer?: string;
  landing_path?: string;
  captured_at?: string;
}

interface LeadPayload {
  /** "partial" = reached the contact step; "complete" = submitted contact details. */
  stage?: "partial" | "complete";
  email?: string;
  source?: string;
  full_name?: string;
  phone_number?: string | null;
  zip_code?: string;
  interest_topic?: string;
  quiz_answers?: Record<string, unknown> | null;
  attribution?: Attribution | null;
  event_id?: string;
  consent_given?: boolean;
  consent_text?: string;
  consent_version?: string;
  sms_consent?: boolean;
  sms_consent_text?: string | null;
  /** Medicare/Roth calculator fields. */
  filing_status?: "individual" | "married_jointly";
  age?: number;
  annual_income?: number;
  calculated_premium?: number;
  irmaa_bracket?: string;
  /** Honeypot. Any non-empty value means a bot filled the form. */
  website?: string;
  turnstile_token?: string;
  /** Only set by the partial path. */
  reached?: string;
}

const CONFIG_ERROR = {
  error: `I can’t save that right now — please email me at ${AGENT.email} or call ${AGENT.phone} and I’ll pick it up directly.`,
  code: "storage_unavailable",
};

function normalizePhoneDigits(value: string | null | undefined) {
  if (!value) return "";
  return value.replace(/\D/g, "");
}

function isValidSource(value: string | undefined): value is ValidSource {
  return VALID_SOURCES.includes(value as ValidSource);
}

function isValidInterestTopic(value: string | undefined): value is InterestTopic {
  return VALID_INTEREST_TOPICS.includes(value as InterestTopic);
}

function normalizeQuizAnswers(value: LeadPayload["quiz_answers"]): Record<string, unknown> | null {
  if (value == null) return null;
  if (typeof value !== "object" || Array.isArray(value)) return null;
  return value;
}

function normalizeAttribution(value: Attribution | null | undefined): Attribution | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const allowed: (keyof Attribution)[] = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "fbclid",
    "gclid",
    "referrer",
    "landing_path",
    "captured_at",
  ];
  const out: Attribution = {};
  for (const key of allowed) {
    const raw = value[key];
    if (typeof raw === "string" && raw.trim()) out[key] = raw.trim().slice(0, 300);
  }
  return Object.keys(out).length > 0 ? out : null;
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const userAgent = request.headers.get("user-agent");

  try {
    if (isRateLimited(`capture-lead:${ip}`, { limit: 10, windowMs: 60_000 })) {
      return NextResponse.json(
        { error: "That’s a few too many submissions in a row. Try again in a minute." },
        { status: 429 },
      );
    }

    let body: LeadPayload;
    try {
      body = (await request.json()) as LeadPayload;
    } catch {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    // Honeypot: pretend it worked so the bot doesn’t retry with a new shape.
    if (typeof body.website === "string" && body.website.trim().length > 0) {
      return NextResponse.json({ success: true });
    }

    const storageAvailable = hasSupabaseAdminConfig();
    let supabase: ReturnType<typeof getSupabaseAdmin> | null = null;

    if (storageAvailable) {
      try {
        supabase = getSupabaseAdmin();
      } catch (configErr) {
        console.error("[capture-lead] Supabase client init failed:", configErr);
      }
    } else {
      console.error("[capture-lead] Supabase is not configured.");
    }

    // A partial session is analytics. If storage is down there is nothing worth
    // rescuing, so fail quietly rather than showing the visitor an error for
    // something they didn’t ask for.
    if (!supabase && body.stage === "partial") {
      return NextResponse.json({ success: true, stage: "partial" });
    }

    const attribution = normalizeAttribution(body.attribution);
    const interest_topic = isValidInterestTopic(body.interest_topic) ? body.interest_topic : null;
    const quiz_answers = normalizeQuizAnswers(body.quiz_answers);

    /* ---------------------------------------------------------------
     * Partial lead: someone reached the contact step and hasn’t given
     * details yet. No contact info, no consent — just enough to know an
     * ad produced real interest and where it stalled.
     * ------------------------------------------------------------- */
    if (body.stage === "partial") {
      if (!interest_topic) {
        return NextResponse.json({ error: "Invalid topic." }, { status: 400 });
      }

      const { error } = await supabase!.from("lead_events").insert({
        interest_topic,
        quiz_answers,
        attribution,
        reached: typeof body.reached === "string" ? body.reached.slice(0, 40) : null,
        ip_hint: ip,
      });

      if (error) {
        // A missing analytics table must never surface to the visitor.
        console.error("[capture-lead] partial insert failed:", error.message);
      }
      return NextResponse.json({ success: true, stage: "partial" });
    }

    /* ---------------------------------------------------------------
     * Complete lead.
     * ------------------------------------------------------------- */
    const turnstile = await verifyTurnstile(body.turnstile_token, ip);
    if (!turnstile.ok) {
      return NextResponse.json(
        { error: "Couldn’t verify that you’re a person. Refresh the page and try once more." },
        { status: 400 },
      );
    }

    if (!isValidSource(body.source)) {
      return NextResponse.json({ error: "Invalid source." }, { status: 400 });
    }
    const source = body.source;

    const email = body.email?.trim().toLowerCase() ?? "";
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address.", field: "email" },
        { status: 400 },
      );
    }

    const full_name = body.full_name?.trim() || null;
    const phoneDigits = normalizePhoneDigits(body.phone_number);
    if (phoneDigits.length > 0 && phoneDigits.length < 10) {
      return NextResponse.json(
        { error: "Please enter a complete phone number, or leave it blank.", field: "phone" },
        { status: 400 },
      );
    }
    const phone_number = phoneDigits.length >= 10 ? phoneDigits.slice(0, 10) : null;

    const zipDigits = body.zip_code?.replace(/\D/g, "").slice(0, 5) || "";
    if (source === "help_quiz" && zipDigits.length !== 5) {
      return NextResponse.json(
        { error: "Please enter a valid 5-digit ZIP code.", field: "zip_code" },
        { status: 400 },
      );
    }
    const zip_code = zipDigits.length === 5 ? zipDigits : null;

    if (source === "help_quiz") {
      if (!full_name) {
        return NextResponse.json(
          { error: "Please enter your name.", field: "full_name" },
          { status: 400 },
        );
      }
      if (!interest_topic) {
        return NextResponse.json(
          { error: "Please choose what you’d like help with.", field: "interest_topic" },
          { status: 400 },
        );
      }
      // Consent is proven, not assumed: we store what they saw and agreed to.
      if (body.consent_given !== true || !body.consent_text) {
        return NextResponse.json(
          { error: "Please check the consent box so I know it’s alright to contact you." },
          { status: 400 },
        );
      }
    }

    const filing_status =
      body.filing_status === "individual" || body.filing_status === "married_jointly"
        ? body.filing_status
        : null;
    const age = body.age != null ? Math.min(Math.max(Math.round(body.age), 18), 100) : null;
    const annual_income = body.annual_income != null ? Math.max(0, body.annual_income) : null;

    const { score, risk } = scoreLead({
      age,
      annual_income,
      filing_status,
      calculated_premium: body.calculated_premium ?? null,
      source,
      zip_code,
    });

    const row = {
      email,
      source,
      full_name,
      phone_number,
      zip_code,
      interest_topic,
      quiz_answers,
      attribution,
      filing_status,
      age,
      annual_income,
      calculated_premium: body.calculated_premium ?? null,
      irmaa_bracket: body.irmaa_bracket ?? null,
      // Proof of consent, not a hardcoded boolean.
      consent_given: body.consent_given === true,
      consent_text: body.consent_text ?? null,
      consent_version: body.consent_version ?? null,
      consent_ip: ip,
      consent_user_agent: userAgent?.slice(0, 400) ?? null,
      consent_at: new Date().toISOString(),
      // Permission to call is not permission to text, so this is its own flag
      // with its own stored wording — and it only counts with a phone number.
      sms_consent: Boolean(body.sms_consent) && Boolean(phone_number),
      sms_consent_text: body.sms_consent && phone_number ? (body.sms_consent_text ?? null) : null,
      sms_consent_at: body.sms_consent && phone_number ? new Date().toISOString() : null,
      lead_score: score,
      irmaa_risk_status: risk,
      status: "new",
    };

    /*
     * Storage is best-effort; the alert is not. A lead that reaches Christian’s
     * inbox but not the database is a bad day. A lead that reaches neither is a
     * paid click thrown away — so if the insert can’t happen, we still send the
     * notification and tell the visitor it went through, because it did.
     */
    let stored = false;
    let existing: { id: string; lead_score: number | null } | null = null;
    let finalScore = score;

    if (supabase) {
      try {
        // De-duplicate repeat submissions from the same person in the same day.
        const cutoff = new Date(Date.now() - 86_400_000).toISOString();
        const { data: existingRows } = await supabase
          .from("leads")
          .select("id, lead_score")
          .eq("email", email)
          .eq("source", source)
          .gte("created_at", cutoff)
          .order("created_at", { ascending: false })
          .limit(1);

        existing = existingRows?.[0] ?? null;
        finalScore = existing ? Math.max(score, existing.lead_score ?? 0) : score;

        if (existing) {
          const { error } = await supabase
            .from("leads")
            .update({ ...row, lead_score: finalScore })
            .eq("id", existing.id);
          if (error) throw new Error(error.message);
        } else {
          const { error } = await supabase.from("leads").insert(row);
          if (error) throw new Error(error.message);
        }
        stored = true;
      } catch (storageError) {
        console.error("[capture-lead] STORAGE FAILED — falling back to alert only:", storageError);
      }
    }

    if (!stored && !isLeadNotifyConfigured()) {
      // Nowhere to put it and nobody to tell. This is the only case where the
      // visitor must be asked to reach out another way.
      console.error("[capture-lead] LEAD LOST — no storage and no alert channel configured.");
      return NextResponse.json(CONFIG_ERROR, { status: 503 });
    }

    // When the database write failed, the alert IS the lead — so send it before
    // answering, and only claim success if it actually went out.
    if (!stored) {
      const delivered = await notifyLeadCaptured({
        storageFailed: true,
        source,
        email,
        full_name,
        phone_number,
        zip_code,
        interest_topic,
        quiz_answers,
        lead_score: finalScore,
        attribution,
      });

      if (!delivered) {
        console.error("[capture-lead] LEAD LOST — storage failed and no alert was delivered.");
        return NextResponse.json(CONFIG_ERROR, { status: 503 });
      }

      await Promise.allSettled([
        sendProspectAutoReply({
          email,
          full_name,
          interest_topic,
          quiz_answers,
          source,
          calculated_premium: body.calculated_premium ?? null,
          irmaa_bracket: body.irmaa_bracket ?? null,
        }),
      ]);

      return NextResponse.json({
        success: true,
        stored: false,
        emailConfigured: isProspectEmailConfigured(),
      });
    }

    // Everything past this point is delivery, not storage. The lead is already
    // safe, so no failure here may turn into an error for the visitor.
    const sourceUrl = request.headers.get("referer") ?? undefined;

    await Promise.allSettled([
      notifyLeadCaptured({
        source,
        email,
        full_name,
        phone_number,
        zip_code,
        interest_topic,
        quiz_answers,
        lead_score: finalScore,
        attribution,
      }),
      sendProspectAutoReply({
        email,
        full_name,
        interest_topic,
        quiz_answers,
        source,
        calculated_premium: body.calculated_premium ?? null,
        irmaa_bracket: body.irmaa_bracket ?? null,
      }),
      sendMetaLeadEvent({
        eventId: body.event_id ?? `lead_${Date.now()}`,
        email,
        phone: phone_number,
        zip: zip_code,
        firstName: full_name,
        clientIp: ip,
        userAgent,
        fbclid: attribution?.fbclid ?? null,
        sourceUrl,
        topic: interest_topic,
      }),
    ]);

    /*
     * `emailConfigured` is not a detail the visitor needs, but the thank-you
     * page does. Without an email provider set, sendProspectAutoReply is a
     * no-op — and the confirmation page was still telling people their answers
     * were on their way to their inbox. Promising an email that cannot be sent
     * is worse than not promising one, particularly on a site whose entire
     * argument is that it does what it says.
     */
    return NextResponse.json({
      success: true,
      updated: Boolean(existing),
      stored,
      emailConfigured: isProspectEmailConfigured(),
    });
  } catch (err) {
    console.error("[capture-lead] Unhandled error:", err);
    return NextResponse.json(
      {
        error: `Something went wrong saving that. Please email me at ${AGENT.email} and I’ll follow up directly.`,
      },
      { status: 500 },
    );
  }
}
