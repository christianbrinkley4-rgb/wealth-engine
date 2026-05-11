import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const VALID_SOURCES = [
  "wizard_completion",
  "wizard_soft_ask",
  "exit_intent",
  "footer_subscribe",
  "pdf_request",
  "tax_waitlist",
  "sms_optin",
  "about_page_cta",
] as const;

type ValidSource = (typeof VALID_SOURCES)[number];

interface LeadPayload {
  email?: string;
  source?: string;
  phone_number?: string;
  net_triggered?: string;
  zip_code?: string;
  filing_status?: "individual" | "married_jointly";
  age?: number;
  annual_income?: number;
  calculated_premium?: number;
  irmaa_bracket?: string;
}

function normalizePhoneDigits(value: string | undefined) {
  if (!value) return "";
  return value.replace(/\D/g, "");
}

function resolveEmailForPayload(body: LeadPayload): string | null {
  const raw = body.email?.trim() ?? "";
  if (EMAIL_REGEX.test(raw)) {
    return raw.toLowerCase();
  }

  if (body.source === "sms_optin") {
    const digits = normalizePhoneDigits(body.phone_number);
    if (digits.length >= 10) {
      return `sms+${digits}@optin.wealth-engine.local`;
    }
  }
  return null;
}

function isValidSource(value: string | undefined): value is ValidSource {
  return VALID_SOURCES.includes(value as ValidSource);
}

function normalizeFilingStatus(value: LeadPayload["filing_status"]) {
  return value === "individual" || value === "married_jointly" ? value : null;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LeadPayload;

    if (!isValidSource(body.source)) {
      return NextResponse.json({ error: "Invalid source." }, { status: 400 });
    }

    if (body.source === "sms_optin") {
      const digits = normalizePhoneDigits(body.phone_number);
      if (digits.length < 10) {
        return NextResponse.json({ error: "Please enter a valid phone number.", field: "phone" }, { status: 400 });
      }
    }

    const emailResolved = resolveEmailForPayload(body);
    if (!emailResolved) {
      return NextResponse.json(
        {
          error: "Just need a real email address to send this to.",
          field: "email",
        },
        { status: 400 },
      );
    }

    const phoneDigits = normalizePhoneDigits(body.phone_number);
    const phone_number =
      phoneDigits.length > 0 ? phoneDigits.slice(0, 10) : null;
    const clean = {
      email: emailResolved,
      source: body.source as ValidSource,
      phone_number,
      net_triggered: body.net_triggered?.trim() || null,
      zip_code: body.zip_code?.replace(/\D/g, "").slice(0, 5) ?? null,
      filing_status: normalizeFilingStatus(body.filing_status),
      age: body.age ? Math.min(Math.max(Math.round(body.age), 55), 85) : null,
      annual_income: body.annual_income != null ? Math.max(0, body.annual_income) : null,
      calculated_premium: body.calculated_premium ?? null,
      irmaa_bracket: body.irmaa_bracket ?? null,
      consent_given: true,
    };

    const supabase = getSupabaseAdmin();
    const cutoff = new Date(Date.now() - 86_400_000).toISOString();
    const { data: existing } = await supabase
      .from("leads")
      .select("id")
      .eq("email", clean.email)
      .eq("source", clean.source)
      .gte("created_at", cutoff)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ success: true, deduplicated: true });
    }

    const { error: insertError } = await supabase.from("leads").insert(clean);

    if (insertError) throw insertError;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[capture-lead] Unhandled error:", err);
    return NextResponse.json(
      { error: "Something went wrong on our end. Try again?" },
      { status: 500 },
    );
  }
}
