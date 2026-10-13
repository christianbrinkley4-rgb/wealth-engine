# CTR Title Inventory

Generated 2026-10-11 for the CTR title-rewrite sprint.
Strategy: pages with high impressions and low CTR in positions 2-10 get title rewrites, one page at a time so CTR changes are measurable.

Title template: page title + ` | Christian Brinkley` (from root layout), unless the page sets `absolute: true`.
Wealth section uses ` | christianbuildswealth` instead.

## Priority targets (Search Console, Sep 14 - Oct 9: 15 clicks, 868 impressions, 1.7% CTR, pos 41.5)

| # | Route | Impressions | CTR | Position | Current title |
|---|-------|-------------|-----|----------|---------------|
| 1 | `/about` | 20 | 0% | 8.3 | Christian Brinkley | Licensed Insurance Agent in Greensboro |
| 2 | `/medicare-in/winston-salem` | 18 | 0% | 9.9 | Medicare Agent in Winston-Salem, NC | Christian Brinkley |
| 3 | `/answers/are-medicare-supplement-plans-the-same` | 12 | 0% | 7.1 | Are Medigap Plans the Same Across Companies? Plan Letters |
| 4 | `/care-coverage` | 10 | 0% | 5.6 | Care and Critical Illness Insurance | Christian Brinkley |
| 5 | `/plan` | 9 | 0% | 6.1 | What the timing of a Roth conversion costs in Medicare | Christian Brinkley |
| 6 | `/irmaa-appeal` | 9 | 0% | 7.1 | Appealing a high Medicare premium in Greensboro, Winston-Salem & High Point | Christian Brinkley |
| 7 | `/answers/medicare-advantage-hmo-vs-ppo` | 5 | 0% | 6.0 | HMO vs PPO Medicare Advantage: Which Fits Your Doctors? |
| 8 | `/advantage-vs-medigap` | 5 | 0% | 6.0 | Medicare Advantage vs Medigap | Greensboro Guide | Christian Brinkley |

Note: /answers/does-medicare-cover-nursing-homes has 358 impressions at position 41. That is a ranking problem, not a title problem. Left alone.

## Weak-title flags

- TRUNCATION RISK: 56 of 164 pages render over 60 characters. Google truncates around 60. The full list is in the table below.
- DEFECT: `/schedule` renders `Book a Free Medicare Review | Christian Brinkley | Christian Brinkley` (brand suffix applied twice, 69 chars). Fix the metadata, not the template.
- GENERIC: `/guides` uses `Money, Tax, and Medicare Guides | Christian Brinkley`. Fine but broad; revisit after priority targets.
- NO PAGE TITLE: pages with no metadata export inherit the root default `Christian Brinkley | Medicare, Life Insurance & Retirement in Greensboro`, duplicating the homepage title (e.g. `/thank-you`). Low priority since most are utility pages.

## Full inventory (route -> rendered title -> length)

