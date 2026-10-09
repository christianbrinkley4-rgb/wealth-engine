import sitemap from "@/app/sitemap";
import { ROTH_DEFINITION } from "@/lib/editorial";
import { SITE_URL } from "@/lib/seo";
export function machineDirectory() {
  return [
    "",
    "## Definitions",
    "",
    "### " + ROTH_DEFINITION.name,
    ROTH_DEFINITION.text,
    ...ROTH_DEFINITION.sources.map((source) => "- [" + source.label + "](" + source.href + ")"),
    "",
    "## Machine access",
    "",
    "Read-only MCP endpoint: " +
      SITE_URL +
      "/mcp. Supports initialization and public resource discovery.",
    "[Editorial policy](" + SITE_URL + "/editorial-policy)",
    "",
    "## Complete public route directory",
    "",
    ...sitemap().map(
      (entry) =>
        "- [" +
        (new URL(entry.url).pathname === "/" ? "Home" : new URL(entry.url).pathname) +
        "](" +
        entry.url +
        ")",
    ),
    "",
  ].join("\n");
}
