import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import {
  PART_D_CAP_2027,
  PART_D_MAX_DEDUCTIBLE_2027,
  checkDrugCap,
  dollars,
  monthName,
} from "@/lib/drugCap";
import { MEDICARE_NUMBERS_2027 } from "@/lib/medicareNumbers2027";

describe("2027 Part D cap check", () => {
  it("uses the same final figures as the 2027 numbers page", () => {
    const cap = MEDICARE_NUMBERS_2027.find((row) => row.figure === "Part D out-of-pocket cap");
    const deductible = MEDICARE_NUMBERS_2027.find((row) =>
      row.figure.startsWith("Part D standard deductible"),
    );
    expect(cap?.y2027).toBe(dollars(PART_D_CAP_2027));
    expect(cap?.status).toMatch(/^Final/);
    expect(deductible?.y2027).toBe(dollars(PART_D_MAX_DEDUCTIBLE_2027));
    expect(deductible?.status).toMatch(/^Final/);
  });

  it("does honest arithmetic on one number", () => {
    expect(checkDrugCap("150")).toEqual({ kind: "below", yearly: 1800 });
    expect(checkDrugCap("$1,000")).toEqual({ kind: "reaches", yearly: 12000, month: 3 });
    expect(checkDrugCap("200")).toEqual({ kind: "reaches", yearly: 2400, month: 12 });
    expect(checkDrugCap("abc")).toEqual({ kind: "invalid" });
    expect(checkDrugCap("0")).toEqual({ kind: "invalid" });
    expect(monthName(3)).toBe("March");
  });

  it("asks for no contact details and names no plan", () => {
    const source = readFileSync(
      join(__dirname, "..", "..", "app/plan-check/DrugCapCheck.tsx"),
      "utf8",
    );
    expect(source).not.toMatch(/fetch\(|email|phone/i);
    expect(source).not.toMatch(
      /humana|aetna|united ?health|blue ?cross|wellcare|devoted|healthteam|cigna|anthem/i,
    );
    expect(source).not.toMatch(/—/);
  });
});
