# Design Benchmark: christianbrinkleync.com vs top-tier sites
Date: 2026-10-08. Worker 1 (benchmark research) + Worker 1b (completion pass). Read-only research, no logins, no repo changes.

## What actually got captured (evidence status)

- VERIFIED FRESH: NerdWallet homepage, desktop 1440px, captured 2026-10-08 via CDP full-page screenshot. Real page, not a bot wall. File: `docs/benchmark-screenshots/nerdwallet-home-desktop.png`.
- VERIFIED FRESH (Worker 1b, same day): Bankrate homepage (desktop full-page + 3 mobile viewport shots), Bankrate mortgage calculator page (desktop full-page + 3 mobile viewport shots), Calculator.net retirement calculator (desktop full-page + 3 mobile viewport shots), Investor.gov compound interest calculator (desktop full-page + 2 mobile viewport shots), Medicare.gov homepage (desktop full-page + 2 mobile viewport shots). All captured via headless Chromium + CDP through a CONNECT relay to the egress proxy, with `--ignore-certificate-errors` (the sandbox egress proxy terminates TLS). Mobile captures are viewport-only stacked shots, per the crash lesson.
- BLOCKED: Investopedia (homepage + Roth IRA article) served Dotdash Meredith's bot wall on two separate attempts ("If you are a reader experiencing an access issue, please contact support@people.inc"). Investopedia scores below stay PROVISIONAL, based on prior knowledge, clearly marked.
- Capture notes worth knowing: Bankrate's mortgage calculator widget sits behind a "Consumer Health Data Collection" consent modal and showed "Loading calculator..." at capture time, a first-visit UX wrinkle worth noting. The guessed retirement-calculator URL 404'd (charming piggy-bank 404 page captured as evidence); the mortgage calculator at /mortgages/mortgage-calculator/ is the verified page. Medicare.gov's desktop hero image failed to load in the capture but all content and CTAs rendered.

## Scoring rubric (1-10 per dimension)

Dimensions: visual polish, typography, whitespace/rhythm, mobile experience, navigation clarity, trust signals (E-E-A-T), page speed feel, interactivity, CTA design.

## NerdWallet (verified from today's screenshot)

Homepage, desktop. The real page is a masterclass in conversion-oriented editorial design.

- Visual polish: 9. One cohesive green brand system across hero, cards, bands, and footer. Rounded corners, soft tinted section bands, professional lifestyle photography, consistent shadows. The lime ticker strip ("LET THE NERDS DO THE WORK") adds energy without cheapening it. Point off only because the ad slot ("AD" badge on the cash-account promo) is visually indistinguishable from editorial content at a glance.
- Typography: 8. Big confident section headlines, tight title/body hierarchy, readable card text. Some body copy runs small, but nothing his 50+ audience would find hostile except the footer fine print, which is a wall of 8px disclosure text (legally required, but ugly).
- Whitespace/rhythm: 9. Alternating white and pale-green bands give the very long page a drumbeat. Every section gets one job and enough air. This is the single best thing about the page.
- Mobile experience: not verified today (capture crashed before mobile). Provisional: historically strong, 7-8 range, single-column cards, sticky nav.
- Navigation clarity: 9. Top nav names 9 money topics in plain words (Credit cards, Banking, Home, Loans, Insurance, Personal finance, Investing, Small business, Taxes). Below the hero, a 10-tile category grid where every tile has a title, a one-line descriptor, and a top-right arrow. A lost visitor cannot stay lost.
- Trust signals (E-E-A-T): 10. The "Why millions trust NerdWallet" band stacks three proof layers: big numbers (10M+ financial decisions made, 15,000+ in-depth resources, 100+ experts), partner logos (SoFi, Progressive, American Express, Rocket Mortgage), then app-store proof (4.8 stars, 100k 5-star ratings, 7m downloads) with dated review quotes, then a footer carrying NMLS IDs, state license numbers, and editorial-team links. This is the benchmark for his site's trust section.
- Page speed feel: 7 (provisional). Visually rich pages with carousels and ad slots; fine on desktop, heavier than it looks.
- Interactivity: 8. "Nerd AI" ask-box in the hero, a swipeable news carousel with arrows and dots, Banking/Mortgages rate tabs, hoverable cards. The page feels alive without feeling busy.
- CTA design: 9. Dark-green pill buttons with white text ("UNLOCK 3.9% TODAY", "BEST CASH BACK CARDS") repeated in context, always one clear action per section. Secondary links are quiet green underlines that never compete.

