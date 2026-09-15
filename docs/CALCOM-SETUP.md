# Cal.com setup handoff — updated September 15, 2026

**Activated and tested September 15, 2026.** All four topic calendars are connected to the live website. A clearly marked owner test booking was created, rescheduled and cancelled through the public Cal.com form; each state reached the Command Center. See [live verification](LIVE-VERIFICATION-2026-09-15.md) for evidence and remaining launch limits. No plan upgrade was needed.

Managed schedule: `2352081`. Active webhook: `ec347e01-408d-4eb5-9ae2-a6fcf4e02dc6`. The schedule was initially staged closed on September 10 and opened after the production endpoint was tested on September 15. Medicare introductions still require confirmation.

| Service                 | Event ID | Staged booking URL                                              |
| ----------------------- | -------- | --------------------------------------------------------------- |
| Medicare introduction   | 7026578  | https://cal.com/christianbrinkleync/medicare-questions          |
| Life insurance          | 7026579  | https://cal.com/christianbrinkleync/life-insurance-conversation |
| Care coverage           | 7026580  | https://cal.com/christianbrinkleync/care-coverage-conversation  |
| Retirement conversation | 7026581  | https://cal.com/christianbrinkleync/retirement-conversation     |

The setup key is in the ignored `.env.calcom-setup` file. Do not print, commit or copy it into public website variables. This setup key is separate from the webhook signing secret.

The current requirement is a 60-minute appointment starting at **9 a.m., 11 a.m., 1 p.m., 3 p.m. or 5 p.m. every day**, including Sunday, in `America/New_York`. The one-hour gaps come from separate availability windows. This setup does not depend on Outlook.

## Usage

Run `scripts/setup-calcom.mjs` with the bundled Node runtime. With no argument or `--preview`, it prints an offline plan and makes no network calls.

Keep the following only in an ignored environment file such as `.env.calcom`, loaded using Node’s `--env-file=.env.calcom` option:

- `CALCOM_API_KEY`: account API key; never put it in public website variables.
- `CALCOM_ORGANIZER_EMAIL`: authenticated organizer email, expected to be `christianbrinkley4@gmail.com`.
- `CALCOM_WEBHOOK_SECRET`: the same 32–256 character secret configured on the website backend.
- `CALCOM_WEBHOOK_URL`: the production HTTPS address ending in `/api/webhooks/cal`.
  Alternatively, `CALCOM_PRODUCTION_ORIGIN` may hold the plain HTTPS site origin; the script derives this endpoint from it.

Modes:

| Argument     | Behavior                                                                                                                                          |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--preview`  | Offline plan. No key needed.                                                                                                                      |
| `--inspect`  | Read-only account, schedule, event and webhook inventory; reports only safe counts and managed objects.                                           |
| `--stage`    | Creates or conservatively reuses one closed, non-default schedule, four hidden consultation events and one inactive webhook.                      |
| `--activate` | Requires `CALCOM_READY_TO_OPEN=true` after QA; enables the webhook, unhides only these events and opens the same schedule to the requested hours. |

The script never changes other schedules or the account’s default schedule. Exact name/slug collisions, altered managed settings and ambiguous objects stop setup. Its private state file contains IDs and setting fingerprints, not secrets. Failed writes are not automatically retried; inspect first to avoid duplicates.

## Verified API contract

The live [OpenAPI schema](https://cal.com/docs/api-reference/v2/openapi.json) currently specifies:

| Operation                   | Endpoint                                           | `cal-api-version`           |
| --------------------------- | -------------------------------------------------- | --------------------------- |
| Identity                    | `GET /v2/me`                                       | No version header specified |
| Schedule list/create/update | `/v2/schedules`, `/v2/schedules/{scheduleId}`      | `2024-06-11`                |
| Event list/create/update    | `/v2/event-types`, `/v2/event-types/{eventTypeId}` | `2026-06-12`                |
| Webhook list/create/update  | `/v2/webhooks`, `/v2/webhooks/{webhookId}`         | No version header specified |

All requests use `Authorization: Bearer <API key>`. Some search snippets still show an older event-type version; use the current raw documentation. [Authentication reference](https://cal.com/docs/api-reference/v2/introduction).

Locations use the documented values `{type:"attendeePhone"}`, `{type:"integration",integration:"cal-video"}` and `{type:"attendeeAddress"}`. The attendee supplies their own phone/address; no home address is invented or exposed as an organizer address. Cal Video is installed by default. The booker UI and location choices must still be tested. The API’s output schemas differ from its input schemas for some attendee-selected locations. [Event creation reference](https://cal.com/docs/api-reference/v2/event-types/create-an-event-type).

The webhook uses payload version `2021-10-20`, with no custom payload template, and the five booking events supported by the website. It excludes timer-based meeting-ended events. The newer ICS payload version is unnecessary for this integration. [Webhook reference](https://cal.com/docs/api-reference/v2/webhooks/create-a-webhook).

## Before opening

1. Confirm the free account can use these API endpoints. Cal’s current [pricing page](https://cal.com/pricing) includes unlimited individual event types, while its recent [API pricing explanation](https://cal.com/blog/calendly-api-vs-cal-com-api) says hosted API access requires a paid tier. If the account rejects API access, use the ordinary Cal UI to apply these same settings; the script never upgrades the plan or bypasses access controls.
2. Verify the selected Google calendar checks conflicts and receives new bookings. Existing Cal bookings must block all four event types. No Outlook connection is required by the user.
3. Inspect the staged event screens. Confirm the empty staging schedule offers no public slots, name/email fields work, phone/address appear when their location is selected, notes are hidden and no health information is requested. `hidden` alone does not close a booking URL.
4. Deploy the public webhook and set `CALCOM_EVENT_TYPES` using the actual returned ID-to-topic map. Verify a test booking, reschedule and cancellation, then remove test records.
5. Only then open the schedule. Ordinary insurance/retirement conversations have automatic confirmation and at least 24 hours’ notice. **Medicare remains an introductory request requiring personal confirmation**; required plan-specific appointment paperwork is a separate unresolved workflow. The script does not manufacture a Scope of Appointment or promote unrelated products in that Medicare conversation.

Cal’s normal booking confirmations remain enabled. This setup does not activate paid SMS, marketing campaigns or custom email workflows.
