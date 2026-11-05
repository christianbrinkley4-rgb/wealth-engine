# Search content release, November 5, 2026

## Result

Reviewed and improved all 20 existing URLs in the supplied Search Console brief. Added four distinct pages: Charlotte turning-65 education, Charlotte phone-consultation preparation, Winston-Salem life insurance, and cross-account 72(t) exceptions. Improved existing Roth-ladder and disability answers instead of creating competing pages. The two interstate Medicare questions remain in the travel guide.

Rebuilt eight Medicare guides around direct answers, accessible comparisons, practical checklists, visible FAQs, primary sources, and one closing booking action. Preserved existing URLs and required disclosures. Updated answer articles, giveback/401(k)/Roth guides, and the tax-bracket example. The homepage explains Christian's local Medicare service and accurate current credentials. The existing Greensboro page now emphasizes consultation preparation.

## Technical changes

- Restored indexing eligibility for the specifically requested index-fund, target-date-fund, and tax-bracket pages. Other off-topic exclusions remain in place. The tax-page HTTP exception follows the broader wealth-section rule and retains preview noindex protection.
- Added new pages to the sitemap and public text indexes. Updated only genuinely reviewed last-modified dates.
- Added topic-appropriate internal links, canonical/social metadata, and a separate title-tag field for traffic guides.
- Reduced article hero promotion so the answer leads. General money articles no longer display a Medicare download or Medicare disclosure as their only context.
- Matched two older pages' FAQ schema to their visible answers, discovered during the site-wide build audit.
- Added a reusable 28-page verification script for built HTML and production HTTP: `node scripts/verify-seo-release.mjs` and `node scripts/verify-seo-release.mjs --live`.

The changes introduce no new client JavaScript dependency. The new shared editorial layout is rendered on the server.

## Fact checks and maintenance

Sources are linked on each page. Important corrections include Medigap standardization and enrollment rights, nursing-home versus skilled-nursing coverage, QMB versus other assistance categories, current-employment coverage versus employer-size payer rules, Part D stages and annual limits, Roth conversion clocks, and 401(k) versus IRA exceptions. The tax example distinguishes tax divided by gross income from tax divided by taxable income.

The State Health Plan page retains hourly revalidation. Its body, metadata, and FAQ change to past-tense enrollment instructions after November 6, 2026. Revalidation can delay the visible switch by up to an hour. State-plan enrollment remains with the official Plan.

Selected NC plan changes were independently joined from these CMS files:

- [2027 plan crosswalk](https://www.cms.gov/data-research/statistics-trends-and-reports/medicare-advantagepart-d-contract-and-enrollment-data/plan-crosswalks/2027-part-cd-plan-crosswalk), file `PlanCrosswalk2027_10012026.txt`.
- [2026 landscape source files](https://www.cms.gov/medicare/coverage/prescription-drug-coverage), file `CY2026_Landscape_202609.csv`.
- [Current NC DOI county landscape](https://www.ncdoi.gov/medicare-advantage-landscapes-2027).

The guide shows H5525-050 and H5525-083 as terminated/non-renewed in that crosswalk, with verified 2026 county examples. H5253-079 is a consolidated renewal into H5253-185. The table is explicitly a selected list. It does not claim a complete statewide termination list or that a carrier is leaving North Carolina.

## Validation

Full suite: 101 test files and 1,680 tests passed. Lint: zero errors, two pre-existing Netlify cron export warnings. Final production build includes TypeScript. Guide regression tests cover matching visible/schema FAQs, script escaping, mobile table structure, booking links, and the State Health Plan deadline switch. Build and live audit evidence is stored locally under ignored `docs/seo-evidence/`.

## Social-post review and remaining external work

Reviewed the three supplied X posts. Useful ideas applied here include improving existing pages close to page one, direct and independently understandable answers, citations, truthful authorship, crawl access, and relevant internal links. Google's [AI search guidance](https://developers.google.com/search/docs/appearance/ai-features) does not require special AI markup. Public text indexes are a reading aid, not a ranking guarantee.

The authenticated Google Business Profile showed 13 saved services, the correct website, and the actual 45-minute Google Calendar booking link. Its detail editor did not provide a stable editing connection during this release. No profile changes, paid promotion, outreach, review solicitation, or third-party posts were made. A target of 15 services is not proof of ranking improvement. Review descriptions when the editor works; use actual services, not repetitive keyword variants.

The supplied baseline is October 8 through November 4, 2026: 76 clicks, 10,008 impressions, 0.8% CTR, average position 43.5. Compare query/page results after recrawling using equivalent windows. Measure booked appointments, inquiries, and connected calls separately from clicks. This release does not resolve prior GA4 event-definition reconciliation or certify new production CRM-delivery tests. No synthetic prospect was submitted.

Ranking and AI citation outcomes remain unproven. Earned local mentions, real customer reviews, useful original resources, and ongoing measurement remain work beyond code edits. No purchased links, fabricated authority, or guaranteed outcomes were introduced.

## Release and rollback

Based on production `97898ca`. Publish through the existing Netlify `master` deployment. If live verification fails, roll back to the preceding published Netlify deployment or revert this release through a normal commit. Never force-push or replace production with an unrelated branch.