NerdWallet overall: 8.6/10 (verified desktop homepage). The site to beat on trust signals and section rhythm.

## Bankrate (verified from today's screenshots: homepage desktop full-page + 3 mobile, mortgage calculator desktop + 3 mobile)

Homepage, desktop and mobile. Bankrate is running a fresh 2026 redesign: bold serif display type, navy/blue system, hand-drawn accent marks (circles, underlines), and a confident challenger voice.

- Visual polish: 9. The new brand system is genuinely distinctive: giant serif hero ("9 out of 10 homebuyers overpay for their mortgage. You don't have to."), blue brush underline, dark navy hero band, cream sections, playful illustration (even the 404 page has a bandaged piggy bank). Feels designed, not templated.
- Typography: 9. Serif display headlines with a clean sans body, excellent size contrast between sections. The hand-drawn blue circle/underline accents on key words give it a human editorial voice.
- Whitespace/rhythm: 8. Alternating cream and dark-navy bands, stat cards, a 3-card "What's your next step?" grid, then "Why Bankrate", research, press, and footer. Long page but never monotonous.
- Mobile experience: 9 (verified). Single-column stack, huge touch targets, stat cards reflow cleanly, the mobile mortgage calculator has big labeled inputs with info tooltips. No horizontal scroll, no cramped controls.
- Navigation clarity: 8. Six-item top nav (Mortgages, Banking, Credit cards, Loans, Who we are, News & Research) plus a search icon; below the fold an "Explore topics" card grid. The mortgage calculator page adds breadcrumbs and an "On this page" anchor rail. Lost-visitor-proof.
- Trust signals (E-E-A-T): 9. A trust band with "1982 / 100M+ people use Bankrate every year / $700M+ saved / Federal Reserve: Official data provider", partner logos, expert bylines with credentials (Mark Hamrick, Bankrate senior economic analyst) with pull-quote, NMLS IDs in the footer, and a "How we're paid" transparency link. Dated data lines everywhere ("current average mortgage rate: 7.55%").
- Page speed feel: 6. Visually rich, consent modals on first visit, and the calculator widget showed "Loading calculator..." behind the data-collection modal at capture. Fine once loaded, but first-visit friction is real.
- Interactivity: 9. Live mortgage calculator with prefilled values ($425,000 home, 20% down), step wizards, rate tabs, an embedded video module, and an "On this page" anchor rail. The page feels like a tool, not a brochure.
- CTA design: 9. Bright-blue pill buttons with arrows ("Get a better rate", "Check if I'm overpaying", "See your equity options"), one clear action per card, plus a persistent "Log in or sign up" header button. Secondary links are quiet blue underlines.

Bankrate overall: 8.4/10 (verified). The site to beat on brand voice, calculator-as-content, and trust-by-transparency ("How we're paid").

## Calculator.net (verified from today's screenshots: retirement calculator desktop full-page + 3 mobile)

One calculator page. Ugly on purpose, and it knows it.

- Visual polish: 4. Dated blue-and-gray table design, default form controls, zero brand ambition. It looks like 2005 and loads like it means it.
- Typography: 5. Small dense text, minimal hierarchy. Functional, not friendly.
- Whitespace/rhythm: 4. Stacked calculator forms, then very long educational articles ("What is Retirement?", 10% rule, 80% rule, 4% rule). Rhythm comes from repetition, not design.
- Mobile experience: 6 (verified). Works in a single column, but controls are small by modern standards and the long articles are walls of text.
- Navigation clarity: 7. Simple breadcrumb (home / financial / retirement calculator) and a "Related" button row (401K Calculator, Roth IRA Calculator, Investment Calculator). Everything is findable, nothing is beautiful.
- Trust signals (E-E-A-T): 6. No authors, no credentials, no about-the-experts. Trust comes purely from longevity and utility, plus cross-linked explainers.
- Page speed feel: 10. Instant. Near-zero JS weight. This is the number his /tools pages must match in feel.
- Interactivity: 8. Four calculators on one page, every control above the fold, results inline on Calculate. Density of function is the whole product.
- CTA design: 4. The green "Calculate" buttons are the only CTAs in sight. Nothing is designed to convert; the product is the conversion.

