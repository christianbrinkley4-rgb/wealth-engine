// Post-deploy check: every URL in <origin>/sitemap.xml must return 200 with no
// redirect, carry no noindex (meta or X-Robots-Tag), and canonical to itself.
// Usage: node scripts/check-sitemap-live.mjs https://christianbrinkleync.com
// Exits 1 on any failure. Read-only GET requests.
const origin = (process.argv[2] || "https://christianbrinkleync.com").replace(/\/$/, "");
const xml = await (await fetch(`${origin}/sitemap.xml`)).text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const failures = [];
let next = 0;
async function worker() {
  while (next < urls.length) {
    const url = urls[next++];
    const target = url.replace(/^https?:\/\/[^/]+/, origin);
    try {
      const res = await fetch(target, { redirect: "manual" });
      const html = res.status === 200 ? await res.text() : "";
      const header = res.headers.get("x-robots-tag") || "";
      const meta = /<meta[^>]+name="robots"[^>]+content="([^"]*)"/i.exec(html)?.[1] || "";
      const canonical = /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i.exec(html)?.[1] || "";
      const problems = [];
      if (res.status !== 200) problems.push(`status ${res.status}`);
      if (/noindex/i.test(header)) problems.push(`X-Robots-Tag ${header}`);
      if (/noindex/i.test(meta)) problems.push(`meta robots ${meta}`);
      if (res.status === 200 && canonical && new URL(canonical).pathname !== new URL(url).pathname)
        problems.push(`canonical ${canonical}`);
      if (problems.length) failures.push(`${url}: ${problems.join("; ")}`);
    } catch (error) {
      failures.push(`${url}: ${error.message}`);
    }
  }
}
await Promise.all(Array.from({ length: 8 }, worker));
console.log(`${urls.length} sitemap URLs checked, ${failures.length} failing`);
for (const line of failures) console.log(line);
process.exit(failures.length ? 1 : 0);
