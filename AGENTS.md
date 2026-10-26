<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

For visitor-facing writing, follow [docs/CONTENT-VOICE.md](docs/CONTENT-VOICE.md). This site serves people approaching retirement, people already retired, and their families. Keep the language natural, respectful, and useful to them.

## Brand and compliance rules (all agents)
- `master` deploys to production. Never push to it. Work on a branch and open a draft PR with base `master`. Never base work on `main`.
- Present Christian Brinkley as his own independent local agent. Never name the carriers or companies he is appointed with.
- Never invent proof: no made-up reviews, counts, savings, awards or quotes.
- Keep the CMS TPMO disclaimer and ComplianceDisclosure on Medicare pages. Never edit disclaimer text or its counts without Christian.
- Medicare copy shows no premiums, copays or benefit dollar amounts. No "free", "no cost", "$0", urgency or scare words.
- Readers are 55 to 75. Plain, warm, local voice. Follow docs/CONTENT-VOICE.md.
- No em dashes. Sentences of 25 words or fewer.
- Public phone is (919) 408-6671 (tel:+19194086671). Office: 400 Bellemeade St #501, Greensboro, NC 27401.
- One call to action per section: the booking link or the phone.
- Christian is not securities-licensed. No investment advice, fund picks or return promises.
- Site palette: use the CSS variables in app/system.css, not new hex values. Never use the buildwealth logo colors #1F3D2F, #F3E9D2 or #E0A93B on Medicare pages.
- This repo is public. Never commit lead data, secrets or `.env*` files.
- Never submit a real form to test. `.env.local` reaches live systems.
- Keep Simple Analytics working. Any tracking change needs Christian's approval. Tests must never send analytics hits.
- Before a PR, run: npm run lint, npx tsc --noEmit, npx vitest run, npm run build, npx playwright test, npx @lhci/cli autorun.

## Hard-won lessons

- **Netlify deploys the `master` branch, not `main`.** The workspace may have `main` checked out and `main`/`master` have no common history (master carries the Sep 18 production work). Never push `main` over `master`. Port changes onto `master` (cherry-pick + resolve), run tests + typecheck, then push `master`.
- **SSH lives in `/home/hatch/.ssh`, never `/root/.ssh`.** `/root/.ssh` gets wiped between sessions. Always set `GIT_SSH_COMMAND="ssh -i /home/hatch/.ssh/id_ed25519 -o StrictHostKeyChecking=accept-new -o UserKnownHostsFile=/home/hatch/.ssh/known_hosts"` for git remote ops.
- **CSS subgrid ignores its own `gap` in the subgridded axis** — the parent grid's gap is used instead. When converting cards to `grid-template-columns: subgrid`, move the `column-gap` to the parent.
- **A shared `auto` grid column + a spanning item = track blowup.** When cards share one `auto` figure column (via subgrid) and the `<p>` spans both columns, the paragraph's max-content inflates the `auto` track — measured 242px column for a 100px figure, crushing the title column to 81px. Fix: use a fixed-width figure column (`6rem`, measured against the widest figure) instead of `auto`/`subgrid`, and right-align figures (`justify-self: end`) so each number hugs its title while titles stay aligned.
- **Verify CSS changes visually before declaring them fixed.** Headless `--screenshot` is broken in this Chromium build; use CDP (`Page.captureScreenshot` + `Emulation.setDeviceMetricsOverride`) through a Node script, with a local forward proxy adding `Proxy-Authorization` for the egress proxy (Node 24 forbids absolute-URI request lines via `http.request` — use `createConnection` to the upstream + target host in options; remove the `data` listener before piping a CONNECT tunnel or bytes duplicate).
