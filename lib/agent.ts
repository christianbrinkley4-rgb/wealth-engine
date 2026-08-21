/**
 * Single source of truth for who runs this site and what must be disclosed.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * ACTION REQUIRED — every value marked TODO must be filled in before ads run.
 * Nothing else in the codebase hardcodes this information, so this is the only
 * file to edit when a license, carrier count, or phone number changes.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * The Medicare disclaimers below reproduce the language CMS requires of Third
 * Party Marketing Organizations. Confirm the exact wording and the plan/carrier
 * counts with your FMO or upline compliance desk before launch — the counts
 * change whenever your contracts change.
 */

export const AGENT = {
  name: "Christian Brinkley",
  city: "Greensboro",
  state: "NC",
  region: "Piedmont Triad",

  phone: "(919) 408-6671",
  phoneHref: "tel:+19194086671",
  email: "christianbrinkley4@gmail.com",

  /** Booking link shown on the thank-you page and in the auto-response email. */
  schedulingUrl: "https://calendly.com/christianbrinkley4/30min",

  /** TODO: your National Producer Number. Shown in the footer disclosure. */
  npn: "TODO_NPN",

  /** TODO: states where you hold a resident/non-resident producer license. */
  licensedStates: ["North Carolina"],

  /** TODO: the lines of authority on your license. */
  linesOfAuthority: ["Life", "Accident & Health"],

  education: "Master's in Accounting, UNC Greensboro",
} as const;

/**
 * TODO: set both counts to your actual contracted numbers, then have your FMO
 * confirm the sentence. CMS expects this on Medicare marketing materials from a
 * TPMO that does not offer every plan in the area.
 *
 * Until the counts are filled in, the site renders the disclaimer WITHOUT the
 * "we represent N organizations" sentence rather than printing a placeholder.
 * A visible "[TODO]" on a licensed agent's disclosure is worse than the shorter
 * version, but the shorter version is still incomplete — fill these in.
 */
export const TPMO_ORGANIZATION_COUNT: number | null = null;
export const TPMO_PRODUCT_COUNT: number | null = null;

const TPMO_BASE =
  "We do not offer every plan available in your area. Please contact " +
  "Medicare.gov, 1-800-MEDICARE, or your local State Health Insurance Program " +
  "(SHIP) to get information on all of your options.";

export const TPMO_DISCLAIMER =
  TPMO_ORGANIZATION_COUNT != null && TPMO_PRODUCT_COUNT != null
    ? "We do not offer every plan available in your area. Currently we represent " +
      `${TPMO_ORGANIZATION_COUNT} organizations which offer ${TPMO_PRODUCT_COUNT} products ` +
      "in your area. Please contact Medicare.gov, 1-800-MEDICARE, or your local " +
      "State Health Insurance Program (SHIP) to get information on all of your options."
    : TPMO_BASE;

/** True once the licensing details in AGENT have been filled in. */
export function hasPublishableNpn(): boolean {
  return !AGENT.npn.startsWith("TODO");
}

/** Flags anything still unset, for the /api/health check and the build log. */
export function agentConfigGaps(): string[] {
  const gaps: string[] = [];
  if (!hasPublishableNpn()) gaps.push("AGENT.npn is still a placeholder");
  if (TPMO_ORGANIZATION_COUNT == null || TPMO_PRODUCT_COUNT == null) {
    gaps.push("TPMO carrier/product counts are not set");
  }
  return gaps;
}

/** Required on any Medicare-related marketing material. */
export const GOVERNMENT_DISCLAIMER =
  "Not connected with or endorsed by the United States government or the " +
  "federal Medicare program.";

/** Shown wherever a calculator produces a dollar figure. */
export const ESTIMATE_DISCLAIMER =
  "Figures on this page are estimates for education only, not a quote, a " +
  "benefit determination, or tax advice. Medicare premiums, tax rules, and " +
  "policy terms change. Confirm anything that matters to your household at " +
  "Medicare.gov or with a professional you choose.";

/** The honest answer to the question every prospect is silently asking. */
export const COMPENSATION_DISCLOSURE =
  "I am a licensed insurance agent. There is no charge for talking with me. " +
  "If you decide to enroll in a plan or buy a policy through me, the insurance " +
  "company pays me a commission — the same commission whether you enroll " +
  "through me, through another agent, or on your own. Your premium is not " +
  "higher for using an agent. If what you need is something I don't sell, I " +
  "will tell you that and point you to who does.";

/**
 * The exact consent sentence shown next to the checkbox. Stored verbatim on
 * every lead row so you can prove what a person agreed to and when.
 * Bump CONSENT_VERSION whenever this wording changes.
 */
export const CONSENT_VERSION = "2026-08-21.v1";

/**
 * SMS gets its own checkbox. Permission to call and email is not permission to
 * text, and the carriers' own rules expect frequency, rates, and STOP wording
 * to appear at the point of opt-in.
 */
export const SMS_CONSENT_TEXT =
  `I agree that ${AGENT.name} may send me text messages about the topic I ` +
  "selected. Message frequency varies; message and data rates may apply. " +
  "Reply STOP to opt out or HELP for help. Consent to texts is not a condition " +
  "of any purchase.";

/** The lighter-weight promise made on the reminder form. */
export const REMINDER_CONSENT_TEXT =
  `I'd like ${AGENT.name} to email me when my Medicare enrollment window opens. ` +
  "This is a reminder, not a request to be sold anything, and I can unsubscribe " +
  "at any time.";

export const CONSENT_TEXT =
  `${AGENT.name}, a licensed insurance agent, may call or email me about the ` +
  "topic I selected. I understand this is not a request to enroll and that I " +
  "can ask to be removed at any time. My information is not sold or shared " +
  "with other agents or lead companies.";
