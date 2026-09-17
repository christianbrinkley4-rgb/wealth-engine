# Handing work to GitHub Copilot

Copilot is best here for work that is mechanical and checkable: sweeping every page at phone sizes, trimming dead code, tightening images. Keep judgment calls — anything touching Medicare wording, consent, disclosures, or what gets stored about a person — away from it.

## How to hand off a task

1. Go to **github.com/christianbrinkley4-rgb/wealth-engine** → **Issues** → **New issue**.
2. Paste one task from below as the issue body, title it with the task's heading, and create it.
3. On the issue, open the **Assignees** menu and pick **Copilot**. It starts working within a minute or two and opens a draft pull request.
4. Watch the pull request. When it says ready, read the **Files changed** tab yourself before doing anything else.
5. To ask for changes, comment on the pull request and mention `@copilot` with what you want different. It will push more commits.
6. When it looks right, merge the pull request into `master`. That deploys the site, so look at christianbrinkleync.com afterwards.

In VS Code you can do the same thing locally: open Copilot Chat, switch the mode selector to **Agent**, and paste the task. It edits files in your working copy, which you then commit yourself.

## Rules to paste at the end of every task you give it

```text
Rules for this repository:
- Work on a branch and open a pull request. Never push to master; master deploys to the live site within minutes.
- Read AGENTS.md before changing code, and docs/CONTENT-VOICE.md before changing any words a visitor reads.
- Do not change consent wording, disclosures, privacy text, or what is stored about a person. If a fix seems to need that, stop and say so in the pull request instead.
- Do not add testimonials, ratings, statistics, credentials, or response times. Those only come from real values in lib/testimonials.ts and lib/agent.ts.
- Never submit a real form while testing: .env.local can reach the live command center.
- Everything must pass: npm run lint, npm test, npm run build.
- In the pull request description, explain in plain language what changed and how you checked it.
```

---

## Task 1: Phone sweep of every page

```text
Check every public page of this Next.js site at phone sizes and fix what is broken.

Sizes to check: 360x740, 390x844, and 430x932, then 1440 wide to confirm nothing regressed on desktop.

Pages: /, /turning-65, /advantage-vs-medigap, /keep-my-doctor, /annual-enrollment, /helping-a-parent, /irmaa-appeal, /social-security-timing, /life-insurance, /care-coverage, /annuities, /retirement-income, /about, /service-area, /schedule, /start, /medicare, /plan, /roth-window, /remind-me, /privacy, /thank-you, and one city page such as /medicare-in/greensboro.

On each page confirm:
- No sideways scrolling at any of those widths.
- A phone number is reachable without hunting for it.
- The sticky call bar at the bottom never covers a button, a form field, or the footer disclosures.
- Body text is at least 16px and tap targets are at least 44px tall.
- Headings run in order (h1, then h2, and so on) with exactly one h1 per page.
- Every image has meaningful alt text, or empty alt if it is decorative.

Fix what you find, preferring changes in app/home.css and app/personal.css over new one-off styles. Put before and after screenshots in the pull request for every page you changed.
```

## Task 2: Speed on a mid-range phone

```text
Improve how fast this site loads on a phone over a normal mobile connection, without changing how it looks.

Start by running Lighthouse in mobile mode on / and /turning-65 and putting the starting scores in the pull request.

Then look at:
- next/image usage: every image should have correct sizes and width/height so nothing shifts as the page loads, and only images in the first screen should load eagerly.
- public/christian-brinkley.jpg is 81KB and is used at several sizes; confirm the right file is served to a phone rather than a desktop-sized one.
- Fonts in app/layout.tsx: confirm nothing blocks the first paint and that text does not jump when the fonts arrive.
- Any component marked "use client" that does not need to be.

Target 90 or better for Performance and Accessibility on mobile. Report the before and after scores, plus the largest contentful paint and layout shift numbers.
```

## Task 3: Remove dead styles and unused code

```text
The homepage was rebuilt recently and the old styles were only partly cleaned up. Remove what nothing uses, without changing how any page looks.

- In app/personal.css, find class names that no longer appear in any .tsx file and delete those rules. Check every page, not just the homepage: /care-coverage, /schedule, /remind-me, and /turning-65 still use some of them.
- Do the same for unused exports in lib/ and components/.
- Do not touch app/home.css unless a rule there is genuinely unreferenced.

Prove nothing changed visually: screenshot /, /care-coverage, /schedule, /remind-me, and /turning-65 at 390px wide before and after, and put both in the pull request. If a screenshot differs at all, put the rule back.
```
