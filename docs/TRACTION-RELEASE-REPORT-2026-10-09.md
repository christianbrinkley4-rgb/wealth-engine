# Traction release report, October 9, 2026

Branch `claude/traction-2026-10-09`, based on `origin/master` at `ea436c0`. Nothing was pushed to `master` and nothing was deployed. No live form was submitted. This worktree has no `.env.local`, so it cannot reach the command center.

## 0. How this branch came to be

The hand-off brief said Codex had not started and no branch existed. That was not the state of the repo:

- The strategy phase was already committed (`483a6ad`): master plan, IA decision, measurement spec, tickets.
- A `codex/traction-release-2026-10-09` branch existed, with 145 uncommitted files of implementation in the `traction-spec` worktree, last touched 16:50 on October 9. Codex stopped before writing a release report.

Nothing was thrown away. Codex's work was committed as found (`bf72301`, labelled unreviewed), then reviewed and repaired in a second commit. Section 3 lists what was rejected and why.

## 1. Baseline and result

| Measure | Master `ea436c0` | This branch | How measured |
| --- | --- | --- | --- |
| Page files | 146 | 147 | `git ls-tree`, `git ls-files` |
| Route handlers | 15 | 15 | same |
| Static pages built | 341 | 342 | `next build --webpack` |
| Lint | 10 errors, 6 warnings | 0 errors, 6 warnings | `npm run lint` |
| Typecheck | not recorded | clean | `npx tsc --noEmit` |
| Tests | 879 in 62 files, one load-sensitive timeout | 926 in 70 files, all passing | `npm test` |
| Sitemap URLs | 285 | 189 | local production build with the production site URL |
| Indexable HTML pages | 249 | 189, all in the sitemap | local crawl |
| Noindex pages reached by links | 4 | 64 (the same 4, `/links`, 59 town pages) | local crawl |
| Non-200 pages, broken links | 0 | 0 | local crawl, 253 pages |
| Internal links through a redirect | 14 or more pages | 0 | local crawl |
| Orphan indexable pages | 1 | 0 | local crawl |
| Duplicate titles or descriptions | 0 | 0 | local crawl |
| Pages with zero or several H1s | 0 | 0 | local crawl |
| Structured data that fails to parse | 0 | 0 | local crawl |
| Em dashes in page text | not measured | 0 | local crawl |

Master figures come from the master plan, which measured the live site. Branch figures come from a local production build. The two crawls used different tools, so treat small differences as method, not change.

## 2. Changes by ticket

