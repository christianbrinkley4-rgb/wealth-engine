# Implementation tickets, October 9, 2026

For the implementing agent. Read first: `AGENTS.md`, `CLAUDE.md`, `docs/CONTENT-VOICE.md`, then the three companion documents dated 2026-10-09.

Ground rules for every ticket:

- Base on `origin/master`. Fetch first. Master deploys to production on push, so work on a branch and do not push master without Christian's go-ahead.
- Read the relevant guide in `node_modules/next/dist/docs/` before writing Next.js code (AGENTS.md).
- Build and check at 390 px first.
- Never submit a real form. `.env.local` can reach the live command center.
- **Stop and ask Christian** before changing consent wording, disclosures, the privacy page, or what gets stored.
- No invented proof: no reviews, ratings, client counts, response times, savings, or credentials that are not in `lib/testimonials.ts` or `lib/agent.ts`.
- No em dashes in anything a visitor reads.
- Each ticket ends with `npm run lint`, `npm test`, `npm run build` all passing.

Evidence tags: **[crawl]** live crawl 2026-10-09, **[code]** repo at `ea436c0`, **[lab]** Lighthouse lab run, **[build]** local run.

Order: T-10, T-01, T-02, T-04, T-03, T-05, T-09, T-08, T-06, T-11, T-07, T-13, T-14, T-12.

---

## T-10 (P0) Release safety: lint clean, stable test, one check command

**Problem and evidence.** `npx eslint .` on master reports 10 errors and 6 warnings [build]: nine `react/no-unescaped-entities` in `app/guides/{irmaa-brackets-2026,is-social-security-taxed,medicare-automatic-renewal,medicare-travel,missed-medicare-enrollment,working-while-collecting-social-security}/page.tsx`, and one `setState` inside an effect at `app/wealth/ui/WealthNav.tsx:20`. One test, "renders the wall with answered cards, the form, and no sales surface" in `lib/__tests__/ask-wall.test.ts:243`, timed out at 5 s when run alongside a build and passes alone [build]. Netlify runs only `npm run build`, and there is no CI [code].

**User outcome.** None directly. Every later change can be checked with one command, and a broken check stops a deploy.

**Routes and components.** The seven files above, `lib/__tests__/ask-wall.test.ts`, `package.json`, `netlify.toml`.

**Scope.** Fix the 10 lint errors without changing rendered text (use `&apos;` or `{"'"}`). Fix the effect in `WealthNav.tsx` per the React guidance the rule links to. Give the slow test an explicit timeout or split its dynamic imports into `beforeAll`. Add `"check": "npm run lint && npm test && npm run build"` to `package.json`. Propose (do not apply without approval) changing the Netlify build command to run lint and tests before the build.

**Non-scope.** The 6 warnings. Any copy change. Adding a hosted CI service.

**Acceptance criteria.** `npm run check` exits 0 on a clean checkout. `npx vitest run` passes 3 times in a row while a build runs in another terminal.

**Automated tests.** Existing suite. No new tests.

**Visual checks.** Open `/wealth` at 390 px, open and close the menu, confirm no change. Open one edited guide and confirm apostrophes render as before.

**Analytics event or KPI.** None. KPI: zero lint errors on master.

**Compliance and truth risks.** None, provided rendered text is byte-for-byte the same.

**Dependencies.** None.

---

## T-01 (P0) Measurement: missing events, one booking definition

**Problem and evidence.** Thirteen `/tools` pages, the guide signup (`GuideCapture`), the wealth signup (`DropsForm`), the `/ask` form, and almost every CTA tap report nothing [code]: `trackEvent` is called from only six files. A booking can fire both `booking_complete` (browser) and `booking_confirmed` (server). Full gap table: MEASUREMENT-SPEC section 3 and master plan 1.5.

**User outcome.** None visible. Christian can see which pages and buttons lead to a tap, a request or a booking.

**Routes and components.** `lib/analytics.ts`, `app/components/Analytics.tsx`, `components/TrackedLink.tsx`, `hooks/useQuizTracking.ts`, `app/components/TopRouteChrome.tsx`, `components/StickyMobileCta.tsx`, `app/components/ServiceHero.tsx`, `app/components/KitchenTableClose.tsx`, `app/components/ArticleBody.tsx`, `app/tools/*` calculator components and `app/tools/_components/*`, the three quizzes under `app/tools/*-quiz`, `app/ask/AskQuestionForm.tsx`, the allow-list test in `lib/__tests__/`.

**Scope.**

