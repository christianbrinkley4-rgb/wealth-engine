# SEO implementation and booking verification, October 13, 2026

Implementation was completed on **cursor/seo-fixes-2026-10-12**, on top of commit **67d4583**, preserving the original Cursor work. This report records verification before Christian requested the branch commit and push on October 13. No production deployment was performed.

The primary ad destination is **/aep**. Its main action now goes directly to **/schedule?topic=medicare#booking-calendar**. Visitors can book without completing a quiz or selecting their topic again. The headline is shorter, the booking button is visible on the first phone screen, and calling Christian remains available.

## Booking journey and usability evidence

1. Open /aep and select **Book a free consultation**.
2. Reach the Medicare calendar with clear instructions, a 60-minute duration, Eastern time, and a phone/new-tab fallback.
3. Select an available date. The mobile calendar opens a focused list of available times.
4. Select a time and review the displayed date, time, duration, and contact form. Phone, video, and home-visit selections were checked. A home visit exposes the address field; video removes the phone-location field.
5. The visitor enters their details and presses Confirm. Medicare appointment requests still require Christian's personal confirmation.

Browser walkthroughs covered 320px, 390px, and 1440px viewport widths, visible buttons, menu keyboard navigation, Escape, real Cal.com availability, and the contact-details step. The booking page uses a short footer. No participant study with adults aged 64 to 75 was conducted, so universal ease of use cannot be guaranteed.

**No real appointment was submitted.** The final Confirm action accepts Cal.com's terms and creates a booking/notifications. This task verified availability and the details form, while automated tests cover lead processing, scheduling integration, and webhook behavior. A fresh live booking, email delivery, and Command Center synchronization remain a release acceptance check.

Cal.com's embedded event still has a long introduction, technical meeting labels, and an optional phone field in addition to the required phone-location field. The website explains those choices. The embed retains the selected date/time before confirmation; hiding all event details was rejected because it removed that review. Provider-side form settings were not changed on the live account.

![Revised mobile ad page](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/docs/seo-evidence/07-after-aep-mobile.png)

![Mobile time selection](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/docs/seo-evidence/08-after-booking-mobile.png)

![Mobile appointment details](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/docs/seo-evidence/09-after-details-mobile.png)

![Desktop ad page](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/docs/seo-evidence/10-after-aep-desktop.png)

## Completed verification

- Production build and TypeScript compilation passed.
- Full suite: **76 test files, 1,005 tests passed**. Lint passed with **zero errors and seven existing warnings**. Whitespace diff check passed.
- Rendered audit: **304 generated HTML pages**, with **203 indexed, nonredirected pages**. No duplicate titles, missing/multiple H1s, mismatched visible FAQ/schema text, missing speakable selectors, or broken checked anchors.
- All 203 indexed pages have titles under 60 characters, descriptions from 150 to 160 characters, canonical paths matching their route, and Twitter cards. Descriptions preserve existing factual content and add short reading actions where appropriate.
- HTTP audit: **250 page, booking, and redirect checks passed**. Static assets returned **public, max-age=31536000, immutable**. /aep returned a static-cache HIT with **s-maxage=3600, stale-while-revalidate=31532400**.
- Source route checks found no unresolved internal destinations among the checked indexed pages.
- Live production robots.txt, sitemap.xml, llms.txt, and llms-full.txt returned HTTP 200. Existing AI crawler rules were preserved. Production sitemap checks found no localhost/staging origin leakage. New routes are in the local build sitemap and will appear on production after deployment.
- Live /api/health reported configured readiness for the four calendars, webhook topic mapping, and Command Center routing. Its response explicitly says live connections were not checked, so it is configuration evidence rather than a fresh end-to-end delivery test.

## Schema results

