# Information architecture decision, October 9, 2026

Internal document. Evidence comes from the live crawl and the repo at `ea436c0` described in [TRACTION-MASTER-PLAN-2026-10-09.md](TRACTION-MASTER-PLAN-2026-10-09.md). No Search Console or Analytics data was available, so every "reduce" or "noindex" recommendation here is reversible, and none is a redirect unless stated.

## 1. The primary promise

**Root site: "Medicare help in Greensboro and the Triad, from one local licensed agent you can call."**

Why:

- CLAUDE.md states the job of the site: turning people approaching 65 in the Piedmont Triad into Medicare conversations.
- The only measured conversions are Medicare ones (phone taps, requests, plan check).
- The site's real advantage over every competitor inspected is a named, reachable local person. That advantage applies to Medicare. It does not apply to a Roth IRA explainer read in another state.

What changes:

- The homepage H1 reads "Medicare and money, explained by someone who lives here," with the eyebrow "Medicare, Taxes & Retirement." Recommend returning the H1 and eyebrow to Medicare and local help, and giving money education one clearly labelled section lower on the page that links to `/wealth`. Copy is Christian's to approve under CONTENT-VOICE.md.
- The `<title>` already says "Medicare Help in Greensboro | Christian Brinkley." Keep it.

## 2. Two lanes

| | Medicare lane | Money lane |
| --- | --- | --- |
| Audience | People near 65, people on Medicare, and their families, in the Triad and Granville County | Anyone, anywhere, mostly younger, learning money basics and tax rules |
| Promise | A local person helps you with Medicare at no cost | Plain-English money education and free tools |
| Front door | `/` | `/wealth` |
| Voice | TRUST voice | PUNCH voice on `/wealth`; neutral explainer voice on `/guides` and `/tools` |
| Primary action | Call, plan check, ask a question, book | Use a tool, read the next guide, sign up for new guides |
| Phone and sticky call bar | Yes | No on `/wealth` (already true). **Open question** for `/guides` money pages and `/tools`: see section 6 |
| Counted as success | `phone_click`, `generate_lead`, `booking_confirmed`, attended appointment | `tool_complete`, `guide_signup` |

One cross-link each way, in the header: "Money guides" from the Medicare lane to `/wealth`, and "Medicare help" from the money lane to `/`. The second already exists in `lib/wealth/site.ts`.

## 3. Role of each section

