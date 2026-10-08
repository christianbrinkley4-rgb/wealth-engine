# Numbers Hub: year-update playbook

The /numbers hub (files in `app/numbers/`) is the site's definitive money-numbers reference.
Each fall, the IRS, SSA, and CMS publish the next year's figures. This playbook documents
exactly how to roll the hub forward. A future agent should be able to complete the update
in one session by following these steps in order.

## When to run this

Run the full update each October/November, in three waves. Figures arrive on different
schedules, so update the hub in waves rather than waiting for all of them.

## Wave 1: IRS figures (usually mid-October)

Check: the IRS newsroom announcement "tax inflation adjustments for tax year 20XX"
and the retirement-plan limits announcement ("401(k) limit increases to ...").

Verified source pages used for 2026 (update the URLs for the new year):
- Tax brackets, standard deduction, and senior deductions:
  `https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill`
- 401(k)/403(b)/457(b) and IRA limits:
  `https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500`
- HSA limits: IRS Publication 969, `https://www.irs.gov/publications/p969/`

Figures to update in `app/numbers/data.ts`:
- Standard deduction (single, married filing jointly), 65+ add-ons, senior bonus deduction
- All 7 federal tax bracket rows (single + married filing jointly)
- 401(k)/403(b)/457(b) base limit, 50+ catch-up, ages 60-63 super catch-up
- IRA base limit and 50+ catch-up
- HSA self-only, family, and 55+ catch-up limits
- FSA limit (the hub intentionally omits the FSA figure until it is site-verified;
  add a row here once a source page carries it)

Mirror pages to update (the hub test cross-checks hub figures against these files,
so update them FIRST or the test fails):
- `app/wealth/tax-brackets-explained-plainly/page.tsx`: brackets table + standard deduction
- `app/guides/standard-deduction-seniors-2026/page.tsx`: rename for the new year if a new
  guide page is created, or update in place; update the hub's `sourceFile` paths to match
- `app/wealth/401k-explained/page.tsx`: 401(k) limit
- `app/wealth/roth-ira-explained/page.tsx`: IRA limit
- `app/wealth/catch-up-contributions-after-50/page.tsx`: catch-up figures
- `app/wealth/hsa-explained/page.tsx`: HSA limits

## Wave 2: SSA figures (usually mid-October)

Check: the SSA COLA fact sheet, `https://www.ssa.gov/news/press/factsheets/colafactsYYYY.pdf`
(2026 used `colafacts2026.pdf`).

Figures to update in `app/numbers/data.ts`:
- Taxable earnings cap (wage base)
- Cost-of-living adjustment

Mirror page to update first:
- `app/wealth/social-security-explained/page.tsx`: wage base + COLA

## Wave 3: CMS figures (October/November)

Check: CMS newsroom fact sheets (`https://www.cms.gov/newsroom/fact-sheets`) for the
CY Rate Announcement and the Part B / Part D / IRMAA fact sheets, usually landing
in October and November.

Figures to update in `app/numbers/data.ts`:
- Part B standard premium and annual deductible (projections become final)
- Part D standard deductible (max) and out-of-pocket cap
- Part A hospital deductible
- Medicare Advantage national average premium
- IRMAA first thresholds in `IRMAA_NOTE` (single / joint)

Mirror pages to update first:
- `lib/medicareNumbers2027.ts` (the shared data module behind `/medicare-numbers-2027`, or the new year's module): Part B, Part D,
  Part A, MA average figures
- `app/guides/irmaa-brackets-2026/page.tsx` (or the new year's IRMAA guide): thresholds

## Files to edit on every update

1. `app/numbers/data.ts`: all figure values; update `LAST_UPDATED_LABEL` and
   `LAST_UPDATED_ISO` to the edit date; update `sourceUrl` links to the new year's
   announcements; update `sourceFile` paths if mirror pages were renamed for the new year.
2. `app/numbers/meta.ts`: no change needed unless the title/description changes.
3. `app/numbers/page.tsx`: update `datePublished`/`dateModified` and the "when the
   20XX numbers land" section copy.
4. `app/sitemap.ts`: bump `/numbers` `lastModified`.
5. `app/llms.txt/route.ts` and `app/llms-full.txt/route.ts`: update the hub's line if
   the headline figures changed (keep ≤1 line).

## Verification before calling it done

1. `npx vitest run lib/__tests__/numbers-hub.test.ts`: every hub figure must appear
   verbatim in its declared source file. If a test fails, the mirror page was missed.
2. `npx tsc --noEmit`: clean.
3. Production build green: `npm run build`.
4. Check the page at 390px width (tables scroll horizontally via `overflow-x-auto`;
   confirm nothing clips).
5. Confirm no em dashes in any hub file (`grep "—" app/numbers/*`).
6. Confirm the "Last updated" eyebrow and the footer reference show the new date.

## Rules that never change

- Never invent a figure. If a number is not yet announced, the cell reads
  "Not yet announced" and the intro says so.
- A figure goes on the hub only after it appears on a sourced mirror page of this
  site. The hub cites; the mirror pages verify.
- Projections are labeled "Projection" with the projecting source named, until CMS
  or SSA finalizes them.
- Educational framing only: reference numbers, not personal advice. Keep the
  human voice and no em dashes.

Last updated October 8, 2026.
