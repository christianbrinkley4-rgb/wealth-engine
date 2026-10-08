# Add ten practical tax and account-change guides

Readers could find broad tax and retirement explainers, but lacked dedicated answers to specific filing and job-change questions. This batch adds ten sourced guides, a browseable /guides index, and contextual links from existing articles and hubs.

Branch: `traffic-mission-2026-10-08`, based on fetched production commit `fd99ea3`.

## Changes

- Nine national federal-tax and account guides: overtime, tips, teen filing, personal-sale 1099-Ks, unpaid taxes after an extension, unemployment withholding, inherited IRAs, 401(k) rollovers, and HSA/FSA job changes.
- One Triad-local Medicare nonrenewal guide, with no carrier names, local-exit claims, or plan recommendations.
- Shared server-rendered article layout with concise answers, comparison tables, numbered records checklists, visible FAQs, primary-source links, canonical metadata, Article/BreadcrumbList/FAQPage markup, contact information, and educational disclosures.
- Discovery through the new index, existing pillar/cluster links, sitemap, and both llms text indexes.
- Corrected the linked missed-enrollment guide's obsolete July 1 General Enrollment start date. Coverage starts the month after signup. Also qualified its automatic-renewal claims and distinguished premium Part A from premium-free Part A.
- Logged target queries, selection rationale, primary sources, and post-publication measurement in the traffic playbook. Added a separate research note because the referenced keyword battle plan was absent from production.

## Validation

- `npx tsc --noEmit`: clean after regenerating stale local Next.js route types.
- `npx vitest run`: 681 tests pass across 47 files; guide tests cover rendered disclosures, metadata limits, schema/FAQ agreement, crawl discovery, related links, and unknown routes.
- `WEALTH_PREVIEW=build npm run build`: local production build generated 250 pages, including all ten new guide routes. The later targeted wording correction in the older Medicare guide was covered by the final typecheck and test run.
- Browser preview: inspected title, answer box, body, comparison table, and checklist at the default narrow viewport. No new client-side JavaScript or form submission was added.
- React best-practices review: server components, stable list keys, semantic table headings/captions, linked sources, and no data-fetching waterfalls.

Windows sandbox restrictions blocked initial Vitest temporary-file renames and the native Next.js compiler's path resolution. The checks succeeded with approved local execution outside that sandbox. No project test settings were weakened.

## Release and measurement

This is a local PR-style handoff. No push, hosted PR, merge, Netlify build, or deploy was requested by this batch. Publishing a branch or opening a hosted PR could trigger a deploy preview, so leave that for the separate release decision.

Rankings and AI citations cannot be guaranteed. Search selection is qualitative, with no measured keyword volume, difficulty, or existing page traffic. Capture a baseline when published, compare 28-day Search Console windows, and spot-check actual AI source citations. Review time-sensitive IRS and Medicare sources before release.

The pre-existing untracked `.muserules` file is outside this change.