1. Add to `MEASURED_EVENTS`: `tool_start`, `tool_complete`, `cta_click`, `official_handoff_click`, `ask_submit`. (`guide_signup`, `checklist_start`, `checklist_complete` are added by T-08 and T-07.)
2. Extend `EventDetail` and `eventParams` with allow-listed `tool_id`, `cta_id`, `cta_location`, `destination`, exactly as listed in MEASUREMENT-SPEC 3.1 and 3.2. Unknown values are dropped.
3. Extend `QUIZ_IDS` with `medigap_or_advantage`, `roth_conversion`, `cd_or_savings`, and wire `useQuizTracking` into those three quizzes.
4. A small `useToolTracking(toolId)` hook: `tool_start` on first input change, `tool_complete` once, 10 s after an input change with a result on screen.
5. `TrackedLink` accepts `detail`. Use it for every link to `/plan-check`, `/start`, `/schedule` in the header, menu, hero, sticky bar, page close and article end.
6. The global `tel:` click listener reads an optional `data-cta-location` from the link and passes it if it is on the allow-list.
7. A delegated click listener (same pattern as the phone one) fires `official_handoff_click` for links to `medicare.gov`, `ssa.gov` and the NC SHIIP domain when the link carries `data-handoff`.
8. `ask_submit` when the `/ask` form reports success.
9. Leave `booking_complete` firing. Add a code comment and a line in MEASUREMENT-SETUP.md that `booking_confirmed` is the key event.

**Non-scope.** Any identifier, any answer or typed value, scroll tracking, a tag manager, changes to `lib/attribution.ts`, changes to what a form stores.

**Acceptance criteria.** With a recorder in place of `window.gtag`: each surface in MEASUREMENT-SPEC 7.2 produces exactly the expected call with only allow-listed parameters. `tool_complete` fires once per page view. A calculator left untouched fires nothing. No event includes a query string.

**Automated tests.** Extend the allow-list test for every new event and parameter. Unit tests: unknown label values are dropped; `tool_complete` at most once; `safePagePath` unchanged. Render tests: header, sticky bar, hero and page close links carry a `cta_location`.

**Visual checks.** None expected. Confirm at 390 px that the sticky bar and header look identical before and after.

**Analytics event or KPI.** The events themselves. KPI: share of sessions with one or more useful-action events becomes reportable.

**Compliance and truth risks.** Low. The risk is a parameter that carries something a visitor typed. The allow-list and its test are the control. Do not weaken either. The privacy page text "the name of the action and the page it happened on" stays accurate only if labels remain fixed strings.

**Dependencies.** T-10. After deploy, Christian stars `phone_click`, `generate_lead`, `booking_confirmed` in GA4 and registers the custom dimensions (MEASUREMENT-SPEC 4 and 6.1).

---

## T-02 (P0) Meta Pixel decision and privacy wording

**Problem and evidence.** The Meta Pixel (two requests, about 145 KB, 350 to 560 ms main-thread time) loads on every page and sets Meta's `fr` cookie [lab]. The privacy page says "Personalized advertising signals are turned off" [crawl]; the code sets that only for Google (`app/components/Analytics.tsx:182`). Paid ads are parked [doc].

**User outcome.** A faster page, and a privacy statement that is exactly true.

**Routes and components.** Netlify environment (`NEXT_PUBLIC_META_ADS_ALLOWED`, `NEXT_PUBLIC_META_PIXEL_ID`). `app/privacy/page.tsx` only if option B is chosen.

**Scope.** Present the two options in MEASUREMENT-SPEC section 2 to Christian. If A: he unsets the variable and triggers a deploy; verify. If B: draft one replacement sentence for the privacy page and get his approval before editing.

**Non-scope.** Removing pixel code from the repo. Any change to Google or Simple Analytics. Any privacy wording change without approval.

**Acceptance criteria.** Option A: no request to `connect.facebook.net` or `facebook.com` on `/`, `/turning-65`, `/wealth`; the privacy page no longer lists Meta Pixel; a Lighthouse rerun shows no `third-party-cookies` failure from Meta. Option B: the approved sentence is live and accurate.

**Automated tests.** Existing `measurementProviders` tests cover both states. No new test.

**Visual checks.** `/privacy` at 390 px reads correctly in the chosen state.

**Analytics event or KPI.** Lab transfer size and total blocking time on `/`, before and after.

**Compliance and truth risks.** Medium. This is a statement to visitors about tracking on a Medicare site. Do not edit it without Christian. Do not leave it inaccurate.

**Dependencies.** Christian's decision. Independent of code tickets.

---

## T-04 (P0) Internal links, redirect hops, Markdown duplicates

