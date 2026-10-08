# Pre-Deploy Audit: christianbrinkleync.com — 2026-10-08

Christian's order: **no deploy until we are 100% certain the site cannot be better** — more professional, more complete, fully optimized for SEO and AI search across every category.

Five specialists audited local master (unpushed commit 23a04e8) plus the unmerged Codex branch (origin/traffic-mission-2026-10-08, commit 3563a49). Nothing was merged, pushed, or deployed.

## Honest verdict: NOT at "cannot be better" yet

The site is in genuinely good shape — no broken pages, no invented statistics, no em dashes in visible copy, no broken links or images, clean schema coverage, working tools, disclosures everywhere. The remaining gaps are real but bounded: roughly one focused work session to fix, then a re-verify, then deploy. The punch list below is the complete gap.

---

## P0 — Blocks deploy (2 items)

### P0-1. 32 page titles exceed 60 characters (will truncate in SERPs)
Google rewrites truncated titles, and several AEP money pages are affected. Recurring patterns, fixable in bulk:

- **City pages** (`app/medicare-{asheboro,ramseur,liberty,oxford,mebane,graham,butner}-nc/page.tsx`, 63-65 chars): drop `| Free Reviews` → e.g. `Medicare Help in Asheboro, NC | Christian Brinkley` (49).
- **Wealth pages** (9 titles): the 22-char `| christianbuildswealth` suffix pushes them over (e.g. `app/wealth/page.tsx` 81 chars, `app/wealth/calculators/roth-vs-traditional/page.tsx` 82). Shorten the base, e.g. `Money tools for your 20s | christianbuildswealth`.
- **AI pages** (7 titles): the `| Christian Brinkley` suffix pushes them over (e.g. `app/ai/ai-tools-compared/page.tsx` 76). Shorten the base.
- **Worst offenders:** `app/retirement-income/page.tsx` (92) → `Retirement Planning Help in Greensboro & the Triad` (50); `app/part-b-penalty/page.tsx` (90); `app/medicare-advantage-doctor-networks/page.tsx` (89); `app/aep/page.tsx` (80) → `Medicare Annual Enrollment 2027 | Free Review in Greensboro` (56).
- Full list of 32 files with char counts is in the SEO worker's report (kept in session, ask for the file-by-file table if needed).

Fix: shorten each to ≤60 chars, keyword front-loaded. Why it matters: titles are the single highest-leverage on-page SEO element, and Christian wants to outrank everyone.

### P0-2. `/privacy` is indexable but missing from sitemap.xml
The only indexable page absent from the sitemap. Fix: add `{ path: "/privacy", changeFrequency: "monthly", priority: 0.5 }` to `STATIC_ROUTES` in `app/sitemap.ts`. (The other 8 sitemap gaps — `/lp/*`, `/thank-you`, `/review`, `/review/card`, `/remind-me`, `/schedule`, `/start`, `/unsubscribe` — are correctly noindexed and should stay out.)

---

## P1 — Should fix before deploy (7 items)

### P1-1. The 10 `/guides` pages are navigation orphans (local master)
Zero inbound links from any hub, nav, or page. No `/guides` index, absent from header nav (`TopRouteChrome`), footer, and `/learn`. Discovery depends entirely on sitemap indexing. **Note:** the Codex branch adds a `/guides` index hub, so merging it fixes half of this — but nav/footer/`/learn` links still need adding after merge.

### P1-2. Duplicate calculators under two URL systems split ranking signals
`/wealth/calculators/compound-interest` vs `/tools/compound-interest`; `/wealth/calculators/debt-payoff` vs `/tools/debt-payoff`; `/wealth/calculators/roth-vs-traditional` vs `/tools/roth-vs-traditional`. Both sets are in the sitemap and linked from live pages (`ToolGrid` in `lib/wealth/site.ts` points at the old set). Fix: pick `/tools/*` as canonical (newer system, MathSection + ToolClose), add canonical tags or server redirects from the losers, repoint `WEALTH_TOOLS` links.

### P1-3. Tool count is 7, not 8
Docs and MEMORY.md say 8 tools; the site has 7. The obvious 8th is a budget tool (old `/wealth/calculators/budget` has no `/tools` equivalent). Fix: build `/tools/budget` or correct the count in MEMORY.md. (A budget tool also fills a real keyword gap.)

