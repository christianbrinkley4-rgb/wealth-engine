import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleBody } from "@/app/components/ArticleBody";
import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { ServiceHero } from "@/app/components/ServiceHero";
import { ARTICLES, getArticle } from "@/lib/articles";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * Question-led articles, one per real question a neighbor asked. The copy
 * lives in lib/articles.ts so figures that change each year are edited in one
 * place.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const path = `/answers/${article.slug}`;
  return {
    title: { absolute: article.metaTitle },
    description: article.description,
    alternates: { canonical: path },
    openGraph: pageOpenGraph({
      title: article.metaTitle,
      description: article.description,
      path,
    }),
  };
}

export default async function AnswerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const path = `/answers/${article.slug}`;

  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Answers", path: "/answers" },
              { name: article.title, path },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: article.title,
              description: article.description,
              path,
              datePublished: article.published,
              dateModified: article.updated,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(article.faq)) }}
      />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Answers", href: "/answers" },
          { name: "This article" },
        ]}
        eyebrow={article.eyebrow}
        title={article.title}
        lede={article.lede}
        secondaryHref={article.startHref}
        secondaryLabel="Ask me your question →"
      />

      <ArticleBody article={article} />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
