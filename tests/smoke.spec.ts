import { expect, test } from "@playwright/test";
import { TPMO_DISCLAIMER } from "../lib/agent";
import { ENGINE_BOOKING_URL } from "../lib/leadEnginePublic";

const ROUTES = [
  "/",
  "/aep",
  "/plan-check",
  "/medicare-agent-greensboro-nc",
  "/turning-65",
] as const;

const TPMO_ROUTES = new Set<string>([
  "/aep",
  "/plan-check",
  "/medicare-agent-greensboro-nc",
  "/turning-65",
]);

const BLOCKED_SNIPPETS = [
  "connect.facebook.net",
  "facebook.com/tr",
  "googletagmanager.com",
  "google-analytics.com",
  "analytics.google.com",
  "stats.g.doubleclick.net",
  "googleads.g.doubleclick.net",
  "googleadservices.com",
  "simpleanalyticscdn.com",
  "ads.nextdoor.com",
];

function isBlocked(value: string): boolean {
  return BLOCKED_SNIPPETS.some((snippet) => value.includes(snippet));
}

const forbiddenCarrier = ["Bankers", "Life"].join(" ");

for (const routePath of ROUTES) {
  test(`${routePath} smoke`, async ({ page }, testInfo) => {
    const firstParty: string[] = [];
    const thirdParty: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() !== "error") return;
      const location = msg.location().url || "";
      const text = `${location} ${msg.text()}`;
      if (isBlocked(text)) thirdParty.push(text);
      else firstParty.push(text);
    });
    page.on("pageerror", (error) => {
      const text = error.message;
      if (isBlocked(text)) thirdParty.push(text);
      else firstParty.push(text);
    });

    await page.route("**/*", (route) => {
      if (isBlocked(route.request().url())) return route.abort();
      return route.continue();
    });

    const response = await page.goto(routePath, { waitUntil: "domcontentloaded" });
    expect(response?.status(), routePath).toBe(200);

    const phones = page.locator('a[href="tel:+19194086671"]');
    const phoneCount = await phones.count();
    let phoneVisible = false;
    for (let index = 0; index < phoneCount; index += 1) {
      if (await phones.nth(index).isVisible()) {
        phoneVisible = true;
        break;
      }
    }
    expect(phoneVisible, "visible tel:+19194086671").toBe(true);

    const bookingLinks = page.locator('a[href*="cal.com"]');
    const bookingCount = await bookingLinks.count();
    for (let index = 0; index < bookingCount; index += 1) {
      await expect(bookingLinks.nth(index)).toHaveAttribute("href", ENGINE_BOOKING_URL);
    }

    const bodyText = await page.locator("body").innerText();
    expect(bodyText).not.toContain("\u2014");
    expect(bodyText).not.toContain(forbiddenCarrier);

    const html = await page.content();
    const requireSimpleAnalytics =
      process.env.NEXT_PUBLIC_SIMPLE_ANALYTICS === "true" ||
      (process.env.BASE_URL ?? "").includes("christianbrinkleync.com");
    if (requireSimpleAnalytics) {
      expect(html).toContain("https://scripts.simpleanalyticscdn.com/latest.js");
    }

    if (TPMO_ROUTES.has(routePath)) {
      await expect(page.getByText(TPMO_DISCLAIMER).first()).toBeVisible();
    }

    expect(firstParty, firstParty.join("\n")).toEqual([]);
    if (thirdParty.length > 0) {
      testInfo.annotations.push({
        type: "third-party-console",
        description: thirdParty.join("\n"),
      });
    }
  });
}
