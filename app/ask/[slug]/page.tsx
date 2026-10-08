import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { ServiceHero } from "@/app/components/ServiceHero";
import { ASK_QUESTIONS, getAskQuestion } from "@/lib/askWall";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * One answered question from the wall. Kept informational on purpose: no
 * phone CTA, no consultation CTA, just the answer, the sources, and the
 * educational disclosure.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return ASK_QUESTIONS.map((question) => ({ slug: question.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const question = getAskQuestion(slug);
  if (!question) return {};
  const path = `/ask/${question.slug}`;
  return {
    title: { absolute: question.metaTitle },
    description: question.description,
    alternates: { canonical: path },
    openGraph: pageOpenGraph({
      title: question.metaTitle,
      description: question.description,
      path,
    }),
  };
}

export default async function AskAnswerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const question = getAskQuestion(slug);
  if (!question) notFound();

  const path = `/ask/${question.slug}`;

  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Ask Christian", path: "/ask" },
              { name: question.title, path },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: question.title,
              description: question.description,
              path,
              datePublished: question.published,
              dateModified: question.updated,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(question.faq)) }}
      />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Ask Christian", href: "/ask" },
          { name: "This answer" },
        ]}
        eyebrow={question.eyebrow}
        title={question.title}
        lede={question.lede}
        hidePhoneCta
        secondaryHref="/ask#ask-form"
        secondaryLabel="Ask your question"
        note="From the public Q&A wall. Educational only, not personal advice."
        proof={[
          `Licensed agent · ${AGENT.licenseLine}`,
          "One local person, not a call center",
          "Every figure checked against the source",
        ]}
      />

      <div className="art">
        <div className="shell art-grid">
          <article className="art-main">
            <p className="art-lead">{question.intro}</p>

            {question.sections.map((section, index) => (
              <section key={section.h2} className="art-section">
                <h2>
                  <span className="art-num" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.h2}
                </h2>
                {section.blocks.map((block, blockIndex) =>
                  block.kind === "p" ? (
                    <p key={blockIndex}>{block.text}</p>
                  ) : (
                    <ul key={blockIndex}>
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ),
                )}
              </section>
            ))}

            <section className="art-section">
              <h2>
                <span className="art-num" aria-hidden>
                  {String(question.sections.length + 1).padStart(2, "0")}
                </span>
                Questions people ask me about this
              </h2>
              <div className="faq">
                {question.faq.map((item) => (
                  <details key={item.q}>
                    <summary>
                      {item.q}
                      <span className="faq-icon" aria-hidden />
                    </summary>
                    <p>{item.a}</p>
                  </details>
                ))}
              </div>
            </section>

            <div className="art-refs">
              <div>
                <h2>Sources</h2>
                <ol className="art-sources">
                  {question.sources.map((source) => (
                    <li key={source.href}>
                      <a href={source.href} rel="noopener">
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <h2>Keep reading</h2>
                <ul className="art-related">
                  {question.related.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <ComplianceDisclosure variant="general" showEstimateNote />
          </article>
        </div>
      </div>
    </main>
  );
}
