import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { edgeStub } from "./supabase-edge-stub";

/**
 * Contract tests for supabase/functions/website-inquiry/index.ts.
 *
 * The function runs on Deno against the T65 Daily Command Center. Here it runs
 * against a stub client (see supabase-edge-stub.ts) with a fake Deno global, so
 * what is under test is the boundary: who may call it, what it forwards to the
 * database, what it refuses before reaching the database, and what it returns.
 * No database is touched and no SQL is executed by this file.
 */

const KEY = "b".repeat(64);
const OUTBOX_ID = "7c9e6679-7425-40de-944b-e07fc1f90ae7";
const SECOND_ID = "1f0c4a52-25bd-4a63-9f1c-2a1b6f2c8d90";

let handle: (request: Request) => Promise<Response>;
let sent: ReturnType<typeof vi.fn>;

beforeAll(async () => {
  vi.stubGlobal("Deno", {
    env: {
      get: (name: string) =>
        (
          ({
            SUPABASE_URL: "https://test-project.supabase.co",
            SUPABASE_SERVICE_ROLE_KEY: "service-role-test-value",
          }) as Record<string, string>
        )[name],
    },
    serve: (fn: (request: Request) => Promise<Response>) => {
      handle = fn;
    },
  });
  // Any outbound request at all would mean the function is talking to something
  // other than its database. Every test asserts this stayed untouched.
  sent = vi.fn(async () => new Response(null, { status: 500 }));
  vi.stubGlobal("fetch", sent);
  await import("../../supabase/functions/website-inquiry/index.ts");
});

beforeEach(() => {
  edgeStub.reset();
  sent.mockClear();
});

afterEach(() => {
  expect(sent, "the edge function must not make outbound requests").not.toHaveBeenCalled();
});

function post(body: unknown, headers: Record<string, string> = { "x-website-key": KEY }) {
  return handle(
    new Request("https://test-project.supabase.co/functions/v1/website-inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
    }),
  );
}

function markBody(over: Record<string, unknown> = {}) {
  return { action: "mark_delivery", outbox_id: OUTBOX_ID, status: "sent", ...over };
}

describe("mark_delivery", () => {
  it("reports one delivery against its outbox id and nothing else", async () => {
    edgeStub.rpcResults.set("mark_website_delivery", {
      data: { marked: true, status: "sent", attempts: 1 },
      error: null,
    });
    const response = await post(markBody({ error: null, provider_id: "resend-abc123" }));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ marked: true, status: "sent" });
    expect(edgeStub.rpcCalls).toEqual([
      {
        name: "mark_website_delivery",
        args: {
          p_outbox_id: OUTBOX_ID,
          p_status: "sent",
          p_error: null,
          p_provider_id: "resend-abc123",
        },
      },
    ]);
  });

  it("carries a retryable failure and its provider text through, capped", async () => {
    edgeStub.rpcResults.set("mark_website_delivery", {
      data: { marked: true, status: "failed_retryable", attempts: 1 },
      error: null,
    });
    const response = await post(
      markBody({ status: "failed_retryable", error: "x".repeat(900), provider_id: null }),
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ marked: true, status: "failed_retryable" });
    const { args } = edgeStub.rpcCalls[0];
    expect(args.p_status).toBe("failed_retryable");
    expect(args.p_error).toBe("x".repeat(500));
    expect(args.p_provider_id).toBeNull();
  });

  it("answers 200 and marked: false for a row that is already sent", async () => {
    // Idempotency itself lives in mark_website_delivery. What matters here is
    // that its refusal is a normal answer, not an error the website retries.
    edgeStub.rpcResults.set("mark_website_delivery", {
      data: { marked: false, reason: "already_sent", status: "sent" },
      error: null,
    });
    const response = await post(markBody({ status: "failed_retryable", error: "timeout" }));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ marked: false, status: "sent" });
  });

  it("answers 200 and marked: false for an outbox id that no longer exists", async () => {
    edgeStub.rpcResults.set("mark_website_delivery", {
      data: { marked: false, reason: "unknown_outbox_id" },
      error: null,
    });
    const response = await post(markBody());

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ marked: false, status: null });
  });

  it.each([
    ["an unknown status", markBody({ status: "delivered" })],
    ["a missing status", markBody({ status: undefined })],
    ["a non-string status", markBody({ status: 1 })],
    ["pending, which only the queue may set", markBody({ status: "pending" })],
    ["a non-uuid outbox id", markBody({ outbox_id: "not-a-uuid" })],
    ["a 64-hex request key in place of an outbox id", markBody({ outbox_id: "a".repeat(64) })],
    ["a missing outbox id", markBody({ outbox_id: undefined })],
    ["an outbox id carrying SQL", markBody({ outbox_id: `${OUTBOX_ID}'; drop table x; --` })],
  ])("refuses %s before reaching the database", async (_label, body) => {
    const response = await post(body);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "Invalid delivery report" });
    expect(edgeStub.rpcCalls).toEqual([]);
  });

  it.each([
    ["no key", {}],
    ["a malformed key", { "x-website-key": "nope" }],
  ])("refuses a delivery report with %s", async (_label, headers) => {
    const response = await post(markBody(), headers);

    expect(response.status).toBe(401);
    expect(edgeStub.rpcCalls).toEqual([]);
  });

  it("refuses a delivery report whose key is not the active website key", async () => {
    edgeStub.key = { data: null, error: null };
    const response = await post(markBody());

    expect(response.status).toBe(401);
    expect(edgeStub.rpcCalls).toEqual([]);
  });

  it("never calls anything but mark_website_delivery", async () => {
    edgeStub.rpcResults.set("mark_website_delivery", {
      data: { marked: true, status: "sent" },
      error: null,
    });
    await post(markBody());

    // A mark records an outcome. If this list ever grows, a delivery report has
    // become able to cause a delivery.
    expect(edgeStub.rpcCalls.map((call) => call.name)).toEqual(["mark_website_delivery"]);
    expect(edgeStub.tables).toEqual(["website_ingress_keys"]);
  });

  it("maps an invalid-argument database error to 400 and an outage to 503", async () => {
    edgeStub.rpcResults.set("mark_website_delivery", { data: null, error: { code: "22023" } });
    expect((await post(markBody())).status).toBe(400);

    edgeStub.rpcResults.set("mark_website_delivery", { data: null, error: { code: "57P01" } });
    const outage = await post(markBody());
    expect(outage.status).toBe(503);
    // No provider detail or contact data in an error response.
    expect(await outage.json()).toEqual({ error: "Could not record delivery" });
  });
});

