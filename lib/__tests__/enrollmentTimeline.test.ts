import { describe, expect, it } from "vitest";
import { enrollmentTimeline, timelineCalendar } from "@/lib/enrollmentTimeline";
import { normalizeUsPhone } from "@/lib/contact";
import { campaignPath } from "@/lib/campaigns";
import { schedulingUrl } from "@/lib/scheduling";

const today = new Date("2026-09-09T16:00:00Z");
const date = (value: Date) => value.toISOString().slice(0, 10);

describe("Medicare timeline", () => {
  it("calculates a seven-month window across the new year", () => {
    const result = enrollmentTimeline({ month: 2, year: 2027, birthdayOnFirst: false }, today);
    expect(date(result.opensOn)).toBe("2026-11-01");
    expect(date(result.signUpBy)).toBe("2027-01-31");
    expect(date(result.coverageStarts)).toBe("2027-02-01");
    expect(date(result.closesOn)).toBe("2027-05-31");
  });
  it("shifts January 1 birthdays into the previous year", () => {
    const result = enrollmentTimeline({ month: 1, year: 2027, birthdayOnFirst: true }, today);
    expect(date(result.opensOn)).toBe("2026-09-01");
    expect(date(result.signUpBy)).toBe("2026-11-30");
    expect(date(result.coverageStarts)).toBe("2026-12-01");
    expect(date(result.closesOn)).toBe("2027-03-31");
  });
  it("includes leap day and the entire final day", () => {
    const input = { month: 11, year: 2027, birthdayOnFirst: false };
    const result = enrollmentTimeline(input, new Date("2028-02-29T23:59:59Z"));
    expect(date(result.closesOn)).toBe("2028-02-29");
    expect(result.status).toBe("open");
    expect(enrollmentTimeline(input, new Date(2028, 1, 29, 23, 59, 59)).status).toBe("open");
    expect(enrollmentTimeline(input, new Date(2028, 2, 1, 0, 0, 0)).status).toBe("closed");
  });
  it("creates timezone-independent all-day calendar events", () => {
    const file = timelineCalendar({ month: 2, year: 2027, birthdayOnFirst: false }, today);
    expect(file.match(/BEGIN:VEVENT/g)).toHaveLength(3);
    expect(file).toContain("DTSTART;VALUE=DATE:20261101\r\nDTEND;VALUE=DATE:20261102");
    expect(file).toContain("DTSTAMP:20260909T160000Z");
    expect(file).not.toContain("1962");
  });
  it.each([0, 13, 1.5, NaN])("rejects invalid month %s", (month) => {
    expect(() =>
      enrollmentTimeline({ month, year: 2027, birthdayOnFirst: false }, today),
    ).toThrow();
  });
});

describe("contact and booking", () => {
  it.each(["+1 (919) 408-6671", "1-919-408-6671", "9194086671"])(
    "preserves all ten local phone digits for %s",
    (value) => {
      expect(normalizeUsPhone(value)).toBe("9194086671");
    },
  );
  it.each(["919408", "+44 2079460123", "919408667112", "9194086671 ext 5", {}, 9194086671])(
    "rejects a number that would need truncation or coercion",
    (value) => {
      expect(normalizeUsPhone(value)).toBeNull();
    },
  );
  it("allows email-only inquiries", () => {
    expect(normalizeUsPhone(" ")).toBe("");
  });
  it.each([
    undefined,
    "javascript:alert(1)",
    "http://cal.com/test",
    "https://localhost/test",
    "https://user:password@cal.com/test",
    "https://example.com/test",
  ])("does not present an invalid calendar as configured", (value) => {
    expect(schedulingUrl(value)).toBeNull();
  });
  it("accepts a public HTTPS calendar", () => {
    expect(schedulingUrl("https://cal.com/christian/intro")).toBe(
      "https://cal.com/christian/intro",
    );
  });
});

describe("reusable campaign links", () => {
  it("tags a mailer without forwarding contact details or redirect targets", () => {
    const path = campaignPath(
      "mail",
      new URLSearchParams(
        "utm_campaign=2026_10&email=person@example.com&redirect=https://evil.example",
      ),
    );
    expect(path).toBe("/turning-65?utm_source=direct_mail&utm_medium=qr&utm_campaign=2026_10");
  });
  it("rejects unknown and prototype channels", () => {
    expect(campaignPath("unknown", new URLSearchParams())).toBeNull();
    expect(campaignPath("toString", new URLSearchParams())).toBeNull();
  });
  it.each([
    ["turning_65", "/lp/turning-65"],
    ["aep", "/lp/annual-enrollment"],
    ["life_insurance", "/lp/life-insurance"],
    ["retirement", "/lp/retirement-income"],
  ])(
    "sends %s ads to the matching landing page and keeps the creative label",
    (audience, expected) => {
      const path = campaignPath(
        "facebook",
        new URLSearchParams({ audience, utm_campaign: "pilot_01", utm_content: "headline_b" }),
      );
      const url = new URL(path!, "https://example.com");
      expect(url.pathname).toBe(expected);
      expect(url.searchParams.get("utm_campaign")).toBe("pilot_01");
      expect(url.searchParams.get("utm_content")).toBe("headline_b");
      expect(url.searchParams.get("utm_source")).toBe("facebook");
    },
  );
  it("keeps AEP mail links educational and defaults paid traffic to the turning-65 pilot", () => {
    expect(campaignPath("mail", new URLSearchParams("audience=aep"))).toMatch(
      /^\/annual-enrollment\?/,
    );
    expect(campaignPath("nextdoor", new URLSearchParams())).toMatch(/^\/lp\/turning-65\?/);
  });
  it.each(["unknown", "constructor", "__proto__", "https://evil.example"])(
    "rejects invalid audience %s",
    (audience) => {
      expect(campaignPath("facebook", new URLSearchParams({ audience }))).toBeNull();
    },
  );
});
