# North Carolina visibility and lead plan

Prepared November 9, 2026. Continued November 10. Owner: Christian Brinkley.

## What success means

More qualified North Carolina households finding Christian, asking a question, requesting a call, and completing an appointment. Track those outcomes alongside local visibility. First place everywhere and universal AI recommendations aren't promises anyone can make. Local Google results depend partly on the searcher's distance. AI citations vary by system, question, and retrieval.

Current scope confirmed by Christian: insurance, annuities, and financial education. Do not advertise investment management, personalized investment advice, CPA services, or CFP credentials.

## Evidence collected in this work

- The supplied inventory was a reference to investigate, not instructions to execute blindly.
- Production started at 2566e96. During this work, PR 46 restored Creedmoor and moved master to 37047d7. Preserve that change when integrating this release.
- Search Console's displayed three-month selection covered September 14 through November 7: 104 clicks, about 12,100 impressions, 0.9% CTR, average position 42.5. These are sitewide metrics, not positions for a particular town.
- GA4 lead acquisition for October 12 through November 8: three recorded new leads, all Direct; zero Organic Search new leads. Those three events have not been verified as real prospects. Christian reports no actual website form leads.
- GA4's home card showed 49 google / organic sessions in its displayed last-seven-days window. Internal and automated visits may be included. Do not combine that card with the 28-day lead report to calculate a conversion rate.
- Search Console indexing report updated November 5: 312 indexed examples, 116 excluded URLs. Captured all 312 displayed examples. The current 261-entry sitemap had 71 URLs absent from the delayed examples. Absence is unconfirmed indexing, not proof of exclusion.
- A synthetic /start request used Christian's own public email, no phone, no client information, and qa=1. It reached confirmation and delivered an owner email. The email included traffic_type=test. This verifies that request and owner alert, not every form or historical inquiry. The response used noemail=1, so prospect auto-reply delivery was not confirmed.
- Public readiness checks reported capture/storage/notification configuration ready. Configuration checks aren't live database or delivery tests.
- GBP was verified, with six reviews visible. Submitted a fuller description and Life insurance agency as a secondary category. On November 10, Life insurance agency was approved. The description remains pending, with Google displaying up to seven days for review. Submitted Durham, Raleigh, Cary, and Chapel Hill as service areas; these were pending Google review when saved.

Raw evidence is in the local output directory, not in this public repository:
`C:/Users/chris/Wealth-Engine/output/local-visibility-20261109/`.

## This release

1. Rewrite six formerly consolidated agent pages with sourced local care references and distinct questions: Creedmoor, Oxford, Stem, Reidsville, Thomasville, Lexington. Creedmoor's restoration already landed separately while work continued.
2. Add eight missing local guides: Durham, Chapel Hill, Cary, Apex, Morrisville, Garner, Clayton, Stovall. Include north Durham and RTP employer questions within Durham. Raleigh already covers north Raleigh care.
3. Use one main service page for Creedmoor and Oxford. Redirect overlapping legacy town URLs to their respective agent page instead of the general county anchor. Keep thin generated location families noindex.
4. Link local guides from the towns directory. Repair self-links for already-live Butner, Asheboro, Eden, and Reidsville. Add Triangle and Franklin-area links.
5. List each released canonical once in the sitemap, with edit dates. Add the pages to both optional assistant briefs. Keep crawl access open without claiming that a brief or special markup guarantees AI recommendations.
6. Expand service-area descriptions and one shared InsuranceAgency entity to match actual phone service. No invented offices or local addresses.
7. Add a sourced financial-planning questions guide that explains Christian's insurance and education scope. Connect Medicare, life insurance, annuities, retirement income, and professional verification.
8. Put the existing three-field Medicare callback form directly below the homepage hero. Give it a prominent hero link. Preserve scheduled calls, direct phone, and the email-question option.
9. Preserve original campaign tags and landing/form paths with saved callback requests. Reject query strings from those path fields.
10. Keep city contact links direct, instead of silently substituting the 45-minute booking path. Preserve booking elsewhere. Keep existing consent, bot protection, storage confirmation, and test-traffic exclusion.

## Priorities after the release

### First 7 days

- Inspect Creedmoor, Oxford, Durham, Raleigh, Greensboro, and the sitemap in Search Console after live deployment. Request indexing for priority changes as quota permits. A request is not confirmation of indexing.
- Confirm GBP's submitted description and secondary category. Correct social profile URLs only after checking the actual current profiles. Its saved TikTok and Instagram handles differed from the repository's handles.
- Investigate the unconfirmed prospect auto-reply and any retry/outbox entry for the synthetic request. The owner alert arrived, so don't describe the whole capture flow as broken.
- Reconcile GA4 generate_lead events with actual stored inquiries, separating test records. Review form starts, submit attempts, accepted inquiries, and completed appointments by landing page and source. Phone taps and booking-link clicks aren't completed appointments.

### Weeks 2 to 4

- Compare equivalent periods in GSC: query, landing page, device, clicks, impressions, CTR, position. Prioritize relevant local queries with impressions and reasonable positions before rewriting titles. Low position can explain low CTR.
- Review the homepage callback path against the former booking-first path. Report visits, form starts, accepted callbacks, qualified conversations, and booked appointments. With very low traffic, results are directional; don't claim an experiment winner.
- Check high-intent Medicare, life insurance, and annuity content for direct answers, author identity, current sources, honest limitations, and clear next steps.
- Build real local recognition: consistent listings, genuine customer reviews requested without incentives or review gating, and useful local educational resources. Prepare partner outreach for Christian; do not send it without explicit authorization.

### Months 2 to 3

- Review Madison, Graham, Mebane, Liberty, Ramseur, and Roxboro before restoring their older pages. Existing line counts aren't evidence of quality. Replace unsupported provider or appointment claims first.
- Consider Summerfield, Oak Ridge, Jamestown, Archdale, Randleman, Gibsonville, and Elon only when query data and distinct useful content justify separate pages. Maintain useful county sections meanwhile.
- Develop life insurance and retirement resources around actual questions and service scope, rather than publishing a near-identical page for every town.
- Keep a dated sample of local Google results and AI answers with the exact query, system, location context, cited URL, and observed recommendation. Don't report search API order as a local Google rank or promise an AI will repeat a citation.

## Verification completed before publishing

- Full suite: 105 test files and 1,868 tests passed.
- After callback attribution changes: 77 focused regression tests passed, including lead validation, request receipt, CTA behavior, and local route/sitemap checks.
- Production build and TypeScript passed on the final code. Lint passed with zero errors and two existing cron-export warnings.
- Desktop callback form inspected. Mobile width check: 375px content within a 375px document viewport, with the form displayed before the explanatory card. The homepage button reaches the form.
- Durham preview checked for direct contact action, local sources, heading, FAQs, and license details.
- The final homepage callback path still needs its production receipt and owner-alert check after deployment. Keep synthetic requests labeled and excluded from visitor metrics.

## Verification and rollback

Run type checks, relevant regression tests, lint, production build, desktop/mobile browser inspection, and public HTTP verification. Use `scripts/check-local-visibility.mjs` to check all 14 local pages, the education guide, duplicate aliases, and sitemap eligibility. The script optionally compares a captured GSC JSON baseline.

Publish only from a branch based on current master, because Netlify deploys master. Preserve unrelated work. If the release introduces a defect, revert the release commit on master and verify the resulting deployment. Do not force-push production history.

Google guidance used:
- https://developers.google.com/search/docs/appearance/ai-features
- https://support.google.com/business/answer/7091
- https://developers.google.com/search/docs/essentials/spam-policies#doorway-abuse

(919) 408-6671