describe("capture", () => {
  function captured(data: unknown) {
    edgeStub.rpcResults.set("capture_website_inquiry", { data, error: null });
    return post({ action: "capture", request_key: "a".repeat(64), lead: { email: "a@b.invalid" } });
  }

  it("passes the outbox ids through to the website", async () => {
    const response = await captured({
      stored: true,
      duplicate: false,
      requires_review: false,
      outbox: { owner_alert: OUTBOX_ID, prospect_reply: SECOND_ID },
    });

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      stored: true,
      duplicate: false,
      requires_review: false,
      outbox: { owner_alert: OUTBOX_ID, prospect_reply: SECOND_ID },
    });
  });

  it("passes through an owner alert with no prospect reply when one is suppressed", async () => {
    const response = await captured({
      stored: true,
      duplicate: false,
      requires_review: true,
      outbox: { owner_alert: OUTBOX_ID },
    });

    const body = await response.json();
    expect(body.requires_review).toBe(true);
    expect(body.outbox).toEqual({ owner_alert: OUTBOX_ID });
  });

  it("withholds the outbox from a duplicate even if the database returned one", async () => {
    const response = await captured({
      stored: true,
      duplicate: true,
      requires_review: false,
      outbox: { owner_alert: OUTBOX_ID, prospect_reply: SECOND_ID },
    });

    const body = await response.json();
    expect(body).toEqual({ stored: true, duplicate: true, requires_review: false });
    expect(body).not.toHaveProperty("outbox");
  });

  it("answers exactly as before when the database has no outbox yet", async () => {
    const response = await captured({ stored: true, duplicate: false, requires_review: false });

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      stored: true,
      duplicate: false,
      requires_review: false,
    });
  });

  it("treats a non-object capture result as an outage rather than storage", async () => {
    const response = await captured(null);

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ error: "Could not save inquiry" });
  });
});

describe("dispatch", () => {
  it("still refuses an unknown action", async () => {
    const response = await post({ action: "mark" });

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "Invalid action" });
    expect(edgeStub.rpcCalls).toEqual([]);
  });

  it("still answers health and appointment", async () => {
    expect((await post({ action: "health" })).status).toBe(200);
    edgeStub.rpcResults.set("capture_website_appointment", { data: { stored: true }, error: null });
    expect((await post({ action: "appointment", appointment: {} })).status).toBe(200);
    expect(edgeStub.rpcCalls.map((call) => call.name)).toEqual(["capture_website_appointment"]);
  });
});
