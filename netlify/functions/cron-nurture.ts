/**
 * Netlify Scheduled Function — triggers the Next.js nurture cron route.
 *
 * Production runs on Netlify, where vercel.json crons do not execute, so this
 * function calls the route over HTTPS with the CRON_SECRET bearer token,
 * exactly like an external cron service would. The route itself enforces the
 * secret and refuses to run unauthenticated.
 *
 * Schedule: 13:00 UTC daily (9:00 AM Eastern during daylight time).
 */

export const config = { schedule: "0 13 * * *" };

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://christianbrinkleync.com"
).replace(/\/+$/, "");

export default async () => {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) {
    console.error("[cron-nurture] CRON_SECRET is not set; skipping run.");
    return new Response("CRON_SECRET not configured", { status: 500 });
  }

  const res = await fetch(`${SITE_URL}/api/cron/nurture`, {
    headers: { authorization: `Bearer ${secret}` },
  });
  const body = await res.text();
  console.log(`[cron-nurture] upstream ${res.status}: ${body.slice(0, 300)}`);
  return new Response(body, {
    status: res.status,
    headers: { "content-type": "application/json" },
  });
};
