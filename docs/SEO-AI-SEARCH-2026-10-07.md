# Search optimization, October 7, 2026

This pass covers both the insurance site and the wealth hub, with the user's approval to expand beyond the earlier hub-only scope. They keep separate audiences and service descriptions. Work remains on `wealth-hub`; nothing was pushed or deployed.

**What changed.** The shared layout now publishes a small website and author identity graph. The full insurance business and offer catalogue appears on the insurance homepage and the new `/insurance-services` directory. Wealth articles and calculators connect to a distinct education collection. Insurance offers no longer appear in the wealth pages' structured data. The About page now identifies its subject with `ProfilePage` markup, using the same Christian Brinkley identity as article authors.

The homepage's outdated master's-degree claim was replaced with the approved fact: accounting senior at UNCG, graduating December 2026. Published credentials and structured data now agree on that point.

The new service directory covers eight existing offerings: Medicare enrollment, Medicare plan review, life insurance, long-term care, short-term care, critical illness coverage, annuity consultations and retirement income/Medicare education. Each entry explains the question it addresses, what to bring and where to read more. It is linked from the insurance homepage, insurance footer, sitemap and assistant index. It adds no investment recommendations or new credentials.

Removing the root layout's fixed social-card text corrected 115 pages that inherited the homepage's title and description. Two pages retain intentional, topic-specific differences between Open Graph and Twitter wording: `/part-b-penalty` and `/medicare-costs-2026`. Different wording alone is not a defect.

The existing `llms.txt` now includes the published question-led insurance articles and retirement explainers automatically. This is a convenience index, not a ranking mechanism. Existing Google, Bing and AI search crawler permissions remain in place. No training-crawler policy, consent text or lead storage changed.

**Crawl evidence.** The initial local production crawl covered 141 sitemap pages. All returned 200 and had unique titles, descriptions, canonical paths, share images and one main heading. The final sitemap contains 142 pages, including the directory. A reusable read-only check is available:

```powershell
node scripts/audit-search.mjs http://localhost:3222 .cache/search-audit.json
```

The script requests public pages from the supplied origin, parses HTML without running scripts, and does not submit forms. It checks response codes, title duplication, metadata presence, canonical paths, heading counts, JSON-LD parsing and insurance schema leakage into the wealth hub. It also reports noindex pages and social-title differences for review. It is not an external rich-results validator or a ranking test.

The local preview deliberately emits `noindex, nofollow`. Existing production-readiness gates were preserved. Separately, read-only requests to the live homepage and `robots.txt` returned 200. The live homepage emitted `index, follow`, and the live robots file allowed public crawling while blocking `/api/`. That verifies public responses from this environment, not Google's index status or access from every crawler IP.

**Payload reduction.** Moving repeated insurance data out of the shared layout also reduces HTML. These measurements are raw HTML response bytes, not compressed transfer sizes, JavaScript totals or LCP:

| Page | Before | After | Reduction |
| --- | ---: | ---: | ---: |
| `/wealth` | 86,683 B | 68,871 B | 17,812 B |
| Compound calculator | 85,821 B | 68,298 B | 17,523 B |
| `/life-insurance` | 115,619 B | 96,671 B | 18,948 B |
| `/about` | 99,446 B | 81,665 B | 17,781 B |

The insurance homepage grew by about 3 KB because it now explicitly carries the full insurance graph and links to the new directory. These changes do not establish a Core Web Vitals improvement. The previous mobile LCP limitation remains a separate performance task; this pass did not rerun Lighthouse or change typography.

**Verification.** The regression suite passed 667 tests across 46 files. New tests protect audience separation, stable author identity, real service destinations and article discovery. Lint passed with zero errors and the same three existing warnings in `app/helping-a-parent/page.tsx` and the two Netlify cron functions. The isolated `WEALTH_PREVIEW=build npm run build` completed successfully. The phone check caught a long directory button forcing its grid wider than the viewport; the directory now constrains the column and wraps button text.

The final crawl passed all 142 pages with no missing required metadata, duplicate titles, invalid JSON-LD or incorrect canonical paths. All 20 browser checks passed without overflow, hidden reveal content or page exceptions. Evidence is saved in [the search audit](seo-review/search-audit.json) and [the browser checks](seo-review/browser.json). Browser checks cover the homepage, directory, About page, wealth homepage and compound calculator at 360, 390, 430 and 1440 pixels wide. The directory's Axe WCAG 2.1 AA scan found zero violations. The [directory phone screenshot](seo-review/services-phone.png) shows the final layout.

**Search intent covered by existing pages.** These are editorial targets, not measured search volumes or ranking claims. Keep each page focused on its own question instead of adding near-identical pages for every keyword variation.

| Search intent | Primary destination |
| --- | --- |
| Local insurance help and offered services | `/insurance-services` |
| Christian Brinkley / local Medicare help | `/` and `/about` |
| Turning 65 and Medicare enrollment | `/turning-65` |
| Reviewing current Medicare coverage | `/annual-enrollment` |
| Life insurance review | `/life-insurance` |
| Long-term care coverage | `/long-term-care-insurance` |
| Short-term care coverage | `/short-term-care-insurance` |
| Critical illness coverage | `/critical-illness-insurance` |
| Understanding an annuity | `/annuities` |
| Retirement income and Medicare | `/retirement-income` |
| Budget, debt and savings calculations | `/wealth/calculators` and its individual tools |
| Beginner money questions | `/wealth/learn` and its individual articles |

**What still requires publication and account data.** These code changes cannot affect live search until an approved deployment. After publication, use the existing Search Console and Bing Webmaster properties to inspect the changed URLs, confirm the sitemap is processed, and check the selected canonical. The repository already contains verification hooks and an IndexNow deployment integration; this pass did not send submissions or alter account settings.

Search Console query and page data is needed to measure impressions, clicks, click-through rates and positions before choosing further content changes. Check whether similar Medicare cost pages compete for the same queries before consolidating them. Public search results alone do not establish a reliable ranking baseline. No Search Console performance export or authenticated URL Inspection result was available in this pass.

For local results, keep the existing Google Business Profile's services, contact details, hours and service area accurate. Genuine customer reviews and relevant local references can support visibility. No profile was edited and no reviews, listings or backlinks were bought or fabricated. Google says local results depend on relevance, distance and prominence; website edits cannot control the searcher's location or guarantee a place above every competitor.

Google's AI features use the same core crawlability, indexing and useful-content requirements as Search. There is no special AI schema or text file that guarantees a citation. OpenAI identifies OAI-SearchBot as its search crawler; GPTBot controls a different use. A crawl allowance makes discovery possible, not certain. This work does not guarantee indexing, first place or AI citations.

Sources checked: [Google AI search guidance](https://developers.google.com/search/docs/appearance/ai-features), [Google Search Essentials](https://developers.google.com/search/docs/essentials), [Google ProfilePage documentation](https://developers.google.com/search/docs/appearance/structured-data/profile-page), [Google local ranking guidance](https://support.google.com/business/answer/7091), and [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots).
