# Working with GPT-6 Astra on this site

Updated September 17, 2026. The homepage redesign is already built, so Astra's job here is to review it, test it on real phones, and finish the pieces that are left.

## How to run it

- **Where:** Codex (included with ChatGPT Plus), pointed at this `wealth-engine` folder. Codex can edit files, run the tests, and use a browser, and that's where Astra is strongest.
- **Reasoning effort:** `high`. Save `max` for a hard bug. Reviewers burned through a $100 monthly allowance in 1–2 hours running `max` with several agents.
- **One task per session.** Paste a task below, let it finish, and look at the result before starting the next one. Astra is a capable operator that still needs a supervisor.
- **Before the first session:** `CLAUDE.md` and `GEMINI.md` point to `C:/Wealth-Engine/AI-TEAM`, which doesn't exist on this laptop. Astra is sensitive to missing or conflicting instructions and may stall on them. Either delete those two lines or recreate the folder. `AGENTS.md` is fine as is.

## The standing prompt

Paste this at the start of every session, then add one task.

```text
You are working on ChristianBrinkleyNC.com, the website of Christian Brinkley, a licensed insurance agent in Greensboro, NC. The site's job is to turn people turning 65 in the Piedmont Triad into Medicare conversations, with life insurance, annuity, and retirement leads second.

What makes him different: he is one local agent who lives here, not a call center. He answers his own phone, sits down with each client in person, and is still their agent next year. Present him as his own independent agent. Do not mention any insurance company he is affiliated with, and do not name or attack competitors.

Most visitors are 64 or older and on a smartphone. Judge every change at 390px wide first.

Infer my intent from this message and the repository, and carry the task through to completion. When I ask for something, do it; do not stop at a plan or ask me to confirm details you can work out from the code. My instructions here take precedence over AGENTS.md, CLAUDE.md, GEMINI.md, or any skill file if they conflict.

Use docs/CONTENT-VOICE.md for any visitor-facing words, docs/LAUNCH-AUDIT-2026-09-10.md for compliance context, and lib/agent.ts as the single source for his phone number, disclosures, and consent wording. Read other docs only when the task needs them.

The local tests use mocked providers and have no production access. Run `npm run lint`, `npm test`, and `npm run build` without asking, fix failures your change causes, and rerun what is affected. Three tests in lib/__tests__/website-delivery-*.test.ts already fail because of SQL files outside this work; leave them unless the task is about them. Do not add tests for small, reversible changes that would only mirror the implementation.

Stop and ask me only before you: deploy, push, or change production settings; send a real email, text, or form submission (the local .env.local may reach the live command center); change consent wording, disclaimers, or what is stored about a person; or publish a review, rating, credential, or claim that is not already in lib/agent.ts or lib/testimonials.ts. Never invent testimonials, ratings, statistics, or response times.

If you can split the work, delegate independent parts to subagents in parallel.

When you finish, report in plain language: what changed, how you checked it (with phone screenshots for visual work), and anything you could not verify. Write in clear paragraphs. Avoid filler phrases such as "delve," "leverage," "it's worth noting," "importantly," and "Bottom line."
```

## Tasks, in the order I'd run them