| Section | Indexable pages | Lane | Decision | Reason |
| --- | --- | --- | --- | --- |
| `/` and Medicare service pages (`/turning-65`, `/annual-enrollment`, `/aep`, `/anoc`, `/special-enrollment`, `/part-b-penalty`, `/keep-my-doctor`, `/helping-a-parent`, `/irmaa-appeal`, cost and numbers pages) | about 30 | Medicare | **Keep, primary** | Core of the promise |
| `/learn` | 1 hub | Medicare | **Keep as the single Medicare guides hub.** Nav label: "Medicare guides" | It already lists answers, glossary and checklists |
| `/answers` and `/answers/*` | 11 | Medicare | **Keep URLs. Remove from top-level menus.** Reached through `/learn` | It is the article store behind `/learn`. Two menu entries for one library confuse the label |
| `/medicare-words` | 1 | Medicare | Keep, under `/learn` | Glossary with sources |
| `/ask` and `/ask/*` | 6 | Mixed | **Keep, secondary.** Footer and `/learn` only | Real questions are valuable, but four of the five answered pages are money topics with a single inbound link each |
| `/guides` and `/guides/*` | 47 | Mixed today | **Keep URLs. Split the hub by lane.** Medicare and Social Security guides are listed on `/learn`. Money and tax guides are listed on the `/wealth` hub. `/guides` stays as an index of both, grouped under two headings | The folder holds both lanes. Moving URLs would cost redirects for no reader benefit |
| `/taxes-and-retirement` and `/taxes-and-retirement/*` | 4 | Bridge | **Keep. Remove from the main nav.** Link from `/learn` (for retirees) and `/wealth` (for savers) | Three articles do not justify a top-level label |
| `/wealth`, `/wealth/*` | 50 | Money | **Keep as the money front door.** One nav: Tools, Guides, Quizzes, Journey | See below for sub-decisions |
| `/wealth/learn` and `/wealth/learn/*` | 1 hub plus articles | Money | **Keep as the single money guides hub.** Label: "Guides" | Already labelled "Guides" in the wealth nav |
| `/wealth/calculators` | 1 | Money | **Redirect (308) to `/tools`.** | 183 words, and every calculator link on it already redirects to `/tools/*`. It is a page whose only job is to forward |
| `/wealth/tools` | 1 | Money | **Keep, rename the nav label to "Downloads"** or fold into `/tools` as a section | "Free tools" next to "Calculators" next to `/tools` is three names for nearly the same thing |
| `/tools` and `/tools/*` | 13 | Money, with two Medicare-relevant quizzes | **Keep as the one tools hub.** Linked from both lanes | Standalone calculators are the strongest useful-action asset |
| `/ai` and `/ai/*` | 9 | Neither | **Reduce prominence.** Out of the header menu, footer link only. Stay indexed. No new pages | Off both promises. No evidence it brings Medicare or money readers. Removing it would discard finished work for no gain, so demote and watch the data |
| `/links` | 1 | Utility | Keep, set `noindex` | 120 words, a link-in-bio page |
| `/plan`, `/medicare`, `/roth-window`, `/numbers`, `/medicare-costs`, `/medicare-costs-2026`, `/medicare-numbers-2027` | 7 | Medicare | **Review for overlap before touching.** Not decided here | These look like overlapping tools and yearly figure pages. They were not compared line by line in this session. Decide with Search Console data (ticket T-12 covers the method) |
| `/aep`, `/annual-enrollment`, `/medicare-annual-enrollment-2026-checklist` | 3 | Medicare | **Review for overlap before touching.** Same caution | Same |
| `/medicare-in/*`, `/retirement-in/*`, `/life-insurance-in/*`, `/medicare-*-nc` | 71 | Medicare | See section 5 | |

## 4. Navigation

### 4.1 Today [code] `app/components/TopRouteChrome.tsx`

Primary: Turning 65, On Medicare, Medicare guides (`/learn`), Money & tax guides (`/guides`), Money guides (`/wealth/learn`), Taxes & Retirement, Wealth, About.

Menu extras: Plan check quiz, Medicare questions answered (`/answers`), Ask Christian, Towns I serve, AI guides, Ask a question.

Five of eight primary items are education labels, three of them contain the word "guides," and "Ask Christian" (`/ask`) sits beside "Ask a question" (`/start`).

The October 8 audit asked for one name. Since then the count went from three names to five.

### 4.2 Decided

**Medicare lane header (5 items plus the two existing buttons):**

| Label | Target |
| --- | --- |
| Turning 65 | `/turning-65` |
| Already on Medicare | `/annual-enrollment` |
| Medicare guides | `/learn` |
| Towns I serve | `/service-area` |
| About | `/about` |
| *(quiet link, right side)* Money guides | `/wealth` |
| *(button)* Plan check | `/plan-check` |
| *(button)* Call | `tel:` |

**Menu sheet extras:** Ask a question (`/start`), Free tools (`/tools`).

**Money lane header** [code] `lib/wealth/site.ts`: Tools (`/tools`), Guides (`/wealth/learn`), Quizzes (`/wealth/quiz`), Journey (`/wealth/journey`), and the quiet link "Medicare help" (`/`). At 768 px the nav must not wrap to a second row (it is 116 px tall today).

**Footer** carries everything demoted: Medicare questions answered, Ask Christian, Taxes and retirement, AI guides, glossary, privacy.

### 4.3 Label rules

- "Guides" appears once per header.
- `/ask` is always "Questions people asked." `/start` is always "Ask a question."
- "Tools" means `/tools`. Nothing else is called tools in a header.

## 5. Town pages, page by page

Rule applied: a town page stays in the index only if it gives a resident something they could not get from the page for the next town over. Measured as words not shared with any sibling page (method in the master plan, section 1.2).

