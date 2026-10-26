import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Phase A guard for the Granville County plan ending draft page.
 * This test reads the page source file, it does not render the page.
 * That limit is stated here on purpose: a source read is what this
 * harness supports for a new route without a full page render setup.
 * The banned name list below is test only. It is never rendered.
 */

const PAGE_PATH = join(
  process.cwd(),
  "app/medicare-plans-ending-2027/granville-county/page.tsx",
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
  "UHC",
  "Experience Health",
  "Essential Plus",
  "Carolina Complete",
  "Dual Complete",
  "Dual Access",
  "Giveback Open",
  "Signature Care",
];

const BOOKING_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3o4z5ujB5EOQfw_2jXZkdwBwskeVEb8VdziguWf5GQy9-5J0UgTxjbnXe0F_856Iti_noWHjdZ";

describe("Granville plan ending Phase A draft", () => {
  it("contains no plan name, carrier name, plan ID, or member count", () => {
    const source = readFileSync(PAGE_PATH, "utf8");
    for (const name of BANNED_NAMES) {
      expect(source).not.toContain(name);
    }
    expect(source).not.toMatch(/H\d{4}-\d{3}/);
    expect(source).not.toMatch(/\d,\d{3}/);
  });

  it("has a CTA with no free wording, plus the confirmed TPMO disclaimer and booking link", () => {
    const source = readFileSync(PAGE_PATH, "utf8");
    const ctaStart = source.indexOf("function PlanCheckCta");
    const ctaEnd = source.indexOf("export default function", ctaStart);
    expect(ctaStart).toBeGreaterThan(-1);
    const cta = source.slice(ctaStart, ctaEnd);
    expect(cta.toLowerCase()).not.toContain("free");
    expect(cta).toContain("book a 45-minute phone plan check");
    expect(source).toContain(BOOKING_URL);
    expect(source).toContain(
      "We do not offer every plan available in your area. Currently we represent 8 organizations which offer 65 products in your area. Please contact Medicare.gov or 1-800-MEDICARE to get information on all of your options.",
    );
    expect(source).not.toContain("TPMO disclaimer held pending");
    expect(source).not.toContain("65 vs 60");
    expect(source).not.toContain("60 products");
    expect(source.match(/<PlanCheckCta \/>/g)?.length).toBe(2);
  });

  it("is published and carries the required title, H1, and stamp", () => {
    const source = readFileSync(PAGE_PATH, "utf8");
    expect(source).toContain(
      "Granville County Medicare Plans Ending in 2027 | Christian Brinkley",
    );
    expect(source).toContain("Is your Granville County Medicare plan ending in 2027?");
    expect(source).toContain("Last checked 2026-10-26");
    expect(source).toContain("Plan year 2027");
    expect(source).toContain("robots: { index: true, follow: true }");
    const sitemap = readFileSync(join(process.cwd(), "app/sitemap.ts"), "utf8");
    expect(sitemap).toContain("medicare-plans-ending-2027/granville-county");
  });

  it("uses the Phase A hook, not the brief count hooks", () => {
    const source = readFileSync(PAGE_PATH, "utf8");
    expect(source).toContain(
      "If you got a letter saying your plan is ending, start here.",
    );
    expect(source).not.toContain("Three Granville Medicare Advantage plans are ending.");
    expect(source).not.toContain("Four more are being replaced.");
  });

  it("has an 8-item checklist with no plan name, destination, or count", () => {
    const source = readFileSync(PAGE_PATH, "utf8");
    const checklistStart = source.indexOf("const CHECKLIST");
    const checklistEnd = source.indexOf("const DATES", checklistStart);
    expect(checklistStart).toBeGreaterThan(-1);
    const checklist = source.slice(checklistStart, checklistEnd);
    expect(checklist.match(/t: "/g)?.length).toBe(8);
  });
  it("renders the key dates table through ResponsiveTable so it stacks on phones", () => {
    const source = readFileSync(PAGE_PATH, "utf8");
    expect(source).toContain(
      'import { ResponsiveTable } from "@/app/components/ResponsiveTable";',
    );
    expect(source).toContain("<ResponsiveTable");
    expect(source).toContain("</ResponsiveTable>");
    expect(source).not.toContain("<table");
  });

});