**Problem and evidence.** [crawl] `/medicare-supplement-plans-greensboro-nc` has zero inbound links. `/medicare-advantage-vs-medigap-greensboro-nc` has one (from that orphan). `/medicare-changes-2027` and `/medicare-part-d-donut-hole-2027` have two each. `/turning-65-checklist` two, `/medicare-annual-enrollment-2026-checklist` one. Seven hand-written town pages have one or two. Links on at least 14 `/wealth` pages point at four retired `/wealth/calculators/*` URLs that 308 to `/tools/*`. 36 `/guides/*/markdown` URLs are in the sitemap with `X-Robots-Tag: index, follow` and no canonical header [code] `app/guides/[slug]/markdown/route.ts:98`, `app/sitemap.ts`.

**User outcome.** Someone reading about 2027 changes, AEP or Medigap finds the Greensboro pages. Search engines find them without relying on the sitemap.

**Routes and components.** `lib/learn.ts` and `components/LearnLibrary.tsx` (Learning Hub listing), `app/annual-enrollment/page.tsx`, `app/aep/page.tsx`, `app/anoc/page.tsx`, `app/advantage-vs-medigap/page.tsx`, `app/turning-65/page.tsx`, `app/medicare-in/[city]/page.tsx` (Greensboro only), `app/service-area/page.tsx`, `app/components/SiteFooter.tsx`, `app/tools/page.tsx`, `app/wealth/**/page.tsx` with old calculator links, `lib/wealth/site.ts`, `app/sitemap.ts`, `app/guides/[slug]/markdown/route.ts`, `next.config.ts`.

**Scope.**

1. Add contextual links (a sentence in the body or an existing related-links block, not a new link farm):
   - `/advantage-vs-medigap` to both Greensboro comparison pages.
   - `/annual-enrollment`, `/aep`, `/anoc` to `/medicare-changes-2027` and `/medicare-part-d-donut-hole-2027`.
   - `/medicare-in/greensboro` to both Greensboro pages.
   - `/turning-65` to `/turning-65-checklist`.
   - `/learn` lists all six pages named above.
   - `/service-area` lists all 11 hand-written town pages.
   - `/tools` hub and one relevant guide each link the three quizzes and `/tools/emergency-fund`.
2. Replace every internal `href` to `/wealth/calculators/{compound-interest,budget,debt-payoff,roth-vs-traditional}` with the `/tools/*` target.
3. Add a 308 from `/wealth/calculators` to `/tools`, and point the wealth nav "Calculators" item at `/tools` (label "Tools").
4. Remove the `/guides/*/markdown` entries from `app/sitemap.ts`. On the Markdown response, add `Link: <https://christianbrinkleync.com/guides/{slug}>; rel="canonical"` and keep the route reachable.

**Non-scope.** New pages. Footer-wide link blocks to every page. Anchor text stuffed with keywords: write the link as a normal sentence. The Search Console based linking (T-12).

**Acceptance criteria.** A fresh crawl shows: zero indexable pages with no inbound link; each of the six named pages has 4 or more inbound links from distinct pages; zero internal links that resolve through a redirect; sitemap contains HTML pages only; each Markdown URL returns the canonical `Link` header.

**Automated tests.** A test that walks `app/sitemap.ts` output and fails on any path ending `/markdown`. A test that greps `app/` and `lib/` for the four retired calculator paths and fails if found outside the redirect config. A test that the Markdown route sets the `Link` header.

**Visual checks.** `/learn`, `/annual-enrollment`, `/service-area` at 390 and 1440 px: new links sit in the reading flow and do not create a wall of links.

**Analytics event or KPI.** Inbound link count per target page (crawl). Later: Search Console impressions for the six pages.

**Compliance and truth risks.** Low. New link sentences follow CONTENT-VOICE.md and make no claim about plans, prices or outcomes.

**Dependencies.** T-10.

---

## T-03 (P0) Town pages: take near-duplicates out of the index

**Problem and evidence.** [crawl] 20 `/retirement-in/*` pages have 1% to 11% unique text, 20 `/life-insurance-in/*` have 2% to 11%, and 12 of 20 `/medicare-in/*` have 4% to 12%. Oak Ridge and Browns Summit retirement pages are 91% similar. This is the doorway pattern in Google's spam policy. Table: IA decision, section 5.

**User outcome.** No visible change. A resident who follows a link to their town still gets the page.

**Routes and components.** `app/retirement-in/[city]/page.tsx`, `app/life-insurance-in/[city]/page.tsx`, `app/medicare-in/[city]/page.tsx`, `lib/triad.ts`, `app/sitemap.ts`, `app/components/SiteFooter.tsx`, `app/llms.txt/route.ts`, `app/llms-full.txt/route.ts`.

**Scope.**

