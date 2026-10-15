import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import {
  ENGINE_CONSENT,
  ENGINE_CONSENT_VERSION,
  QUIZ_VALUES,
  quizResult,
  validateEngineLead,
  deliverEngineAlerts,
  engineRpc,
} from "../leadEngine";

const valid = () => ({
  id: "8872080c-a100-4120-8111-abec8738b077",
  name: "Test Person",
  phone: "(336) 555-0100",
  zip: "27401",
  source: "medicare-fit",
  answers: ["healthy", "open", "local", "lowcost", "nond"],
  consent: true,
  consent_version: ENGINE_CONSENT_VERSION,
  consent_text: ENGINE_CONSENT,
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});
describe("lead engine validation and educational results", () => {
  it("doesn't require or manufacture email, normalizes phone", () => {
    const result = validateEngineLead(valid());
    expect(result.payload.phone).toBe("3365550100");
    expect(result.payload).not.toHaveProperty("email");
  });
  it.each(["1", "0000000000", "+44 20 7946 0000", "3365550100 ext 3"])(
    "rejects invalid phone %s",
    (phone) => expect(() => validateEngineLead({ ...valid(), phone })).toThrow(),
  );
  it.each([
    { consent: false },
    { consent_version: "old" },
    { consent_text: "old" },
    { zip: "2740" },
    { name: "" },
    { source: "other" },
    { id: "fake" },
    { answers: ["healthy"] },
    { answers: ["healthy", "open", "local", "lowcost", "invalid"] },
  ])("rejects invalid request %j", (change) =>
    expect(() => validateEngineLead({ ...valid(), ...change })).toThrow(),
  );
  it("ignores client-side result and any unapproved data", () => {
    const result = validateEngineLead({
      ...valid(),
      result: "guaranteed",
      medicare_number: "private",
    });
    expect(result.payload.result).toBe("compare-costs");
    expect(result.payload).not.toHaveProperty("medicare_number");
  });
  it("binds identity to contact and answers, not attribution", () => {
    const a = validateEngineLead(valid());
    const b = validateEngineLead({ ...valid(), attribution: { utm_source: "facebook" } });
    expect(a.fingerprint).toBe(b.fingerprint);
    expect(validateEngineLead({ ...valid(), phone: "3365550101" }).fingerprint).not.toBe(
      a.fingerprint,
    );
  });
  it("checks all 243 answer combinations", () => {
    let combinations: string[][] = [[]];
    for (const values of QUIZ_VALUES)
      combinations = combinations.flatMap((old) => values.map((value) => [...old, value]));
    expect(combinations).toHaveLength(243);
    for (const answers of combinations) {
      const result = quizResult(answers);
      expect(result.points.length).toBeGreaterThan(0);
      if (answers[4] === "unsure") expect(result.key).toBe("eligibility-check");
      if (answers[4] === "dual") expect(result.key).toBe("dual-review");
      expect(JSON.stringify(result)).not.toMatch(
        /best fit|guaranteed savings|grocery allowance|\$0/i,
      );
    }
  });
});
describe("owner alerts", () => {
  beforeEach(() => {
    vi.stubEnv("LEAD_ENGINE_SUPABASE_URL", "https://staging.supabase.co");
    vi.stubEnv("LEAD_ENGINE_SERVICE_ROLE_KEY", "test-key");
  });
  it("doesn't send while spend and delivery are held", async () => {
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    expect(await deliverEngineAlerts()).toEqual({ held: true, processed: 0 });
    expect(fetch).not.toHaveBeenCalled();
  });
  it("fails closed without a storage configuration", async () => {
    vi.stubEnv("LEAD_ENGINE_SERVICE_ROLE_KEY", "");
    await expect(engineRpc("capture_engine_lead", {})).rejects.toThrow("engine_unconfigured");
  });
  it("keeps a failed email retryable and still attempts SMS", async () => {
    vi.stubEnv("LEAD_ENGINE_ALERTS_ENABLED", "true");
    vi.stubEnv("RESEND_API_KEY", "test");
    vi.stubEnv("RESEND_FROM", "test@example.invalid");
    vi.stubEnv("LEAD_NOTIFY_EMAIL", "owner@example.invalid");
    vi.stubEnv("TWILIO_ACCOUNT_SID", "test");
    vi.stubEnv("TWILIO_AUTH_TOKEN", "test");
    vi.stubEnv("TWILIO_FROM_NUMBER", "+13365550100");
    vi.stubEnv("ALERT_SMS_TO", "+13365550101");
    const marks: Record<string, unknown>[] = [];
    const fetch = vi.fn(async (url: string, options: RequestInit) => {
      if (url.includes("claim_engine_alerts"))
        return Response.json(
          ["email", "sms"].map((channel) => ({
            id: channel,
            lead_id: valid().id,
            channel,
            lease_token: "lease",
            payload: { name: "Test", phone: "3365550100", zip: "27401", source: "medicare-fit" },
          })),
        );
      if (url.includes("resend.com")) return Response.json({ error: "outage" }, { status: 503 });
      if (url.includes("twilio.com")) return Response.json({ sid: "SMtest" });
      marks.push(JSON.parse(options.body as string));
      return Response.json(true);
    });
    vi.stubGlobal("fetch", fetch);
    expect(await deliverEngineAlerts()).toEqual({ held: false, processed: 2 });
    expect(marks[0].p_sent).toBe(false);
    expect(marks[1].p_sent).toBe(true);
    expect(JSON.stringify(fetch.mock.calls)).not.toContain('"answers"');
  });
});
