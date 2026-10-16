import { describe, expect, it } from "vitest";
import { leadEngineReadiness } from "../leadEngineReadiness";
const staging = {
  LEAD_ENGINE_ENVIRONMENT: "staging",
  VERCEL_ENV: "preview",
  LEAD_ENGINE_SUPABASE_URL: "https://staging.supabase.co",
  LEAD_ENGINE_SERVICE_ROLE_KEY: "test-storage",
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: "1x00000000000000000000AA",
  TURNSTILE_SECRET_KEY: "1x0000000000000000000000000000000AA",
};
const production = {
  ...staging,
  LEAD_ENGINE_ENVIRONMENT: "production",
  VERCEL_ENV: "production",
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: "real-site-key",
  TURNSTILE_SECRET_KEY: "real-secret-key",
  LEAD_ENGINE_ALERTS_ENABLED: "true",
  RESEND_API_KEY: "test-provider",
  RESEND_FROM: "test@example.invalid",
  LEAD_NOTIFY_EMAIL: "owner@example.invalid",
  LEAD_ENGINE_CRON_SECRET: "x".repeat(32),
  LEAD_ENGINE_PRODUCTION_ORIGIN: "https://christianbrinkleync.com",
};
describe("lead engine release boundaries", () => {
  it("allows official dummy CAPTCHA keys only for staged testing", () =>
    expect(leadEngineReadiness(staging)).toMatchObject({ ready: true, testCaptcha: true }));
  it("rejects a staging environment on a production target", () =>
    expect(leadEngineReadiness({ ...staging, VERCEL_ENV: "production" }).ready).toBe(false));
  it("rejects production credentials mode on a preview target", () =>
    expect(leadEngineReadiness({ ...production, VERCEL_ENV: "preview" }).ready).toBe(false));
  it("rejects test CAPTCHA keys in production", () =>
    expect(
      leadEngineReadiness({ ...production, TURNSTILE_SECRET_KEY: staging.TURNSTILE_SECRET_KEY })
        .missing,
    ).toContain("production_captcha_uses_test_keys"));
  it("requires owner alerts before accepting production contacts", () =>
    expect(
      leadEngineReadiness({ ...production, LEAD_ENGINE_ALERTS_ENABLED: "false" }).missing,
    ).toContain("owner_notifications"));
  it("requires an authenticated retry secret", () =>
    expect(
      leadEngineReadiness({ ...production, LEAD_ENGINE_CRON_SECRET: "short" }).missing,
    ).toContain("LEAD_ENGINE_CRON_SECRET"));
  it("requires the canonical production origin", () =>
    expect(
      leadEngineReadiness({ ...production, LEAD_ENGINE_PRODUCTION_ORIGIN: "http://localhost:3000" })
        .ready,
    ).toBe(false));
  it("accepts a complete production configuration", () =>
    expect(leadEngineReadiness(production).ready).toBe(true));
});