### 5.1 Hand-written pages: keep all 11

| Page | Words | Unique share | Decision |
| --- | --- | --- | --- |
| `/medicare-creedmoor-nc` | 848 | 57% | **Keep** |
| `/medicare-asheboro-nc` | 1,052 | 54% | **Keep** |
| `/medicare-oxford-nc` | 1,080 | 50% | **Keep** |
| `/medicare-mebane-nc` | 1,083 | 46% | **Keep** |
| `/medicare-madison-nc` | 1,116 | 45% | **Keep** |
| `/medicare-eden-nc` | 1,170 | 44% | **Keep** |
| `/medicare-roxboro-nc` | 1,146 | 44% | **Keep** |
| `/medicare-butner-nc` | 1,153 | 31% | **Keep, rewrite** the shared sections (41% similar to Ramseur) |
| `/medicare-graham-nc` | 1,168 | 27% | **Keep, rewrite** (53% similar to Liberty) |
| `/medicare-ramseur-nc` | 1,179 | 25% | **Keep, rewrite** (51% similar to Liberty) |
| `/medicare-liberty-nc` | 1,151 | 22% | **Keep, rewrite** |

Seven of these have only one or two inbound links, all from `/medicare-nc-towns` or a neighbor. Add them to `/service-area` (ticket T-04).

### 5.2 `/medicare-in/{town}`: keep 3, rewrite 5, noindex 12

| Page | Unique share | Unique words (approx.) | Decision |
| --- | --- | --- | --- |
| `/medicare-in/greensboro` | 21% | 181 | **Keep.** Home city, strongest page in the family. Add local facts (T-13) |
| `/medicare-in/winston-salem` | 18% | 157 | **Keep.** Add local facts |
| `/medicare-in/high-point` | 9% | 87 | **Keep, rewrite first.** Third hub city, but the page is 72% similar to Stokesdale |
| `/medicare-in/kernersville` | 11% | 92 | **Rewrite, then keep.** On the `HIGH_INTENT_SLUGS` list in `lib/triad.ts` |
| `/medicare-in/burlington` | 7% | 53 | **Rewrite, then keep.** Alamance County seat, 84% similar to Elon today |
| `/medicare-in/summerfield` | 8% | 67 | **Rewrite, then keep** (high-intent list) |
| `/medicare-in/jamestown` | 7% | 57 | **Rewrite, then keep** (high-intent list) |
| `/medicare-in/stokesdale` | 5% | 38 | **Rewrite, then keep** (high-intent list) |
| `/medicare-in/reidsville` | 12% | 93 | **Noindex until rewritten.** Rockingham County seat, so the best candidate to bring back |
| `/medicare-in/randleman` | 9% | 69 | **Noindex until rewritten** |
| `/medicare-in/gibsonville` | 9% | 75 | **Noindex until rewritten** |
| `/medicare-in/thomasville` | 8% | 63 | **Noindex until rewritten** |
| `/medicare-in/mcleansville` | 7% | 56 | **Noindex, consolidate** into the Greensboro page's "nearby" section |
| `/medicare-in/colfax` | 7% | 56 | **Noindex, consolidate** into Greensboro or Kernersville |
| `/medicare-in/oak-ridge` | 6% | 49 | **Noindex, consolidate** into Summerfield (85% similar to Browns Summit) |
| `/medicare-in/archdale` | 6% | 49 | **Noindex, consolidate** into High Point |
| `/medicare-in/pleasant-garden` | 6% | 46 | **Noindex, consolidate** into Greensboro |
| `/medicare-in/browns-summit` | 5% | 40 | **Noindex, consolidate** into Greensboro |
| `/medicare-in/elon` | 5% | 40 | **Noindex, consolidate** into Burlington |
| `/medicare-in/whitsett` | 4% | 34 | **Noindex, consolidate** into Burlington or Gibsonville |

"Rewrite, then keep" pages stay indexed while the rewrite is scheduled, because they are on the list the repo already flags as searched. If the rewrite (T-13) has not shipped in 30 days, noindex them too.

