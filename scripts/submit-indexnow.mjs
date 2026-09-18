/**
 * Notify Bing/IndexNow of the public pages. Safe to rerun; it does not
 * request rankings, only crawl attention after the index gate is open.
 *
 * The list comes from the live sitemap rather than being typed here, because a
 * hand-kept copy goes stale the moment a town or a guide is added — which is
 * exactly when the crawl notice matters. Pass a base URL to point it at a
 * preview deploy: `node scripts/submit-indexnow.mjs https://example.com`.
 */
const KEY = "c9f2e18a4b7d0635e1c84a90d2b7f6e4";
const ORIGIN = (process.argv[2] ?? "https://christianbrinkleync.com").replace(/\/$/, "");
const HOST = new URL(ORIGIN).host;
const FETCH_MS = 15_000;
const SKIP_PATHS = new Set(["/start", "/schedule", "/remind-me", "/thank-you"]);

function isIndexablePage(url) {
  if (/bankerslife/i.test(url)) return false;
  try {
    const parsed = new URL(url);
    if (parsed.origin !== ORIGIN) return false;
    if (parsed.username || parsed.password) return false;
    const path = parsed.pathname.replace(/\/$/, "") || "/";
    if (/^\/(api|lp|go)(\/|$)/i.test(path)) return false;
    return !SKIP_PATHS.has(path);
  } catch {
    return false;
  }
}

const sitemap = await fetch(`${ORIGIN}/sitemap.xml`, { signal: AbortSignal.timeout(FETCH_MS) });
if (!sitemap.ok) {
  console.error(`Could not read ${ORIGIN}/sitemap.xml — ${sitemap.status}`);
  process.exit(1);
}

const urlList = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((match) => match[1].trim())
  .filter(isIndexablePage);

if (urlList.length === 0) {
  console.error("The sitemap listed no pages on this origin; nothing submitted.");
  process.exit(1);
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `${ORIGIN}/${KEY}.txt`,
    urlList,
  }),
  signal: AbortSignal.timeout(FETCH_MS),
});

console.log(`IndexNow ${response.status} for ${urlList.length} pages`, await response.text());
// 200 and 202 both mean accepted; anything else is worth seeing in the log.
if (!response.ok && response.status !== 202) process.exitCode = 1;
