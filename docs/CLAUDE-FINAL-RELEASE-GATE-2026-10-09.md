# Final release gate, October 9, 2026

**Verdict: PASS for review. Not approved to deploy.**

The code is clean, tested and honest about what it does not know. Four things outside the code have to happen before it goes to `master`. They are listed under "Conditions".

- Branch: `claude/traction-2026-10-09`
- Code commit reviewed: `0452603`
- Base: `origin/master` at `ea436c0`
- Not pushed. Not deployed. No live form submitted. This worktree has no `.env.local`.

## Commands run on `0452603`

| Command | Result |
| --- | --- |
| `npm run lint` | Exit 0. 0 errors, 6 warnings. The 6 warnings are on master too and were out of scope |
| `npx tsc --noEmit` | Exit 0 |
| `npm test` | Exit 0. 926 tests passed in 70 files |
| `npm run build` | Exit 0. 342 static pages |
| `npm run build` with `NEXT_PUBLIC_SITE_URL` set to production and the lead endpoint set to a dead local address | Exit 0. Used for the crawl, so robots tags and canonicals match production |
| `node scripts/traction-crawl.mjs http://localhost:3111` | 253 pages. 189 indexable, 189 in the sitemap. 64 noindex. 0 errors, 0 redirect hops, 0 orphans |
| `node scripts/traction-similarity.mjs` | Exits 1 on purpose: town pages are below its 35% bar. That is the reason 19 of them are noindexed. Numbers are in the release report, section 6 |

## Reviewed as three people

### A compliance examiner

| Check | Result |
| --- | --- |
| Invented reviews, ratings, stars, counts | None. `GOOGLE_REVIEWS` is `null`, and the trust block renders a plain profile link. A test fails if a rating renders at a count of zero |
| License wording | `NC Life & Health`, from `AGENT.licenseLine`. No license number shown, because none is in the repo |
| CPA, CFP, fiduciary | Not stated or implied anywhere in the diff |
| Plan promises or steering | None. The checklist shows no plan, premium, rating or recommendation. Its priorities are a list for the visitor, with no scoring |
| "Coverage was checked" | Never implied. The page says twice that it does not show, compare or check plans. The printed sheet repeats it |
| Consent wording, privacy page, what is stored | Unchanged. No file under `app/privacy`, `app/api` or `lib/wealth/drops.ts` is in the diff |
| TPMO disclaimer | Present on the new checklist page through `ComplianceDisclosure variant="medicare"`. Not removed anywhere |
| Third-party facts | Two phone numbers, both read on their source page on October 9. Everything else Codex gathered was removed |
| Analytics payloads | Event name, page path, fixed labels. Nothing typed. Verified in the browser and by the allow-list test |

Flag for a human: the guide signup form now appears on two more page types. Its consent text is unchanged, and the unsubscribe promise in it is kept by hand.

### A skeptical 68-year-old

| Check | Result |
| --- | --- |
| Can I find the phone number | Header, hero and sticky bar on every Medicare page, at 390, 768 and 1440 px |
| Is anyone pretending | No stars, no "trusted by", no client counts |
| Is there someone who is not selling to me | Yes. Every `/medicare-in` page and the checklist point to SHIIP, with a number, and say plainly it is separate from Christian |
| Does the checklist waste my time | Four steps, everything optional, one printable page |
| Does it read like a machine wrote it | Repaired. Codex's town copy, checklist copy and tool intros were rewritten or restored |
| Em dashes | 0 in the rendered text of 253 pages. 0 in added visitor copy |

### A search-quality engineer

| Check | Result |
| --- | --- |
| Doorway pages | 59 near-duplicate town pages are `noindex, follow` and out of the sitemap. One generated town page remains indexed |
| Sitemap matches the index | 189 and 189 |
| Canonicals | Every indexable page has a self-referencing canonical on the production host |
| Redirects | `/wealth/calculators` returns 308 to `/tools`. No internal link passes through a redirect |
| Markdown duplicates | Out of the sitemap. Each returns `Link: <...>; rel="canonical"` to its HTML guide |
| Titles, descriptions, H1 | No duplicates among indexable pages. One H1 per page |
| Structured data | Parses on all 253 pages |
| Links added for readers or for quotas | For readers. One sentence per page, in the reading flow. A duplicated sentence was removed |
| Non-production builds indexable | No. A bug that would have let town pages override that rule was fixed |
| `llms.txt` and `llms-full.txt` | Updated with the sitemap. A test checks neither lists a noindexed town page |

## Screens

Sixteen changed routes at 390, 768 and 1440 px, measured in the browser: no sideways scroll, one trust block per page, tap targets at least 44 px, first tool input at 436 px on a 390 by 844 screen.

Screenshots were read at phone width for the checklist, the page close with the trust block, and at 1440 px for the header. The other routes and widths were checked by layout measurement, not by eye. The browser window was hidden for part of the session and would not draw.

Keyboard: the checklist was driven by Tab and Enter. Focus lands on each new step heading and the focus ring shows.

Not checked: a real screen reader, a real phone, print preview on paper.

## Issues found and fixed

Thirteen, all listed with reasons in [TRACTION-RELEASE-REPORT-2026-10-09.md](TRACTION-RELEASE-REPORT-2026-10-09.md), section 3. The ones that would have hurt most:

1. Twelve town pages replaced with filler. Restored.
2. Unverified local phone numbers and addresses. Removed.
3. Calls to SHIIP counted as leads. Fixed.
4. A robots tag that defeated the non-production indexing gate. Fixed.
5. A duplicated paragraph on three enrollment pages. Fixed.
6. Headline font silently altered. Restored.

## Not done

- T-13 as written. The kept town pages do not meet the plan's 35% bar. Nineteen are noindexed instead.
- T-09 fonts, and any Lighthouse before and after.
- T-02. It needs a decision, not code.
- T-14 and the T-12 experiment (P2, and no Search Console export exists).
- Homepage H1 change. It needs approval.

## Conditions before this goes to `master`

1. Christian reads the release report and accepts noindexing Winston-Salem, High Point and the rest for now.
2. Christian confirms the phone number in `lib/agent.ts` is the one he wants on the site.
3. The checklist page goes past the compliance contact.
4. A decision on the Meta Pixel, so the privacy page is true on the day this ships.

Then run DEPLOY-CHECKLIST.md as usual.
