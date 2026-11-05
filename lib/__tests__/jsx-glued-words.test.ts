import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Guard against "glued words" on the live site.
 *
 * This build drops the leading space of a JSX text run when that text
 * follows a closing tag or an expression, wraps onto the next line, and
 * contains an HTML entity such as &apos;. So
 *   <strong>HMO plans</strong> generally cover only
 *   providers inside the plan&apos;s network
 * renders "HMO plansgenerally". Found Oct 27, 2026 on 18 lines across the
 * site. The fix is an explicit {" "} before the text. Prettier treats that
 * as redundant and removes it again, which is why this test exists.
 */

const ROOT = join(__dirname, "..", "..");
const PATTERN = /(<\/[A-Za-z][\w.]*>|\/>|\})( +)([^\s<>{}][^<>{}]*?\n[^<>{}]*)(?=<|\{)/g;
const ENTITY = /&[a-zA-Z]+;|&#\d+;/;

function tsxFiles(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name.startsWith(".")) continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) out.push(...tsxFiles(path));
    else if (name.endsWith(".tsx")) out.push(path);
  }
  return out;
}

describe("JSX text keeps its spaces", () => {
  it("has no wrapped text with an entity that starts with a bare space after a tag or expression", () => {
    const problems: string[] = [];
    for (const file of [...tsxFiles(join(ROOT, "app")), ...tsxFiles(join(ROOT, "components"))]) {
      const source = readFileSync(file, "utf8");
      for (const match of source.matchAll(PATTERN)) {
        const text = match[3];
        const firstLine = text.split("\n")[0];
        if (firstLine.includes("=") && firstLine.includes('"')) continue;
        if (!ENTITY.test(text)) continue;
        const line = source.slice(0, match.index).split("\n").length;
        problems.push(`${relative(ROOT, file)}:${line}: "${firstLine.trim().slice(0, 50)}" needs {" "} before it`);
      }
    }
    expect(problems).toEqual([]);
  });
});
