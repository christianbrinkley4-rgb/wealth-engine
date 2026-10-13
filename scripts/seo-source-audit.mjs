import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const walk = (dir) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));
const pages = walk("app").filter((p) => p.endsWith("page.tsx"));
const rows = pages.map((file) => {
  const source = fs.readFileSync(file, "utf8");
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const text = [];
  const questions = [];
  const visit = (node) => {
    if (ts.isJsxText(node)) text.push(node.text.trim());
    if (
      ts.isStringLiteral(node) &&
      ts.isPropertyAssignment(node.parent) &&
      node.parent.name.getText(ast) === "q"
    )
      questions.push(node.text);
    ts.forEachChild(node, visit);
  };
  visit(ast);
  return {
    file: file.replaceAll("\\", "/"),
    words: text.join(" ").split(/\s+/).length,
    questions,
    links: [...source.matchAll(/href=["']([^"']+)["']/g)].map((m) => m[1]),
    h1: (source.match(/<h1[\s>]/g) || []).length + (source.includes("<ServiceHero") ? 1 : 0),
    hasCanonical: source.includes("canonical:"),
    noindex: source.includes("index: false"),
  };
});
fs.mkdirSync("docs/seo-evidence", { recursive: true });
fs.writeFileSync("docs/seo-evidence/source-audit.json", JSON.stringify(rows, null, 2));
console.log(
  JSON.stringify(
    rows.filter((r) => /app\/medicare-(agent-)?[a-z-]+-nc\/page/.test(r.file)),
    null,
    2,
  ),
);
