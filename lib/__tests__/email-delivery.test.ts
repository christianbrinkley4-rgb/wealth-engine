import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.resetModules();
});

describe("prospect email result", () => {
  it("returns false when no sender is configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("RESEND_FROM", "");
    vi.resetModules();
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    const { sendProspectAutoReply } = await import("@/lib/notifyLead");
    expect(
      await sendProspectAutoReply({ email: "test@example.com", interest_topic: "medicare" }),
    ).toBe(false);
    expect(fetch).not.toHaveBeenCalled();
  });
  it.each([true, false])("returns the provider acceptance result (%s)", async (accepted) => {
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("RESEND_FROM", "test@example.com");
    vi.resetModules();
    const fetch = vi.fn().mockResolvedValue({
      ok: accepted,
      status: accepted ? 200 : 422,
      text: async () => "test response",
    });
    vi.stubGlobal("fetch", fetch);
    const { sendProspectAutoReply } = await import("@/lib/notifyLead");
    expect(
      await sendProspectAutoReply({ email: "test@example.com", interest_topic: "medicare" }),
    ).toBe(accepted);
    const payload = JSON.parse(fetch.mock.calls[0][1].body);
    expect(payload.html).not.toContain('href="/schedule"');
    expect(payload.html).toContain("/schedule");
    expect(fetch.mock.calls[0][1].signal).toBeDefined();
  });
});
