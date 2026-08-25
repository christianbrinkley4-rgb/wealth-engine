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

const SECRET = process.env.TURNSTILE_SECRET_KEY?.trim() || "";

export function isTurnstileConfigured(): boolean {
  return SECRET.length > 0;
}

export async function verifyTurnstile(
  token: string | undefined,
  ip: string,
): Promise<{ ok: boolean; reason?: string }> {
  if (!isTurnstileConfigured()) return { ok: true };

  if (!token) return { ok: false, reason: "missing-token" };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: SECRET, response: token, remoteip: ip }),
      signal: controller.signal,
    });

    const data = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
    if (data.success) return { ok: true };
    return { ok: false, reason: data["error-codes"]?.join(",") ?? "rejected" };
  } catch {
    // Cloudflare being unreachable must not cost a real lead.
    console.error("[turnstile] verification unreachable — allowing submission through");
    return { ok: true };
  } finally {
    clearTimeout(timeout);
  }
}
