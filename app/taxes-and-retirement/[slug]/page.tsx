import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleBody } from "@/app/components/ArticleBody";
import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { ServiceHero } from "@/app/components/ServiceHero";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";
import { getTaxArticle, TAX_ARTICLES } from "@/lib/taxArticles";

export const dynamicParams = false;

export function generateStaticParams() {
  return TAX_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getTaxArticle(slug);
  if (!article) return {};
  const path = `/taxes-and-retirement/${article.slug}`;
  return {
    title: { absolute: article.metaTitle },
    description: article.description,
    alternates: { canonical: path },
    openGraph: pageOpenGraph({ title: article.metaTitle, description: article.description, path }),
  };
}

export default async function TaxArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getTaxArticle(slug);
  if (!article) notFound();

  const path = `/taxes-and-retirement/${article.slug}`;

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Taxes & retirement", path: "/taxes-and-retirement" },
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
          { name: "Taxes & retirement", href: "/taxes-and-retirement" },
          { name: "This explainer" },
        ]}
        eyebrow={article.eyebrow}
        title={article.title}
        lede={article.lede}
        secondaryHref={article.startHref}
        secondaryLabel="Ask me a question"
        note="Educational only. Not tax, legal, or investment advice."
      />

      <ArticleBody
        article={article}
        nextStep={{
          heading: "Wondering how this hits your Medicare costs?",
          body: "That’s the part I can help with directly. For tax prep or investment advice, I’ll point you to the right professional, including the advisor I work with.",
          label: "Ask me a question",
        }}
      >
        <ComplianceDisclosure showEstimateNote />
      </ArticleBody>
    </main>
  );
}
