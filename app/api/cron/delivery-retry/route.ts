import { NextRequest, NextResponse } from "next/server";

import { claimDeliveries, markDelivery } from "@/lib/commandCenter";
import { sendStoredEmailSnapshot } from "@/lib/notifyLead";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Resends failed website emails using the site's Resend config.
 *
 * pg_cron on Command Center POSTs here every five minutes with the same
 * website ingress key already configured on Netlify (x-website-key). That keeps
 * the Resend API key on the website host only — no second copy on Supabase.
 */
function isAuthorized(request: NextRequest): boolean {
  const expected = process.env.COMMAND_CENTER_INGEST_KEY?.trim();
  if (!expected || !/^[a-f0-9]{64}$/.test(expected)) return false;
  const key = request.headers.get("x-website-key") || "";
  return key === expected;
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.RESEND_API_KEY?.trim() || !process.env.RESEND_FROM?.trim()) {
    return NextResponse.json({ retried: 0, skipped: "sender_unconfigured" });
  }

  const jobs = await claimDeliveries(10);
  let retried = 0;

  for (const job of jobs) {
    const sent = await sendStoredEmailSnapshot({
      to: job.recipient,
      subject: job.subject,
      text: job.body_text,
      replyTo: job.reply_to,
    });
    await markDelivery(
      job.id,
      sent.ok ? "sent" : sent.retryable ? "failed_retryable" : "failed_permanent",
      {
        error: sent.error ?? null,
        providerId: sent.providerId ?? null,
        recipient: job.recipient,
        subject: job.subject,
        bodyText: job.body_text,
        replyTo: job.reply_to ?? null,
      },
    );
    retried += 1;
  }

  return NextResponse.json({ retried, claimed: jobs.length });
}
