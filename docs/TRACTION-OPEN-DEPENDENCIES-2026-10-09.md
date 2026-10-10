# Traction release: what still needs Christian, October 9, 2026

Local release candidate on `claude/traction-2026-10-09`. Nothing deployed, nothing pushed to `master`. Results are in [TRACTION-RELEASE-REPORT-2026-10-09.md](TRACTION-RELEASE-REPORT-2026-10-09.md) and the gate in [CLAUDE-FINAL-RELEASE-GATE-2026-10-09.md](CLAUDE-FINAL-RELEASE-GATE-2026-10-09.md).

## Decisions only Christian can make

| # | Item | What the code does today | What is needed |
| --- | --- | --- | --- |
| 1 | **Reviews** | `GOOGLE_REVIEWS` is `null` and `TESTIMONIALS` is empty. The site shows a plain "See my Google profile" link. No count, no stars | Ask past clients for Google reviews. Then put the real count and rating in `lib/testimonials.ts`. Check with the compliance contact before any quote is shown |
| 2 | **License number** | `AGENT.npn` is `null`. No lookup link and no identifier in structured data | Decide whether to publish the NPN. If yes, set it in `lib/agent.ts` and the "Check my license with the state" link appears by itself |
| 3 | **Phone number** | The repo has (919) 408-6671 in `lib/agent.ts` and `lib/seo.ts`. An earlier note said the number had moved to a 336 line | Confirm which number is live. A 919 number on a Greensboro business is a known trust gap. Changing it means the Google profile and every listing change the same day |
| 4 | **Meta Pixel (T-02)** | Unchanged. No privacy wording was edited | Pick one: switch it off in Netlify while ads are parked, or keep it and approve a privacy sentence that is true for Meta |
| 5 | **Homepage H1** | Unchanged: "Medicare and money, explained by someone who lives here" | Approve or decline returning it to Medicare and local help |
| 6 | **Guide signup promise (T-08)** | The form now also appears on `/learn` and `/answers/*`. Consent text is unchanged and says "Reply unsubscribe to any email and you're off the list." Nothing is stored. Each signup is an email to Christian | That promise is kept by hand. Confirm it is being kept, or approve storage with a real unsubscribe route |
| 7 | **Town pages** | 19 of 20 `/medicare-in` pages are noindexed, including Winston-Salem and High Point | For each town worth bringing back, supply what only a local knows: where you meet people, which Social Security office residents use, what comes up there. Then add the slug to `INDEXABLE_MEDICARE_SLUGS` |
| 8 | **Service counties** | The checklist offers the eight counties that have a town page here. Codex recorded that Christian named Guilford, Alamance, Wake, Granville and Randolph in its chat. That is not in the repo and Wake has no page | Confirm the real list |
| 9 | **Compliance review of the checklist (T-07)** | It shows no plans, stores nothing, and recommends nothing | Run the page past the compliance contact before launch |
| 10 | **Partnerships, listings, backlinks** | None created, claimed or implied. No email or message was sent | Outreach is Christian's |

## After an approved deploy

- In GA4, star `phone_click`, `generate_lead` and `booking_confirmed`. Register the custom dimensions in MEASUREMENT-SPEC section 6.1. Until then the new events are collected but invisible in reports.
- Check the Cal.com webhook produces `booking_confirmed`. `booking_complete` is a browser diagnostic and must not be added to booking totals.
- Run Lighthouse once on a deploy preview and once on production for `/`, `/turning-65`, `/learn`, `/tools/compound-interest` and one guide. That is the before and after this branch could not produce locally.
- Export 28 days of Search Console data and follow GSC-IMPORT-WORKFLOW-2026-10-09.md.
- Proposed, not applied: change the Netlify build command to `npm run check`.

## Local facts that need a human check before they go on a page

Codex gathered these. They were not re-verified and are not on the site.

| County | Claimed contact | Why it is held back |
| --- | --- | --- |
| Guilford | Senior Resources of Guilford, 336-373-4816 | The source page did not return the number to a plain request |
| Alamance | SHIIP via Alamance ElderCare, 919-704-6714 | Third-party directory. A 919 number for a 336 county |
| Granville | Granville County Senior Services, 919-693-1930 | Source returned HTTP 403 |
| Randolph | None found | Use the state locator |

Open the source in a browser, read the number, then add it to `COUNTY_COUNSELING` in `lib/localMedicareFacts.ts` with the date.
