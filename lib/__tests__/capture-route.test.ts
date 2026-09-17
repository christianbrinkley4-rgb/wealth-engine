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
  markDelivery: vi.fn(),
  verifyTurnstile: vi.fn(),
}));
vi.mock("@/lib/commandCenter", () => ({
  commandCenterConfig: mocks.commandCenterConfig,
  captureInCommandCenter: mocks.commandCenterCapture,
  markDelivery: mocks.markDelivery,
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

/** The shapes lib/notifyLead now returns. */
const delivered = { ok: true, retryable: false, providerId: "resend-1" };
const notConfigured = { ok: false, retryable: false, skipped: true };
const retryableFailure = { ok: false, retryable: true, status: 500, error: "HTTP 500" };
const permanentFailure = { ok: false, retryable: false, status: 422, error: "HTTP 422" };

/** A Command Center that enqueues all three deliveries and hands back their ids. */
const receipt = (over: Record<string, unknown> = {}) => ({
  stored: true,
  duplicate: false,
  requires_review: false,
  outbox: { owner_alert: "ob-alert", prospect_reply: "ob-reply", meta_capi: "ob-meta" },
  ...over,
});

/** Every (outbox id, status) pair the route reported, in a form that reads in a diff. */
const marks = () =>
  mocks.markDelivery.mock.calls.map((call) => [call[0], call[1]] as [string, string]);

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
  mocks.email.mockResolvedValue(notConfigured);
  mocks.notify.mockResolvedValue(delivered);
  mocks.markDelivery.mockResolvedValue(true);
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
    mocks.email.mockResolvedValue(delivered);
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
    mocks.notify.mockResolvedValue(retryableFailure);
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
    mocks.commandCenterCapture.mockResolvedValue(receipt());
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
    mocks.commandCenterCapture.mockResolvedValue(receipt({ duplicate: true }));
    expect(await (await POST(request(valid()))).json()).toMatchObject({
      success: true,
      updated: true,
    });
    expect(mocks.email).not.toHaveBeenCalled();
    expect(mocks.notify).not.toHaveBeenCalled();
  });
  it("holds automated prospect replies when a contact restriction requires review", async () => {
    mocks.commandCenterConfig.mockReturnValue({ configured: true });
    mocks.commandCenterCapture.mockResolvedValue(receipt({ requires_review: true }));
    expect(await (await POST(request(valid()))).json()).toMatchObject({
      success: true,
      stored: true,
      emailConfigured: false,
    });
    expect(mocks.email).not.toHaveBeenCalled();
    expect(mocks.notify).toHaveBeenCalled();
  });
});

/*
 * The outbox half. These assert what the website owes the Command Center after
 * delivery: an honest per-job outcome, or silence. Silence is a real answer -
 * an unmarked row stays pending, which is exactly what a retry worker looks for.
 */
describe("delivery outbox marking", () => {
  beforeEach(() => {
    mocks.commandCenterConfig.mockReturnValue({ configured: true });
    mocks.commandCenterCapture.mockResolvedValue(receipt());
  });

  // Acceptance case 1.
  it("records a provider 5xx on the auto-reply as retryable and still confirms the inquiry", async () => {
    mocks.email.mockResolvedValue(retryableFailure);
    expect(await (await POST(request(valid()))).json()).toMatchObject({
      success: true,
      stored: true,
      emailConfigured: false,
    });
    expect(marks()).toContainEqual(["ob-reply", "failed_retryable"]);
    expect(mocks.markDelivery).toHaveBeenCalledWith(
      "ob-reply",
      "failed_retryable",
      expect.objectContaining({ error: "HTTP 500" }),
    );
  });

  it("records a delivered auto-reply as sent, with the provider id", async () => {
    mocks.email.mockResolvedValue(delivered);
    await POST(request(valid()));
    expect(mocks.markDelivery).toHaveBeenCalledWith(
      "ob-reply",
      "sent",
      expect.objectContaining({ providerId: "resend-1" }),
    );
  });

  it("does not ask for a retry of an address the provider refuses", async () => {
    mocks.email.mockResolvedValue(permanentFailure);
    await POST(request(valid()));
    expect(marks()).toContainEqual(["ob-reply", "failed_permanent"]);
  });

  // Acceptance case 4.
  it("records a failed owner alert as retryable without failing the visitor", async () => {
    mocks.notify.mockResolvedValue(retryableFailure);
    expect((await POST(request(valid()))).status).toBe(200);
    expect(marks()).toContainEqual(["ob-alert", "failed_retryable"]);
  });

  // Acceptance case 2.
  it("marks nothing for a duplicate submission", async () => {
    mocks.commandCenterCapture.mockResolvedValue(receipt({ duplicate: true }));
    await POST(request(valid()));
    expect(mocks.markDelivery).not.toHaveBeenCalled();
  });

  /*
   * Acceptance case 3. The reply is suppressed at the route, not only at the
   * send, so a Command Center that wrongly queued one cannot get it delivered
   * now or resurrected by a later replay of that row.
   */
  it("never touches a prospect_reply row that requires review", async () => {
    mocks.commandCenterCapture.mockResolvedValue(receipt({ requires_review: true }));
    mocks.email.mockResolvedValue(delivered);
    await POST(request(valid()));
    expect(mocks.email).not.toHaveBeenCalled();
    expect(marks().map(([id]) => id)).not.toContain("ob-reply");
    expect(marks()).toContainEqual(["ob-alert", "sent"]);
  });

  // Acceptance case 5: nothing stored means no row exists to mark.
  it("marks nothing when storage failed and the alert is the only record", async () => {
    mocks.commandCenterCapture.mockRejectedValue(new Error("command center down"));
    expect(await (await POST(request(valid()))).json()).toMatchObject({
      success: true,
      stored: false,
    });
    expect(mocks.notify).toHaveBeenCalledWith(expect.objectContaining({ storageFailed: true }));
    expect(mocks.markDelivery).not.toHaveBeenCalled();
  });

  it("leaves an unconfigured channel pending rather than writing it off", async () => {
    mocks.email.mockResolvedValue(notConfigured);
    await POST(request(valid()));
    expect(marks().map(([id]) => id)).not.toContain("ob-reply");
  });

  it("never marks a meta_capi row it cannot observe", async () => {
    await POST(request(valid()));
    expect(marks().map(([id]) => id)).not.toContain("ob-meta");
  });

  // The site predates the outbox and has to keep working without one.
  it("captures and emails normally when the command center returns no outbox ids", async () => {
    mocks.commandCenterCapture.mockResolvedValue(receipt({ outbox: {} }));
    mocks.email.mockResolvedValue(delivered);
    expect(await (await POST(request(valid()))).json()).toMatchObject({
      success: true,
      stored: true,
      emailConfigured: true,
    });
    expect(mocks.notify).toHaveBeenCalled();
    expect(mocks.markDelivery).not.toHaveBeenCalled();
  });

  it("still confirms the inquiry when marking itself fails", async () => {
    mocks.markDelivery.mockRejectedValue(new Error("mark endpoint down"));
    mocks.email.mockResolvedValue(delivered);
    expect(await (await POST(request(valid()))).json()).toMatchObject({
      success: true,
      stored: true,
      emailConfigured: true,
    });
  });
});
