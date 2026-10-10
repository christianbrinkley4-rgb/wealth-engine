import fs from "node:fs";
const pages = JSON.parse(
  fs.readFileSync(process.argv[2] ?? ".cache/traction/release-crawl.json", "utf8"),
);
const kept = [
  "greensboro",
  "winston-salem",
  "high-point",
  "kernersville",
  "burlington",
  "summerfield",
  "jamestown",
  "stokesdale",
];
const handwritten = ["butner", "graham", "ramseur", "liberty"];
const names = [...kept, ...handwritten].map((slug) => slug.replaceAll("-", "[ -]"));
const shingles = (text) => {
  const tokens =
    text
      .toLowerCase()
      .replace(new RegExp(names.join("|"), "g"), "town")
      .match(/[a-z0-9]+/g) ?? [];
  return new Set(tokens.slice(0, -4).map((_, i) => tokens.slice(i, i + 5).join(" ")));
};
const rows = [],
  pairs = [];
for (const routes of [
  kept.map((slug) => "/medicare-in/" + slug),
  handwritten.map((slug) => "/medicare-" + slug + "-nc"),
]) {
  const sets = routes.map((route) => {
    const page = pages.find((p) => p.path === route);
    if (!page) throw new Error("Missing " + route);
    return { path: route, set: shingles(page.text) };
  });
  for (const page of sets) {
    const others = new Set(sets.filter((s) => s !== page).flatMap((s) => [...s.set]));
    rows.push({
      path: page.path,
      shingles: page.set.size,
      uniqueShare: [...page.set].filter((s) => !others.has(s)).length / page.set.size,
    });
  }
  for (let i = 0; i < sets.length; i++)
    for (let j = i + 1; j < sets.length; j++) {
      const intersection = [...sets[i].set].filter((s) => sets[j].set.has(s)).length;
      pairs.push({
        a: sets[i].path,
        b: sets[j].path,
        jaccard: intersection / new Set([...sets[i].set, ...sets[j].set]).size,
      });
    }
}
const output = {
  method:
    "Main text, all kept town names neutralized, sets of five-word shingles; sibling groups measured separately.",
  rows,
  maxPair: pairs.sort((a, b) => b.jaccard - a.jaccard)[0],
  pairs,
};
fs.writeFileSync(".cache/traction/local-similarity.json", JSON.stringify(output, null, 2));
console.log(JSON.stringify({ rows, maxPair: output.maxPair }, null, 2));
if (rows.some((r) => r.uniqueShare < 0.35) || pairs.some((p) => p.jaccard > 0.5))
  process.exitCode = 1;
