import { describe, expect, it } from "vitest";

import { NC_HISTORY } from "@/lib/ncLandscapeHistory";
import { NC_LANDSCAPE } from "@/lib/ncLandscape2027";
import { describeCountyHistory, lowestMoopYear, percentChange, state } from "@/lib/ncHistoryCopy";

const KEYS = [
  "plans",
  "withDrugs",
  "zeroPremium",
  "ppo",
  "hmo",
  "moopMedian",
  "fourStarPlus",
  "specialNeeds",
] as const;

describe("NC Medicare history dataset", () => {
  it("has all 100 counties for every year 2022-2027", () => {
    expect(NC_HISTORY.years).toEqual([2022, 2023, 2024, 2025, 2026, 2027]);
    const counties = Object.keys(NC_HISTORY.counties);
    expect(counties).toHaveLength(100);
    for (const c of counties) {
      expect(Object.keys(NC_HISTORY.counties[c]).sort()).toEqual(NC_HISTORY.years.map(String));
    }
  });

  it("matches the existing 2026 and 2027 county data exactly", () => {
    for (const [c, v] of Object.entries(NC_LANDSCAPE.counties)) {
      for (const key of KEYS) {
        expect(NC_HISTORY.counties[c]["2026"][key], `${c} 2026 ${key}`).toBe(v.y2026[key]);
        expect(NC_HISTORY.counties[c]["2027"][key], `${c} 2027 ${key}`).toBe(v.y2027[key]);
      }
    }
    expect(state(2027).pdpPlans).toBe(NC_LANDSCAPE.pdp.y2027.plans);
    expect(state(2027).pdpLowestPremium).toBe(NC_LANDSCAPE.pdp.y2027.lowestPremium);
  });

  it("keeps counts sane", () => {
    for (const y of NC_HISTORY.years) {
      const s = state(y);
      expect(s.zeroPremium).toBeLessThanOrEqual(s.withDrugs);
      expect(s.withDrugs).toBeLessThanOrEqual(s.plans);
      expect(s.moopMedian).toBeGreaterThan(1000);
      expect(s.countiesCovered).toBe(100);
    }
  });

  it("writes plain sentences with no em dashes", () => {
    const line = describeCountyHistory("Guilford");
    expect(line).toMatch(/^Guilford County has \d+ Medicare Advantage plans for 2027/);
    expect(line).not.toMatch(/[–—]/);
    expect(lowestMoopYear()).toBe(2024);
    expect(percentChange(100, 142)).toBe(42);
  });
});
