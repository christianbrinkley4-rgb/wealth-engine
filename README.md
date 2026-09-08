# Triad Retirement Guidance

Next.js site with four lead funnels for Medicare, life insurance, and retirement guidance.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Copy `.env.example` to `.env.local` when testing integrations. Missing launch
configuration is reported but does not make the local health check fail.

## Production readiness

Set environment variables in the deployment platform; never commit `.env.local`
or service credentials.

- `NEXT_PUBLIC_SITE_URL`: final public HTTPS origin. Until valid, robots and
  page metadata prevent indexing.
- `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`: durable lead and reminder storage.
- At least one alert route:
  - `RESEND_API_KEY` + `RESEND_FROM` (also sends prospect and reminder email);
  - `MAKE_WEBHOOK_URL` (optionally signed with `MAKE_WEBHOOK_SECRET`); or
  - all of `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`,
    `TWILIO_FROM_NUMBER`, and `ALERT_SMS_TO`.
- `LEAD_NOTIFY_EMAIL`: alert recipient when Resend is used.
- `CRON_SECRET`: protects `/api/cron/reminders`; required with Supabase and
  Resend for complete reminder delivery.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY`: bot protection.
- Optional measurement: `NEXT_PUBLIC_META_PIXEL_ID`,
  `META_CAPI_ACCESS_TOKEN`, `NEXT_PUBLIC_GA4_ID`, and
  `NEXT_PUBLIC_NEXTDOOR_PIXEL_ID`.

Verified business inputs are deliberately not environment placeholders:

- `AGENT.npn` in `lib/agent.ts` is optional public information. Leave it null
  unless the agent chooses to publish a verified NPN.
- Set `MEDICARE_TPMO_SCOPE` after confirming Medicare contracting with the FMO
  or upline. If it is `multiple-organizations`, set the verified
  `TPMO_ORGANIZATION_COUNT` and `TPMO_PRODUCT_COUNT`; CMS does not require those
  counts for a TPMO selling for only one MA organization/Part D sponsor.
- Add only permissioned, verified entries to `lib/testimonials.ts`.
- Keep `SATURDAY_HOURS` in `lib/agent.ts` null until exact hours are confirmed.

The public, non-secret readiness endpoint returns HTTP 200 only when a
production deployment has no fatal blockers; otherwise it returns HTTP 503.
It exposes booleans and issue codes, never credential values.

```bash
curl --fail-with-body https://DEPLOYMENT_HOST/api/health
npx tsc --noEmit --pretty false
npx vitest run
npm run build
```

Before connecting a real domain, omit `NEXT_PUBLIC_SITE_URL`; the generated
preview origin is used for internally generated absolute URLs, while robots and
page metadata disallow indexing and do not treat it as the final public origin.
A preview deployment is not approval to promote Medicare content; confirm
`MEDICARE_TPMO_SCOPE` and obtain any required carrier/FMO advertising approval
first.
