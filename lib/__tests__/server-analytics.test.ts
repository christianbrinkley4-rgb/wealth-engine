import { afterEach, describe, expect, it, vi } from "vitest";

import { sendServerEvent, serverAnalyticsConfig, serverEventBody } from "@/lib/serverAnalytics";

afterEach(() => vi.unstubAllGlobals());

describe("server-side booking measurement", () => {
  it("stays off until both the property and the secret are set", () => {
    expect(serverAnalyticsConfig({})).toBeNull();
    expect(serverAnalyticsConfig({ NEXT_PUBLIC_GA4_ID: "G-ABC123" })).toBeNull();
    expect(serverAnalyticsConfig({ GA4_API_SECRET: "s" })).toBeNull();
    expect(serverAnalyticsConfig({ NEXT_PUBLIC_GA4_ID: "AW-1", GA4_API_SECRET: "s" })).toBeNull();
    expect(serverAnalyticsConfig({ NEXT_PUBLIC_GA4_ID: "G-ABC123", GA4_API_SECRET: "s" })).toEqual({
      measurementId: "G-ABC123",
      apiSecret: "s",
    });
  });

  it("sends the event name and the calendar topic, nothing about the person", () => {
    const body = serverEventBody("booking_confirmed", "medicare", "1.2");
    expect(body.events).toEqual([
      { name: "booking_confirmed", params: { topic: "medicare", engagement_time_msec: 1 } },
    ]);
    expect(Object.keys(body).sort()).toEqual(["client_id", "events", "non_personalized_ads"]);
    expect(Object.keys(body.events[0].params).sort()).toEqual(["engagement_time_msec", "topic"]);
    expect(JSON.stringify(body)).not.toMatch(/@|email|phone|full_name/i);
  });

  it("reduces an unexpected topic to 'unknown' instead of forwarding it", () => {
    const body = serverEventBody("booking_confirmed", "linda@example.com", "1.2");
    expect(body.events[0].params.topic).toBe("unknown");
  });

  it("does nothing, and makes no request, when switched off", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    await expect(sendServerEvent("booking_confirmed", "medicare", {})).resolves.toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("never throws when the measurement service fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("down")));
    await expect(
      sendServerEvent("booking_confirmed", "medicare", {
        NEXT_PUBLIC_GA4_ID: "G-ABC123",
        GA4_API_SECRET: "s",
      }),
    ).resolves.toBe(false);
  });
});
