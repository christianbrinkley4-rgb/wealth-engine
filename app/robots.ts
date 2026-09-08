import type { MetadataRoute } from "next";
import { SITE_INDEXABLE, SITE_URL } from "@/lib/seo";

/**
 * Every crawler is allowed, and the AI ones are named on purpose.
 *
 * A bare `User-Agent: *` already permits them, so this changes no behaviour
 * today. It is here because the ones that matter to a local business now are
 * the assistants people ask "who can help me with Medicare in High Point",
 * and being named explicitly means a later blanket change never silently
 * removes this site from that answer. Google-Extended in particular governs
 * whether the content can be used to ground AI Overviews and Gemini, which is
 * the single largest AI surface a Triad search will touch.
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

// /llms.txt is listed in sitemap.ts so assistants and crawlers can find the
// plain-text brief without a non-standard robots field.
