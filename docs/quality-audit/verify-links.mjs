import fs from "node:fs/promises";

const base = process.argv[2] || "http://localhost:3019";
const routes = JSON.parse(await fs.readFile("docs/quality-audit/routes.json", "utf8"));
const pages = new Map();
const links = [];
const failures = [];
const decode = (value) => value.replaceAll("&amp;", "&").replaceAll("&#x27;", "'").replaceAll("&quot;", '"');
async function read(route) {
  if (pages.has(route)) return pages.get(route);
  const response = await fetch(base + route);
  const html = await response.text();
  const row = { route, status: response.status, url: response.url, html, bytes: Buffer.byteLength(html) };
  pages.set(route, row);
  if (response.status >= 400) failures.push({ route, status: response.status });
  return row;
}
let next = 0;
await Promise.all(Array.from({ length: 4 }, async () => {
  while (next < routes.length) {
    const route = routes[next++];
    const page = await read(route);
    for (const anchor of page.html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
      const href = decode(anchor[1]);
      if ((href.startsWith("/") && !href.startsWith("//")) || href.startsWith("#")) links.push({ source: route, href });
    }
  }
}));
const extra = [...new Set(links.filter(link => link.href.startsWith("/")).map(link => link.href.split(/[?#]/)[0]))].filter(route => !pages.has(route));
next = 0;
await Promise.all(Array.from({ length: 4 }, async () => {
  while (next < extra.length) await read(extra[next++]);
}));
const missingFragments = [];
for (const link of links) {
  const [pathAndQuery, fragment] = link.href.split("#");
  if (!fragment) continue;
  const route = pathAndQuery.split("?")[0] || link.source;
  const page = pages.get(route);
  const escaped = fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (page?.status === 200 && !new RegExp('\\bid="' + escaped + '"').test(page.html)) missingFragments.push({ ...link, target: route });
}
const result = {
  routes: routes.length,
  checkedTargets: pages.size,
  internalLinks: links.length,
  failures,
  missingFragments,
  pages: [...pages.values()].map(page => ({ route: page.route, status: page.status, url: page.url, bytes: page.bytes })),
};
await fs.writeFile("docs/quality-audit/rendered-links.json", JSON.stringify(result, null, 2));
console.log(JSON.stringify({ ...result, pages: undefined }, null, 2));
if (failures.length || missingFragments.length) process.exitCode = 1;