### P1-4. 20 meta descriptions exceed 160 characters (will truncate)
Worst: `app/medicare-costs-2026/page.tsx` (282), `app/medicare-creedmoor-nc/page.tsx` (228), `app/tools/page.tsx` (222). Trim each to 150-160, CTA/keyword in the first 120. Full 20-file list in the SEO report.

### P1-5. Production deindex risk in `app/robots.ts`
`SITE_INDEXABLE` (`lib/seo.ts:92`) requires `NEXT_PUBLIC_SITE_URL` + TPMO marketing vars + lead-capture vars all set; if any is missing in production, robots.txt becomes `Disallow: /` for every crawler — the entire site vanishes from Google. Fix: verify those env vars in the production deployment before/after deploy. Add to the deploy checklist permanently.

### P1-6. `/llms.txt` omits all three live 2027 pages
`app/llms.txt/route.ts` has no 2027 section — the compact index most AI crawlers prefer never mentions `/medicare-numbers-2027`, `/medicare-changes-2027`, or `/medicare-part-d-donut-hole-2027`. Fix: add a `## 2027 figures` section mirroring llms-full.txt (Part D $700 deductible / $2,400 cap final; MA avg ~$12; Part B ~$209.50 projected).

### P1-7. RMD page omits the age-75 rule
`app/wealth/rmd-explained-73/page.tsx` says RMDs begin at 73 for 1951-1959 births but never states that 1960+ births have RMD age 75 under SECURE 2.0. A 1960-born reader gets the wrong takeaway. Fix: one sentence — "Born in 1960 or later? Your RMD age is 75 under SECURE 2.0."

---

## P2 — Nice to have (10 items)

1. **Em dashes in code comments only** (25 files, e.g. `app/globals.css:17`, `app/api/capture-lead/route.ts:167`). Invisible to visitors, but the owner's rule is zero em dashes anywhere. One-pass sed on comment lines, then typecheck.
2. **`.w-demo-big` headroom** (`app/wealth/wealth.css:1202`): `clamp(2.8rem, 14vw, 4.4rem)` fits 9-char figures at 390px but clips ~11+ chars (e.g. `$12,345,678`). Add `overflow-wrap:anywhere` or cap at `12vw`.
3. **Twelve thin wealth articles** (~300-390 words): tax-brackets-explained-plainly, emergency-fund-guide, first-tax-return-guide, health-insurance-basics, disability-insurance-explained, broke-money-reset-plan, student-loans-payoff-plan, pre-retirement-5-year-checklist, roth-vs-traditional-taxes, credit-score-basics, life-insurance-explained, 401k-explained. Expand the thinnest 5-6 with one more section + worked example each.
4. **`/wealth/learn` (6 old articles) not linked from the `/wealth` hub.** Add a Learn section to the hub or migrate the 6 articles into the new template.
5. **`/ai` child pages are short** (~300-380 words each). Complete (FAQ, SiblingNav, CTA) but thin. Expand opportunistically.
6. **Guides lack a uniform related-guides block.** Add a standard related-guides footer once the `/guides` hub exists (P1-1).
7. **Codex branch:** `/guides/page.tsx` hardcodes titles for the 10 pre-existing static guides instead of deriving from data — future renames will silently drift the index.
8. **Codex branch:** two content models coexist (10 old static guide dirs vs. 10 new data-driven guides). Fine now; flag for future batches.
9. **Codex branch TPMO watch:** the Triad nonrenewal guide pairs the Medicare nonrenewal SEP window with a "request an insurance conversation" CTA. It carries the TPMO disclosure, names no plans/carriers, no dollars, no benefit claims — within standing boundaries — but consider confirming with the upline given enrollment-season sensitivity.
10. **Link-rot check:** ~19 IRS/Medicare source URLs in the Codex guides could not be live-checked (tests only whitelist hostnames). Run a link check before merge.

Minor: RMD page has an unlinked source label (SECURE 2.0 entry with no href); AI comparison page says Claude free tier has no web search — it now does, soften the claim; `host:` directive in robots.ts is deprecated (harmless).

---

## Codex branch review (origin/traffic-mission-2026-10-08, commit 3563a49)

**All 10 guides ship-ready.** Verified per guide: educational-only disclosure rendered, every number a real published figure with primary-source links (OBBBA overtime/tips caps, $400 SE threshold, 10% W-4V withholding, 20% rollover withholding + 60-day deadline, SECURE Act 10-year rule with pre/post-RBD distinction, nonrenewal SEP Dec 8-Feb end), zero em dashes, human voice, per-guide metadata (title <60, description <155, canonical + OG), Article + BreadcrumbList + FAQPage JSON-LD with FAQs matching visible content, all 10 linked from the new `/guides` index + sitemap + both llms indexes, all cross-link hrefs resolve.

