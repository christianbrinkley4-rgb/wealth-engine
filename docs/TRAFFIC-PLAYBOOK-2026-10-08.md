# Traffic Playbook: keyword-gap batch (2026-10-08)

Ten articles under `/guides/`, built to capture question queries with clear demand
and weak or thin current answers. Every article carries: a definition box near
the top (AI-overview bait), FAQ section with FAQPage JSON-LD, Article +
BreadcrumbList JSON-LD, canonical metadata, comparison tables or numbered lists,
internal links to related site pages, a soft CTA to `/start`, the contact line,
and the appropriate compliance disclosure. All figures were verified against
primary or strong secondary sources on October 8, 2026. None are invented.

## The batch

### 1. /guides/what-medicare-does-not-cover
- **Target query:** "what does medicare not cover"
- **Why:** Perennial high-volume question. Current results are thin listicles,
  an Idaho newspaper column, and spammy AI-farm pages. Nothing from a local
  agent pairs the exclusion list with the cost-sharing gaps (no yearly cap on
  Original Medicare) and a neutral fill-the-gap map.
- **Research found:** the 2026 figures ($1,736 Part A deductible, $283 Part B
  deductible, 20% coinsurance with no cap, $2,100 Part D cap) match what this
  site already publishes, so the page is internally consistent.
- **Measure:** ranking for "what does medicare not cover", clicks, AI-overview
  citations of the exclusion list.

### 2. /guides/medicare-hsa-contributions
- **Target query:** "can you contribute to an HSA while on medicare"
- **Why:** Strong intent query from people working past 65. Top results are
  national publishers (Healthline, Motley Fool) with generic answers. The
  differentiator: the 6-month retroactive Part A trap explained as a dated
  action step, plus the 2026 HSA limits table ($4,400 / $8,750 / $1,000
  catch-up) and the Medigap-premium exception.
- **Research found:** every source agrees contributions end with any Medicare
  enrollment (even Part A alone); employer contributions count; spouses can
  keep their own HSA.
- **Measure:** ranking for "HSA medicare contributions", "HSA and medicare at
  65"; assists to /start?topic=medicare&stage=turning_65.

### 3. /guides/working-while-collecting-social-security
- **Target query:** "how much can I earn while collecting social security"
- **Why:** Yearly-refresh query with real demand; people want the current
  number. 2026 figures ($24,480 under FRA, $65,160 in the FRA year, $1-per-$2
  and $1-per-$3 withholding) verified across five 2026 sources. Competitors
  bury the key fact that withheld benefits are credited back at FRA; this page
  leads with it.
- **Measure:** ranking for "how much can I earn while collecting social
  security 2026"; featured-snippet capture on the limit table.

### 4. /guides/is-social-security-taxed
- **Target query:** "is social security taxed"
- **Why:** Huge confusion query, amplified this year by the "no tax on Social
  Security" headlines. The page answers the real mechanics (combined income =
  AGI + tax-exempt interest + half of benefits; $25k/$34k single, $32k/$44k
  joint; 85% cap is on included income, not the rate), adds the verified
  $6,000 senior deduction for 2025-2028 (IRS Tax Tip 2026-14), and closes with
  the NC angle: North Carolina does not tax Social Security benefits.
- **Measure:** ranking for "is social security taxed"; NC-modified queries
  ("does NC tax social security") as a secondary target.

### 5. /guides/missed-medicare-enrollment
- **Target query:** "what happens if you miss medicare open enrollment"
- **Why:** Spikes every December. Existing answers split into two weak camps:
  penalty-scare pieces and forum Q&A. This page handles both cases cleanly
  (already enrolled = auto-renewal + the Jan 1-Mar 31 Advantage second chance;
  never enrolled = GEP Jan 1-Mar 31, coverage July 1, permanent penalties)
  with a next-windows table and a 4-step action list.
- **Measure:** ranking for "missed medicare open enrollment"; seasonal traffic
  Dec-Jan; assists to /special-enrollment and /start.

### 6. /guides/medicare-automatic-renewal
- **Target query:** "do you have to renew medicare every year"
- **Why:** medicare.org's own page lists 20+ related question variants,
  signaling deep long-tail demand. Answers exist but are generic. This page
  adds the renewal-by-coverage-type table, decodes the ANOC letter (the thing
  that actually confuses people), and answers the card question (no expiration
  date).
