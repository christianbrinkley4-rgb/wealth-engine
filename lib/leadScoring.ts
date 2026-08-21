/**
 * Server-side lead classifier. Pure function so it's trivial to test and
 * cheap to re-run from a backfill script.
 *
 * The schema reserves irmaa_risk_status ('low' | 'moderate' | 'high') — we
 * derive it from the calculated premium and also compute a numeric score so
 * Make.com routes can branch on either ("if score >= 70: SMS Christian").
 */

export type IrmaaRisk = "low" | "moderate" | "high";
export type LeadTier = "cold" | "warm" | "hot";

export interface LeadScoringInput {
  age?: number | null;
  annual_income?: number | null;
  filing_status?: "individual" | "married_jointly" | null;
  calculated_premium?: number | null;
  source?: string | null;
  zip_code?: string | null;
}

export interface LeadScoringResult {
  score: number;
  tier: LeadTier;
  risk: IrmaaRisk;
}

// Standard Part B base for 2026 is $202.90 (lib/irmaa.ts STANDARD_BASE_PREMIUM_2026).
// Anything at/above the Tier 1 total premium ($284.10) signals real IRMAA exposure.
const TIER_1_PREMIUM = 284.1;
const TIER_2_PREMIUM = 405.8;

/**
 * Piedmont Triad ZIP prefixes.
 *
 * The original list was ["272", "273"], which covered High Point, Kernersville,
 * Summerfield and Oak Ridge — but not Greensboro (274xx) or Winston-Salem
 * (271xx). Leads from the two largest cities in the market, including the one
 * this business is based in, were scoring as out-of-area.
 */
const TRIAD_ZIP_PREFIXES = [
  "271", // Winston-Salem, Clemmons, Lewisville
  "272", // High Point, Kernersville, Jamestown, Thomasville
  "273", // Summerfield, Oak Ridge, Stokesdale, Reidsville
  "274", // Greensboro
];

export function scoreLead(input: LeadScoringInput): LeadScoringResult {
  const premium = Number(input.calculated_premium ?? 0);
  const income = Number(input.annual_income ?? 0);
  const age = Number(input.age ?? 0);
  const zip = (input.zip_code ?? "").toString();

  let score = 0;

  // Age band: prime IRMAA-decision window.
  if (age >= 63 && age <= 75) score += 30;
  else if (age >= 60 && age <= 79) score += 15;

  // IRMAA exposure from the calculator itself.
  if (premium >= TIER_2_PREMIUM) score += 40;
  else if (premium >= TIER_1_PREMIUM) score += 25;

  // Income corroborates premium when the wizard hasn't finished.
  if (income >= 200_000) score += 20;
  else if (income >= 171_000) score += 15;
  else if (income >= 109_000) score += 5;

  // Source intent. Roth-calculator users are typically affluent pre-retirees
  // actively planning. Help-quiz completions include topic + contact and are
  // the primary ad funnel — score at least as high as the wizard.
  if (input.source === "roth_calculator") score += 20;
  else if (input.source === "help_quiz") score += 20;
  else if (input.source === "wizard_completion") score += 15;
  else if (input.source === "about_page_cta") score += 5;

  // Local lead → easier to convert to a free 20-min Zoom.
  if (TRIAD_ZIP_PREFIXES.some((prefix) => zip.startsWith(prefix))) score += 5;

  const risk: IrmaaRisk =
    premium >= TIER_2_PREMIUM ? "high" : premium >= TIER_1_PREMIUM ? "moderate" : "low";

  const tier: LeadTier = score >= 70 ? "hot" : score >= 40 ? "warm" : "cold";

  return { score, tier, risk };
}
