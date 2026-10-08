# Articles Blitz 2026-10-08: Per-Article Tactic Checklist

Branch: `articles-blitz-2026-10-08` (from master). Commits: fc0b6b1, 57241e3.
Validation: tsc clean, 860/860 vitest passing, production build green. NOT pushed, NOT deployed.

## 1. Greg Isenberg: "Marketing Engineers" (8-step playbook)

| Tactic | Status |
|---|---|
| Agent workspace with MCP connections | ALREADY DONE (MCP connector at /api/mcp) |
| Agent "brain" context files (company, offers, voice, opinions) | IMPLEMENTED NOW (voice rules + positions added to llms-full.txt) |
| Read-only customer data with attribution | N/A (no customer data on public site) |
| Customer-language agent from real questions | ALREADY DONE (/ask wall captures real visitor questions) |
| 5 specialized agents (buying trigger, SEO, creative, reactivation, analytics) | N/A (operational, covered by Level 5 orchestrator) |
| Guardrails in tools | ALREADY DONE (existing code guardrails) |
| End-to-end campaign execution | N/A (operational) |
| Weekly review loop | ALREADY DONE (site-improve cron) |

## 2. Manoj Ahirwar: "10K Users, $0 on Ads" (11 tips)

| Tactic | Status |
|---|---|
| Direct-answer content for LLMs | ALREADY DONE (quick-answer boxes on all guides) |
| Listicles for AI citations | ALREADY DONE (5 listicles built) |
| Canonical URLs + JSON-LD | ALREADY DONE |
| Identical Markdown versions of pages | IMPLEMENTED NOW (/guides/[slug]/markdown route, sitemap, discoverability link) |
| Programmatic SEO | ALREADY DONE (guide batches) |
| SEO audits | ALREADY DONE (audit docs) |
| Sitemaps to Google/Bing/IndexNow | ALREADY DONE |
| Brave sitemap submission | DOCUMENTED (Brave has no webmaster portal; robots.txt + sitemap.xml cover it) |
| AI citation tracking via GSC/Bing | ALREADY DONE (measurement plan) |
| iOS keyword research | N/A (no iOS app) |
| OpenAI/Claude connectors | ALREADY DONE (MCP) |
| Reddit strategy (tips in comments) | N/A (off-site; belongs to social lane, not site repo) |
| Directory listings | ALREADY DONE (backlink campaign) |

## 3. Nicholas Dulait: Claude Opus 5.5 SEO/GEO mega-guide

| Tactic | Status |
|---|---|
| Keyword selection discipline (explicit target query per page) | ALREADY DONE (query + opportunity fields) |
| GEO optimization patterns | IMPLEMENTED NOW (FAQ schema added to 28 wealth articles; was the gap) |
| alternativeHeadline in Article schema | IMPLEMENTED NOW (wired to guide query field) |

## 4. Fivos Aresti: LinkedIn 6-stage growth system

| Tactic | Status |
|---|---|
| Profile as landing page (banner, headline, about, featured) | IMPLEMENTED NOW (featured resources section added to /about) |
| Network expansion (20-30 comments/day) | N/A (off-site, social lane) |
| Content pillars + positioning | N/A (off-site, Grok bot team lane) |
| Content creation system | N/A (off-site) |
| Lead capture | ALREADY DONE (site has lead capture) |
| Retargeting | N/A (off-site, paid) |

## 5. BowTiedBills: Claude + real search data

| Tactic | Status |
|---|---|
| Keyword intent sorting | ALREADY DONE (intent field on all guides) |
| Pages that rank + get cited | IMPLEMENTED NOW (Claude audit; fixed real gaps, rejected false positives) |
| GBP posts and review replies | N/A (operational, not site repo) |
| Technical fixes | ALREADY DONE |
| Citation audits | ALREADY DONE (this blitz) |

## 6. MacroGlide: AI autonomy levels 1-5

Already acted on (Level 5 orchestrator live). N/A for site repo.

## Claude API usage

- GEO audit: ~866 tokens total (~$0.003). Key verified working.
- Claude correctly identified alternativeHeadline as a gap.
- Claude was wrong about /answers pages and dateModified (both already exist); verified before acting.
