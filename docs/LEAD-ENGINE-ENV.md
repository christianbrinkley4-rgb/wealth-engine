# Lead capture environment

No credentials belong in Git or client bundles. Set server secrets in the hosting environment.

```dotenv
LEAD_ENGINE_ENVIRONMENT=staging
LEAD_ENGINE_STORAGE=neon
LEAD_ENGINE_DATABASE_URL=
LEAD_ENGINE_CAPTURE_ENABLED=false
LEAD_ENGINE_ALERTS_ENABLED=false
LEAD_ENGINE_CRON_SECRET=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
RESEND_API_KEY=
RESEND_FROM=
LEAD_NOTIFY_EMAIL=
# Required only in production. Exact HTTPS origin, without a trailing slash.
LEAD_ENGINE_PRODUCTION_ORIGIN=https://christianbrinkleync.com
```

The alternative `LEAD_ENGINE_STORAGE=supabase` requires `LEAD_ENGINE_SUPABASE_URL` and `LEAD_ENGINE_SERVICE_ROLE_KEY` instead of the Neon connection. Never reuse production CRM credentials for staging.

The authorized Vercel Preview uses the isolated free Neon project `icy-silence-43544883`, database `lead_engine`. Only synthetic contacts belong there. It uses Cloudflare's documented test keys and sends approved synthetic owner alerts through Resend only. Production settings were not changed.

Apply `supabase/lead-engine-schema.sql` once to a fresh dedicated Postgres database. Despite the directory name, the schema supports both providers. It creates new tables and functions and is not a repeatable migration.

Run `node scripts/check-lead-engine.mjs` with the target environment loaded. This prints names and booleans only. The API also checks readiness before capture. Production rejects staging mode, test CAPTCHA keys, missing notification configuration, missing retry secret, and an invalid production origin. A successful readiness report is configuration evidence, not delivery proof.

For production, configure real Turnstile keys, separate approved storage, verified owner notification senders, a retry scheduler, queue monitoring, and the exact public origin. Enable alerts only within an approved no-cost allowance or after spend approval. Verify actual delivery before Christian gives the separate production release order.

Christian selected Resend email only. Capture queues one email job per lead. No SMS provider is called. `supabase/lead-engine-email-only.sql` transitions the earlier synthetic two-channel staging schema without deleting its records. Apply that transition only to that earlier schema, not after a fresh install of the current schema.
