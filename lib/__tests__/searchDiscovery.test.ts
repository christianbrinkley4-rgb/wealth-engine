import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import { GET as llmsTxt } from "@/app/llms.txt/route";
import { publishedProfiles } from "@/lib/agent";
import { CARE_GUIDES } from "@/lib/careGuides";
import { TOPIC_META } from "@/lib/helpQuiz";
import { articleJsonLd, localBusinessJsonLd, SITE_URL } from "@/lib/seo";

const FACEBOOK_PROFILE =
  "https://www.facebook.com/p/Christian-Brinkley-Greensboro-Retirement-Resource-61566655540080/";
const LINKEDIN_PROFILE = "https://www.linkedin.com/in/christianbrinkley";
const GOOGLE_MAPS_PROFILE = "https://www.google.com/maps?cid=12304450181097673337";
const BANKERS_MAPS_CID = "10422520109754041632";

function page(rel: string) {
  return readFileSync(fileURLToPath(new URL(rel, import.meta.url)), "utf8");
}

describe("search discovery", () => {
  it("lists each care guide once and excludes campaign and conversion utilities", () => {
    const paths = sitemap().map((entry) => new URL(entry.url).pathname);
    expect(new Set(paths).size).toBe(paths.length);
    for (const guide of CARE_GUIDES) expect(paths).toContain(`/${guide.slug}`);
    for (const path of ["/start", "/schedule", "/remind-me", "/llms.txt", "/privacy"])
      expect(paths).not.toContain(path);
    expect(paths.some((path) => /^\/(lp|go|api)\//.test(path))).toBe(false);
  });

  it("care guides enter a valid care consultation situation", () => {
    const firstQuestion = TOPIC_META.care_coverage.questions[0];
    for (const guide of CARE_GUIDES)
      expect(firstQuestion.options.some((option) => option.value === guide.focus)).toBe(true);
  });

  it("attributes articles to the same named person as the site", () => {
    const article = articleJsonLd({
      headline: "Guide",
      description: "Description",
      path: "/care-coverage",
      datePublished: "2026-09-10",
      dateModified: "2026-09-10",
    });
    const person = localBusinessJsonLd()["@graph"].find((entity) => entity["@type"] === "Person");
    expect(article.author["@id"]).toBe(person?.["@id"]);
    expect(article.author.name).toBe(person?.name);
    expect(article.author.url).toBe(`${SITE_URL}/about`);
    expect(article.author.sameAs).toEqual(person?.sameAs);
  });

  it("connects Person and ProfessionalService sameAs to published profiles", () => {
    const profiles = publishedProfiles();
    const urls = profiles.map((profile) => profile.url);
    expect(profiles.map((profile) => profile.network)).toEqual(["facebook", "linkedin", "google"]);
    expect(urls).toEqual([FACEBOOK_PROFILE, LINKEDIN_PROFILE, GOOGLE_MAPS_PROFILE]);

    const graph = localBusinessJsonLd()["@graph"];
    const person = graph.find((entity) => entity["@type"] === "Person");
    const service = graph.find((entity) => entity["@type"] === "ProfessionalService");
    const json = JSON.stringify(localBusinessJsonLd()).toLowerCase();
    expect(person?.sameAs).toEqual(urls);
    expect(service?.sameAs).toEqual(urls);
    expect(service?.hasMap).toBe(GOOGLE_MAPS_PROFILE);
    expect(json).toContain(GOOGLE_MAPS_PROFILE.toLowerCase());
    expect(json).not.toContain("bankerslife");
    expect(json).not.toContain(BANKERS_MAPS_CID);
    expect(json).not.toContain("agents.bankerslife.com");
    expect(json).not.toContain("branches.bankerslife.com");
  });

  it("lists published profile URLs in llms.txt", async () => {
    const body = await llmsTxt().text();
    const profiles = publishedProfiles();
    expect(profiles.map((profile) => profile.network)).toEqual(["facebook", "linkedin", "google"]);
    expect(body).toContain("## Public profiles");
    for (const profile of profiles) {
      expect(body).toContain(profile.label);
      expect(body).toContain(profile.url);
    }
    expect(body).toContain(FACEBOOK_PROFILE);
    expect(body).toContain(LINKEDIN_PROFILE);
    expect(body).toContain(GOOGLE_MAPS_PROFILE);
    expect(body.toLowerCase()).not.toContain("bankerslife");
    expect(body).not.toContain(BANKERS_MAPS_CID);
    expect(body).not.toContain("CID ");
  });

  it("keeps Bankers-branded listings off visitor-facing pages", () => {
    for (const rel of [
      "../../app/about/page.tsx",
      "../../app/components/SiteFooter.tsx",
      "../../app/components/SocialLinks.tsx",
      "../../app/llms.txt/route.ts",
      "../../app/layout.tsx",
    ]) {
      const src = page(rel).toLowerCase();
      expect(src, rel).not.toContain("bankerslife");
      expect(src, rel).not.toContain(BANKERS_MAPS_CID);
    }
  });

  it("keeps the IndexNow key file, submit script, and production deploy hook aligned", () => {
    const key = "c9f2e18a4b7d0635e1c84a90d2b7f6e4";
    const publicKey = page(`../../public/${key}.txt`).trim();
    const script = page("../../scripts/submit-indexnow.mjs");
    const netlify = page("../../netlify.toml");
    const plugin = page("../../plugins/netlify-plugin-indexnow/index.js");
    expect(publicKey).toBe(key);
    expect(script).toContain(`const KEY = "${key}"`);
    expect(script).toContain('https://christianbrinkleync.com');
    expect(script).toContain("parsed.origin !== ORIGIN");
    expect(script).toContain("bankerslife");
    expect(script).toContain("/(api|lp|go)");
    expect(netlify).toContain('package = "./plugins/netlify-plugin-indexnow"');
    expect(plugin).toContain("scripts/submit-indexnow.mjs");
    expect(plugin).toContain('CONTEXT !== "production"');
    expect(plugin).toContain("timeout:");
    expect(plugin).toContain("the deploy is still live");
  });

  it("exposes published profiles as rel=me identity links in the root layout", () => {
    const src = page("../../app/layout.tsx");
    expect(src).toContain("publishedProfiles()");
    expect(src).toContain('rel="me"');
    expect(src).toContain("authors: [{ name: SITE_OWNER, url: `${SITE_URL}/about` }]");
  });
});
