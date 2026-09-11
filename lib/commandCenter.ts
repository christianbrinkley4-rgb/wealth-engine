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

export type CommandCenterReceipt = {
  stored: true;
  duplicate: boolean;
  requires_review: boolean;
};

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
  };
}
