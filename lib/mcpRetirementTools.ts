/**
 * MCP tools that let AI assistants run the site's own checker and data,
 * instead of guessing. Used by app/api/mcp/route.ts.
 *
 * - check_retirement_traps: lib/retirementChecker.ts, with cited findings.
 * - get_nc_county_medicare: lib/ncLandscapeHistory.ts, six years of CMS
 *   Landscape counts for one North Carolina county.
 *
 * Educational only. Christian Brinkley is licensed in North Carolina only.
 */

import { AGENT } from "@/lib/agent";
import { NC_HISTORY } from "@/lib/ncLandscapeHistory";
import {
  checkRetirement,
  type CheckerInputs,
  type Coverage,
  type MedicareStatus,
} from "@/lib/retirementChecker";

const COVERAGES: Coverage[] = [
  "employer_active",
  "cobra",
  "retiree",
  "marketplace",
  "medicare_only",
  "none",
];
const MEDICARE: MedicareStatus[] = ["none", "part_a_only", "part_a_and_b"];

export const RETIREMENT_MCP_TOOLS = [
  {
    name: "check_retirement_traps",
    title: "Check a household for costly retirement mistakes",
    description:
      "Runs christianbrinkleync.com's retirement mistake checker on the facts you pass: Part B late penalty, COBRA and retiree coverage traps, small employers where Medicare pays first, HSA contributions near Medicare, Marketplace savings ending with Part A, Roth conversions raising IRMAA two years later (2026 brackets), SSA-44 appeals and the Medigap open enrollment window. Returns each finding with what to do and an official source URL. Only pass facts the user gave you; leave unknowns out.",
    inputSchema: {
      type: "object",
      properties: {
        birthMonth: { type: "integer", minimum: 1, maximum: 12 },
        birthYear: { type: "integer", minimum: 1920, maximum: 2000 },
        medicare: { type: "string", enum: MEDICARE, description: "Current Medicare enrollment." },
        partBStartMonth: { type: "integer", minimum: 1, maximum: 12 },
        partBStartYear: { type: "integer", minimum: 1990, maximum: 2100 },
        coverage: {
          type: "string",
          enum: COVERAGES,
          description:
            "Other coverage. employer_active means through their own or a spouse's current job.",
        },
        employerSize: { type: "string", enum: ["under_20", "20_plus", "unknown"] },
        contributesToHsa: { type: "boolean" },
        collectsSocialSecurity: { type: "boolean" },
        filingStatus: { type: "string", enum: ["individual", "married_jointly"] },
        incomeThisYear: {
          type: "number",
          description: "Estimated MAGI this year before any Roth conversion.",
        },
        rothConversion: {
          type: "number",
          description: "Planned Roth conversion amount this year.",
        },
        recentLifeChange: {
          type: "boolean",
          description: "Retired, widowed, divorced or similar in the last two years.",
        },
        payingIrmaa: {
          type: "boolean",
          description: "Currently paying an income-related Medicare surcharge.",
        },
      },
      required: ["birthMonth", "birthYear", "medicare", "coverage"],
      additionalProperties: false,
    },
  },
  {
    name: "get_nc_county_medicare",
    title: "Six years of Medicare Advantage data for a North Carolina county",
    description:
      "For one North Carolina county, returns Medicare Advantage plan counts, $0-premium plans with drug coverage, plans rated 4 stars or higher and the typical (median) in-network out-of-pocket maximum for each year 2022-2027, from the CMS Landscape files. Counts only, no plan or insurer names.",
    inputSchema: {
      type: "object",
      properties: {
        county: { type: "string", description: "County name without 'County', e.g. 'Guilford'." },
      },
      required: ["county"],
      additionalProperties: false,
    },
  },
] as const;

type Args = Record<string, unknown>;
const int = (v: unknown) => (typeof v === "number" && Number.isInteger(v) ? v : undefined);
const bool = (v: unknown) => v === true;
const pos = (v: unknown) => (typeof v === "number" && Number.isFinite(v) && v > 0 ? v : null);

