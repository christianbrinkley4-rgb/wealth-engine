# BUILD-STATE: Lead-to-Appointment Engine

Branch: `fable/lead-to-appointment-engine`, cut from `origin/master` at `8573d7d` on 2026-11-15.
Worktree: `C:\Users\chris\Wealth-Engine\lead-engine`.
This file is a working note for the build. Delete it before or after merge if you do not want it in the repo.

## Ground facts confirmed at the start

- Deploy branch: `master`. Proof: `CLAUDE.md` line 5 and `AGENTS.md` ("Netlify deploys the `master` branch, not `main`"). `netlify.toml` names no branch. GitHub default branch is `main` (`8e10867`), which has no common history with `master` (`git merge-base origin/main origin/master` returns nothing). Conflict to know: a PR opened in the GitHub UI will default to base `main`. The base must be set to `master`.
- Baseline on untouched `master`: `npm test` 106 files, 1877 tests passed. `npm run lint` 0 errors, 2 warnings.
- CMS 2027 Part B premium, Part B deductible, and IRMAA brackets: NOT published. Proof: https://www.cms.gov/newsroom listed no 2027 Parts A and B item through Nov 13, 2026, and https://www.cms.gov/newsroom/fact-sheets/2027-medicare-parts-b-premiums-deductibles returned 404 on Nov 15, 2026.
- CMS 2027 Part D deductible $700 and out-of-pocket threshold $2,400: final. Proof: https://www.cms.gov/files/document/2027-announcement.pdf, Table V-2.

## Decisions that apply to more than one component

1. The capture API accepts five `source` values only, and the database has a check constraint on `source`. New tools therefore post with `source: "wizard_completion"` and start `irmaa_bracket` with the tool name. Existing tools already do this ("Plan 65, ...", "Roth window, ..."). The attribution report reads that prefix.
2. New public pages carry no photo of Christian. `MedicareByline` and `KitchenTableClose` both render his headshot, so the new pages use text-only parts in `app/components/PlainPageParts.tsx`. The sitewide header still shows his avatar. That header is outside this build.
3. `components/EmailResultsCapture.tsx` got four additive, optional changes (defaults unchanged): `heading`, `intro`, optional `wizardData.age`, optional `wizardData.interest_topic` and `wizardData.quiz_answers`. Reason: see component 3.2.

## 3.1 Standalone IRMAA checker: DONE

- Goal: a page at `/irmaa-checker` that shows the 2026 IRMAA tier and the Part B and Part D surcharge for a filing status and income, with lead capture.
- Acceptance: reuses `lib/irmaa.ts` math, year labeled 2026, uses `EmailResultsCapture`, has metadata, canonical, JSON-LD, FAQ, disclosure, sitemap entry, tools hub card.
- Decisions: 2026 brackets used because 2027 is not published. Part D surcharge comes from the existing `partDIrmaaFor` in `lib/medicareCosts2026.ts`. Married filing separately is not covered and the page says so. `irmaa_checker` added to `TOOL_IDS` so start and complete events are counted.
- Files: `lib/irmaaChecker.ts`, `lib/__tests__/irmaaChecker.test.ts`, `app/irmaa-checker/page.tsx`, `app/irmaa-checker/IrmaaChecker.tsx`, `app/components/PlainPageParts.tsx`, `components/EmailResultsCapture.tsx`, `app/sitemap.ts`, `app/tools/page.tsx`, `lib/analytics.ts`.
- Tests: `npx vitest run lib/__tests__/irmaaChecker.test.ts` passed. `npx tsc --noEmit` clean. Checked in a browser at 375px: $150,000 single shows Tier 2, $405.80, +$37.50, $240.40 a month.
- Risks: the form was not submitted in testing (repo rule: never submit a real form).
- Next: 3.2.

## 3.2 Lead capture on the calculator and the checklist: DONE

