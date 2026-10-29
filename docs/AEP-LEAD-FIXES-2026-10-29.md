# AEP lead fixes, Oct 29, 2026

Branch `claude/aep-lead-fixes-2026-10-29`, cut from origin/master `182b363`. Not merged, not deployed. Deployment stays with woody after his normal gates.

Goal: Medicare enrollments during AEP (Oct 15 to Dec 7, 2026). Target 70, current 0. The numbers below come from Christian's brief. Anything I measured myself is marked with how.

## The short version

The site isn't failing on looks. It fails between the click and the record:

- The busiest Medicare form sits two screens down and makes email required and phone optional.
- The /aep callback form downloaded about 1 MB of bot check with the page, held its button disabled with no reason given, and never counted a saved request.
- The plan check's Start button sat 1,813px down on a phone.
- Since Oct 26, bookings go to a Google Calendar page that tells the site nothing and collects no Scope of Appointment.

On volume: about 120 sessions a week won't reach 70 enrollments through the site alone, whatever the conversion rate. The site can stop wasting the traffic it gets. The rest has to come from Christian's offline work, his Google Business Profile, and referrals.

## 1. Diagnosis

Each item: what I can prove, then what I can't.

### W1. Visibility is deep, not top
- **Proved:** nothing new. The Search Console figures are as given.
- **Not proved:** why national questions rank at 70 to 82. I didn't research competitors, so I'm not naming a cause.
- **Lead impact during AEP:** low. A national "how Part D works" searcher is rarely a Triad household ready to talk this month.

### W2. Click-through broken where visibility exists (State Health Plan guide)
- **Partly wrong on recheck.** The page's title changed on Oct 27, 08:24 (commit `ddf4c78`), from "NC State Health Plan Medicare for Retirees: How It Works" to "NC State Health Plan Medicare Retirees: 2027 Changes, Nov. 6 Deadline". Nearly all of the Oct 22 to 28 week (320 impressions, 0 clicks) ran on the old title. The new title is too new to judge.
- **Proved:** the new title is 70 characters, so Google will likely cut it.
- **Proved:** the deadline copy goes stale after Nov 6. The page's own code comment says so.
- **Proved:** the page sends state retirees to the State Health Plan support center for plan questions. These readers pick their 2027 coverage through the State Health Plan's own enrollment, so the page's lead value is limited.
- **Not proved:** that a different title would earn clicks.

### W3. The quiz leaks almost everyone
- **The 57 starts mix at least four tools:** `plan_check`, `help_request` (/start), `aep` and other quizzes. Search Console can't split them, and GA4 can only if `quiz_id` is registered as a custom dimension (MEASUREMENT-SPEC section 6.1).
- **Proved (code, `app/start/HelpQuiz.tsx`):** the /start quick form fired `quiz_start` on page load. Every visit to `/start?topic=medicare&quick=1` counted as a quiz start. The site links there 119 times. Anyone who then left counted as an abandon. That inflates starts and abandons by an amount I can't measure from here.
- **Proved (code, `hooks/useQuizTracking.ts`):** `quiz_abandon` fires the first time the page is hidden. Switching apps or tapping the phone number counts, even if the visitor comes back and finishes. So 42 abandons means "stepped away at least once", not "lost".
- **Proved (code):** "complete" means different things per quiz:

  | Quiz | `quiz_complete` fires when |
  |---|---|
  | `plan_check` | Question 7 is answered. No contact details needed. |
  | `help_request` (/start) | Contact form is submitted and saved |
  | `aep` | Contact form is submitted and saved, because the result is gated behind email |
  | `medicare_fit` (new) | Question 5 is answered |

  An 8.8% blended "completion" mixes "finished questions" with "gave contact details".
- **Flaky Start: not reproduced.** On current master, built locally at 375px wide, the plan check Start advanced on the first click once the page had hydrated. What I did prove is placement: Start sat at 1,813px on a 812px screen.
- **Not proved:** why the Oct 27 test browser stuck on the start card. Taps before hydration are the likely explanation, but I can't confirm it.

### W4. The middle of the funnel is dead (/start, /plan-check)
- **/start is noindex.** Its 66 landing sessions come from links and shares, not search.
- **Proved (375px, local build):** in quick mode the submit button sits about 1,736px down.
- **Proved:** the form requires name, email, ZIP and consent. Phone is optional.
- **Proved:** the quick page has no booking button, only a call button and the form.
- **/plan-check:** 10 sessions at 0 seconds is too small a sample to diagnose. The provable problem is Start sitting two screens down, under a hero and an intro card that repeat each other word for word.
- **Not proved:** why /start drew 0 phone taps. Phone taps are counted on /start, and the code path works.