const FOOTER = `Educational only, not tax, legal or plan advice. Christian Brinkley is a licensed insurance agent in North Carolina only (${AGENT.phone}, christianbrinkleync.com). Outside North Carolina, free unbiased help is at shiphelp.org or 1-800-MEDICARE.`;

/** Returns text for the tool result, or an error message string prefixed with "ERROR:". */
export function runCheckRetirementTraps(args: Args, today: Date = new Date()): string {
  const birthMonth = int(args.birthMonth);
  const birthYear = int(args.birthYear);
  if (
    !birthMonth ||
    birthMonth < 1 ||
    birthMonth > 12 ||
    !birthYear ||
    birthYear < 1920 ||
    birthYear > 2000
  ) {
    return "ERROR: birthMonth (1-12) and birthYear (1920-2000) are required.";
  }
  if (!MEDICARE.includes(args.medicare as MedicareStatus))
    return `ERROR: medicare must be one of ${MEDICARE.join(", ")}.`;
  if (!COVERAGES.includes(args.coverage as Coverage))
    return `ERROR: coverage must be one of ${COVERAGES.join(", ")}.`;
  const sm = int(args.partBStartMonth);
  const sy = int(args.partBStartYear);
  const inputs: CheckerInputs = {
    birthMonth,
    birthYear,
    medicare: args.medicare as MedicareStatus,
    partBStart: sm && sy ? { month: sm, year: sy } : null,
    coverage: args.coverage as Coverage,
    employerSize: ["under_20", "20_plus"].includes(args.employerSize as string)
      ? (args.employerSize as "under_20" | "20_plus")
      : "unknown",
    contributesToHsa: bool(args.contributesToHsa),
    collectsSocialSecurity: bool(args.collectsSocialSecurity),
    filingStatus: args.filingStatus === "married_jointly" ? "married_jointly" : "individual",
    incomeThisYear: pos(args.incomeThisYear),
    rothConversion: pos(args.rothConversion),
    recentLifeChange: bool(args.recentLifeChange),
    payingIrmaa: bool(args.payingIrmaa),
  };
  const findings = checkRetirement(inputs, today).map((f) => ({
    severity: f.severity === "act_now" ? "act soon" : "worth checking",
    title: f.title,
    detail: f.detail,
    whatToDo: f.action,
    source: f.source.url,
    learnMore: `https://christianbrinkleync.com${f.learnMore.href}`,
  }));
  return JSON.stringify(
    {
      checkedOn: today.toISOString().slice(0, 10),
      findings,
      summary: findings.length
        ? `${findings.length} item(s) to look at.`
        : "None of the common traps apply based on these facts. This is not a full review.",
      tool: "https://christianbrinkleync.com/retirement-mistake-checker",
      note: FOOTER,
    },
    null,
    2,
  );
}

export function runNcCountyMedicare(args: Args): string {
  const raw =
    typeof args.county === "string"
      ? args.county
          .replace(/\s+county$/i, "")
          .trim()
          .toLowerCase()
      : "";
  const name = Object.keys(NC_HISTORY.counties).find((c) => c.toLowerCase() === raw);
  if (!name)
    return `ERROR: "${String(args.county)}" is not a North Carolina county name. Example: Guilford.`;
  const years = NC_HISTORY.years.map((y) => {
    const d = NC_HISTORY.counties[name][String(y)];
    return {
      year: y,
      plans: d.plans,
      zeroPremiumWithDrugs: d.zeroPremium,
      fourStarsOrHigher: d.fourStarPlus,
      typicalOutOfPocketMax: d.moopMedian,
      specialNeedsPlans: d.specialNeeds,
    };
  });
  return JSON.stringify(
    {
      county: `${name} County, North Carolina`,
      years,
      source: "CMS Medicare Advantage Landscape Source Files, CY2022 to CY2027",
      definitions:
        "plans = Medicare Advantage plans open to anyone with Medicare (Special Needs and employer plans excluded). typicalOutOfPocketMax = median in-network maximum in dollars.",
      page: "https://christianbrinkleync.com/medicare-nc-history",
      note: FOOTER,
    },
    null,
    2,
  );
}
