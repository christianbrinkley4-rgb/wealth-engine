# Measurement specification, October 9, 2026

Internal document. It defines what the site counts from first visit to completed appointment, what it must never send, and how to check that it works. It extends [MEASUREMENT-SETUP.md](MEASUREMENT-SETUP.md), which stays the how-to for the Google accounts.

Built from the code at `ea436c0`: `lib/analytics.ts`, `app/components/Analytics.tsx`, `lib/attribution.ts`, `lib/serverAnalytics.ts`, `hooks/useQuizTracking.ts`, `components/CalEmbed.tsx`, `app/api/webhooks/cal/route.ts`. This session had no access to GA4, Search Console or the command center, so "today" below means "in the code," not "in the reports."

## 1. The journey and the one number for each step

| Step | Definition | Primary metric | System of record |
| --- | --- | --- | --- |
| 1. Qualified visit | A session that lands on a Medicare-lane page, or any session from the Triad or Granville County | Sessions by landing-page group and by channel | GA4 |
| 2. Useful action | The visitor finishes something that helps them: a tool, a quiz, the date lookup, the plan-research checklist, a guide signup | Sessions with one or more useful-action events, divided by sessions | GA4 |
| 3. Contact or booking | A phone tap, a sent request, or a confirmed booking | Count of each. Never summed into one "conversions" number | GA4 for taps and requests. Command center for requests and bookings |
| 4. Completed appointment | Christian met or spoke with the person at the booked time | Attended appointments per week, by first-touch source | Command center only |

Step 4 is the number that decides whether any of this is working. It never goes to GA4, because it is about a named person.

## 2. Privacy rules (unchanged, and binding on every ticket)

These are already enforced by `lib/analytics.ts` and its test. This spec does not loosen them.

- An event carries its name, the page path with the query string removed, and at most a small set of allow-listed labels.
- Never sent to any analytics or ad platform, in any form, hashed or not: name, email, phone, ZIP, date of birth, age, income, answers to any question, doctor names, drug names, plan names, free text.
- New parameters in this spec are fixed labels chosen from a short list in code (`tool_id`, `cta_id`, `cta_location`, `list_id`, `destination`). None of them is typed by a visitor.
- Google personalization signals stay off (`allow_ad_personalization_signals: false`, `allow_google_signals: false`).
- The allow-list test must be extended in the same commit as any new event or parameter. A parameter that is not on the list is dropped at runtime and fails the test.

### Meta Pixel: decision needed before more measurement work

Observed on the live site on 2026-10-09: the Meta Pixel loads on every page, sends `PageView`, and sets Meta's `fr` cookie. The privacy page says "Personalized advertising signals are turned off." The code turns those signals off for Google only.

Options:

| Option | Effect | Recommendation |
| --- | --- | --- |
| A. Switch the pixel off (unset `NEXT_PUBLIC_META_ADS_ALLOWED` or `NEXT_PUBLIC_META_PIXEL_ID` in Netlify, redeploy) | Privacy page updates itself (it lists providers from the environment). About 145 KB and roughly half a second of main-thread time leave every page. No Meta campaign data is lost because no campaign is running | **Recommended** while paid ads are parked |
| B. Keep it | The privacy sentence must be rewritten so it is true for Meta. That is wording a visitor reads about tracking, so it needs Christian's approval before any edit | Only if a Meta campaign is approved |

Either way this is Christian's decision, and option A is a Netlify setting, not a code change.

## 3. Event dictionary

Status: **Live** means it is in `MEASURED_EVENTS` today. **New** is added by ticket T-01 (or the ticket named). **Change** means the definition moves.

### 3.1 Useful actions

| Event | Fires when | Parameters | Status | Key event |
| --- | --- | --- | --- | --- |
| `timeline_complete` | The date tool or Part B penalty tool shows a result | none | Live | No |
| `timeline_email_request` | Someone asks for their dates by email | none | Live | No |
| `quiz_start` | Start pressed on a quiz | `quiz_id` | Live | No |
| `quiz_step` | One step answered | `quiz_id`, `step` | Live | No |
| `quiz_complete` | Result screen reached | `quiz_id`, `step` | Live | No |
| `quiz_abandon` | A started quiz is left before the end | `quiz_id`, `step` | Live | No |
| `tool_start` | First change to any input on a `/tools/*` calculator in a page view | `tool_id` | **New** | No |
| `tool_complete` | A result has been on screen for 10 seconds after an input change, once per page view | `tool_id` | **New** | No |
| `checklist_start` | First item added in the plan-research checklist | none | **New (T-07)** | No |
| `checklist_complete` | The checklist reaches its summary screen | none | **New (T-07)** | No |
| `official_handoff_click` | A tap on a link to Medicare.gov, SSA.gov or the NC SHIIP site from a tool or checklist | `destination` | **New** | No |
| `guide_signup` | The guide or drops signup form reports success | `list_id` | **New (T-08)** | No |
| `ask_submit` | The public question form reports success | none | **New** | No |

Allowed values:

