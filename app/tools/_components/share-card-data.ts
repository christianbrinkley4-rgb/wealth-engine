/**
 * Shared data for the shareable result cards on the /tools calculators.
 *
 * Pure module, no browser APIs, so both the client canvas renderer and the
 * server-side Open Graph route can use it. Default values are computed from
 * the same math the tools use, never invented.
 */

import {
  finalPoint,
  growthSeries,
  money,
  monthsLabel,
  rothVsTraditional,
  simulatePayoff,
  type Debt,
} from "@/lib/wealth/math";
import { retirementRiskLine } from "@/lib/wealth/risk";

/** The 1200x630 social card size, shared by canvas and the OG route. */
export const SHARE_CARD_SIZE = { width: 1200, height: 630 } as const;

/** Site palette tokens, matching app/globals.css. No phone number on cards. */
export const SHARE_BRAND = {
  navy: "#152e34",
  paper: "#faf8f2",
  gold: "#b9d3c4",
  goldInk: "#254f46",
  inkMuted: "#46534f",
  name: "Christian Brinkley",
  domain: "christianbrinkleync.com",
} as const;

export type ToolSlug =
  | "budget"
  | "compound-interest"
  | "debt-payoff"
  | "emergency-fund"
  | "life-insurance-needs"
  | "retirement-projector"
  | "roth-vs-traditional"
  | "take-home-pay";

/** Everything one rendered card needs. */
export type ShareCardData = {
  headlineNumber: string;
  headlineLabel: string;
  toolName: string;
  toolPath: string;
  /** Optional one-line risk hook, drawn under the label (Honestly Calculator). */
  riskLine?: string;
};

export type ToolCardDefault = ShareCardData & { slug: ToolSlug };

/** The sample debts the debt payoff tool starts with. Also used here for the default card. */
export const DEBT_PAYOFF_SAMPLE_DEBTS: Debt[] = [
  { id: "1", name: "Credit card", balance: 4500, apr: 24.99, minPayment: 90 },
  { id: "2", name: "Auto loan", balance: 12000, apr: 7.5, minPayment: 260 },
  { id: "3", name: "Student loan", balance: 8000, apr: 5.5, minPayment: 95 },
];
export const DEBT_PAYOFF_SAMPLE_EXTRA = 200;

function debtPayoffDefault(): { headlineNumber: string; headlineLabel: string } {
  const avalanche = simulatePayoff(DEBT_PAYOFF_SAMPLE_DEBTS, DEBT_PAYOFF_SAMPLE_EXTRA, "avalanche");
  const snowball = simulatePayoff(DEBT_PAYOFF_SAMPLE_DEBTS, DEBT_PAYOFF_SAMPLE_EXTRA, "snowball");
  const interestSaved = snowball.totalInterest - avalanche.totalInterest;
  const winner: "avalanche" | "snowball" | "tie" =
    Math.abs(interestSaved) < 1 ? "tie" : interestSaved > 0 ? "avalanche" : "snowball";
  const plan = winner === "snowball" ? snowball : avalanche;
  if (plan.stuck) {
    return { headlineNumber: "50+ years", headlineLabel: "Minimums do not cover the interest" };
  }
  return {
    headlineNumber: monthsLabel(plan.months),
    headlineLabel:
      winner === "tie" ? "Debt-free, both plans agree" : `Debt-free with the ${winner} plan`,
  };
}

function debtPayoffRiskLine(): string {
  const minOnly = simulatePayoff(DEBT_PAYOFF_SAMPLE_DEBTS, 0, "avalanche");
  const label = minOnly.stuck ? "50+ years" : monthsLabel(minOnly.months);
  return `Minimums only: ${label} and ${money(minOnly.totalInterest)} interest.`;
}

function rothVsTraditionalDefault(): { headlineNumber: string; headlineLabel: string } {
  const result = rothVsTraditional({
    annualPreTax: 7500,
    years: 30,
    annualReturn: 7,
    taxNow: 22,
    taxLater: 22,
  });
  if (result.winner === "tie") {
    return {
      headlineNumber: money(result.roth),
      headlineLabel: "Roth and traditional tie, after tax",
    };
  }
  return {
    headlineNumber: money(result.winner === "roth" ? result.roth : result.traditional),
    headlineLabel: `${result.winner === "roth" ? "Roth" : "Traditional"} leaves more, after tax`,
  };
}

