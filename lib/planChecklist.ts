/**
 * The plan research checklist: fixed lists and the two official links.
 *
 * The checklist holds no plan data and looks nothing up. A ZIP is written
 * down for the visitor to carry to Medicare.gov; it is never turned into a
 * county here, because no verified ZIP-to-county table exists in this repo.
 */

/**
 * Counties with a town page on this site (lib/triad.ts and the hand-written
 * /medicare-*-nc pages). The visitor picks their own county. Any other
 * county gets the same sheet plus the statewide SHIIP locator.
 */
export const CHECKLIST_COUNTIES = [
  "Alamance",
  "Davidson",
  "Forsyth",
  "Granville",
  "Guilford",
  "Person",
  "Randolph",
  "Rockingham",
] as const;

export function isChecklistCounty(county: string): boolean {
  return (CHECKLIST_COUNTIES as readonly string[]).includes(county);
}

/** Official destinations, checked October 9, 2026. No prefilled parameters. */
export const PLAN_COMPARE_URL = "https://www.medicare.gov/plan-compare/";
export const SHIIP_CONTACT_URL =
  "https://www.ncdoi.gov/consumers/medicare-and-seniors-health-insurance-information-program-shiip/contact-seniors-health-insurance-information-program-shiip";

/**
 * What the contact form on the finished sheet sends, besides the name and
 * email typed into that form.
 *
 * Nothing here comes from the sheet. Doctors, hospitals, prescriptions,
 * pharmacy, ZIP, county, travel and budget stay in the browser. The capture
 * API writes to a database, and health details must never be stored there.
 *
 * - irmaa_bracket starts with the tool name. The attribution report counts
 *   leads by that prefix.
 * - interest_topic and entry_mode select the existing short reply email
 *   ("I received your request and will follow up personally"). Without them
 *   the person gets the calculator reply, which talks about a premium
 *   estimate that this tool never made.
 */
export const CHECKLIST_CONTACT_REQUEST = {
  zip_code: "",
  irmaa_bracket: "Plan checklist: asked for contact after making a sheet",
  interest_topic: "medicare",
  quiz_answers: { entry_mode: "quick_contact", tool: "plan_checklist" },
} as const;

export const CHECKLIST_PRIORITIES = [
  "Keeping my current doctors",
  "Lower monthly cost",
  "Prescription costs",
  "Coverage when I travel",
  "A particular hospital",
] as const;
