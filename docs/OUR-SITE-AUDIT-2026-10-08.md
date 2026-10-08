# Our-site audit: christianbrinkleync.com (design/UX)

Date: 2026-10-08. Auditor: WORKER 2. Branch: design-benchmark-2026-10-08 (audit-fix commit 417434f).
Method: production build served locally, 16 full-page screenshots via CDP
(Page.captureScreenshot + Emulation.setDeviceMetricsOverride, desktop 1440px and mobile 390px),
plus viewport screenshots, a mobile menu interaction test, and throttled load timing
(~1.6 Mbps / 150 ms latency). Brutally honest by order.

Screenshot set: /tmp/shots/
- desktop-home.png, desktop-wealth.png, desktop-tools.png, desktop-ai.png,
  desktop-guides.png, desktop-wealth-roth-ira.png, desktop-tools-compound-interest.png,
  desktop-tools-budget.png (plus mobile-*.png counterparts)
- scrolled-desktop-home.png, scrolled-desktop-wealth.png (auto-scrolled first, so
  scroll-reveal sections are visible)
- vp-home-hero.png, vp-home-mid.png, vp-ci-hero.png, vp-ci-mid.png,
  vp-wealth-nav.png, vp-menu-open.png, vp-nav-1024.png (true viewport captures)

Note on method: naive full-page captures show blank bands where scroll-reveal
sections never triggered. Verified via auto-scroll captures that this is a capture
artifact, not a site bug. The reveal system (app/system.css `.js-reveal`) only hides
content after an inline script confirms JS can reveal it, so no-JS visitors and
crawlers see everything. Likewise the "blur band" and "sticky bar overlap" seen in
stitched mobile captures do not reproduce in true viewport screenshots.

## Scores (1-10, brutal)

| Dimension | Score | The specific weakness |
|---|---|---|
| Visual polish | 7 | Highs are real (homepage, /wealth are distinctive). Lows: /guides is a bare link list with no hero or cards and looks unfinished next to the rest (app/guides/page.tsx); /tools, /ai and every tool page reuse the identical dark-green ServiceHero + headshot template, monotonous across pages (app/components/ServiceHero.tsx); the two halves feel like two different sites (warm serif Medicare side vs lime neo-brutalist Wealth side) with no visual bridge. |
| Typography | 8 | Strong serif/sans pairing and scale. Deduct for a real rendered-text defect: "advice.Christian" with no space on every tool page (JSX multi-line whitespace gotcha in app/tools/_components/tool-footer.tsx, confirmed in built HTML). |
| Whitespace / rhythm | 6 | Homepage rhythm is good. Tool pages stack disclaimer + contact line + compliance disclosure into ~600px of gray legal text that kills momentum after the CTA; the disclaimer renders twice per page (see gap 1); /guides has no visual rhythm at all. |
| Mobile experience | 7 | Main-site mobile is excellent: sticky call pill, working hamburger with big serif targets (verified via click test), hide-on-scroll bottom CTA bar, calculators stack cleanly. Deduct: /wealth mobile header wraps nav into two rows of large links (~200px tall, no hamburger); see gap 4. |
| Navigation clarity | 6 | Desktop main nav carries 7 items + 2 CTAs (fits at 1440, collapses to hamburger by 1024, fine). Real problems: two separate nav systems with no cross-linking in headers, a /wealth visitor never discovers the Medicare side and vice versa (only tiny footer text links); "Learning Hub" vs "Guides" vs /wealth "Learn" are three labels for overlapping content. |
| Trust signals (E-E-A-T) | 7 | Strong: real headshot everywhere, bylines with updated dates, IRS sources cited on articles, "education not advice" disclaimers, license line, honest no-fake-testimonials stance. Weak: the reviews section shows EMPTY stars and zero reviews ("I'd rather earn reviews than write them"), which converts worse than competitors with embedded Google reviews; no third-party proof beyond his own claims. |
| Page speed feel | 8 | Throttled loads: / 1376ms (677KB, 73 requests), /wealth 625ms (75KB), /tools/compound-interest 417ms, /guides 314ms. Feels snappy. Deduct: homepage is by far the heaviest page (likely the 1200px headshot + fonts); 73 requests is high. |
| Interactivity | 9 | Best-in-class for a solo agent site: enrollment-window month picker, Part B penalty slider, 7-question plan-check quiz, 8 live calculators with sliders/charts/tables/copy-my-numbers, FAQ accordions, email capture on /wealth. Deduct: /guides and /ai are read-only text walls with no interactive element; /tools hub has no interactive element above the fold. |
| CTA design | 7 | Clear, human, well repeated: "Take the 90-second plan check", "Call (919) 408-6671", sticky mobile bar (Call Christian / Ask a question) with smart hide-on-scroll. Deduct: Medicare side is phone-or-quiz only, no low-friction email capture like /wealth has; "Talk it through with me" ghost button is visually weak next to the phone pill. |

Overall: 7.2. The highs (homepage, /wealth, calculators, article E-E-A-T) are genuinely
excellent and better than most solo-agent sites. The lows are fit-and-finish defects,
not architecture problems.

## Prioritized gap list

