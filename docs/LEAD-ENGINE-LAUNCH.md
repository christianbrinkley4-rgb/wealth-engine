# Christian Brinkley’s consultation website

Updated September 15, 2026.

**Current live status:** The owned .com is on Netlify with valid HTTPS. Inquiry storage, owner alerts and visitor acknowledgments passed a live delivery test. All four Cal.com topic calendars are connected; a real owner test booking, reschedule and cancellation reached the Command Center. Google domain ownership is verified. See [the September 15 evidence and outstanding work](LIVE-VERIFICATION-2026-09-15.md). The September 10 setup notes below are historical and do not describe current deployment status. Search indexing remains closed pending the approved Medicare disclosure.

Website wording follows [the visitor copy guide](CONTENT-VOICE.md): clear, natural language for people approaching retirement, people already retired, and their families. Local pages explain personal help and ways to meet, without website-building language or pressure to buy. The `/remind-me` page now offers the working calendar date tool; it does not promise reminder emails before that service is connected.

The offer is a no-cost, no-obligation insurance consultation with a local person: Christian Brinkley, a UNCG accounting master’s student who meets families at home, at a convenient public location, by phone, or by video and wants to remain their contact throughout retirement. Medicare is the main introduction for turning-65 households. Life insurance, care coverage, critical illness insurance, and annuities are available conversations when the visitor asks about them. Financial planning is coordinated through an advisor; the site does not present future CPA/CFP credentials as current qualifications.

## What is implemented

- A personal homepage using Christian’s real photo, clear local identity, and consultation invitations.
- A Medicare date tool that works before a visitor shares contact information, including the first-of-month birthday rule, printable dates, and calendar downloads. The tool does not save birth details.
- A consultation form with relevant questions, home/public-location/phone/video/email preferences, optional preferred times, and separate call/email and text permission records.
- A care and critical illness page and question path, plus an annuity option within the retirement conversation.
- Direct capture into the **existing T65 Daily Command Center**, assigned to Christian. A single transaction records the inquiry, links or creates a lead, adds an activity, and creates a pending follow-up task.
- Campaign information and the exact permission wording accompany each inquiry. Matching uses email or phone. An ambiguous match is flagged for review. Existing lead ownership, notes, status, and contact restrictions are not rewritten.
- Identical submissions within one UTC day do not create repeated tasks. A restricted contact is held for review; automatic prospect replies are suppressed on that path.
- Protected ingress: the public website has a separate server key that can submit inquiries, not download the command-center list. The integration’s tables and database function are unavailable to anonymous and ordinary signed-in API callers.
- Three pre-existing duplicate-review database views now enforce row permissions and no longer grant anonymous access.
- Topic-specific booking links for Medicare, life insurance, care coverage, and retirement questions. The thank-you page and prospect email preserve the selected topic without putting contact details or answers in a URL.
- A signed Cal.com webhook endpoint and appointment synchronization code. These still require actual event IDs, organizer settings, the appointment migration/ingress, and an end-to-end provider test before they can be called live.

The connection is configured in the local preview. An end-to-end submission from the website to the live command center passed: the inquiry was assigned to Christian, its answers and permission records were saved, and submitting it twice created only one follow-up task. All temporary test records were removed. On September 10, both connection settings were also saved as protected Production secrets in the existing Vercel project. They take effect on a new deployment; the updated website code has not been deployed yet.

Earlier validation, before the latest booking and delivery changes: 143 automated tests passed, lint passed, and the production build generated all 102 pages successfully. The homepage and consultation flow were also reviewed at desktop and phone sizes, with no horizontal overflow. Rerun the final checks for the current code before deployment; these earlier results are not verification of the new external connections. The public Vercel website has not been updated yet.

## One-time setup still needed

