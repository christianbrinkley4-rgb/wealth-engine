import fs from "node:fs";
import { execFileSync } from "node:child_process";

const git = (...args) => execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
const added = ["app/components/ConsultationActions.tsx", "app/components/ResponsiveTable.tsx", "lib/__tests__/cta-hierarchy.test.ts", "lib/__tests__/quick-request-render.test.ts", "lib/__tests__/responsive-table.test.ts"];
const baseline = process.argv[2] || "HEAD";
const files = [...new Set([...git("diff", baseline, "--name-only", "--", "app", "components", "lib").trim().split(/\r?\n/).filter(Boolean), ...added])].sort();
let patch = git("diff", baseline, "--no-ext-diff", "--", "app", "components", "lib");
const rows = [];
for (const file of files) {
  const diff = added.includes(file) ? fs.readFileSync(file, "utf8") : git("diff", baseline, "--unified=0", "--", file);
  const lines = diff.split(/\r?\n/).filter(line => /^[+-](?![+-])/.test(line)).join("\n");
  const categories = [];
  if (/test\.ts$/.test(file)) categories.push("Validation: regression coverage / updated intentional copy or CTA expectations");
  else {
    if (/ServiceHero|KitchenTableClose|ConsultationActions|TopRouteChrome|Sticky.*CTA|StickyMobileCta|SiteFooter|ArticleBody/.test(file) || /ConsultationActions|ctaLocation|data-cta-location|btn-outline|btn-light|btn-ghost|w-btn-ink|CtaBlock|ReviewCta|sh-actions/.test(lines)) categories.push("CTA fixes");
    if (/\.css$/.test(file) || /ResponsiveTable|measure-prose|<main|variant === "info"|page-hero-actions/.test(lines)) categories.push("Visual / mobile layout");
    if (/\.css$/.test(file) || /max\(var\(--minimum-text|useIsClient|disabled=\{submitting \|\| !isClient\}|const linked =|noscript/.test(lines)) categories.push("Mobile sizing / behavior");
    if (/schedule\?topic=medicare#booking-calendar|request a review here/.test(lines) || file === "app/schedule/page.tsx") categories.push("Dead / mislabeled links");
    if (!/\.css$/.test(file) && file !== "app/components/ResponsiveTable.tsx" && (/\bI\b|\bme\b|\bmy\b|Request|Your next steps|Eight questions/.test(lines) || file.startsWith("lib/"))) categories.push("Copy improvements");
    if (file === "components/StickyMobileCta.tsx" || file === "app/components/ResponsiveTable.tsx" || file === "app/components/ConsultationActions.tsx") categories.push("Performance: server-compatible markup / skipped unused observer");
  }
  rows.push("| `" + file + "` | " + (categories.join("; ") || "Copy / presentation refinement") + " |");
  if (added.includes(file) && !patch.includes("diff --git a/" + file + " b/" + file)) {
    const sourceLines = fs.readFileSync(file, "utf8").replaceAll("\r\n", "\n").trimEnd().split("\n");
    patch += "\ndiff --git a/" + file + " b/" + file + "\nnew file mode 100644\n--- /dev/null\n+++ b/" + file + "\n@@ -0,0 +1," + sourceLines.length + " @@\n" + sourceLines.map(line => "+" + line).join("\n") + "\n";
  }
}
const reportPath = "docs/quality-audit/REPORT.md";
const report = fs.readFileSync(reportPath, "utf8").split("<!-- FILE_INVENTORY -->")[0];
fs.writeFileSync(reportPath, report + "<!-- FILE_INVENTORY -->\n\n| File | Changes |\n| --- | --- |\n" + rows.join("\n") + "\n");
fs.writeFileSync("docs/quality-audit/changes.diff", patch);
console.log(JSON.stringify({ sourceFiles: files.length, patchBytes: Buffer.byteLength(patch) }));
