import type { Metadata } from "next";
import Link from "next/link";
import { TrackedLink } from "@/components/TrackedLink";
import { Fragment } from "react";
import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { MedicareByline } from "@/app/components/MedicareByline";
import { ResponsiveTable } from "@/app/components/ResponsiveTable";
import { formatArticleDate } from "@/app/components/ArticleBody";
import { ENGINE_BOOKING_URL } from "@/lib/leadEnginePublic";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";

export type SeoGuideData = {
  slug: string;
  path?: string;
  title: string;
  metaTitle: string;
  description: string;
  published?: string;
  reviewed?: string;
  scope?: "medicare" | "general";
  answer: string;
  sections: Array<{
    title: string;
    paragraphs?: string[];
    bullets?: string[];
    table?: { caption: string; headers: string[]; rows: string[][] };
  }>;
  faqs: Array<{ q: string; a: string }>;
  sources: Array<{ label: string; href: string }>;
  related: Array<{ label: string; href: string }>;
  closing: string;
  bookingLabel?: string;
};

/** Small, deliberately limited rich text format for reviewed editorial copy. */
function Copy({ text }: { text: string }) {
  return text.split(/(\[[^\]]+\]\([^\s)]+\)|\*\*[^*]+\*\*)/g).map((part, index) => {
    const link = /^\[([^\]]+)\]\(([^\s)]+)\)$/.exec(part);
    if (link && /^(?:https:\/\/|\/(?!\/))/.test(link[2])) {
      return (
        <Link key={index} href={link[2]} className="underline underline-offset-2">
          {link[1]}
        </Link>
      );
    }
    if (part.startsWith("**") && part.endsWith("**"))
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    return <Fragment key={index}>{part}</Fragment>;
  });
}

function plainCopy(text: string) {
  return text.replace(/\[([^\]]+)\]\([^\s)]+\)/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1");
}

export function seoGuideMetadata(data: SeoGuideData): Metadata {
  const path = data.path ?? `/guides/${data.slug}`;
  return {
    title: { absolute: data.metaTitle },
    description: data.description,
    alternates: { canonical: path },
    openGraph: pageOpenGraph({ title: data.metaTitle, description: data.description, path }),
    twitter: pageTwitter({ title: data.metaTitle, description: data.description, path }),
  };
}

