import { notFound } from "next/navigation";
import { findTrafficGuide, TRAFFIC_GUIDES } from "@/lib/trafficGuides";
import { SITE_URL } from "@/lib/seo";

/**
 * Identical Markdown version of each traffic guide (Manoj Ahirwar tip #3).
 * AI crawlers and assistants can fetch /guides/[slug]/markdown for a clean,
 * identical-content text version. Content mirrors the HTML page exactly.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return TRAFFIC_GUIDES.map(({ slug }) => ({ slug }));
}

function guideToMarkdown(slug: string): string | null {
  const guide = findTrafficGuide(slug);
  if (!guide) return null;

  const lines: string[] = [];
  lines.push(`# ${guide.title}`);
  lines.push("");
  lines.push(`> ${guide.description}`);
  lines.push("");
  lines.push(`Canonical: ${SITE_URL}/guides/${guide.slug}`);
  lines.push("");
  lines.push("## Quick answer");
  lines.push("");
  lines.push(guide.answer);
  lines.push("");

  for (const section of guide.sections) {
    lines.push(`## ${section.title}`);
    lines.push("");
    lines.push(section.body);
    lines.push("");
  }

  lines.push(`## ${guide.comparison.caption}`);
  lines.push("");
  lines.push(`| ${guide.comparison.headers[0]} | ${guide.comparison.headers[1]} |`);
  lines.push("| --- | --- |");
  for (const row of guide.comparison.rows) {
    lines.push(`| ${row[0]} | ${row[1]} |`);
  }
  lines.push("");

  lines.push("## Checklist");
  lines.push("");
  for (const item of guide.checklist) {
    lines.push(`- [ ] ${item}`);
  }
  lines.push("");

  lines.push("## Frequently asked questions");
  lines.push("");
  for (const faq of guide.faqs) {
    lines.push(`### ${faq.q}`);
    lines.push("");
    lines.push(faq.a);
    lines.push("");
  }

  lines.push("## Sources");
  lines.push("");
  for (const source of guide.sources) {
    lines.push(`- [${source.title}](${source.url})`);
  }
  lines.push("");

  lines.push("## Related");
  lines.push("");
  for (const rel of guide.related) {
    lines.push(`- [${rel.title}](${SITE_URL}${rel.href})`);
  }
  lines.push("");

  lines.push("---");
  lines.push("");
  lines.push(
    "Educational content only, not financial or tax advice. " +
      `Published by Christian Brinkley, christianbrinkleync.com.`
  );

  return lines.join("\n");
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const markdown = guideToMarkdown(slug);
  if (!markdown) notFound();
  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "X-Robots-Tag": "index, follow",
      Link: `<${SITE_URL}/guides/${slug}>; rel="canonical"`,
    },
  });
}