1. Add an `indexable: boolean` field per family in `lib/triad.ts` (or a small exported set of slugs), set exactly as in IA decision 5.2 to 5.4.
2. For non-indexable pages: `robots: { index: false, follow: true }` in `generateMetadata`, excluded from `app/sitemap.ts` and from both `llms` files.
3. Footer: list only indexable town pages plus "All the towns I serve."
4. `/service-area` keeps a plain link to every town page.

**Non-scope.** Deleting pages. Redirects (decided after 28 days of Search Console data). Rewriting copy (T-13). The 11 hand-written pages.

**Acceptance criteria.** Crawl shows exactly 40 plus 12 pages with `noindex, follow`, none of them in the sitemap; 8 `/medicare-in/*` pages remain indexable; all 11 `/medicare-*-nc` pages unchanged; no page returns non-200.

**Automated tests.** A test asserting the indexable sets match the IA decision lists. A test that the sitemap contains no `/retirement-in/` or `/life-insurance-in/` path and only the 8 allowed `/medicare-in/` paths. A test that a noindexed town page still renders its H1 and phone link.

**Visual checks.** `/service-area` and the footer at 390 px.

**Analytics event or KPI.** Indexable page count drops from 249 to 197. Search Console: watch "Crawled, currently not indexed" and "Duplicate without user-selected canonical" counts over 28 days.

**Compliance and truth risks.** Low. This reduces risk.

**Dependencies.** T-10. Reversible in one commit.

---

## T-05 (P1) One navigation system and one label per thing

**Problem and evidence.** [code] `app/components/TopRouteChrome.tsx` primary nav has eight items, five of them education labels ("Medicare guides", "Money & tax guides", "Money guides", "Taxes & Retirement", "Wealth"). The menu has "Ask Christian" (`/ask`) and "Ask a question" (`/start`). The wealth header is 116 px tall at 768 px because it wraps [crawl]. The October 8 audit asked for one name; there are now five.

**User outcome.** A 66-year-old on a phone sees five plain choices and two buttons. A 24-year-old on `/wealth` sees Tools, Guides, Quizzes.

**Routes and components.** `app/components/TopRouteChrome.tsx`, `app/components/SiteFooter.tsx`, `lib/wealth/site.ts`, `app/wealth/ui/WealthNav.tsx`, `app/wealth/wealth.css`, `app/guides/page.tsx`, `app/learn/page.tsx` and `lib/learn.ts`, `app/wealth/page.tsx`, `app/links/layout.tsx` or its metadata, `app/page.tsx` (homepage H1, only with approval).

**Scope.** Implement IA decision section 4.2 and 4.3 exactly. `/guides` index grouped under two headings (Medicare and Social Security; Money and taxes). `/learn` lists the Medicare and Social Security guides from `/guides`. `/wealth` hub lists the money and tax guides. `/ai`, `/answers`, `/ask`, `/taxes-and-retirement` move to the footer. `/links` gets `noindex`. Wealth nav fits one row at 768 px. Homepage H1 and eyebrow change **only** after Christian approves the wording.

**Non-scope.** Moving or renaming any URL except the single redirect in T-04. Removing the TPMO disclaimer or the sticky call bar from any page (IA decision, open question 1). Restyling.

**Acceptance criteria.** Each header contains the word "guides" once. Medicare header has five links plus the quiet "Money guides" link and two buttons. Every demoted section is reachable from the footer and from its lane hub. Crawl shows no page lost its last inbound link. Menu works by keyboard and screen reader as before.

**Automated tests.** Snapshot or explicit assertion of the two `NAV` arrays. A test that each of `/ai`, `/answers`, `/ask`, `/taxes-and-retirement` appears in the footer link set. Existing menu focus tests keep passing.

**Visual checks.** Header and open menu at 390, 768, 1024 and 1440 px on `/`, `/learn`, `/wealth`, `/guides`. No wrap, no overlap with the call button.

**Analytics event or KPI.** `cta_click` by `cta_location: header` and `menu`. Sessions that cross lanes (a `/wealth` or money-guide landing followed by a Medicare-lane page).

**Compliance and truth risks.** Low for navigation. Homepage wording follows CONTENT-VOICE.md and needs approval.

**Dependencies.** T-01 (so the effect is measurable), T-04, Christian's sign-off on IA decision section 6.

---

## T-09 (P1) Performance on the heaviest templates

**Problem and evidence.** [lab] Mobile Lighthouse performance 50 to 64, LCP 3.5 to 5.7 s, TBT 880 to 1,580 ms on nine templates. Causes: Google tag 169 KB on every page; Turnstile about 725 KB on every guide page because `GuideCapture` loads it on mount (`app/components/GuideCapture.tsx:45`), same pattern in `DropsForm`, `EmailResultsCapture`, `TimelineEmailCapture`; three preloaded fonts totalling about 297 KB; homepage document about 5 s of main-thread time and 15,600 px tall on a phone.

