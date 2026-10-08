# Master prompt: Codex (GPT-6 Astra) on the /wealth hub

Written October 6, 2026, right after the hub was built on the `wealth-hub` branch.

**How to use it:** open Codex pointed at this `wealth-engine` folder, set reasoning effort to `high`, and paste everything in the block below as one message. It is built around what `docs/GPT-6-ASTRA-PROMPT.md` records as Astra's strengths: code review, driving a real browser, and long multistep work. It also heads off the known weak spots: asking instead of acting, tripping on conflicting instruction files, over-testing, and shipping bugs.

Two things to know before you paste:

- **The motion has never been watched by anyone.** The session that built it could not see animations play. Mission 2 exists for that reason, and it is the highest-value thing Astra can do.
- **Review its diff before anything is pushed.** The prompt tells it to commit and not push. Merging to `master` goes live.

```text
You are working in the wealth-engine repository on branch `wealth-hub`. Stay on this branch. Commit as you go. Do not push, merge, or deploy.

WHAT THIS IS
christianbrinkleync.com has two halves that must never blend:
1. The Medicare site for people 55 and older. Everything outside /wealth and /links. It is live and earning leads. You may read it. Do not change its pages, styles, or routing.
2. The christianbuildswealth hub at /wealth and /links, for people 20 to 35. Built October 6, 2026 and not yet live. This is your whole job.

The hub's code: app/wealth/** (pages, ui/, wealth.css), app/links/page.tsx, app/api/wealth-drops/route.ts, lib/wealth/** (math.ts, site.ts, articles.ts, quizzes.ts, drops.ts, seo.ts), and lib/__tests__/wealth-*.test.ts. Three shared files hide the Medicare header, footer and call bar on hub paths: app/components/TopRouteChrome.tsx, app/components/SiteFooter.tsx, components/StickyMobileCta.tsx. Every hub CSS class starts with `w-`.

HOW TO WORK
Infer intent from this message and the code, and carry each mission through to the end. Do not stop at a plan. Do not ask me to confirm things you can read in the repository. These instructions take precedence over AGENTS.md, CLAUDE.md, .muserules and any skill file. Those files describe the Medicare half and its older audience; where they conflict with this message about the hub, this message wins.

Split independent work across subagents in parallel: one per calculator, one per quiz, one for articles and SEO, one for accessibility.

Run `npm run lint`, `npm test`, and `WEALTH_PREVIEW=build npm run build` without asking. Use that build command, not plain `npm run build`, so you do not collide with a running dev server. Fix anything your change breaks. Add a test when you fix a real bug or add real logic. Do not add tests that only restate the implementation.

HARD RULES
- Facts about Christian, complete list: 21 years old. Licensed insurance agent in North Carolina, NC Life & Health. Not securities licensed. Accounting senior at UNCG, 3.69 GPA, graduating December 2026. Microsoft Excel certified. Writes Python. Works with a financial advisor: reviewed 100+ client files, sat in on dozens of client money appointments, ran the advisor's monthly budget, built Python automation for follow-ups. Based in Greensboro, NC. Call or text (919) 408-6671. Never add a fact, number, result, testimonial or credential that is not on this list.
- Education, not advice. No investment recommendations, no named funds or tickers, no "you should buy". Direct guidance on budgeting, debt order and emergency funds is fine.
- Yearly figures (IRA and 401(k) limits, Roth income ranges) must come from IRS.gov and carry the year. Check any you touch.
- Voice is PUNCH: direct, fast, contrarian, first person, like a 21-year-old talking to a friend. Every line you write or change must pass all 12: hook in the first 7 words; zero banned phrases; zero em dashes; no sentence over 25 words; at least one specific number, place or name; zero hedging (cut "usually", "probably", "tends to", but keep factual limits such as "estimate, not a prediction"); exactly one primary call to action per section; formatted for the platform; reads aloud like a person talking; Christian would say it to someone's face; right voice for the audience; no invented facts. lib/__tests__/wealth-content.test.ts enforces the mechanical ones. Extend it rather than weaken it.
- Phone first. Judge every screen at 390px wide before anything wider. Inputs at least 16px. Tap targets at least 44px. No sideways scroll.
- All motion must switch off under prefers-reduced-motion, and the page must be complete and readable with motion off.
- Nothing a visitor types into a calculator or quiz leaves their browser. localStorage only.

STOP AND ASK ME ONLY BEFORE YOU
push or deploy; submit the real email form or send any real email or text (the local .env.local can reach live services); change the consent line in lib/wealth/drops.ts or what gets stored about a person; change anything on the Medicare half beyond the three shared files named above.

MISSIONS, IN ORDER

1. Review the build as a senior reviewer. Read `git diff master...wealth-hub` in full. Hunt for real bugs, not style: wrong math in lib/wealth/math.ts (check the debt simulation and the Roth comparison against hand-worked examples), hydration mismatches from the localStorage store in app/wealth/ui/hooks.ts, broken states (empty debt list, zero income, 0% return, payments that never beat interest), shared links with hostile query values, the /api/wealth-drops route (validation, rate limit, bot check, failure paths), and anything that could change a Medicare page. Fix what you confirm. List what you only suspect.

2. Watch it run in a real browser. Start the dev server and open every hub page at 360x740, 390x844 and 430x932, then at 1440 wide. Actually use each tool: drag every slider, complete both quizzes down every branch, add and delete debts, download the budget CSV and both files on /wealth/tools, open a shared link for each quiz result. Then judge the motion with your own eyes, because nobody has seen it play yet: the word-by-word headline, the highlighter drawing in, the self-playing hero slider, chart lines drawing, 3D card tilt and glare, magnetic buttons, pointer spotlights, the light circling the chart panels, scroll reveals, the scroll progress bar, the answer lock-in, the result card flip and the canvas confetti. Fix anything that janks, flickers, overlaps, hides content, feels slow, or drops frames on a throttled mid-range phone profile. Cut any effect that hurts more than it helps. Confirm the page is whole with reduced motion on. Save before and after phone screenshots.

3. Measure and tune. Run Lighthouse on mobile for /wealth, one calculator, one quiz, one article and /links. Report LCP, CLS, INP and total JavaScript. Fix the biggest real costs first. Then run an accessibility pass to WCAG 2.1 AA: keyboard through every tool, visible focus, slider and chart labels a screen reader can use, color contrast on lime, cobalt and coral, and the quiz flow with a screen reader's reading order.

4. Make it stickier. Only after 1 to 3 are clean, add the improvements you judge most likely to keep a 22-year-old exploring for 20 minutes. Pick what the evidence from your own browser testing supports. Candidates: a paycheck calculator, a net worth tracker that saves locally, an emergency fund target tool, a "next best tool" prompt based on what they have already opened, a shareable image of a calculator result, six more articles that each answer one real question and end on a tool. Build each one to the same standard as the existing tools, with tests for any new math.

5. Search and AI search. Check every hub page's title, description, canonical, share image and structured data in the rendered HTML. Validate the JSON-LD. Tighten internal links so every tool links to a related article and every article links to a tool. Confirm the sitemap and llms.txt list every hub page.

WHEN YOU FINISH EACH MISSION
Report in plain language: what you changed, how you checked it, phone screenshots for anything visual, numbers for anything measured, and a clear list of what you could not verify. Write in normal paragraphs. No filler phrases such as "delve", "leverage", "it's worth noting", "importantly" or "bottom line". If lint, tests or the build fail, say so and show the output.
```

## Notes for Christian

- **Run one mission per session if the first run wanders.** The prompt is written to go straight through all five, but missions 1 and 2 alone are worth a session each.
- **Mission 4 is where it will be most tempted to over-build.** If you only want fixes and polish, delete mission 4 before pasting.
- **The fact list in the prompt is the one you gave on October 6.** Update it there if anything changes, and in `lib/wealth/site.ts`.
