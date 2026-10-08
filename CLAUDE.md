# Working in this repository

Christian Brinkley's site: one local licensed agent in Greensboro, NC, whose job is turning people approaching 65 in the Piedmont Triad into Medicare conversations. Life insurance, care coverage, annuities and retirement questions come second.

- **The branch that deploys is `master`.** Netlify rebuilds christianbrinkleync.com within a couple of minutes of a push, so nothing ships from `main` (an older snapshot kept only for history).
- **Follow [AGENTS.md](AGENTS.md)** for framework rules, and [docs/CONTENT-VOICE.md](docs/CONTENT-VOICE.md) for anything a visitor reads.
- **Most visitors are on a phone.** Build and check at 390px before anything wider.
- **Never invent proof.** Reviews, ratings, credentials and the intro video render only from real values in `lib/testimonials.ts` and `lib/agent.ts`. Don't add response times, savings claims, or client stories.
- **Present Christian as his own independent local agent.** Don't name the companies he is appointed with, and don't attack competitors by name.
- **Before changing anything a person submits** (consent wording, disclosures, what gets stored), stop and ask. `.env.local` can reach the live command center, so never submit a real form to test.
- **Checks:** `npm run lint`, `npm test`, `npm run build`.

## Deploy-critical rules from AGENTS.md (2026-10-07, some Claude Code versions may skip AGENTS.md when CLAUDE.md exists, so these live here too)

- **Netlify deploys the `master` branch, never `main`.** `main` is an older snapshot with no common history. Never push `main` over `master`. Port changes onto `master` (cherry-pick + resolve), run tests + typecheck, then push `master`.
- **SSH lives in `/home/hatch/.ssh`, never `/root/.ssh`.** `/root/.ssh` gets wiped between sessions. Always set `GIT_SSH_COMMAND="ssh -i /home/hatch/.ssh/id_ed25519 -o StrictHostKeyChecking=accept-new -o UserKnownHostsFile=/home/hatch/.ssh/known_hosts"` for git remote ops.
- The hard-won lessons in AGENTS.md (CSS subgrid, grid track blowup, screenshot verification method) still apply; read the full file before styling work.
