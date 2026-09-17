import { createHmac } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "@/app/api/webhooks/cal/route";
import {
  CAL_MAX_BODY_BYTES,
  calWebhookConfig,
  parseCalAppointment,
  readCalBody,
  validCalSignature,
} from "@/lib/calWebhook";

const secret = "a-secure-dedicated-webhook-secret-for-tests";
const endpoint = "https://test-project.supabase.co/functions/v1/website-inquiry";
const config = {
  secret,
  organizerEmail: "host@example.invalid",
  eventTypes: { "123": "medicare" as const },
};
function event(overrides: Record<string, unknown> = {}) {
  return {
    triggerEvent: "BOOKING_CREATED",
    createdAt: "2026-09-01T14:00:00Z",
    payload: {
      uid: "booking_uid_123",
      eventTypeId: 123,
      organizer: { email: "host@example.invalid" },
      startTime: "2026-09-11T14:00:00Z",
      endTime: "2026-09-11T14:30:00Z",
      status: "ACCEPTED",
      attendees: [
        {
          name: "Example Visitor",
          email: "visitor@example.invalid",
          phoneNumber: "+1 (336) 555-0100",
        },
      ],
      ...overrides,
    },
  };
}
function signedRequest(body: string, signature?: string) {
  return new Request("https://example.invalid/api/webhooks/cal", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-cal-signature-256": signature ?? createHmac("sha256", secret).update(body).digest("hex"),
    },
    body,
  });
}

