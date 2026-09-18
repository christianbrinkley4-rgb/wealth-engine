import { describe, expect, it } from "vitest";

import { getBrackets } from "@/lib/irmaa";
import {
  PART_A_2026,
  PART_B_2026,
  PART_D_2026,
  PART_D_IRMAA_2026,
  partDIrmaaFor,
} from "@/lib/medicareCosts2026";

/**
 * These are published figures on a page people will act on, so each one is
 * pinned to the CMS fact sheet it came from. A test failing here means the
 * numbers moved and the page needs re-checking — not that the test is wrong.
 */
describe("the 2026 figures match the CMS fact sheets", () => {
  it("carries the Part A costs as published", () => {
    expect(PART_A_2026).toEqual({
      inpatientDeductible: 1736,
      coinsuranceDays61To90: 434,
      lifetimeReserveCoinsurance: 868,
      skilledNursingCoinsuranceDays21To100: 217,
      premiumReduced: 311,
      premiumFull: 565,
    });
  });

  it("keeps the lifetime reserve day at exactly twice the day 61–90 rate", () => {
    expect(PART_A_2026.lifetimeReserveCoinsurance).toBe(PART_A_2026.coinsuranceDays61To90 * 2);
  });

  it("carries the Part B deductible and the immunosuppressive premium", () => {
    expect(PART_B_2026.annualDeductible).toBe(283);
    expect(PART_B_2026.immunosuppressiveDrugPremium).toBe(121.6);
    expect(PART_B_2026.latePenaltyPercentPerYear).toBe(10);
  });

  it("carries the Part D cap, deductible ceiling and penalty base", () => {
    expect(PART_D_2026.outOfPocketCap).toBe(2100);
    expect(PART_D_2026.maximumDeductible).toBe(615);
    expect(PART_D_2026.baseBeneficiaryPremium).toBe(38.99);
    expect(PART_D_2026.creditableCoverageGapDays).toBe(63);
  });
});

describe("Part D IRMAA lines up with Part B IRMAA", () => {
  it("uses the same income bands as the Part B brackets, band for band", () => {
    const individual = getBrackets("individual");
    const joint = getBrackets("married_jointly");
    expect(PART_D_IRMAA_2026).toHaveLength(individual.length);

    PART_D_IRMAA_2026.forEach((band, index) => {
      expect(band.individualMax, `individual band ${index}`).toBe(individual[index].maxIncome);
      expect(band.jointMax, `joint band ${index}`).toBe(joint[index].maxIncome);
    });
  });

  it("charges nothing below the first threshold, either side of it", () => {
    expect(partDIrmaaFor(109000, "individual")).toBe(0);
    expect(partDIrmaaFor(109000.01, "individual")).toBe(14.5);
    expect(partDIrmaaFor(218000, "married_jointly")).toBe(0);
    expect(partDIrmaaFor(218000.01, "married_jointly")).toBe(14.5);
  });

  it("reads every published surcharge at its own boundary", () => {
    const expected: Array<[number, number]> = [
      [137000, 14.5],
      [171000, 37.5],
      [205000, 60.4],
      [499999.99, 83.3],
      [500000, 91],
    ];
    for (const [income, surcharge] of expected) {
      expect(partDIrmaaFor(income, "individual"), `single at ${income}`).toBe(surcharge);
    }

    const jointExpected: Array<[number, number]> = [
      [274000, 14.5],
      [342000, 37.5],
      [410000, 60.4],
      [749999.99, 83.3],
      [750000, 91],
    ];
    for (const [income, surcharge] of jointExpected) {
      expect(partDIrmaaFor(income, "married_jointly"), `joint at ${income}`).toBe(surcharge);
    }
  });

  it("holds the top surcharge however far above the last threshold you go", () => {
    expect(partDIrmaaFor(5_000_000, "individual")).toBe(91);
    expect(partDIrmaaFor(5_000_000, "married_jointly")).toBe(91);
  });

  it("treats a negative income as zero rather than failing to match a band", () => {
    expect(partDIrmaaFor(-1, "individual")).toBe(0);
  });
});
