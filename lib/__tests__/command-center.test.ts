import { afterEach, describe, expect, it, vi } from "vitest";
import { captureInCommandCenter, commandCenterConfig, markDelivery } from "@/lib/commandCenter";

const endpoint = "https://test-project.supabase.co/functions/v1/website-inquiry";
const key = "a".repeat(64);
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});
describe("command center connection", () => {
  it.each([
    "http://test-project.supabase.co/functions/v1/website-inquiry",
    "https://example.com/functions/v1/website-inquiry",
    endpoint + "?key=secret",
    "https://user:password@test-project.supabase.co/functions/v1/website-inquiry",
  ])("rejects unsafe endpoints", (url) => {
    expect(
      commandCenterConfig({ COMMAND_CENTER_INGEST_URL: url, COMMAND_CENTER_INGEST_KEY: key }),
    ).toBeNull();
  });
  it("fails if a provider returns success without confirming durable storage", async () => {
    vi.stubEnv("COMMAND_CENTER_INGEST_URL", endpoint);
    vi.stubEnv("COMMAND_CENTER_INGEST_KEY", key);
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json({ ok: true })));
    await expect(captureInCommandCenter({ email: "example@example.invalid" })).rejects.toThrow(
      "did not confirm",
    );
  });
  it("makes retry keys stable across consent timestamps, but changes them when answers change", async () => {
    vi.stubEnv("COMMAND_CENTER_INGEST_URL", endpoint);
    vi.stubEnv("COMMAND_CENTER_INGEST_KEY", key);
    const fetchMock = vi.fn().mockImplementation(async () => Response.json({ stored: true }));
    vi.stubGlobal("fetch", fetchMock);
    const row = {
      email: "example@example.invalid",
      source: "help_quiz",
      quiz_answers: { best_time: "Morning" },
    };
    await captureInCommandCenter({ ...row, consent_at: "time1" });
    await captureInCommandCenter({ ...row, consent_at: "time2" });
    await captureInCommandCenter({ ...row, quiz_answers: { best_time: "Evening" } });
    const keys = fetchMock.mock.calls.map((call) => JSON.parse(call[1].body).request_key);
    expect(keys[0]).toBe(keys[1]);
    expect(keys[0]).not.toBe(keys[2]);
    expect(keys[0]).toMatch(/^[a-f0-9]{64}$/);
  });
});

describe("delivery outbox", () => {
  function connected(fetchMock: ReturnType<typeof vi.fn>) {
    vi.stubEnv("COMMAND_CENTER_INGEST_URL", endpoint);
    vi.stubEnv("COMMAND_CENTER_INGEST_KEY", key);
    vi.stubGlobal("fetch", fetchMock);
  }

  it("returns the outbox ids the command center enqueued", async () => {
    connected(
      vi.fn().mockResolvedValue(
        Response.json({
          stored: true,
          outbox: { owner_alert: "a1", prospect_reply: "b2", meta_capi: "c3" },
        }),
      ),
    );
    const receipt = await captureInCommandCenter({ email: "example@example.invalid" });
    expect(receipt.outbox).toEqual({ owner_alert: "a1", prospect_reply: "b2", meta_capi: "c3" });
  });

  // The Edge Function predates the outbox; capture has to work unchanged without it.
  it.each([undefined, null, "not-an-object", [], { prospect_reply: 12 }, { unknown_job: "x" }])(
    "reports an empty outbox when the response carries no usable ids",
    async (outbox) => {
      connected(vi.fn().mockResolvedValue(Response.json({ stored: true, outbox })));
      const receipt = await captureInCommandCenter({ email: "example@example.invalid" });
      expect(receipt.stored).toBe(true);
      expect(receipt.outbox).toEqual({});
    },
  );

  it("ignores an id that does not look like an identifier", async () => {
    connected(
      vi
        .fn()
        .mockResolvedValue(
          Response.json({
            stored: true,
            outbox: { owner_alert: "../../admin", prospect_reply: "ok-1" },
          }),
        ),
    );
    const receipt = await captureInCommandCenter({ email: "example@example.invalid" });
    expect(receipt.outbox).toEqual({ prospect_reply: "ok-1" });
  });

  it("posts the outbox id as the idempotency key with the delivery outcome", async () => {
    const fetchMock = vi.fn().mockResolvedValue(Response.json({ ok: true }));
    connected(fetchMock);
    expect(await markDelivery("ob-1", "sent", { providerId: "resend-9" })).toBe(true);
    const [url, init] = fetchMock.mock.calls[0] as [
      string,
      { headers: Record<string, string>; body: string },
    ];
    expect(url).toBe(endpoint);
    expect(init.headers["x-website-key"]).toBe(key);
    expect(JSON.parse(init.body)).toMatchObject({
      action: "mark_delivery",
      outbox_id: "ob-1",
      status: "sent",
      provider_id: "resend-9",
    });
  });

  it("posts a message snapshot so a later retry can resend the same email", async () => {
    const fetchMock = vi.fn().mockResolvedValue(Response.json({ ok: true }));
    connected(fetchMock);
    await markDelivery("ob-1", "failed_retryable", {
      error: "HTTP 500",
      recipient: "visitor@example.invalid",
      subject: "Your questions",
      bodyText: "Hi there",
      replyTo: "agent@example.invalid",
    });
    expect(
      JSON.parse((fetchMock.mock.calls[0] as [string, { body: string }])[1].body),
    ).toMatchObject({
      body_text: "Hi there",
      recipient: "visitor@example.invalid",
      subject: "Your questions",
    });
  });

  it("records the failure text so the outcome is reviewable later", async () => {
    const fetchMock = vi.fn().mockResolvedValue(Response.json({ ok: true }));
    connected(fetchMock);
    await markDelivery("ob-1", "failed_retryable", { error: "HTTP 429 - retry-after 31" });
    expect(
      JSON.parse((fetchMock.mock.calls[0] as [string, { body: string }])[1].body),
    ).toMatchObject({
      status: "failed_retryable",
      error: "HTTP 429 - retry-after 31",
    });
  });

  /*
   * A mark that does not land leaves the row pending, which is the state a
   * retry worker looks for. Losing the visitor's submission over a bookkeeping
   * call would be the worse failure, so this never throws.
   */
  it.each([
    ["a rejected request", vi.fn().mockResolvedValue(new Response("nope", { status: 500 }))],
    ["an unreachable endpoint", vi.fn().mockRejectedValue(new TypeError("fetch failed"))],
  ])("reports %s without throwing", async (_label, fetchMock) => {
    connected(fetchMock as ReturnType<typeof vi.fn>);
    await expect(markDelivery("ob-1", "sent")).resolves.toBe(false);
  });

  it("does not call out at all when the command center is not configured", async () => {
    vi.stubEnv("COMMAND_CENTER_INGEST_URL", "");
    vi.stubEnv("COMMAND_CENTER_INGEST_KEY", "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    expect(await markDelivery("ob-1", "sent")).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("refuses an outbox id it did not recognise", async () => {
    const fetchMock = vi.fn();
    connected(fetchMock);
    expect(await markDelivery("../other-row", "sent")).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
