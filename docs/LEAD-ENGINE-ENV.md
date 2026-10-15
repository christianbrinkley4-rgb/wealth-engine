# Staging environment

Template only. No credentials are included.

```dotenv
# Use a dedicated staging database. No real credentials belong in Git.
LEAD_ENGINE_CAPTURE_ENABLED=false
LEAD_ENGINE_SUPABASE_URL=
LEAD_ENGINE_SERVICE_ROLE_KEY=
# Enables owner email/SMS provider calls. Leave false until spend is approved.
LEAD_ENGINE_ALERTS_ENABLED=false
LEAD_ENGINE_CRON_SECRET=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
RESEND_API_KEY=
RESEND_FROM=
LEAD_NOTIFY_EMAIL=christianbrinkley4@gmail.com
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_FROM_NUMBER=
ALERT_SMS_TO=+19194086671
```

See the staging runbook delivered with this branch.
