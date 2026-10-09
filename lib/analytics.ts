/**
 * What this site is allowed to measure, and what it may say about a visit.
 *
 * Christian's promise is that an inquiry goes to him and nowhere else, and
 * Medicare marketing rules treat health and financial answers as nobody's
 * business but the household's. So measurement here is deliberately thin: a
 * named event, and the page it happened on. No answers, no dates of birth, no
 * income, no ZIP, no email, no phone number, not even hashed.
 *
 * The allow-list is the point. A future edit that adds `{ zip_code }` to an
 * event does not quietly start shipping it to Google; it fails the test that
 * guards this file.
 */

/** Every event the site may report, and what each one means. */
export const MEASURED_EVENTS = {
  /** A tap or click on any phone link, anywhere on the site. */
  phone_click: "phone_click",
  tool_start: "tool_start",
  tool_complete: "tool_complete",
  cta_click: "cta_click",
  official_handoff_click: "official_handoff_click",
  ask_submit: "ask_submit",
  guide_signup: "guide_signup",
  checklist_start: "checklist_start",
  checklist_complete: "checklist_complete",
  /** Someone completed the Medicare date tool and saw their dates. */
  timeline_complete: "timeline_complete",
  /** Someone asked for their dates by email from the date tool. */
  timeline_email_request: "timeline_email_request",
  /**
   * A completed inquiry, counted once: on the thank-you page, or when a quiz's
   * email capture succeeds (the plan check's short path never reaches
   * thank-you, and it is still a real request to hear from Christian).
   */
  generate_lead: "generate_lead",
  /** Someone pressed start on a quiz. */
  quiz_start: "quiz_start",
  /** Someone answered one step of a quiz. Carries the step number, never the answer. */
  quiz_step: "quiz_step",
  /** Someone left a quiz they had started without reaching the end. */
  quiz_abandon: "quiz_abandon",
  /** Someone reached the result screen of a quiz. */
  quiz_complete: "quiz_complete",
  /** The embedded booking calendar was shown to someone. */
  booking_open: "booking_open",
  /** Browser diagnostic only. booking_confirmed from the webhook is the booking key event. */
  booking_complete: "booking_complete",
  /** A tap on a "next step" link at the end of a Learning Hub article. */
  article_cta_click: "article_cta_click",
  /** Someone opened the past-client review page. Never carries who they are. */
  review_page_view: "review_page_view",
  /** Someone tapped the button that goes to Google's review box. */
  review_click: "review_click",
} as const;

export type MeasuredEvent = keyof typeof MEASURED_EVENTS;

export function isMeasuredEvent(name: string): name is MeasuredEvent {
  return Object.hasOwn(MEASURED_EVENTS, name);
}

/** The quizzes that report their steps. A quiz id names a tool, never a person. */
export const QUIZ_IDS = ["plan_check", "help_request", "medigap_or_advantage", "roth_conversion", "cd_or_savings"] as const;
export type QuizId = (typeof QUIZ_IDS)[number];

export function isQuizId(value: unknown): value is QuizId {
  return typeof value === "string" && (QUIZ_IDS as readonly string[]).includes(value);
}

/**
 * Where a visit to the review page came from. A label for a kind of link
 * Christian hands out, never a person: "meeting" is the thank-you link he sends
 * after a visit, "card" is the QR code, "text" is the link he texts.
 */
export const REVIEW_SOURCES = ["meeting", "card", "text"] as const;
export type ReviewSource = (typeof REVIEW_SOURCES)[number];

export function isReviewSource(value: unknown): value is ReviewSource {
  return typeof value === "string" && (REVIEW_SOURCES as readonly string[]).includes(value);
}