**User outcome.** The page is readable and tappable sooner on an older phone on mobile data.

**Routes and components.** `app/components/GuideCapture.tsx`, `app/wealth/ui/DropsForm.tsx`, `components/EmailResultsCapture.tsx`, `components/TimelineEmailCapture.tsx`, `lib/loadTurnstile.ts`, `app/components/Analytics.tsx`, `app/layout.tsx` (fonts), `app/page.tsx`, `components/home/*`, `app/home.css`, `app/learn/page.tsx`, `components/LearnLibrary.tsx`.

**Scope.**

1. Turnstile loads on first focus of the email field or when the form scrolls into view, whichever is first. Not on mount. Submitting still waits for a token. Reproduce and re-check the bug described in the memory note "Turnstile async ready() bug" so it does not return.
2. Load the Google tag with a strategy that does not compete with first paint (after load, or on idle). Confirm page views and `phone_click` still record.
3. Fonts: preload only the weights used above the fold, subset to Latin, and confirm `font-display: swap`. Target under 150 KB of font transfer on first load.
4. Homepage: find what drives the 5 s (profile it). Likely candidates are large inline styles, scroll-reveal layout work and below-fold components. Apply `content-visibility: auto` to below-fold sections and lazy-load below-fold client components.
5. `/learn`: the library component renders every entry up front. Defer what is below the fold.

**Non-scope.** Removing Google Analytics or Simple Analytics. Visual redesign. The Meta Pixel (T-02). Changing fonts.

**Acceptance criteria.** Lab, same method as the baseline, median of three runs: LCP at or under 2.5 s and TBT at or under 400 ms on `/`, `/turning-65`, `/learn`, `/tools/compound-interest`, and one guide. Guide pages make no request to `challenges.cloudflare.com` until the form is focused or visible. CLS stays under 0.05. Label all results as lab data in the PR.

**Automated tests.** Unit test: `GuideCapture` does not call `loadTurnstile` on mount and does call it on focus. Existing form tests pass. A test that submit is blocked until a token exists when a site key is set.

**Visual checks.** No font flash that shifts layout at 390 px on `/` and one guide. Signup form works end to end against a local build with test keys (Cloudflare publishes test site keys), never against production.

**Analytics event or KPI.** Lab LCP, TBT, transfer size per template. After 28 days, Core Web Vitals in Search Console if field data exists.

**Compliance and truth risks.** Low. Bot protection must still run before any submission is accepted.

**Dependencies.** T-02 decides the pixel. T-01 first, so tag timing changes can be verified against events.

---

## T-08 (P1) Guide signup: measure it, put it where Medicare readers are, make the promise true

**Problem and evidence.** [code] `GuideCapture` exists and is used on `/guides/*`, `/guides`, `/tools`. It fires no event. It is absent from `/learn` and `/answers/*`. Its copy says "unsubscribe any time" while its comment says the endpoint "emails Christian and stores nothing" (`app/components/GuideCapture.tsx`, `app/api/wealth-drops/route.ts`).

**User outcome.** Someone not ready to call can ask for new Medicare guides by email, and can actually stop them.

**Routes and components.** `app/components/GuideCapture.tsx`, `app/wealth/ui/DropsForm.tsx`, `app/api/wealth-drops/route.ts`, `lib/wealth/drops.ts`, `app/learn/page.tsx`, `app/components/ArticleBody.tsx`, `lib/analytics.ts`.

**Scope.**

1. `guide_signup` event with `list_id` on success, both forms.
2. Place `GuideCapture` once on `/learn` and once near the end of `/answers/*` articles, below the author card, not above the call button.
3. **Stop and ask Christian** how unsubscribing works today. Then either (a) change the sentence to describe the real process, or (b) with his approval, store the address in the existing Supabase project with consent text, version and timestamp, and wire the existing `/unsubscribe` route. Do not choose (b) alone.

**Non-scope.** Popups, exit-intent, gated content, a new email provider, sending any email automatically, changing consent wording without approval.

**Acceptance criteria.** Event fires once per successful signup with the right `list_id` and nothing else. The form appears on `/learn` and on every `/answers/*` page at 390 px without pushing the call button out of the first screen. The unsubscribe sentence matches what happens.

**Automated tests.** Event fires on success only, never on validation failure. Render test for placement. If (b): a route test that an unsubscribe request removes or flags the row and that consent version is stored.

**Visual checks.** `/learn` and one `/answers/*` page at 390, 768, 1440 px.

