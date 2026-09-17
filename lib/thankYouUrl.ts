/**
 * Builds the post-capture thank-you URL.
 *
 * Deliberately carries no email address. A URL parameter ends up in browser
 * history, in server logs, and — once a tracking pixel is installed — in the
 * page URL reported to the ad platform, which is both a privacy problem and a
 * data-use violation on their side.
 */
export function thankYouUrl(input: {
  source: string;
  topic?: string;
  eventId?: string;
  /** False when no email provider is configured, so the page can adjust. */
  emailConfigured?: boolean;
}) {
  const params = new URLSearchParams({ source: input.source });
  if (input.topic) params.set("topic", input.topic);
  // Pixel deduplication id only — random, not derived from anything personal.
  if (input.eventId) params.set("eid", input.eventId);
  if (input.emailConfigured === false) params.set("noemail", "1");
  return `/thank-you?${params.toString()}`;
}