**1. Review the redesign (Astra's strongest skill).**

```text
Task: Review the uncommitted changes in this repository (git diff) as a senior reviewer. They rebuild the homepage phone-first, restyle the header and date tool, move the whole site to one color palette, add an "email me my Medicare dates" form that sends a help_quiz inquiry, and change the phone number to (336) 365-7422. Look for real bugs: broken layouts on other pages that share the old styles, accessibility problems, hydration or client/server mistakes, anything in lib/notifyLead.ts or lib/enrollmentTimeline.ts that could email wrong dates, and any copy that breaks docs/CONTENT-VOICE.md or Medicare marketing rules. Fix what is clearly wrong, and list anything that needs my decision.
```

**2. Phone QA on every page.**

```text
Task: Start the dev server and check every public page at 360×740, 390×844, and 430×932, then at 1440 wide. For each page, confirm there is no sideways scrolling, the phone number is always one tap away, the sticky call bar never covers a button or form field, text is at least 16px, and tap targets are at least 44px. Use the date tool on the homepage with a birthday in the future, a window that is open today, one that has closed, and a birthday on the 1st. Do not submit a complete form. Run Lighthouse in mobile mode on the homepage and /turning-65. Fix what you find, then give me before and after screenshots and the Lighthouse scores.
```

**3. Fix the calculator email forms.**

```text
Task: components/EmailResultsCapture.tsx (used on /medicare, /plan, and /roth-window) posts to /api/capture-lead without a Turnstile token, but the route rejects any complete lead without one once TURNSTILE_SECRET_KEY is set. Confirm this, then add the same Turnstile handling that components/TimelineEmailCapture.tsx uses, including the reset after a failed submit. Cover it with a test in the style of lib/__tests__/form-security.test.ts.
```

**4. "Mail me a printed copy" of the Medicare dates.**

```text
Task: Add a "Prefer paper? I'll mail you a printed copy" option under the email form in the date tool. It should collect name, street address, city, ZIP, and the same consent checkbox, and send it through the existing help_quiz capture path with the month and year they turn 65, so Christian gets a task to mail it. Before writing code, show me exactly which new personal data this stores and where, and the privacy-page wording you would add. Wait for my approval before building it.
```

**5. Reminder emails before the enrollment window opens.**

```text
Task: The legacy enrollment reminder feature (app/api/reminders, lib/reminders.ts, app/remind-me) is not connected to the live command center or a scheduler. Work out the smallest reliable way to email someone once, 30 days before their Medicare window opens, using the existing Resend sender and Netlify hosting: storage, scheduling, deduplication, unsubscribe, and what happens when they book or opt out. Write the plan as docs/REMINDER-PLAN.md with costs and risks. Do not build or deploy anything yet.
```

## What the research says about Astra

- **Released September 3–4, 2026.** It's available in ChatGPT and Codex, and through the API as `gpt-6-astra`.
- **Specs:** a 1,050,000-token context window, up to 128K tokens of output, and reasoning effort levels `low`, `high` and `max`.
- **Clearest gains:** code review, computer and browser use, and multistep agentic work. Endor Labs measured the largest generation-over-generation jump in the Codex family.
- **Known weaknesses:**
  - It asks clarifying questions more often than the previous model. The "bias toward action" lines in the standing prompt counter this.
  - It is more sensitive to conflicting instruction files, so fix `CLAUDE.md` and `GEMINI.md` first.
  - It tends to over-test small changes.
  - It has shipped serious bugs in hands-on reviews, so review its diffs before deploying.
- **OpenAI's own advice:**
  - Give it the goal and when to stop, not a stack of documents to read before every edit.
  - Grant safe autonomy for local tests.
  - Relax over-cautious rules written for older models.
  - Tell it to parallelize with subagents.
  - Ban its filler phrases.

Sources: [OpenAI model guidance](https://developers.openai.com/api/docs/guides/latest-model), [Rethinking skills and prompts for GPT-6 Astra](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra), [The Decoder on the prompting tips](https://the-decoder.com/openai-shares-prompting-tips-for-gpt-6-astra-including-a-blocklist-of-slop-words/), [Wikipedia](https://en.wikipedia.org/wiki/GPT-6_Astra), [Yotta Labs specs and pricing](https://www.yottalabs.ai/post/gpt-6-release-date-rumors-what-is-known-2026), [Endor Labs Codex results](https://www.endorlabs.com/learn/gpt-6-astra-on-codex---the-biggest-codex-leap-to-date), [NeoTeo hands-on limits](https://www.neoteo.com/en/gpt-6-astra-improves-coding-and-computer-use-but-still-needs-supervision).
