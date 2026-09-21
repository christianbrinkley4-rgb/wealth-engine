import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  REFERRAL_CHECKIN_SEQUENCE_KEY,
  buildSendPlan,
  defaultEmailContext,
  getSequence,
  listSequenceKeys,
  renderStep,
} from "@/lib/nurture";

const ctx = defaultEmailContext({
  fullName: "Mary Johnson",
  unsubscribeToken: "b".repeat(48),
  topic: "medicare",
});

describe("referral check-in sequence", () => {
  it("is registered as a nurture sequence", () => {
    expect(listSequenceKeys()).toContain(REFERRAL_CHECKIN_SEQUENCE_KEY);
  });

  it("has a single 30-day service check-in step", () => {
    const seq = getSequence(REFERRAL_CHECKIN_SEQUENCE_KEY)!;
    expect(seq.steps.map((s) => s.key)).toEqual(["referral-30day"]);
    expect(seq.steps[0].dayOffset).toBe(30);
    expect(seq.steps[0].subject).toBe("How's the new plan treating you?");
  });

  it("queues the check-in 30 days after the coverage effective date", () => {
    const plan = buildSendPlan(REFERRAL_CHECKIN_SEQUENCE_KEY, new Date("2026-11-01T12:00:00Z"));
    expect(plan).toHaveLength(1);
    expect(plan[0].sendAfter).toBe("2026-12-01");
  });

  it("renders service-first copy with a conditional referral ask, never Yelp", () => {
    const seq = getSequence(REFERRAL_CHECKIN_SEQUENCE_KEY)!;
    const rendered = renderStep(seq.steps[0], ctx);
    expect(rendered.text).toContain("Hi Mary");
    expect(rendered.text).toContain("(336) 365-7422");
    expect(rendered.text).toMatch(/billing surprises|pharmacy hiccups/);
    expect(rendered.text).not.toMatch(/Yelp/i);
    expect(rendered.text).not.toMatch(/\{(greeting|firstName|booking|review|unsubscribe|site|phone)\}/);
  });
});

/* ---------------------------------------------------------------------------
 * enrollment-logged route — staged referral engine trigger.
 * ------------------------------------------------------------------------- */

const mocks = vi.hoisted(() => ({
  enrollLead: vi.fn(),
  newUnsubscribeToken: vi.fn(() => "t".repeat(48)),
  notifyEnrollmentLogged: vi.fn(),
  hasSupabaseAdminConfig: vi.fn(() => true),
  getSupabaseAdmin: vi.fn(() => ({})),
}));

vi.mock("@/lib/nurtureStore", () => ({
  enrollLead: mocks.enrollLead,
  newUnsubscribeToken: mocks.newUnsubscribeToken,
}));
vi.mock("@/lib/notifyLead", () => ({
  notifyEnrollmentLogged: mocks.notifyEnrollmentLogged,
}));
vi.mock("@/lib/supabase", () => ({
  hasSupabaseAdminConfig: mocks.hasSupabaseAdminConfig,
  getSupabaseAdmin: mocks.getSupabaseAdmin,
}));

async function loadRoute(secret: string | undefined) {
  vi.resetModules();
  if (secret === undefined) delete process.env.ENROLLMENT_WEBHOOK_SECRET;
  else process.env.ENROLLMENT_WEBHOOK_SECRET = secret;
  return import("@/app/api/enrollment-logged/route");
}

function postRequest(body: unknown, token = "test-secret") {
  return new Request("https://example.com/api/enrollment-logged", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
}

const validBody = {
  email: "mary@example.com",
  full_name: "Mary Johnson",
  effective_date: "2026-11-01",
  phone: "(336) 555-0100",
};

describe("POST /api/enrollment-logged", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.hasSupabaseAdminConfig.mockReturnValue(true);
    mocks.enrollLead.mockResolvedValue("enrollment-1");
    mocks.notifyEnrollmentLogged.mockResolvedValue({ ok: true, retryable: false });
  });

  it("returns 503 when the webhook secret is not configured", async () => {
    const { POST } = await loadRoute(undefined);
    const res = await POST(postRequest(validBody));
    expect(res.status).toBe(503);
  });

  it("rejects a bad Bearer <redacted>", async () => {
    const { POST } = await loadRoute("test-secret");
    const res = await POST(postRequest(validBody, "wrong"));
    expect(res.status).toBe(401);
  });

  it("rejects invalid bodies", async () => {
    const { POST } = await loadRoute("test-secret");
    for (const body of [
      { ...validBody, email: "not-an-email" },
      { ...validBody, full_name: "  " },
      { ...validBody, effective_date: "11/01/2026" },
      { ...validBody, effective_date: "2026-13-45" },
      {},
    ]) {
      const res = await POST(postRequest(body));
      expect(res.status).toBe(400);
    }
  });

  it("enrolls the 30-day check-in anchored to the effective date and alerts Christian", async () => {
    const { POST } = await loadRoute("test-secret");
    const res = await POST(postRequest(validBody));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ received: true, enrolled: true, notified: true });

    expect(mocks.enrollLead).toHaveBeenCalledTimes(1);
    const [, contact, sequenceKey, startDate] = mocks.enrollLead.mock.calls[0];
    expect(sequenceKey).toBe(REFERRAL_CHECKIN_SEQUENCE_KEY);
    expect(contact.email).toBe("mary@example.com");
    expect(contact.fullName).toBe("Mary Johnson");
    expect((startDate as Date).toISOString().slice(0, 10)).toBe("2026-11-01");

    expect(mocks.notifyEnrollmentLogged).toHaveBeenCalledWith({
      fullName: "Mary Johnson",
      email: "mary@example.com",
      phone: "(336) 555-0100",
      effectiveDate: "2026-11-01",
    });
  });

  it("still alerts Christian when the queue is unavailable", async () => {
    mocks.hasSupabaseAdminConfig.mockReturnValue(false);
    const { POST } = await loadRoute("test-secret");
    const res = await POST(postRequest(validBody));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ received: true, enrolled: false, notified: true });
    expect(mocks.enrollLead).not.toHaveBeenCalled();
  });
});
