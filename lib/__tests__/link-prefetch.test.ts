import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

const seen = vi.hoisted(() => ({ props: [] as Record<string, unknown>[] }));
vi.mock("next/link", () => ({
  default: (props: Record<string, unknown>) => {
    seen.props.push(props);
    return createElement("a", { href: String(props.href) }, props.children as string);
  },
}));

import Link from "@/components/Link";

const ROOT = join(__dirname, "..", "..");

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (name === "node_modules" || name === "__tests__" || name.startsWith(".")) return [];
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return /\.(tsx?|jsx?)$/.test(name) ? [path] : [];
  });
}

describe("site links", () => {
  it("do not prefetch on scroll unless a link asks to", () => {
    seen.props.length = 0;
    renderToStaticMarkup(createElement(Link, { href: "/aep" }, "AEP"));
    renderToStaticMarkup(createElement(Link, { href: "/", prefetch: true }, "Home"));
    expect(seen.props[0].prefetch).toBe(false);
    expect(seen.props[1].prefetch).toBe(true);
  });

  it("all go through components/Link instead of next/link", () => {
    const direct = ["app", "components", "lib", "hooks"]
      .flatMap((dir) => sourceFiles(join(ROOT, dir)))
      .filter((file) => !file.endsWith(join("components", "Link.tsx")))
      .filter((file) => /from\s+["']next\/link["']/.test(readFileSync(file, "utf8")));
    expect(direct.map((file) => file.replace(ROOT, ""))).toEqual([]);
  });
});