"Noindex" here means `robots: noindex, follow`, removed from the sitemap, URL still works, still linked from `/service-area`. A visitor from Whitsett still finds a page that names their town. Search engines stop seeing twelve copies.

### 5.3 `/retirement-in/{town}`: noindex all 20

Unique share 1% to 11%. Sixteen pages have under 40 unique words. Winston-Salem is the highest at 11% (about 71 words).

Decision for all twenty (Greensboro, High Point, Winston-Salem, Kernersville, Summerfield, Jamestown, Oak Ridge, Archdale, Thomasville, Pleasant Garden, Whitsett, McLeansville, Browns Summit, Gibsonville, Elon, Burlington, Stokesdale, Colfax, Reidsville, Randleman): **noindex, follow, remove from sitemap.** The service page `/retirement-income` already carries the offer. Christian is a licensed insurance agent, not a planner, so twenty local "retirement" landing pages also stretch the positioning in CONTENT-VOICE.md.

After 28 days, with Search Console access: any page with clicks is a candidate to rewrite and restore. Pages with none get a 308 to `/retirement-income`.

### 5.4 `/life-insurance-in/{town}`: noindex all 20

Unique share 2% to 11%. Same twenty towns, same decision: **noindex, follow, remove from sitemap.** `/life-insurance` carries the offer. Same 28-day review.

### 5.5 What "local usefulness" means for a rewrite (T-13)

A kept town page must contain at least four of these, each true for that town and each linked to its public source:

1. The Social Security office that serves the town, with its address.
2. The county's SHIIP counseling site (free, unbiased Medicare counseling) and how to reach it.
3. The hospital systems residents actually use, which the pages already name.
4. The senior center or public library where Christian can meet, by name.
5. The county, and for towns on a county line, why the county matters for Medicare Advantage availability.
6. Anything Christian has actually done there (a talk given, a standing meeting place). Only if true.

Not allowed: invented neighborhoods, invented office locations, client counts, "most people in [town] choose," plan names, premiums.

No new town pages. Never a thin page for a town where none of the above can be written.

## 6. Open questions for Christian

1. **TPMO disclaimer and call bar on money pages.** The Roth IRA guide today shows the Medicare TPMO disclaimer and the sticky "Call Christian" bar [crawl]. The disclaimer may be there on purpose because the page links to Medicare help. This plan does **not** recommend removing it. Ask the compliance contact whether it is required on pages with no Medicare content. Until answered, leave it.
2. **Homepage H1.** Approve returning it to Medicare and local help.
3. **Age on `/wealth`.** The wealth hub H1 says "I'm 21 and licensed." The October 5 doc recorded that the site did not state his age and asked for a decision. It is now public on `/wealth` and absent on the Medicare side. Confirm that split is intended.
4. **`/ai`.** Confirm demoting it to the footer.

## 7. Redirects and removals in this decision

Only one redirect: `/wealth/calculators` to `/tools` (308).

No page is deleted. No URL in the Medicare lane changes. Everything else is labels, menus, `noindex`, and sitemap membership, all reversible in one commit.

## 8. Addendum after implementation review, October 9, 2026

Section 5.2 kept eight `/medicare-in` pages in the index for 30 days while a rewrite (T-13) was scheduled. The rewrite that was produced replaced the pages with padded, weakly sourced filler and was rejected in review. Measured on the branch build, seven of the eight are 6% to 14% unique and Summerfield and Stokesdale are 79% alike.

Decision now in the code: only `/medicare-in/greensboro` is indexable. The other 19 carry `noindex, follow`, stay online, and stay linked from `/service-area`. Restoring a town is one slug in `INDEXABLE_MEDICARE_SLUGS` in `lib/triad.ts`, and should follow a rewrite built on what Christian knows about that town.

Section 5.1 is unchanged: all 11 hand-written pages stay indexed. Butner, Graham, Ramseur and Liberty were restored to their master text.

Section 4.2 is implemented as written. The homepage H1 was not changed and still needs approval.
