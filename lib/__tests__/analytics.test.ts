import { describe, expect, it } from "vitest";

import {
  conversionTarget,
  eventParams,
  isMeasuredEvent,
  MEASURED_EVENTS,
  measurementProviders,
  safePagePath,
} from "@/lib/analytics";

describe("what may be measured", () => {
  it("reports only the four declared events", () => {
    expect(Object.keys(MEASURED_EVENTS).sort()).toEqual([
      "generate_lead",
      "phone_click",
      "timeline_complete",
      "timeline_email_request",
    ]);
  });

  it("refuses an event nobody declared", () => {
    for (const name of [
      "",
      "irmaa_bracket",
      "zip_code",
      "quiz_answer",
      "__proto__",
      "constructor",
    ]) {
      expect(isMeasuredEvent(name), `${name} must not be measurable`).toBe(false);
    }
    expect(isMeasuredEvent("phone_click")).toBe(true);
  });
});

describe("what an event may say about a visit", () => {
  it("sends the page path and nothing else", () => {
    expect(eventParams("/turning-65")).toEqual({ page_path: "/turning-65" });
    expect(Object.keys(eventParams("/"))).toEqual(["page_path"]);
  });

  it("drops anything a link carried in the query or the fragment", () => {
    // A careless link, a mail merge, or a pasted URL can put a person in a
    // query string. None of it reaches an ad platform from here.
    expect(safePagePath("/thank-you?email=linda@example.com&topic=medicare")).toBe("/thank-you");
    expect(safePagePath("/start?utm_campaign=triad_t65#zip=27401")).toBe("/start");
    expect(safePagePath("/medicare#results")).toBe("/medicare");
  });

  it("never reports something that is not a path on this site", () => {
    expect(safePagePath("https://example.com/steal")).toBe("/");
    expect(safePagePath("")).toBe("/");
    expect(safePagePath("javascript:alert(1)")).toBe("/");
    expect(safePagePath(`/${"a".repeat(400)}`)).toHaveLength(120);
  });
});

describe("Google Ads conversions", () => {
  it("builds a target from the account and the action label", () => {
    expect(conversionTarget("AW-123456789", "AbC-D_efGh")).toBe("AW-123456789/AbC-D_efGh");
  });

  it("reports nothing until both are configured", () => {
    expect(conversionTarget(undefined, "AbC")).toBeNull();
    expect(conversionTarget("AW-123456789", undefined)).toBeNull();
    expect(conversionTarget("AW-123456789", "   ")).toBeNull();
    expect(conversionTarget("", "")).toBeNull();
  });

  it("rejects an id that is not a Google Ads account", () => {
    // A GA4 property id in the ads slot would send conversions nowhere and
    // look like a working setup, which is worse than an obvious blank.
    expect(conversionTarget("G-ABC123", "AbC")).toBeNull();
    expect(conversionTarget("AW-123/../evil", "AbC")).toBeNull();
  });
});

describe("the privacy notice follows the settings", () => {
  it("names nothing while measurement is off", () => {
    expect(measurementProviders({})).toEqual([]);
    expect(measurementProviders({ NEXT_PUBLIC_GA4_ID: "   " })).toEqual([]);
  });

  it("names each provider that is switched on", () => {
    expect(
      measurementProviders({
        NEXT_PUBLIC_GA4_ID: "G-ABC123",
        NEXT_PUBLIC_GOOGLE_ADS_ID: "AW-123456789",
      }),
    ).toEqual(["Google Analytics", "Google Ads conversion tracking"]);
  });

  it("does not name Meta while its data-sharing permission is unconfirmed", () => {
    expect(measurementProviders({ NEXT_PUBLIC_META_PIXEL_ID: "123" })).toEqual([]);
    expect(
      measurementProviders({
        NEXT_PUBLIC_META_PIXEL_ID: "123",
        NEXT_PUBLIC_META_ADS_ALLOWED: "true",
      }),
    ).toEqual(["Meta Pixel"]);
  });
});
