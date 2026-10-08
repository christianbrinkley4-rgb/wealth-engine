# Deploy checklist: christianbrinkleync.com

Checklist to run before and after every production deploy (Netlify builds the
`master` branch).

## robots.txt indexability

`app/robots.ts` serves one of two robots.txt bodies based on the exported
`SITE_INDEXABLE` flag in `lib/seo.ts` (line ~92):

- `SITE_INDEXABLE = true` → allow-all (`Allow: /`, `Disallow: /api/` only, plus
  per-AI-crawler rules and the sitemap line).
- `SITE_INDEXABLE = false` → `User-agent: * / Disallow: /` (the whole site is
  deindexed until the flag flips true).

`SITE_INDEXABLE = SITE_URL_CONFIGURED && TPMO_MARKETING_CONFIGURED && LEAD_CAPTURE_CONFIGURED`.
All three must hold. The TPMO leg is code constants; the other two are
environment variables that MUST be set in the Netlify dashboard
(Site settings → Environment variables) **before** the build, because
`NEXT_PUBLIC_*` values are baked in at build time. Setting them after a build
does nothing until the next rebuild.

### 1. Site URL (required)

| Env var | Requirement |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Exact production HTTPS origin, no path, no query, no hash. Example form: `https://www.christianbrinkleync.com` |

Rejected values (the page silently deindexes): localhost, 127.0.0.1, private
IPs (10./192.168./169.254./172.16–31.), `.local` / `.test` / `.invalid` /
`.example` hosts, `example.com`, anything containing "your-domain" or
"placeholder", http:// (non-HTTPS), or a URL with a path/query/hash. Netlify
preview URLs (`*.netlify.app`, deploy-preview URLs) are not valid substitutes.

**Critical:** `netlify.toml` does NOT set this variable. If it is missing from
the Netlify dashboard, every production build ships `Disallow: /`.

### 2. TPMO marketing configuration (code constants, not env vars)

These are hardcoded in `lib/agent.ts` and ship with the code:

- `MEDICARE_TPMO_SCOPE = "multiple-organizations"` (line ~210)
- `TPMO_ORGANIZATION_COUNT = 8` (line ~217)
- `TPMO_PRODUCT_COUNT = 65` (line ~218)

They satisfy `TPMO_MARKETING_CONFIGURED` as written. No env var exists for
them; changing them requires a code edit and a rebuild. If the scope were ever
reverted to `"unconfirmed"`, the site deindexes regardless of env vars.

### 3. Lead capture (at least ONE of these groups must be fully set)

Every value must be non-empty and must not look like a placeholder
(words like "replace", "placeholder", "your_" are rejected). The
`COMMAND_CENTER_INGEST_KEY`, when used, must be exactly 64 lowercase hex
characters (`/^[a-f0-9]{64}$/`).

| Group | Env vars (all required within the group) |
|---|---|
| Command Center ingest | `COMMAND_CENTER_INGEST_URL`, `COMMAND_CENTER_INGEST_KEY` |
| Supabase | `SUPABASE_URL` (or `NEXT_PUBLIC_SUPABASE_URL`), `SUPABASE_SERVICE_ROLE_KEY` |
| Resend | `RESEND_API_KEY`, `RESEND_FROM` |
| Make/Zapier webhook | `MAKE_WEBHOOK_URL` |
| Twilio SMS alerts | `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER`, `ALERT_SMS_TO` |

### Verify after deploy

1. Fetch the live robots.txt:
   `curl -s https://<production-domain>/robots.txt`
2. Confirm it is allow-all: look for `Allow: /` under `User-agent: *` and the
   `Sitemap: https://<production-domain>/sitemap.xml` line. `Disallow: /api/`
   entries are expected and fine.
3. Fail check: if the output is only `User-agent: *` / `Disallow: /`, one of
   the three legs above is false. Check `/api/health` for the reported config
   gaps, fix the missing env var or constant, and rebuild.
4. Also confirm `/sitemap.xml` returns 200 and contains the canonical domain
   (not localhost).