- `tool_id`: `roth_vs_traditional`, `emergency_fund`, `debt_payoff`, `retirement_projector`, `take_home_pay`, `life_insurance_needs`, `compound_interest`, `budget`, `roth_conversion_ladder`.
- `quiz_id` (extended): `plan_check`, `help_request`, plus `medigap_or_advantage`, `roth_conversion`, `cd_or_savings` for the three quizzes under `/tools` that report nothing today.
- `destination`: `medicare_plan_compare`, `medicare_gov`, `ssa_gov`, `nc_shiip`.
- `list_id`: `guides`, `drops`.

Why `tool_complete` waits 10 seconds: calculators show a result on load. Counting the load would count every visit. Ten seconds after a deliberate input change is a cheap proxy for "read the answer."

### 3.2 Intent

| Event | Fires when | Parameters | Status | Key event |
| --- | --- | --- | --- | --- |
| `cta_click` | A tap on a link to `/plan-check`, `/start` or `/schedule` | `cta_id`, `cta_location` | **New** | No |
| `article_cta_click` | A tap on the next-step link at the end of a Learning Hub article | none | Live. Keep the name so history is not broken. New code uses `cta_click` with `cta_location: article_end` in addition | No |
| `booking_open` | The embedded calendar is shown | none | Live | No |

- `cta_id`: `plan_check`, `ask_question`, `book_time`.
- `cta_location`: `header`, `hero`, `sticky_bar`, `page_close`, `article_end`, `inline`, `menu`, `tool_result`.

### 3.3 Contact and booking

| Event | Fires when | Parameters | Status | Key event |
| --- | --- | --- | --- | --- |
| `phone_click` | Any `tel:` link is tapped | `cta_location` (**new**, optional, read from a `data-cta-location` attribute) | Live | **Yes** |
| `generate_lead` | Once per request, on `/thank-you` or when a quiz email capture succeeds | `event_id`, `topic` (existing, from `trackLead`) | Live | **Yes** |
| `booking_confirmed` | Cal.com webhook reports `BOOKING_CREATED` or `BOOKING_REQUESTED` (server side, Measurement Protocol) | `topic` | Live in code. Needs `GA4_API_SECRET` in Netlify. Not verifiable from here | **Yes** |
| `booking_complete` | The embedded calendar tells the browser a booking finished | none | Live. **Change:** stays as a diagnostic event and is **not** starred as a key event | No |

**One booking, one count.** Today a single booking can produce `booking_complete` in the browser and `booking_confirmed` from the server. The server event is the definition of a booking, because it also catches bookings made from an email link. The browser event is kept only to check that the two roughly agree. If `booking_complete` is far above `booking_confirmed`, the webhook or the API secret is broken.

Known limit, accepted: `booking_confirmed` uses a random client id, so GA4 cannot attribute a booking to a channel. That is deliberate (the site keeps no visitor identifier). Source attribution for bookings is done in the command center, section 5.

### 3.4 Reviews (unchanged)

`review_page_view` and `review_click`, with `review_source` of `meeting`, `card` or `text`. Live. Not key events.

### 3.5 Not measured, on purpose

- Scroll depth and time on page beyond GA4 defaults.
- Which answer anyone gave in any quiz or tool.
- What anyone typed into the checklist.
- Session replay or heatmaps of any kind.

## 4. Key events and ad conversions

Star exactly three key events in GA4 (**Admin, Data display, Events**): `phone_click`, `generate_lead`, `booking_confirmed`.

As of October 1 the recorded number of key events was zero, meaning none had been starred [doc]. Until that is done, GA4 reports show no conversions regardless of what the code sends. This is a five-minute task for Christian and the first acceptance check for ticket T-01.

Useful actions are never key events. If they were, any future ad platform import would optimize toward people who use calculators.

Google Ads: unchanged from MEASUREMENT-SETUP.md. When the account is open, import the same three key events.

## 5. Attribution from visit to attended appointment

GA4 answers "which channels bring visits and taps." It cannot answer "which channel produced an attended appointment," and it should not be made to. That join happens in the command center, where the person is already known.

| Link in the chain | Where it is recorded | Field | Status |
| --- | --- | --- | --- |
| First touch | Browser `sessionStorage`, sent with the lead payload | `utm_source`, `utm_medium`, `utm_campaign`, `referrer`, `landing_path` [code] `lib/attribution.ts` | Live |
| Entry path | Lead payload | `entry_mode` (for example `quick_contact`) [doc] | Live |
| Request received | Command center lead record | timestamp, topic | Live per `/api/health` |
| Booking | Command center, written by the Cal.com webhook, matched to the lead by email | booking status | Live in code. Confirm in the command center |
| Phone call that never touched a form | Nowhere | | **Gap.** Christian logs it by hand with a source ("how did you find me?") |
| Attended or no-show | Command center | outcome field | **Gap, not code.** Christian sets it after each meeting |
| Enrolled or not | Command center | outcome field | Outside this spec |

Requirement on the command center (not this repo, noted so it is not lost): every lead record shows its first-touch source and landing path, and has an outcome field with the values `booked`, `attended`, `no_show`, `cancelled`. If it already does, nothing to build.