1. Duplicate education disclaimer on every tool page.
   What: "Results are estimates for education, not financial advice." renders twice per
   tool page (once mid-page, once near the footer).
   Where: app/tools/compound-interest/page.tsx:96 and :100 (same pattern in
   budget/page.tsx:98/:102 and the other five tool pages); the second copy comes from
   ToolClose in app/tools/_components/tool-footer.tsx.
   Competitor edge: NerdWallet-style calculator hubs show one concise disclosure, not two.
   Fix: delete the standalone `<ToolsDisclaimer />` from each tool page.tsx; keep the one
   inside ToolClose.

2. Missing space renders as "advice.Christian" on every tool page.
   What: the disclaimer reads "...not financial advice.Christian is a licensed..."
   Where: app/tools/_components/tool-footer.tsx ToolsDisclaimer. The source has a space,
   but the JSX multi-line whitespace trim drops it; confirmed in built HTML
   (.next/server/app/tools/budget.html) and live DOM via CDP.
   Competitor edge: basic copy QA; any competitor page passes this.
   Fix: put `{" "}` after `</strong>` or keep the sentence on one line; re-verify in
   built HTML, not source.

3. /guides is a bare link list.
   What: no hero, no cards, no visual hierarchy; two sections of plain links on cream.
   Where: app/guides/page.tsx.
   Competitor edge: every serious learn-hub (agent blogs, carrier education centers)
   uses card grids with descriptions.
   Fix: card grid reusing the t-hub-card pattern from /tools, grouped by the existing
   two sections, with the same short descriptions already written on the page.

4. /wealth mobile header has no hamburger; nav wraps to two rows.
   What: Calculators / Quizzes / Learn / Journey / Free tools stack into ~200px of large
   links above the fold on 390px.
   Where: the /wealth header (separate from the main-site nav).
   Competitor edge: standard hamburger pattern, which the main site already does well.
   Fix: hamburger under 768px mirroring the main-site menu behavior.

5. The two halves of the site do not link to each other.
   What: main-site header has no path to /wealth; /wealth header has no path to the
   Medicare side. Only tiny footer text links connect them.
   Where: both header components.
   Competitor edge: creators who run dual brands (e.g. Ramsey's ecosystem) cross-link
   prominently; here a /wealth reader never learns he is a licensed agent who takes calls.
   Fix: one header link each way ("Money guides" on main nav; "Medicare help" on /wealth nav).

6. Reviews section shows empty stars and zero reviews.
   What: "I'd rather earn reviews than write them." with five empty star outlines.
   Where: homepage reviews section.
   Competitor edge: top local agents embed live Google reviews with star counts.
   Fix: keep the honest framing, but replace empty stars with a Google profile card/link;
   embed the review widget the moment real reviews exist. Empty stars read as "no one
   reviewed him" at a glance.

7. ServiceHero template repeats identically across /tools, /ai, and all 8 tool pages.
   What: same dark-green band, same headshot, same proof checklist, same two buttons.
   Where: app/components/ServiceHero.tsx and its callers.
   Competitor edge: best calculator hubs put the tool above the fold, not a brand band.
   Fix: on tool pages, try a compact hero or lead with the calculator itself; vary /ai
   with an informational hero (no phone CTA already exists via hidePhoneCta, go further).

8. Three names for the same content: "Learning Hub" vs "Guides" (main nav) vs "Learn"
   (/wealth nav).
   What: visitors cannot tell these apart; they overlap heavily.
   Where: main header nav, /wealth header nav.
   Competitor edge: single "Learn" or "Guides" label, standard IA.
   Fix: pick one name ("Guides") and use it in both headers.

9. Homepage is the heaviest page by far: 677KB / 73 requests.
   What: 5-9x the weight of /wealth (75KB) and the tool pages (~110KB).
   Where: homepage, likely the 1200x1600 headshot (next/image sizes look right, but
   verify AVIF/WebP delivery) plus font and script requests.
   Competitor edge: sub-second LCP on mid-tier mobile is table stakes for local SEO.
   Fix: audit the 73 requests, confirm modern image formats, consider trimming
   below-fold embeds on first paint.

10. No low-friction conversion path on the Medicare side.
    What: every CTA is "call now" or "take the quiz". /wealth has email capture
    ("Get the next tool the day it drops"); the Medicare side has nothing equivalent.
    Where: /tools hub, article/guide pages.
    Competitor edge: agent sites with guide-download/newsletter capture convert
    researchers who are not ready to call.
    Fix: port the /wealth email capture component to /tools and guide pages
    ("Get the next guide by email").

## Verified non-issues (do not "fix")

- Blank bands in naive full-page screenshots: scroll-reveal capture artifact only.
  The js-reveal system degrades gracefully (content visible with no JS).
- Blurred band over the mobile compound-interest hero and the sticky-bar/content
  overlap in stitched captures: full-page capture artifacts. True viewport screenshots
  (vp-ci-hero, vp-home-mid) render cleanly.
- Mobile hamburger menu: works (verified via CDP click; menu opens with large targets).
- Header crowding at 1024px: none, the main nav collapses to hamburger gracefully.
