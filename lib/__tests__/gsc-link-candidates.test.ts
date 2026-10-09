import { describe, expect, it } from "vitest";
// Plain Node script deliberately has no API credentials or app-runtime dependency.
// @ts-expect-error The standalone CLI is JavaScript.
import { parseCsv, candidates, report } from "../../scripts/gsc-link-candidates.mjs";

describe("Search Console importer", () => {
  it("parses quoted CSV without combining unrelated exports", () => {
    const rows = parseCsv('\uFEFFPage,Query,Clicks,Impressions,Position\r\nhttps://christianbrinkleync.com/guides/roth-ira-five-year-rule,"roth, \"\"five years\"\"",2,35,7.2\r\n');
    expect(rows[0].query).toBe('roth, "five years"');
    expect(candidates(rows)[0].position).toBe(7.2);
    expect(() => candidates(parseCsv("Query,Clicks,Impressions,Position\nroth,1,50,8"))).toThrow("page export");
    expect(() => parseCsv('Page,Query\n"broken')).toThrow("Unclosed");
  });
  it("filters low impressions, out-of-band positions, invalid numbers and foreign URLs", () => {
    const rows = [
      { page: "https://christianbrinkleync.com/guides/roth", clicks: "2", impressions: "30", position: "5" },
      { page: "https://christianbrinkleync.com/guides/roth-b", clicks: "0", impressions: "1,000", position: "15" },
      ...["4.99", "15.01", "", "NaN"].map(position => ({ page: "https://christianbrinkleync.com/a", clicks: "1", impressions: "50", position })),
      { page: "https://christianbrinkleync.com/a", clicks: "1", impressions: "29", position: "8" },
      { page: "https://example.com/a", clicks: "1", impressions: "50", position: "8" },
    ];
    expect(candidates(rows)).toHaveLength(2);
    expect(candidates(rows)[0].query).toBeNull();
    expect(report(candidates(rows))).toContain("Experiment postponed");
  });
  it("suggests related indexable pages only when they lack an existing link", () => {
    const rows = [{ page: "https://christianbrinkleync.com/guides/roth-ira", query: "roth taxes", clicks: "3", impressions: "50", position: "9" }];
    const graph = [{ path: "/wealth/roth", title: "Roth IRA", links: [] }, { path: "/wealth/taxes", title: "Roth taxes", links: ["/guides/roth-ira"] }, { path: "/hidden", title: "Roth", links: [], indexable: false }];
    expect(candidates(rows, graph)[0].suggestedSources).toEqual(["/wealth/roth"]);
  });
});
