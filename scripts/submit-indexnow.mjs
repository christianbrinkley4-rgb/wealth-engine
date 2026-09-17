/**
 * Notify Bing/IndexNow of the public pages. Safe to rerun; it does not
 * request rankings, only crawl attention after the index gate is open.
 */
const KEY = "c9f2e18a4b7d0635e1c84a90d2b7f6e4";
const HOST = "christianbrinkleync.com";
const ORIGIN = `https://${HOST}`;

const urlList = [
  "/",
  "/turning-65",
  "/annual-enrollment",
  "/keep-my-doctor",
  "/advantage-vs-medigap",
  "/life-insurance",
  "/retirement-income",
  "/about",
  "/service-area",
  "/medicare-in/greensboro",
  "/medicare-in/high-point",
  "/medicare-in/winston-salem",
  "/life-insurance-in/greensboro",
  "/life-insurance-in/high-point",
  "/life-insurance-in/winston-salem",
  "/retirement-in/greensboro",
  "/retirement-in/high-point",
  "/retirement-in/winston-salem",
  "/llms.txt",
].map((path) => `${ORIGIN}${path}`);

const body = {
  host: HOST,
  key: KEY,
  keyLocation: `${ORIGIN}/${KEY}.txt`,
  urlList,
};

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

console.log("IndexNow", response.status, await response.text());
if (!response.ok && response.status !== 202) process.exitCode = 1;
