# Best-in-class audit

Audit date: October 9, 2026. Requested branch: `best-in-class-2026-10-08`.
Baseline: `b56c93e`, fetched from `origin/master`. No production deployment is authorized.

## Scope and evidence

This audit precedes application changes. Findings remain open until the verification section records their closure.
The baseline production build passed. All 667 tests passed with two workers.
The first parallel run had six failures during resource contention. The bounded rerun passed without application changes.

The route audit inspected 218 prerendered pages and 202 sitemap entries.
Evidence: [route report](best-in-class/baseline-routes.json), [browser report](best-in-class/baseline-browser/results.json).
The scripts in `scripts/best-in-class-*.mjs` reproduce these observations.
Counts, sizes, word counts, and design scores below are audit measurements, not financial claims.

Traffic analytics were unavailable. Priority uses homepage prominence and internal links, not an invented traffic ranking.
The priority sample contains the homepage plus the ten content pages below.
Shared improvements also cover the main navigation, wealth library, guide library, and calculator layouts.

## 1. Information quality

Word counts use rendered explanatory containers. They exclude navigation and calculator controls, but some guide containers include closing copy.
They are screening counts, not proof that every word is substantive. Hypothetical calculator inputs are not published market facts.

| Page | Baseline words | Figure verification and finding |
| --- | ---: | --- |
| `/wealth/roth-ira-explained` | 279 | IRS confirms IRA limits, catch-up amounts, phase-outs, and employee deferral limit. Thin. Withdrawal exceptions and the tax-year clock are missing. Traditional deductions are presented as automatic. |
| `/wealth/401k-explained` | 266 | IRS confirms deferral, catch-up, and combined limits. Thin. The combined limit excludes catch-ups. Wage threshold needs employer context. Early-withdrawal exceptions are omitted. |
| `/wealth/hsa-explained` | 307 | IRS confirms contribution and deductible figures. The inflation citation lacks a link. Eligibility omits Medicare and other coverage restrictions. Add current bronze-plan rules. |
| `/wealth/rmd-explained-73` | 286 | IRS supports deadlines and penalty percentages. Thin. The example factor is not identified by age. Birth-cohort, ownership, and Roth-plan exceptions need clarification. |
| `/guides/standard-deduction-seniors-2026` | 598 | IRS confirms base amounts, age additions, bonus deduction, and phase-out thresholds. Worked subtraction is correct. No primary-source links appear. Unsupported generalizations need removal. |
| `/guides/working-while-collecting-social-security` | 624 | SSA confirms earnings limits and withholding ratios. Example arithmetic is correct. Monthly averaging can mislead because checks are withheld. No primary-source links appear. |
| `/guides/irmaa-brackets-2026` | 595 | Every displayed premium, surcharge, and boundary matches CMS for whole-dollar incomes. No source links appear. Separate-return rules are absent. Fractional boundaries need exact language. |
| `/tools/take-home-pay` | 241 | IRS brackets and deductions match. SSA payroll figures match. NC rate matches NCDOR. The missing NC deduction overstates tax. Thin explanation and no sources. |
| `/tools/compound-interest` | 263 | Inputs and returns are assumptions, not market claims. Monthly recurrence matches the explanation. Thin methodology; no primary educational reference. |
| `/tools/debt-payoff` | 243 | Sample balances and APRs are hypothetical. Fixed-payment simulation needs explicit assumptions. Thin methodology; unsupported categorical comparisons need qualification. |

Verified figure groups:

