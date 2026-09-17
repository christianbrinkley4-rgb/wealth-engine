import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

beforeEach(() => {
  vi.resetModules();
  vi.stubEnv("NETLIFY", "");
  vi.stubEnv("VERCEL", "");
  vi.stubEnv("SITE_ID", "");
  vi.stubEnv("SITE_NAME", "");
  vi.stubEnv("URL", "");
  vi.stubEnv("TURNSTILE_SECRET_KEY", "test-secret");
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("bounded request limits", () => {
  it("rejects over-limit requests and resets at the window boundary", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(1000);
    const { isRateLimited } = await import("@/lib/rateLimit");
    expect(isRateLimited("capture:a", { limit: 2, windowMs: 1000 })).toBe(false);
    expect(isRateLimited("capture:a", { limit: 2, windowMs: 1000 })).toBe(false);
    expect(isRateLimited("capture:a", { limit: 2, windowMs: 1000 })).toBe(true);
    vi.setSystemTime(2000);
    expect(isRateLimited("capture:a", { limit: 2, windowMs: 1000 })).toBe(false);
  });

  it("does not let rotating keys evict existing limits or grow storage indefinitely", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(1000);
    const { isRateLimited, MAX_RATE_LIMIT_BUCKETS } = await import("@/lib/rateLimit");
    for (let index = 0; index < MAX_RATE_LIMIT_BUCKETS; index++) {
      expect(isRateLimited(`capture:${index}`, { limit: 1 })).toBe(false);
    }
    expect(isRateLimited("capture:overflow", { limit: 1 })).toBe(true);
    expect(isRateLimited("capture:0", { limit: 1 })).toBe(true);
    vi.setSystemTime(61_000);
    expect(isRateLimited("capture:overflow", { limit: 1 })).toBe(false);
  });
});

describe("platform client IP", () => {
  it("recognizes Netlify at function runtime without the build-only flag", async () => {
    vi.stubEnv("SITE_ID", "configured-site-id");
    vi.stubEnv("SITE_NAME", "christian-site");
    vi.stubEnv("URL", "https://christian-site.netlify.app");
    const { getClientIp } = await import("@/lib/rateLimit");
    expect(
      getClientIp(
        new Request("https://christian-site.netlify.app", {
          headers: { "x-nf-client-connection-ip": "198.51.100.4" },
        }),
      ),
    ).toBe("198.51.100.4");
  });
  it("uses Netlify's connection IP despite forged forwarded headers", async () => {
    vi.stubEnv("NETLIFY", "true");
    const { getClientIp } = await import("@/lib/rateLimit");
    const request = new Request("https://site.test/api/capture-lead", {
      headers: {
        "x-nf-client-connection-ip": "2001:db8::1",
        "x-forwarded-for": "198.51.100.1",
        "x-real-ip": "198.51.100.2",
      },
    });
    expect(getClientIp(request)).toBe("2001:db8::1");
  });

  it.each([undefined, "not-an-ip", "198.51.100.1, 198.51.100.2"])(
    "does not fall back to spoofable headers when Netlify IP is %s",
    async (ip) => {
      vi.stubEnv("NETLIFY", "true");
      const { getClientIp } = await import("@/lib/rateLimit");
      const headers = new Headers({ "x-forwarded-for": "198.51.100.3" });
      if (ip) headers.set("x-nf-client-connection-ip", ip);
      expect(getClientIp(new Request("https://site.test", { headers }))).toBe("unknown");
    },
  );

  it("does not infer proxy trust merely from a visitor-supplied header", async () => {
    const { getClientIp } = await import("@/lib/rateLimit");
    expect(
      getClientIp(
        new Request("https://site.test", {
          headers: { "x-nf-client-connection-ip": "198.51.100.1" },
        }),
      ),
    ).toBe("unknown");
  });
});

describe("Turnstile verification", () => {
  it("keeps local unconfigured forms usable without making a network request", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    const { verifyTurnstile } = await import("@/lib/turnstile");
    expect(await verifyTurnstile(undefined, "unknown")).toEqual({ ok: true });
    expect(fetch).not.toHaveBeenCalled();
  });

  it.each([undefined, "", " ", "x".repeat(2049)])(
    "rejects missing or oversized tokens before a network call",
    async (token) => {
      const fetch = vi.fn();
      vi.stubGlobal("fetch", fetch);
      const { verifyTurnstile } = await import("@/lib/turnstile");
      expect(await verifyTurnstile(token, "unknown")).toMatchObject({ ok: false });
      expect(fetch).not.toHaveBeenCalled();
    },
  );

  it("requires an accepted validation response and omits unknown remote IP", async () => {
    const fetch = vi.fn().mockResolvedValue(Response.json({ success: true }));
    vi.stubGlobal("fetch", fetch);
    const { verifyTurnstile } = await import("@/lib/turnstile");
    expect(await verifyTurnstile("valid-token", "unknown")).toEqual({ ok: true });
    const options = fetch.mock.calls[0][1];
    expect(JSON.parse(options.body)).toEqual({ secret: "test-secret", response: "valid-token" });
  });

  it.each([
    () => Response.json({ success: true }, { status: 500 }),
    () => Response.json({ success: "true" }),
    () => Response.json({ success: false, "error-codes": ["timeout-or-duplicate"] }),
    () => new Response("not-json"),
  ])("rejects rejected, malformed, and non-OK provider responses", async (response) => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response()));
    const { verifyTurnstile } = await import("@/lib/turnstile");
    expect(await verifyTurnstile("valid-token", "198.51.100.1")).toMatchObject({ ok: false });
  });

  it("does not bypass configured protection when the provider is unreachable", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network unavailable")));
    const { verifyTurnstile } = await import("@/lib/turnstile");
    expect(await verifyTurnstile("valid-token", "198.51.100.1")).toEqual({
      ok: false,
      reason: "verification-unavailable",
    });
  });
});