Calculator.net overall: 6.0/10 (verified). The lesson is not the look, it is the speed and density: his /tools pages should feel this fast even though they look ten times better.

## Investor.gov, compound interest calculator (verified from today's screenshots: desktop full-page + 2 mobile)

The SEC's calculator page. Dated, plain, and quietly excellent at its job.

- Visual polish: 6. Old-school government design: SEC seal, navy/teal/red system, boxy step bands. Honest, not pretty.
- Typography: 8. Large, plain, accessible. Every field gets a plain-language label plus a helper line ("Amount of money that you have available to invest initially."). The plain-language discipline is the whole point.
- Whitespace/rhythm: 7. The 4-step wizard (teal step headers, navy input rows) creates a clear drumbeat: Step 1 Initial Investment, Step 2 Contribute, Step 3 Interest Rate, Step 4 Compound It.
- Mobile experience: 7 (verified). Functional single column, large touch targets, nothing fancy.
- Navigation clarity: 8. Three plain buckets (Introduction to Investing, Financial Tools & Calculators, Protect Your Investments) plus a left rail of related calculators (Savings Goal, RMD, College Savings). A 65-year-old cannot get lost.
- Trust signals (E-E-A-T): 10. The .gov domain, the SEC seal, and the "An official website of the United States government / Here's how you know" banner do all the heavy lifting. Maximum possible authority.
- Page speed feel: 8. Light page, fast load.
- Interactivity: 7. Step wizard with CALCULATE/RESET, plus related quizzes ("Compound Interest Quiz", "Investing Quiz") and featured content cards that keep users learning.
- CTA design: 6. The red CALCULATE button is clear but plain; email signup lives in the footer. Conversion is not the goal here, education is.

Investor.gov overall: 7.4/10 (verified). Steal the step-wizard structure and the helper-text-under-every-field discipline; that is exactly what a 65-year-old audience needs on his /tools pages.

## Medicare.gov (verified from today's screenshots: homepage desktop full-page + 2 mobile)

The closest comp for his Medicare pages, and the accessibility bar he must clear.

- Visual polish: 7. Clean modern government design: teal/green brand, big rounded shapes, generous air. The desktop hero image failed to load in the capture, but the layout held up without it, which is itself a good sign.
- Typography: 9. Huge headlines ("Welcome to Medicare"), large body copy. Built for 65+ eyes, no squinting anywhere.
- Whitespace/rhythm: 8. Airy sections, one job per band: alert banner, hero, quick tasks.
- Mobile experience: 10 (verified). The gold standard for seniors: a giant search field, a huge pill CTA, a big outlined Menu button, and the official-site banner up top. This is what "accessible" looks like in practice.
- Navigation clarity: 9. Minimal header (Menu + Search), "Quick tasks" cards, and a "Get started with Medicare" wizard flow. The seasonal alert banner ("Open Enrollment starts Oct 15 / Find Plans") routes the year's most important traffic above the fold.
- Trust signals (E-E-A-T): 10. Official US government banner with "Here's how you know", medicare.gov domain, and a permanent "Talk to someone" phone path. Nobody questions whether this site is real.
- Page speed feel: 8. Light and fast.
- Interactivity: 7. Get-started wizard, plan finder, live-chat and phone entry points.
- CTA design: 9. A giant teal pill ("Get started with Medicare") plus an always-visible "Talk to someone" link with a phone icon. One primary action, one human fallback, everywhere.

Medicare.gov overall: 8.6/10 (verified). Ties NerdWallet as the highest score. For his Medicare pages: giant type, giant pill CTAs, an always-visible "talk to someone" phone path, and a seasonal AEP banner above the fold.