| Ticket | What changed | Visitor or owner outcome | KPI to watch | Evidence |
| --- | --- | --- | --- | --- |
| T-10 release safety | Ten lint errors fixed with no change to rendered text. `WealthNav` no longer sets state in an effect. `npm run check` added. Test concurrency bounded | One command checks a release | Lint errors on master: 0 | `npm run lint` exits 0. 926 of 926 tests pass |
| T-01 measurement | Eight new events on the allow-list: `tool_start`, `tool_complete`, `cta_click`, `official_handoff_click`, `ask_submit`, `guide_signup`, `checklist_start`, `checklist_complete`. Fixed labels only. Three `/tools` quizzes report steps. `phone_click` carries where the button was | Christian can see which page and which button led to a tap | Sessions with a useful action. `cta_click` by location | `traction-measurement`, `traction-tag-queue`, `analytics` tests. Browser recorder run, section 4 |
| T-02 Meta Pixel | No code change. No privacy wording touched | None yet | Lab transfer size after the pixel is switched off | Needs Christian's decision |
| T-03 town pages | All 20 `/retirement-in`, all 20 `/life-insurance-in` and 19 of 20 `/medicare-in` pages carry `noindex, follow`, leave the sitemap and both `llms` files, and stay reachable from `/service-area` | No visible change for a resident. Search engines stop seeing near-copies | Indexable pages 249 to 189. Search Console duplicate counts over 28 days | `traction-architecture` test. Crawl: 59 noindexed town pages, 0 in the sitemap |
| T-04 links | Six under-linked pages now have 4 to 6 inbound links each. Retired `/wealth/calculators/*` links point at `/tools/*`. `/wealth/calculators` redirects to `/tools`. Markdown copies of guides are out of the sitemap and carry a canonical `Link` header | Readers on AEP and Medigap pages find the Greensboro and 2027 pages | Inbound link count. Impressions on the six pages | Crawl: 0 orphans, 0 redirect hops. Header check on a Markdown URL |
| T-05 navigation | Medicare header: Turning 65, Already on Medicare, Medicare guides, Towns I serve, About, a quiet Money guides link, Plan check, Call. Money header: Tools, Guides, Quizzes, Journey, Medicare help. `/ai`, `/answers`, `/ask`, `/taxes-and-retirement` live in the footer. `/guides` is grouped by lane. `/links` is noindex | One label per thing | `cta_click` with `cta_location` header and menu | Architecture test. Wealth header 70 px tall at 768 px (was 116) |
| T-09 performance | Bot check loads on focus or when the form scrolls into view, on four forms. Google tag loads after the page is idle. Below-fold homepage and `/learn` sections use `content-visibility`. First paint no longer waits on the reveal script | Faster first paint on a phone | Lab LCP and TBT, once measured | `traction-flows`, `traction-reveal`, `traction-tag-queue` tests. Not measured with Lighthouse here, see section 5 |
| T-08 guide signup | `guide_signup` fires on success only. The form is on `/learn` and at the end of `/answers/*` articles. Consent text, endpoint and storage unchanged | Someone not ready to call can ask for new guides | `guide_signup` per week | `traction-flows` test |
| T-06 trust | A small block: license line and state, a link to the Google profile, a link to sources. No lookup link, no rating, no stars, because no NPN and no reviews exist in the repo | A careful visitor sees what is true today and nothing else | Contact rate on `/about` | `traction-templates` test covers each data state |
| T-11 tools | All 12 tool pages open with the heading and the tool. Contact block sits after the result | First input is on the first screen | `tool_start` divided by tool page views | First input at 436 px on a 390 by 844 screen (`/tools/budget`) |
| T-07 checklist | New `/medicare-plan-checklist`. Four steps, one printable sheet, a plain link to Medicare.gov Plan Compare, a link to SHIIP, call and book buttons | A visitor arrives at Medicare.gov, or at a conversation, with their list ready | `checklist_complete` divided by `checklist_start`. `official_handoff_click` | `traction-flows` test. Keyboard and network run, section 4 |
| T-13 town rewrites | **Not delivered as specified.** See section 3. Delivered instead: a verified free-counseling section on every `/medicare-in` page | A resident gets a real, checked phone number for unbiased help | `official_handoff_click` from town pages | `traction-local-facts` test |
| T-12 Search Console | Importer script, synthetic fixture, written workflow. No experiment run, because no export exists | None yet | Position and clicks, test against control, once data exists | `gsc-link-candidates` test |
| T-14 cleanup | Not in scope (P2). Not done | | | |

## 3. What the review rejected or repaired

Found while reviewing Codex's uncommitted work.

| # | Finding | Why it failed | Repair |
| --- | --- | --- | --- |
| 1 | Twelve town pages were replaced with four short "fact" paragraphs each | It deleted hand-written pages to raise a uniqueness score. Sources included a hospital careers page, a patient-portal page and a county ambulance directory. Sentences such as "A county service listing should never be read as an insurance network" are padding. Worse for a reader than what it replaced | Four hand-written pages restored from master. Template restored for the rest. Codex's fact file removed |
| 2 | Forty-eight local facts with addresses and phone numbers | Only two could be re-verified from the source page today. One Alamance listing gave a 919 number for a 336 county through a third-party directory | Kept only what was read on its source on October 9: NC SHIIP (855-408-1212) and the Shepherd's Center for Forsyth County (336-748-0217) |
| 3 | Eight `/medicare-in` pages kept indexable | Measured on the branch: 6% to 14% unique for seven of them, and Summerfield and Stokesdale 79% alike. That is the doorway pattern the plan set out to remove | Only Greensboro (20%, the home city) stays indexable. One line in `lib/triad.ts` restores any town |
| 4 | Town-page `robots` tag forced `index: true` | It overrode the site rule that keeps non-production builds out of search | Town pages now only ever add `noindex` |
| 5 | The same checklist sentence pasted twice on `/annual-enrollment`, `/aep`, `/anoc` | Visible duplicate paragraph | One shared sentence, shown once |
| 6 | Checklist treated five counties as "served" and told Forsyth residents service was "not confirmed" | The site has Winston-Salem and Kernersville pages. The list (including Wake County) is not in the repo and could not be verified | County list now comes from the town pages the site has. No "served or not" judgment |
| 7 | Any phone link counted as `phone_click` | With SHIIP numbers on town pages, calls to SHIIP would have been counted as leads | Only Christian's number counts. Tested |
| 8 | Trust block listed ten social profiles, on every page close | A wall of links ending in Brownbook and Manta does not build trust | License line and two links |
| 9 | Trust block duplicated on `/about` | Shown twice | Shown once |
| 10 | Tool intros rewritten to flat lines such as "Compare two payoff methods using your balances and interest rates" | Lost the voice in CONTENT-VOICE.md | First sentences of the original intros restored |
| 11 | Headline font axes removed and preload turned off | The CSS still asks for those axes, so every headline would have changed shape. Out of scope for a performance ticket | Font configuration restored to master |
| 12 | Four helper scripts hard-coded a path inside Codex's own install | Cannot run anywhere else. Two lint errors | Removed. Crawl, similarity, link and Search Console scripts kept |
| 13 | Checklist copy ("Ready to carry forward", "This is not a premium estimate") | Reads like a form letter | Rewritten |