- Goal: a reader of `/greensboro-medicare-cost-calculator` or `/plan-checklist-tool` can reach Christian through the existing `EmailResultsCapture` form and the existing `/api/capture-lead` route.
- Acceptance: no change to `app/api/capture-lead/route.ts`. Neither tool rebuilt. No health detail sent.
- What changed in `components/EmailResultsCapture.tsx` (all optional, defaults unchanged): `heading`, `intro`, `submitLabel`; `wizardData.filing_status`, `age`, `annual_income`, `calculated_premium` became optional; `wizardData.interest_topic` and `wizardData.quiz_answers` added. Why not call-site only: the calculator has no filing status or income, and the checklist has no numbers at all. Passing invented values would store false data. The default heading "Send me these numbers" and button "Email it to me" would also tell a checklist reader that the sheet (prescriptions, doctors) is emailed. It is not.
- Calculator: sends age, ZIP, 2027 projected Part B premium, and a label with the two yearly estimates. Does not send the prescription count or the visit count.
- Checklist: sends the name and email typed into the form, plus fixed labels (`CHECKLIST_CONTACT_REQUEST` in `lib/planChecklist.ts`). Sends nothing from the sheet. A test proves it (`tool-lead-capture.test.ts`, "sends nothing typed into the sheet"). `interest_topic: "medicare"` and `entry_mode: "quick_contact"` select the existing short reply email. Side effect to know: a lead with topic `medicare` and consent is enrolled in the existing Medicare nurture sequence. Calculator and IRMAA checker leads have no topic and are not enrolled (same as the existing `/medicare` wizard).
- Files: `components/EmailResultsCapture.tsx`, `app/greensboro-medicare-cost-calculator/CalculatorClient.tsx`, `app/greensboro-medicare-cost-calculator/data.ts`, `app/plan-checklist-tool/PlanChecklist.tsx`, `lib/planChecklist.ts`, `lib/__tests__/tool-lead-capture.test.ts`.
- Tests: `npx vitest run lib/__tests__/tool-lead-capture.test.ts lib/__tests__/results-capture-security.test.ts app/greensboro-medicare-cost-calculator/data.test.ts` : 3 files, 26 tests passed. Browser check at 375px: both forms render, no horizontal overflow, no console errors.
- Risks: (1) The calculator page header still says "Your numbers and answers stay on your device" (shared `ToolHeader`). The new line above the form says what the form sends. (2) Christian must approve the new form wording (repo rule: ask before changing what a person submits). (3) Existing calculator text names an insurance company and says "Free. No obligation." These were not changed (outside Section 3). See the final report.
- Next: 3.3.

## 3.3 Appointment prep sheet system: DONE

