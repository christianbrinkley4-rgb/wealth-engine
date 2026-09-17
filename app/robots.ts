import type { MetadataRoute } from "next";
import { SITE_INDEXABLE, SITE_URL } from "@/lib/seo";

/**
 * Permit search and assistant access once the site is ready for indexing.
 * Naming a crawler does not improve ranking or guarantee a citation.
 * Google Search controls apply to AI Overviews; Google-Extended is separate.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "meta-externalagent",
  "Bingbot",
  "CCBot",
];

export function buildRobots(siteUrl: string, publicUrlConfigured: boolean): MetadataRoute.Robots {
  if (!publicUrlConfigured) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /thank-you carries its own noindex (app/thank-you/layout.tsx).
        // Blocking it here as well would stop crawlers reading that instruction.
        disallow: ["/api/"],
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/"],
      })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}

export default function robots(): MetadataRoute.Robots {
  return buildRobots(SITE_URL, SITE_INDEXABLE);
}

// /llms.txt is an optional public brief, not an indexing requirement.