Session scope caveat: attribution lives in `sessionStorage`, so a person who reads a guide on Monday and returns directly on Thursday is recorded as direct. That is a known undercount for organic search. Do not "fix" it with a long-lived identifier without Christian's approval, because it changes what the privacy page promises.

## 6. Reports and the weekly scorecard

### 6.1 GA4 custom dimensions to register (event scope)

`quiz_id`, `step`, `tool_id`, `cta_id`, `cta_location`, `list_id`, `destination`, `review_source`, `topic`. Parameters that are not registered are collected but invisible in reports.

### 6.2 Landing-page groups (built in a GA4 exploration, not in code)

| Group | Paths |
| --- | --- |
| Medicare service | `/`, `/turning-65`, `/annual-enrollment`, `/aep`, `/anoc`, `/special-enrollment`, `/plan-check`, cost and numbers pages |
| Medicare reading | `/learn`, `/answers/*`, `/medicare-words`, Medicare guides under `/guides/*` |
| Town | `/medicare-in/*`, `/medicare-*-nc`, `/service-area` |
| Money reading | `/wealth/*`, money and tax guides under `/guides/*`, `/taxes-and-retirement/*` |
| Tools | `/tools/*` |
| Other | `/ai/*`, `/ask/*`, everything else |

### 6.3 Weekly scorecard (Monday, 15 minutes)

| Row | Source | Note |
| --- | --- | --- |
| Sessions, by channel and by landing-page group | GA4 | |
| Search clicks and impressions, top queries, top pages | Search Console | Needs access |
| Sessions with a useful action, and the rate | GA4 | Split by landing-page group |
| `cta_click` by `cta_location` | GA4 | Which button placement earns its space |
| `phone_click` | GA4 | A tap, not a call |
| `generate_lead` | GA4 and command center | The two should match within one or two. If not, something is broken |
| `booking_confirmed` against `booking_complete` | GA4 | Health check for the webhook |
| Requests, bookings, **attended appointments**, by first-touch source | Command center | The row that matters |
| New Google reviews, total | Google Business Profile | |
| Owner tests and spam removed | Manual | State the number removed |

### 6.4 KPIs and honest targets

No targets are set from industry averages. The September baseline was 109 users, 6 phone taps from 4 users, and 1 user sending a request [doc]. At that volume a rate is noise.

Until weekly sessions pass a few hundred, track **counts** and direction:

- Attended appointments per week (primary).
- Requests plus bookings per week.
- Sessions with a useful action per week.
- Search impressions per week on Medicare-lane pages.

Set rate targets only after four consecutive weeks of data with the new events live.

## 7. Verification procedure

CLAUDE.md forbids submitting a real form to test, because `.env.local` can reach the live command center. So:

### 7.1 Automated (in the repo)

- The allow-list test in `lib/__tests__` fails if an event or parameter is added without being declared.
- New unit tests for `eventParams`: unknown `tool_id`, `cta_id`, `cta_location`, `list_id` or `destination` values are dropped. A query string never appears in `page_path`.
- A test that `trackEvent("tool_complete")` fires at most once per page view.
- A test that the page close, header, sticky bar and hero CTAs each render a `data-cta-location`.

### 7.2 Local, no network to third parties

Run the production build with **no** analytics environment variables and with `window.gtag` replaced by a recorder in the browser console. Click through each surface and read the recorded calls. Nothing leaves the machine and no form is submitted.

Checklist: header plan-check button, hero button, sticky bar both buttons, page-close buttons, an article end link, one calculator (change an input, wait 10 seconds), one `/tools` quiz to its result, an outbound Medicare.gov link, a phone link.

### 7.3 Live, by Christian, after deploy

1. GA4 **Admin, DebugView** or **Reports, Realtime**.
2. On his own phone: tap the call button and hang up. Use one calculator. Tap "Plan check" from the sticky bar.
3. Confirm `phone_click`, `tool_start`, `tool_complete` and `cta_click` appear with their parameters.
4. Book a clearly labelled test appointment with his own email. Confirm `booking_open`, `booking_complete` and, within a minute, `booking_confirmed`. Cancel the booking and delete the test record.
5. Star the three key events if not already done.

### 7.4 What a failure looks like

| Symptom | Likely cause |
| --- | --- |
| No events at all | Ad blocker on the test phone, or the deploy predates the environment variables |
| `booking_complete` appears, `booking_confirmed` never does | `GA4_API_SECRET` missing in Netlify, or the Cal.com webhook is not pointed at `/api/webhooks/cal` |
| `generate_lead` in GA4 is higher than requests in the command center | Lead delivery is failing. Check `/api/health` and the delivery-retry cron |
| Parameters missing in reports but present in DebugView | Custom dimension not registered (6.1) |
| Key events show zero | Not starred (section 4) |

## 8. Out of scope

- Call tracking numbers. They would replace the real phone number on the page, which conflicts with a consistent name, address and phone across listings.
- Any cross-session visitor identifier.
- Server-side tagging, consent-mode banners, or a tag manager. Three providers do not need one.
- Sending leads or outcomes to any ad platform as offline conversions. Revisit only if paid ads are approved, and then with Christian and compliance.