### W5. Booking and lead capture don't create records
- **Proved:** on Oct 26 (commit `bc1765f`) the sitewide booking CTA moved to a Google Calendar appointment page. That page has no webhook to this site.
- **Proved:** `booking_confirmed` only fires from the old Cal.com webhook, which no longer receives bookings. Live `/api/health` still reports the Cal.com webhook as configured.
- **Result:** a real booking now leaves no trace on the site or in the CRM. It exists only in Christian's Google Calendar. "Booking opens that became real bookings" has to be counted there by hand each week.
- **Compliance gap, flagged and not worked around:** the Google appointment page has no Scope of Appointment step. Someone can book a Medicare call with no SOA on file.
- **Proved (code, `components/EngineContact.tsx`):** the /aep "Ask me to call you" form saved to the lead engine, but never fired `generate_lead`. Its saves were invisible in Analytics.
- **Proved (code):** there are two lead stores. `/api/capture-lead` (the /start quiz, the AEP quiz, the plan check) writes to the command center or Supabase. `/api/quiz-lead` (the /aep callback form, /medicare-fit, /lp/medicare-review) writes to the lead engine.
- **Not proved:** which store the "site lead form count is 2" reads. The 7 `generate_lead` against 2 blank test records can't be reconciled from code. `generate_lead` fires on the thank-you page and on quiz email capture, so test runs and reloads of a thank-you link could account for some of it.

### W6. Measurement is broken
- **Partly wrong on recheck.** `booking_click` was added Oct 26 at 12:10 (commit `bc1765f`). Its absence from Sep 29 to Oct 26 is expected, not a bug. For Oct 22 to 28 it had about two and a half days live, and GA4 custom events can lag a day or two.
- **Proved:** the code path fires `booking_click` on a tap of the booking link (see verification).
- **Proved:** `book_consultation_click`, `close_convert_lead`, `purchase` and `qualify_lead` don't exist anywhere in the code. They are starred in GA4 but can never receive data from this site.
- **Direct traffic** was not relabeled as AI traffic.

### W7. Speed is a single-page problem (/aep)
- **Confirmed and cause proved.** Mobile Lighthouse 12.2.1 against the live site, Oct 29:

  | Page | LCP | Cloudflare bytes | Page total |
  |---|---|---|---|
  | `/aep` run 1 | 4.8 s | 852 KB | 1,236 KB |
  | `/aep` run 2 | 8.4 s | 958 KB | 1,342 KB |
  | `/` | 3.4 s | 0 KB | 386 KB |

  The callback form on /aep loaded Cloudflare's bot check with the page and rendered it at once. That was about 70% of the page's bytes on a phone connection.

### W8. Local and AI visibility is name-only
- **Proved:** only `/medicare-in/greensboro` is indexable among the generated town pages (TRACTION release). Generic High Point and Winston-Salem questions have only the hand-written `/medicare-agent-*` pages to land on.
- **Not proved:** why Perplexity cites SHIIP and competitors. I didn't research what they publish.
- **Lead impact during AEP:** low to medium. These fixes are slow.

### W9. Google Business Profile converts nothing
- **Off-site.** I can't see or change the profile, and I didn't contact anyone.
- The review count discrepancy (4 public, 3 in the panel) stays open. No count is used anywhere in this work.

### Added: things the brief missed
- **W10. The busiest Medicare form asks for email first.** The quick form (119 links) requires email and treats phone as optional. For people turning 65 who would rather be called, that's backwards. This changes what a person submits, so it's proposed, not built.
- **W11. Too many next steps side by side.** /aep's first card offers a call, a booking link, "send a question", a callback form and a checklist link. The plan check hero offered a booking button above the quiz it's named for.
- **W12. The /aep callback button could look broken.** It stayed disabled until the bot check passed and gave no reason. On a slow phone that's a dead button.

## 2. Ranked improvements, by expected lead impact

