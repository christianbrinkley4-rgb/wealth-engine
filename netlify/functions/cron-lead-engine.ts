/** Production only. Netlify does not schedule deploy previews. No prospect messages. */
export const config = { schedule: "*/5 * * * *" };

const retryOwnerEmail = async () => {
  if (
    process.env.CONTEXT !== "production" ||
    process.env.LEAD_ENGINE_ENVIRONMENT !== "production" ||
    process.env.LEAD_ENGINE_RETRY_ENABLED !== "true"
  )
    return new Response(null, { status: 204 });
  const secret = process.env.LEAD_ENGINE_CRON_SECRET || process.env.CRON_SECRET;
  const origin = process.env.LEAD_ENGINE_PRODUCTION_ORIGIN;
  if (!secret || secret.length < 32 || origin !== "https://christianbrinkleync.com") {
    throw new Error("Lead retry configuration is incomplete");
  }
  const response = await fetch(`${origin}/api/quiz-lead`, {
    headers: { authorization: `Bearer ${secret}` },
    redirect: "error",
    signal: AbortSignal.timeout(25000),
  });
  if (!response.ok) throw new Error(`Lead retry failed (${response.status})`);
  const result = await response.json();
  // Counts only. Never put credentials or contact details in platform logs.
  console.log("[lead-engine]", JSON.stringify({ delivery: result.delivery, queue: result.queue }));
  if (result.queue?.needs_attention > 0 || result.delivery?.unconfirmed > 0) {
    throw new Error("Lead email queue needs operator attention");
  }
  return new Response(null, { status: 204 });
};

export default retryOwnerEmail;
