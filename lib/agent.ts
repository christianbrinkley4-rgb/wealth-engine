/**
 * Single source of truth for who runs this site and what must be disclosed.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * ACTION REQUIRED — every value marked TODO must be verified before ads run.
 * Nothing else in the codebase hardcodes this information, so this is the only
 * file to edit when a license, carrier count, or phone number changes.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * The Medicare disclaimer below follows the federal TPMO rule. Confirm whether
 * the agent sells plans for one or multiple Medicare organizations with the FMO
 * or upline compliance desk before public Medicare marketing.
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

  /**
   * Optional public identifier. North Carolina requires a valid producer
   * license, but its general advertising rules do not require an NPN on a
   * public website. Set this only if the agent wants to publish it.
   */
  npn: null as string | null,

  /** TODO: states where you hold a resident/non-resident producer license. */
  licensedStates: ["North Carolina"],

  /**
   * Kept for the record, deliberately not printed anywhere.
   *
   * "Life and Accident & Health licensed in North Carolina" is how a licence
   * reads on a state database, not how anyone introduces themselves. On the
   * page it made a real agent sound like a form. The pages say "licensed
   * agent" and name the state; the lines of authority are a detail nobody
   * outside the industry has ever asked about.
   */
  linesOfAuthority: ["Life", "Accident & Health"],

  education: "Master’s student in Accounting at UNC Greensboro",

  /**
   * A stated promise you keep beats an implied one you break. National call
   * centers answer at 8pm on a Sunday; you can’t, so say what you actually do
   * instead of leaving people guessing.
   */
  hours: "Monday through Friday, 9am to 7pm, and Saturday mornings.",
  afterHoursPromise:
    "Call outside those hours and leave a message. I return calls first thing the next business day.",
} as const;

/** Add verified 24-hour times only when the exact Saturday window is known. */
export const SATURDAY_HOURS: { opens: string; closes: string } | null = null;

/**
 * CMS requires the standardized count disclaimer only for a TPMO that sells
 * plans on behalf of more than one MA organization or Part D sponsor. Do not
 * infer this from the number of insurers represented for non-Medicare products.
 */
export const MEDICARE_TPMO_SCOPE = "unconfirmed" as
  | "unconfirmed"
  | "one-organization"
  | "multiple-organizations";

export const TPMO_ORGANIZATION_COUNT: number | null = null;
export const TPMO_PRODUCT_COUNT: number | null = null;

const TPMO_BASE =
  "We do not offer every plan available in your area. Please contact " +
  "Medicare.gov, 1-800-MEDICARE, or your local State Health Insurance Program " +
  "(SHIP) to get information on all of your options.";

export const TPMO_DISCLAIMER =
  MEDICARE_TPMO_SCOPE === "multiple-organizations" &&
  TPMO_ORGANIZATION_COUNT != null &&
  TPMO_PRODUCT_COUNT != null
    ? "We do not offer every plan available in your area. Currently we represent " +
      `${TPMO_ORGANIZATION_COUNT} organizations which offer ${TPMO_PRODUCT_COUNT} products ` +
      "in your area. Please contact Medicare.gov, 1-800-MEDICARE, or your local " +
      "State Health Insurance Program (SHIP) to get information on all of your options."
    : TPMO_BASE;

/** True once the licensing details in AGENT have been filled in. */
export function hasPublishableNpn(): boolean {
  const value = AGENT.npn?.trim() ?? "";
  return /^\d{1,10}$/.test(value) && !/^0+$/.test(value);
}

/** Flags anything still unset, for the /api/health check and the build log. */
export function agentConfigGaps(): string[] {
  const gaps: string[] = [];
  if (MEDICARE_TPMO_SCOPE === "unconfirmed") {
    gaps.push("Medicare TPMO organization scope is unconfirmed");
  } else if (
    MEDICARE_TPMO_SCOPE === "multiple-organizations" &&
    (TPMO_ORGANIZATION_COUNT == null || TPMO_PRODUCT_COUNT == null)
  ) {
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

/**
 * the appropriate answer to the question every prospect is silently asking.
 *
 * Note the second sentence. An agent who represents a limited number of
 * carriers has to say so — it is the difference between a personal-brand site
 * and a misleading one, and it is separate from whether the carrier is named.
 * Saying it plainly also costs less than being caught not saying it: people
 * expect an agent to represent someone, and they trust the ones who volunteer
 * it first.
 */
export const COMPENSATION_DISCLOSURE =
  "I am a licensed insurance agent. There is no charge for talking with me. " +
  "I represent a limited number of insurance companies rather than the whole " +
  "market, so there will be plans I can’t show you — and I’ll tell you when " +
  "that’s the case rather than pretend otherwise. If you enroll in a plan or " +
  "buy a policy through me, the insurance company pays me a commission. Your " +
  "premium is not higher for using an agent. If what you need is something I " +
  "can’t offer, I’ll say so and point you toward who can.";

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
  `I’d like ${AGENT.name} to email me when my Medicare enrollment window opens. ` +
  "This is a reminder, not a request to be sold anything, and I can unsubscribe " +
  "at any time.";

export const CONSENT_TEXT =
  `${AGENT.name}, a licensed insurance agent, may call or email me about the ` +
  "topic I selected. I understand this is not a request to enroll and that I " +
  "can ask to be removed at any time. My information is not sold or shared " +
  "with other agents or lead companies.";
