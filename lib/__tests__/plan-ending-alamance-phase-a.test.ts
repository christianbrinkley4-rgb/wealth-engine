import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Phase A guard for the Alamance County plan ending draft page.
 * This test reads the page source file, it does not render the page.
 * That limit is stated here on purpose: a source read is what this
 * harness supports for a new route without a full page render setup.
 * The banned name list below is test only. It is never rendered.
 */

const PAGE_PATH = join(
  process.cwd(),
  "app/medicare-plans-ending-2027/alamance-county/page.tsx",
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

describe("Alamance plan ending Phase A draft", () => {
  it("contains no plan name, carrier name, plan ID, or member count", () => {
    const source = readFileSync(PAGE_PATH, "utf8");
    for (const name of BANNED_NAMES) {
      expect(source).not.toContain(name);
    }
    expect(source).not.toMatch(/H\d{4}-\d{3}/);
    expect(source).not.toMatch(/\d,\d{3}/);
    expect(source).not.toContain("660");
    expect(source).not.toContain("657");
  });

  it("has a CTA with no free wording, plus the TPMO placeholder and booking link", () => {
    const source = readFileSync(PAGE_PATH, "utf8");
    const ctaStart = source.indexOf("function PlanCheckCta");
    const ctaEnd = source.indexOf("export default function", ctaStart);
    expect(ctaStart).toBeGreaterThan(-1);
    const cta = source.slice(ctaStart, ctaEnd);
    expect(cta.toLowerCase()).not.toContain("free");
    expect(cta).toContain("book a 45-minute phone plan check");
    expect(source).toContain(BOOKING_URL);
    expect(source).toContain(
      "[TPMO disclaimer held pending Christian answer on 65 vs 60, do not publish]",
    );
    expect(source.match(/<PlanCheckCta \/>/g)?.length).toBe(2);
  });

  it("is unpublished by construction and carries the required title, H1, and stamp", () => {
    const source = readFileSync(PAGE_PATH, "utf8");
    expect(source).toContain(
      "Alamance County Medicare Plans Ending in 2027 | Christian Brinkley",
    );
    expect(source).toContain("Is your Alamance County Medicare plan ending in 2027?");
    expect(source).toContain("Last checked 2026-10-26");
    expect(source).toContain("Plan year 2027");
    expect(source).toContain("robots: { index: false, follow: false }");
    const sitemap = readFileSync(join(process.cwd(), "app/sitemap.ts"), "utf8");
    expect(sitemap).not.toContain("medicare-plans-ending-2027/alamance-county");
  });

  it("uses the Phase A hook, not the brief count hook", () => {
    const source = readFileSync(PAGE_PATH, "utf8");
    expect(source).toContain(
      "If you got a letter saying your plan is ending, start here.",
    );
    expect(source).not.toContain("Nine Alamance Medicare Advantage plans are ending.");
  });
});
