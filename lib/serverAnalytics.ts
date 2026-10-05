/**
 * Server-side events for things that happen off the page: a booking made in
 * the Cal.com calendar reaches this site only through its webhook, so this is
 * where it gets counted when the browser never saw the confirmation (someone
 * booked from an email link, or closed the tab before the calendar said so).
 *
 * Uses the GA4 Measurement Protocol, and stays switched off until both
 * NEXT_PUBLIC_GA4_ID and GA4_API_SECRET are set. Nothing about the person is
 * sent: no name, email, phone, time, or answer. Only the event name and the
 * topic the calendar belongs to. The client id is random per event, because
 * tying it to the visitor would need an identifier this site does not keep.
 */

const GA4_ENDPOINT = "https://www.google-analytics.com/mp/collect";

export const SERVER_EVENTS = ["booking_confirmed"] as const;
export type ServerEvent = (typeof SERVER_EVENTS)[number];

const TOPICS = ["medicare", "life_insurance", "care_coverage", "financial_planning"] as const;

export function serverAnalyticsConfig(env: Record<string, string | undefined> = process.env) {
  const measurementId = (env.NEXT_PUBLIC_GA4_ID ?? "").trim();
  const apiSecret = (env.GA4_API_SECRET ?? "").trim();
  if (!/^G-[A-Z0-9]+$/i.test(measurementId) || !apiSecret) return null;
  return { measurementId, apiSecret };
}

/** The request body. Exported so a test can prove what is (and isn't) sent. */
export function serverEventBody(event: ServerEvent, topic: string | null, clientId: string) {
  const safeTopic = (TOPICS as readonly string[]).includes(topic ?? "") ? topic : "unknown";
  return {
    client_id: clientId,
    non_personalized_ads: true,
    events: [{ name: event, params: { topic: safeTopic, engagement_time_msec: 1 } }],
  };
}

/** Best effort. A measurement failure must never fail the webhook that called it. */
export async function sendServerEvent(
  event: ServerEvent,
  topic: string | null,
  env: Record<string, string | undefined> = process.env,
): Promise<boolean> {
  const config = serverAnalyticsConfig(env);
  if (!config) return false;
  const clientId = `${Math.floor(Math.random() * 1e10)}.${Math.floor(Date.now() / 1000)}`;
  try {
    const url = `${GA4_ENDPOINT}?measurement_id=${encodeURIComponent(config.measurementId)}&api_secret=${encodeURIComponent(config.apiSecret)}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(serverEventBody(event, topic, clientId)),
      cache: "no-store",
      signal: AbortSignal.timeout(4_000),
    });
    return response.ok;
  } catch {
    return false;
  }
}
