import { readFileSync } from "node:fs";
import { join } from "node:path";
import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { INTAKE_CONSENT_TEXT, INTAKE_CONSENT_VERSION } from "@/lib/prepSheet";

/**
 * The appointment prep intake route. Email only, never a database.
 * Every person, drug, doctor and pharmacy here is made up.
 */

const mocks = vi.hoisted(() => ({ verifyTurnstile: vi.fn(), limited: vi.fn() }));
vi.mock("@/lib/rateLimit", () => ({
  getClientIp: () => "127.0.0.1",
  isRateLimited: mocks.limited,
}));
vi.mock("@/lib/turnstile", () => ({ verifyTurnstile: mocks.verifyTurnstile }));

const ROOT = join(__dirname, "..", "..");

const validBody = (over: Record<string, unknown> = {}) => ({
  clientName: "Test Client",
  phone: "336-555-0100",
  email: "test.client@example.com",
  appointment: "Tuesday at 2:00 PM",
  planType: "Plan G",
  medications: "Testmedicine A 10 mg once a day\nTestmedicine B 5 mg at night",
  doctors: "Dr. Test Example, Sample Family Practice",
  pharmacy: "Sample Pharmacy on Test Street",
  questions: "Will my drug costs change next year?",
  consent_given: true,
  consent_text: INTAKE_CONSENT_TEXT,
  consent_version: INTAKE_CONSENT_VERSION,
  website: "",
  turnstile_token: "token",
  ...over,
});

const request = (body: unknown) =>
  new NextRequest("http://localhost/api/prep-intake", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

/** Loads the route after the environment is set, as a fresh module. */
async function loadRoute(env: Record<string, string>) {
  vi.resetModules();
  for (const [name, value] of Object.entries(env)) vi.stubEnv(name, value);
  return (await import("@/app/api/prep-intake/route")).POST;
}

const RESEND_ON = {
  RESEND_API_KEY: "test-resend-key",
  RESEND_FROM: "Test Sender <test@example.com>",
  LEAD_NOTIFY_EMAIL: "agent-inbox@example.com",
};
const RESEND_OFF = { RESEND_API_KEY: "", RESEND_FROM: "", LEAD_NOTIFY_EMAIL: "" };

let errorLog: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  mocks.verifyTurnstile.mockResolvedValue({ ok: true });
  mocks.limited.mockReturnValue(false);
  errorLog = vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  vi.clearAllMocks();
});

describe("prep intake: the email path", () => {
  it("sends one email to Christian through Resend, with the health details in it", async () => {
    const fetch = vi.fn().mockResolvedValue(Response.json({ id: "resend-1" }));
    vi.stubGlobal("fetch", fetch);
    const POST = await loadRoute(RESEND_ON);

    const response = await POST(request(validBody()));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: true });
    expect(fetch).toHaveBeenCalledOnce();
    expect(fetch.mock.calls[0][0]).toBe("https://api.resend.com/emails");

    const sent = JSON.parse(fetch.mock.calls[0][1].body);
    expect(sent.to).toEqual(["agent-inbox@example.com"]);
    expect(sent.from).toBe("Test Sender <test@example.com>");
    expect(sent.reply_to).toBe("test.client@example.com");
    expect(sent.subject).toBe("Appointment prep from Test Client");
    expect(sent.text).toContain("Testmedicine A 10 mg once a day");
    expect(sent.text).toContain("Dr. Test Example");
    expect(sent.text).toContain("Sample Pharmacy on Test Street");
    expect(sent.text).toContain("This email is the only copy.");
  });

  it("makes no request to any host except Resend", async () => {
    const fetch = vi.fn().mockResolvedValue(Response.json({ id: "resend-1" }));
    vi.stubGlobal("fetch", fetch);
    const POST = await loadRoute({
      ...RESEND_ON,
      // Storage is configured here on purpose. The route must still not use it.
      SUPABASE_URL: "https://example.supabase.co",
      SUPABASE_SERVICE_ROLE_KEY: "test-service-key",
      COMMAND_CENTER_INGEST_URL: "https://example.supabase.co/functions/v1/website-inquiry",
      COMMAND_CENTER_INGEST_KEY: "a".repeat(64),
      MAKE_WEBHOOK_URL: "https://hook.example.com/test",
    });

    await POST(request(validBody()));

    const hosts = fetch.mock.calls.map((call) => new URL(String(call[0])).host);
    expect(hosts).toEqual(["api.resend.com"]);
  });
});