export const TOOL_IDS = ["roth_vs_traditional", "emergency_fund", "debt_payoff", "retirement_projector", "take_home_pay", "life_insurance_needs", "compound_interest", "budget", "roth_conversion_ladder"] as const;
export type ToolId = (typeof TOOL_IDS)[number];
export const CTA_IDS = ["plan_check", "ask_question", "book_time"] as const;
export const CTA_LOCATIONS = ["header", "hero", "sticky_bar", "page_close", "article_end", "inline", "menu", "tool_result"] as const;
export type CtaLocation = (typeof CTA_LOCATIONS)[number];
export const DESTINATIONS = ["medicare_plan_compare", "medicare_gov", "ssa_gov", "nc_shiip"] as const;
export const LIST_IDS = ["guides", "drops"] as const;
const FIXED_LABELS = { tool_id: TOOL_IDS, cta_id: CTA_IDS, cta_location: CTA_LOCATIONS, destination: DESTINATIONS, list_id: LIST_IDS };

export function ctaDetail(href: string, location: CtaLocation): EventDetail | undefined {
  const path = href.split(/[?#]/)[0];
  const cta_id = path === "/plan-check" ? "plan_check" : path === "/start" ? "ask_question" : path === "/schedule" ? "book_time" : undefined;
  return cta_id ? { cta_id, cta_location: location } : undefined;
}

/** What an event may say beyond the page: which quiz, which step, which review link. */
export type EventDetail = {
  quiz_id?: QuizId; step?: number; review_source?: ReviewSource;
  tool_id?: ToolId;
  cta_id?: (typeof CTA_IDS)[number];
  cta_location?: CtaLocation;
  destination?: (typeof DESTINATIONS)[number];
  list_id?: (typeof LIST_IDS)[number];
};

type EventParams = { page_path: string } & EventDetail;

/**
 * The page path, with anything a visitor typed removed.
 *
 * A query string on this site can carry a topic, a campaign, or, if a link is
 * ever built carelessly, something personal. None of it belongs in an
 * analytics hit, so only the path survives, capped in case of a long slug.
 */
export function safePagePath(url: string): string {
  const path = url.split("#")[0].split("?")[0].trim();
  if (!path.startsWith("/")) return "/";
  return path.slice(0, 120);
}

/**
 * The parameters an event may carry. Anything else is dropped: an unknown
 * quiz id, a step that is not a small whole number, or any other key a caller
 * slipped in.
 */
export function eventParams(
  pagePath: string,
  detail?: EventDetail,
): EventParams {
  const params: EventParams = {
    page_path: safePagePath(pagePath),
  };
  if (detail && isReviewSource(detail.review_source)) params.review_source = detail.review_source;
  if (detail && isQuizId(detail.quiz_id)) params.quiz_id = detail.quiz_id;
  if (detail && Number.isInteger(detail.step) && detail.step! >= 0 && detail.step! <= 50) {
    params.step = detail.step;
  }
  for (const [key, allowed] of Object.entries(FIXED_LABELS)) {
    const value = detail?.[key as keyof EventDetail];
    if (typeof value === "string" && (allowed as readonly string[]).includes(value)) {
      Object.assign(params, { [key]: value });
    }
  }
  return params;
}

/**
 * Google Ads counts a conversion by "send_to": the account id and the label of
 * one conversion action. Both come from settings, so an unconfigured site
 * reports nothing rather than guessing an id.
 */
export function conversionTarget(
  adsId: string | undefined,
  label: string | undefined,
): string | null {
  const account = (adsId ?? "").trim();
  const action = (label ?? "").trim();
  if (!/^AW-[A-Za-z0-9]+$/.test(account) || !action) return null;
  return `${account}/${action}`;
}

/** Which measurement providers are switched on, for the privacy notice. */
export function measurementProviders(env: Record<string, string | undefined>): string[] {
  const providers: string[] = [];
  if ((env.NEXT_PUBLIC_GA4_ID ?? "").trim()) providers.push("Google Analytics");
  if ((env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "").trim())
    providers.push("Google Ads conversion tracking");
  if (env.NEXT_PUBLIC_META_ADS_ALLOWED === "true" && (env.NEXT_PUBLIC_META_PIXEL_ID ?? "").trim()) {
    providers.push("Meta Pixel");
  }
  if ((env.NEXT_PUBLIC_NEXTDOOR_PIXEL_ID ?? "").trim()) providers.push("Nextdoor");
  if (env.NEXT_PUBLIC_SIMPLE_ANALYTICS === "true") providers.push("Simple Analytics");
  return providers;
}
