/** Service counties confirmed by Christian in this release chat, October 9, 2026. */
export const CHECKLIST_SERVICE_COUNTIES = ["Guilford", "Alamance", "Wake", "Granville", "Randolph"] as const;
export function isChecklistServiceCounty(county: string): boolean {
  return (CHECKLIST_SERVICE_COUNTIES as readonly string[]).includes(county);
}
/** Verified official destinations, October 9, 2026. No ZIP-prefill parameters. */
export const PLAN_COMPARE_URL = "https://www.medicare.gov/plan-compare/";
export const SHIIP_CONTACT_URL = "https://www.ncdoi.gov/consumers/medicare-and-seniors-health-insurance-information-program-shiip/contact-seniors-health-insurance-information-program-shiip";
export const CHECKLIST_PRIORITIES = ["Keeping current doctors", "Monthly budget", "Prescription costs", "Travel", "Access to hospitals"] as const;
