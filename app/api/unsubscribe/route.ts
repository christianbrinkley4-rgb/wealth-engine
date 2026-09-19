import { NextResponse } from "next/server";

import { getSupabaseAdmin, hasSupabaseAdminConfig } from "@/lib/supabase";
import {
  cancelActiveEnrollments,
  getEnrollmentByUnsubscribeToken,
  suppressEmail,
} from "@/lib/nurtureStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * One-click unsubscribe. Accepts GET (plain link) and POST (List-Unsubscribe-Post).
 * The token is a 48-hex unguessable value issued per enrollment; knowing it is
 * the authorization. Idempotent: unsubscribing twice is a no-op success.
 */
async function handleUnsubscribe(token: string): Promise<NextResponse> {
  if (!token || !/^[a-f0-9]{48}$/.test(token)) {
    return NextResponse.json({ ok: false, error: "invalid-token" }, { status: 400 });
  }
  if (!hasSupabaseAdminConfig()) {
    return NextResponse.json({ ok: true, unsubscribed: false, reason: "not-configured" });
  }
  const supabase = getSupabaseAdmin();
  const enrollment = await getEnrollmentByUnsubscribeToken(supabase, token);
  if (!enrollment) {
    // Token unknown or already inactive: still report success so the visitor
    // isn't stuck. The email is suppressed by address below when known.
    return NextResponse.json({ ok: true, unsubscribed: true });
  }
  await suppressEmail(supabase, enrollment.email, "unsubscribed");
  await cancelActiveEnrollments(supabase, enrollment.email, "unsubscribed");
  return NextResponse.json({ ok: true, unsubscribed: true });
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") ?? "";
  return handleUnsubscribe(token.trim().toLowerCase());
}

export async function POST(request: Request) {
  let token = "";
  try {
    const body = await request.json();
    token = String(body?.token ?? "")
      .trim()
      .toLowerCase();
  } catch {
    token = "";
  }
  return handleUnsubscribe(token);
}
