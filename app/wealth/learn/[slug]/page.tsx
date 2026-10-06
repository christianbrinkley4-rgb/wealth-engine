import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { EducationNote, Faq, JsonLd, NextUp, PageHead } from "@/app/wealth/ui/shell";
import { articleJsonLd } from "@/lib/seo";
import { getWealthArticle, WEALTH_ARTICLES, WEALTH_PILLAR_LABELS } from "@/lib/wealth/articles";
import { wealthMetadata } from "@/lib/wealth/seo";
import { getTool } from "@/lib/wealth/site";

/** Money guides. Copy and yearly figures live in lib/wealth/articles.ts. */

export function generateStaticParams() {
  return WEALTH_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getWealthArticle(slug);
  if (!article) return {};
  return wealthMetadata({
    title: article.metaTitle,
    description: article.description,
    path: `/wealth/learn/${article.slug}`,
  });
}

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

export default async function WealthArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getWealthArticle(slug);
  if (!article) notFound();

  const path = `/wealth/learn/${article.slug}`;
  const tool = getTool(article.relatedTool);
  const related = article.relatedArticles
    .map((item) => getWealthArticle(item))
    .filter((item) => item !== undefined);

  return (
    <main>
      <JsonLd
        data={articleJsonLd({
          headline: article.title,
          description: article.description,
          path,
          datePublished: article.published,
          dateModified: article.updated,
        })}
      />
      <PageHead
        eyebrow={WEALTH_PILLAR_LABELS[article.pillar]}
        title={article.title}
        lede={article.description}
        crumbs={[
          { name: "Learn", path: "/wealth/learn" },
          { name: article.title, path },
        ]}
      >
        <ul className="w-meta">
          <li>{article.minutes} min read</li>
          <li>Updated {formatDate(article.updated)}</li>
          <li>By Christian Brinkley</li>
        </ul>
      </PageHead>

      <article className="w-section-tight">
        <div className="w-shell w-narrow">
          <p className="w-answer">
            <span>Short answer</span>
            {article.answer}
          </p>
          <div className="w-prose">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.list ? (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <aside className="w-panel" style={{ marginTop: 36 }} aria-label="Try it yourself">
            <p className="w-eyebrow">
              Now try it · {tool.kind} · {tool.time}
            </p>
            <h2 className="w-h3">{tool.title}</h2>
            <p style={{ margin: "10px 0 0", color: "var(--w-on-ink-muted)" }}>{tool.blurb}</p>
            <div className="w-btn-row">
              <Link href={tool.href} className="w-btn">
                {tool.kind === "Download" ? "Get it free" : "Open it"} <ArrowRight size={18} aria-hidden />
              </Link>
            </div>
          </aside>

          <div className="w-sources">
            <h2>Sources</h2>
            <ul>
              {article.sources.map((source) => (
                <li key={source.href}>
                  <a href={source.href} rel="noopener">
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <EducationNote />
        </div>
      </article>

      <Faq items={article.faq} title="Quick answers" />
      <NextUp
        title="Read next"
        links={[
          ...related.map((item) => ({
            href: `/wealth/learn/${item.slug}`,
            label: item.title,
            kind: "Article",
          })),
          { href: "/wealth/calculators", label: "All calculators", kind: "Calculators" },
        ]}
      />
    </main>
  );
}