beforeEach(() => {
  vi.stubEnv("CALCOM_WEBHOOK_SECRET", secret);
  vi.stubEnv("CALCOM_ORGANIZER_EMAIL", config.organizerEmail);
  vi.stubEnv("CALCOM_EVENT_TYPES", JSON.stringify(config.eventTypes));
  vi.stubEnv("COMMAND_CENTER_INGEST_URL", endpoint);
  vi.stubEnv("COMMAND_CENTER_INGEST_KEY", "a".repeat(64));
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("calendar authentication and configuration", () => {
  it("does not enable an unscoped calendar webhook", () => {
    expect(calWebhookConfig({ CALCOM_WEBHOOK_SECRET: secret })).toBeNull();
    expect(
      calWebhookConfig({ ...process.env, CALCOM_EVENT_TYPES: '{"__proto__":"medicare"}' }),
    ).toBeNull();
    expect(
      calWebhookConfig({ ...process.env, CALCOM_EVENT_TYPES: '{"123":"unlicensed_service"}' }),
    ).toBeNull();
    expect(calWebhookConfig({ ...process.env, CALCOM_WEBHOOK_SECRET: "short" })).toBeNull();
  });
  it("validates the exact bytes, including whitespace and UTF-8", () => {
    const raw = new TextEncoder().encode('{ "name": "José" }');
    const signature = createHmac("sha256", secret).update(raw).digest("hex");
    expect(validCalSignature(raw, signature, secret)).toBe(true);
    expect(validCalSignature(new TextEncoder().encode('{"name":"José"}'), signature, secret)).toBe(
      false,
    );
    expect(validCalSignature(raw, "x".repeat(64), secret)).toBe(false);
    expect(validCalSignature(raw, null, secret)).toBe(false);
  });
  it("rejects a forged signature without contacting storage", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const response = await POST(signedRequest(JSON.stringify(event()), "0".repeat(64)));
    expect(response.status).toBe(401);
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it("bounds chunked data even without Content-Length", async () => {
    const request = new Request("https://example.invalid", {
      method: "POST",
      body: new ReadableStream({
        start(controller) {
          controller.enqueue(new Uint8Array(CAL_MAX_BODY_BYTES));
          controller.enqueue(new Uint8Array(1));
          controller.close();
        },
      }),
      duplex: "half",
    } as RequestInit);
    await expect(readCalBody(request)).rejects.toMatchObject({ status: 413 });
  });
  it("rejects an oversized declared body before reading", async () => {
    const request = new Request("https://example.invalid", {
      method: "POST",
      headers: { "content-length": String(CAL_MAX_BODY_BYTES + 1) },
      body: "{}",
    });
    await expect(readCalBody(request)).rejects.toMatchObject({ status: 413 });
  });
});

describe("calendar event normalization", () => {
  it("keeps only the booker's necessary details and a trusted service", () => {
    const payload = event({
      metadata: { topic: "life_insurance", videoCallUrl: "https://private.invalid/secret" },
      additionalNotes: "PRIVATE HEALTH NOTES",
      attendees: [
        {
          name: "Example Visitor",
          email: "VISITOR@example.invalid",
          phoneNumber: "+1 336 555 0100",
        },
        { name: "Family Member", email: "family@example.invalid" },
      ],
    });
    const result = parseCalAppointment(payload, config)!;
    expect(result).toMatchObject({
      email: "visitor@example.invalid",
      phone: "3365550100",
      topic: "medicare",
      status: "confirmed",
    });
    expect(JSON.stringify(result)).not.toMatch(/HEALTH|family@|private\.invalid|consent|attended/);
  });
  it.each([{ organizer: { email: "another@example.invalid" } }, { eventTypeId: 124 }])(
    "rejects unrelated organizers or event types",
    (overrides) => {
      expect(() => parseCalAppointment(event(overrides), config)).toThrow();
    },
  );
  it.each([
    { status: "PENDING" },
    { uid: "" },
    { rescheduleUid: "booking_uid_123" },
    { startTime: "not-a-date" },
    { endTime: "2026-09-10T14:00:00Z" },
    { attendees: [] },
    { attendees: [{ name: "Guest", email: "invalid" }] },
    { responses: { email: { value: "other@example.invalid" } } },
  ])("rejects malformed or inconsistent booking data", (overrides) => {
    expect(() => parseCalAppointment(event(overrides), config)).toThrow();
  });
  it("requires a different previous UID for a reschedule", () => {
    const payload = { ...event(), triggerEvent: "BOOKING_RESCHEDULED" };
    expect(() => parseCalAppointment(payload, config)).toThrow();
    expect(
      parseCalAppointment(
        { ...payload, payload: { ...payload.payload, rescheduleUid: "previous_booking" } },
        config,
      ),
    ).toMatchObject({ previous_uid: "previous_booking", status: "confirmed" });
  });
  it.each([
    ["BOOKING_REQUESTED", "PENDING", "requested"],
    ["BOOKING_CANCELLED", "CANCELLED", "cancelled"],
    ["BOOKING_REJECTED", "REJECTED", "rejected"],
  ])("preserves %s state instead of calling it attended", (triggerEvent, status, expected) => {
    expect(parseCalAppointment({ ...event({ status }), triggerEvent }, config)?.status).toBe(
      expected,
    );
  });
  it("never interprets scheduled meeting end as attendance", () => {
    expect(
      parseCalAppointment({ triggerEvent: "MEETING_ENDED", ...event().payload }, config),
    ).toBeNull();
  });
  it("deduplicates semantic retries despite changes to irrelevant payload fields", () => {
    const first = parseCalAppointment(event(), config)!;
    const replay = parseCalAppointment(
      event({ description: "Changed title", metadata: { retry: true } }),
      config,
    )!;
    const changed = parseCalAppointment(event({ startTime: "2026-09-11T14:10:00Z" }), config)!;
    expect(first.event_key).toBe(replay.event_key);
    expect(first.event_key).not.toBe(changed.event_key);
  });
});

describe("calendar delivery receipts", () => {
  it("acknowledges only a confirmed durable receipt", async () => {
    const fetchMock = vi.fn().mockResolvedValue(Response.json({ stored: true, duplicate: false }));
    vi.stubGlobal("fetch", fetchMock);
    const response = await POST(signedRequest(JSON.stringify(event())));
    expect(response.status).toBe(200);
    expect(fetchMock.mock.calls[0][0]).toBe(endpoint);
    const sent = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(sent.action).toBe("appointment");
    expect(sent.appointment.status).toBe("confirmed");
  });
  it.each(["network", "rejected", "unconfirmed"])(
    "returns retryable failure for %s storage",
    async (failure) => {
      vi.stubGlobal(
        "fetch",
        failure === "network"
          ? vi.fn().mockRejectedValue(new Error("provider private detail"))
          : vi
              .fn()
              .mockResolvedValue(
                Response.json({ ok: true }, { status: failure === "rejected" ? 503 : 200 }),
              ),
      );
      const response = await POST(signedRequest(JSON.stringify(event())));
      expect(response.status).toBe(503);
      expect(response.headers.get("retry-after")).toBe("60");
      expect(await response.text()).not.toContain("private detail");
    },
  );
  it("accepts an already stored replay", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(Response.json({ stored: true, duplicate: true })),
    );
    expect((await POST(signedRequest(JSON.stringify(event())))).status).toBe(200);
  });
  it("ignores unsupported signed events without writing a fake outcome", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    expect(
      (await POST(signedRequest(JSON.stringify({ triggerEvent: "MEETING_ENDED" })))).status,
    ).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it("fails closed when required configuration is missing", async () => {
    vi.stubEnv("CALCOM_EVENT_TYPES", "");
    expect((await POST(signedRequest(JSON.stringify(event())))).status).toBe(503);
  });
});