How each is measured: sessions on the page, quiz completions per `quiz_id`, booking opens that became real bookings (counted in Christian's calendar weekly), and genuine CRM leads (records with a real name and phone). Never views, clicks or impressions alone.

| # | Improvement | Why it ranks here | What changes for a visitor | How we'll know | Status |
|---|---|---|---|---|---|
| 1 | Phone-first quick form: phone required, email optional, submit on the first screen | It's the form behind 119 links and /start's 66 landing sessions | One short form with a call-back promise | CRM leads with a phone number from `help_quiz`, per week, against the 0 baseline | **Proposed, needs Christian's OK** (changes what's submitted) |
| 2 | /aep callback form: on-demand bot check, no dead button, lead counted | /aep is the second-biggest landing page and the only one with key events | Faster page, a button that always answers | /aep mobile LCP on live Lighthouse. Lead-engine records from source `medicare-review` against `generate_lead` on /aep | **Built** |
| 3 | Plan check starts from the first screen | Its title promises a 90-second quiz, and Start was 2 screens down | The hero's second button starts the quiz, with no repeated headline | `quiz_start` / `quiz_complete` for `plan_check` per landing session | **Built** |
| 4 | Close the SOA gap and make bookings countable | Every booking now risks a call with no SOA and leaves no record | Depends on Christian's choice | Weekly count of real Medicare bookings in his calendar, each with an SOA on file | **Flagged, not built** |
| 5 | Honest funnel numbers | Can't fix what's mismeasured | None | `quiz_start` on /start drops to real starts, `medicare_fit` shows up | **Built** (code). GA4 settings are for Christian, see section 6 |
| 6 | One primary action per page on /aep | Five choices in one card splits attention | Fewer, clearer buttons | /aep leads per session | **Proposed** (touches booking CTAs) |
| 7 | Google Business Profile: real reviews, website link, weekly AEP post | Map-pack and AI answers lean on reviews | More people find him by search | GBP website clicks and calls | **Christian, off-site** |
| 8 | State Health Plan title: recheck Nov 4, then update after the Nov 6 deadline | Low lead value, and the title only just changed | A shorter title that isn't cut off | Clicks at a stable position | **Wait** |
| 9 | Pages for generic local questions (High Point, Winston-Salem agent help) | Real but slow, unlikely to pay off before Dec 7 | Answers to local questions | Impressions at positions under 20 for those queries | **After AEP** |

## 3. What this branch changes

| File | Change |
|---|---|
| `components/EngineContact.tsx` | Loads the bot check through `lib/loadTurnstile.ts` on the first focus or tap in the form, not with the page. Removes the component's own `<Script>` tag, the pattern that once crashed pages (see `lib/loadTurnstile.ts`). Submit is never disabled for the check. A tap before it finishes says so and gives the phone number. Fires `generate_lead` once, only after the server confirms `stored: true` with a matching id. |
| `app/plan-check/page.tsx` | Compact hero. The second hero button reads "Start the plan check" and goes to the quiz (`#plan-check-quiz`) instead of to the Google booking page. |
| `app/plan-check/PlanCheckQuiz.tsx` | Removes the intro card's repeated headline and paragraph, which said the same thing as the hero. Keeps the badge, the "educational, not advice" line and Start. |
| `app/start/HelpQuiz.tsx` | The quick form counts `quiz_start` on the first field focused, not on page load. |
| `components/EngineQuiz.tsx`, `lib/analytics.ts` | The five-question checklist reports `quiz_start`, `quiz_step` and `quiz_complete` under the new `quiz_id` `medicare_fit`. Answers are never sent. |
| `lib/__tests__/aep-lead-fixes.test.ts` | 7 tests covering the above. |

No copy was added that names a plan, a carrier, a dollar figure or a review count. The phone number, the booking URL and `/aep` are unchanged. The TPMO disclaimer is untouched. No consent text, field or stored value changed.

## 4. Before and after

### Quiz path
| | Before | After |
|---|---|---|
| Plan check first quiz action, 375px | Start at 1,813px (2.2 screens) | "Start the plan check" in the hero at 679px (first screen). The quiz card's Start moves to 1,319px |
| Plan check hero second button | Opens the Google booking page in a new tab | Jumps to the quiz |
| /start quick form `quiz_start` | Fires on page load | Fires on first field focus |
| /medicare-fit checklist funnel | No events | `quiz_start`, 5 `quiz_step`, `quiz_complete` |

### Booking path
| | Before | After |
|---|---|---|
| Booking link target | Google Calendar appointment page, 45-minute phone calls | Unchanged |
| Booking record reaching site or CRM | None | None. Flagged. |
| SOA before a booked Medicare call | Not collected | Not collected. Flagged, no workaround. |
| /aep callback form button | Disabled with no reason until the bot check passes | Always answers; explains a pending check |
| /aep callback save in Analytics | Nothing | One `generate_lead` per confirmed save |

## 5. Verification

Automated: `npx vitest run` passed 94 files and 1,631 tests. `npx tsc --noEmit` and ESLint on changed files are clean. The production build passed with Cloudflare's always-pass test key and `NEXT_PUBLIC_SITE_URL` set.

Lighthouse, mobile, local production build (no GA, test key, so the bot check is smaller than live):