## Investopedia (BOT-BLOCKED, scores provisional, NOT verified today)

Dotdash Meredith's bot wall blocked two capture attempts ("If you are a reader experiencing an access issue, please contact support@people.inc"), so these scores carry forward from prior knowledge only. Re-verify before building from them.

- Visual polish: 8 (provisional). Clean editorial design, strong brand system.
- Typography: 8 (provisional). Dense but excellent article typography with generous line height.
- Whitespace/rhythm: 7 (provisional).
- Mobile experience: 6 (provisional). Historically ad-heavy on mobile.
- Navigation clarity: 8 (provisional).
- Trust signals (E-E-A-T): 9 (provisional). The famous dual byline: "Reviewed by" an expert with credentials plus "Fact checked by" a second byline on every article, with author bio boxes. This is the single pattern most worth stealing from them.
- Page speed feel: 6 (provisional). Ad-heavy pages.
- Interactivity: 7 (provisional).
- CTA design: 7 (provisional).

Investopedia overall: 7.3/10 (provisional, blocked). Steal the dual byline ("Reviewed by" + "Fact checked by") for his /wealth and /guides articles.

## Provisional notes on the rest (NOT verified today, re-capture before acting)

- (All previous provisional notes are now verified above except Investopedia, which remains blocked. This section intentionally left empty; see the per-site verified sections.)

## Top 15 design patterns worth stealing (specific)

1. Trust-by-numbers band. NerdWallet's "10M+ decisions / 15,000+ resources / 100+ experts" strip sits right under the hero and above partner logos. His equivalent, using only verified numbers: policies written, client files reviewed, site visitors, consultations booked. One strip, three numbers, no adjectives.
2. Category card grid with arrow affordance. Ten tiles, each with title + one-line descriptor + top-right arrow, mapping the whole site in one screen. This is the template for his /wealth, /tools, /ai, and /guides hub pages.
3. Best-rate vs average-rate comparison rows. NerdWallet's rate cards show "Best HYSA 4.27%" next to "Average savings rate 0.37%". His calculators should frame every result against a benchmark ("vs national average") so the number means something.
4. AI ask-box in the hero. "Ask me about credit cards..." with Nerd AI branding. A search/ask box in his hero turns a brochure page into a tool.
5. Dated news carousel. "News That Impacts Your Wallet" with Oct 8, 2026 dates on every card. Freshness is a ranking and trust signal, and AEP season makes it urgent. His homepage needs a dated updates strip.
6. Social-proof module with app-store stats. 4.8 stars, 100k five-star ratings, 7m downloads, plus three dated review quotes. His version: Google review count and rating, with real quoted reviews, dated.
7. "More resources" two-column layout. Left: plain topic list. Right: featured card with image, headline, CTA button, and three quiet text links. A perfect template for his guide hubs.
8. Date-stamped data lines. "Average rates are sourced from the FDIC" and "APYs shown are current as of October 7." Every calculator and rate table on his site should carry a "figures current as of" line. It costs one sentence and buys real credibility.
9. Partner/logo strip. "Partners you know and trust" with SoFi, Progressive, Amex, Rocket Mortgage. His version, compliance-safe: carrier logos he is appointed with, or "Licensed in North Carolina" badges. Borrowed authority, honestly presented.
10. Full-disclosure footer with license numbers. NMLS IDs, state license numbers, physical address, all in the footer. His: "NC Life & Health" license line, NPN, street address, and the required disclaimers, prominent rather than hidden. For a 50+ audience comparing agents, this is a trust feature, not fine print.
11. Bankrate's stat-ribbon with a methodology footnote. Three stat cards ("$78k average saved by Bankrate mortgage users over 30 years", "850+ banks and credit unions", "Top 10%") sit right under the hero with a "Behind the numbers" methodology link. His version: verified stats (policies written, files reviewed, consultations booked) with a "how we counted" link. The methodology link is what makes the numbers believable instead of boastful.
12. Bankrate's "What's your next step?" cards carry their own proof stat. Each card embeds one number in its header ("90% of buyers overpay", "79% of refinancers overpay", "$299k in untapped equity on average"). His /tools and /wealth hub cards should each carry one proof line under the title, so every navigation choice teaches something.
13. Bankrate's calculator page ships a full how-to plus the actual formula. A numbered "How to use this calculator" walkthrough, field-by-field explanations, the dated benchmark ("current average mortgage rate: 7.55%"), and the literal amortization formula in a symbol table, all on the same page as the tool. His calculators should do the same: plain-English how-to, dated data lines, and the formula published for AI-search citations. Educational depth around the tool is what ranks.
14. Investor.gov's step-wizard calculator with helper text under every field. Numbered steps ("Step 1: Initial Investment"), each input labeled in plain words with a one-line explanation of what it means. His /tools pages need helper text under every field; his 65-year-old audience will not guess what "compounding frequency" means.
15. Medicare.gov's senior-accessibility package. Giant default type, giant pill CTAs, an always-visible "Talk to someone" phone path with a phone icon, and a seasonal alert banner ("Open Enrollment starts Oct 15 / Find Plans") above the fold. Direct template for his Medicare pages: minimum type sizes, one giant primary action, a human fallback on every screen, and a dated seasonal banner during AEP.

