import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Phase A guard for the Medicare plan ending hub draft page.
 * This test reads the page source file, it does not render the page.
 * That limit is stated here on purpose: a source read is what this
 * harness supports for a new route without a full page render setup.
 * The banned name list below is test only. It is never rendered.
 */

const PAGE_PATH = join(
  process.cwd(),
  "app/medicare-plans-ending-2027/page.tsx",
);

const BANNED_NAMES = [
  "HealthTeam",
  "Blue Medicare",
  "HealthSpring",
  "Humana",
  "Aetna",
  "Wellcare",
  "AARP",
  "Provider Partners",
  "Alignment Health",
  "UnitedHealthcare",
  "Blue Cross",
  "UHC Dual",
  "Experience Health",
  "Essential Plus",
  "Carolina Complete",
  "Dual Complete",
  "Dual Access",
  "Blue Medicare Essential",
];

const BOOKING_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3o4z5ujB5EOQfw_2jXZkdwBwskeVEb8VdziguWf5GQy9-5J0UgTxjbnXe0F_856Iti_noWHjdZ";

describe("Plan ending hub Phase A draft", () => {
  it("contains no plan name, carrier name, plan ID, or member count", () => {
    const source = readFileSync(PAGE_PATH, "utf8");
    for (const name of BANNED_NAMES) {
      expect(source).not.toContain(name);
    }
    expect(source).not.toMatch(/H\d{4}-\d{3}/);
    expect(source).not.toMatch(/\d,\d{3}/);
  });

  it("states no county ending or replaced count as a verified fact", () => {
    const source = readFileSync(PAGE_PATH, "utf8");
    expect(source).not.toContain("11 plans");
    expect(source).not.toContain("9 plans");
    expect(source).not.toContain("3 plans");
    expect(source).not.toContain("4 plans");
    expect(source).not.toContain("ending 11");
    expect(source).not.toContain("ending 9");
    expect(source).not.toContain("ending 3");
  });

  it("has a CTA with no free wording, plus the confirmed TPMO 65 disclaimer and booking link", () => {
    const source = readFileSync(PAGE_PATH, "utf8");
    const ctaStart = source.indexOf("function PlanCheckCta");
    const ctaEnd = source.indexOf("export default function", ctaStart);
    expect(ctaStart).toBeGreaterThan(-1);
    const cta = source.slice(ctaStart, ctaEnd);
    expect(cta.toLowerCase()).not.toContain("free");
    expect(cta).toContain("book a 45-minute phone plan check");
    expect(source).toContain(BOOKING_URL);
    expect(source).toContain(
      "Currently we represent 8 organizations which offer 65 products in your area",
    );
    expect(source).not.toContain("TPMO disclaimer held");
    expect(source).not.toContain("60 products");
    expect(source.match(/<PlanCheckCta \/>/g)?.length).toBe(2);
  });

  it("is published and carries the required title, H1, and stamp", () => {
    const source = readFileSync(PAGE_PATH, "utf8");
    expect(source).toContain(
      "Medicare Plans Ending in 2027 | Christian Brinkley",
    );
    expect(source).toContain("Is your Medicare plan ending in 2027?");
    expect(source).toContain("Last checked 2026-10-26");
    expect(source).toContain("Plan year 2027");
    expect(source).toContain("robots: { index: true, follow: true }");
    const sitemap = readFileSync(join(process.cwd(), "app/sitemap.ts"), "utf8");
    expect(sitemap).toContain("medicare-plans-ending-2027");
  });

  it("links to all three county plan ending routes", () => {
    const source = readFileSync(PAGE_PATH, "utf8");
    expect(source).toContain("Guilford County");
    expect(source).toContain("Alamance County");
    expect(source).toContain("Granville County");
    expect(source).toContain("medicare-plans-ending-2027/guilford-county");
    expect(source).toContain("medicare-plans-ending-2027/alamance-county");
    expect(source).toContain("medicare-plans-ending-2027/granville-county");
  });
});