- **Measure:** ranking for "do you have to renew medicare every year" and "do
  i get a new medicare card every year"; FAQ rich-result eligibility.

### 7. /guides/medicare-part-b-employer-coverage
- **Target query:** "do I need medicare part B if I have employer insurance"
- **Why:** Classic working-past-65 question. Top results are carrier blogs and
  eHealth. The 20-employee rule table, the 8-month SEP warning, and the COBRA
  trap are the three things people get wrong; the page structures around all
  three and cross-links the HSA timing guide.
- **Measure:** ranking for "do i need part b if i have employer insurance";
  internal traffic to /turning-65 and /guides/medicare-hsa-contributions.

### 8. /guides/medicare-travel
- **Target query:** "does medicare advantage work out of state"
- **Why:** Snowbird and grandkid-visit intent. Existing answers are
  agent-forum threads and thin carrier pages. This page draws the clean lines:
  Original Medicare/Medigap = nationwide; Advantage = emergencies and urgent
  care nationwide by law, routine care by plan type; the 6-month service-area
  disenrollment rule; moving = special enrollment period.
- **Measure:** ranking for "medicare advantage out of state" and "can i use my
  medicare in another state".

### 9. /guides/irmaa-brackets-2026
- **Target query:** "2026 IRMAA brackets"
- **Why:** High-intent, table-shaped query. People want the numbers, not
  prose. The page gives the complete 6-tier table (thresholds $109,000 single
  / $218,000 joint on 2024 MAGI; Part B $202.90 to $689.90; Part D $0 to
  $91.00), explains the 2-year lookback, and funnels to the existing
  /irmaa-appeal page and the Roth calculator. Consistent with the brackets the
  site's Roth tool already uses.
- **Measure:** ranking for "2026 IRMAA brackets" and "medicare income limits
  2026"; backlink/citation potential as a reference table.

### 10. /guides/standard-deduction-seniors-2026
- **Target query:** "standard deduction for seniors over 65"
- **Why:** Fresh-number query every tax season. The page gives the exact 2026
  stack ($16,100 + $2,050 = $18,150 single; $32,200 + $1,650 x 2 = $35,500
  joint), two worked examples, and the $6,000 senior bonus deduction with its
  phase-outs ($75k single / $150k joint MAGI). Most competing pages had not yet
  incorporated the bonus deduction at research time.
- **Measure:** ranking for "standard deduction for seniors 2026"; traffic
  ramp Jan-Apr 2027.

## What to measure across the batch
- **Rankings:** target query + 2-3 variants per article, checked weekly through
  AEP (Dec 7) for Medicare pages and through April for tax pages.
- **Clicks and impressions:** Search Console, per URL, week over week.
- **AI citations:** whether AI overviews / assistants cite the definition boxes
  and tables (spot-check the target queries monthly).
- **Assists:** clicks from each guide to /start and to related money pages
  (internal link CTR in analytics).
- **Rich results:** FAQ rich-result impressions per page.

## Skipped on purpose
- **NC retirement-income tax guide:** overlaps the existing /taxes-and-retirement
  page; the NC angle (no tax on Social Security, 3.99% flat) is covered inside
  the Social Security tax guide instead. Revisit only if that page underperforms
  on NC-modified queries.
- **Life-insurance-in-retirement guide:** real demand, but the topic needs
  careful handling to avoid anything resembling product advice, and the batch
  already covers the insurance lane via Medicare. Candidate for the next batch
  with a compliance-first outline.
- **Free-local-Medicare-help (SHIP) guide:** would need verified NC SHIP
  contact details and office specifics; not verified today, so not shipped.

## Notes for future batches
- The site's /guides/ namespace is now claimed. Keep slugs evergreen where
  possible; year-stamp only when the numbers demand it.
- Every tax/money page carries the educational-only disclaimer and the
  not-a-CPA line. Keep that on all future guides.
- Sentence rule held: every prose sentence is 25 words or fewer, no em/en
  dashes, no hedges, no banned phrases. A lint script lives at /tmp
  (lint_articles.py / lint2.py) for reuse; consider promoting one into the
  repo before the next batch.
