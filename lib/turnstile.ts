/**
 * Cloudflare Turnstile verification.
 *
 * Inactive until TURNSTILE_SECRET_KEY is set, so nothing breaks before the
 * keys exist. Once a paid ad points at the form, turn it on — a honeypot alone
 * doesn’t hold up against the form spam that follows public ad traffic.
 *
 * Setup: cloudflare.com → Turnstile → add site → put the site key in
 * NEXT_PUBLIC_TURNSTILE_SITE_KEY and the secret in TURNSTILE_SECRET_KEY.
 */

import { isIP } from "node:net";

const SECRET = process.env.TURNSTILE_SECRET_KEY?.trim() || "";

export function isTurnstileConfigured(): boolean {
  return SECRET.length > 0;
}

export async function verifyTurnstile(
  token: string | undefined,
  ip: string,
): Promise<{ ok: boolean; reason?: string }> {
  if (!isTurnstileConfigured()) return { ok: true };

  if (typeof token !== "string" || !token.trim()) {
    return { ok: false, reason: "missing-token" };
  }
  if (token.length > 2048) return { ok: false, reason: "invalid-token" };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: SECRET,
        response: token,
        ...(isIP(ip) ? { remoteip: ip } : {}),
      }),
      signal: controller.signal,
    });

    if (!res.ok) return { ok: false, reason: "verification-unavailable" };
    const data = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
    if (data?.success === true) return { ok: true };
    return { ok: false, reason: "rejected" };
  } catch {
    // Configured verification must not become a bypass during an outage.
    // The form keeps the visitor's answers and offers a retry/contact path.
    console.error("[turnstile] verification unavailable — submission was not accepted");
    return { ok: false, reason: "verification-unavailable" };
  } finally {
    clearTimeout(timeout);
  }
}
