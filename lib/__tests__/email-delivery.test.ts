import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.resetModules();
});

/** Resend configured, fetch stubbed. Returns the stub so callers can inspect it. */
async function withResend(response: unknown | (() => Promise<unknown>)) {
  vi.stubEnv("RESEND_API_KEY", "test-key");
  vi.stubEnv("RESEND_FROM", "test@example.com");
  vi.stubEnv("MAKE_WEBHOOK_URL", "");
  vi.stubEnv("TWILIO_ACCOUNT_SID", "");
  vi.resetModules();
  const fetch =
    typeof response === "function"
      ? vi.fn(response as () => Promise<unknown>)
      : vi.fn().mockResolvedValue(response);
  vi.stubGlobal("fetch", fetch);
  return { fetch, notifyLead: await import("@/lib/notifyLead") };
}

const accepted = { ok: true, status: 200, json: async () => ({ id: "resend-message-1" }) };
const rejection = (status: number, headers?: Record<string, string>) => ({
  ok: false,
  status,
  text: async () => `provider said ${status}`,
  headers: { get: (name: string) => headers?.[name.toLowerCase()] ?? null },
});

const prospect = { email: "test@example.com", interest_topic: "medicare" as const };

describe("prospect email result", () => {
  it("returns false when no sender is configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("RESEND_FROM", "");
    vi.resetModules();
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    const { sendProspectAutoReply } = await import("@/lib/notifyLead");
    const result = await sendProspectAutoReply(prospect);
    // Nothing was attempted, so nothing is owed: not a failure worth retrying.
    expect(result).toMatchObject({ ok: false, retryable: false, skipped: true });
    expect(fetch).not.toHaveBeenCalled();
  });

  it.each([true, false])("returns the provider acceptance result (%s)", async (ok) => {
    const { fetch, notifyLead } = await withResend(ok ? accepted : rejection(422));
    const result = await notifyLead.sendProspectAutoReply(prospect);
    expect(result.ok).toBe(ok);
    const payload = JSON.parse((fetch.mock.calls[0] as [string, { body: string }])[1].body);
    expect(payload.html).not.toContain('href="/schedule"');
    expect(payload.html).toContain("/schedule");
    expect((fetch.mock.calls[0] as [string, { signal?: unknown }])[1].signal).toBeDefined();
  });

  it("records the provider message id on success", async () => {
    const { notifyLead } = await withResend(accepted);
    expect(await notifyLead.sendProspectAutoReply(prospect)).toMatchObject({
      ok: true,
      retryable: false,
      providerId: "resend-message-1",
    });
  });
});

/**
 * Acceptance case 6, plus the classification the whole outbox depends on.
 * Getting this wrong in either direction is expensive: a retryable failure
 * written off loses the email, and a permanent one retried forever burns
 * sending reputation on an address that will never accept it.
 */
describe("delivery failure classification", () => {
  it.each([500, 502, 503, 429])("treats HTTP %s as retryable", async (status) => {
    const { notifyLead } = await withResend(rejection(status));
    expect(await notifyLead.sendProspectAutoReply(prospect)).toMatchObject({
      ok: false,
      retryable: true,
      status,
    });
  });

  it.each([400, 401, 403, 404, 422])("treats HTTP %s as permanent", async (status) => {
    const { notifyLead } = await withResend(rejection(status));
    expect(await notifyLead.sendProspectAutoReply(prospect)).toMatchObject({
      ok: false,
      retryable: false,
      status,
    });
  });

  it("keeps Retry-After and the provider text on a 429", async () => {
    const { notifyLead } = await withResend(rejection(429, { "retry-after": "31" }));
    const result = await notifyLead.sendProspectAutoReply(prospect);
    expect(result).toMatchObject({ ok: false, retryable: true, status: 429 });
    expect(result.error).toContain("retry-after 31");
    expect(result.error).toContain("provider said 429");
  });

  it("treats a network failure as retryable", async () => {
    const { notifyLead } = await withResend(async () => {
      throw new TypeError("fetch failed");
    });
    const result = await notifyLead.sendProspectAutoReply(prospect);
    expect(result).toMatchObject({ ok: false, retryable: true });
    expect(result.error).toContain("fetch failed");
  });

  it("treats a timeout as retryable", async () => {
    const { notifyLead } = await withResend(async () => {
      throw new DOMException("The operation was aborted due to timeout", "TimeoutError");
    });
    const result = await notifyLead.sendProspectAutoReply(prospect);
    expect(result).toMatchObject({ ok: false, retryable: true });
    expect(result.error).toContain("TimeoutError");
  });
});

describe("owner alert result", () => {
  const lead = {
    source: "help_quiz",
    email: "visitor@example.com",
    full_name: "Test Visitor",
    interest_topic: "medicare",
  };

  it("reports skipped when no channel is configured at all", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("RESEND_FROM", "");
    vi.stubEnv("MAKE_WEBHOOK_URL", "");
    vi.stubEnv("TWILIO_ACCOUNT_SID", "");
    vi.resetModules();
    vi.stubGlobal("fetch", vi.fn());
    const { notifyLeadCaptured } = await import("@/lib/notifyLead");
    expect(await notifyLeadCaptured(lead)).toMatchObject({ skipped: true, retryable: false });
  });

  // Acceptance case 4: nothing reached Christian, but a later attempt could.
  it("reports a retryable failure when every attempted channel fails on a 5xx", async () => {
    const { notifyLead } = await withResend(rejection(503));
    const result = await notifyLead.notifyLeadCaptured(lead);
    expect(result).toMatchObject({ ok: false, retryable: true });
    expect(result.error).toContain("HTTP 503");
  });

  it("does not ask for a retry when the only failure is permanent", async () => {
    const { notifyLead } = await withResend(rejection(403));
    expect(await notifyLead.notifyLeadCaptured(lead)).toMatchObject({
      ok: false,
      retryable: false,
    });
  });

  // Acceptance case 5: the alert is the only copy of the lead, and says so.
  it("keeps the [NOT SAVED] subject when storage failed", async () => {
    const { fetch, notifyLead } = await withResend(accepted);
    expect(await notifyLead.notifyLeadCaptured({ ...lead, storageFailed: true })).toMatchObject({
      ok: true,
    });
    const payload = JSON.parse((fetch.mock.calls[0] as [string, { body: string }])[1].body);
    expect(payload.subject).toContain("[NOT SAVED]");
    expect(payload.text).toContain("ONLY copy");
  });

  it("does not mark a saved lead as unsaved", async () => {
    const { fetch, notifyLead } = await withResend(accepted);
    await notifyLead.notifyLeadCaptured(lead);
    const payload = JSON.parse((fetch.mock.calls[0] as [string, { body: string }])[1].body);
    expect(payload.subject).not.toContain("[NOT SAVED]");
  });
});
