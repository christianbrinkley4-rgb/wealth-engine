import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { DROPS_CONSENT_TEXT, GUIDE_DROPS_CONSENT_TEXT, normalizeDropsEmail } from "@/lib/wealth/drops";

/**
 * The route is exercised with every outside service unset and fetch blocked,
 * so a test run can never email anyone.
 */
const ENV_KEYS = ["RESEND_API_KEY", "RESEND_FROM", "TURNSTILE_SECRET_KEY"] as const;
const saved: Record<string, string | undefined> = {};

async function post(body: unknown) {
  const { POST } = await import("@/app/api/wealth-drops/route");
  return POST(
    new Request("http://localhost/api/wealth-drops", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  );
}

describe("tool-drop signups", () => {
  const fetchSpy = vi.fn(() => {
    throw new Error("network is off in tests");
  });

  beforeEach(() => {
    for (const key of ENV_KEYS) {
      saved[key] = process.env[key];
      delete process.env[key];
    }
    vi.resetModules();
    vi.stubGlobal("fetch", fetchSpy);
    fetchSpy.mockClear();
  });

  afterEach(() => {
    for (const key of ENV_KEYS) {
      if (saved[key] === undefined) delete process.env[key];
      else process.env[key] = saved[key];
    }
    vi.unstubAllGlobals();
  });

  it("normalizes real emails and rejects junk", () => {
    expect(normalizeDropsEmail("  Sam@Example.COM ")).toBe("sam@example.com");
    for (const bad of ["", "sam", "sam@", "sam@x", "a b@c.com", 42, null, `${"a".repeat(260)}@x.com`]) {
      expect(normalizeDropsEmail(bad)).toBeNull();
    }
  });

  it("rejects a bad email with a 400", async () => {
    const response = await post({ email: "not-an-email" });
    expect(response.status).toBe(400);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("rejects a body that is not JSON", async () => {
    expect((await post("{nope")).status).toBe(400);
  });

  it.each([null, [], 42, true])("rejects non-object JSON %j without contacting a service", async (body) => {
    expect((await post(body)).status).toBe(400);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("limits UTF-8 bytes before checking the honeypot", async () => {
    expect((await post({ company: "猫".repeat(1500) })).status).toBe(400);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("limits the sixth attempt and resets after ten minutes", async () => {
    vi.useFakeTimers();
    try {
      for (let i = 0; i < 5; i++) expect((await post({ email: "bad" })).status).toBe(400);
      expect((await post({ email: "bad" })).status).toBe(429);
      vi.advanceTimersByTime(600_001);
      expect((await post({ email: "bad" })).status).toBe(400);
      expect(fetchSpy).not.toHaveBeenCalled();
    } finally {
      vi.useRealTimers();
    }
  });

  it("fails closed when a configured bot check has no token", async () => {
    process.env.TURNSTILE_SECRET_KEY = "test-secret";
    const response = await post({ email: "sam@example.com" });
    expect(response.status).toBe(400);
    expect(await response.json()).toMatchObject({ retryCheck: true });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("fails closed when bot verification is unavailable", async () => {
    process.env.TURNSTILE_SECRET_KEY = "test-secret";
    const response = await post({ email: "sam@example.com", turnstileToken: "test-token" });
    expect(response.status).toBe(400);
    expect(await response.json()).toMatchObject({ retryCheck: true });
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it("swallows a filled honeypot without sending anything", async () => {
    const response = await post({ email: "bot@example.com", company: "Acme" });
    expect(response.status).toBe(200);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("says so, without a list-specific fallback, when email is not set up", async () => {
    const response = await post({ email: "sam@example.com" });
    expect(response.status).toBe(503);
    expect(((await response.json()) as { error: string }).error).toContain("Try again");
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("tells people how to get off the list", () => {
    expect(DROPS_CONSENT_TEXT).toMatch(/unsubscribe/i);
    expect(DROPS_CONSENT_TEXT).toMatch(/never sold or shared/i);
    expect(DROPS_CONSENT_TEXT).not.toMatch(/[—–]/);
  });
});

describe("guide signups", () => {
  it("labels the email and consent for the guides list", async () => {
    const sent: Array<{ subject: string; text: string }> = [];
    vi.doMock("@/lib/notifyLead", () => ({
      sendStoredEmailSnapshot: async (options: { subject: string; text: string }) => {
        sent.push({ subject: options.subject, text: options.text });
        return { ok: true, retryable: false };
      },
    }));
    vi.resetModules();
    try {
      const { POST } = await import("@/app/api/wealth-drops/route");
      const response = await POST(
        new Request("http://localhost/api/wealth-drops", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: "sam@example.com", list: "guides" }),
        }),
      );
      expect(response.status).toBe(200);
      expect(sent).toHaveLength(1);
      expect(sent[0].subject).toContain("Guide signup");
      expect(sent[0].text).toContain("new-guide emails");
      expect(sent[0].text).toContain(GUIDE_DROPS_CONSENT_TEXT);
    } finally {
      vi.doUnmock("@/lib/notifyLead");
      vi.resetModules();
    }
  });

  it("defaults an unknown list to tool drops", async () => {
    const sent: Array<{ subject: string; text: string }> = [];
    vi.doMock("@/lib/notifyLead", () => ({
      sendStoredEmailSnapshot: async (options: { subject: string; text: string }) => {
        sent.push({ subject: options.subject, text: options.text });
        return { ok: true, retryable: false };
      },
    }));
    vi.resetModules();
    try {
      const { POST } = await import("@/app/api/wealth-drops/route");
      const response = await POST(
        new Request("http://localhost/api/wealth-drops", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: "sam@example.com", list: "bogus" }),
        }),
      );
      expect(response.status).toBe(200);
      expect(sent[0].subject).toContain("Tool drops signup");
      expect(sent[0].text).toContain(DROPS_CONSENT_TEXT);
    } finally {
      vi.doUnmock("@/lib/notifyLead");
      vi.resetModules();
    }
  });
});
