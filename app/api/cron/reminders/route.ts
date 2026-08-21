import { NextRequest, NextResponse } from "next/server";

import { sendReminderDue } from "@/lib/notifyLead";
import { getSupabaseAdmin, hasSupabaseAdminConfig } from "@/lib/supabase";

export const runtime = "nodejs";
/** Never cached: this route has side effects. */
export const dynamic = "force-dynamic";

/**
 * Sends the enrollment-window reminders that have come due.
 *
 * Runs daily from Vercel Cron (see vercel.json). Vercel signs its own cron
 * requests with CRON_SECRET; anything else needs that secret as a bearer token,
 * so this can't be triggered by someone who finds the URL.
 *
 * Deliberately small batches and one row updated per send: if the function is
 * killed halfway, the reminders already sent are marked sent, and the rest are
 * picked up by tomorrow's run.
 */

const BATCH_SIZE = 50;

interface ReminderRow {
  id: string;
  email: string;
  full_name: string | null;
  kind: "t65" | "aep";
  window_opens_on: string | null;
}

function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  // Without a secret configured, refuse rather than run unauthenticated.
  if (!secret) return false;

  const header = request.headers.get("authorization");
  return header === `Bearer ${secret}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    console.error("[cron/reminders] Rejected an unauthorized request.");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!hasSupabaseAdminConfig()) {
    console.error("[cron/reminders] Supabase not configured.");
    return NextResponse.json({ error: "Storage unavailable" }, { status: 503 });
  }

  const supabase = getSupabaseAdmin();
  const today = new Date().toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from("reminders")
    .select("id, email, full_name, kind, window_opens_on")
    .lte("send_after", today)
    .is("sent_at", null)
    .is("cancelled_at", null)
    .order("send_after", { ascending: true })
    .limit(BATCH_SIZE);

  if (error) {
    console.error("[cron/reminders] query failed:", error.message);
    return NextResponse.json({ error: "Query failed" }, { status: 500 });
  }

  const due = (data ?? []) as ReminderRow[];
  let sent = 0;
  let failed = 0;

  for (const reminder of due) {
    const delivered = await sendReminderDue({
      email: reminder.email,
      full_name: reminder.full_name,
      kind: reminder.kind,
      windowOpensOn: reminder.window_opens_on ? new Date(reminder.window_opens_on) : null,
    });

    if (!delivered) {
      // Leave it unsent so tomorrow's run tries again.
      failed += 1;
      continue;
    }

    const { error: updateError } = await supabase
      .from("reminders")
      .update({ sent_at: new Date().toISOString() })
      .eq("id", reminder.id);

    if (updateError) {
      // Worse than a failed send: this one would go out again tomorrow.
      console.error("[cron/reminders] SENT BUT NOT MARKED:", reminder.id, updateError.message);
    }
    sent += 1;
  }

  console.log(`[cron/reminders] due=${due.length} sent=${sent} failed=${failed}`);
  return NextResponse.json({ due: due.length, sent, failed });
}