- `tsc --noEmit`: clean. `vitest`: 681/681 pass across 47 files.
- Scope is clean: 10 guides + `/guides` index + cross-link wiring + sitemap/llms + docs + tests. One adjacent-but-justified edit: `app/guides/missed-medicare-enrollment/page.tsx` corrects the obsolete July 1 GEP coverage start (now "the month after you sign up," source-linked) — confirm it's intended in the merge since it touches an already-deployed page.
- **Conflict risk with local master: NONE.** Unpushed commit 23a04e8 touches only `app/components/MainContent.tsx` and `app/layout.tsx`; the branch touches neither.
- The playbook docs are honest about evidence limits ("Selection is qualitative. No search-volume data... available").

---

## What was verified clean (no action)

- **Copy:** zero em dashes in rendered copy (comment-stripped grep across all of `app/`); zero AI-telltale phrasing against the CONTENT-VOICE banned list; human voice confirmed by sampling.
- **Facts:** no invented statistics found. Every precise figure spot-checked traces to real 2026 announcements (CMS fact sheets, IRS notices/revenue procedures, SSA COLA fact sheet); projections labeled as projections. Full verification table: 2026 Medicare (Part B $202.90, deductible $283, IRMAA tiers), 2027 Part D ($700 deductible / $2,400 cap final), 2026 IRS (401k $24,500, IRA $7,500, brackets, standard deduction, $6,000 senior bonus deduction), HSA 2026, SSA 2026 (wage base $184,500), 529-to-Roth $35k cap.
- **SEO foundations:** all 135 pages have unique metadata; canonicals correct; Article + FAQPage + BreadcrumbList on all articles/guides/city pages; one H1 per page, no skipped levels; no zero-internal-link article pages; sitemap emits 216 URLs (the "200 routes" claim is fine — the 9-route gap is correctly-excluded noindex pages).
- **AI search:** speakable schema verified on exactly the claimed 10 pages with all selectors present in markup; answer boxes on 8/8 sampled pages ("Short answer" / "In short" / "The short version"); FAQ schema matches visible FAQs by construction; llms.txt/llms-full.txt inventory resolves (54/54 paths); TPMO disclaimer in both llms files; llms.txt states "licensed insurance agent, not a CPA, CFP, or registered investment adviser"; zero carrier/plan mentions anywhere.
- **Completeness:** /wealth 28/28 articles, /tools 7/7 real working tools (spot-checked math: real 2026 bracket tables, NC/FICA logic), /ai hub + 7/7 children, /guides 10/10, all 5 Medicare keyword-battle pages + 4 city pages + /medicare-numbers-2027 + /turning-65-checklist substantive; every page ends in a working CTA; no placeholders, no lorem, no TODOs.
- **Professionalism:** consistent typography (Atkinson Hyperlegible + Fraunces), shared layouts everywhere, no stray pages, mobile structure sound at 390px by static analysis (44px targets, no clipping widths, tables scroll intentionally). Caveat: headless screenshot is broken in this Chromium build, so mobile was verified structurally, not pixel-rendered — a live-browser 390px pass is the one verification not yet done.

---

## Recommended path to deploy

1. Fix P0-1 (32 titles) and P0-2 (/privacy in sitemap). Bulk-editable patterns.
2. Fix P1 items (guides hub/nav wiring, canonicalize duplicate calculators, trim 20 descriptions, verify prod env vars for robots.ts, llms.txt 2027 section, RMD age-75 sentence).
3. Decide the 8th tool (build `/tools/budget` or correct the count).
4. Merge Codex branch (clean, no conflicts), run link-rot check on its ~19 source URLs.
5. Re-run typecheck + full test suite + this audit's P0/P1 checks.
6. One live-browser 390px visual pass (the single unverified item).
7. Then deploy — batched, per the deploy-maximization rule.

**Bottom line:** the site is close. The gap is one focused fix session plus re-verification, not a rebuild. Nothing here suggests the site is fundamentally unready — but Christian's bar is "cannot be better," and the 32 truncated titles plus the orphaned guides and the robots.ts deindex risk mean it is not there yet.