| Route | Rendered <title> | Chars | Flags | Source file |
|-------|---------------|-------|-------|-------------|
| `/` | I’m turning 65 soon \| Christian Brinkley | 40 | BRAND-ONLY: no topic keyword | `app/page.tsx` |
| `/about` | Christian Brinkley \| Licensed Insurance Agent in Greensboro | 59 |  | `app/about/page.tsx` |
| `/advantage-vs-medigap` | Medicare Advantage vs Medigap \| Greensboro Guide \| Christian Brinkley | 69 | TRUNCATION RISK (69 chars) | `app/advantage-vs-medigap/page.tsx` |
| `/aep` | Medicare Annual Enrollment for 2027 coverage \| Free fall review in Greensboro NC \| Christian Brinkley | 101 | TRUNCATION RISK (101 chars) | `app/aep/page.tsx` |
| `/aep-quiz` | Do I need to act during Annual Enrollment? \| Christian Brinkley | 63 | TRUNCATION RISK (63 chars) | `app/aep-quiz/page.tsx` |
| `/ai` | AI for regular people \| Christian Brinkley | 42 | BRAND-ONLY: no topic keyword | `app/ai/page.tsx` |
| `/ai/ai-for-job-search` | AI for job search \| Christian Brinkley | 38 | BRAND-ONLY: no topic keyword | `app/ai/ai-for-job-search/page.tsx` |
| `/ai/ai-for-seniors` | AI for seniors \| Christian Brinkley | 35 | BRAND-ONLY: no topic keyword | `app/ai/ai-for-seniors/page.tsx` |
| `/ai/ai-for-small-business` | AI for small business \| Christian Brinkley | 42 | BRAND-ONLY: no topic keyword | `app/ai/ai-for-small-business/page.tsx` |
| `/ai/ai-mistakes-to-avoid` | AI mistakes to avoid \| Christian Brinkley | 41 | BRAND-ONLY: no topic keyword | `app/ai/ai-mistakes-to-avoid/page.tsx` |
| `/ai/ai-money-tasks` | AI for money tasks \| Christian Brinkley | 39 |  | `app/ai/ai-money-tasks/page.tsx` |
| `/ai/ai-tools-compared` | AI tools compared honestly \| Christian Brinkley | 47 | BRAND-ONLY: no topic keyword | `app/ai/ai-tools-compared/page.tsx` |
| `/ai/connect` | Connect your AI assistant \| Christian Brinkley | 46 | BRAND-ONLY: no topic keyword | `app/ai/connect/page.tsx` |
| `/ai/which-ai-for-which-task` | Which AI for which task \| Christian Brinkley | 44 | BRAND-ONLY: no topic keyword | `app/ai/which-ai-for-which-task/page.tsx` |
| `/annual-enrollment` | Medicare annual enrollment help in Greensboro, Winston-Salem & High Point \| Christian Brinkley | 94 | TRUNCATION RISK (94 chars) | `app/annual-enrollment/page.tsx` |
| `/annuities` | Understanding annuities and retirement income \| Christian Brinkley | 66 | TRUNCATION RISK (66 chars) | `app/annuities/page.tsx` |
| `/anoc` | Got your ANOC letter? Don't just file it away. \| Christian Brinkley | 67 | TRUNCATION RISK (67 chars) | `app/anoc/page.tsx` |
| `/answers` | Medicare Questions, Answered \| Christian Brinkley | 49 |  | `app/answers/page.tsx` |
| `/answers/[slug]` | <dynamic, see file> | dyn | DYNAMIC: resolves per record/city at build time | `app/answers/[slug]/page.tsx` |
| `/ask` | Ask Christian: Real Questions, Plain Answers \| Christian Brinkley | 65 | TRUNCATION RISK (65 chars) | `app/ask/page.tsx` |
| `/ask/[slug]` | <dynamic, see file> | dyn | DYNAMIC: resolves per record/city at build time | `app/ask/[slug]/page.tsx` |
| `/care-coverage` | Care and Critical Illness Insurance \| Christian Brinkley | 56 |  | `app/care-coverage/page.tsx` |
| `/critical-illness-insurance` | Critical Illness Insurance in Greensboro & the Triad | 52 |  | `app/critical-illness-insurance/page.tsx` |
| `/disclaimer` | Disclaimer \| Christian Brinkley | 31 | BRAND-ONLY: no topic keyword | `app/disclaimer/page.tsx` |
| `/greensboro-medicare-cost-calculator` | Greensboro Medicare Cost Calculator \| Christian Brinkley | 56 |  | `app/greensboro-medicare-cost-calculator/page.tsx` |
| `/guides` | Money, Tax, and Medicare Guides \| Christian Brinkley | 55 |  | `app/guides/page.tsx` |
| `/guides/[slug]` | <dynamic, see file> | dyn | DYNAMIC: resolves per record/city at build time | `app/guides/[slug]/page.tsx` |
| `/guides/irmaa-brackets-2026` | 2026 IRMAA brackets: the complete table \| Christian Brinkley | 60 | BRAND-ONLY: no topic keyword | `app/guides/irmaa-brackets-2026/page.tsx` |
| `/guides/is-social-security-taxed` | Is Social Security taxed? The 2026 rules \| Christian Brinkley | 61 | TRUNCATION RISK (61 chars) | `app/guides/is-social-security-taxed/page.tsx` |
| `/guides/medicare-automatic-renewal` | Do you have to renew Medicare every year? \| Christian Brinkley | 62 | TRUNCATION RISK (62 chars) | `app/guides/medicare-automatic-renewal/page.tsx` |
| `/guides/medicare-hsa-contributions` | HSA and Medicare: when contributions must stop \| Christian Brinkley | 67 | TRUNCATION RISK (67 chars) | `app/guides/medicare-hsa-contributions/page.tsx` |
| `/guides/medicare-part-b-employer-coverage` | Do I need Part B if I have employer insurance at 65? \| Christian Brinkley | 73 | TRUNCATION RISK (73 chars) | `app/guides/medicare-part-b-employer-coverage/page.tsx` |
| `/guides/medicare-travel` | Does Medicare work out of state? \| Christian Brinkley | 53 |  | `app/guides/medicare-travel/page.tsx` |
| `/guides/missed-medicare-enrollment` | Missed Medicare enrollment? What happens next \| Christian Brinkley | 66 | TRUNCATION RISK (66 chars) | `app/guides/missed-medicare-enrollment/page.tsx` |
| `/guides/standard-deduction-seniors-2026` | 2026 standard deduction for seniors \| Christian Brinkley | 56 | BRAND-ONLY: no topic keyword | `app/guides/standard-deduction-seniors-2026/page.tsx` |
| `/guides/what-medicare-does-not-cover` | What Medicare does not cover \| Christian Brinkley | 49 |  | `app/guides/what-medicare-does-not-cover/page.tsx` |
| `/guides/working-while-collecting-social-security` | Working while collecting Social Security: 2026 limits \| Christian Brinkley | 74 | TRUNCATION RISK (74 chars) | `app/guides/working-while-collecting-social-security/page.tsx` |
| `/helping-a-parent` | Helping a parent with Medicare in Greensboro, Winston-Salem & High Point \| Christian Brinkley | 93 | TRUNCATION RISK (93 chars) | `app/helping-a-parent/page.tsx` |
| `/insurance-services` | Insurance Services in Greensboro, NC \| Christian Brinkley | 57 |  | `app/insurance-services/page.tsx` |
| `/irmaa-appeal` | Appealing a high Medicare premium in Greensboro, Winston-Salem & High Point \| Christian Brinkley | 96 | TRUNCATION RISK (96 chars) | `app/irmaa-appeal/page.tsx` |
| `/keep-my-doctor` | Can I keep my doctor on Medicare in Greensboro, Winston-Salem & High Point? \| Christian Brinkley | 96 | TRUNCATION RISK (96 chars) | `app/keep-my-doctor/page.tsx` |
| `/learn` | The Learning Hub \| Christian Brinkley | 37 | BRAND-ONLY: no topic keyword | `app/learn/page.tsx` |
| `/life-insurance` | Life insurance help in Greensboro, Winston-Salem & High Point \| Christian Brinkley | 82 | TRUNCATION RISK (82 chars) | `app/life-insurance/page.tsx` |
| `/life-insurance-in/[city]` | <dynamic, see file> | dyn | DYNAMIC: resolves per record/city at build time | `app/life-insurance-in/[city]/page.tsx` |
| `/links` | Free Money Tools & Links \| Christian Brinkley | 45 |  | `app/links/page.tsx` |
| `/long-term-care-insurance` | Long-Term Care Insurance in Greensboro & the Triad | 50 |  | `app/long-term-care-insurance/page.tsx` |
| `/lp/[slug]` | <dynamic, see file> | dyn | DYNAMIC: resolves per record/city at build time | `app/lp/[slug]/page.tsx` |
| `/medicare` | 2026 Medicare Part B & IRMAA Calculator \| Christian Brinkley | 60 |  | `app/medicare/page.tsx` |
| `/medicare-advantage-doctor-networks` | Can I keep my doctor? Checking Medicare Advantage networks in Guilford & Forsyth counties \| Christian Brinkley | 110 | TRUNCATION RISK (110 chars) | `app/medicare-advantage-doctor-networks/page.tsx` |
| `/medicare-advantage-plans-greensboro-nc` | Medicare Advantage Plans in Greensboro, NC \| Christian Brinkley | 63 | TRUNCATION RISK (63 chars) | `app/medicare-advantage-plans-greensboro-nc/page.tsx` |
| `/medicare-advantage-plans-winston-salem-nc` | Medicare Advantage in Winston-Salem, explained in plain English. \| Christian Brinkley | 85 | TRUNCATION RISK (85 chars) | `app/medicare-advantage-plans-winston-salem-nc/page.tsx` |
| `/medicare-advantage-vs-medigap-greensboro-nc` | Medicare Advantage vs. Medigap in Greensboro, NC \| Christian Brinkley | 69 | TRUNCATION RISK (69 chars) | `app/medicare-advantage-vs-medigap-greensboro-nc/page.tsx` |
| `/medicare-agent-burlington-nc` | Medicare help for Burlington and Alamance County. \| Christian Brinkley | 70 | TRUNCATION RISK (70 chars) | `app/medicare-agent-burlington-nc/page.tsx` |
| `/medicare-agent-high-point-nc` | A Medicare agent for High Point and Guilford County. \| Christian Brinkley | 73 | TRUNCATION RISK (73 chars) | `app/medicare-agent-high-point-nc/page.tsx` |
| `/medicare-agent-kernersville-nc` | Medicare help for Kernersville, in the middle of the Triad. \| Christian Brinkley | 80 | TRUNCATION RISK (80 chars) | `app/medicare-agent-kernersville-nc/page.tsx` |
| `/medicare-agent-lexington-nc` | Medicare help for Lexington and Davidson County. \| Christian Brinkley | 69 | TRUNCATION RISK (69 chars) | `app/medicare-agent-lexington-nc/page.tsx` |
| `/medicare-agent-reidsville-nc` | Medicare help for Reidsville and Rockingham County. \| Christian Brinkley | 72 | TRUNCATION RISK (72 chars) | `app/medicare-agent-reidsville-nc/page.tsx` |
| `/medicare-agent-stem-nc` | Medicare help for Stem and Granville County. \| Christian Brinkley | 65 | TRUNCATION RISK (65 chars) | `app/medicare-agent-stem-nc/page.tsx` |
| `/medicare-agent-thomasville-nc` | Medicare help for Thomasville and Davidson County. \| Christian Brinkley | 71 | TRUNCATION RISK (71 chars) | `app/medicare-agent-thomasville-nc/page.tsx` |
| `/medicare-agent-winston-salem-nc` | Medicare help for Winston-Salem and Forsyth County. \| Christian Brinkley | 72 | TRUNCATION RISK (72 chars) | `app/medicare-agent-winston-salem-nc/page.tsx` |
| `/medicare-annual-enrollment-2026-checklist` | Medicare Annual Enrollment 2026: your Triad review checklist \| Christian Brinkley | 81 | TRUNCATION RISK (81 chars) | `app/medicare-annual-enrollment-2026-checklist/page.tsx` |
| `/medicare-asheboro-nc` | Medicare help for Asheboro and Randolph County. \| Christian Brinkley | 68 | TRUNCATION RISK (68 chars) | `app/medicare-asheboro-nc/page.tsx` |
| `/medicare-butner-nc` | Medicare help from a neighbor, not a call center. \| Christian Brinkley | 70 | TRUNCATION RISK (70 chars) | `app/medicare-butner-nc/page.tsx` |
| `/medicare-changes-2027` | Medicare Changes for 2027 \| Christian Brinkley | 46 |  | `app/medicare-changes-2027/page.tsx` |
| `/medicare-costs` | What does Medicare cost in 2026? \| Christian Brinkley | 53 |  | `app/medicare-costs/page.tsx` |
| `/medicare-costs-2026` | Every 2026 Medicare cost, for Triad readers \| Christian Brinkley | 64 | TRUNCATION RISK (64 chars) | `app/medicare-costs-2026/page.tsx` |
| `/medicare-costs-north-carolina` | Medicare Costs in North Carolina \| Christian Brinkley | 53 |  | `app/medicare-costs-north-carolina/page.tsx` |
| `/medicare-creedmoor-nc` | Medicare help from someone who grew up here. \| Christian Brinkley | 65 | TRUNCATION RISK (65 chars) | `app/medicare-creedmoor-nc/page.tsx` |
| `/medicare-eden-nc` | Medicare help for Eden and northern Rockingham County. \| Christian Brinkley | 75 | TRUNCATION RISK (75 chars) | `app/medicare-eden-nc/page.tsx` |
| `/medicare-graham-nc` | Medicare help that covers your whole map. \| Christian Brinkley | 62 | TRUNCATION RISK (62 chars) | `app/medicare-graham-nc/page.tsx` |
| `/medicare-in/[city]` | Medicare Agent in {city}, NC \| Christian Brinkley (absolute; e.g. Winston-Salem renders 54 chars) | dyn | DYNAMIC: per-city; e.g. Winston-Salem renders 54 chars | `app/medicare-in/[city]/page.tsx` |
| `/medicare-liberty-nc` | Small-town Medicare help, straight answers. \| Christian Brinkley | 64 | TRUNCATION RISK (64 chars) | `app/medicare-liberty-nc/page.tsx` |
| `/medicare-madison-nc` | Medicare help for Madison and western Rockingham County. \| Christian Brinkley | 77 | TRUNCATION RISK (77 chars) | `app/medicare-madison-nc/page.tsx` |
| `/medicare-mebane-nc` | Medicare help for Mebane and Alamance County. \| Christian Brinkley | 66 | TRUNCATION RISK (66 chars) | `app/medicare-mebane-nc/page.tsx` |
| `/medicare-nc-towns` | Medicare help in your town \| Christian Brinkley | 47 |  | `app/medicare-nc-towns/page.tsx` |
| `/medicare-numbers-2027` | 2027 Medicare numbers at a glance \| Christian Brinkley | 54 |  | `app/medicare-numbers-2027/page.tsx` |
| `/medicare-oxford-nc` | Medicare help for Oxford and Granville County. \| Christian Brinkley | 67 | TRUNCATION RISK (67 chars) | `app/medicare-oxford-nc/page.tsx` |
| `/medicare-part-d-donut-hole-2027` | Is There Still a Medicare Donut Hole in 2027? \| Christian Brinkley | 66 | TRUNCATION RISK (66 chars) | `app/medicare-part-d-donut-hole-2027/page.tsx` |
| `/medicare-part-d-greensboro-nc` | Medicare Part D Plans in Greensboro, NC \| Christian Brinkley | 60 |  | `app/medicare-part-d-greensboro-nc/page.tsx` |
| `/medicare-plan-checklist` | Medicare Plan Research Checklist \| Christian Brinkley | 53 |  | `app/medicare-plan-checklist/page.tsx` |
| `/medicare-ramseur-nc` | Medicare help close to home in Ramseur. \| Christian Brinkley | 60 |  | `app/medicare-ramseur-nc/page.tsx` |
| `/medicare-roxboro-nc` | Medicare help for Roxboro and Person County. \| Christian Brinkley | 65 | TRUNCATION RISK (65 chars) | `app/medicare-roxboro-nc/page.tsx` |
| `/medicare-supplement-plans-greensboro-nc` | Medicare Supplement Plans in Greensboro, NC \| Christian Brinkley | 64 | TRUNCATION RISK (64 chars) | `app/medicare-supplement-plans-greensboro-nc/page.tsx` |
| `/medicare-words` | Medicare words, in plain English \| Christian Brinkley | 53 |  | `app/medicare-words/page.tsx` |
| `/medigap-plans-greensboro-nc` | Medigap Plans in Greensboro, NC \| Christian Brinkley | 52 | BRAND-ONLY: no topic keyword | `app/medigap-plans-greensboro-nc/page.tsx` |
| `/medigap-plans-high-point-nc` | Medigap plans in High Point, explained in plain English. \| Christian Brinkley | 77 | TRUNCATION RISK (77 chars) | `app/medigap-plans-high-point-nc/page.tsx` |
| `/numbers` | 2026-2027 money numbers at a glance \| Christian Brinkley | 56 |  | `app/numbers/page.tsx` |
| `/part-b-penalty` | Part B late penalty help in Greensboro, Winston-Salem & High Point \| Christian Brinkley | 87 | TRUNCATION RISK (87 chars) | `app/part-b-penalty/page.tsx` |
| `/plan` | What the timing of a Roth conversion costs in Medicare \| Christian Brinkley | 75 | TRUNCATION RISK (75 chars) | `app/plan/page.tsx` |
| `/plan-check` | Does your Medicare plan still fit? \| Christian Brinkley | 55 |  | `app/plan-check/page.tsx` |
| `/privacy` | Privacy \| Christian Brinkley | 28 | BRAND-ONLY: no topic keyword | `app/privacy/page.tsx` |
| `/remind-me` | Keep your Medicare dates handy \| Christian Brinkley | 51 |  | `app/remind-me/page.tsx` |
| `/retirement-in/[city]` | <dynamic, see file> | dyn | DYNAMIC: resolves per record/city at build time | `app/retirement-in/[city]/page.tsx` |
| `/retirement-income` | Retirement questions in Greensboro, Winston-Salem & High Point \| Christian Brinkley | 83 | TRUNCATION RISK (83 chars) | `app/retirement-income/page.tsx` |
| `/review` | Leave a review \| Christian Brinkley | 35 | BRAND-ONLY: no topic keyword | `app/review/page.tsx` |
| `/review/card` | Review card \| Christian Brinkley | 32 |  | `app/review/card/page.tsx` |
| `/roth-window` | Roth conversion window against 2026 IRMAA \| Christian Brinkley | 62 | TRUNCATION RISK (62 chars) | `app/roth-window/page.tsx` |
| `/schedule` | Book a Free Medicare Review \| Christian Brinkley \| Christian Brinkley | 69 | TRUNCATION RISK (69 chars) | `app/schedule/page.tsx` |
| `/service-area` | Medicare Help: Greensboro, High Point, Winston-Salem | 52 |  | `app/service-area/page.tsx` |
| `/short-term-care-insurance` | Short-Term Care Insurance in Greensboro & the Triad | 51 |  | `app/short-term-care-insurance/page.tsx` |
| `/social-security-timing` | When to take Social Security \| Christian Brinkley | 49 |  | `app/social-security-timing/page.tsx` |
| `/special-enrollment` | Special Enrollment Periods for Medicare \| Christian Brinkley | 60 |  | `app/special-enrollment/page.tsx` |
| `/start` | Get a Personal Medicare and Coverage Review \| Christian Brinkley | 64 | TRUNCATION RISK (64 chars) | `app/start/page.tsx` |
| `/taxes-and-retirement` | Taxes & retirement, in plain English \| Christian Brinkley | 57 |  | `app/taxes-and-retirement/page.tsx` |
| `/taxes-and-retirement/[slug]` | <dynamic, see file> | dyn | DYNAMIC: resolves per record/city at build time | `app/taxes-and-retirement/[slug]/page.tsx` |
| `/thank-you` | Christian Brinkley \| Medicare, Life Insurance & Retirement in Greensboro (inherits root default) | dyn | NO PAGE TITLE: inherits root default, duplicates homepage title | `app/thank-you/page.tsx` |
| `/tools` | Free money calculators \| Christian Brinkley | 43 |  | `app/tools/page.tsx` |
| `/tools/budget` | Budget calculator \| Christian Brinkley | 38 |  | `app/tools/budget/page.tsx` |
| `/tools/cd-or-savings-quiz` | CD or savings quiz \| Christian Brinkley | 39 | BRAND-ONLY: no topic keyword | `app/tools/cd-or-savings-quiz/page.tsx` |
| `/tools/compound-interest` | Compound interest calculator \| Christian Brinkley | 49 | BRAND-ONLY: no topic keyword | `app/tools/compound-interest/page.tsx` |
| `/tools/debt-payoff` | Debt payoff calculator \| Christian Brinkley | 43 | BRAND-ONLY: no topic keyword | `app/tools/debt-payoff/page.tsx` |
| `/tools/emergency-fund` | Emergency fund calculator \| Christian Brinkley | 46 | BRAND-ONLY: no topic keyword | `app/tools/emergency-fund/page.tsx` |
| `/tools/life-insurance-needs` | Life insurance needs calculator \| Christian Brinkley | 52 |  | `app/tools/life-insurance-needs/page.tsx` |
| `/tools/medigap-or-advantage-quiz` | Medigap or Medicare Advantage quiz \| Christian Brinkley | 55 |  | `app/tools/medigap-or-advantage-quiz/page.tsx` |
| `/tools/retirement-projector` | Retirement projector \| Christian Brinkley | 41 |  | `app/tools/retirement-projector/page.tsx` |
| `/tools/roth-conversion-ladder` | Roth conversion multi-year planner \| Christian Brinkley | 55 |  | `app/tools/roth-conversion-ladder/page.tsx` |
| `/tools/roth-conversion-quiz` | Roth conversion quiz \| Christian Brinkley | 41 |  | `app/tools/roth-conversion-quiz/page.tsx` |
| `/tools/roth-vs-traditional` | Roth vs traditional calculator \| Christian Brinkley | 51 |  | `app/tools/roth-vs-traditional/page.tsx` |
| `/tools/take-home-pay` | Take-home pay calculator \| Christian Brinkley | 45 |  | `app/tools/take-home-pay/page.tsx` |
| `/turning-65` | Turning 65 Medicare help in Greensboro, Winston-Salem & High Point \| Christian Brinkley | 87 | TRUNCATION RISK (87 chars) | `app/turning-65/page.tsx` |
| `/turning-65-checklist` | The Turning-65 Checklist: 8 steps before your 65th birthday \| Christian Brinkley | 80 | TRUNCATION RISK (80 chars) | `app/turning-65-checklist/page.tsx` |
| `/unsubscribe` | Unsubscribe from emails | 22 |  | `app/unsubscribe/page.tsx` |
| `/wealth` | Money tools for your 20s \| Christian Brinkley | 45 |  | `app/wealth/page.tsx` |
| `/wealth/401k-explained` | Your 401(k), Explained \| Christian Brinkley | 43 | BRAND-ONLY: no topic keyword | `app/wealth/401k-explained/page.tsx` |
| `/wealth/529-college-savings-basics` | 529 College Savings Plans, Explained \| Christian Brinkley | 57 |  | `app/wealth/529-college-savings-basics/page.tsx` |
| `/wealth/529-vs-roth-for-college` | 529 vs. Roth IRA for College \| christianbuildswealth | 52 |  | `app/wealth/529-vs-roth-for-college/page.tsx` |
| `/wealth/broke-money-reset-plan` | The Broke Money Reset Plan \| Christian Brinkley | 47 |  | `app/wealth/broke-money-reset-plan/page.tsx` |
| `/wealth/budgeting-that-actually-works` | Budgeting That Actually Works \| Christian Brinkley | 50 |  | `app/wealth/budgeting-that-actually-works/page.tsx` |
| `/wealth/building-in-public` | Building in public: the manifesto \| Christian Brinkley | 54 | BRAND-ONLY: no topic keyword | `app/wealth/building-in-public/page.tsx` |
| `/wealth/buying-first-home-money-guide` | Buying Your First Home \| Christian Brinkley | 43 |  | `app/wealth/buying-first-home-money-guide/page.tsx` |
| `/wealth/calculators` | Free Money Calculators \| Christian Brinkley | 43 |  | `app/wealth/calculators/page.tsx` |
| `/wealth/calculators/budget` | 50/30/20 Budget Calculator \| Christian Brinkley | 47 |  | `app/wealth/calculators/budget/page.tsx` |
| `/wealth/calculators/compound-interest` | Compound Interest Calculator \| Christian Brinkley | 49 | BRAND-ONLY: no topic keyword | `app/wealth/calculators/compound-interest/page.tsx` |
| `/wealth/calculators/debt-payoff` | Debt Payoff Calculator \| Christian Brinkley | 43 | BRAND-ONLY: no topic keyword | `app/wealth/calculators/debt-payoff/page.tsx` |
| `/wealth/calculators/roth-vs-traditional` | Roth vs Traditional Calculator \| Christian Brinkley | 51 |  | `app/wealth/calculators/roth-vs-traditional/page.tsx` |
| `/wealth/car-buying-money-guide` | The Real Cost of Buying a Car \| christianbuildswealth | 53 |  | `app/wealth/car-buying-money-guide/page.tsx` |
| `/wealth/catch-up-contributions-after-50` | Catch-Up Contributions After 50 \| Christian Brinkley | 52 | BRAND-ONLY: no topic keyword | `app/wealth/catch-up-contributions-after-50/page.tsx` |
| `/wealth/credit-cards-beginners` | Credit Cards for Beginners \| christianbuildswealth | 50 |  | `app/wealth/credit-cards-beginners/page.tsx` |
| `/wealth/credit-score-basics` | Credit Scores, Explained Plainly \| Christian Brinkley | 53 |  | `app/wealth/credit-score-basics/page.tsx` |
| `/wealth/disability-insurance-explained` | Disability Insurance, Explained \| Christian Brinkley | 52 |  | `app/wealth/disability-insurance-explained/page.tsx` |
| `/wealth/emergency-fund-guide` | The Emergency Fund Guide \| Christian Brinkley | 45 | BRAND-ONLY: no topic keyword | `app/wealth/emergency-fund-guide/page.tsx` |
| `/wealth/first-tax-return-guide` | Your First Tax Return, Explained \| Christian Brinkley | 53 |  | `app/wealth/first-tax-return-guide/page.tsx` |
| `/wealth/health-insurance-basics` | Health Insurance Basics \| Christian Brinkley | 44 |  | `app/wealth/health-insurance-basics/page.tsx` |
| `/wealth/hsa-explained` | The HSA, Explained in Plain English \| christianbuildswealth | 59 |  | `app/wealth/hsa-explained/page.tsx` |
| `/wealth/journey` | Building in Public at 21 \| Christian Brinkley | 45 | BRAND-ONLY: no topic keyword | `app/wealth/journey/page.tsx` |
| `/wealth/learn` | Learn Money Basics in Plain English \| Christian Brinkley | 56 |  | `app/wealth/learn/page.tsx` |
| `/wealth/learn/[slug]` | <dynamic, see file> | dyn | DYNAMIC: resolves per record/city at build time | `app/wealth/learn/[slug]/page.tsx` |
| `/wealth/life-insurance-explained` | Life Insurance Explained \| Christian Brinkley | 45 |  | `app/wealth/life-insurance-explained/page.tsx` |
| `/wealth/money-moves-in-your-20s` | Five money moves for your 20s \| Christian Brinkley | 50 |  | `app/wealth/money-moves-in-your-20s/page.tsx` |
| `/wealth/pre-retirement-5-year-checklist` | Your 5-Year Pre-Retirement Checklist \| Christian Brinkley | 57 |  | `app/wealth/pre-retirement-5-year-checklist/page.tsx` |
| `/wealth/quiz` | Money Quizzes: First $1,000 \| Christian Brinkley | 48 |  | `app/wealth/quiz/page.tsx` |
| `/wealth/quiz/first-1000` | First $1,000 Quiz \| Christian Brinkley | 38 | BRAND-ONLY: no topic keyword | `app/wealth/quiz/first-1000/page.tsx` |
| `/wealth/quiz/money-personality` | Money Personality Quiz \| Christian Brinkley | 43 |  | `app/wealth/quiz/money-personality/page.tsx` |
| `/wealth/quiz/money-personality/[type]` | ${result.name}: a money personality. ${result.tagline} \| Christian Brinkley | dyn | DYNAMIC: resolves per record/city at build time | `app/wealth/quiz/money-personality/[type]/page.tsx` |
| `/wealth/rent-vs-buy-math` | Rent vs. Buy: The Math, Minus the Opinions \| christianbuildswealth | 66 | TRUNCATION RISK (66 chars) | `app/wealth/rent-vs-buy-math/page.tsx` |
| `/wealth/rmd-explained-73` | RMDs at 73, Explained in Plain English \| christianbuildswealth | 62 | TRUNCATION RISK (62 chars) | `app/wealth/rmd-explained-73/page.tsx` |
| `/wealth/roth-ira-explained` | Roth IRA, explained \| Christian Brinkley | 40 |  | `app/wealth/roth-ira-explained/page.tsx` |
| `/wealth/roth-vs-traditional-taxes` | Roth vs Traditional: The Tax Trade \| Christian Brinkley | 55 |  | `app/wealth/roth-vs-traditional-taxes/page.tsx` |
| `/wealth/side-hustle-taxes` | Side-Hustle Taxes, Explained in Plain English \| christianbuildswealth | 69 | TRUNCATION RISK (69 chars) | `app/wealth/side-hustle-taxes/page.tsx` |
| `/wealth/social-security-explained` | Social Security, Explained in Plain English \| christianbuildswealth | 67 | TRUNCATION RISK (67 chars) | `app/wealth/social-security-explained/page.tsx` |
| `/wealth/student-loans-payoff-plan` | Student Loan Payoff Plan \| Christian Brinkley | 45 | BRAND-ONLY: no topic keyword | `app/wealth/student-loans-payoff-plan/page.tsx` |
| `/wealth/tax-brackets-explained-plainly` | Tax Brackets, Explained Plainly \| Christian Brinkley | 52 |  | `app/wealth/tax-brackets-explained-plainly/page.tsx` |
| `/wealth/teens-first-job-money-guide` | Your First Job: A Teen Money Guide \| Christian Brinkley | 55 |  | `app/wealth/teens-first-job-money-guide/page.tsx` |
| `/wealth/tools` | Free Budget Spreadsheet \| Christian Brinkley | 44 |  | `app/wealth/tools/page.tsx` |
