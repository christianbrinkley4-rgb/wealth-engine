type Environment = Record<string, string | undefined>;
const configured = (value: string | undefined) =>
  Boolean(value?.trim()) && !/placeholder|replace[_-]?me|your[_-]?key/i.test(value!);
const dummyTurnstile = (value: string | undefined) => /^[123]x0{10,}/.test(value ?? "");

/** Contains variable names and booleans only. Never include credential values. */
export function leadEngineReadiness(env: Environment = process.env) {
  const missing: string[] = [];
  const mode = env.LEAD_ENGINE_ENVIRONMENT;
  const hostingTarget =
    env.VERCEL_ENV ?? env.CONTEXT ?? (env.NODE_ENV === "production" ? "production" : "development");
  if (mode !== "staging" && mode !== "production") missing.push("LEAD_ENGINE_ENVIRONMENT");
  if (hostingTarget === "production" && mode !== "production")
    missing.push("production_environment_mismatch");
  if ((hostingTarget === "preview" || hostingTarget === "deploy-preview") && mode !== "staging")
    missing.push("preview_environment_mismatch");
  if (env.LEAD_ENGINE_STORAGE === "neon") {
    try {
      const connection = new URL(env.LEAD_ENGINE_DATABASE_URL ?? "");
      if (
        connection.protocol !== "postgresql:" ||
        !connection.hostname.endsWith(".neon.tech") ||
        !connection.password
      )
        missing.push("LEAD_ENGINE_DATABASE_URL");
    } catch {
      missing.push("LEAD_ENGINE_DATABASE_URL");
    }
  } else {
    if (env.LEAD_ENGINE_STORAGE && env.LEAD_ENGINE_STORAGE !== "supabase")
      missing.push("LEAD_ENGINE_STORAGE");
    if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(env.LEAD_ENGINE_SUPABASE_URL ?? ""))
      missing.push("LEAD_ENGINE_SUPABASE_URL");
    if (!configured(env.LEAD_ENGINE_SERVICE_ROLE_KEY)) missing.push("LEAD_ENGINE_SERVICE_ROLE_KEY");
  }
  if (!configured(env.NEXT_PUBLIC_TURNSTILE_SITE_KEY))
    missing.push("NEXT_PUBLIC_TURNSTILE_SITE_KEY");
  if (!configured(env.TURNSTILE_SECRET_KEY)) missing.push("TURNSTILE_SECRET_KEY");
  const emailReady = ["RESEND_API_KEY", "RESEND_FROM", "LEAD_NOTIFY_EMAIL"].every((key) =>
    configured(env[key]),
  );
  const smsReady = [
    "TWILIO_ACCOUNT_SID",
    "TWILIO_AUTH_TOKEN",
    "TWILIO_FROM_NUMBER",
    "ALERT_SMS_TO",
  ].every((key) => configured(env[key]));
  if (mode === "production") {
    if (
      dummyTurnstile(env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) ||
      dummyTurnstile(env.TURNSTILE_SECRET_KEY)
    )
      missing.push("production_captcha_uses_test_keys");
    if (env.LEAD_ENGINE_ALERTS_ENABLED !== "true" || (!emailReady && !smsReady))
      missing.push("owner_notifications");
    if ((env.LEAD_ENGINE_CRON_SECRET?.length ?? 0) < 32) missing.push("LEAD_ENGINE_CRON_SECRET");
    try {
      const origin = new URL(env.LEAD_ENGINE_PRODUCTION_ORIGIN ?? "");
      if (
        origin.protocol !== "https:" ||
        origin.username ||
        origin.password ||
        origin.origin !== env.LEAD_ENGINE_PRODUCTION_ORIGIN ||
        origin.hostname.endsWith(".vercel.app") ||
        origin.hostname === "localhost"
      )
        missing.push("LEAD_ENGINE_PRODUCTION_ORIGIN");
    } catch {
      missing.push("LEAD_ENGINE_PRODUCTION_ORIGIN");
    }
  }
  return {
    ready: missing.length === 0,
    mode: mode ?? "unconfigured",
    missing,
    emailReady,
    smsReady,
    testCaptcha:
      dummyTurnstile(env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) ||
      dummyTurnstile(env.TURNSTILE_SECRET_KEY),
  };
}
