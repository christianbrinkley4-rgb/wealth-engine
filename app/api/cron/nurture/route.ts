import { NextResponse } from "next/server";

import { getSupabaseAdmin, hasSupabaseAdminConfig } from "@/lib/supabase";
import { sendNurtureEmail } from "@/lib/notifyLead";
import {
  GOOGLE_REVIEW_URL,
  REENGAGE_SEQUENCE_KEY,
  REVIEW_SEQUENCE_KEY,
  defaultEmailContext,
  getSequence,
  renderStep,
} from "@/lib/nurture";
import {
  cancelActiveEnrollments,
  completeEnrollmentIfDone,
  enrollLead,
  findReengageCandidates,
  getDueSends,
  isEmailSuppressed,
  markSendFailed,
  markSendSent,
  newUnsubscribeToken,
} from "@/lib/nurtureStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CRON_SECRET = process.env.CRON_SECRET?.trim();

function todayYmd(): string {
  const now = new Date();
  const eastern = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${eastern.getFullYear()}-${pad(eastern.getMonth() + 1)}-${pad(eastern.getDate())}`;
}

export async function GET(request: Request) {
  if (!CRON_SECRET) {
    return NextResponse.json(
      { ok: false, error: "CRON_SECRET is not configured" },
      { status: 500 },
    );
  }
  const auth = request.headers.get("authorization")?.trim();
  if (auth !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!hasSupabaseAdminConfig()) {
    return NextResponse.json({ ok: true, skipped: true, reason: "supabase-not-configured" });
  }

  const supabase = getSupabaseAdmin();
  const today = todayYmd();
  const result = { ok: true, date: today, sent: 0, failed: 0, skipped: 0, reengaged: 0 };

  try {
    const due = await getDueSends(supabase, today, 50);

    for (const send of due) {
      // Suppression first: an unsubscribe or bounce ends everything.
      if (await isEmailSuppressed(supabase, send.email)) {
        await markSendFailed(supabase, send.sendId, send.attempts, "suppressed", false);
        await cancelActiveEnrollments(supabase, send.email, "suppressed");
        result.skipped += 1;
        continue;
      }

      const sequence = getSequence(send.sequenceKey);
      const step = sequence?.steps.find((s) => s.key === send.stepKey);
      if (!sequence || !step) {
        await markSendFailed(supabase, send.sendId, send.attempts, "unknown-step", false);
        result.failed += 1;
        continue;
      }
      if (send.sequenceKey === REVIEW_SEQUENCE_KEY && !GOOGLE_REVIEW_URL) {
        // No review link configured: never send a review ask with a bare URL.
        await cancelActiveEnrollments(supabase, send.email, "review-link-missing");
        result.skipped += 1;
        continue;
      }

      const ctx = defaultEmailContext({
        fullName: send.fullName,
        unsubscribeToken: send.unsubscribeToken,
        topic: send.topic,
      });
      const rendered = renderStep(step, ctx);

      try {
        const delivery = await sendNurtureEmail({
          to: send.email,
          subject: rendered.subject,
          text: rendered.text,
          html: rendered.html,
        });
        if (delivery.ok) {
          await markSendSent(supabase, send.sendId, delivery.providerId);
          result.sent += 1;
        } else {
          await markSendFailed(
            supabase,
            send.sendId,
            send.attempts,
            delivery.error ?? "send-failed",
            delivery.retryable,
          );
          result.failed += 1;
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : "send-exception";
        await markSendFailed(supabase, send.sendId, send.attempts, message, true);
        result.failed += 1;
      }

      await completeEnrollmentIfDone(supabase, send.enrollmentId);
    }

    // Re-engage: nurture finished 45+ days ago, never re-engaged, not suppressed.
    const candidates = await findReengageCandidates(supabase, today, 25);
    for (const candidate of candidates) {
      if (await isEmailSuppressed(supabase, candidate.email)) continue;
      const enrolled = await enrollLead(
        supabase,
        {
          email: candidate.email,
          fullName: candidate.full_name,
          topic: candidate.interest_topic,
          unsubscribeToken: candidate.unsubscribe_token || newUnsubscribeToken(),
        },
        REENGAGE_SEQUENCE_KEY,
        new Date(),
      );
      if (enrolled) result.reengaged += 1;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("[cron/nurture] fatal:", error instanceof Error ? error.message : error);
    return NextResponse.json({ ok: false, error: "nurture-run-failed" }, { status: 500 });
  }
}
