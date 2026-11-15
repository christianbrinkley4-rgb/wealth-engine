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