## 4. Verification runs

All against a local production build on `localhost`, with the production site URL set and the lead endpoint pointed at a dead local address.

**Events, with a recorder in place of `window.gtag`:**

- `/turning-65`: hero, sticky bar, page close and header phone taps each produced one `phone_click` with the right `cta_location`. The hero button produced one `cta_click` (`ask_question`, `hero`). No parameter carried a query string.
- `/tools/compound-interest`: untouched page, no event. First input change, one `tool_start`. Ten seconds later, one `tool_complete`. A second change and wait produced nothing more.
- `/medicare-in/winston-salem`: taps on both SHIIP numbers produced no `phone_click`. Both SHIIP links produced `official_handoff_click` with `nc_shiip`.
- `/medicare-plan-checklist`: one `checklist_start`, one `checklist_complete`, one hand-off each for Plan Compare and SHIIP. Events carried the page path and nothing typed.

**Checklist privacy:** after a full run with synthetic entries, the only requests were Next.js route prefetches. The address bar did not change. `localStorage` was empty. `sessionStorage` held only the existing attribution record.

**Keyboard:** ZIP, county, Continue reached by Tab. Enter advanced the step and focus moved to the new step heading. Focus outline visible on the county field.

**Layout:** 16 routes at 390, 768 and 1440 px. No sideways scroll anywhere. One trust block per page. Every trust link and checklist button at least 44 px tall.

## 5. Performance: what is and is not known

No Lighthouse run was made on this branch. The master-plan baseline was measured on the live site with live third-party tags. A local build has no tags, so a local number would not be comparable and is not reported.

What changed, structurally, and is covered by tests: the bot check no longer loads when a guide page opens, the Google tag no longer competes with first paint, and server-rendered text is visible before any script runs.

Fonts were not trimmed. That item of T-09 is open.

Before and after lab numbers need one Lighthouse run on a deploy preview with the same tags as production.

## 6. Town page audit

Hand-written pages, measured on the branch among the four the plan flagged:

| Page | Unique share | Decision |
| --- | --- | --- |
| `/medicare-butner-nc` | 41% | Keep |
| `/medicare-ramseur-nc` | 30% | Keep. Rewrite shared sections when Christian can supply local detail |
| `/medicare-graham-nc` | 29% | Keep. Same |
| `/medicare-liberty-nc` | 25% | Keep. Same |

The other seven hand-written pages were 44% to 57% unique in the master plan and were not touched: Creedmoor, Asheboro, Oxford, Mebane, Madison, Eden, Roxboro. All 11 stay indexed and are now listed on `/service-area`.

Generated `/medicare-in` pages, measured on the branch:

| Page | Unique share | Decision |
| --- | --- | --- |
| Greensboro | 20% | Indexed |
| Burlington | 14% | Noindex until rewritten |
| Kernersville | 10% | Noindex until rewritten |
| Winston-Salem | 9% | Noindex until rewritten |
| High Point | 9% | Noindex until rewritten |
| Summerfield | 9% | Noindex until rewritten |
| Jamestown | 9% | Noindex until rewritten |
| Stokesdale | 6% | Noindex until rewritten |
| The other 12 | 4% to 12% in the master plan | Noindex |

This is stricter than the IA decision, which kept eight for 30 days pending a rewrite. The rewrite that arrived was not usable, so the grace period has nothing behind it.

## 7. Files

Created: `app/medicare-plan-checklist/` (page, component, stylesheet), `app/components/TrustFacts.tsx`, `app/components/ReadNext.tsx`, `app/tools/_components/tool-header.tsx`, `app/tools/_components/tool-tracking.tsx`, `hooks/useToolTracking.ts`, `hooks/useDeferredFormCheck.ts`, `lib/planChecklist.ts`, `lib/localMedicareFacts.ts`, `lib/guideLanes.ts`, eight test files under `lib/__tests__/`, `scripts/traction-crawl.mjs`, `scripts/traction-similarity.mjs`, `scripts/traction-links.mjs`, `scripts/traction-stability.mjs`, `scripts/gsc-link-candidates.mjs`, `scripts/fixtures/gsc-synthetic.csv`.

Docs: this report, `CLAUDE-FINAL-RELEASE-GATE-2026-10-09.md`, `TRACTION-OPEN-DEPENDENCIES-2026-10-09.md`, `GSC-IMPORT-WORKFLOW-2026-10-09.md`.