## Gaps and next steps

- COMPLETED by Worker 1b: Bankrate, Calculator.net, Investor.gov, and Medicare.gov are now verified with fresh screenshots (desktop + mobile). See the screenshot inventory below.
- REMAINING: Investopedia only. Dotdash Meredith's bot wall blocked two CDP attempts. Options: retry from a different egress path, or score it in a live-browser pass later. Everything else is done.
- Screenshot method that worked (for future passes): headless Chromium with `--ignore-certificate-errors` + `--proxy-server` pointing at a local CONNECT relay that adds Proxy-Authorization for the sandbox egress proxy; CDP `Page.captureScreenshot` + `Emulation.setDeviceMetricsOverride`; desktop full-page via clip, mobile viewport-only stacked shots (fullPage mobile crashes Chrome on long pages). Scripts used: /tmp/bench-shot.mjs, /tmp/bench-retry.mjs, /tmp/bench-final.mjs, /tmp/connect-proxy.mjs (ephemeral).
- Bankrate first-visit wrinkle to remember: their calculator widget loads behind a "Consumer Health Data Collection" consent modal, so any future re-capture of the live widget needs the modal dismissed first (interaction, not screenshot-only).

Screenshot inventory (all in `docs/benchmark-screenshots/`, verified 2026-10-08 unless noted):
- `nerdwallet-home-desktop.png` (Worker 1, 1440px full page)
- `bankrate-home-desktop.png` (1440px full page)
- `bankrate-home-mobile-1.png`, `bankrate-home-mobile-2.png`, `bankrate-home-mobile-3.png` (390px viewport stack)
- `bankrate-calculator-desktop.png` (mortgage calculator, 1440px full page; widget showed "Loading calculator..." behind consent modal)
- `bankrate-calculator-mobile-1.png`, `bankrate-calculator-mobile-2.png`, `bankrate-calculator-mobile-3.png` (mortgage calculator, 390px viewport stack)
- `calculatornet-calculator-desktop.png` (retirement calculator, 1440px full page)
- `calculatornet-calculator-mobile-1.png`, `calculatornet-calculator-mobile-2.png`, `calculatornet-calculator-mobile-3.png` (390px viewport stack)
- `investorgov-calculator-desktop.png` (compound interest calculator, 1440px full page)
- `investorgov-calculator-mobile-1.png`, `investorgov-calculator-mobile-2.png` (390px viewport stack)
- `medicaregov-home-desktop.png` (1440px full page; hero image failed to load, content real)
- `medicaregov-home-mobile-1.png`, `medicaregov-home-mobile-2.png` (390px viewport stack)
- `investopedia-home-desktop.png`, `investopedia-home-mobile.png`, `investopedia-article-desktop.png`, `investopedia-article-mobile.png` (BOT WALL captures, not real content; do not score from these)