const compoundDefault = finalPoint(
  growthSeries({ start: 1000, monthly: 200, years: 30, annualReturn: 7 }),
);
const retirementDefault = finalPoint(
  growthSeries({ start: 5000, monthly: 500, years: 44, annualReturn: 7 }),
);

/**
 * The card each tool page shows to crawlers, rendered from the tool's own
 * defaults. Used by the dynamic opengraph-image and twitter-image routes.
 */
export const TOOL_CARD_DEFAULTS: Record<ToolSlug, ToolCardDefault> = {
  budget: {
    slug: "budget",
    headlineNumber: money(3500 - 3200),
    headlineLabel: "Left over each month",
    toolName: "Budget calculator",
    toolPath: "/tools/budget",
  },
  "compound-interest": {
    slug: "compound-interest",
    headlineNumber: money(compoundDefault.balance),
    headlineLabel: "Balance after 30 years",
    toolName: "Compound interest calculator",
    toolPath: "/tools/compound-interest",
  },
  "debt-payoff": {
    slug: "debt-payoff",
    ...debtPayoffDefault(),
    riskLine: debtPayoffRiskLine(),
    toolName: "Debt payoff calculator",
    toolPath: "/tools/debt-payoff",
  },
  "emergency-fund": {
    slug: "emergency-fund",
    headlineNumber: money(2500 * 6),
    headlineLabel: "Target fund size",
    toolName: "Emergency fund calculator",
    toolPath: "/tools/emergency-fund",
  },
  "life-insurance-needs": {
    slug: "life-insurance-needs",
    headlineNumber: money(15000 + 65000 * 10 + 220000 + 50000),
    headlineLabel: "Starting-point coverage",
    toolName: "Life insurance needs calculator",
    toolPath: "/tools/life-insurance-needs",
  },
  "retirement-projector": {
    slug: "retirement-projector",
    headlineNumber: money(retirementDefault.balance),
    headlineLabel: "Projected at age 65",
    riskLine: retirementRiskLine(),
    toolName: "Retirement projector",
    toolPath: "/tools/retirement-projector",
  },
  "roth-vs-traditional": {
    slug: "roth-vs-traditional",
    ...rothVsTraditionalDefault(),
    toolName: "Roth vs traditional calculator",
    toolPath: "/tools/roth-vs-traditional",
  },
  "take-home-pay": {
    slug: "take-home-pay",
    headlineNumber: money(1993),
    headlineLabel: "Take-home, per biweekly check",
    toolName: "Take-home pay calculator",
    toolPath: "/tools/take-home-pay",
  },
};

export const TOOL_SLUGS = Object.keys(TOOL_CARD_DEFAULTS) as ToolSlug[];

export function isToolSlug(value: string): value is ToolSlug {
  return (TOOL_SLUGS as string[]).includes(value);
}

/**
 * Builds a card payload from a tool's live numbers. Trims whitespace and
 * refuses empty fields so a card never renders with a blank headline.
 */
export function buildShareCardData(input: {
  headlineNumber: string;
  headlineLabel: string;
  toolName: string;
  toolPath: string;
  riskLine?: string;
}): ShareCardData {
  const headlineNumber = input.headlineNumber.trim();
  const headlineLabel = input.headlineLabel.trim();
  const toolName = input.toolName.trim();
  const toolPath = input.toolPath.trim();
  if (!headlineNumber || !headlineLabel || !toolName || !toolPath) {
    throw new Error("buildShareCardData needs a headline number, label, tool name, and tool path.");
  }
  const riskLine = input.riskLine?.trim();
  return riskLine
    ? { headlineNumber, headlineLabel, toolName, toolPath, riskLine }
    : { headlineNumber, headlineLabel, toolName, toolPath };
}

/** "budget-calculator-result.png" style download name from a tool path. */
export function shareCardFileName(toolPath: string): string {
  const slug = toolPath
    .replace(/^\/tools\//, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "");
  return `${slug || "calculator"}-result.png`;
}

/** The text that travels with the image when the Web Share sheet opens. */
export function shareCardText(data: ShareCardData): string {
  const base = `My result from the ${data.toolName}: ${data.headlineLabel}, ${data.headlineNumber}.`;
  return data.riskLine ? `${base} ${data.riskLine}` : base;
}
