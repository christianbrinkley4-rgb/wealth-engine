# Search Console import workflow, October 9, 2026

No real export was supplied. The linking experiment is postponed; there are no selected targets, ranking claims, or test/control results.

Export the last 28 days of Performance data from Search Console. A Pages CSV gives page-level aggregates. To supply actual query-page pairs, filter to one page before exporting its Queries and include that page in a `Page` column. Never join separate sitewide Queries and Pages sheets to invent pairs. Required columns are Page (or Top pages), Clicks, Impressions, Position; Query is optional. Record the date range, property, search type and country/device filters alongside the export. Keep exports outside Git.

Run from the repository root:

```powershell
node scripts/gsc-link-candidates.mjs path/to/pages.csv path/to/crawl.json path/to/candidates.md
```

The optional crawl JSON is an array of `{ path, title, links, indexable }`. The release crawl script produces that format. The importer accepts only this site's HTTPS origin with no query or fragment, position 5 through 15 inclusive, at least 30 impressions and valid nonnegative clicks. It offers up to three related indexable pages that do not already link to the target. Suggestions are candidates for a person to review, not insertion instructions.

Reproduce the parser/filter demonstration with synthetic data:

```powershell
node scripts/gsc-link-candidates.mjs scripts/fixtures/gsc-synthetic.csv
npm test -- lib/__tests__/gsc-link-candidates.test.ts
```

The fixture is explicitly synthetic. It yields one candidate and a postponed experiment. It is not evidence of actual search performance.

After 28 days of deployed T-03/T-04 data, choose at most ten qualifying target pages. Fewer than ten postpones the experiment. Record five matched test pages and five controls before editing; give test pages two or three useful contextual links and leave controls unchanged. Preserve the exact export filters at day 28.

| Group | Page | Day 0 clicks/impressions/position | Day 28 clicks/impressions/position |
| --- | --- | --- | --- |
| Test | Pending real export | Not available | Not available |
| Control | Pending real export | Not available | Not available |

Report differences and uncertainty, including “no detectable effect” when appropriate. Ten pages is a small sample. Use the same real data to revisit `/aep` vs `/annual-enrollment` and the parked cost-page overlap questions; no consolidation is inferred from the fixture.
