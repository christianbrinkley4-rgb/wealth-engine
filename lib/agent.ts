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

export type SocialNetwork =
  | "facebook"
  | "instagram"
  | "tiktok"
  | "threads"
  | "youtube"
  | "linkedin"
  | "nextdoor"
  | "google"
  | "yelp";

export type SocialProfile = {
  readonly network: SocialNetwork;
  readonly label: string;
  readonly url: string | null;
};

/**
 * Verified public profiles used as on-page links and schema.org `sameAs`.
 * Publish only listings that do not present Bankers Life as related to this
 * site. The Google listing below is titled "Christian Brinkley", category
 * Insurance agent, website christianbrinkleync.com, phone (336) 365-7422.
 *
 * Never publish the Bankers-titled Maps CID 10422520109754041632,
 * agents.bankerslife.com, branches.bankerslife.com, or a bankers-life-agent
 * Nextdoor page.
 */
export const GOOGLE_MAPS_CID = "12304450181097673337";
export const GOOGLE_MAPS_PROFILE_URL = `https://www.google.com/maps?cid=${GOOGLE_MAPS_CID}`;
/** Independent GBP Place ID — use for review asks; never invent a second listing. */
export const GOOGLE_PLACE_ID = "ChIJCYLxNHVn4U0ReVLReD8wwqo";
export const GOOGLE_WRITE_REVIEW_URL = `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`;

export const SOCIAL_PROFILES: readonly SocialProfile[] = [
  {
    network: "facebook",
    label: "Facebook",
    url: "https://www.facebook.com/p/Christian-Brinkley-Greensboro-Retirement-Resource-61566655540080/",
  },
  {
    network: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com/christianbrinkleync",
  },
  {
    network: "tiktok",
    label: "TikTok",
    url: "https://www.tiktok.com/@4ssxsssia9w",
  },
  {
    network: "threads",
    label: "Threads",
    url: "https://www.threads.com/@christianbrinkleync",
  },
  {
    network: "youtube",
    label: "YouTube",
    url: "https://www.youtube.com/@christianbrinkleync",
  },
  {
    network: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/christianbrinkley",
  },
  {
    network: "nextdoor",
    label: "Nextdoor",
    url: "https://nextdoor.com/page/christian-brinkley/",
  },
  { network: "google", label: "Google", url: GOOGLE_MAPS_PROFILE_URL },
  { network: "yelp", label: "Yelp", url: null },
];

export type PublishedSocialProfile = SocialProfile & { readonly url: string };

/** Profiles that have a confirmed URL, for on-page links and schema. */
export function publishedProfiles(): PublishedSocialProfile[] {
  return SOCIAL_PROFILES.filter((profile): profile is PublishedSocialProfile =>
    Boolean(profile.url),
  );
}

export const AGENT = {
  name: "Christian Brinkley",
  city: "Greensboro",
  state: "NC",
  region: "Piedmont Triad",

  phone: "(336) 365-7422",
  phoneHref: "tel:+13363657422",
  email: "christianbrinkley4@gmail.com",

  /** Booking link shown on the thank-you page and in the auto-response email. */
  schedulingUrl: "/schedule",

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

  education: "Accounting master’s student at UNCG — expected completion June 2027",

  /**
   * A stated promise you keep beats an implied one you break. National call
   * centers answer at 8pm on a Sunday; you can’t, so say what you actually do
   * instead of leaving people guessing.
   */
  hours: "Calls and appointments 8am to 7pm, Monday through Saturday, Eastern time.",

  /**
   * The same hours in the form schema.org wants. These must keep matching the
   * Google Business Profile: a search engine that sees one set of hours on the
   * profile and another in the markup trusts neither, and it is the profile,
   * not the site, that decides most "medicare agent near me" results.
   */
  businessHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as readonly string[],
    opens: "08:00",
    closes: "19:00",
  },
  afterHoursPromise:
    "If I’m with a family or away from the phone, leave a message and I’ll follow up personally.",

  /**
   * Published profile URLs for schema.org `sameAs`. Derived from
   * SOCIAL_PROFILES so the markup never lists an unpublished network.
   */
  profiles: publishedProfiles().map((profile) => profile.url),

  /**
   * Homepage trust details. Each renders only once it is filled in, so an
   * empty value never shows up as a placeholder on the live site.
   *
   * introVideoUrl: a short vertical phone video of Christian introducing
   *   himself, as a file under /public (for example "/hello.mp4").
   * credentials: things that are true today, e.g. "AHIP certified for 2027".
   * advisorPartner: the advisor's name and credential, only with their permission.
   */
  introVideoUrl: null as string | null,
  credentials: [] as readonly string[],
  advisorPartner: null as string | null,
} as const;

/**
 * Confirmed by Christian on 2026-09-18 and set to match the Google Business
 * Profile. Derived from businessHours so the two can never disagree.
 */
export const SATURDAY_HOURS: { opens: string; closes: string } | null =
  AGENT.businessHours.days.includes("Saturday")
    ? { opens: AGENT.businessHours.opens, closes: AGENT.businessHours.closes }
    : null;

/**
 * CMS requires the standardized count disclaimer only for a TPMO that sells
 * plans on behalf of more than one MA organization or Part D sponsor. Do not
 * infer this from the number of insurers represented for non-Medicare products.
 */
// Guilford County MA, Medicare.gov Plan Compare ZIP 27401, 2026, SNPs off.
// Bankers NC availability: Aetna, Alignment, BCBS NC, Devoted, HealthSpring,
// Humana, UHC, WellCare. Excludes HealthTeam Advantage and other local orgs.
export const MEDICARE_TPMO_SCOPE = "multiple-organizations" as
  | "unconfirmed"
  | "one-organization"
  | "multiple-organizations";

export const TPMO_ORGANIZATION_COUNT: number | null = 8;
export const TPMO_PRODUCT_COUNT: number | null = 56;

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
