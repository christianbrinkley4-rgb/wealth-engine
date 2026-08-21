/**
 * Meta Conversions API — the server half of the Lead event.
 *
 * Browser pixels get blocked by iOS, ad blockers, and privacy extensions, and
 * this audience runs a lot of them. The server event always fires. Both events
 * carry the same event_id, so Meta deduplicates rather than counting two leads.
 *
 * Set META_CAPI_ACCESS_TOKEN and NEXT_PUBLIC_META_PIXEL_ID to enable; without
 * them this is a no-op.
 *
 * Personal data is SHA-256 hashed before it leaves the server, which is what
 * Meta requires — never send a raw email address.
 */

import crypto from "node:crypto";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || "";
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN?.trim() || "";
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
  topic?: string | null;
}

function hash(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;
  return crypto.createHash("sha256").update(normalized).digest("hex");
}

export function isMetaCapiConfigured(): boolean {
  return PIXEL_ID.length > 0 && ACCESS_TOKEN.length > 0;
}

/** Never throws — a tracking failure must not fail a lead submission. */
export async function sendMetaLeadEvent(input: CapiLeadInput): Promise<void> {
  if (!isMetaCapiConfigured()) return;

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
        event_source_url: input.sourceUrl,
        user_data: userData,
        custom_data: { content_category: input.topic ?? undefined },
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
