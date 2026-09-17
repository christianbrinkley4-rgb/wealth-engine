/**
 * Official 2026 IRMAA Brackets and Part B Premiums
 *
 * Source: CMS fact sheet “2026 Medicare Parts A & B Premiums and Deductibles”
 * released November 14, 2025.
 * https://www.cms.gov/newsroom/fact-sheets/2026-medicare-parts-b-premiums-deductibles
 *
 * CRITICAL ACCOUNTING NOTE:
 * IRMAA is based on Modified Adjusted Gross Income (MAGI) from 2 years prior.
 * 2026 premiums are determined by the user’s 2024 tax return MAGI — not
 * their current income. The wizard should surface this distinction to the user.
 *
 * FILING STATUS NOTE:
 * Brackets differ significantly between individual and married filing jointly.
 * This engine requires filing status to return accurate results.
 * Never assume individual filing for a household income input.
 *
 * TOP-BRACKET BOUNDARY NOTE (CMS wording):
 * Tiers 1–3 use inclusive upper MAGI caps (“less than or equal to”).
 * Tier 4 is “less than $500,000” (individual) / “less than $750,000” (joint);
 * Tier 5 starts at “greater than or equal to” those amounts.
 */

export type FilingStatus = "individual" | "married_jointly";

export interface IrmaaBracket {
  minIncome: number;
  maxIncome: number | null; // null = no upper limit (top bracket)
  partBPremium: number;
  bracketName: string;
  irmaaSurcharge: number; // monthly surcharge above standard base ($202.90)
}

// ─── STANDARD BASE PREMIUM ───────────────────────────────────────────────────
// Used for the "below IRMAA threshold" bracket and surcharge math.
export const STANDARD_BASE_PREMIUM_2026 = 202.9;

// ─── INDIVIDUAL FILER BRACKETS ───────────────────────────────────────────────
const INDIVIDUAL_BRACKETS_2026: IrmaaBracket[] = [
  {
    minIncome: 0,
    maxIncome: 109000,
    partBPremium: 202.9,
    bracketName: "Standard (No Surcharge)",
    irmaaSurcharge: 0,
  },
  {
    minIncome: 109000.01,
    maxIncome: 137000,
    partBPremium: 284.1,
    bracketName: "Tier 1 IRMAA",
    irmaaSurcharge: 81.2,
  },
  {
    minIncome: 137000.01,
    maxIncome: 171000,
    partBPremium: 405.8,
    bracketName: "Tier 2 IRMAA",
    irmaaSurcharge: 202.9,
  },
  {
    minIncome: 171000.01,
    maxIncome: 205000,
    partBPremium: 527.5,
    bracketName: "Tier 3 IRMAA",
    irmaaSurcharge: 324.6,
  },
  {
    minIncome: 205000.01,
    maxIncome: 499999.99, // CMS: less than $500,000
    partBPremium: 649.2,
    bracketName: "Tier 4 IRMAA",
    irmaaSurcharge: 446.3,
  },
  {
    minIncome: 500000,
    maxIncome: null,
    partBPremium: 689.9,
    bracketName: "Tier 5 IRMAA (Maximum)",
    irmaaSurcharge: 487.0,
  },
];

// ─── MARRIED FILING JOINTLY BRACKETS ─────────────────────────────────────────
// Thresholds are approximately double the individual thresholds.
const MARRIED_JOINTLY_BRACKETS_2026: IrmaaBracket[] = [
  {
    minIncome: 0,
    maxIncome: 218000,
    partBPremium: 202.9,
    bracketName: "Standard (No Surcharge)",
    irmaaSurcharge: 0,
  },
  {
    minIncome: 218000.01,
    maxIncome: 274000,
    partBPremium: 284.1,
    bracketName: "Tier 1 IRMAA",
    irmaaSurcharge: 81.2,
  },
  {
    minIncome: 274000.01,
    maxIncome: 342000,
    partBPremium: 405.8,
    bracketName: "Tier 2 IRMAA",
    irmaaSurcharge: 202.9,
  },
  {
    minIncome: 342000.01,
    maxIncome: 410000,
    partBPremium: 527.5,
    bracketName: "Tier 3 IRMAA",
    irmaaSurcharge: 324.6,
  },
  {
    minIncome: 410000.01,
    maxIncome: 749999.99, // CMS: less than $750,000
    partBPremium: 649.2,
    bracketName: "Tier 4 IRMAA",
    irmaaSurcharge: 446.3,
  },
  {
    minIncome: 750000,
    maxIncome: null,
    partBPremium: 689.9,
    bracketName: "Tier 5 IRMAA (Maximum)",
    irmaaSurcharge: 487.0,
  },
];