- IRA: $7,500; $1,100 catch-up; $8,600 total. MAGI phase-outs: $153,000 to $168,000 and $242,000 to $252,000. [IRS limits][irs-limits].
- Employer plans: $24,500; $8,000; $32,500; $11,250; $35,750; $72,000. [IRS limits][irs-limits] and [IRS catch-ups][catchups].
- HSA: $4,400; $8,750; $1,000 catch-up; $1,700 and $3,400 minimum deductibles. [IRS inflation rules][hsa] and [Publication 969][p969].
- Federal deductions: $16,100; $32,200; $24,150; $2,050; $1,650. Derived totals: $18,150; $35,500; $26,200; $20,200. [Revenue Procedure 2025-32][tax].
- Senior deduction: $6,000 per eligible person; $12,000 for two. Phase-outs start at $75,000 and $150,000. [IRS provisions][senior].
- Earnings test: $24,480 and $65,160; $1 per $2 and $1 per $3. [SSA][earnings].
- IRMAA: all six table rows match [CMS][cms]. The machine report records each displayed figure.
- Payroll: 6.2%, $184,500, and 1.45%. [SSA contribution base][payroll]. Additional Medicare: 0.9%, $200,000 and $250,000. [IRS Topic 560][additional].
- NC: 3.99%; deductions $12,750 and $25,500. [NCDOR report][nc-rate] and [NCDOR deductions][nc-deduction].
- RMD example: $274,000 / 27.4 = $10,000. The factor applies at age 72, not 73. [Publication 590-B][p590b].

P0 findings: incorrect NC tax base; incomplete Roth qualification; misleading RMD example; missing guide citations.
P1 findings: thin explanations, unsupported generalizations, and missing eligibility context.
Existing strengths: readable definition boxes, visible education notes, linked IRS sources on wealth pages, and useful calculator assumptions.
Keep these patterns. Do not rewrite unaffected explanations.

## 2. Look and feel

