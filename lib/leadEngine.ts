import { createHash } from "node:crypto";
import { ENGINE_CONSENT, ENGINE_CONSENT_VERSION } from "./leadEnginePublic";
export { ENGINE_CONSENT, ENGINE_CONSENT_VERSION } from "./leadEnginePublic";
export const QUIZ_VALUES = [
  ["healthy", "moderate", "complex"],
  ["keep", "flexible", "open"],
  ["travel", "sometimes", "local"],
  ["lowcost", "predictable", "freedom"],
  ["dual", "nond", "unsure"],
] as const;

export function quizResult(answers: string[]) {
  if (answers[4] === "unsure")
    return {
      key: "eligibility-check",
      title: "Start by checking your Medicaid status",
      points: [
        "Being unsure doesn't establish eligibility for a Dual Eligible Special Needs Plan (D-SNP).",
        "Confirm your Medicaid status and any plan's eligibility requirements before comparing D-SNP options.",
        "Check doctors, prescriptions, pharmacies, costs, and enrollment timing for any coverage you're considering.",
      ],
    };
  if (answers[4] === "dual")
    return {
      key: "dual-review",
      title: "Ask about options for Medicare and Medicaid",
      points: [
        "D-SNP eligibility depends on your Medicaid category and the plan's requirements. Your answer alone doesn't confirm eligibility.",
        "Benefits and costs vary by plan and location. Check the actual plan documents.",
        "Confirm your doctors, drugs, and care coordination needs before making a choice.",
      ],
    };
  if (
    answers[0] === "complex" ||
    answers[1] === "keep" ||
    answers[2] === "travel" ||
    ["predictable", "freedom"].includes(answers[3])
  )
    return {
      key: "compare-coverage",
      title: "Compare access to care and total costs",
      points: [
        "Ask how Original Medicare, Medigap, and Medicare Advantage handle your doctors, travel, and out-of-pocket costs.",
        "Medigap helps with certain Original Medicare costs. Premiums and what you still pay depend on the policy. Drug coverage is generally separate.",
        "Medigap purchase rights have their own rules. Fall Medicare Open Enrollment doesn't guarantee you can buy a Medigap policy without underwriting.",
      ],
    };
  return {
    key: "compare-costs",
    title: "Look beyond the monthly premium",
    points: [
      "Compare Medicare Advantage with Original Medicare and any supplemental coverage you're considering.",
      "For Medicare Advantage, check the network, prescription coverage, prior authorization rules, and annual limit for covered Part A and Part B out-of-pocket costs.",
      "A low plan premium doesn't mean all care is free. Check the Part B premium, copays, coinsurance, and drug costs too.",
    ],
  };
}

export function validateEngineLead(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error("Invalid request.");
  const b = value as Record<string, unknown>;
  const str = (key: string) => (typeof b[key] === "string" ? (b[key] as string).trim() : "");
  const name = str("name");
  const rawPhone = str("phone");
  let phone = rawPhone.replace(/\D/g, "");
  if (phone.length === 11 && phone.startsWith("1")) phone = phone.slice(1);
  if (name.length < 1 || name.length > 120)
    throw new Error("Enter your name, up to 120 characters.");
  if (!/^[\d+().\s-]+$/.test(rawPhone) || !/^[2-9]\d{2}[2-9]\d{6}$/.test(phone))
    throw new Error("Enter a valid 10-digit US phone number.");
  const zip = str("zip");
  if (!/^\d{5}$/.test(zip)) throw new Error("Enter your 5-digit ZIP code.");
  const id = str("id");
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id))
    throw new Error("Refresh the page and try again.");
  const source = str("source");
  if (!["medicare-fit", "medicare-review"].includes(source)) throw new Error("Invalid source.");
  if (
    b.consent !== true ||
    b.consent_version !== ENGINE_CONSENT_VERSION ||
    b.consent_text !== ENGINE_CONSENT
  )
    throw new Error("Please check the box to request a call.");
  let answers: string[] = [];
  if (source === "medicare-fit") {
    if (
      !Array.isArray(b.answers) ||
      b.answers.length !== 5 ||
      !b.answers.every(
        (a, i) => typeof a === "string" && (QUIZ_VALUES[i] as readonly string[]).includes(a),
      )
    )
      throw new Error("Please answer all five questions.");
    answers = b.answers as string[];
  }
  const attribution: Record<string, string> = {};
  if (b.attribution && typeof b.attribution === "object" && !Array.isArray(b.attribution)) {
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content"]) {
      const v = (b.attribution as Record<string, unknown>)[key];
      if (typeof v === "string") attribution[key] = v.slice(0, 120);
    }
  }
  const payload = {
    name,
    phone,
    zip,
    source,
    answers,
    result: source === "medicare-fit" ? quizResult(answers).key : "callback",
    consent: true,
    consent_text: ENGINE_CONSENT,
    consent_version: ENGINE_CONSENT_VERSION,
    attribution,
  };
  // Exclude attribution from identity so a network retry cannot duplicate a lead.
  const fingerprint = createHash("sha256")
    .update(JSON.stringify({ ...payload, attribution: undefined }))
    .digest("hex");
  return { id, fingerprint, payload };
}

