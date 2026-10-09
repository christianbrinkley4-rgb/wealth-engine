/**
 * The "what could go wrong" numbers behind the Honestly Calculator.
 *
 * Every historical figure below is transcribed from NYU Stern's public
 * historical returns table (Aswath Damodaran, "Historical Returns on
 * Stocks, Bonds and Bills: 1928-2024", updated January 5, 2026):
 * https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histretSP.html
 * Column used: "S&P 500 (includes dividends)", annual returns 1928-2025.
 * Counts were verified by script on 2026-10-08 (see
 * lib/__tests__/wealth-risk.test.ts). Nothing here is estimated or rounded
 * beyond the one decimal shown.
 */

import {
  finalPoint,
  growthSeries,
  money,
  monthsLabel,
  simulatePayoff,
  type Debt,
  type PayoffStrategy,
} from "./math";

export const SP_DATA_SOURCE = {
  label: "NYU Stern historical returns, S&P 500 1928-2025",
  url: "https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histretSP.html",
} as const;

/** Calendar years the S&P 500 (with dividends) finished negative, out of 98 (1928-2025). */
export const SP_NEGATIVE_YEARS = 26;
/** Calendar years in the dataset: 1928 through 2025. */
export const SP_YEAR_COUNT = 98;
/** 2008 calendar-year return, the worst single year since the 1930s. */
export const SP_2008_RETURN_PCT = -36.55;
/** Worst 10-year stretch on record, annualized. */
export const SP_WORST_DECADE_LABEL = "1929-1938";
export const SP_WORST_DECADE_ANNUAL_PCT = -1.67;

export type RiskScenario = {
  title: string;
  /** Plain language. Every sentence is 25 words or fewer, no em or en dashes. */
  body: string;
  sourceLabel: string;
  /** Empty when the source is the visitor's own numbers rather than a link. */
  sourceUrl: string;
};

/** Apply a single shock year (for example -36.55) to a balance. */
export function shockYearBalance(balance: number, shockPct: number): number {
  return balance * (1 + shockPct / 100);
}

/**
 * Three downside scenarios for the retirement projector, computed from the
 * visitor's own inputs plus the verified historical figures above.
 */
export function retirementRiskScenarios(input: {
  start: number;
  monthly: number;
  years: number;
  annualReturn: number;
}): RiskScenario[] {
  const base = finalPoint(growthSeries(input));
  const badDecade = finalPoint(
    growthSeries({ ...input, annualReturn: SP_WORST_DECADE_ANNUAL_PCT }),
  );
  const shocked = shockYearBalance(base.balance, SP_2008_RETURN_PCT);
  return [
    {
      title: "A bad decade",
      body:
        `The worst 10-year stretch on record was ${SP_WORST_DECADE_LABEL}. ` +
        `It averaged ${SP_WORST_DECADE_ANNUAL_PCT}% a year. ` +
        `At that rate your plan reaches ${money(badDecade.balance)} instead of ${money(base.balance)}.`,
      sourceLabel: SP_DATA_SOURCE.label,
      sourceUrl: SP_DATA_SOURCE.url,
    },
    {
      title: "A 2008 in your last year",
      body:
        `In 2008 the S&P 500 fell ${Math.abs(SP_2008_RETURN_PCT)}%. ` +
        `If a year like that hit right before you retire, ${money(base.balance)} becomes ${money(shocked)}. ` +
        `The plan still works. The number is just smaller.`,
      sourceLabel: SP_DATA_SOURCE.label,
      sourceUrl: SP_DATA_SOURCE.url,
    },
    {
      title: "How often the market loses",
      body:
        `In ${SP_NEGATIVE_YEARS} of the last ${SP_YEAR_COUNT} years, the S&P 500 lost money. ` +
        `That is roughly one year in four. Steady growth is an assumption, not a promise.`,
      sourceLabel: SP_DATA_SOURCE.label,
      sourceUrl: SP_DATA_SOURCE.url,
    },
  ];
}

/** The one-line risk hook for share cards, built from verified figures. */
export function retirementRiskLine(): string {
  return `But in ${SP_NEGATIVE_YEARS} of the last ${SP_YEAR_COUNT} years, the market lost money.`;
}

export type DebtRisk = {
  scenarios: RiskScenario[];
  /** One-line risk hook for the share card, computed from the visitor's debts. */
  riskLine: string;
};

const OWN_NUMBERS_SOURCE = "Your numbers, run through the same simulation";

/**
 * Downside scenarios for the debt payoff tool. Every number is deterministic
 * output of the same simulator the tool uses, so nothing is estimated and
 * nothing needs an external source. No quit-rate or behavior statistics are
 * used anywhere: only the visitor's own debts, re-run under worse conditions.
 */
export function debtRiskScenarios(input: {
  debts: Debt[];
  extra: number;
  strategy: PayoffStrategy;
}): DebtRisk {
  const minOnly = simulatePayoff(input.debts, 0, input.strategy);
  const minLabel = minOnly.stuck ? "50+ years" : monthsLabel(minOnly.months);

  const scenarios: RiskScenario[] = [
    {
      title: "Minimums only",
      body:
        `Pay only the minimums and you are debt-free in ${minLabel}, ` +
        `paying ${money(minOnly.totalInterest)} in interest. ` +
        `The extra payment is what buys the earlier date.`,
      sourceLabel: OWN_NUMBERS_SOURCE,
      sourceUrl: "",
    },
  ];

  if (input.extra > 0) {
    const halfExtra = simulatePayoff(input.debts, input.extra / 2, input.strategy);
    const halfLabel = halfExtra.stuck ? "50+ years" : monthsLabel(halfExtra.months);
    scenarios.push({
      title: "Money gets tight",
      body:
        `If you halve the extra payment to ${money(input.extra / 2)} a month, ` +
        `the debt-free date moves to ${halfLabel} and interest rises to ${money(halfExtra.totalInterest)}.`,
      sourceLabel: OWN_NUMBERS_SOURCE,
      sourceUrl: "",
    });
  }

  scenarios.push({
    title: "Missed payments cost more than time",
    body:
      "Skipping payments can add late fees and hurt your credit. " +
      "That damage sits on top of the math above. " +
      "Protect the minimums first, then the extra.",
    sourceLabel: "General guidance, stated as guidance",
    sourceUrl: "",
  });

  return {
    scenarios,
    riskLine: `Minimums only: ${minLabel} and ${money(minOnly.totalInterest)} interest.`,
  };
}
