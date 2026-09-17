# Working with GPT-6 Astra on this site

Updated September 17, 2026. The homepage redesign and the site-wide restyle are built and live. Astra's job now is to review that work, test it on real phones, and build what is still missing.

**How to use this file:** paste the standing prompt below, then paste one task under it. That's the whole routine. Let the task finish, read what it reports, and look at the site yourself before starting the next one.

## How to run it

- **Where:** Codex (included with ChatGPT Plus), pointed at this `wealth-engine` folder. Codex can edit files, run the tests, and use a browser, and that's where Astra is strongest.
- **Reasoning effort:** `high`. Save `max` for a hard bug. Reviewers burned through a $100 monthly allowance in 1–2 hours running `max` with several agents.
- **One task per session.** Paste a task below, let it finish, and look at the result before starting the next one. Astra is a capable operator that still needs a supervisor.
- **The stale instruction files are gone.** `GEMINI.md` and the Cursor rules file are not on this branch, and `CLAUDE.md` now describes the real project. Nothing points at the missing AI-TEAM folder any more.

## The standing prompt

Paste this at the start of every session, then add one task.

```text
You are working on ChristianBrinkleyNC.com, the website of Christian Brinkley, a licensed insurance agent in Greensboro, NC. The site's job is to turn people turning 65 in the Piedmont Triad into Medicare conversations, with life insurance, annuity, and retirement leads second.

What makes him different: he is one local agent who lives here, not a call center. He answers his own phone, sits down with each client in person, and is still their agent next year. Present him as his own independent agent. Do not mention any insurance company he is affiliated with, and do not name or attack competitors.

Most visitors are 64 or older and on a smartphone. Judge every change at 390px wide first.

Infer my intent from this message and the repository, and carry the task through to completion. When I ask for something, do it; do not stop at a plan or ask me to confirm details you can work out from the code. My instructions here take precedence over AGENTS.md, CLAUDE.md, GEMINI.md, or any skill file if they conflict.

The branch that deploys is master. Netlify rebuilds christianbrinkleync.com within a couple of minutes of a push to it, so treat every push as going live. Commit your work, but do not push without telling me what will ship.

Use docs/CONTENT-VOICE.md for any visitor-facing words, docs/LAUNCH-AUDIT-2026-09-10.md for compliance context, and lib/agent.ts as the single source for his phone number, disclosures, and consent wording. Read other docs only when the task needs them.

The local tests use mocked providers and have no production access. Run `npm run lint`, `npm test`, and `npm run build` without asking, fix failures your change causes, and rerun what is affected. Three tests in lib/__tests__/website-delivery-*.test.ts already fail because of SQL files outside this work; leave them unless the task is about them. Do not add tests for small, reversible changes that would only mirror the implementation.

Stop and ask me only before you: deploy, push, or change production settings; send a real email, text, or form submission (the local .env.local may reach the live command center); change consent wording, disclaimers, or what is stored about a person; or publish a review, rating, credential, or claim that is not already in lib/agent.ts or lib/testimonials.ts. Never invent testimonials, ratings, statistics, or response times.

If you can split the work, delegate independent parts to subagents in parallel.

When you finish, report in plain language: what changed, how you checked it (with phone screenshots for visual work), and anything you could not verify. Write in clear paragraphs. Avoid filler phrases such as "delve," "leverage," "it's worth noting," "importantly," and "Bottom line."
```

## Tasks, in the order I'd run them

**1. Review what just shipped (Astra's strongest skill).**

```text
Task: Review commits 181e179..HEAD as a senior reviewer. They rebuilt the homepage phone-first, restyled the header and Medicare date tool, moved the whole site onto one palette and type system, added an "email me my Medicare dates" form that files a help_quiz inquiry, changed the phone number to (336) 365-7422, and added Turnstile handling to the results email capture. This is already live, so anything broken is broken for real visitors. Look for real defects: pages that still use the old styles and now look wrong, accessibility problems, client/server or hydration mistakes, anything in lib/notifyLead.ts or lib/enrollmentTimeline.ts that could email the wrong dates, and copy that breaks docs/CONTENT-VOICE.md or Medicare marketing rules. Fix what is clearly wrong and list anything that needs my decision.
```

**2. Phone testing on every page.**

```text
Task: Start the dev server and check every public page at 360x740, 390x844, and 430x932, then at 1440 wide. On each page confirm there is no sideways scrolling, the phone number is always one tap away, the sticky call bar never covers a button or a form field, text is at least 16px, and tap targets are at least 44px. Use the homepage date tool with a birthday in the future, a window that is open today, one that has closed, and a birthday on the 1st. Do not submit a complete form: .env.local can reach the live command center. Run Lighthouse in mobile mode on the homepage and /turning-65. Fix what you find, then give me before and after screenshots and the scores.
```

**3. Make the ad measurement work.**

```text
Task: The production health check reports analytics as not configured, so the phone_click, timeline_complete, and timeline_email_request events in app/components/Analytics.tsx currently go nowhere. Work out exactly what I have to set for Google Analytics 4 and Google Ads conversions on Netlify, wire the code so a phone tap and a submitted lead each register as a conversion, and make sure no health answer, birth date, or contact detail is ever sent to an ad platform. Write the setup steps as docs/MEASUREMENT-SETUP.md in plain language, with the exact settings to paste where. Do not add any tracking that needs a cookie banner.
```

**4. "Mail me a printed copy" of the Medicare dates.**

```text
Task: Add a "Prefer paper? I'll mail you a printed copy" option under the email form in the date tool. It should collect name, street address, city, ZIP, and the same consent checkbox, and go through the existing help_quiz capture path with the month and year they turn 65, so Christian gets a task to mail it. Before writing any code, show me exactly which new personal data this stores and where, and the privacy-page wording you would add. Wait for my approval before building it.
```

**5. Reminder emails before the enrollment window opens.**

```text
Task: The reminder feature (app/api/reminders, lib/reminders.ts, app/remind-me) is not connected to the live command center or to any scheduler, and the site is careful never to promise it. Work out the smallest reliable way to email someone once, 30 days before their Medicare window opens, using the Resend sender and Netlify hosting that already exist: storage, scheduling, deduplication, unsubscribe, and what happens when they book or opt out. Write it up as docs/REMINDER-PLAN.md with costs and risks. Do not build or deploy anything yet.
```

**6. Annual Enrollment, before October 15.**

```text
Task: Annual Enrollment runs October 15 to December 7, and CMS marketing rules for 2027 plans apply from October 1. Review /annual-enrollment and the AEP landing page against the current rules and the disclosure wording in lib/agent.ts, and list precisely what has to change, what wording is required, and what only Christian can confirm with his upline. Write it as docs/AEP-2027-CHECKLIST.md. Change no disclosure wording yourself.
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
