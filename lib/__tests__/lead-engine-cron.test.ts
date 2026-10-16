import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import retry from "../../netlify/functions/cron-lead-engine";

beforeEach(() => {
  vi.stubEnv("CONTEXT", "production");
  vi.stubEnv("LEAD_ENGINE_ENVIRONMENT", "production");
  vi.stubEnv("LEAD_ENGINE_RETRY_ENABLED", "true");
  vi.stubEnv("LEAD_ENGINE_CRON_SECRET", "");
  vi.stubEnv("CRON_SECRET", "x".repeat(64));
  vi.stubEnv("LEAD_ENGINE_PRODUCTION_ORIGIN", "https://christianbrinkleync.com");
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});
describe("Netlify owner email retry", () => {
  it("never runs against a preview", async () => {
    vi.stubEnv("CONTEXT", "deploy-preview");
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    expect((await retry()).status).toBe(204);
    expect(fetch).not.toHaveBeenCalled();
  });
  it("does not follow an arbitrary configured destination", async () => {
    vi.stubEnv("LEAD_ENGINE_PRODUCTION_ORIGIN", "https://other.example");
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    await expect(retry()).rejects.toThrow("configuration");
    expect(fetch).not.toHaveBeenCalled();
  });
  it("authenticates the retry without logging the secret", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    const fetch = vi.fn().mockResolvedValue(
      Response.json({
        delivery: { processed: 1, unconfirmed: 0 },
        queue: { pending: 0, needs_attention: 0 },
      }),
    );
    vi.stubGlobal("fetch", fetch);
    expect((await retry()).status).toBe(204);
    expect(fetch.mock.calls[0][1].headers.authorization).toBe("Bearer " + "x".repeat(64));
    expect(JSON.stringify(log.mock.calls)).not.toContain("x".repeat(64));
  });
  it("fails visibly when queue work needs attention", async () => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(
          Response.json({ delivery: { unconfirmed: 0 }, queue: { needs_attention: 1 } }),
        ),
    );
    await expect(retry()).rejects.toThrow("operator attention");
  });
  it("runs with production-only settings when CONTEXT is absent at function runtime", async () => {
    vi.stubEnv("CONTEXT", undefined);
    vi.spyOn(console, "log").mockImplementation(() => {});
    const fetch = vi
      .fn()
      .mockResolvedValue(
        Response.json({
          delivery: { processed: 0, unconfirmed: 0 },
          queue: { needs_attention: 0 },
        }),
      );
    vi.stubGlobal("fetch", fetch);
    expect((await retry()).status).toBe(204);
    expect(fetch).toHaveBeenCalledOnce();
  });
});
