/**
 * Nurture queue storage. All functions are defensive: they never throw, they
 * log and return a failure result. A queue hiccup must never break lead
 * capture, booking webhooks, or the cron's other sends.
 *
 * Enrollments carry their own contact snapshot, so nurture works whether the
 * lead was stored in the website database or the Command Center.
 */

import type { SupabaseClient } from "@supabase/supabase-js";
import { randomBytes } from "node:crypto";

import {
  MAX_SEND_ATTEMPTS,
  REENGAGE_AFTER_DAYS,
  REENGAGE_SEQUENCE_KEY,
  buildSendPlan,
  getSequence,
} from "@/lib/nurture";

export interface NurtureContact {
  email: string;
  fullName?: string | null;
  topic?: string | null;
  unsubscribeToken: string;
  /** Website leads.id when the website DB stored the lead; otherwise null. */
  leadId?: string | null;
}

export interface DueSend {
  sendId: string;
  enrollmentId: string;
  sequenceKey: string;
  stepKey: string;
  email: string;
  fullName: string | null;
  topic: string | null;
  unsubscribeToken: string;
  attempts: number;
}

export interface EnrollmentRow {
  id: string;
  email: string;
  full_name: string | null;
  interest_topic: string | null;
  unsubscribe_token: string;
  sequence_key: string;
}

