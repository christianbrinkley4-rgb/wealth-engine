import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

beforeEach(() => {
  vi.resetModules();
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://christianbrinkleync.com");
  vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", "test-pixel");
  vi.stubEnv("META_CAPI_ACCESS_TOKEN", "test-token");
  vi.stubEnv("NEXT_PUBLIC_META_ADS_ALLOWED", "true");
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("advertising event data limits", () => {
  it("strips all query and fragment data from a neutral form page", async () => {
    const { metaSourceUrl } = await import("@/lib/metaCapi");
    expect(
      metaSourceUrl(
        "https://christianbrinkleync.com/start?topic=medicare&email=private@example.com#care",
      ),
    ).toBe("https://christianbrinkleync.com/start");
  });

  it.each([
    "https://other.example/start",
    "https://christianbrinkleync.com/critical-illness-insurance",
    "https://visitor:password@christianbrinkleync.com/start",
    "not a url",
  ])("does not use untrusted or service-specific URLs: %s", async (url) => {
    const { metaSourceUrl } = await import("@/lib/metaCapi");
    expect(metaSourceUrl(url)).toBeNull();
  });

  it("sends no category or raw query data and does not treat hashes as anonymous", async () => {
    const fetch = vi.fn().mockResolvedValue(Response.json({ events_received: 1 }));
    vi.stubGlobal("fetch", fetch);
    const { sendMetaLeadEvent } = await import("@/lib/metaCapi");
    await sendMetaLeadEvent({
      eventId: "test-event",
      email: "private@example.com",
      sourceUrl: "https://christianbrinkleync.com/start?topic=medicare&income=100000",
      userAgent: "test-browser",
    });
    expect(fetch).toHaveBeenCalledOnce();
    const serialized = fetch.mock.calls[0][1].body;
    const event = JSON.parse(serialized).data[0];
    expect(event.event_source_url).toBe("https://christianbrinkleync.com/start");
    expect(event).not.toHaveProperty("custom_data");
    expect(event.user_data.em[0]).toMatch(/^[a-f0-9]{64}$/);
    expect(serialized).not.toMatch(/medicare|income|100000|private@example/);
  });

  it("does not send an event if a real safe source URL is unavailable", async () => {
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    const { sendMetaLeadEvent } = await import("@/lib/metaCapi");
    await sendMetaLeadEvent({ eventId: "test", email: "private@example.com" });
    expect(fetch).not.toHaveBeenCalled();
  });

  it("stays dormant when tracking credentials are absent", async () => {
    vi.stubEnv("META_CAPI_ACCESS_TOKEN", "");
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    const { sendMetaLeadEvent } = await import("@/lib/metaCapi");
    await sendMetaLeadEvent({
      eventId: "test",
      email: "private@example.com",
      sourceUrl: "https://christianbrinkleync.com/start",
    });
    expect(fetch).not.toHaveBeenCalled();
  });

  it("stays dormant until paid measurement is explicitly allowed", async () => {
    vi.stubEnv("NEXT_PUBLIC_META_ADS_ALLOWED", "");
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    const { sendMetaLeadEvent } = await import("@/lib/metaCapi");
    await sendMetaLeadEvent({
      eventId: "test",
      email: "private@example.com",
      sourceUrl: "https://christianbrinkleync.com/start",
    });
    expect(fetch).not.toHaveBeenCalled();
  });
});