| Item                           | Why it matters                                                            | Setting or action                                                                                                                            |
| ------------------------------ | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Final public domain            | One recognizable address on every ad and mailer                           | Set `NEXT_PUBLIC_SITE_URL`; keep printed links on a domain you control                                                                       |
| Website deployment             | Makes the improvements available to visitors                              | Complete Netlify Free setup and deploy the reviewed code; copy required server settings securely to Netlify, not just the old Vercel project |
| Calendar and real availability | Lets visitors request or reserve a suitable time                          | Configure Cal.com’s daily availability and topic-specific URLs below; the user cancelled external Outlook synchronization                    |
| Verified email sender          | Enables automatic replies and inbox alerts                                | Connect a sending domain; set `RESEND_API_KEY`, `RESEND_FROM`, and optionally `LEAD_NOTIFY_EMAIL`                                            |
| Bot protection                 | Reduces automated submissions                                             | Set the existing Turnstile site and secret keys                                                                                              |
| Medicare disclosure            | Makes public Medicare marketing accurately describe the plans represented | Verify organization and product counts by service area, and whether all organizations are represented, against the current disclosure rule   |

The user explicitly authorized proceeding after the cost review. Netlify Free and Cal.com Free are being connected; they are not yet verified live. **`christianbrinkleync.com` has been purchased from Namecheap for $6.99 with NEWCOM679; the user confirmed the purchase and the receipt was verified.** Hosting/domain connection and provider verification remain in progress. There is no general permission hold.

Until a calendar is connected, `/schedule` offers a topic-specific conversation request; it does not claim to reserve a time. Until email delivery is connected and accepted by the provider, the confirmation page does not promise an email. A task in the command center is currently the dependable next step.

The existing enrollment-reminder feature uses the separate legacy Supabase schema and email/cron settings. It is **not connected to the command-center ingress**. Do not advertise automatic reminder emails as active. Visitors can already download their dates to their own calendars. Cal.com event handling has been implemented for booking creation, requests, rescheduling, cancellation, and rejection, but must be connected and tested. Appointment reminders, annual review invitations, and nurture sequences still need their specific provider workflows; no future meeting end time is treated as proof of attendance.

## Booking and appointment synchronization

Create a separate Cal.com event for each topic. Copy its actual published HTTPS URL into the matching setting; do not construct URLs from guessed slugs.

| Consultation topic                 | Website URL                          | Public setting                                  |
| ---------------------------------- | ------------------------------------ | ----------------------------------------------- |
| Medicare                           | `/schedule?topic=medicare`           | `NEXT_PUBLIC_SCHEDULING_MEDICARE_URL`           |
| Life insurance                     | `/schedule?topic=life_insurance`     | `NEXT_PUBLIC_SCHEDULING_LIFE_INSURANCE_URL`     |
| Care and critical illness coverage | `/schedule?topic=care_coverage`      | `NEXT_PUBLIC_SCHEDULING_CARE_COVERAGE_URL`      |
| Retirement questions               | `/schedule?topic=financial_planning` | `NEXT_PUBLIC_SCHEDULING_FINANCIAL_PLANNING_URL` |

`NEXT_PUBLIC_SCHEDULING_URL` is an optional, explicitly configured generic fallback. If a topic has no event and there is no generic fallback, the website offers that topic’s consultation request form. A missing life insurance event never silently sends the visitor to a Medicare appointment. Preserve the requested scope and arrange any separate conversation explicitly.

Christian’s latest instruction is **60-minute appointments every day, starting at 9am, 11am, 1pm, 3pm, or 5pm Eastern time**. This replaces the earlier weekday restrictions. The user cancelled Outlook synchronization, so external calendar conflicts must not be described as automatically checked. Save and test these exact starts in Cal.com, including conflicts between bookings made through its different event types. Availability changes outside Cal.com need to be reflected there directly. Verify the actual location or video link for each event before publishing its URL.

Register the deployed HTTPS `/api/webhooks/cal` endpoint in Cal.com and configure these **server-only** settings:

- `CALCOM_WEBHOOK_SECRET`: the same dedicated random secret in Cal.com and the site, 32–256 characters. Never use a public environment prefix.
- `CALCOM_ORGANIZER_EMAIL`: the exact organizer email used by the connected Cal.com account.
- `CALCOM_EVENT_TYPES`: a JSON object mapping actual positive numeric event IDs to `medicare`, `life_insurance`, `care_coverage`, or `financial_planning`. Use the real IDs from Cal.com; unrelated calendar events are rejected.

The command-center appointment migration and updated ingress must be deployed as well. Confirm `appointment_ready` separately from the existing inquiry capture health flag. Then test a booking, a request awaiting confirmation if enabled, rescheduling, cancellation, and rejection. Verify the correct topic and status in the command center, calendar conflict handling, confirmation messages, and duplicate-event behavior. Attendance remains a separately recorded outcome.

The public `/api/health` exposes only configuration booleans and remediation text. Its `automation.configured`, booking mappings, and `syncConfigured` values are not live tests; `liveVerified` remains false. Provider-specific test evidence must be recorded separately. Do not advertise appointment confirmations or reminders as automated until the relevant flow succeeds.

## Using the monthly turning-65 lists

Keep the existing imported lists as the outreach audience. Website inquiries are a separate record of people asking for help. Buying or receiving a list does not establish permission to call, text, or enroll its contacts in automated follow-up. The site records new permission for the topic actually selected; it does not automatically cross-sell unrelated products or enroll imported lists into sequences.

Use one campaign name per monthly cohort and one content label per creative. Example labels: `triad_t65_2026_10` and `kitchen_table_a`. These are campaign labels, never names, dates of birth, phone numbers, or street addresses.

Once the new site is deployed, append these paths to the final domain:

| Channel                  | Trackable path                                                             |
| ------------------------ | -------------------------------------------------------------------------- |
| Mailer / QR              | `/go/mail?utm_campaign=triad_t65_2026_10&utm_content=kitchen_table_a`      |
| Permitted text follow-up | `/go/text?utm_campaign=triad_t65_2026_10&utm_content=personal_invitation`  |
| Permitted email          | `/go/email?utm_campaign=triad_t65_2026_10&utm_content=personal_invitation` |
| Facebook                 | `/go/facebook?utm_campaign=triad_t65_2026_10&utm_content=kitchen_table_a`  |
| Nextdoor                 | `/go/nextdoor?utm_campaign=triad_t65_2026_10&utm_content=kitchen_table_a`  |

By default, mail, text, and email links open the turning-65 guide; Facebook and Nextdoor links open the focused turning-65 landing page. Add `audience=aep`, `audience=life_insurance`, or `audience=retirement` to select the matching service. See [the appointment campaign plan](APPOINTMENT-CAMPAIGNS.md) for the proposed T65-first pilot and its headline test. A printed QR can point at the stable short path even if the destination changes later. Verify the final domain and scan an actual printed proof before ordering mailers.

For the first campaign, measure **consultations requested → appointments confirmed → appointments attended → households helped**. Clicks and total names are supporting numbers. Judge each source by cost per attended consultation. Appointment confirmations and attendance must be connected to the calendar/command-center process before those later stages can be reported automatically; the website does not currently claim to measure them.

The next useful automation is appointment confirmation/cancellation syncing, then permissioned reminders, and then annual client review invitations. Automations should stop or adjust when someone books, opts out, cancels, becomes a client, or needs personal review. Periodic maintenance and real consultations remain part of the business; software cannot guarantee a daily number of qualified households.

## Cost-conscious tools

Domain and search setup status is recorded in [the search launch notes](SEARCH-LAUNCH.md). Use existing student benefits where they fit the production service; compare renewal costs and eligibility before activating a trial.