- Goal: (a) a private builder that prints a structured prep sheet, (b) a public intake form that emails the client's answers to Christian and writes nothing to a database.
- Acceptance: builder is noindex, nofollow, not in the sitemap, not in navigation. Intake uses the existing Resend path. No medication or doctor field reaches Supabase or any database. Fictional test data only.
- (a) `/prep-sheet`: client-side only. No network request, no browser storage, no analytics event. Fields: client name, appointment date and time, current plan type, medications, doctors, pharmacy, questions. The sheet lists each drug with three check boxes (dose confirmed, compare with this drug, compare without this drug), the client's questions, a "Still to ask" list built from empty or incomplete fields, an "Ask at every appointment" list, and a "Before the appointment" list. A paste box reads an intake email and fills the fields.
- (b) `/appointment-prep` and `POST /api/prep-intake`: the route validates, then calls the existing `sendStoredEmailSnapshot` in `lib/notifyLead.ts` (Resend). Recipient is `LEAD_NOTIFY_EMAIL`, or `AGENT.email` when that is empty, the same inbox the lead alerts use. No Supabase, no Command Center, no nurture, no Make webhook, no retry queue. If Resend is not configured or rejects the email, the route returns 503 and the page tells the person the answers were not sent and to call.
- Decisions: (1) The intake page is noindex and not in the sitemap. It is for people who already have an appointment, and Christian sends the link. (2) The builder keeps data in memory only, so a reload clears it. This is the safer option for health details. (3) The intake creates no lead row at all. (4) New consent sentence `INTAKE_CONSENT_TEXT` in `lib/prepSheet.ts`, version `2026-11-15.v1`. Christian must approve this wording. (5) The form tells people not to enter a Medicare number or Social Security number.
- Files: `lib/prepSheet.ts`, `app/api/prep-intake/route.ts`, `app/prep-sheet/page.tsx`, `app/prep-sheet/PrepSheetBuilder.tsx`, `app/prep-sheet/prep-sheet.css`, `app/appointment-prep/page.tsx`, `app/appointment-prep/IntakeForm.tsx`, `lib/__tests__/prep-sheet.test.ts`, `lib/__tests__/prep-intake-route.test.ts`.
- Tests: `npx vitest run lib/__tests__/prep-sheet.test.ts lib/__tests__/prep-intake-route.test.ts` : 2 files, 48 tests passed. Browser check at 375px with fictional data: the builder made the sheet and made no `/api/` request. The intake form posted to `/api/prep-intake` and got 503 `email_unavailable`, because the local worktree has no Resend key. That is the designed result when the email cannot go out.
- Risks: (1) Not blocked, but unverified: live Resend delivery of the intake email. Check after deploy: open `/api/health`, confirm Resend reports ready, then send one test intake with fictional data and confirm it reaches the inbox. (2) "Private" means unlisted and noindex. The site has no login, so anyone with the URL can open the empty builder. It holds no data. (3) Resend, the email provider, keeps its own record of sent messages. The website itself stores nothing. (4) `/privacy` does not mention the new intake form yet. That is a disclosure change for Christian to approve.
- Next: 3.4.

## 3.4 Estimator figures refresh: DONE

- Goal: check every 2027 figure in `app/greensboro-medicare-cost-calculator/data.ts` against CMS. Label each kept figure with year, status, and source.
- Result per figure (checked 2026-11-15):
  - Part B premium $209.50 and deductible $292: kept as 2027 PROJECTIONS. CMS final figures not published (see "Ground facts").
  - Part D maximum deductible $700 and out-of-pocket cap $2,400: FINAL. CMS 2027 Rate Announcement, Table V-2, https://www.cms.gov/files/document/2027-announcement.pdf (PDF text read locally: "Deductible $615 $700", "Out-of-Pocket Threshold $2,100 $2,400").
  - Average standalone Part D premium about $36 and national average MA premium $12.00: CMS PROJECTIONS. CMS press release Sept 28, 2026 ("from $35.09 in 2026 to $36 in 2027", "from $14.37 in 2026 to $12.00 in 2027").
  - MA copay per visit $20 and drug cost $12 a month: PLANNING ESTIMATES, no source. Now stated in the code, in the assumption box, in a FAQ answer, and in the new table.
  - Guilford County 55 plans, $4.13, $7,055.45: these come from MedicareAdvantage.com, not from a CMS announcement. The old label said "CMS 2027 landscape file, via medicareadvantage.com". The label now says third party. NOT verified against CMS. Open issue: `lib/ncLandscape2027.ts` (built from the CMS CY2027 landscape file) counts 57 Guilford County plans. Other pages also print 55 (`lib/greensboroMedicareGuide.ts`, `app/medicare-costs-north-carolina/page.tsx`, `app/medicare-advantage-north-carolina/page.tsx`). Not changed. Christian decides which count to show.