**Analytics event or KPI.** `guide_signup` per week by landing-page group.

**Compliance and truth risks.** Medium. Consent text and storage are covered by the "stop and ask" rule. An email address tied to Medicare interest is sensitive; it never goes to analytics. No claim about frequency unless Christian commits to it.

**Dependencies.** T-01, T-09 item 1, Christian's answer on storage.

---

## T-06 (P1) Trust block from verified data only

**Problem and evidence.** Zero published reviews (`/api/health` optional item, `lib/testimonials.ts`). `AGENT.npn` is `null` (`lib/agent.ts:127`), so a visitor cannot look the license up. The two local competitors that could be read show no rating either, while the national transaction site shows a third-party review count [crawl, master plan section 3]. The homepage review area shows an honest empty state [doc].

**User outcome.** A cautious visitor can check, in one tap, that Christian is licensed, and can see where his claims come from.

**Routes and components.** New `app/components/TrustFacts.tsx`. Used on `/about`, the homepage, and `app/components/KitchenTableClose.tsx`. Reads `lib/agent.ts`, `lib/testimonials.ts`, `lib/seo.ts`.

**Scope.** A compact block that renders only fields with real values:

- License line and state (present today).
- "Check my license" link to the NC Department of Insurance or NIPR public lookup, shown **only** if `hasPublishableNpn()` is true.
- "Questions go to me, not a call center" and the no-cost, no-obligation line already used on the site.
- Links to verified profiles already in the footer `rel="me"` set.
- Google reviews: a count and rating only when `lib/testimonials.ts` has a real count. Otherwise a plain "Read or leave a Google review" link.
- "Where my numbers come from": link to `/medicare-words` and the sources list.

Add `identifier` (NPN) to the `Person` structured data only when it is published.

**Non-scope.** Stars, badges, "trusted by," years of experience, client counts, response times, awards, carrier logos, any `aggregateRating` markup without real reviews, any testimonial text (pending the compliance answer in REVIEWS-2026-10.md).

**Acceptance criteria.** With today's data the block shows the license line, the two service statements, profile links, the review link and the sources link, and no license lookup link and no rating. Setting a test NPN in a unit test makes the lookup link appear. No empty stars anywhere.

**Automated tests.** Render tests for each data state. A test that fails if the block renders a rating when the review count is zero. Extend the existing guard test on Google rating.

**Visual checks.** `/about`, `/`, and a service page close at 390 and 1440 px. The block must not push the hero CTA down on a phone.

**Analytics event or KPI.** `official_handoff_click` is not used here. Add `cta_click` with `cta_location: inline` only for site CTAs. KPI: contact rate on `/about`.

**Compliance and truth risks.** Medium. Everything shown must be true today. Future CPA or CFP credentials must not appear (CONTENT-VOICE.md). Do not name appointed companies.

**Dependencies.** Christian decides whether to publish the NPN and supplies it. Compliance answer before any testimonial display.

---

## T-11 (P1) Tool pages lead with the tool

**Problem and evidence.** [crawl] At 390 px on `/tools/compound-interest` the first screen is a hero, a phone button and "Talk it through with me." No input is visible above the fold. The comparable national calculator page inspected puts the tool first and the explanation under it. Open since the October 8 audit (gap 7). Tool usage is unmeasured (fixed by T-01).

**User outcome.** Someone who searched for a calculator can use it without scrolling past a sales band.

**Routes and components.** `app/tools/*/page.tsx` (9 calculators, 3 quizzes), `app/tools/_components/*`, `app/components/ServiceHero.tsx`.