// This separate server-only storage path accepts phone leads without fabricating email.
export async function engineRpc(name: string, args: object) {
  const url = process.env.LEAD_ENGINE_SUPABASE_URL;
  const key = process.env.LEAD_ENGINE_SERVICE_ROLE_KEY;
  if (!url || !key || !/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(url))
    throw new Error("engine_unconfigured");
  const res = await fetch(`${url}/rest/v1/rpc/${name}`, {
    method: "POST",
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(args),
    signal: AbortSignal.timeout(12000),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(res.status === 409 ? "id_conflict" : "storage_unavailable");
  return res.json();
}

export async function deliverEngineAlerts(leadId?: string) {
  if (process.env.LEAD_ENGINE_ALERTS_ENABLED !== "true") return { held: true, processed: 0 };
  const jobs = (await engineRpc("claim_engine_alerts", { p_lead_id: leadId ?? null })) as Array<{
    id: string;
    lead_id: string;
    channel: string;
    payload: { name: string; phone: string; zip: string; source: string };
    lease_token: string;
  }>;
  let processed = 0;
  for (const job of jobs) {
    let sent = false;
    let providerId: string | null = null;
    let reason = "provider_unconfigured";
    try {
      // Keep sensitive quiz answers out of SMS and email. Review them in the secured database.
      const message = `Medicare callback requested: ${job.payload.name}. Phone: ${job.payload.phone}. ZIP: ${job.payload.zip}. Source: ${job.payload.source}. Reference: ${job.lead_id}.`;
      let res: Response | undefined;
      if (
        job.channel === "email" &&
        process.env.RESEND_API_KEY &&
        process.env.RESEND_FROM &&
        process.env.LEAD_NOTIFY_EMAIL
      ) {
        res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          signal: AbortSignal.timeout(8000),
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
            "Idempotency-Key": job.id,
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM,
            to: [process.env.LEAD_NOTIFY_EMAIL],
            subject: "Medicare callback request",
            text: message,
          }),
        });
      } else if (
        job.channel === "sms" &&
        process.env.TWILIO_ACCOUNT_SID &&
        process.env.TWILIO_AUTH_TOKEN &&
        process.env.TWILIO_FROM_NUMBER &&
        process.env.ALERT_SMS_TO
      ) {
        res = await fetch(
          `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`,
          {
            method: "POST",
            signal: AbortSignal.timeout(8000),
            headers: {
              Authorization: `Basic ${Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString("base64")}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              From: process.env.TWILIO_FROM_NUMBER,
              To: process.env.ALERT_SMS_TO,
              Body: message,
            }),
          },
        );
      }
      if (res) {
        const body = await res.json().catch(() => ({}));
        providerId =
          typeof body.id === "string" ? body.id : typeof body.sid === "string" ? body.sid : null;
        sent = res.ok && Boolean(providerId);
        reason = sent ? "accepted_by_provider" : `provider_http_${res.status}`;
      }
    } catch {
      reason = "provider_network_error";
    }
    await engineRpc("finish_engine_alert", {
      p_id: job.id,
      p_lease_token: job.lease_token,
      p_sent: sent,
      p_provider_id: providerId,
      p_error: reason,
    });
    processed++;
  }
  return { held: false, processed };
}
