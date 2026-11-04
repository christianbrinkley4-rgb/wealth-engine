# AEP booking release, November 4, 2026

Production base: `72ce0904155295df3ab2a74bce15911adbf0056c`, independently verified in Netlify and fetched from `origin/master`. Netlify publishes `master`. The user explicitly authorized implementation, committing, and deployment after the reviewed plan.

## Included

- Leaving-plan and turning-65 guides have hero, inline, and closing booking paths through `/aep`. `/schedule` gives Medicare visitors the same next step. The sticky booking action goes through `/aep`, except on `/aep` where it opens the existing calendar.
- `/aep` leads with the existing 45-minute Google Calendar appointment destination. Calls and optional inquiries remain available. No calendar URL, phone number, TPMO wording, or SOA process was changed.
- `/aep-quiz` and `/medicare-fit` show educational results before contact capture. AEP answers and results recover from saved progress; failed optional submissions leave results visible. AEP retries retain their event ID and successful capture returns keyboard focus to the result.
- Contact forms require an affirmative durable-storage response before reporting a lead. Thank-you URLs alone cannot manufacture a lead event. Accepted requests are deduplicated in memory and session storage. Form starts and valid submission attempts have separate events and fixed identifiers.
- Production browser measurement is limited to the two owned production hostnames. Start QA at `/aep?qa=1`; that tab stays marked across routes and its operational attribution contains `traffic_type: test`. Analytics scripts and events are suppressed for marked QA. Use `?qa=0` to clear the tab marker. This does not retroactively clean old reports.
- Booking clicks distinguish the `/aep` destination from the external calendar. A calendar open remains a diagnostic, not a confirmed appointment.
- Reused the existing narrow-phone header correction after reproducing horizontal overflow at 320 pixels. Reused the pending AEP acknowledgment correction so an AEP request does not receive an invented general-quiz result.
- Added `/medicare-fit` to the sitemap and enabled indexing after verifying its result path. Added an existing Part D explainer link. Granville anchor redirects and `/wealth` and `/ai` noindex remain intact.
- Updated giveback metadata without promising eligibility or savings. Preserved the recently improved supplement-sameness metadata. State Health Plan metadata changes to evergreen copy from November 7, 2026, midnight Eastern, with hourly revalidation. The official deadline was verified at https://www.shpnc.gov/2027-open-enrollment-information.
- Shared review count changed from three to four, the count observed on the correct Google Maps profile on November 3. The brief's reported five was not reproduced. Profile CID: `12304450181097673337`.

## Branch reconciliation

Relevant leaving-guide, SEO, and lead-repair commits were already ancestors of the deployed production base. They were not duplicated. The narrow-header CSS and AEP acknowledgment changes were selectively reused from uncommitted work. Unrelated PaycheckOS and broad redesign changes remain in their own checkouts.

PRs 19, 20, and 21 were inspected and remain outside this release with their existing review gates: conditional checklist, blocked calculator accuracy, and held whitespace work. No unverified plan-specific content or unrelated migrations were imported.

## Validation and evidence limits

- Full suite: 95 files, 1,641 tests passed. After the final focus/retry correction, 25 focused tests passed.
- The exact final production build and TypeScript passed on November 4, including the FAQ and keyboard-focus corrections.
- Lint: zero errors, two existing anonymous-export warnings in Netlify cron functions. `git diff --check` passed.
- Browser checked `/aep` at 360 pixels, menu open/close, full phone destination, and the five-answer `/medicare-fit` journey through visible results and booking without contact capture. The 320-pixel check reproduced header overflow and prompted the existing CSS fix. Browser viewport control became unreliable during the final repeat; do not claim that repeat passed.
- One live pre-release Lighthouse run: performance 86, accessibility 100, LCP 3.45 seconds. One local release run: performance 82, accessibility 100, LCP 3.82 seconds. Different origins and conditions mean these are not evidence of a speed improvement. A three-run comparable live median remains outstanding.
- Physical Android, actual iPhone, and WebKit checks remain unverified. No emulation result establishes actual dialer behavior.

## Operational reconciliation still required

The read-only database and inbox review found marked October test submissions, matching callback notifications, a marked test that first failed storage and later saved, and one older non-test-labeled inquiry with a matching notification. That older record cannot be linked to the reported anonymous quiz completion. Its identity and contact permission should be reviewed privately by Christian. No prospect was contacted and no contact details are committed here.

Calendar searches found existing review appointments, but no defensible link from those appointments to the anonymous quiz completion. Do not attribute them to the website without evidence. Google Forms quiz-alert emails are a separate path and do not establish a website quiz lead.

GA4 property `554792610` had an Internal Traffic exclusion filter in Testing mode. The key-event list included `book_consultation_click`, `booking_open`, `generate_lead`, and `phone_click`. Source code emits `booking_click`; inspection of GA-created event definitions was interrupted. No filters were activated and no event configuration was changed. Do not sum `booking_click` and `book_consultation_click`. The filter/control validation and clean reporting-baseline declaration remain outstanding.

The historical five-to-seven lead events and reported start/completion/abandon counts cannot be fully reconciled from available identifiers. They remain unresolved except for individually identified tests. This release does not certify all production CRM delivery paths: fresh marked end-to-end acceptance, delivery, notification, retry, and failure tests remain necessary. Existing automated tests cover storage failures and retries but are not production-delivery proof.

GBP saved-service diagnosis, signed-out public service visibility, and confirmation of Creedmoor, Oxford, Butner, and Stem as saved service areas remain outstanding. The verified public profile website was correct. No speculative service re-entry or profile edits were made.

Review actual inquiries, confirmed calendar appointments, connected calls, and enrollments separately through November 15. Unknown attribution stays unknown. Check appointment availability if visitors reach the calendar without booking. No ranking, inquiry, or enrollment uplift is promised.

## Rollback

Use Netlify's previously published deployment at `72ce090` if live verification reveals a regression. Preserve the release commit for diagnosis; do not force-push history or mix in unrelated local work.
