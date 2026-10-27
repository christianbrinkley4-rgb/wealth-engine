import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import { NC_LANDSCAPE } from "@/lib/ncLandscape2027";
import { TRIAD_COUNTIES, describeCounty, formatDollars } from "@/lib/ncLandscapeCopy";

const ROOT = join(__dirname, "..", "..");
const INSURER_WORDS =
  /humana|aetna|united ?health|blue ?cross|bcbs|wellcare|devoted|healthteam|cigna|anthem|centene|elevance|alignment|zing|clover|experience health|kaiser|cvs/i;

describe("NC 2027 county landscape", () => {
  it("covers all 100 North Carolina counties with whole-number counts", () => {
    const names = Object.keys(NC_LANDSCAPE.counties);
    expect(names).toHaveLength(100);
    for (const [name, c] of Object.entries(NC_LANDSCAPE.counties)) {
      for (const year of [c.y2026, c.y2027]) {
        for (const key of ["plans", "withDrugs", "zeroPremium", "ppo", "hmo", "fourStarPlus", "insurers"] as const) {
          expect(Number.isInteger(year[key]), `${name} ${key}`).toBe(true);
          expect(year[key]).toBeGreaterThanOrEqual(0);
        }
        expect(year.zeroPremium).toBeLessThanOrEqual(year.withDrugs);
        expect(year.withDrugs).toBeLessThanOrEqual(year.plans);
      }
    }
  });

  it("matches the CMS figures checked by hand for Guilford and Forsyth", () => {
    const g = NC_LANDSCAPE.counties.Guilford;
    expect([g.y2026.plans, g.y2027.plans]).toEqual([60, 57]);
    expect([g.y2026.zeroPremium, g.y2027.zeroPremium]).toEqual([34, 34]);
    expect([g.y2026.moopMedian, g.y2027.moopMedian]).toEqual([5900, 6750]);
    const f = NC_LANDSCAPE.counties.Forsyth;
    expect([f.y2026.plans, f.y2027.plans]).toEqual([60, 56]);
  });

  it("never carries plan or insurer names in the data or the page", () => {
    for (const file of [
      "lib/ncLandscape2027.ts",
      "lib/ncLandscapeCopy.ts",
      "app/medicare-2027-by-county/page.tsx",
      "app/medicare-2027-by-county/CountyPicker.tsx",
    ]) {
      expect(readFileSync(join(ROOT, file), "utf8"), file).not.toMatch(INSURER_WORDS);
    }
  });

  it("writes plain sentences with no em dashes for every Triad county", () => {
    for (const name of TRIAD_COUNTIES) {
      const sentence = describeCounty(name, NC_LANDSCAPE.counties[name]);
      expect(sentence).toContain(`${name} County`);
      expect(sentence).not.toMatch(/—/);
    }
    expect(formatDollars(6750)).toBe("$6,750");
    expect(formatDollars(null)).toBe("n/a");
  });

  it("is in the sitemap", () => {
    const paths = sitemap().map((entry) => new URL(entry.url).pathname);
    expect(paths).toContain("/medicare-2027-by-county");
  });
});
