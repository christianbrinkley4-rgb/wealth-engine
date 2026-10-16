import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { ENGINE_CONSENT, ENGINE_CONSENT_VERSION } from "../leadEnginePublic";
const { rpc, alert } = vi.hoisted(() => ({ rpc: vi.fn(), alert: vi.fn() }));
vi.mock("@/lib/leadEngine", async (original) => ({
  ...(await original<typeof import("../leadEngine")>()),
  engineRpc: (...args: unknown[]) => rpc(...args),
  deliverEngineAlerts: alert,
}));
vi.mock("@/lib/rateLimit", () => ({ getClientIp: () => "test", isRateLimited: () => false }));
vi.mock("@/lib/turnstile", () => ({
  isTurnstileConfigured: () => true,
  verifyTurnstile: () => Promise.resolve({ ok: true }),
}));
vi.mock("next/server", async (original) => ({
  ...(await original<typeof import("next/server")>()),
  after: vi.fn(),
}));
import { GET, POST } from "@/app/api/quiz-lead/route";
const body = {
  id: "8872080c-a100-4120-8111-abec8738b077",
  name: "Test",
  phone: "3365550100",
  zip: "27401",
  source: "medicare-review",
  consent: true,
  consent_version: ENGINE_CONSENT_VERSION,
  consent_text: ENGINE_CONSENT,
};
const request = (value: unknown = body, origin = "https://staging.example.com") =>
  new NextRequest("https://staging.example.com/api/quiz-lead", {
    method: "POST",
    headers: { origin, "content-type": "application/json" },
    body: JSON.stringify(value),
  });
beforeEach(() => {
  vi.stubEnv("LEAD_ENGINE_CAPTURE_ENABLED", "true");
  vi.stubEnv("LEAD_ENGINE_ENVIRONMENT", "staging");
  vi.stubEnv("LEAD_ENGINE_SUPABASE_URL", "https://staging.supabase.co");
  vi.stubEnv("LEAD_ENGINE_SERVICE_ROLE_KEY", "synthetic-key");
  vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "synthetic-sitekey");
  vi.stubEnv("TURNSTILE_SECRET_KEY", "synthetic-secret");
  rpc.mockReset();
});
afterEach(() => vi.unstubAllEnvs());
describe("capture receipt boundary", () => {
  it("only succeeds after a durable receipt", async () => {
    rpc.mockResolvedValue({ stored: true, id: body.id });
    const r = await POST(request());
    expect(r.status).toBe(200);
    expect((await r.json()).stored).toBe(true);
  });
  it("accepts retry receipt without another submission", async () => {
    rpc.mockResolvedValue({ stored: true, id: body.id, duplicate: true });
    expect((await (await POST(request())).json()).duplicate).toBe(true);
  });
  it.each([{}, { success: true }, { stored: true, id: "wrong" }])(
    "rejects false receipt %j",
    async (receipt) => {
      rpc.mockResolvedValue(receipt);
      expect((await POST(request())).status).toBe(503);
    },
  );
  it("keeps storage outages visible", async () => {
    rpc.mockRejectedValue(new Error("storage_unavailable"));
    expect((await POST(request())).status).toBe(503);
  });
  it("returns a recoverable conflict for changed payloads", async () => {
    rpc.mockRejectedValue(new Error("id_conflict"));
    expect((await POST(request())).status).toBe(409);
  });
  it("blocks cross-origin requests before touching storage", async () => {
    expect((await POST(request(body, "https://other.example.com"))).status).toBe(403);
    expect(rpc).not.toHaveBeenCalled();
  });
  it("blocks oversized bodies", async () => {
    expect((await POST(request({ ...body, extra: "x".repeat(13000) }))).status).toBe(413);
    expect(rpc).not.toHaveBeenCalled();
  });
  it("holds unconfigured staging capture", async () => {
    vi.stubEnv("LEAD_ENGINE_CAPTURE_ENABLED", "false");
    expect((await POST(request())).status).toBe(503);
    expect(rpc).not.toHaveBeenCalled();
  });
  it("rejects missing call permission", async () => {
    expect((await POST(request({ ...body, consent: false }))).status).toBe(400);
    expect(rpc).not.toHaveBeenCalled();
  });
  it("doesn't expose alert retries publicly", async () => {
    expect((await GET(new NextRequest("https://staging.example.com/api/quiz-lead"))).status).toBe(
      401,
    );
  });
  it("holds capture when staging is accidentally deployed as production", async () => {
    vi.stubEnv("VERCEL_ENV", "production");
    expect((await POST(request())).status).toBe(503);
    expect(rpc).not.toHaveBeenCalled();
  });
  it.each(["https://christianbrinkleync.com", "https://attacker.example"])(
    "checks the configured public origin behind Netlify: %s",
    async (origin) => {
      vi.stubEnv("LEAD_ENGINE_ENVIRONMENT", "production");
      vi.stubEnv("CONTEXT", "production");
      vi.stubEnv("LEAD_ENGINE_PRODUCTION_ORIGIN", "https://christianbrinkleync.com");
      vi.stubEnv("LEAD_ENGINE_ALERTS_ENABLED", "true");
      vi.stubEnv("RESEND_API_KEY", "synthetic-provider");
      vi.stubEnv("RESEND_FROM", "test@example.invalid");
      vi.stubEnv("LEAD_NOTIFY_EMAIL", "owner@example.invalid");
      vi.stubEnv("LEAD_ENGINE_CRON_SECRET", "x".repeat(64));
      rpc.mockResolvedValue({ stored: true, id: body.id });
      const proxied = new NextRequest("http://internal-netlify-host/api/quiz-lead", {
        method: "POST",
        headers: { origin, "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const valid = origin === "https://christianbrinkleync.com";
      expect((await POST(proxied)).status).toBe(valid ? 200 : 403);
      expect(rpc.mock.calls.length).toBe(valid ? 1 : 0);
    },
  );
});