// ─── BRACKET MAP ──────────────────────────────────────────────────────────────
const BRACKET_MAP: Record<FilingStatus, IrmaaBracket[]> = {
  individual: INDIVIDUAL_BRACKETS_2026,
  married_jointly: MARRIED_JOINTLY_BRACKETS_2026,
};

/**
 * Returns the full ordered bracket schedule for a filing status.
 * Consumers that need to iterate (Roth conversion calculator, etc.) should
 * use this rather than poking at the module-private constants.
 */
export function getBrackets(filingStatus: FilingStatus): IrmaaBracket[] {
  return BRACKET_MAP[filingStatus];
}

// ─── CORE CALCULATION FUNCTION ────────────────────────────────────────────────

/**
 * Calculates the estimated 2026 Medicare Part B premium.
 *
 * @param income - User’s estimated 2024 MAGI (the year used for 2026 determination)
 * @param filingStatus - "individual" or "married_jointly"
 * @returns The matching IrmaaBracket with premium, tier name, and surcharge.
 *
 * @example
 * calculatePartBPremium(150000, "individual")
 * // → Tier 2 IRMAA, $405.80/mo
 *
 * calculatePartBPremium(150000, "married_jointly")
 * // → Standard, $202.90/mo  ← completely different answer, same income
 */
export function calculatePartBPremium(income: number, filingStatus: FilingStatus): IrmaaBracket {
  const validIncome = Math.max(0, Math.round(income * 100) / 100); // round to cents
  const brackets = BRACKET_MAP[filingStatus];

  const match = brackets.find((bracket) =>
    bracket.maxIncome === null
      ? validIncome >= bracket.minIncome
      : validIncome >= bracket.minIncome && validIncome <= bracket.maxIncome,
  );

  // This fallback should never be reached given the top bracket has no max.
  // If it is reached, log it so we can diagnose — never fail silently.
  if (!match) {
    console.error(
      `[irmaa.ts] No bracket found for income=${validIncome}, status=${filingStatus}. Returning standard base. This is a bug — please report.`,
    );
    return brackets[0];
  }

  return match;
}

// ─── DISPLAY HELPER ─────────────────────────────────────────────────────────────

/**
 * Returns a plain-English summary string for the Summary Card UI.
 * Keeps display logic co-located with the data it describes.
 *
 * @example
 * getPlainEnglishSummary(result, 150000, "individual")
 * // → "At your income level ($150,000), you fall into the Tier 2 IRMAA
 * //    bracket. You will pay $405.80/month — $202.90 more than the
 * //    standard premium. That’s approximately $2,434.80 more per year."
 */
export function getPlainEnglishSummary(
  bracket: IrmaaBracket,
  income: number,
  filingStatus: FilingStatus,
): string {
  const formattedIncome = income.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const monthlyPremium = bracket.partBPremium.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const annualSurcharge = (bracket.irmaaSurcharge * 12).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const filingLabel =
    filingStatus === "married_jointly" ? "married filing jointly" : "individual filer";

  if (bracket.irmaaSurcharge === 0) {
    return (
      `At your income level (${formattedIncome}, ${filingLabel}), you fall ` +
      `into the standard Medicare bracket. Your estimated 2026 Part B ` +
      `premium is ${monthlyPremium}/month — no IRMAA surcharge applies.`
    );
  }

  return (
    `At your income level (${formattedIncome}, ${filingLabel}), you fall ` +
    `into the ${bracket.bracketName} bracket. Your estimated 2026 Part B ` +
    `premium is ${monthlyPremium}/month — approximately ${annualSurcharge} ` +
    `more per year than the standard premium. This additional cost is called ` +
    `an IRMAA surcharge.`
  );
}