export function SeoGuidePage({ data }: { data: SeoGuideData }) {
  const path = data.path ?? `/guides/${data.slug}`;
  const reviewed = data.reviewed ?? "2026-11-05";
  const medicare = data.scope !== "general";
  const hub = path.startsWith("/wealth/")
    ? { name: "Money education", path: "/wealth" }
    : { name: "Guides", path: "/guides" };
  const schemas = [
    articleJsonLd({
      headline: data.title,
      description: data.description,
      path,
      datePublished: data.published ?? reviewed,
      dateModified: reviewed,
    }),
    breadcrumbJsonLd([{ name: "Home", path: "/" }, hub, { name: data.title, path }]),
    ...(data.faqs.length
      ? [faqJsonLd(data.faqs.map(({ q, a }) => ({ q: plainCopy(q), a: plainCopy(a) })))]
      : []),
  ];
  return (
    <main className="bg-white text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas).replace(/</g, "\\u003c") }}
      />
      <article className="measure-prose app-shell max-w-4xl py-12 sm:py-16">
        <nav aria-label="Breadcrumb" className="text-15 mb-6">
          <Link href="/" className="underline">
            Home
          </Link>{" "}
          /{" "}
          <Link href={hub.path} className="underline">
            {hub.name}
          </Link>
        </nav>
        <p className="text-15 font-semibold">
          {medicare ? "Medicare explained" : "Money and insurance explained"}
        </p>
        <h1 className="text-40 mt-3 font-semibold">{data.title}</h1>
        <p className="text-19 mt-6 leading-relaxed">
          <Copy text={data.answer} />
        </p>
        <MedicareByline reviewed={reviewed} scope={medicare ? "medicare" : "general"} />
        {!medicare ? (
          <p className="text-15 leading-relaxed">
            Educational information, not personalized tax, legal, or investment advice.
          </p>
        ) : null}
        <nav
          aria-label="On this page"
          className="my-8 rounded-xl border border-gray-300 bg-[var(--color-paper)] p-5"
        >
          <p className="font-semibold">On this page</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            {data.sections.map((section, index) => (
              <li key={section.title}>
                <a href={`#section-${index + 1}`} className="underline underline-offset-2">
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {data.sections.map((section, index) => (
          <section id={`section-${index + 1}`} key={section.title} className="mt-10 scroll-mt-24">
            <h2 className="text-28 font-semibold">{section.title}</h2>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph} className="text-17 mt-4 leading-relaxed">
                <Copy text={paragraph} />
              </p>
            ))}
            {section.bullets?.length ? (
              <ul className="text-17 mt-4 list-disc space-y-3 pl-6 leading-relaxed">
                {section.bullets.map((item) => (
                  <li key={item}>
                    <Copy text={item} />
                  </li>
                ))}
              </ul>
            ) : null}
            {section.table ? (
              <div className="mt-6 overflow-x-auto">
                <ResponsiveTable className="w-full border-collapse text-left text-base">
                  <caption className="mb-3 text-left font-semibold">
                    {section.table.caption}
                  </caption>
                  <thead>
                    <tr>
                      {section.table.headers.map((header) => (
                        <th key={header} scope="col" className="border-b-2 p-3 align-top">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row) => (
                      <tr key={row[0]}>
                        {row.map((cell, cellIndex) =>
                          cellIndex === 0 ? (
                            <th
                              key={cellIndex}
                              scope="row"
                              className="border-b p-3 align-top font-semibold"
                            >
                              <Copy text={cell} />
                            </th>
                          ) : (
                            <td key={cellIndex} className="border-b p-3 align-top">
                              <Copy text={cell} />
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </ResponsiveTable>
              </div>
            ) : null}
          </section>
        ))}
        {data.faqs.length ? (
          <section className="mt-12">
            <h2 className="text-28 font-semibold">Common questions</h2>
            <dl className="mt-6 space-y-6">
              {data.faqs.map(({ q, a }) => (
                <div key={q}>
                  <dt className="text-19 font-semibold">{q}</dt>
                  <dd className="text-17 mt-2 leading-relaxed">
                    <Copy text={a} />
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}
        <section className="mt-12">
          <h2 className="text-28 font-semibold">Sources and further reading</h2>
          <p className="text-15 mt-3">
            Reviewed {formatArticleDate(reviewed)}. Check the official source and your own documents
            for later changes.
          </p>
          <ul className="mt-4 list-disc space-y-3 pl-6">
            {data.sources.map(({ label, href }) => (
              <li key={href}>
                <a href={href} className="underline underline-offset-2">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </section>
        {data.related.length ? (
          <nav aria-label="Related reading" className="mt-10">
            <h2 className="text-28 font-semibold">Keep reading</h2>
            <ul className="mt-4 list-disc space-y-3 pl-6">
              {data.related.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="underline underline-offset-2">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
        <aside
          className="mt-12 rounded-xl border border-gray-300 bg-[var(--color-paper)] p-6"
          aria-label="Ask Christian"
        >
          <h2 className="text-28 font-semibold">Talk through your questions</h2>
          <p className="text-17 mt-4 leading-relaxed">
            <Copy text={data.closing} />
          </p>
          <p className="mt-5">
            <TrackedLink href={ENGINE_BOOKING_URL} className="btn" ctaLocation="page_close">
              {data.bookingLabel ?? "Book a free 45-minute phone review"}
            </TrackedLink>
          </p>
          <p className="text-15 mt-4">No obligation to enroll or buy.</p>
        </aside>
        <div className="mt-10">
          <ComplianceDisclosure variant={medicare ? "medicare" : "general"} />
        </div>
        <p className="text-15 mt-6">
          Educational information only. For help with an insurance question, call{" "}
          <a href={AGENT.phoneHref} className="underline">
            (919) 408-6671
          </a>
        </p>
      </article>
    </main>
  );
}
