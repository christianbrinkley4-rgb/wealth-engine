import { createHmac } from "node:crypto";

// Server-only, narrowly scoped ingress. This key cannot read the command center.
export function commandCenterConfig(env: NodeJS.ProcessEnv = process.env) {
  const endpoint = env.COMMAND_CENTER_INGEST_URL?.trim();
  const key = env.COMMAND_CENTER_INGEST_KEY?.trim();
  if (!endpoint || !key || !/^[a-f0-9]{64}$/.test(key)) return null;
  try {
    const url = new URL(endpoint);
    if (
      url.protocol !== "https:" ||
      !url.hostname.endsWith(".supabase.co") ||
      url.username ||
      url.password ||
      url.search ||
      url.hash ||
      url.pathname !== "/functions/v1/website-inquiry"
    )
      return null;
    return { endpoint, key };
  } catch {
    return null;
  }
}

/**
 * The three deliveries an inquiry owes once it is stored. The Command Center
 * owns the queue; the website only asks for the ids and reports outcomes.
 */
export const OUTBOX_JOBS = ["owner_alert", "prospect_reply", "meta_capi"] as const;
export type OutboxJob = (typeof OUTBOX_JOBS)[number];

/** "sent" is terminal. "failed_retryable" stays claimable; "failed_permanent" does not. */
export type DeliveryStatus = "sent" | "failed_retryable" | "failed_permanent";

export type Outbox = Partial<Record<OutboxJob, string>>;

export type CommandCenterReceipt = {
  stored: true;
  duplicate: boolean;
  requires_review: boolean;
  /**
   * Empty until the Command Center enqueues deliveries. An older Edge Function
   * simply returns nothing here, and the site captures and emails exactly as
   * it does today — marking is additive, never a precondition.
   */
  outbox: Outbox;
};

const OUTBOX_ID = /^[A-Za-z0-9_-]{1,64}$/;

function readOutbox(value: unknown): Outbox {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const source = value as Record<string, unknown>;
  const outbox: Outbox = {};
  for (const job of OUTBOX_JOBS) {
    const id = source[job];
    if (typeof id === "string" && OUTBOX_ID.test(id)) outbox[job] = id;
  }
  return outbox;
}

export async function captureInCommandCenter(
  row: Record<string, unknown>,
): Promise<CommandCenterReceipt> {
  const config = commandCenterConfig();
  if (!config) throw new Error("Command center ingress is not configured.");
  // Repeat submissions with the same answers in one UTC day are one inquiry.
  // Include an HMAC so the request identifier cannot reveal contact details.
  const stable = { ...row };
  for (const name of [
    "consent_at",
    "sms_consent_at",
    "consent_ip",
    "consent_user_agent",
    "attribution",
  ])
    delete stable[name];
  const { attribution } = row;
  const campaign =
    attribution && typeof attribution === "object"
      ? Object.fromEntries(Object.entries(attribution).filter(([name]) => name !== "captured_at"))
      : null;
  const requestKey = createHmac("sha256", config.key)
    .update(
      JSON.stringify({
        day: new Date().toISOString().slice(0, 10),
        ...stable,
        attribution: campaign,
      }),
    )
    .digest("hex");
  const response = await fetch(config.endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-website-key": config.key },
    body: JSON.stringify({ action: "capture", request_key: requestKey, lead: row }),
    signal: AbortSignal.timeout(15000),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Command center rejected capture (${response.status}).`);
  const result = await response.json();
  if (result?.stored !== true) throw new Error("Command center did not confirm storage.");
  return {
    stored: true,
    duplicate: result.duplicate === true,
    requires_review: result.requires_review === true,
    outbox: readOutbox(result.outbox),
  };
}

/**
 * Report what happened to one queued delivery.
 *
 * Deliberately cannot throw and deliberately cannot fail the request. If the
 * mark does not land, the row stays pending — which is the safe state, because
 * pending is what a Command Center-side worker retries. The alternative, losing
 * the visitor's submission over a bookkeeping call, is not a trade worth making.
 *
 * The outbox id is the idempotency key: a row already marked "sent" ignores a
 * second report, so a replay cannot produce a second email.
 */
export type ClaimedDelivery = {
  id: string;
  job?: string;
  recipient: string;
  subject: string;
  body_text: string;
  reply_to?: string | null;
};

/** Claim retryable outbox rows. Sending stays on the caller (website Resend). */
export async function claimDeliveries(limit = 10): Promise<ClaimedDelivery[]> {
  const config = commandCenterConfig();
  if (!config) return [];
  try {
    const response = await fetch(config.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-website-key": config.key },
      body: JSON.stringify({ action: "claim_deliveries", limit }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (!response.ok) {
      console.error("[commandCenter] claim_deliveries rejected:", response.status);
      return [];
    }
    const result: unknown = await response.json();
    const jobs =
      result && typeof result === "object" && Array.isArray((result as { jobs?: unknown }).jobs)
        ? (result as { jobs: unknown[] }).jobs
        : [];
    return jobs.flatMap((job) => {
      if (!job || typeof job !== "object") return [];
      const row = job as Record<string, unknown>;
      const id = typeof row.id === "string" ? row.id : "";
      const recipient = typeof row.recipient === "string" ? row.recipient : "";
      const subject = typeof row.subject === "string" ? row.subject : "";
      const bodyText = typeof row.body_text === "string" ? row.body_text : "";
      if (!OUTBOX_ID.test(id) || !recipient || !subject || !bodyText) return [];
      return [
        {
          id,
          job: typeof row.job === "string" ? row.job : undefined,
          recipient,
          subject,
          body_text: bodyText,
          reply_to: typeof row.reply_to === "string" ? row.reply_to : null,
        },
      ];
    });
  } catch (error) {
    console.error("[commandCenter] claim_deliveries failed:", error);
    return [];
  }
}

export async function markDelivery(
  outboxId: string,
  status: DeliveryStatus,
  meta: {
    error?: string | null;
    providerId?: string | null;
    recipient?: string | null;
    subject?: string | null;
    bodyText?: string | null;
    replyTo?: string | null;
  } = {},
): Promise<boolean> {
  const config = commandCenterConfig();
  if (!config || !OUTBOX_ID.test(outboxId)) return false;
  try {
    const response = await fetch(config.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-website-key": config.key },
      body: JSON.stringify({
        action: "mark_delivery",
        outbox_id: outboxId,
        status,
        error: meta.error ? String(meta.error).slice(0, 500) : null,
        provider_id: meta.providerId ?? null,
        recipient: meta.recipient ?? null,
        subject: meta.subject ?? null,
        body_text: meta.bodyText ?? null,
        reply_to: meta.replyTo ?? null,
      }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (!response.ok) {
      console.error("[commandCenter] mark_delivery rejected:", response.status, outboxId);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[commandCenter] mark_delivery failed:", error);
    return false;
  }
}
