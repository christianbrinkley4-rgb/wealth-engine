import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { DROPS_CONSENT_TEXT, normalizeDropsEmail } from "@/lib/wealth/drops";

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

  it("swallows a filled honeypot without sending anything", async () => {
    const response = await post({ email: "bot@example.com", company: "Acme" });
    expect(response.status).toBe(200);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("says so, and points to a text, when email is not set up", async () => {
    const response = await post({ email: "sam@example.com" });
    expect(response.status).toBe(503);
    expect(((await response.json()) as { error: string }).error).toContain("Text DROPS");
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("tells people how to get off the list", () => {
    expect(DROPS_CONSENT_TEXT).toMatch(/unsubscribe/i);
    expect(DROPS_CONSENT_TEXT).toMatch(/never sold or shared/i);
    expect(DROPS_CONSENT_TEXT).not.toMatch(/[—–]/);
  });
});