- No figure was added that is per plan or per insurer. The Medigap rates and the insurer name on this page already existed and were not changed.
- New: `FIGURE_LABELS` in `data.ts` and a table on the page, "Where each number in the calculator comes from".
- Files: `app/greensboro-medicare-cost-calculator/data.ts`, `data.test.ts`, `page.tsx`, `CalculatorClient.tsx`, `app/sitemap.ts`.
- Tests: `npx vitest run app/greensboro-medicare-cost-calculator/data.test.ts` passed (18 tests in the file after this change).
- Risk: when CMS publishes the final 2027 Part B figures, update `PART_B_MONTHLY`, `PART_B_DEDUCTIBLE`, their two `FIGURE_LABELS` rows, and the test "keeps the 2027 Part B premium and deductible as projections".
- Next: 3.5.

## 3.5 Attribution report: DONE

- Goal: a local command that reads the lead rows `capture-lead` stores in Supabase and prints a text and HTML summary. Not a deployed page.
- Command: `npm run report:attribution`. Options: `--days=30` (default 90), `--all`, `--out=<file>.html`, `--table=leads|website_inquiries`, `--sample`.
- What it prints: leads by source tool, by UTM source and medium, untagged leads by referring host, leads by week, and help quiz starts (`lead_events`) against completions.
- Decisions: (1) Plain `.mjs` script, the same pattern as `scripts/check-connections.mjs`. The app never imports it. (2) It selects only date, source, topic, tool label, and campaign tags. It selects no name, email, phone, ZIP, or answer text. (3) It reads `website_inquiries` first when that table exists (the Command Center database), then `leads`. Reason: `capture-lead` writes to the Command Center when `COMMAND_CENTER_INGEST_URL` is set, and to `leads` otherwise. (4) The HTML file goes to `.cache/attribution/` (ignored by git). The script refuses to write inside `public/`, `app/`, `.next/`, `out/`, or `netlify/`. (5) With no key it prints a clear note and exits with code 1.
- Files: `scripts/report-attribution.mjs`, `lib/__tests__/attribution-report.test.ts`, `package.json` (one script line).
- Tests: `npx vitest run lib/__tests__/attribution-report.test.ts` : 20 tests passed. `npm run report:attribution` with no key printed the missing-key note and exit code 1. `npm run report:attribution -- --sample` printed the fictional sample and wrote the HTML file.
- Risks: NOT run against the real database. This worktree has no `.env.local`, by design. Unknown until Christian runs it: which database `SUPABASE_URL` in his `.env.local` points to. If the script reports that no lead table could be read, the service key belongs to a different project than the one that holds the leads. Calculator start and complete counts are in the analytics tool, not in Supabase, so the report cannot show them.
- Next: 3.6.

## 3.6 Search pages for IRMAA and Medicare cost questions: DONE

- Goal: two to four pages that answer exact search questions, with verified figures only.
- Built three pages:
  - `/irmaa-married-filing-jointly`: IRMAA for married couples. Joint limits, what each spouse pays, the separate-return table, what changes after a spouse dies.
  - `/part-d-irmaa`: the Part D surcharge. The 2026 table, who pays it, how Medicare bills it.
  - `/medicare-cost-greensboro-nc`: how much Medicare costs in Greensboro. Costs Medicare sets, costs that depend on the county, 2026 and 2027.