The rendered HTML, including the actual speakable target elements, was submitted to [Schema.org's validator](https://validator.schema.org/). Results were saved locally:

| Page | Errors | Warnings | Detected top-level items |
| --- | --- | --- | --- |
| Homepage | 0 | 0 | 5 |
| /annual-enrollment | 0 | 0 | 7 |
| /turning-65 | 0 | 0 | 7 |
| /medicare-agent-greensboro-nc | 0 | 0 | 6 |

The business type is **InsuranceAgency**. Invalid service-only properties were replaced with appropriate business properties. FAQ/schema parity was verified against visible text, and priority FAQ answers are 20 to 25 words. The site retains Service markup for an undated consultation offering.

Review/AggregateRating, VideoObject, and Event helpers were implemented with truthful input requirements. No ratings are output without actual permissioned, visible, source-linked reviews. No YouTube videos are embedded in the current source, and no dated public consultation events were supplied. Consequently no fake review totals, video dates, or calendar-event dates were published. Schema validation does not establish Google rich-result eligibility or search rankings.

## Content and locations

The new local page is **/north-carolina-medicare-programs**. It covers SHIIP, NC Medigap protections, Extra Help and Medicare Savings Programs, CAP/DA, PACE, Medicaid expansion, and ePASS/county DSS. It uses section-level verification dates and official NC DOI, NCDHHS, NC Medicaid, Medicare, and CMS links.

The Greensboro pillar includes the cited 2027 Guilford County figures, enrollment windows, employer coverage, doctor/pharmacy checks, appointment preparation, ten FAQs, and optional interactive tools. County averages are explicitly distinguished from quotes, represented plans, and a person's total costs.

| Priority page | Rendered main words, including shared visible sections | Outcome |
| --- | --- | --- |
| /medicare-agent-greensboro-nc | 2940 | Rewritten with sourced local content and concise local FAQs |
| /medicare-agent-high-point-nc | 849 | Rewritten with sourced local content and concise local FAQs |
| /medicare-agent-winston-salem-nc | 836 | Rewritten with sourced local content and concise local FAQs |
| /medicare-agent-burlington-nc | 849 | Rewritten with sourced local content and concise local FAQs |
| /medicare-agent-kernersville-nc | 859 | Rewritten with sourced local content and concise local FAQs |

High Point, Winston-Salem, Burlington, and Kernersville each have over 300 words of distinct local content, three local FAQs, source references, and a local provider map reference. Thin aliases were consolidated into priority pages or county sections rather than expanded by swapping city names.

**41 permanent redirects** preserve old location links. The redirected sources are removed from the sitemap; their source files remain for traceability.

| Old path | Destination |
| --- | --- |
| /medicare-in/high-point | /medicare-agent-high-point-nc |
| /medicare-in/high-point-nc | /medicare-agent-high-point-nc |
| /medicare-in/winston-salem | /medicare-agent-winston-salem-nc |
| /medicare-in/winston-salem-nc | /medicare-agent-winston-salem-nc |
| /medicare-in/burlington | /medicare-agent-burlington-nc |
| /medicare-in/burlington-nc | /medicare-agent-burlington-nc |
| /medicare-in/kernersville | /medicare-agent-kernersville-nc |
| /medicare-in/summerfield | /medicare-nc-towns#guilford-county |
| /medicare-in/jamestown | /medicare-nc-towns#guilford-county |
| /medicare-in/oak-ridge | /medicare-nc-towns#guilford-county |
| /medicare-in/archdale | /medicare-nc-towns#randolph-county |
| /medicare-in/thomasville | /medicare-nc-towns#davidson-county |
| /medicare-in/pleasant-garden | /medicare-nc-towns#guilford-county |
| /medicare-in/whitsett | /medicare-nc-towns#guilford-county |
| /medicare-in/mcleansville | /medicare-nc-towns#guilford-county |
| /medicare-in/browns-summit | /medicare-nc-towns#guilford-county |
| /medicare-in/gibsonville | /medicare-nc-towns#alamance-county |
| /medicare-in/elon | /medicare-nc-towns#alamance-county |
| /medicare-in/stokesdale | /medicare-nc-towns#guilford-county |
| /medicare-in/colfax | /medicare-nc-towns#guilford-county |
| /medicare-in/reidsville | /medicare-nc-towns#rockingham-county |
| /medicare-in/randleman | /medicare-nc-towns#randolph-county |
| /medicare-asheboro-nc | /medicare-nc-towns#randolph-county |
| /medicare-butner-nc | /medicare-nc-towns#granville-county |
| /medicare-creedmoor-nc | /medicare-nc-towns#granville-county |
| /medicare-agent-creedmoor-nc | /medicare-nc-towns#granville-county |
| /medicare-agent-oxford-nc | /medicare-nc-towns#granville-county |
| /medicare-agent-stem-nc | /medicare-nc-towns#granville-county |
| /medicare-oxford-nc | /medicare-nc-towns#granville-county |
| /medicare-eden-nc | /medicare-nc-towns#rockingham-county |
| /medicare-madison-nc | /medicare-nc-towns#rockingham-county |
| /medicare-agent-reidsville-nc | /medicare-nc-towns#rockingham-county |
| /medicare-graham-nc | /medicare-nc-towns#alamance-county |
| /medicare-mebane-nc | /medicare-nc-towns#alamance-county |
| /medicare-liberty-nc | /medicare-nc-towns#randolph-county |
| /medicare-ramseur-nc | /medicare-nc-towns#randolph-county |
| /medicare-roxboro-nc | /medicare-nc-towns#person-county |
| /medicare-agent-lexington-nc | /medicare-nc-towns#davidson-county |
| /medicare-agent-thomasville-nc | /medicare-nc-towns#davidson-county |
| /medicare-in/greensboro | /medicare-agent-greensboro-nc |
| /medicare-in/greensboro-nc | /medicare-agent-greensboro-nc |

The master prompt's proposed claim that SHIIP cannot help people enroll was corrected. [NC DOI explicitly offers Part D enrollment assistance through SHIIP](https://www.ncdoi.gov/consumers/medicare-and-seniors-health-insurance-information-program-shiip/medicare-prescription-drug-plan-part-d). The new section distinguishes counseling from selling plans and explains when a licensed agent can help.

## Performance measurements

Lighthouse 13.5.0, local production builds, mobile throttling and desktop presets. Baseline used the untouched starting commit in an isolated temporary checkout. These are laboratory measurements, not production field Core Web Vitals. Cache state, CPU load, and run variability affect results.

| Page | Device | Score before / after | LCP before / after | CLS after | TBT after | Accessibility after | JS transfer after |
| --- | --- | --- | --- | --- | --- | --- | --- |
| / | mobile | 66 / 88 | 5.06s / 3.54s | 0.0161 | 126ms | 100 | 180.6 KiB |
| / | desktop | 100 / 100 | 0.65s / 0.74s | 0.0005 | 11ms | 100 | 211.7 KiB |
| /annual-enrollment | mobile | 79 / 90 | 4.38s / 3.39s | 0.0076 | 46ms | 100 | 195.8 KiB |
| /annual-enrollment | desktop | 99 / 100 | 0.92s / 0.69s | 0.0060 | 0ms | 100 | 216.4 KiB |
| /turning-65 | mobile | 78 / 88 | 4.51s / 3.49s | 0.0000 | 128ms | 100 | 190.4 KiB |
| /turning-65 | desktop | 99 / 100 | 0.94s / 0.71s | 0.0049 | 0ms | 100 | 210.9 KiB |
| /aep | mobile | 73 / 89 | 4.47s / 3.47s | 0.0000 | 78ms | 100 | 183.5 KiB |
| /aep | desktop | 98 / 100 | 0.98s / 0.72s | 0.0002 | 0ms | 100 | 204.1 KiB |


Mobile LCP improved compared with the original build, but the **2.5-second target is not met on every tested page**. CLS stays below 0.1. **INP was not measured** by navigation Lighthouse; TBT is shown as a lab diagnostic, not an INP replacement. Production field measurement is still required. Script transfer totals include shared chunks and browser prefetch; the 200KB page-wide budget is not met on every desktop run.

Changes include smaller font-axis payloads, immediate hero rendering, deferred optional guide tools, and AVIF/WebP output through next/image. Images keep small originals and are converted by the image optimizer on delivery. Fonts are self-hosted by next/font with display swap, so a remote font-CDN preconnect is unnecessary. The Meta Pixel implementation and quiz experiment logic were preserved.

## Remaining limits and owner actions

- Bing search did not conclusively establish indexing. Verify ownership in Bing Webmaster Tools, inspect indexed URLs, and submit the production sitemap after deployment. A missing search result is not proof of exclusion.
- Provide actual review text/source links and permission before review ratings can appear. Provide selected video URLs, upload dates, thumbnails, and durations before embedded VideoObject markup can be used. Dated event markup requires real announced sessions.
- Verify any additional AHIP certification, state-license identifiers, or years-licensed claims before adding them. The current author blocks use the supplied NPN and honest existing dates.
- Cross-directory NAP edits and GBP changes were not performed. Those require the relevant authenticated accounts and verified business data. The site retains its existing separation for /wealth and /ai, including their different footer/contact policies.
- Exact 20-to-25-word FAQ capsules were completed for the priority Medicare pages and rewritten city pages. Older article answers and every question-style heading across all financial/AI content were not compressed to that format. No first-hand client story or exclusive statistic was invented to satisfy an SEO claim.
- The minimum-three-inbound-links goal is not fully met. The rendered audit found **24 pages below three distinct indexed referring pages**, listed below. There are no unresolved internal targets, but a further editorial linking pass is appropriate for those pages. The audit counts static indexed-page links, not browser-only personalized navigation.
- No external deployment/CDN settings, review generation, paid service, or production Cal.com account settings were changed. The local preview keeps noindex protection and local canonical origins. Production uses its configured public origin.
- Current browser checks demonstrate working navigation through appointment details. They do not prove notification delivery or guarantee that every older visitor will find the provider form effortless. A supervised acceptance booking and a short usability test with the target age group would close those remaining gaps.

| Page with fewer than three inbound links | Distinct indexed referring pages |
| --- | --- |
| /answers/does-medicare-cover-ambulance | 2 |
| /answers/does-medicare-cover-chiropractic | 2 |
| /answers/medicare-advantage-plan-cancelled | 2 |
| /ask/401k-rollover-check-60-day-rule | 1 |
| /ask/backdoor-roth-ira-explained | 1 |
| /ask/hsa-after-leaving-job | 1 |
| /ask/no-tax-on-overtime-what-actually-qualifies | 1 |
| /ask/rmd-age-73-how-much | 1 |
| /final-expense-insurance | 0 |
| /guides/child-tax-credit-2026 | 2 |
| /guides/i-bonds-vs-tips | 2 |
| /guides/roth-ira-mistakes-to-avoid | 2 |
| /guides/tax-loss-harvesting-wash-sale | 2 |
| /medicare-advantage-plans-winston-salem-nc | 0 |
| /medigap-plans-high-point-nc | 0 |
| /tools/cd-or-savings-quiz | 2 |
| /tools/emergency-fund | 2 |
| /tools/life-insurance-needs | 2 |
| /tools/medigap-or-advantage-quiz | 2 |
| /tools/roth-conversion-ladder | 2 |
| /tools/roth-conversion-quiz | 2 |
| /wealth/building-in-public | 1 |
| /wealth/car-buying-money-guide | 2 |
| /wealth/pre-retirement-5-year-checklist | 2 |

## Files changed

194 changed/new files in the working tree. Raw evidence is kept in ignored **docs/seo-evidence**. Local .env.local was updated only with the documented public calendar URLs where missing; it is not committed and no private credential was added or replaced.

| File | Tracked line change | Description |
| --- | --- | --- |
| [.gitignore](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/.gitignore) | +55 / -52 | Keep local screenshots, build output, and Lighthouse evidence out of commits. |
| [app/advantage-vs-medigap/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/advantage-vs-medigap/page.tsx) | +273 / -262 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/aep-quiz/AepQuiz.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/aep-quiz/AepQuiz.tsx) | +562 / -560 | Refine shared layout, contrast, first-screen rendering, or mobile booking controls. |
| [app/aep-quiz/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/aep-quiz/page.tsx) | +169 / -158 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/aep/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/aep/page.tsx) | +29 / -56 | Simplify the Facebook ad landing page, provide a direct booking route, and synchronize concise visible FAQs with schema. |
| [app/ai/ai-for-job-search/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/ai/ai-for-job-search/page.tsx) | +171 / -164 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/ai/ai-for-seniors/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/ai/ai-for-seniors/page.tsx) | +211 / -204 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/ai/ai-for-small-business/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/ai/ai-for-small-business/page.tsx) | +179 / -172 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/ai/ai-mistakes-to-avoid/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/ai/ai-mistakes-to-avoid/page.tsx) | +180 / -173 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/ai/ai-money-tasks/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/ai/ai-money-tasks/page.tsx) | +191 / -184 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/ai/ai-tools-compared/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/ai/ai-tools-compared/page.tsx) | +237 / -230 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/ai/connect/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/ai/connect/page.tsx) | +269 / -262 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/ai/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/ai/page.tsx) | +265 / -258 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/ai/which-ai-for-which-task/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/ai/which-ai-for-which-task/page.tsx) | +206 / -199 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/annual-enrollment/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/annual-enrollment/page.tsx) | +375 / -402 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/annuities/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/annuities/page.tsx) | +240 / -229 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/anoc/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/anoc/page.tsx) | +284 / -273 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/answers/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/answers/page.tsx) | +84 / -78 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/ask/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/ask/page.tsx) | +124 / -118 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/care-coverage/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/care-coverage/page.tsx) | +136 / -130 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/components/ArticleBody.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/components/ArticleBody.tsx) | +24 / -10 | Show author credentials and review dates; add relevant local Medicare links. |
| [app/components/GuideTownLinks.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/components/GuideTownLinks.tsx) | +49 / -48 | Link town navigation to consolidated canonical destinations. |
| [app/components/KitchenTableClose.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/components/KitchenTableClose.tsx) | +61 / -58 | Put the booking action first for consultation closes. |
| [app/components/MedicareByline.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/components/MedicareByline.tsx) | New file | Create a reusable author photo, NPN, and honest review-date block. |
| [app/components/PriorityCityMedicarePage.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/components/PriorityCityMedicarePage.tsx) | New file | Render unique local facts, three city FAQs, source links, tools, and booking. |
| [app/components/RelatedMedicareGuides.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/components/RelatedMedicareGuides.tsx) | New file | Provide descriptive links to local Medicare help and supporting guides. |
| [app/components/ServiceHero.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/components/ServiceHero.tsx) | +30 / -8 | Prioritize booking, remove delayed first-screen reveals, and repair dark-hero class separation. |
| [app/components/ShiipAndAgent.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/components/ShiipAndAgent.tsx) | New file | Explain SHIIP and licensed-agent roles using verified NC DOI guidance. |
| [app/components/SiteFooter.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/components/SiteFooter.tsx) | +37 / -3 | Use a compact booking-flow footer with text contact information and disclosures; link the new Medicare resources elsewhere. |
| [app/components/StandaloneRelatedLinks.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/components/StandaloneRelatedLinks.tsx) | +16 / -12 | Add the shared Medicare resource links to standalone guides. |
| [app/components/TopRouteChrome.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/components/TopRouteChrome.tsx) | +109 / -66 | Add persistent booking access and keyboard focus handling for the mobile menu. |
| [app/final-expense-insurance/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/final-expense-insurance/page.tsx) | +264 / -253 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/greensboro-medicare-cost-calculator/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/greensboro-medicare-cost-calculator/page.tsx) | +230 / -220 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/guides/[slug]/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/guides/[slug]/page.tsx) | +216 / -212 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/guides/irmaa-brackets-2026/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/guides/irmaa-brackets-2026/page.tsx) | +275 / -266 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/guides/is-social-security-taxed/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/guides/is-social-security-taxed/page.tsx) | +276 / -267 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/guides/medicare-automatic-renewal/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/guides/medicare-automatic-renewal/page.tsx) | +268 / -259 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/guides/medicare-hsa-contributions/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/guides/medicare-hsa-contributions/page.tsx) | +266 / -257 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/guides/medicare-part-b-employer-coverage/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/guides/medicare-part-b-employer-coverage/page.tsx) | +257 / -248 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/guides/medicare-travel/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/guides/medicare-travel/page.tsx) | +240 / -231 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/guides/missed-medicare-enrollment/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/guides/missed-medicare-enrollment/page.tsx) | +275 / -266 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/guides/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/guides/page.tsx) | +131 / -131 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/guides/standard-deduction-seniors-2026/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/guides/standard-deduction-seniors-2026/page.tsx) | +266 / -257 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/guides/what-medicare-does-not-cover/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/guides/what-medicare-does-not-cover/page.tsx) | +325 / -316 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/guides/working-while-collecting-social-security/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/guides/working-while-collecting-social-security/page.tsx) | +266 / -257 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/helping-a-parent/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/helping-a-parent/page.tsx) | +219 / -208 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/irmaa-appeal/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/irmaa-appeal/page.tsx) | +306 / -295 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/keep-my-doctor/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/keep-my-doctor/page.tsx) | +267 / -256 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/landing.css](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/landing.css) | +1444 / -1443 | Refine shared layout, contrast, first-screen rendering, or mobile booking controls. |
| [app/layout.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/layout.tsx) | +139 / -140 | Reduce font payload and prevent duplicate brand suffixes in page titles. |
| [app/learn/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/learn/page.tsx) | +149 / -147 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/life-insurance/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/life-insurance/page.tsx) | +255 / -244 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/llms.txt/route.ts](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/llms.txt/route.ts) | +287 / -286 | Correct references to consolidated local pages in the existing AI-readable index. |
| [app/medicare-advantage-doctor-networks/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-advantage-doctor-networks/page.tsx) | +336 / -324 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare-advantage-north-carolina/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-advantage-north-carolina/page.tsx) | +395 / -384 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare-advantage-plans-greensboro-nc/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-advantage-plans-greensboro-nc/page.tsx) | +360 / -349 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare-advantage-plans-winston-salem-nc/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-advantage-plans-winston-salem-nc/page.tsx) | +312 / -301 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare-advantage-vs-medigap-greensboro-nc/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-advantage-vs-medigap-greensboro-nc/page.tsx) | +231 / -220 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare-agent-burlington-nc/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-agent-burlington-nc/page.tsx) | +3 / -283 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare-agent-creedmoor-nc/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-agent-creedmoor-nc/page.tsx) | +291 / -280 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare-agent-greensboro-nc/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-agent-greensboro-nc/page.tsx) | +142 / -249 | Expand the Greensboro pillar with county data, local appointment guidance, FAQs, tools, and citations. |
| [app/medicare-agent-high-point-nc/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-agent-high-point-nc/page.tsx) | +3 / -289 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare-agent-kernersville-nc/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-agent-kernersville-nc/page.tsx) | +3 / -280 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare-agent-lexington-nc/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-agent-lexington-nc/page.tsx) | +294 / -283 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare-agent-oxford-nc/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-agent-oxford-nc/page.tsx) | +291 / -280 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare-agent-reidsville-nc/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-agent-reidsville-nc/page.tsx) | +299 / -288 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare-agent-stem-nc/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-agent-stem-nc/page.tsx) | +307 / -296 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare-agent-thomasville-nc/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-agent-thomasville-nc/page.tsx) | +295 / -284 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare-agent-winston-salem-nc/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-agent-winston-salem-nc/page.tsx) | +3 / -289 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare-annual-enrollment-2026-checklist/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-annual-enrollment-2026-checklist/page.tsx) | +287 / -276 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare-asheboro-nc/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-asheboro-nc/page.tsx) | +302 / -291 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare-butner-nc/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-butner-nc/page.tsx) | +322 / -311 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare-changes-2027/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-changes-2027/page.tsx) | +242 / -231 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare-costs-2026/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-costs-2026/page.tsx) | +412 / -412 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare-costs-north-carolina/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-costs-north-carolina/page.tsx) | +333 / -322 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare-costs/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-costs/page.tsx) | +228 / -247 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare-creedmoor-nc/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-creedmoor-nc/page.tsx) | +299 / -288 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare-eden-nc/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-eden-nc/page.tsx) | +330 / -319 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare-graham-nc/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-graham-nc/page.tsx) | +317 / -306 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare-liberty-nc/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-liberty-nc/page.tsx) | +317 / -306 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare-madison-nc/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-madison-nc/page.tsx) | +333 / -322 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare-mebane-nc/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-mebane-nc/page.tsx) | +311 / -300 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare-nc-towns/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-nc-towns/page.tsx) | +296 / -282 | Consolidate thinner town pages into county sections with local notes and stable anchors. |
| [app/medicare-numbers-2027/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-numbers-2027/page.tsx) | +204 / -193 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare-oxford-nc/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-oxford-nc/page.tsx) | +302 / -291 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare-part-d-donut-hole-2027/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-part-d-donut-hole-2027/page.tsx) | +211 / -201 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare-part-d-greensboro-nc/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-part-d-greensboro-nc/page.tsx) | +287 / -276 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare-plan-checklist/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-plan-checklist/page.tsx) | +78 / -74 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare-ramseur-nc/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-ramseur-nc/page.tsx) | +317 / -306 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare-roxboro-nc/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-roxboro-nc/page.tsx) | +326 / -315 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare-supplement-plans-greensboro-nc/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-supplement-plans-greensboro-nc/page.tsx) | +230 / -219 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare-words/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare-words/page.tsx) | +146 / -144 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medicare/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medicare/page.tsx) | +90 / -83 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medigap-plans-greensboro-nc/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medigap-plans-greensboro-nc/page.tsx) | +268 / -257 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/medigap-plans-high-point-nc/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/medigap-plans-high-point-nc/page.tsx) | +317 / -306 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/north-carolina-medicare-programs/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/north-carolina-medicare-programs/page.tsx) | New file | Create the sourced NC program hub with seven assistance topics and section verification dates. |
| [app/numbers/meta.ts](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/numbers/meta.ts) | +14 / -14 | Refine shared layout, contrast, first-screen rendering, or mobile booking controls. |
| [app/numbers/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/numbers/page.tsx) | +231 / -224 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/page.tsx) | +48 / -63 | Make free consultation booking the primary action; add concise FAQs, local support guidance, and review-safe business schema. |
| [app/pages.css](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/pages.css) | +1005 / -997 | Refine shared layout, contrast, first-screen rendering, or mobile booking controls. |
| [app/part-b-penalty/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/part-b-penalty/page.tsx) | +118 / -136 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/plan-check/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/plan-check/page.tsx) | +184 / -177 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/plan/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/plan/page.tsx) | +86 / -79 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/remind-me/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/remind-me/page.tsx) | +76 / -69 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/retirement-income/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/retirement-income/page.tsx) | +324 / -313 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/roth-window/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/roth-window/page.tsx) | +79 / -72 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/schedule/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/schedule/page.tsx) | +55 / -13 | Explain date selection, meeting length, and Medicare confirmation; link directly to the calendar and provide a shorter contact fallback. |
| [app/service-area/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/service-area/page.tsx) | +293 / -287 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/sitemap.ts](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/sitemap.ts) | +259 / -257 | Include the program hub and exclude permanently redirected location aliases. |
| [app/social-security-timing/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/social-security-timing/page.tsx) | +283 / -272 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/special-enrollment/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/special-enrollment/page.tsx) | +227 / -216 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/system.css](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/system.css) | +1576 / -1570 | Refine shared layout, contrast, first-screen rendering, or mobile booking controls. |
| [app/taxes-and-retirement/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/taxes-and-retirement/page.tsx) | +191 / -189 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/tools/budget/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/tools/budget/page.tsx) | +115 / -111 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/tools/cd-or-savings-quiz/data.ts](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/tools/cd-or-savings-quiz/data.ts) | +200 / -200 | Refine shared layout, contrast, first-screen rendering, or mobile booking controls. |
| [app/tools/cd-or-savings-quiz/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/tools/cd-or-savings-quiz/page.tsx) | +107 / -105 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/tools/compound-interest/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/tools/compound-interest/page.tsx) | +115 / -111 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/tools/debt-payoff/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/tools/debt-payoff/page.tsx) | +110 / -106 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/tools/emergency-fund/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/tools/emergency-fund/page.tsx) | +108 / -104 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/tools/life-insurance-needs/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/tools/life-insurance-needs/page.tsx) | +111 / -107 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/tools/medigap-or-advantage-quiz/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/tools/medigap-or-advantage-quiz/page.tsx) | +140 / -138 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/tools/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/tools/page.tsx) | +227 / -217 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/tools/retirement-projector/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/tools/retirement-projector/page.tsx) | +114 / -110 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/tools/roth-conversion-ladder/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/tools/roth-conversion-ladder/page.tsx) | +124 / -118 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/tools/roth-conversion-quiz/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/tools/roth-conversion-quiz/page.tsx) | +111 / -109 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/tools/roth-vs-traditional/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/tools/roth-vs-traditional/page.tsx) | +117 / -113 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/tools/take-home-pay/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/tools/take-home-pay/page.tsx) | +114 / -110 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/turning-65-checklist/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/turning-65-checklist/page.tsx) | +311 / -300 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/turning-65-medicare-guide/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/turning-65-medicare-guide/page.tsx) | +349 / -338 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/turning-65/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/turning-65/page.tsx) | +439 / -486 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/wealth/401k-explained/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/wealth/401k-explained/page.tsx) | +230 / -230 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/wealth/529-college-savings-basics/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/wealth/529-college-savings-basics/page.tsx) | +220 / -220 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/wealth/529-vs-roth-for-college/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/wealth/529-vs-roth-for-college/page.tsx) | +205 / -205 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/wealth/broke-money-reset-plan/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/wealth/broke-money-reset-plan/page.tsx) | +106 / -106 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/wealth/budgeting-that-actually-works/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/wealth/budgeting-that-actually-works/page.tsx) | +227 / -227 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/wealth/building-in-public/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/wealth/building-in-public/page.tsx) | +218 / -218 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/wealth/buying-first-home-money-guide/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/wealth/buying-first-home-money-guide/page.tsx) | +222 / -222 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/wealth/car-buying-money-guide/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/wealth/car-buying-money-guide/page.tsx) | +194 / -194 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/wealth/catch-up-contributions-after-50/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/wealth/catch-up-contributions-after-50/page.tsx) | +118 / -118 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/wealth/credit-cards-beginners/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/wealth/credit-cards-beginners/page.tsx) | +195 / -195 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/wealth/credit-score-basics/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/wealth/credit-score-basics/page.tsx) | +222 / -222 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/wealth/disability-insurance-explained/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/wealth/disability-insurance-explained/page.tsx) | +99 / -99 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/wealth/emergency-fund-guide/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/wealth/emergency-fund-guide/page.tsx) | +108 / -108 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/wealth/first-tax-return-guide/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/wealth/first-tax-return-guide/page.tsx) | +105 / -105 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/wealth/health-insurance-basics/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/wealth/health-insurance-basics/page.tsx) | +102 / -102 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/wealth/hsa-explained/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/wealth/hsa-explained/page.tsx) | +203 / -203 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/wealth/journey/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/wealth/journey/page.tsx) | +102 / -102 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/wealth/life-insurance-explained/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/wealth/life-insurance-explained/page.tsx) | +219 / -219 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/wealth/money-moves-in-your-20s/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/wealth/money-moves-in-your-20s/page.tsx) | +230 / -230 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/wealth/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/wealth/page.tsx) | +390 / -390 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/wealth/pre-retirement-5-year-checklist/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/wealth/pre-retirement-5-year-checklist/page.tsx) | +110 / -110 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/wealth/quiz/first-1000/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/wealth/quiz/first-1000/page.tsx) | +68 / -68 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/wealth/quiz/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/wealth/quiz/page.tsx) | +43 / -43 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/wealth/rent-vs-buy-math/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/wealth/rent-vs-buy-math/page.tsx) | +197 / -197 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/wealth/rmd-explained-73/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/wealth/rmd-explained-73/page.tsx) | +201 / -201 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/wealth/roth-ira-explained/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/wealth/roth-ira-explained/page.tsx) | +228 / -228 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/wealth/roth-vs-traditional-taxes/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/wealth/roth-vs-traditional-taxes/page.tsx) | +109 / -109 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/wealth/side-hustle-taxes/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/wealth/side-hustle-taxes/page.tsx) | +203 / -203 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/wealth/social-security-explained/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/wealth/social-security-explained/page.tsx) | +207 / -207 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/wealth/student-loans-payoff-plan/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/wealth/student-loans-payoff-plan/page.tsx) | +215 / -215 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/wealth/tax-brackets-explained-plainly/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/wealth/tax-brackets-explained-plainly/page.tsx) | +118 / -118 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [app/wealth/teens-first-job-money-guide/page.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/app/wealth/teens-first-job-money-guide/page.tsx) | +222 / -222 | Refresh page metadata and social cards; add author or related-guide links where applicable. |
| [components/CalEmbed.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/components/CalEmbed.tsx) | +28 / -3 | Add clear booking instructions and fallback contact access; use Eastern time and a mobile slot-selection dialog while retaining date/time review. |
| [components/MedicareGuideTools.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/components/MedicareGuideTools.tsx) | New file | Load optional quiz, penalty calculator, and enrollment timeline tools on expansion. |
| [components/StickyMobileCta.tsx](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/components/StickyMobileCta.tsx) | +150 / -145 | Point Medicare booking links to the calendar; preserve dismissal and display behavior. |
| [docs/SEO-IMPLEMENTATION-2026-10-13.md](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/docs/SEO-IMPLEMENTATION-2026-10-13.md) | New file | Document changes, verification, performance, location consolidation, and remaining limits. |
| [lib/__tests__/capture.test.ts](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/lib/__tests__/capture.test.ts) | +495 / -495 | Update regression coverage for the requested schema, metadata, lead flow, or preserved tracking behavior. |
| [lib/__tests__/localRankingFaqs.test.ts](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/lib/__tests__/localRankingFaqs.test.ts) | +126 / -125 | Update regression coverage for the requested schema, metadata, lead flow, or preserved tracking behavior. |
| [lib/__tests__/medicare-seo.test.ts](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/lib/__tests__/medicare-seo.test.ts) | New file | Update regression coverage for the requested schema, metadata, lead flow, or preserved tracking behavior. |
| [lib/__tests__/meta-pixel-events.test.ts](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/lib/__tests__/meta-pixel-events.test.ts) | +36 / -36 | Update regression coverage for the requested schema, metadata, lead flow, or preserved tracking behavior. |
| [lib/__tests__/searchDiscovery.test.ts](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/lib/__tests__/searchDiscovery.test.ts) | +177 / -177 | Update regression coverage for the requested schema, metadata, lead flow, or preserved tracking behavior. |
| [lib/__tests__/seo-separation.test.ts](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/lib/__tests__/seo-separation.test.ts) | +57 / -57 | Update regression coverage for the requested schema, metadata, lead flow, or preserved tracking behavior. |
| [lib/__tests__/traction-architecture.test.ts](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/lib/__tests__/traction-architecture.test.ts) | +114 / -113 | Update regression coverage for the requested schema, metadata, lead flow, or preserved tracking behavior. |
| [lib/__tests__/traction-measurement.test.ts](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/lib/__tests__/traction-measurement.test.ts) | +198 / -198 | Update regression coverage for the requested schema, metadata, lead flow, or preserved tracking behavior. |
| [lib/__tests__/traffic-guides.test.ts](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/lib/__tests__/traffic-guides.test.ts) | +101 / -100 | Update regression coverage for the requested schema, metadata, lead flow, or preserved tracking behavior. |
| [lib/aep.ts](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/lib/aep.ts) | +36 / -36 | Shorten phase-specific ad headlines and introductions without changing enrollment-date logic. |
| [lib/articles.ts](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/lib/articles.ts) | +2310 / -2310 | Update guide metadata or discovery links to the revised Medicare resources. |
| [lib/askWall.ts](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/lib/askWall.ts) | +414 / -414 | Update guide metadata or discovery links to the revised Medicare resources. |
| [lib/greensboroMedicareGuide.ts](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/lib/greensboroMedicareGuide.ts) | New file | Supply substantial Greensboro-specific content, ten concise FAQs, and cited county data. |
| [lib/learn.ts](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/lib/learn.ts) | +359 / -352 | Update guide metadata or discovery links to the revised Medicare resources. |
| [lib/locationConsolidation.ts](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/lib/locationConsolidation.ts) | New file | Define permanent redirects and a canonical local-link helper. |
| [lib/priorityMedicareCities.ts](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/lib/priorityMedicareCities.ts) | New file | Supply distinct High Point, Winston-Salem, Burlington, and Kernersville content and FAQs. |
| [lib/priorityMedicareFaqs.ts](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/lib/priorityMedicareFaqs.ts) | New file | Share 20-to-25-word answers between visible priority-page FAQs and JSON-LD. |
| [lib/regionalMedicareNotes.ts](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/lib/regionalMedicareNotes.ts) | New file | Provide substantive county context for the consolidated town hub. |
| [lib/seo.ts](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/lib/seo.ts) | +110 / -25 | Use InsuranceAgency, validate real event dates, and add video/review helpers without fabricated markup. |
| [lib/standaloneGuides.ts](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/lib/standaloneGuides.ts) | +120 / -120 | Update guide metadata or discovery links to the revised Medicare resources. |
| [lib/taxArticles.ts](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/lib/taxArticles.ts) | +395 / -395 | Update guide metadata or discovery links to the revised Medicare resources. |
| [lib/testimonials.ts](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/lib/testimonials.ts) | +20 / -0 | Allow ratings only from permissioned, visible, source-linked reviews; actual review data remains empty. |
| [lib/trafficGuides.ts](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/lib/trafficGuides.ts) | +2292 / -2292 | Update guide metadata or discovery links to the revised Medicare resources. |
| [lib/wealth/articles.ts](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/lib/wealth/articles.ts) | +501 / -501 | Update guide metadata or discovery links to the revised Medicare resources. |
| [lib/wealth/seo.ts](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/lib/wealth/seo.ts) | +87 / -86 | Keep titles under the target length without duplicate branding. |
| [next.config.ts](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/next.config.ts) | +7 / -0 | Serve AVIF/WebP through next/image and register permanent local-page redirects. |
| [scripts/seo-build-audit.mjs](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/scripts/seo-build-audit.mjs) | New file | Audit rendered titles, H1s, visible FAQs, speakable selectors, and anchors. |
| [scripts/seo-source-audit.mjs](C:/Users/chris/Wealth-Engine/christianbrinkleync-site/scripts/seo-source-audit.mjs) | New file | Provide an AST-based source metadata audit. |