**Scope.** A compact tool header (H1, one sentence, "your numbers stay on your device") followed directly by the calculator. Move the agent card and contact buttons below the result. Keep one education disclaimer (the audit's duplicate was reported fixed; verify in built HTML). Add a short related-guides block under the math section.

**Non-scope.** Changing any formula, rate or default. New tools. Removing the disclaimer or disclosure.

**Acceptance criteria.** At 390 x 844 the first input of every calculator is within the first screen. H1 unchanged in text. One disclaimer per page in the built HTML. Lighthouse accessibility stays 100.

**Automated tests.** Render test per tool page: the calculator precedes the contact block in DOM order; exactly one disclaimer element. Existing math tests unchanged and passing.

**Visual checks.** All 12 tool pages at 390 px, three at 768 and 1440 px.

**Analytics event or KPI.** `tool_start` rate (tool starts divided by tool page views) before and after.

**Compliance and truth risks.** Low. Results stay labelled as estimates with stated rates.

**Dependencies.** T-01 (to measure it).

---

## T-07 (P1) Plan-research checklist with an official hand-off

**Problem and evidence.** Transaction sites win on plan data and instant comparison [crawl, master plan section 3]. This site has no plan data and must not imply it does. The official source is Medicare.gov Plan Compare. No documented, stable ZIP-prefill parameter for Plan Compare was found, so the hand-off is a plain link. `/plan-check` (a 7-question quiz that ends in a contact step) and `/tools/medigap-or-advantage-quiz` already exist [code]; this ticket must not duplicate them.

**User outcome.** In about three minutes a visitor builds a one-page sheet: their doctors, hospitals, prescriptions with dose, pharmacy, and what matters most to them. They can print it, take it to Medicare.gov, or bring it to Christian.

**Routes and components.** New `/medicare-plan-checklist` (page, client component, print stylesheet). Linked from `/annual-enrollment`, `/aep`, `/anoc`, `/keep-my-doctor`, `/medicare-advantage-doctor-networks`, `/turning-65-checklist`, `/learn`. `lib/analytics.ts` for events. Possibly a small `lib/planChecklist.ts`.

**Scope.**

- Four short steps: ZIP and county; doctors and hospitals; prescriptions and pharmacy; priorities (a fixed list such as keeping current doctors, lowest monthly cost, travel, drug costs).
- ZIP is used only on the device, only to show the county and whether it is in Christian's service area, from a static table in the repo. It is never sent anywhere.
- Everything stays in component state. No network request carries any entry. Optional "keep on this device" uses `localStorage`, off by default, with a clear button.
- Summary screen: a printable sheet; a link to Medicare.gov Plan Compare with one sentence on what to enter there; "Bring this to Christian" with call and `/schedule` buttons; a link to the county SHIIP office as a free, unbiased option.
- Page states plainly that it does not show or compare plans.
- TPMO disclaimer present as on other Medicare pages.
- Events: `checklist_start`, `checklist_complete`, `official_handoff_click` with `destination`, `cta_click`.

**Non-scope.** Any plan name, premium, star rating, network lookup, formulary lookup, recommendation ("you should choose"), scoring that outputs a plan type as an answer, sending entries by email, storing entries server-side, prefilled deep links to Medicare.gov.

**Acceptance criteria.** With the network tab open, completing the checklist sends no request containing any entry. The printed sheet fits one page for 5 doctors and 10 drugs. Works by keyboard alone. Lighthouse accessibility 100. A ZIP outside the service area gets a polite note and the SHIIP and Medicare.gov links, not a dead end.

**Automated tests.** ZIP to county lookup for every service ZIP and a non-service ZIP. No `fetch` is called during the flow (spy). Events fire with no parameters beyond the allow-list. Summary renders with empty optional steps. `localStorage` is untouched unless the box is ticked.

**Visual checks.** Every step and the summary at 390, 768, 1440 px. Print preview on letter paper.

**Analytics event or KPI.** `checklist_complete` divided by `checklist_start`. `cta_click` and `phone_click` from the summary. `official_handoff_click` count (a hand-off to Medicare.gov is a success for the visitor, so report it, do not treat it as a loss).

**Compliance and truth risks.** Medium. Doctor and drug names are health-related information, so they never leave the device and never reach analytics. No steering toward a plan type. No claim that a doctor or drug "will be covered." The page must say results on Medicare.gov should be confirmed for the coverage year. Ask Christian to run the page past his compliance contact before launch.

**Dependencies.** T-01. A verified list of service-area ZIP codes and counties from Christian. Compliance review.

---

## T-13 (P1) Rewrite the kept town pages with verifiable local facts

**Problem and evidence.** [crawl] The 8 `/medicare-in/*` pages kept by T-03 have 5% to 21% unique text. Four hand-written pages (Butner, Graham, Ramseur, Liberty) are 22% to 31% unique and up to 53% similar to each other.

**User outcome.** A resident learns something specific to their town: where the Social Security office is, where free SHIIP counseling is, which hospital systems matter, where they could meet Christian.

**Routes and components.** `lib/triad.ts` (new optional fields), `app/medicare-in/[city]/page.tsx`, `app/components/LocalCityServicePage.tsx`, `app/components/CitySnapshot.tsx`, `app/medicare-{butner,graham,ramseur,liberty}-nc/page.tsx`.

**Scope.** For each of the 12 pages add at least four items from IA decision 5.5, each with a source URL stored beside the fact and rendered as a link. Add fields such as `ssaOffice`, `shiipSite`, `meetingPlaces`, each `{ name, address?, sourceUrl, checkedOn }`. Reduce shared boilerplate: the three generic FAQs move to one shared block rendered once, and each page keeps only town-specific questions. Then restore indexing for any noindexed town that now qualifies.

**Non-scope.** New town pages. Invented neighborhoods, landmarks, offices, events or client stories. Plan names or prices. Claims about what "most people in [town]" do.

**Acceptance criteria.** Re-running the similarity measurement: every kept page has 35% or more unique shingles and no pair is over 0.50 similar. Every local fact has a working source link checked on the day. Structured data still parses.

**Automated tests.** A test that every indexable town has four or more sourced local facts with a `checkedOn` date. A link-format test on `sourceUrl` (https, allowed hosts such as `ssa.gov`, `ncdoi.gov`, county and city `.gov` sites, hospital system domains).

**Visual checks.** Greensboro, High Point, Burlington and Liberty at 390 px.

**Analytics event or KPI.** `official_handoff_click` from town pages. Search Console impressions per town page after 28 days.

**Compliance and truth risks.** Low to medium. Every fact is public and sourced. Christian confirms any meeting place he is named as using. Mentioning SHIIP is fine and adds trust.

**Dependencies.** T-03. Christian's confirmation of meeting places.

---

## T-14 (P2) Cleanup

**Problem and evidence.** [crawl] 8 titles over 60 characters (`/wealth/social-security-explained`, `/wealth/rmd-explained-73`, `/wealth/rent-vs-buy-math`, `/wealth/side-hustle-taxes`, four `/wealth/quiz/money-personality/*`). 8 descriptions over 160 (`/anoc`, `/medicare-advantage-doctor-networks` at 201, two guides, two personality pages, `/medicare-in/pleasant-garden`, `/medicare-in/gibsonville`). Four money-personality result pages are about 200 words each and indexable. No CSP, X-Frame-Options, Referrer-Policy or Permissions-Policy headers.

**User outcome.** Cleaner search snippets. Slightly safer browsing.

**Routes and components.** The page files named, `netlify.toml` or `next.config.ts` headers.

**Scope.** Shorten the titles and descriptions. Set the four personality result pages to `noindex, follow` and drop them from the sitemap. Add `Referrer-Policy: strict-origin-when-cross-origin`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, and a `Permissions-Policy` that disables camera, microphone and geolocation. Draft a CSP in report-only mode and list what it would block before enforcing.

**Non-scope.** Enforcing a CSP in this ticket. Rewriting articles.

**Acceptance criteria.** Crawl shows zero titles over 60 and zero descriptions over 160 among indexable pages. Headers present on `/`. Cal.com embed, Turnstile and analytics still work.

**Automated tests.** A metadata length test over all static routes (fail over 60 and 160).

**Visual checks.** `/schedule` embed still loads with the new headers.

**Analytics event or KPI.** None.

**Compliance and truth risks.** Low. Shortened descriptions must stay accurate.

**Dependencies.** T-03 (two of the long descriptions are on pages it noindexes).

---

## T-12 (P2) Search Console position 5 to 15 internal-linking test

**Problem and evidence.** Internal links are being added from crawl evidence (T-04). Query data would say which pages are already close to page one. This session had no Search Console access, and the site is weeks old, so the data may be thin.

**User outcome.** Readers of a related page get a link to the page that answers their next question.

**Routes and components.** A new script `scripts/gsc-link-candidates.mjs` that reads a CSV export (no API credentials in the repo). Content files chosen by the result.

**Scope.**

1. Christian exports Search Console performance (queries and pages, last 28 days) to CSV.
2. The script lists page and query pairs with average position 5 to 15 and at least 30 impressions, and for each lists up to three topically related pages that do not already link to it (using the crawl link graph).
3. A person picks at most 10 target pages. Half get two or three new contextual links (test). Half get none (control).
4. Record positions, impressions and clicks for both groups at day 0 and day 28.
5. Write the result into a dated doc, including "no detectable effect" if that is the result.

Also use the same export to settle the overlap questions parked in the IA decision (`/aep` against `/annual-enrollment`, the four cost and numbers pages).

**Non-scope.** Storing Google credentials. Automated link insertion. Exact-match anchor text. Sitewide link blocks. Acting on fewer than 30 impressions.

**Acceptance criteria.** The script runs on a sample CSV and produces a candidate table. A dated results doc exists with both groups' numbers. Fewer than 10 qualifying pages means the test is postponed and that is written down.

**Automated tests.** Unit tests for the CSV parser and the candidate filter using a fixture.

**Visual checks.** Each added link read in place at 390 px.

**Analytics event or KPI.** Change in average position and clicks, test against control, 28 days. Stated with the caveat that ten pages is a small sample.

**Compliance and truth risks.** Low.

**Dependencies.** Search Console access, 28 days of data after T-03 and T-04 ship.