- **Keep the active command center.** There is no need to buy another CRM for website inquiries. The paused “Greensboro Wealth Engine” Supabase project was not used or restored.
- **Cal.com Individual** is a practical starting point for booking. Its current individual offering is free; verify the exact notification/workflow features you need before selecting paid options. [Cal.com pricing](https://cal.com/pricing)
- **Resend** is already supported by the code. Its transactional free allowance is currently 3,000 emails per month, limited to 100 per day. Both an agent alert and a prospect reply consume messages. Sender-domain verification and delivery monitoring still matter. [Resend limits](https://resend.com/docs/knowledge-base/account-quotas-and-limits)
- **GitHub Student Developer Pack** currently includes a one-year `.me` domain offer from Namecheap and Azure student benefits. Verify eligibility, renewals, and permitted use before claiming an offer. A recognizable permanent domain matters more than a temporary discount. [Student Pack](https://education.github.com/pack)
- **Hosting:** the authorized starting plan is Netlify Free. Its current free tier has 300 monthly credits and pauses projects at the limit; validate this site's deployment and usage before advertising. The migration is being set up and is not yet verified live. Staying on Vercel would require a commercially permitted plan because its Hobby tier is personal/non-commercial. No paid hosting upgrade is needed for the selected starting plan. [Netlify pricing](https://www.netlify.com/pricing/), [Vercel fair use](https://vercel.com/docs/limits/fair-use-guidelines)

There is no need to add Make, a second CRM, or a paid texting platform until a concrete workflow requires it. No ads, mailings, emails, or prospect texts were sent during this implementation.

## Sources for launch review

- Timeline assumptions and exceptions: [Medicare coverage start dates](https://www.medicare.gov/basics/get-started-with-medicare/sign-up/when-does-medicare-coverage-start).
- Medicare marketing and meetings: [Medicare plan marketing rules](https://www.medicare.gov/health-drug-plans/health-plans/your-coverage-options/plan-marketing-rules).
- Organization counts and the all-organizations variant of the disclaimer: [42 CFR 422.2267(e)(41)](<https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-B/part-422/subpart-V/section-422.2267#p-422.2267(e)(41)>). Confirm the wording applicable to the campaign and current service area with the responsible compliance contact. Personal branding does not replace any disclosure required for the products or affiliation being marketed.

## Connection notes for whoever maintains the site

`COMMAND_CENTER_INGEST_URL` and `COMMAND_CENTER_INGEST_KEY` are server-only environment settings. Their local values are in the ignored `.env.local`; never prefix the key with `NEXT_PUBLIC_`, paste it into page code, include it in a mailer, or commit it. The new ingress endpoint is `website-inquiry` in the T65 Daily Command Center project. It checks a dedicated 256-bit key against a protected hash before accepting health or capture requests.

Only these two settings were imported from the ignored `.env.command-center-upload` into the existing Vercel project, `wealth-engine-h6gs`. On September 10, Vercel confirmed both were saved as **Secret** variables for **Production**. Existing hosting settings were preserved. Preview environment values have not been configured. The repository is currently on `master`, while Vercel’s interface identifies `main` as its production branch; confirm the intended deployment branch before pushing or promoting a release. Redeploying the old code alone will not add the new inquiry integration.

The reviewed SQL is under `supabase/command-center`. **Do not run the legacy `supabase/schema.sql` or legacy lead migrations against this command center.** Its lead columns and existing workflows are different. Public tables added for the integration have RLS and no client policies intentionally: only the authorized service can use them. This produces an informational “RLS enabled, no policy” advisor notice. [Supabase notice explanation](https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy)

Run `node scripts/check-connections.mjs` after changing environment settings. It checks the connection without retrieving prospects or sending messages. The public `/api/health` reports configuration and launch readiness; it does not actively write a test lead or promise that every external service is reachable.

Supabase also reported pre-existing mutable function search paths and disabled leaked-password protection. These were outside the new ingress and remain items for command-center maintenance. [Function search paths](https://supabase.com/docs/guides/database/database-linter?lint=0011_function_search_path_mutable), [password protection](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection).
