import { NextResponse } from "next/server";

import { notifyEnrollmentLogged } from "@/lib/notifyLead";
import { REFERRAL_CHECKIN_SEQUENCE_KEY } from "@/lib/nurture";
import { enrollLead, newUnsubscribeToken } from "@/lib/nurtureStore";
import { getSupabaseAdmin, hasSupabaseAdminConfig } from "@/lib/supabase";

/**
 * Referral engine trigger (STAGED — not wired to anything live yet).
 *
 * Called when an enrollment is confirmed (manually, or by the Command Center
 * when that integration is built). Two jobs:
 *   1. Alert Christian immediately: ask the referral ask while the client
 *      is happiest (post-enrollment checklist).
 *   2. Queue the 30-day service check-in email, anchored to the coverage
 *      effective date. Service first; the referral ask only lands if the
 *      client is satisfied.
 *
 * Auth: ENROLLMENT_WEBHOOK_SECRET Bearer <redacted> Set it in Netlify when this
 * leaves staging. Best-effort delivery: never fails loudly on the queue side.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WEBHOOK_SECRET = process.env.ENROLLMENT_WEBHOOK_SECRET?.trim();

const reply = (body: object, status: number) =>
  NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });

function isValidYmd(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = new Date(`${value}T12:00:00Z`);
  return !Number.isNaN(d.getTime());
}

export async function POST(request: Request) {
  if (!WEBHOOK_SECRET) return reply({ error: "Enrollment logging unavailable" }, 503);
  const auth = request.headers.get("authorization")?.trim();
  if (auth !== `Bearer ${WEBHOOK_SECRET}`) return reply({ error: "Unauthorized" }, 401);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return reply({ error: "Invalid JSON" }, 400);
  }
  const { email, full_name, effective_date, phone, topic } = (body ?? {}) as Record<
    string,
    unknown
  >;

  const cleanEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  const cleanName = typeof full_name === "string" ? full_name.trim() : "";
  if (!cleanEmail.includes("@")) return reply({ error: "Valid email required" }, 400);
  if (!cleanName) return reply({ error: "Client name required" }, 400);
  if (!isValidYmd(effective_date)) return reply({ error: "effective_date must be YYYY-MM-DD" }, 400);

  let enrolled: string | null = null;
  if (hasSupabaseAdminConfig()) {
    try {
      const supabase = getSupabaseAdmin();
      enrolled = await enrollLead(
        supabase,
        {
          email: cleanEmail,
          fullName: cleanName,
          topic: typeof topic === "string" && topic ? topic : "medicare",
          unsubscribeToken: newUnsubscribeToken(),
        },
        REFERRAL_CHECKIN_SEQUENCE_KEY,
        new Date(`${effective_date}T12:00:00Z`),
      );
    } catch (error) {
      console.error("[enrollment-logged] queue failed:", error instanceof Error ? error.message : error);
    }
  }

  let notified = false;
  try {
    const delivery = await notifyEnrollmentLogged({
      fullName: cleanName,
      email: cleanEmail,
      phone: typeof phone === "string" ? phone : null,
      effectiveDate: effective_date,
    });
    notified = delivery.ok;
  } catch (error) {
    console.error("[enrollment-logged] alert failed:", error instanceof Error ? error.message : error);
  }

  return reply({ received: true, enrolled: enrolled !== null, notified }, 200);
}
