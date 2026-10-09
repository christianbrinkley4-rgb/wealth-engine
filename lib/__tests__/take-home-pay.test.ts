import { describe, expect, it } from "vitest";
import { estimateTakeHome } from "@/lib/takeHomePay";
describe("take-home tax estimates", () => {
  it("uses the NC deduction and federal progressive brackets for a single earner", () => {
    const result = estimateTakeHome(65000, "single");
    expect(result.fed).toBeCloseTo(5620);
    expect(result.nc).toBeCloseTo(2084.775);
    expect(result.ss).toBeCloseTo(4030);
    expect(result.medicare).toBeCloseTo(942.5);
    expect(result.net).toBeCloseTo(52322.725);
  });
  it("uses joint deductions without doubling one earner payroll limits", () => {
    const result = estimateTakeHome(300000, "joint");
    expect(result.nc).toBeCloseTo(10952.55);
    expect(result.ss).toBeCloseTo(11439);
    expect(result.addlMedicare).toBeCloseTo(450);
  });
  it("retains payroll taxes below income-tax deductions", () => {
    const result = estimateTakeHome(10000, "single");
    expect(result.fed).toBe(0);
    expect(result.nc).toBe(0);
    expect(result.net).toBeCloseTo(9235);
  });
  it.each([0, -100, NaN, Infinity])("bounds invalid or empty income %s", (gross) => {
    expect(estimateTakeHome(gross, "single").net).toBe(0);
  });
  it("applies additional Medicare only above the filing threshold", () => {
    expect(estimateTakeHome(200000, "single").addlMedicare).toBe(0);
    expect(estimateTakeHome(210000, "single").addlMedicare).toBeCloseTo(90);
    expect(estimateTakeHome(210000, "joint").addlMedicare).toBe(0);
  });
});