| /aep | Score | LCP | Cloudflare bytes on load | Page total |
|---|---|---|---|---|
| Before | 87 | 3.6 s | 223 KB | 628 KB |
| After | 89 | 3.5 s | 0 KB | 405 KB |

The local LCP barely moves, because a local server isn't bandwidth-bound the way a live phone is. The live win has to be confirmed after deploy (checklist item 1).

Browser checks, local production build at 375 x 812, no form submitted:
- **/aep before any tap:** 0 Cloudflare requests and no bot-check script tag. The button is enabled.
- **/aep after a real tap in the Name field:** one script tag, the check widget renders, the button stays enabled. Empty required fields are still blocked by the browser.
- **/plan-check:** the hero's "Start the plan check" sits at 679px. Tapping it brings the quiz's Start into view (461px from the top). Start opens question 1 and fires one `quiz_start` with `quiz_id=plan_check`.
- **Homepage:** a tap on the booking link fires `booking_click` with `cta_location=header`. A tap on the phone link fires `phone_click`. The `booking_click` code path works, so its absence in GA4 is about timing or traffic, not a broken event.

### Manual checklist for woody after deploy (no real form submissions)
1. Run mobile Lighthouse on `https://christianbrinkleync.com/aep` three times. Pass if no `challenges.cloudflare.com` request happens before you touch the form, and LCP is below the 4.8 to 8.4 s measured on Oct 29.
2. On a real phone, open /aep, tap the Name field, wait 3 seconds. The bot check should appear and the button should read "Request a Medicare call" and not be greyed out.
3. On a real phone, tap "Request a Medicare call" immediately after focusing a field. You should see the "form check is still finishing" message with the phone number. Don't fill in real details.
4. On a real phone, open /plan-check. "Start the plan check" should be visible on the first screen. Tap it. The page should scroll to the quiz card, and one more tap should show question 1.
5. In GA4 DebugView, open `/start?topic=medicare&quick=1` and wait 10 seconds without touching it. No `quiz_start` should fire. Tap the name field, and one `quiz_start` with `quiz_id=help_request` should fire.
6. In GA4 DebugView, answer all five questions on /medicare-fit. You should see `quiz_start`, five `quiz_step` and `quiz_complete`, all with `quiz_id=medicare_fit`. Stop before the contact form.
7. Tap the booking button on the homepage. `booking_click` should appear in DebugView. Close the Google tab without booking.
8. On a real phone, tap the phone number. The dialer should open with (919) 408-6671. Hang up. This has never been verified on a real phone.

## 6. Needs Christian or compliance, not code

- **Compliance check before merge.** This branch touches the plan check quiz, a booking CTA (the plan check hero no longer links to booking) and the /aep lead form. Per the brief, it needs a separate compliance look before merge.
- **SOA gap.** Pick one before driving more people to booking:
  - add an SOA step to the booking flow through an approved tool, or
  - point Medicare CTAs at the callback form until booking has one, or
  - confirm with compliance how a booked call is handled when no SOA is on file 48 hours ahead.

  Nothing here collects a signature.
- **Approve or reject item 1:** phone-first quick form. It changes what a person submits.
- **GA4 settings:**
  - Unstar `book_consultation_click`, `close_convert_lead`, `purchase` and `qualify_lead`. Nothing on the site sends them.
  - Keep `generate_lead` starred.
  - Keep `phone_click` only if everyone reads it as a tap, not a call.
  - Register `quiz_id`, `cta_location` and `step` as event-scoped custom dimensions so the quiz funnel can be split by tool.
- **Count bookings by hand** from the Google Calendar each Monday, Medicare calls only, until bookings report back to the site.
- **Google Business Profile:** resolve the 4 vs 3 review count inside the profile. Ask real clients for reviews. Add the website and booking links. Post weekly during AEP.

## 7. Deliberately not changed

- **Booking URL, phone number, the /aep CTA:** off limits without a flag. None changed. The plan check hero now points at its own quiz instead of booking. That's flagged above.
- **No SOA workaround** and no signature capture. That's the brief's rule, and it's a compliance decision.
- **No phone-first form change**, because it changes what's collected (CLAUDE.md).
- **No State Health Plan title change.** It changed on Oct 27, and changing it again now would make both edits unmeasurable.
- **No redesign or new pages** with five weeks of AEP left. That risk would land on pages that already rank, and it would spend Netlify credits.
- **No plan names, carrier names, dollar figures, member counts or savings claims** were added anywhere.
- **No Part B premium or deductible** figures were touched.
- **No street address** was added to structured data.
