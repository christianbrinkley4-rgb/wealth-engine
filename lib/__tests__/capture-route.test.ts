import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { CONSENT_TEXT, CONSENT_VERSION, SMS_CONSENT_TEXT } from "@/lib/agent";

const mocks = vi.hoisted(() => ({
  insert: vi.fn(),
  select: vi.fn(),
  email: vi.fn(),
  notify: vi.fn(),
  storage: vi.fn(),
  commandCenterConfig: vi.fn(),
  commandCenterCapture: vi.fn(),
  verifyTurnstile: vi.fn(),
}));
vi.mock("@/lib/commandCenter", () => ({
  commandCenterConfig: mocks.commandCenterConfig,
  captureInCommandCenter: mocks.commandCenterCapture,
}));
vi.mock("@/lib/rateLimit", () => ({ getClientIp: () => "127.0.0.1", isRateLimited: () => false }));
vi.mock("@/lib/turnstile", () => ({ verifyTurnstile: mocks.verifyTurnstile }));
vi.mock("@/lib/metaCapi", () => ({ sendMetaLeadEvent: async () => {} }));
vi.mock("@/lib/notifyLead", () => ({
  isLeadNotifyConfigured: () => true,
  notifyLeadCaptured: mocks.notify,
  sendProspectAutoReply: mocks.email,
}));
vi.mock("@/lib/supabase", () => ({
  hasSupabaseAdminConfig: () => true,
  getSupabaseAdmin: () => ({ from: () => ({ select: mocks.select, insert: mocks.insert }) }),
}));
import { POST } from "@/app/api/capture-lead/route";

const valid = () => ({
  stage: "complete",
  source: "help_quiz",
  email: "test@example.com",
  full_name: "Test Visitor",
  phone_number: "+1 919 555 0100",
  zip_code: "27401",
  interest_topic: "medicare",
  consent_given: true,
  consent_text: CONSENT_TEXT,
  consent_version: CONSENT_VERSION,
});
const request = (body: unknown) =>
  new NextRequest("http://localhost/api/capture-lead", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

beforeEach(() => {
  vi.clearAllMocks();
  mocks.commandCenterConfig.mockReturnValue(null);
  mocks.verifyTurnstile.mockResolvedValue({ ok: true });
  const chain = { eq: vi.fn(), gte: vi.fn(), order: vi.fn(), limit: vi.fn() };
  chain.eq.mockReturnValue(chain);
  chain.gte.mockReturnValue(chain);
  chain.order.mockReturnValue(chain);
  chain.limit.mockResolvedValue({ data: [], error: null });
  mocks.select.mockReturnValue(chain);
  mocks.insert.mockResolvedValue({ error: null });
  mocks.email.mockResolvedValue(false);
  mocks.notify.mockResolvedValue(true);
});

describe("lead capture delivery contract", () => {
  it("does not capture or notify when configured bot verification is unavailable", async () => {
    mocks.verifyTurnstile.mockResolvedValue({ ok: false, reason: "verification-unavailable" });
    const response = await POST(request(valid()));
    expect(response.status).toBe(503);
    expect(response.headers.get("Retry-After")).toBe("30");
    expect(await response.json()).toMatchObject({ code: "verification_unavailable" });
    expect(mocks.insert).not.toHaveBeenCalled();
    expect(mocks.commandCenterCapture).not.toHaveBeenCalled();
    expect(mocks.notify).not.toHaveBeenCalled();
    expect(mocks.email).not.toHaveBeenCalled();
  });
  it("saves the complete phone number and does not promise a rejected email", async () => {
    const response = await POST(request(valid()));
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({
      success: true,
      stored: true,
      emailConfigured: false,
    });
    expect(mocks.insert).toHaveBeenCalledWith(
      expect.objectContaining({ phone_number: "9195550100", consent_text: CONSENT_TEXT }),
    );
  });
  it("reports email acceptance only when the provider accepts it", async () => {
    mocks.email.mockResolvedValue(true);
    expect(await (await POST(request(valid()))).json()).toMatchObject({ emailConfigured: true });
  });
  it("keeps a saved inquiry successful when email throws", async () => {
    mocks.email.mockRejectedValue(new Error("provider unavailable"));
    expect(await (await POST(request(valid()))).json()).toMatchObject({
      success: true,
      emailConfigured: false,
    });
  });
  it("requires success from an alert if storage fails", async () => {
    mocks.insert.mockResolvedValue({ error: { message: "storage unavailable" } });
    mocks.notify.mockResolvedValue(false);
    const response = await POST(request(valid()));
    expect(response.status).toBe(503);
    expect(mocks.email).not.toHaveBeenCalled();
  });
  it.each([null, [], "invalid", 42])(
    "rejects a malformed request without writing",
    async (body) => {
      expect((await POST(request(body))).status).toBe(400);
      expect(mocks.insert).not.toHaveBeenCalled();
    },
  );
  it.each([
    { phone_number: "919555010012" },
    { email: 12 },
    { zip_code: "27401abc" },
    { consent_text: "anything" },
    { annual_income: "a lot" },
    { calculated_premium: {} },
  ])("rejects invalid contact or consent data", async (fields) => {
    expect((await POST(request({ ...valid(), ...fields }))).status).toBe(400);
    expect(mocks.insert).not.toHaveBeenCalled();
  });
  it("never treats a truthy string as consent to text", async () => {
    await POST(request({ ...valid(), sms_consent: "yes", sms_consent_text: SMS_CONSENT_TEXT }));
    expect(mocks.insert).toHaveBeenCalledWith(
      expect.objectContaining({ sms_consent: false, sms_consent_text: null }),
    );
  });
  it("routes inquiries through the command center without writing the legacy schema", async () => {
    mocks.commandCenterConfig.mockReturnValue({ configured: true });
    mocks.commandCenterCapture.mockResolvedValue({
      stored: true,
      duplicate: false,
      requires_review: false,
    });
    expect(await (await POST(request(valid()))).json()).toMatchObject({
      success: true,
      stored: true,
    });
    expect(mocks.commandCenterCapture).toHaveBeenCalledWith(
      expect.objectContaining({ full_name: "Test Visitor", phone_number: "9195550100" }),
    );
    expect(mocks.insert).not.toHaveBeenCalled();
  });
  it("does not resend email or alerts for a duplicate inquiry", async () => {
    mocks.commandCenterConfig.mockReturnValue({ configured: true });
    mocks.commandCenterCapture.mockResolvedValue({
      stored: true,
      duplicate: true,
      requires_review: false,
    });
    expect(await (await POST(request(valid()))).json()).toMatchObject({
      success: true,
      updated: true,
    });
    expect(mocks.email).not.toHaveBeenCalled();
    expect(mocks.notify).not.toHaveBeenCalled();
  });
  it("holds automated prospect replies when a contact restriction requires review", async () => {
    mocks.commandCenterConfig.mockReturnValue({ configured: true });
    mocks.commandCenterCapture.mockResolvedValue({
      stored: true,
      duplicate: false,
      requires_review: true,
    });
    expect(await (await POST(request(valid()))).json()).toMatchObject({
      success: true,
      stored: true,
      emailConfigured: false,
    });
    expect(mocks.email).not.toHaveBeenCalled();
    expect(mocks.notify).toHaveBeenCalled();
  });
});
