import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ResponsiveTable } from "@/app/components/ResponsiveTable";
function table(headers: string[], values: string[]) {
  return createElement(
    ResponsiveTable,
    {},
    createElement(
      "thead",
      {},
      createElement(
        "tr",
        {},
        ...headers.map((h) => createElement("th", { key: h, scope: "col" }, h)),
      ),
    ),
    createElement(
      "tbody",
      {},
      createElement("tr", {}, ...values.map((value, i) => createElement("td", { key: i }, value))),
    ),
  );
}
describe("readable financial tables", () => {
  it("preserves exact amounts and matching column labels for wide tables", () => {
    const html = renderToStaticMarkup(
      table(
        ["Single income", "Joint income", "Part B", "Part D"],
        ["$109,001 to $137,000", "$218,001 to $274,000", "$284.10", "+$14.50"],
      ),
    );
    expect(html).toContain('class="readable-table"');
    for (const value of ["$109,001 to $137,000", "$218,001 to $274,000", "$284.10", "+$14.50"])
      expect(html).toContain(value);
    expect(html).toContain("<thead>");
    expect(html.match(/class="readable-cell-label"/g)).toHaveLength(4);
    expect(html.match(/role="cell"/g)).toHaveLength(4);
    expect(html).toContain('aria-hidden="true">Part B</span>$284.10');
  });
  it("keeps two-column tables in their conventional layout", () => {
    const html = renderToStaticMarkup(table(["Coverage", "Limit"], ["Self-only", "$4,400"]));
    expect(html).not.toContain("readable-table");
    expect(html).not.toContain("readable-cell-label");
    expect(html).toContain("$4,400");
  });
});
