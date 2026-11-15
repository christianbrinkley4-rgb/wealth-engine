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