## Git diff summary

This includes tracked files only; the new files in the table above are additional until staged.

```text
.gitignore                                         |  107 +-
 app/advantage-vs-medigap/page.tsx                  |  535 +--
 app/aep-quiz/AepQuiz.tsx                           | 1122 ++---
 app/aep-quiz/page.tsx                              |  327 +-
 app/aep/page.tsx                                   |   85 +-
 app/ai/ai-for-job-search/page.tsx                  |  335 +-
 app/ai/ai-for-seniors/page.tsx                     |  415 +-
 app/ai/ai-for-small-business/page.tsx              |  351 +-
 app/ai/ai-mistakes-to-avoid/page.tsx               |  353 +-
 app/ai/ai-money-tasks/page.tsx                     |  375 +-
 app/ai/ai-tools-compared/page.tsx                  |  467 +-
 app/ai/connect/page.tsx                            |  531 +--
 app/ai/page.tsx                                    |  523 +--
 app/ai/which-ai-for-which-task/page.tsx            |  405 +-
 app/annual-enrollment/page.tsx                     |  777 ++--
 app/annuities/page.tsx                             |  469 +-
 app/anoc/page.tsx                                  |  557 +--
 app/answers/page.tsx                               |  162 +-
 app/ask/page.tsx                                   |  242 +-
 app/care-coverage/page.tsx                         |  266 +-
 app/components/ArticleBody.tsx                     |   34 +-
 app/components/GuideTownLinks.tsx                  |   97 +-
 app/components/KitchenTableClose.tsx               |  119 +-
 app/components/ServiceHero.tsx                     |   38 +-
 app/components/SiteFooter.tsx                      |   40 +-
 app/components/StandaloneRelatedLinks.tsx          |   28 +-
 app/components/TopRouteChrome.tsx                  |  175 +-
 app/final-expense-insurance/page.tsx               |  517 +--
 app/greensboro-medicare-cost-calculator/page.tsx   |  450 +-
 app/guides/[slug]/page.tsx                         |  428 +-
 app/guides/irmaa-brackets-2026/page.tsx            |  541 +--
 app/guides/is-social-security-taxed/page.tsx       |  543 +--
 app/guides/medicare-automatic-renewal/page.tsx     |  527 +--
 app/guides/medicare-hsa-contributions/page.tsx     |  523 +--
 .../medicare-part-b-employer-coverage/page.tsx     |  505 +--
 app/guides/medicare-travel/page.tsx                |  471 +-
 app/guides/missed-medicare-enrollment/page.tsx     |  541 +--
 app/guides/page.tsx                                |  262 +-
 .../standard-deduction-seniors-2026/page.tsx       |  523 +--
 app/guides/what-medicare-does-not-cover/page.tsx   |  641 +--
 .../page.tsx                                       |  523 +--
 app/helping-a-parent/page.tsx                      |  427 +-
 app/irmaa-appeal/page.tsx                          |  601 +--
 app/keep-my-doctor/page.tsx                        |  523 +--
 app/landing.css                                    | 2887 ++++++------
 app/layout.tsx                                     |  279 +-
 app/learn/page.tsx                                 |  296 +-
 app/life-insurance/page.tsx                        |  499 +--
 app/llms.txt/route.ts                              |  573 +--
 app/medicare-advantage-doctor-networks/page.tsx    |  660 +--
 app/medicare-advantage-north-carolina/page.tsx     |  779 ++--
 .../page.tsx                                       |  709 +--
 .../page.tsx                                       |  613 +--
 .../page.tsx                                       |  451 +-
 app/medicare-agent-burlington-nc/page.tsx          |  286 +-
 app/medicare-agent-creedmoor-nc/page.tsx           |  571 +--
 app/medicare-agent-greensboro-nc/page.tsx          |  391 +-
 app/medicare-agent-high-point-nc/page.tsx          |  292 +-
 app/medicare-agent-kernersville-nc/page.tsx        |  283 +-
 app/medicare-agent-lexington-nc/page.tsx           |  577 +--
 app/medicare-agent-oxford-nc/page.tsx              |  571 +--
 app/medicare-agent-reidsville-nc/page.tsx          |  587 +--
 app/medicare-agent-stem-nc/page.tsx                |  603 +--
 app/medicare-agent-thomasville-nc/page.tsx         |  579 +--
 app/medicare-agent-winston-salem-nc/page.tsx       |  292 +-
 .../page.tsx                                       |  563 +--
 app/medicare-asheboro-nc/page.tsx                  |  593 +--
 app/medicare-butner-nc/page.tsx                    |  633 +--
 app/medicare-changes-2027/page.tsx                 |  473 +-
 app/medicare-costs-2026/page.tsx                   |  824 ++--
 app/medicare-costs-north-carolina/page.tsx         |  655 +--
 app/medicare-costs/page.tsx                        |  475 +-
 app/medicare-creedmoor-nc/page.tsx                 |  587 +--
 app/medicare-eden-nc/page.tsx                      |  649 +--
 app/medicare-graham-nc/page.tsx                    |  623 +--
 app/medicare-liberty-nc/page.tsx                   |  623 +--
 app/medicare-madison-nc/page.tsx                   |  655 +--
 app/medicare-mebane-nc/page.tsx                    |  611 +--
 app/medicare-nc-towns/page.tsx                     |  578 +--
 app/medicare-numbers-2027/page.tsx                 |  397 +-
 app/medicare-oxford-nc/page.tsx                    |  593 +--
 app/medicare-part-d-donut-hole-2027/page.tsx       |  412 +-
 app/medicare-part-d-greensboro-nc/page.tsx         |  563 +--
 app/medicare-plan-checklist/page.tsx               |  152 +-
 app/medicare-ramseur-nc/page.tsx                   |  623 +--
 app/medicare-roxboro-nc/page.tsx                   |  641 +--
 .../page.tsx                                       |  449 +-
 app/medicare-words/page.tsx                        |  290 +-
 app/medicare/page.tsx                              |  173 +-
 app/medigap-plans-greensboro-nc/page.tsx           |  525 +--
 app/medigap-plans-high-point-nc/page.tsx           |  623 +--
 app/numbers/meta.ts                                |   28 +-
 app/numbers/page.tsx                               |  455 +-
 app/page.tsx                                       |  111 +-
 app/pages.css                                      | 2002 ++++-----
 app/part-b-penalty/page.tsx                        |  254 +-
 app/plan-check/page.tsx                            |  361 +-
 app/plan/page.tsx                                  |  165 +-
 app/remind-me/page.tsx                             |  145 +-
 app/retirement-income/page.tsx                     |  637 +--
 app/roth-window/page.tsx                           |  151 +-
 app/schedule/page.tsx                              |   68 +-
 app/service-area/page.tsx                          |  580 +--
 app/sitemap.ts                                     |  516 +--
 app/social-security-timing/page.tsx                |  555 +--
 app/special-enrollment/page.tsx                    |  443 +-
 app/system.css                                     | 3146 ++++++-------
 app/taxes-and-retirement/page.tsx                  |  380 +-
 app/tools/budget/page.tsx                          |  226 +-
 app/tools/cd-or-savings-quiz/data.ts               |  400 +-
 app/tools/cd-or-savings-quiz/page.tsx              |  212 +-
 app/tools/compound-interest/page.tsx               |  226 +-
 app/tools/debt-payoff/page.tsx                     |  216 +-
 app/tools/emergency-fund/page.tsx                  |  212 +-
 app/tools/life-insurance-needs/page.tsx            |  218 +-
 app/tools/medigap-or-advantage-quiz/page.tsx       |  278 +-
 app/tools/page.tsx                                 |  444 +-
 app/tools/retirement-projector/page.tsx            |  224 +-
 app/tools/roth-conversion-ladder/page.tsx          |  242 +-
 app/tools/roth-conversion-quiz/page.tsx            |  220 +-
 app/tools/roth-vs-traditional/page.tsx             |  230 +-
 app/tools/take-home-pay/page.tsx                   |  224 +-
 app/turning-65-checklist/page.tsx                  |  611 +--
 app/turning-65-medicare-guide/page.tsx             |  687 +--
 app/turning-65/page.tsx                            |  925 ++--
 app/wealth/401k-explained/page.tsx                 |  460 +-
 app/wealth/529-college-savings-basics/page.tsx     |  440 +-
 app/wealth/529-vs-roth-for-college/page.tsx        |  410 +-
 app/wealth/broke-money-reset-plan/page.tsx         |  212 +-
 app/wealth/budgeting-that-actually-works/page.tsx  |  454 +-
 app/wealth/building-in-public/page.tsx             |  436 +-
 app/wealth/buying-first-home-money-guide/page.tsx  |  444 +-
 app/wealth/car-buying-money-guide/page.tsx         |  388 +-
 .../catch-up-contributions-after-50/page.tsx       |  236 +-
 app/wealth/credit-cards-beginners/page.tsx         |  390 +-
 app/wealth/credit-score-basics/page.tsx            |  444 +-
 app/wealth/disability-insurance-explained/page.tsx |  198 +-
 app/wealth/emergency-fund-guide/page.tsx           |  216 +-
 app/wealth/first-tax-return-guide/page.tsx         |  210 +-
 app/wealth/health-insurance-basics/page.tsx        |  204 +-
 app/wealth/hsa-explained/page.tsx                  |  406 +-
 app/wealth/journey/page.tsx                        |  204 +-
 app/wealth/life-insurance-explained/page.tsx       |  438 +-
 app/wealth/money-moves-in-your-20s/page.tsx        |  460 +-
 app/wealth/page.tsx                                |  780 ++--
 .../pre-retirement-5-year-checklist/page.tsx       |  220 +-
 app/wealth/quiz/first-1000/page.tsx                |  136 +-
 app/wealth/quiz/page.tsx                           |   86 +-
 app/wealth/rent-vs-buy-math/page.tsx               |  394 +-
 app/wealth/rmd-explained-73/page.tsx               |  402 +-
 app/wealth/roth-ira-explained/page.tsx             |  456 +-
 app/wealth/roth-vs-traditional-taxes/page.tsx      |  218 +-
 app/wealth/side-hustle-taxes/page.tsx              |  406 +-
 app/wealth/social-security-explained/page.tsx      |  414 +-
 app/wealth/student-loans-payoff-plan/page.tsx      |  430 +-
 app/wealth/tax-brackets-explained-plainly/page.tsx |  236 +-
 app/wealth/teens-first-job-money-guide/page.tsx    |  444 +-
 components/CalEmbed.tsx                            |   31 +-
 components/StickyMobileCta.tsx                     |  295 +-
 lib/__tests__/capture.test.ts                      |  990 ++---
 lib/__tests__/localRankingFaqs.test.ts             |  251 +-
 lib/__tests__/meta-pixel-events.test.ts            |   72 +-
 lib/__tests__/searchDiscovery.test.ts              |  354 +-
 lib/__tests__/seo-separation.test.ts               |  114 +-
 lib/__tests__/traction-architecture.test.ts        |  227 +-
 lib/__tests__/traction-measurement.test.ts         |  396 +-
 lib/__tests__/traffic-guides.test.ts               |  201 +-
 lib/aep.ts                                         |   72 +-
 lib/articles.ts                                    | 4620 ++++++++++----------
 lib/askWall.ts                                     |  828 ++--
 lib/learn.ts                                       |  711 +--
 lib/seo.ts                                         |  135 +-
 lib/standaloneGuides.ts                            |  240 +-
 lib/taxArticles.ts                                 |  790 ++--
 lib/testimonials.ts                                |   20 +
 lib/trafficGuides.ts                               | 4584 +++++++++----------
 lib/wealth/articles.ts                             | 1002 ++---
 lib/wealth/seo.ts                                  |  173 +-
 next.config.ts                                     |    7 +
 179 files changed, 43587 insertions(+), 43832 deletions(-)
```

The local preview is [http://localhost:3102/aep](http://localhost:3102/aep). Evidence logs, validator results, Lighthouse JSON, and screenshots are saved alongside this report under docs/seo-evidence.
