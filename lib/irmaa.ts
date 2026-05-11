/**
 * Projected 2026 IRMAA Brackets and Part B Premiums
 *
 * Source basis: 2025 CMS announced brackets + projected COLA adjustment.
 * MUST BE UPDATED when CMS releases official 2026 figures (est. November 2025).
 * CMS source: https://www.cms.gov/newsroom/press-releases
 *
 * CRITICAL ACCOUNTING NOTE:
 * IRMAA is based on Modified Adjusted Gross Income (MAGI) from 2 years prior.
 * 2026 premiums are determined by the user's 2024 tax return MAGI — not
 * their current income. The wizard should surface this distinction to the user.
 *
 * FILING STATUS NOTE:
 * Brackets differ significantly between individual and married filing jointly.
 * This engine requires filing status to return accurate results.
 * Never assume individual filing for a household income input.
 */

export type FilingStatus = "individual" | "married_jointly";

export interface IrmaaBracket {
  minIncome: number;
  maxIncome: number | null; // null = no upper limit (top bracket)
  partBPremium: number;
  bracketName: string;
  irmaaSurcharge: number; // monthly surcharge above standard base ($185.00)
}

// ─── STANDARD BASE PREMIUM ───────────────────────────────────────────────────
// Used for the "below IRMAA threshold" bracket and surcharge math.
export const STANDARD_BASE_PREMIUM_2026 = 185.0;

// ─── INDIVIDUAL FILER BRACKETS ───────────────────────────────────────────────
const INDIVIDUAL_BRACKETS_2026: IrmaaBracket[] = [
  {
    minIncome: 0,
    maxIncome: 103000,
    partBPremium: 185.0,
    bracketName: "Standard (No Surcharge)",
    irmaaSurcharge: 0,
  },
  {
    minIncome: 103000.01,
    maxIncome: 129000,
    partBPremium: 259.0,
    bracketName: "Tier 1 IRMAA",
    irmaaSurcharge: 74.0,
  },
  {
    minIncome: 129000.01,
    maxIncome: 161000,
    partBPremium: 370.0,
    bracketName: "Tier 2 IRMAA",
    irmaaSurcharge: 185.0,
  },
  {
    minIncome: 161000.01,
    maxIncome: 193000,
    partBPremium: 480.9,
    bracketName: "Tier 3 IRMAA",
    irmaaSurcharge: 295.9,
  },
  {
    minIncome: 193000.01,
    maxIncome: 500000,
    partBPremium: 591.9,
    bracketName: "Tier 4 IRMAA",
    irmaaSurcharge: 406.9,
  },
  {
    minIncome: 500000.01,
    maxIncome: null,
    partBPremium: 628.9, // Projected Tier 5 — verify against CMS Nov 2025
    bracketName: "Tier 5 IRMAA (Maximum)",
    irmaaSurcharge: 443.9,
  },
];

// ─── MARRIED FILING JOINTLY BRACKETS ─────────────────────────────────────────
// Thresholds are approximately double the individual thresholds.
const MARRIED_JOINTLY_BRACKETS_2026: IrmaaBracket[] = [
  {
    minIncome: 0,
    maxIncome: 206000,
    partBPremium: 185.0,
    bracketName: "Standard (No Surcharge)",
    irmaaSurcharge: 0,
  },
  {
    minIncome: 206000.01,
    maxIncome: 258000,
    partBPremium: 259.0,
    bracketName: "Tier 1 IRMAA",
    irmaaSurcharge: 74.0,
  },
  {
    minIncome: 258000.01,
    maxIncome: 322000,
    partBPremium: 370.0,
    bracketName: "Tier 2 IRMAA",
    irmaaSurcharge: 185.0,
  },
  {
    minIncome: 322000.01,
    maxIncome: 386000,
    partBPremium: 480.9,
    bracketName: "Tier 3 IRMAA",
    irmaaSurcharge: 295.9,
  },
  {
    minIncome: 386000.01,
    maxIncome: 750000,
    partBPremium: 591.9,
    bracketName: "Tier 4 IRMAA",
    irmaaSurcharge: 406.9,
  },
  {
    minIncome: 750000.01,
    maxIncome: null,
    partBPremium: 628.9,
    bracketName: "Tier 5 IRMAA (Maximum)",
    irmaaSurcharge: 443.9,
  },
];

// ─── BRACKET MAP ──────────────────────────────────────────────────────────────
const BRACKET_MAP: Record<FilingStatus, IrmaaBracket[]> = {
  individual: INDIVIDUAL_BRACKETS_2026,
  married_jointly: MARRIED_JOINTLY_BRACKETS_2026,
};

// ─── CORE CALCULATION FUNCTION ────────────────────────────────────────────────

/**
 * Calculates the estimated 2026 Medicare Part B premium.
 *
 * @param income - User's estimated 2024 MAGI (the year used for 2026 determination)
 * @param filingStatus - "individual" or "married_jointly"
 * @returns The matching IrmaaBracket with premium, tier name, and surcharge.
 *
 * @example
 * calculatePartBPremium(150000, "individual")
 * // → Tier 2 IRMAA, $370.00/mo
 *
 * calculatePartBPremium(150000, "married_jointly")
 * // → Standard, $185.00/mo  ← completely different answer, same income
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
 * //    bracket. You will pay $370.00/month — $185.00 more than the
 * //    standard premium. That's approximately $2,220.00 more per year."
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
