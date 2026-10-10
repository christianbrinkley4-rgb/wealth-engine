import fs from "node:fs";
const pages = JSON.parse(fs.readFileSync(".cache/traction/release-crawl.json", "utf8"));
const changed = new Set([
  "/",
  "/about",
  "/medicare-plan-checklist",
  "/medicare-butner-nc",
  "/medicare-graham-nc",
  "/medicare-ramseur-nc",
  "/medicare-liberty-nc",
]);
const urls = [
  ...new Set(
    pages
      .filter((page) => changed.has(page.path) || page.path.startsWith("/medicare-in/"))
      .flatMap((page) => page.externalLinks ?? []),
  ),
];
const results = [];
async function worker() {
  while (urls.length) {
    const url = urls.shift();
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(20000), redirect: "follow" });
      results.push({ url, status: response.status, finalUrl: response.url });
      await response.body?.cancel();
    } catch (error) {
      results.push({ url, error: error.message });
    }
  }
}
await Promise.all(Array.from({ length: 4 }, worker));
fs.writeFileSync(".cache/traction/external-link-check.json", JSON.stringify(results, null, 2));
console.log(
  JSON.stringify(
    {
      checked: results.length,
      unverified: results.filter((result) => !result.status || result.status >= 400),
    },
    null,
    2,
  ),
);
