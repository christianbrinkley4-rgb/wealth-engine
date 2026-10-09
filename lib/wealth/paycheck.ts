/**
 * PaycheckOS, federal rules for 2026. Pure math, no payroll data leaves the device.
 * Verified 2026-10-08 against SSA and IRS primary sources below.
 * Pub. 15-T section 1, Worksheet 1A, STANDARD annual schedules.
 * Assumes a 2020 or later W-4, Step 2 unchecked, Steps 3 and 4 blank,
 * regular W-2 wages, and gross equal to federal/FICA taxable wages.
 */
export const PAYCHECK_SOURCES = {
  withholding: "https://www.irs.gov/publications/p15t",
  socialSecurity: "https://www.ssa.gov/oact/cola/cbb.html",
  medicare: "https://www.irs.gov/publications/p15",
  additionalMedicare:
    "https://www.irs.gov/businesses/small-businesses-self-employed/questions-and-answers-for-the-additional-medicare-tax",
} as const;

export const PAYCHECK_RULES = {
  year: 2026,
  socialSecurityWageBase: 184_500,
  socialSecurityRate: 0.062,
  medicareRate: 0.0145,
  additionalMedicareRate: 0.009,
  additionalMedicareWithholdingThreshold: 200_000,
  additionalMedicareLiabilityThreshold: { single: 200_000, joint: 250_000 },
} as const;

// IRS Pub. 15-T Worksheet 1A, Table 3.
export const PAY_PERIODS = { weekly: 52, biweekly: 26, semimonthly: 24, monthly: 12 } as const;
export type PayFrequency = keyof typeof PAY_PERIODS;
export type PaycheckFilingStatus = "single" | "joint";

// [lower bound, base tax, marginal rate], copied from the STANDARD schedules.
// Bounds are adjusted annual wages, not taxable income on a tax return.
export const WITHHOLDING_SCHEDULES = {
  single: [
    [0, 0, 0],
    [7500, 0, 0.1],
    [19900, 1240, 0.12],
    [57900, 5800, 0.22],
    [113200, 17966, 0.24],
    [209275, 41024, 0.32],
    [263725, 58448, 0.35],
    [648100, 192979.25, 0.37],
  ],
  joint: [
    [0, 0, 0],
    [19300, 0, 0.1],
    [44100, 2480, 0.12],
    [120100, 11600, 0.22],
    [230700, 35932, 0.24],
    [422850, 82048, 0.32],
    [531750, 116896, 0.35],
    [788000, 206583.5, 0.37],
  ],
} as const;

export function cents(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

/** Accept pasted US dollars, but reject malformed, negative, and nonfinite input. */
export function parsePaycheckMoney(raw: string): number | null {
  const value = raw.trim().replace(/^\$\s*/, "");
  if (!/^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d{1,2})?$/.test(value)) return null;
  const parsed = Number(value.replaceAll(",", ""));
  return Number.isFinite(parsed) && parsed <= 1_000_000_000 ? parsed : null;
}

