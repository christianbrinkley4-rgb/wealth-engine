/**
 * Netlify Scheduled Function — triggers the Next.js enrollment-reminder cron route.
 *
 * Production runs on Netlify, where vercel.json crons do not execute. This
 * function was added alongside the nurture scheduler because the reminders
 * route had the same gap: it was designed for Vercel Cron but the live site
 * is served by Netlify, so its daily run was never firing either.
 *
 * Schedule: 14:00 UTC daily (10:00 AM Eastern during daylight time).
 */

export const config = { schedule: "0 14 * * *" };

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://christianbrinkleync.com"
).replace(/\/+$/, "");

export default async () => {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) {
    console.error("[cron-reminders] CRON_SECRET is not set; skipping run.");
    return new Response("CRON_SECRET not configured", { status: 500 });
  }

  const res = await fetch(`${SITE_URL}/api/cron/reminders`, {
    headers: { authorization: `Bearer ${secret}` },
  });
  const body = await res.text();
  console.log(`[cron-reminders] upstream ${res.status}: ${body.slice(0, 300)}`);
  return new Response(body, {
    status: res.status,
    headers: { "content-type": "application/json" },
  });
};
