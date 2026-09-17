/**
 * Meta Conversions API — the server half of the Lead event.
 *
 * Browser pixels get blocked by iOS, ad blockers, and privacy extensions, and
 * this audience runs a lot of them. The server event always fires. Both events
 * carry the same event_id, so Meta deduplicates rather than counting two leads.
 *
 * Set META_CAPI_ACCESS_TOKEN, NEXT_PUBLIC_META_PIXEL_ID, and
 * NEXT_PUBLIC_META_ADS_ALLOWED=true to enable. Credentials alone are not
 * enough: paid-acquisition measurement stays off until that explicit allow
 * flag is set after the consent and platform review in the Astra spec.
 * Without them this is a no-op.
 *
 * Contact identifiers are SHA-256 hashed, but remain matchable personal data.
 * Enable only after the applicable consent and platform data-use requirements
 * have been reviewed. Service topics and visitor URL/query text are not sent.
 */

import crypto from "node:crypto";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || "";
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN?.trim() || "";
const ADS_ALLOWED = process.env.NEXT_PUBLIC_META_ADS_ALLOWED === "true";
const API_VERSION = "v21.0";

export interface CapiLeadInput {
  eventId: string;
  email: string;
  phone?: string | null;
  zip?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  clientIp?: string | null;
  userAgent?: string | null;
  fbclid?: string | null;
  sourceUrl?: string;
}

const NEUTRAL_SOURCE_PATHS = new Set(["/", "/start", "/about", "/schedule", "/thank-you"]);

/** Keep only a real, neutral page URL on this deployment's configured origin. */
export function metaSourceUrl(raw: string | undefined): string | null {
  try {
    if (!raw || !process.env.NEXT_PUBLIC_SITE_URL?.trim()) return null;
    const canonical = new URL(process.env.NEXT_PUBLIC_SITE_URL.trim());
    const source = new URL(raw);
    if (
      canonical.protocol !== "https:" ||
      canonical.username ||
      canonical.password ||
      source.origin !== canonical.origin ||
      source.username ||
      source.password ||
      !NEUTRAL_SOURCE_PATHS.has(source.pathname)
    ) {
      return null;
    }
    return `${source.origin}${source.pathname}`;
  } catch {
    return null;
  }
}

function hash(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;
  return crypto.createHash("sha256").update(normalized).digest("hex");
}

export function isMetaCapiConfigured(): boolean {
  return ADS_ALLOWED && PIXEL_ID.length > 0 && ACCESS_TOKEN.length > 0;
}

/** Never throws — a tracking failure must not fail a lead submission. */
export async function sendMetaLeadEvent(input: CapiLeadInput): Promise<void> {
  if (!isMetaCapiConfigured()) return;
  const sourceUrl = metaSourceUrl(input.sourceUrl);
  // Meta requires the event's website URL. Skip when it cannot be supplied
  // safely; do not invent a different page or expose a service-specific URL.
  if (!sourceUrl) return;

  const [firstName, ...restName] = (input.firstName ?? "").split(" ");
  const lastName = input.lastName ?? restName.join(" ");

  const userData: Record<string, unknown> = {
    em: [hash(input.email)].filter(Boolean),
    ph: input.phone ? [hash(input.phone.replace(/\D/g, ""))] : undefined,
    zp: input.zip ? [hash(input.zip)] : undefined,
    fn: firstName ? [hash(firstName)] : undefined,
    ln: lastName ? [hash(lastName)] : undefined,
    client_ip_address: input.clientIp ?? undefined,
    client_user_agent: input.userAgent ?? undefined,
    fbc: input.fbclid ? `fb.1.${Date.now()}.${input.fbclid}` : undefined,
  };

  for (const key of Object.keys(userData)) {
    if (userData[key] === undefined) delete userData[key];
  }

  const body = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        action_source: "website",
        event_source_url: sourceUrl,
        user_data: userData,
      },
    ],
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(ACCESS_TOKEN)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      },
    );
    if (!res.ok) {
      console.error(
        "[metaCapi] Lead event rejected:",
        res.status,
        await res.text().catch(() => ""),
      );
    }
  } catch (error) {
    console.error("[metaCapi] Lead event failed:", error);
  } finally {
    clearTimeout(timeout);
  }
}