export function paycheckMoney(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function federalWithholding(
  gross: number,
  frequency: PayFrequency,
  status: PaycheckFilingStatus,
) {
  if (!Number.isFinite(gross) || gross < 0 || gross > 1_000_000_000) {
    throw new RangeError("Enter a valid gross paycheck amount.");
  }
  if (!Object.hasOwn(PAY_PERIODS, frequency) || !Object.hasOwn(WITHHOLDING_SCHEDULES, status)) {
    throw new RangeError("Choose a listed pay frequency and filing status.");
  }
  const periods = PAY_PERIODS[frequency];
  const annualGross = gross * periods;
  // Worksheet 1A line 1g. This is separate from the schedule's zero-rate band.
  const adjustment = status === "joint" ? 12_900 : 8600;
  const adjustedAnnualWages = Math.max(0, annualGross - adjustment);
  const schedule = WITHHOLDING_SCHEDULES[status];
  const bracketLines = schedule
    .map(([lower, , rate], index) => {
      const upper = schedule[index + 1]?.[0] ?? Infinity;
      const wages = Math.max(0, Math.min(adjustedAnnualWages, upper) - lower);
      return { lower, upper, rate, wages, tax: wages * rate };
    })
    .filter((line) => line.wages > 0);
  const row = [...schedule].reverse().find(([lower]) => adjustedAnnualWages >= lower)!;
  const [lower, baseTax, rate] = row;
  const excess = adjustedAnnualWages - lower;
  const annualTax = baseTax + excess * rate;
  return {
    periods,
    annualGross,
    adjustment,
    adjustedAnnualWages,
    bracketLines,
    lower,
    baseTax,
    rate,
    excess,
    annualTax,
    perPaycheck: cents(annualTax / periods),
  };
}

export type PaycheckInput = {
  gross: number;
  net: number;
  frequency: PayFrequency;
  filingStatus: PaycheckFilingStatus;
  /** Taxable wages paid by this employer before this check. Omit for annual averages. */
  yearToDateGross?: number;
};

export function paycheckBreakdown(input: PaycheckInput) {
  const withholding = federalWithholding(input.gross, input.frequency, input.filingStatus);
  if (!Number.isFinite(input.net) || input.net < 0 || input.net > input.gross) {
    throw new RangeError("Net deposit must be between zero and gross pay.");
  }
  if (
    input.yearToDateGross !== undefined &&
    (!Number.isFinite(input.yearToDateGross) ||
      input.yearToDateGross < 0 ||
      input.yearToDateGross > 1_000_000_000)
  ) {
    throw new RangeError("Enter valid taxable wages before this paycheck.");
  }
  const gross = cents(input.gross);
  const net = cents(input.net);
  const { annualGross, periods } = withholding;
  const rules = PAYCHECK_RULES;
  const annualSocialSecurity = cents(
    Math.min(annualGross, rules.socialSecurityWageBase) * rules.socialSecurityRate,
  );
  const annualMedicare = cents(annualGross * rules.medicareRate);
  const annualAdditionalMedicare = cents(
    Math.max(0, annualGross - rules.additionalMedicareWithholdingThreshold) *
      rules.additionalMedicareRate,
  );
  const annualAdditionalMedicareLiability = cents(
    Math.max(0, annualGross - rules.additionalMedicareLiabilityThreshold[input.filingStatus]) *
      rules.additionalMedicareRate,
  );
  const ytd = input.yearToDateGross;
  const socialSecurityTaxable =
    ytd === undefined
      ? Math.min(annualGross, rules.socialSecurityWageBase) / periods
      : Math.min(gross, Math.max(0, rules.socialSecurityWageBase - ytd));
  const additionalMedicareTaxable =
    ytd === undefined
      ? Math.max(0, annualGross - rules.additionalMedicareWithholdingThreshold) / periods
      : Math.max(0, ytd + gross - rules.additionalMedicareWithholdingThreshold) -
        Math.max(0, ytd - rules.additionalMedicareWithholdingThreshold);
  const socialSecurity = cents(socialSecurityTaxable * rules.socialSecurityRate);
  const medicare = cents(gross * rules.medicareRate);
  const additionalMedicare = cents(additionalMedicareTaxable * rules.additionalMedicareRate);
  const federalIncomeTax = withholding.perPaycheck;
  const taxes = cents(socialSecurity + medicare + additionalMedicare + federalIncomeTax);
  // Keep a negative residual visible. Never invent deductions or clamp a mismatch away.
  const remainder = cents(gross - net - taxes);
  const annualNet = cents(net * periods);
  const annualFederalIncomeTax = cents(federalIncomeTax * periods);
  const annualTaxes = cents(
    annualSocialSecurity + annualMedicare + annualAdditionalMedicare + annualFederalIncomeTax,
  );
  return {
    gross,
    net,
    withholding,
    socialSecurity,
    socialSecurityTaxable,
    medicare,
    additionalMedicare,
    additionalMedicareTaxable,
    federalIncomeTax,
    taxes,
    remainder,
    reconciles: remainder >= 0,
    takeHomePercent: gross === 0 ? 0 : (net / gross) * 100,
    mode: ytd === undefined ? ("average" as const) : ("current" as const),
    annual: {
      gross: annualGross,
      net: annualNet,
      socialSecurity: annualSocialSecurity,
      medicare: annualMedicare,
      additionalMedicare: annualAdditionalMedicare,
      additionalMedicareLiability: annualAdditionalMedicareLiability,
      federalIncomeTax: annualFederalIncomeTax,
      taxes: annualTaxes,
      remainder: cents(annualGross - annualNet - annualTaxes),
    },
  };
}
