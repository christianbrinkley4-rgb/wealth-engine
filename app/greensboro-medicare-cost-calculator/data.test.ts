import { describe, expect, it } from "vitest";

import {
  calculate,
  GUILFORD_ZIPS,
  MA_PART_D_DEDUCTIBLE,
  medigapGMonthly,
  PART_B_DEDUCTIBLE,
  PART_B_MONTHLY,
} from "@/app/greensboro-medicare-cost-calculator/data";

describe("medigapGMonthly", () => {
  it("uses the filed rate for age 65", () => {
    expect(medigapGMonthly(65)).toBe(211);
  });

  it("clamps ages below 65 and above 74", () => {
    expect(medigapGMonthly(60)).toBe(medigapGMonthly(65));
    expect(medigapGMonthly(95)).toBe(medigapGMonthly(74));
  });

  it("rises with age", () => {
    expect(medigapGMonthly(74)).toBeGreaterThan(medigapGMonthly(65));
  });
});

describe("calculate", () => {
  it("includes the Part B premium on both paths", () => {
    const r = calculate({ age: 67, meds: 0, visits: 0 });
    const partBYearly = PART_B_MONTHLY * 12;
    const gPartB = r.medigapLines.find((l) => l.label.includes("Part B premium"));
    const maPartB = r.maLines.find((l) => l.label.includes("Part B premium"));
    expect(gPartB?.amount).toBe(partBYearly);
    expect(maPartB?.amount).toBe(partBYearly);
  });

  it("adds the Part B deductible to the Medigap path only", () => {
    const r = calculate({ age: 67, meds: 0, visits: 0 });
    const gDed = r.medigapLines.find((l) => l.label.includes("Part B deductible"));
    expect(gDed?.amount).toBe(PART_B_DEDUCTIBLE);
    const maDed = r.maLines.find((l) => l.label.includes("Part B deductible"));
    expect(maDed).toBeUndefined();
  });

  it("skips the Part D deductible on MA when no medications", () => {
    const r = calculate({ age: 67, meds: 0, visits: 4 });
    const line = r.maLines.find((l) => l.label.includes("Part D deductible"));
    expect(line?.amount).toBe(0);
  });

  it("applies the Part D deductible on MA when medications exist", () => {
    const r = calculate({ age: 67, meds: 3, visits: 4 });
    const line = r.maLines.find((l) => l.label.includes("Part D deductible"));
    expect(line?.amount).toBe(MA_PART_D_DEDUCTIBLE);
  });

  it("reports the lower path and a non-negative difference", () => {
    const r = calculate({ age: 67, meds: 2, visits: 6 });
    expect(r.difference).toBeGreaterThanOrEqual(0);
    expect(["Medigap Plan G", "Medicare Advantage"]).toContain(r.lowerPath);
    expect(r.medigapYearly).toBeGreaterThan(0);
    expect(r.maYearly).toBeGreaterThan(0);
  });

  it("Medigap gets more expensive with age", () => {
    const young = calculate({ age: 65, meds: 0, visits: 0 });
    const old = calculate({ age: 74, meds: 0, visits: 0 });
    expect(old.medigapYearly).toBeGreaterThan(young.medigapYearly);
  });
});

describe("GUILFORD_ZIPS", () => {
  it("includes Greensboro and High Point ZIPs", () => {
    expect(GUILFORD_ZIPS.has("27401")).toBe(true);
    expect(GUILFORD_ZIPS.has("27282")).toBe(true);
  });

  it("excludes non-Guilford ZIPs", () => {
    expect(GUILFORD_ZIPS.has("27601")).toBe(false);
    expect(GUILFORD_ZIPS.has("10001")).toBe(false);
  });
});