describe("prep intake: when the email cannot go out", () => {
  it("reports a blocker and sends nothing when Resend is not configured", async () => {
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    const POST = await loadRoute(RESEND_OFF);

    const response = await POST(request(validBody()));
    const data = await response.json();

    expect(response.status).toBe(503);
    expect(data.code).toBe("email_unavailable");
    expect(data.error).toContain("were not sent");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("does not claim success when Resend rejects the email", async () => {
    const fetch = vi
      .fn()
      .mockResolvedValue(new Response('{"message":"domain not verified"}', { status: 403 }));
    vi.stubGlobal("fetch", fetch);
    const POST = await loadRoute(RESEND_ON);

    const response = await POST(request(validBody()));

    expect(response.status).toBe(503);
    expect((await response.json()).code).toBe("email_unavailable");
  });

  it("never writes the health details to the logs", async () => {
    const fetch = vi.fn().mockRejectedValue(new Error("network down"));
    vi.stubGlobal("fetch", fetch);
    const POST = await loadRoute(RESEND_ON);

    await POST(request(validBody()));

    const logged = JSON.stringify(errorLog.mock.calls);
    for (const secret of ["Testmedicine", "Dr. Test Example", "Sample Pharmacy", "Test Client"]) {
      expect(logged).not.toContain(secret);
    }
  });
});

describe("prep intake: checks before any email", () => {
  it("answers a filled honeypot as success and sends nothing", async () => {
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    const POST = await loadRoute(RESEND_ON);

    const response = await POST(request(validBody({ website: "http://spam.example" })));

    expect(response.status).toBe(200);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("stops when the form check fails", async () => {
    mocks.verifyTurnstile.mockResolvedValue({ ok: false, reason: "rejected" });
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    const POST = await loadRoute(RESEND_ON);

    expect((await POST(request(validBody()))).status).toBe(400);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("stops when consent is missing", async () => {
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    const POST = await loadRoute(RESEND_ON);

    const response = await POST(request(validBody({ consent_given: false })));

    expect(response.status).toBe(400);
    expect((await response.json()).field).toBe("consent");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("rejects a body that is too large, is not JSON, or comes too fast", async () => {
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    const POST = await loadRoute(RESEND_ON);

    expect((await POST(request("x".repeat(40000)))).status).toBe(413);
    expect((await POST(request("not json"))).status).toBe(400);
    expect((await POST(request([1, 2, 3]))).status).toBe(400);
    mocks.limited.mockReturnValue(true);
    expect((await POST(request(validBody()))).status).toBe(429);
    expect(fetch).not.toHaveBeenCalled();
  });
});

describe("prep intake: the route source", () => {
  const source = readFileSync(join(ROOT, "app/api/prep-intake/route.ts"), "utf8");
  const imports = (source.match(/^import [\s\S]*?;$/gm) ?? []).join("\n");

  it("imports no database, queue, or nurture module", () => {
    expect(imports).not.toMatch(/supabase|commandCenter|nurture|neon|leadEngine|metaCapi/i);
  });

  it("uses the existing Resend sender", () => {
    expect(imports).toContain('from "@/lib/notifyLead"');
    expect(source).toContain("sendStoredEmailSnapshot(");
  });

  it("logs fixed text only", () => {
    for (const call of source.match(/console\.\w+\([\s\S]*?\);/g) ?? []) {
      expect(call).not.toMatch(/\bbody\b|\bintake[.,)]|validated|delivery\.error|bodyText/);
    }
  });
});