async function safe<T>(label: string, fn: () => Promise<T>): Promise<T | null> {
  try {
    return await fn();
  } catch (error) {
    console.error(`[nurtureStore] ${label}:`, error instanceof Error ? error.message : error);
    return null;
  }
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Enroll a contact in a sequence, creating the queued sends. Skips when the
 * contact already has an active enrollment in the same sequence. Returns the
 * enrollment id, or null when skipped/failed.
 */
export async function enrollLead(
  supabase: SupabaseClient,
  contact: NurtureContact,
  sequenceKey: string,
  startDate: Date = new Date(),
): Promise<string | null> {
  return safe("enrollLead", async () => {
    if (!getSequence(sequenceKey)) return null;
    const email = normalizeEmail(contact.email);
    if (!email.includes("@")) return null;

    // Skip when already actively enrolled in this sequence.
    const { data: existing } = await supabase
      .from("nurture_enrollments")
      .select("id")
      .eq("email", email)
      .eq("sequence_key", sequenceKey)
      .eq("status", "active")
      .limit(1);
    if (existing && existing.length > 0) return (existing[0] as { id: string }).id;

    const { data: enrollment, error } = await supabase
      .from("nurture_enrollments")
      .insert({
        lead_id: contact.leadId ?? null,
        email,
        full_name: contact.fullName ?? null,
        interest_topic: contact.topic ?? null,
        unsubscribe_token: contact.unsubscribeToken,
        sequence_key: sequenceKey,
        status: "active",
      })
      .select("id")
      .single();
    if (error || !enrollment) {
      // Unique-violation here means a concurrent request enrolled first.
      if ((error as { code?: string } | null)?.code === "23505") return null;
      console.error("[nurtureStore] enroll insert failed:", error?.message);
      return null;
    }
    const enrollmentId = (enrollment as { id: string }).id;

    // Queue the steps.
    const plan = buildSendPlan(sequenceKey, startDate);
    const { error: sendError } = await supabase.from("nurture_sends").insert(
      plan.map((p) => ({
        enrollment_id: enrollmentId,
        step_key: p.stepKey,
        channel: "email",
        send_after: p.sendAfter,
      })),
    );
    if (sendError) {
      console.error("[nurtureStore] send queue insert failed:", sendError.message);
      await supabase
        .from("nurture_enrollments")
        .update({
          status: "cancelled",
          cancelled_at: new Date().toISOString(),
          cancel_reason: "queue-failed",
        })
        .eq("id", enrollmentId);
      return null;
    }
    return enrollmentId;
  });
}

/**
 * Cancel every active enrollment for a contact (booking, unsubscribe, ...).
 * Matches by email, which is the stable identity across storage paths.
 */
export async function cancelActiveEnrollments(
  supabase: SupabaseClient,
  email: string,
  reason: string,
): Promise<void> {
  await safe("cancelActiveEnrollments", async () => {
    const now = new Date().toISOString();
    const { data: enrollments } = await supabase
      .from("nurture_enrollments")
      .select("id")
      .eq("email", normalizeEmail(email))
      .eq("status", "active");
    const ids = (enrollments ?? []).map((e) => (e as { id: string }).id);
    if (ids.length === 0) return;
    await supabase
      .from("nurture_enrollments")
      .update({ status: "cancelled", cancelled_at: now, cancel_reason: reason })
      .in("id", ids);
    await supabase
      .from("nurture_sends")
      .update({ cancelled_at: now })
      .in("enrollment_id", ids)
      .is("sent_at", null);
  });
}

/** Sends due today or earlier. */
export async function getDueSends(
  supabase: SupabaseClient,
  todayYmd: string,
  limit = 50,
): Promise<DueSend[]> {
  const rows = await safe("getDueSends", async () => {
    const { data, error } = await supabase
      .from("nurture_sends")
      .select(
        "id, step_key, attempts, enrollment_id, " +
          "nurture_enrollments!inner(id, sequence_key, status, email, full_name, interest_topic, unsubscribe_token)",
      )
      .lte("send_after", todayYmd)
      .is("sent_at", null)
      .is("cancelled_at", null)
      .lt("attempts", MAX_SEND_ATTEMPTS)
      .eq("nurture_enrollments.status", "active")
      .order("send_after", { ascending: true })
      .limit(limit);
    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as Array<{
      id: string;
      step_key: string;
      attempts: number;
      enrollment_id: string;
      nurture_enrollments: {
        id: string;
        sequence_key: string;
        email: string;
        full_name: string | null;
        interest_topic: string | null;
        unsubscribe_token: string;
      };
    }>;
  });
  return (rows ?? []).map((r) => ({
    sendId: r.id,
    enrollmentId: r.enrollment_id,
    sequenceKey: r.nurture_enrollments.sequence_key,
    stepKey: r.step_key,
    email: r.nurture_enrollments.email,
    fullName: r.nurture_enrollments.full_name,
    topic: r.nurture_enrollments.interest_topic,
    unsubscribeToken: r.nurture_enrollments.unsubscribe_token,
    attempts: r.attempts ?? 0,
  }));
}

export async function markSendSent(
  supabase: SupabaseClient,
  sendId: string,
  providerId?: string,
): Promise<void> {
  await safe("markSendSent", async () => {
    const { error } = await supabase
      .from("nurture_sends")
      .update({
        sent_at: new Date().toISOString(),
        provider_id: providerId ?? null,
        last_error: null,
      })
      .eq("id", sendId);
    if (error) throw new Error(error.message);
  });
}

export async function markSendFailed(
  supabase: SupabaseClient,
  sendId: string,
  attempts: number,
  errorMessage: string,
  retryable: boolean,
): Promise<void> {
  await safe("markSendFailed", async () => {
    if (retryable && attempts + 1 < MAX_SEND_ATTEMPTS) {
      const { error } = await supabase
        .from("nurture_sends")
        .update({ attempts: attempts + 1, last_error: errorMessage.slice(0, 500) })
        .eq("id", sendId);
      if (error) throw new Error(error.message);
    } else {
      // Permanent failure, or out of retries: cancel the send so the queue
      // moves on. The enrollment completes when nothing is left due.
      await supabase
        .from("nurture_sends")
        .update({ cancelled_at: new Date().toISOString(), last_error: errorMessage.slice(0, 500) })
        .eq("id", sendId);
    }
  });
}

/** When every send in an enrollment is done, close the enrollment out. */
export async function completeEnrollmentIfDone(
  supabase: SupabaseClient,
  enrollmentId: string,
): Promise<void> {
  await safe("completeEnrollmentIfDone", async () => {
    const { data } = await supabase
      .from("nurture_sends")
      .select("id")
      .eq("enrollment_id", enrollmentId)
      .is("sent_at", null)
      .is("cancelled_at", null)
      .limit(1);
    if (data && data.length > 0) return;
    await supabase
      .from("nurture_enrollments")
      .update({ status: "completed", completed_at: new Date().toISOString() })
      .eq("id", enrollmentId)
      .eq("status", "active");
  });
}

/**
 * Contacts whose nurture finished quietly a while ago: candidates for
 * re-engagement. Excludes anyone already in (or done with) re-engage.
 */
export async function findReengageCandidates(
  supabase: SupabaseClient,
  todayYmd: string,
  limit = 25,
): Promise<EnrollmentRow[]> {
  const cutoff = new Date(todayYmd + "T00:00:00Z");
  cutoff.setDate(cutoff.getDate() - REENGAGE_AFTER_DAYS);
  const rows = await safe("findReengageCandidates", async () => {
    const { data, error } = await supabase
      .from("nurture_enrollments")
      .select("id, email, full_name, interest_topic, unsubscribe_token, sequence_key")
      .eq("status", "completed")
      .not("sequence_key", "in", `(${REENGAGE_SEQUENCE_KEY},review)`)
      .lt("completed_at", cutoff.toISOString())
      .limit(limit * 3);
    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as EnrollmentRow[];
  });
  const out: EnrollmentRow[] = [];
  for (const row of rows ?? []) {
    if (out.length >= limit) break;
    const { data } = await supabase
      .from("nurture_enrollments")
      .select("id")
      .eq("email", row.email)
      .eq("sequence_key", REENGAGE_SEQUENCE_KEY)
      .limit(1);
    if (!data || data.length === 0) out.push(row);
  }
  return out;
}

export async function isEmailSuppressed(supabase: SupabaseClient, email: string): Promise<boolean> {
  const result = await safe("isEmailSuppressed", async () => {
    const { data, error } = await supabase
      .from("email_suppressions")
      .select("email")
      .eq("email", normalizeEmail(email))
      .limit(1);
    if (error) throw new Error(error.message);
    return (data ?? []).length > 0;
  });
  return result ?? false;
}

export async function suppressEmail(
  supabase: SupabaseClient,
  email: string,
  reason = "unsubscribed",
): Promise<void> {
  await safe("suppressEmail", async () => {
    await supabase
      .from("email_suppressions")
      .upsert({ email: normalizeEmail(email), reason }, { onConflict: "email" });
  });
}

/** Find an enrollment by its unsubscribe token (the emailed link). */
export async function getEnrollmentByUnsubscribeToken(
  supabase: SupabaseClient,
  token: string,
): Promise<EnrollmentRow | null> {
  const row = await safe("getEnrollmentByUnsubscribeToken", async () => {
    const { data, error } = await supabase
      .from("nurture_enrollments")
      .select("id, email, full_name, interest_topic, unsubscribe_token, sequence_key")
      .eq("unsubscribe_token", token)
      .eq("status", "active")
      .limit(1);
    if (error) throw new Error(error.message);
    return ((data ?? [])[0] ?? null) as EnrollmentRow | null;
  });
  return row;
}

/**
 * A consultation was booked (Cal.com webhook): stop all nurture for that
 * email. Returns the contact snapshot so the caller can enroll in review.
 */
export async function handleBooking(
  supabase: SupabaseClient,
  email: string,
): Promise<EnrollmentRow | null> {
  const snapshot = await safe("handleBooking", async () => {
    const { data, error } = await supabase
      .from("nurture_enrollments")
      .select("id, email, full_name, interest_topic, unsubscribe_token, sequence_key")
      .eq("email", normalizeEmail(email))
      .eq("status", "active")
      .order("enrolled_at", { ascending: false })
      .limit(1);
    if (error) throw new Error(error.message);
    return ((data ?? [])[0] ?? null) as EnrollmentRow | null;
  });
  // Best-effort: also flip the website lead row if one exists.
  await safe("handleBooking:lead-status", async () => {
    await supabase
      .from("leads")
      .update({ status: "booked", consultation_scheduled: true })
      .ilike("email", normalizeEmail(email))
      .eq("status", "new");
  });
  await cancelActiveEnrollments(supabase, email, "booked");
  return snapshot;
}

/** One auto-reply per phone number per 24h for inbound SMS. */
export async function shouldAutoReplySms(
  supabase: SupabaseClient,
  phoneDigits: string,
): Promise<boolean> {
  const result = await safe("shouldAutoReplySms", async () => {
    const since = new Date(Date.now() - 86_400_000).toISOString();
    const { data, error } = await supabase
      .from("sms_auto_replies")
      .select("phone")
      .eq("phone", phoneDigits)
      .gte("replied_at", since)
      .limit(1);
    if (error) throw new Error(error.message);
    return (data ?? []).length === 0;
  });
  return result ?? false;
}

export async function recordSmsAutoReply(
  supabase: SupabaseClient,
  phoneDigits: string,
): Promise<void> {
  await safe("recordSmsAutoReply", async () => {
    await supabase
      .from("sms_auto_replies")
      .upsert(
        { phone: phoneDigits, replied_at: new Date().toISOString() },
        { onConflict: "phone" },
      );
  });
}

/** Random 48-hex unsubscribe token for a new contact. */
export function newUnsubscribeToken(): string {
  return randomBytes(24).toString("hex");
}
