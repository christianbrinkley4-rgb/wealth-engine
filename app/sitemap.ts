import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/articles";
import { SITE_URL } from "@/lib/seo";
import { TAX_ARTICLES } from "@/lib/taxArticles";
import { TRIAD_CITIES } from "@/lib/triad";

const STATIC_ROUTES: Array<{
  path: string;
  lastModified?: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/care-coverage", changeFrequency: "monthly", priority: 0.85 },
  { path: "/long-term-care-insurance", changeFrequency: "monthly", priority: 0.85 },
  { path: "/short-term-care-insurance", changeFrequency: "monthly", priority: 0.8 },
  { path: "/critical-illness-insurance", changeFrequency: "monthly", priority: 0.8 },
  { path: "/turning-65", changeFrequency: "weekly", priority: 0.95 },
  { path: "/medicare-costs", changeFrequency: "monthly", priority: 0.9 },
  { path: "/special-enrollment", changeFrequency: "monthly", priority: 0.85 },
  { path: "/annual-enrollment", changeFrequency: "weekly", priority: 0.95 },
  { path: "/aep", changeFrequency: "weekly", priority: 0.95 },
  { path: "/anoc", changeFrequency: "weekly", priority: 0.9 },
  { path: "/medicare-creedmoor-nc", changeFrequency: "weekly", priority: 0.9 },
  { path: "/medicare-asheboro-nc", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-10-04" },
  { path: "/medicare-mebane-nc", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-10-04" },
  { path: "/medicare-oxford-nc", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-10-04" },
  { path: "/medicare-eden-nc", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-10-04" },
  { path: "/medicare-roxboro-nc", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-10-04" },
  { path: "/medicare-madison-nc", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-10-04" },
  { path: "/medicare-butner-nc", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-10-04" },
  { path: "/medicare-graham-nc", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-10-04" },
  { path: "/medicare-liberty-nc", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-10-04" },
  { path: "/medicare-ramseur-nc", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-10-04" },
  { path: "/medicare-nc-towns", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-10-04" },
  { path: "/plan-check", changeFrequency: "weekly", priority: 0.95, lastModified: "2026-10-04" },
  { path: "/medicare-annual-enrollment-2026-checklist", changeFrequency: "monthly", priority: 0.9 },
  { path: "/medicare-advantage-doctor-networks", changeFrequency: "monthly", priority: 0.9 },
  { path: "/advantage-vs-medigap", changeFrequency: "monthly", priority: 0.9 },
  { path: "/social-security-timing", changeFrequency: "monthly", priority: 0.9 },
  { path: "/keep-my-doctor", changeFrequency: "monthly", priority: 0.9 },
  { path: "/helping-a-parent", changeFrequency: "monthly", priority: 0.9 },
  { path: "/irmaa-appeal", changeFrequency: "monthly", priority: 0.85 },
  { path: "/service-area", changeFrequency: "monthly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.85 },
  { path: "/medicare", changeFrequency: "weekly", priority: 0.8 },
  { path: "/part-b-penalty", changeFrequency: "monthly", priority: 0.9 },
  { path: "/medicare-costs-2026", changeFrequency: "monthly", priority: 0.95 },
  { path: "/plan", changeFrequency: "weekly", priority: 0.8 },
  { path: "/annuities", changeFrequency: "monthly", priority: 0.85 },
  { path: "/life-insurance", changeFrequency: "monthly", priority: 0.85 },
  { path: "/retirement-income", changeFrequency: "monthly", priority: 0.85 },
  { path: "/roth-window", changeFrequency: "weekly", priority: 0.55 },
  { path: "/answers", changeFrequency: "weekly", priority: 0.8, lastModified: "2026-10-01" },
  { path: "/learn", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-10-05" },
  { path: "/taxes-and-retirement", changeFrequency: "monthly", priority: 0.85, lastModified: "2026-10-05" },
  ...TAX_ARTICLES.map((article) => ({
    path: `/taxes-and-retirement/${article.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    lastModified: article.updated,
  })),
  ...ARTICLES.map((article) => ({
    path: `/answers/${article.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.85,
    lastModified: article.updated,
  })),
];

/**
 * Stamped when the content last actually changed, not at build time. Using
 * `new Date()` told crawlers every page on the site had been rewritten on
 * every deploy, which is the fastest way to have lastmod ignored entirely.
 */
const CONTENT_LAST_REVIEWED = "2026-10-01";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = CONTENT_LAST_REVIEWED;

  // One entry per Triad city, generated from the same source the pages use.
  const cityRoutes: MetadataRoute.Sitemap = TRIAD_CITIES.flatMap((city) => [
    {
      url: `${SITE_URL}/medicare-in/${city.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/life-insurance-in/${city.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/retirement-in/${city.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
  ]);

  return [
    ...STATIC_ROUTES.map(({ path, changeFrequency, priority, lastModified: own }) => ({
      url: `${SITE_URL}${path}`,
      lastModified: own ?? lastModified,
      changeFrequency,
      priority,
    })),
    ...cityRoutes,
  ];
}
