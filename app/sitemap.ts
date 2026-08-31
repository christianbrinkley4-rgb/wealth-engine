import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { TRIAD_CITIES } from "@/lib/triad";

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/start", changeFrequency: "weekly", priority: 0.95 },
  { path: "/annual-enrollment", changeFrequency: "weekly", priority: 0.95 },
  { path: "/advantage-vs-medigap", changeFrequency: "monthly", priority: 0.9 },
  { path: "/social-security-timing", changeFrequency: "monthly", priority: 0.9 },
  { path: "/keep-my-doctor", changeFrequency: "monthly", priority: 0.9 },
  { path: "/helping-a-parent", changeFrequency: "monthly", priority: 0.9 },
  { path: "/irmaa-appeal", changeFrequency: "monthly", priority: 0.85 },
  { path: "/remind-me", changeFrequency: "monthly", priority: 0.75 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy", changeFrequency: "monthly", priority: 0.5 },
  { path: "/medicare", changeFrequency: "weekly", priority: 0.8 },
  { path: "/plan", changeFrequency: "weekly", priority: 0.8 },
  { path: "/annuities", changeFrequency: "monthly", priority: 0.85 },
  { path: "/life-insurance", changeFrequency: "monthly", priority: 0.85 },
  { path: "/retirement-income", changeFrequency: "monthly", priority: 0.85 },
  { path: "/roth-window", changeFrequency: "weekly", priority: 0.55 },
];

/**
 * Stamped when the content last actually changed, not at build time. Using
 * `new Date()` told crawlers every page on the site had been rewritten on
 * every deploy, which is the fastest way to have lastmod ignored entirely.
 */
const CONTENT_LAST_REVIEWED = "2026-08-31";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = CONTENT_LAST_REVIEWED;

  // One entry per Triad city, generated from the same source the pages use.
  const cityRoutes: MetadataRoute.Sitemap = TRIAD_CITIES.map((city) => ({
    url: `${SITE_URL}/medicare-in/${city.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [
    ...STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency,
      priority,
    })),
    ...cityRoutes,
  ];
}
