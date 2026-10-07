import { NextResponse } from "next/server";

import { AGENT } from "@/lib/agent";
import { sendStoredEmailSnapshot } from "@/lib/notifyLead";
import { getClientIp, isRateLimited } from "@/lib/rateLimit";
import { verifyTurnstile } from "@/lib/turnstile";
import { DROPS_CONSENT_TEXT, DROPS_CONSENT_VERSION, normalizeDropsEmail } from "@/lib/wealth/drops";

/**
 * POST /api/wealth-drops
 *
 * Someone on /wealth asked to hear about new tools. Sends one email to
 * Christian and stores nothing. See lib/wealth/drops.ts for why this does not
 * go through /api/capture-lead.
 */
export const runtime = "nodejs";

const MAX_BODY_BYTES = 4096;

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(`wealth-drops:${ip}`, { limit: 5, windowMs: 10 * 60_000 })) {
    return NextResponse.json({ error: "Too many tries. Give it a few minutes." }, { status: 429 });
  }

  let body: { email?: unknown; company?: unknown; turnstileToken?: unknown };
  try {
    const reader = request.body?.getReader();
    if (!reader) throw new Error("missing body");
    const chunks: Uint8Array[] = [];
    let bytes = 0;
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        bytes += value.byteLength;
        if (bytes > MAX_BODY_BYTES) {
          await reader.cancel();
          throw new Error("too large");
        }
        chunks.push(value);
      }
    } finally {
      reader.releaseLock();
    }
    const parsed: unknown = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("invalid body");
    body = parsed;
  } catch {
    return NextResponse.json({ error: "That didn't come through. Try again." }, { status: 400 });
  }

  // Honeypot: people never see this field. Answer as if it worked and send nothing.
  if (typeof body.company === "string" && body.company.trim()) {
    return NextResponse.json({ ok: true });
  }

  const email = normalizeDropsEmail(body.email);
  if (!email) {
    return NextResponse.json({ error: "That email doesn't look right." }, { status: 400 });
  }

  const check = await verifyTurnstile(
    typeof body.turnstileToken === "string" ? body.turnstileToken : undefined,
    ip,
  );
  if (!check.ok) {
    return NextResponse.json(
      { error: "The spam check didn't finish. Try again.", retryCheck: true },
      { status: 400 },
    );
  }

  const result = await sendStoredEmailSnapshot({
    to: AGENT.email,
    replyTo: email,
    subject: `Tool drops signup: ${email}`,
    text: [
      `${email} asked for tool drops on /wealth.`,
      "",
      `Signed up: ${new Date().toISOString()}`,
      `They agreed to (${DROPS_CONSENT_VERSION}): "${DROPS_CONSENT_TEXT}"`,
      "",
      "Nothing else was stored. Add them to your list, and take them off the moment they reply unsubscribe.",
    ].join("\n"),
  });

  if (!result.ok) {
    console.error("[wealth-drops] signup email not delivered", result.skipped ? "(email not configured)" : result.status);
    return NextResponse.json(
      { error: `That didn't send. Text DROPS to ${AGENT.phone} instead.` },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}
