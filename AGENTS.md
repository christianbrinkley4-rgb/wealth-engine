<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

For visitor-facing writing, follow [docs/CONTENT-VOICE.md](docs/CONTENT-VOICE.md). This site serves people approaching retirement, people already retired, and their families. Keep the language natural, respectful, and useful to them.

## Hard-won lessons

- **Netlify deploys the `master` branch, not `main`.** The workspace may have `main` checked out and `main`/`master` have no common history (master carries the Sep 18 production work). Never push `main` over `master`. Port changes onto `master` (cherry-pick + resolve), run tests + typecheck, then push `master`.
- **SSH lives in `/home/hatch/.ssh`, never `/root/.ssh`.** `/root/.ssh` gets wiped between sessions. Always set `GIT_SSH_COMMAND="ssh -i /home/hatch/.ssh/id_ed25519 -o StrictHostKeyChecking=accept-new -o UserKnownHostsFile=/home/hatch/.ssh/known_hosts"` for git remote ops.
- **CSS subgrid ignores its own `gap` in the subgridded axis** — the parent grid's gap is used instead. When converting cards to `grid-template-columns: subgrid`, move the `column-gap` to the parent.
- **A shared `auto` grid column + a spanning item = track blowup.** When cards share one `auto` figure column (via subgrid) and the `<p>` spans both columns, the paragraph's max-content inflates the `auto` track — measured 242px column for a 100px figure, crushing the title column to 81px. Fix: use a fixed-width figure column (`6rem`, measured against the widest figure) instead of `auto`/`subgrid`, and right-align figures (`justify-self: end`) so each number hugs its title while titles stay aligned.
- **Verify CSS changes visually before declaring them fixed.** Headless `--screenshot` is broken in this Chromium build; use CDP (`Page.captureScreenshot` + `Emulation.setDeviceMetricsOverride`) through a Node script, with a local forward proxy adding `Proxy-Authorization` for the egress proxy (Node 24 forbids absolute-URI request lines via `http.request` — use `createConnection` to the upstream + target host in options; remove the `data` listener before piping a CONNECT tunnel or bytes duplicate).