Fetched and inspected desktop and mobile homepages for [NerdWallet](https://www.nerdwallet.com/), [Investopedia](https://www.investopedia.com/), and [Bankrate](https://www.bankrate.com/).
Article sample: [NerdWallet Roth IRA](https://www.nerdwallet.com/retirement/learn/what-is-a-roth-ira), [Investopedia Roth IRA](https://www.investopedia.com/terms/r/rothira.asp), and [Bankrate mortgage questions](https://www.bankrate.com/mortgages/four-questions-to-ask-mortgage-lender/).
Bankrate's former IRA URLs returned 404 pages. The replacement article was followed from its homepage.

Subjective design scores use a five-point scale. They describe this sample, not every competitor page.

| Site | Typography | Spacing | Hierarchy | Trust signals |
| --- | ---: | ---: | ---: | ---: |
| Ours | 4 | 4 | 3 | 3 |
| NerdWallet | 4 | 4 | 5 | 5 |
| Investopedia | 4 | 3 | 4 | 5 |
| Bankrate | 4 | 4 | 4 | 5 |

The ten most visible gaps, prioritized for repair:

1. Homepage educational tools are buried beneath insurance actions. Add a clear learning entry point.
2. New wealth articles are absent from the main wealth learning index. Add topic navigation using existing cards.
3. Guides lack a real collection page. Add a browsable guide index and correct breadcrumbs.
4. Articles lack section navigation. Add keyboard-friendly links beside the introduction.
5. Guide author context is less visible than competitor bylines. Link to the actual author and qualifications.
6. Source provenance is missing near important tables. Add named primary sources in the reading flow.
7. Review dates and educational scope are inconsistent across calculators. Add a shared, truthful provenance block.
8. Calculator headings skip levels. Repair the document outline without changing the visual type scale.
9. Repeated field names produce duplicate input IDs in debt tools. Use stable component IDs and associated hints.
10. Copy feedback is only a button-label change. Add a polite status announcement and clear stale feedback.

Our type pairing, uncluttered reading surface, visible focus outlines, and immediate definition boxes already compare well.
Retain them. Do not copy advertisements, crowded market tickers, or unsupported review badges.
Independent expert review cannot be manufactured. Do not invent editors or professional credentials.

## 3. High-tech feeling

Existing strengths include live calculators, delegated pointer motion, reduced-motion checks, native FAQs, and navigation entrance effects.
The first page load skips entrance animation. This protects the initial paint.
No large animation framework is needed.

P1: repeated input IDs weaken keyboard and assistive interactions.
P2: clipboard status needs an accessible announcement. Loading states can reassure readers during route navigation.
P2 follow-up: test representative interactions under network and CPU throttling before adding more animation.
Static explanatory prose should remain stable. Motion is not an information-quality substitute.

## 4. SEO

All public prerendered pages contain titles, descriptions, Open Graph titles, descriptions, and images.
The internal global-error page is excluded from this public-page result.
No rendered images lack an alt attribute. This does not establish the quality of every alternative description.
All baseline sitemap entries map to rendered pages. City aliases correctly point to their preferred canonical routes.
No public canonical blocker was found.

The main-content link graph exposes weak discovery of wealth, tools, and new guides.
The report deliberately excludes header and footer links from this depth measurement.
P1: add direct educational discovery from the homepage and connect the guide and wealth collections.

Article and FAQPage markup already cover many educational pages.
Speakable coverage is inconsistent. Add it only where matching visible elements exist.
Definition markup must contain enough text to answer the Roth question without fetching another page.
FAQ markup must remain identical to visible questions and answers.

Robots intentionally blocks indexing without deployment configuration.
This local build has no production lead credentials, so local noindex is expected.
Preserve the existing deployment gate. Production configuration requires separate read-only verification, not disabling safeguards.

## 5. AI-search optimization

The short and full indexes duplicate page catalogs. The short index omits several sitemap routes.
The full index covers baseline sitemap paths except an explicit homepage link.
Neither endpoint should claim guaranteed search ranking or assistant citations.

P1: share the page catalog, expose sitemap-backed discovery, and add cited definition text.
P1: no MCP route exists in master. Implement and test a small read-only resource endpoint.
Use the [MCP HTTP specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports).
Support initialization, resource discovery, resource reading, and clear protocol errors.
No visitor financial data or credentials belong in MCP resources.

Baseline Roth test: Article description names the subject but does not define it.
FAQ answers cover limits and withdrawals, but omit the basic definition.
Result: structured data alone cannot give a complete basic answer.

## 6. Performance and accessibility

The production build passed compilation, TypeScript, and prerendering.
The largest measured initial script payload is 225,126 gzip bytes.
The audit budget is 230 KiB gzip per route. No route exceeds that target.
This is a chosen engineering budget, not a claim about measured Core Web Vitals.
Shared CSS, font variants, and third-party scripts remain potential performance costs.
Preserve server rendering and avoid adding a UI framework.

Local desktop and mobile checks found no horizontal overflow on the homepage, wealth hub, Roth article, or take-home calculator.
The first Tab reaches the skip link with a visible outline on those pages.
Body text and primary controls use the established dark-on-light palette.
Calculator field IDs and heading order need repair.
Real screen-reader sessions and field Core Web Vitals are not yet measured.

## Verification and closure

Application fixes have not started at this audit checkpoint.
Record final tests, build, route checks, screenshots, and remaining work here before opening the PR.
No production deployment is part of this work.

[irs-limits]: https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500
[catchups]: https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-catch-up-contributions
[hsa]: https://www.irs.gov/irb/2025-21_IRB
[p969]: https://www.irs.gov/publications/p969
[tax]: https://www.irs.gov/pub/irs-drop/rp-25-32.pdf
[senior]: https://www.irs.gov/newsroom/working-families-tax-cuts
[earnings]: https://www.ssa.gov/oact/cola/rtea.html
[cms]: https://www.cms.gov/newsroom/fact-sheets/2026-medicare-parts-b-premiums-deductibles
[payroll]: https://www.ssa.gov/oact/cola/cbb.html
[additional]: https://www.irs.gov/taxtopics/tc560
[nc-rate]: https://www.ncdor.gov/documents/reports/north-carolina-biennial-tax-expenditure-report-2025pdf/open
[nc-deduction]: https://www.ncdor.gov/taxes-forms/individual-income-tax/filing-topics/north-carolina-standard-deduction-or-north-carolina-itemized-deductions
[p590b]: https://www.irs.gov/publications/p590b
