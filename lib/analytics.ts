/**
 * What this site is allowed to measure, and what it may say about a visit.
 *
 * Christian's promise is that an inquiry goes to him and nowhere else, and
 * Medicare marketing rules treat health and financial answers as nobody's
 * business but the household's. So measurement here is deliberately thin: a
 * named event, and the page it happened on. No answers, no dates of birth, no
 * income, no ZIP, no email, no phone number — not even hashed.
 *
 * The allow-list is the point. A future edit that adds `{ zip_code }` to an
 * event does not quietly start shipping it to Google; it fails the test that
 * guards this file.
 */

/** Every event the site may report, and what each one means. */
export const MEASURED_EVENTS = {
  /** A tap or click on any phone link, anywhere on the site. */
  phone_click: "phone_click",
  /** Someone completed the Medicare date tool and saw their dates. */
  timeline_complete: "timeline_complete",
  /** Someone asked for their dates by email from the date tool. */
  timeline_email_request: "timeline_email_request",
  /** A completed inquiry, counted once on the thank-you page. */
  generate_lead: "generate_lead",
} as const;

export type MeasuredEvent = keyof typeof MEASURED_EVENTS;

export function isMeasuredEvent(name: string): name is MeasuredEvent {
  return Object.hasOwn(MEASURED_EVENTS, name);
}

/**
 * The page path, with anything a visitor typed removed.
 *
 * A query string on this site can carry a topic, a campaign, or — if a link is
 * ever built carelessly — something personal. None of it belongs in an
 * analytics hit, so only the path survives, capped in case of a long slug.
 */
export function safePagePath(url: string): string {
  const path = url.split("#")[0].split("?")[0].trim();
  if (!path.startsWith("/")) return "/";
  return path.slice(0, 120);
}

/** The parameters an event may carry. Anything else is dropped. */
export function eventParams(pagePath: string): { page_path: string } {
  return { page_path: safePagePath(pagePath) };
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