- Why these three: the site already has `/guides/irmaa-brackets-2026`, two IRMAA articles under `/learn`, `/irmaa-appeal`, and four cost pages (`/medicare-costs`, `-2026`, `-2027`, `-north-carolina`). These three questions had no page of their own. A fourth page would have repeated an existing page.
- Figures and sources: all 2026 IRMAA amounts come from `lib/irmaa.ts` and `lib/medicareCosts2026.ts` (CMS fact sheet, Nov 14, 2025, re-read Nov 15, 2026). Separate-return amounts are new in `lib/irmaaMarried2026.ts` from the same fact sheet ($109,000 and $391,000 lines, $649.20 and $689.90, +$83.30 and +$91.00). Billing facts for Part D IRMAA come from Medicare.gov fact sheet 11469. A test (`lead-engine-pages.test.ts`, "types no dollar amount outside the verified list") fails if a page types any other dollar amount.
- Template: each page has absolute title, description, canonical, Open Graph, breadcrumb, Article and FAQ JSON-LD, a source list, the Medicare compliance disclosure, a text byline, and a sitemap entry. Text-only parts from `app/components/PlainPageParts.tsx` (no photo).
- Links added to existing pages (one line each): `app/guides/irmaa-brackets-2026/page.tsx` links the checker and the married page. `app/greensboro-medicare-cost-calculator/page.tsx` links the Greensboro cost page.
- Files: `app/irmaa-married-filing-jointly/page.tsx`, `app/part-d-irmaa/page.tsx`, `app/medicare-cost-greensboro-nc/page.tsx`, `lib/irmaaMarried2026.ts`, `app/components/PlainPageParts.tsx`, `lib/__tests__/lead-engine-pages.test.ts`, `app/sitemap.ts`, `app/irmaa-checker/page.tsx`, plus the two one-line link edits.
- Tests: `npx vitest run lib/__tests__/lead-engine-pages.test.ts` : 97 tests passed. Browser check at 375px: three pages render, no horizontal overflow, no image inside the page content.
- Risks: (1) `/medicare-cost-greensboro-nc` has a town name in its path. The brief asked for this page and also says no new town pages. It is a cost answer page, not a service-area page. Christian can drop it from the PR if he reads it as a town page. (2) The $9,850 and $14,800 Medicare Advantage limits come from Section 2 of the brief. The CMS memo was not re-opened in this build, so the page lists that source by name with no link. (3) New pages will not rank before Annual Enrollment ends on December 7, 2026.
- Next: full lint, test, build. Then push the branch.

## Final checks on the branch (2026-11-15)

- `npm run lint` : exit 0. 0 errors, 2 warnings. The same 2 warnings exist on untouched `master` (`netlify/functions/*.ts`, anonymous default export).
- `npm test` : exit 0. 112 test files passed, 2074 tests passed. Baseline on `master` was 106 files, 1877 tests. This build added 6 test files and 197 tests.
- `npm run build` : exit 0. "Compiled successfully". 618 static pages generated. New routes in the build output: `/irmaa-checker`, `/irmaa-married-filing-jointly`, `/part-d-irmaa`, `/medicare-cost-greensboro-nc`, `/appointment-prep`, `/prep-sheet`, `/api/prep-intake`.
- The built HTML of each new page has its `h1` and no client-side bailout marker.
- Note on the local build: every page, old and new, shows `noindex, nofollow` in a local build because `NEXT_PUBLIC_SITE_URL` is not set locally (`SITE_INDEXABLE` in `lib/seo.ts`). On Netlify the four search pages carry no `robots` setting of their own, so they follow the site setting.

## What a human must do or decide

1. Open the PR with base `master` (not `main`). Christian approves it.
2. Approve the new wording a person sees or agrees to: the intake consent sentence (`INTAKE_CONSENT_TEXT`), the text above each new capture form, and the checklist form heading and button.
3. After deploy, check `/api/health`, then send one test intake with fictional data and confirm the email arrives.
4. Run `npm run report:attribution` on a machine that has `.env.local`.
5. Decide these items, which this build found and did not change:
   - The calculator names an insurance company and prints its filed rates. The brief says never name a carrier on a public page.
   - The calculator and the tools hub say "Free", "Request a free review" and "Start a free review". The brief says to use "no cost, no obligation".
   - Guilford County plan count: 55 (third-party summary, on four pages) or 57 (the repo's own CMS landscape data).
   - `/privacy` does not mention the new appointment prep form.
   - When CMS publishes the 2027 Part B premium and IRMAA table, update `lib/irmaa.ts`, `lib/medicareCosts2026.ts`, `lib/irmaaMarried2026.ts`, and the calculator's `data.ts` together.
