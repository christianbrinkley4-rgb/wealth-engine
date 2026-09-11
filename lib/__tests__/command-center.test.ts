import { afterEach, describe, expect, it, vi } from "vitest";
import { captureInCommandCenter, commandCenterConfig } from "@/lib/commandCenter";

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
