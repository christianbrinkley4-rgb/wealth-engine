import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideCapture } from "@/app/components/GuideCapture";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";
import { findTrafficGuide, TRAFFIC_GUIDES, TRAFFIC_GUIDE_DATE } from "@/lib/trafficGuides";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return TRAFFIC_GUIDES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = findTrafficGuide((await params).slug);
  if (!guide) notFound();
  return {
    title: { absolute: guide.title },
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: pageOpenGraph({
      title: guide.title,
      description: guide.description,
      path: `/guides/${guide.slug}`,
    }),
  };
}

export default async function TrafficGuidePage({ params }: Props) {
  const guide = findTrafficGuide((await params).slug);
  if (!guide) notFound();
  const path = `/guides/${guide.slug}`;
  const schemas = [
    articleJsonLd({
      headline: guide.title,
      description: guide.description,
      path,
      datePublished: TRAFFIC_GUIDE_DATE,
      dateModified: TRAFFIC_GUIDE_DATE,
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Guides", path: "/guides" },
      { name: guide.title, path },
    ]),
    faqJsonLd(guide.faqs),
  ];
  return (
    <main className="bg-white text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas).replace(/</g, "\\u003c") }}
      />
      <article className="measure-prose app-shell max-w-4xl py-14">
        <nav aria-label="Breadcrumb" className="text-15 mb-6">
          <Link href="/" className="underline">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/guides" className="underline">
            Guides
          </Link>
        </nav>
        <p className="text-15">
          {guide.scope === "medicare"
            ? "Triad, North Carolina"
            : "Federal rules for readers across the U.S."}
        </p>
        <h1 className="text-40 mt-3 font-semibold">{guide.title}</h1>
        <p className="text-15 mt-4">
          By{" "}
          <Link href="/about" className="underline">
            Christian Brinkley
          </Link>
          . Reviewed October 8, 2026.
        </p>
        <aside
          aria-label="Quick answer"
          className="mt-8 rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-6"
        >
          <h2 className="text-19 font-semibold">The quick answer</h2>
          <p className="text-17 mt-2 leading-relaxed">{guide.answer}</p>
        </aside>
        <p className="text-15 mt-6 leading-relaxed">
          Educational information only, not personalized tax, legal, or investment advice. Christian
          is a licensed insurance agent (NC Life &amp; Health), not a CPA or registered investment
          adviser. Discuss your own situation with a qualified professional.
        </p>
        {guide.sections.map((section) => (
          <section key={section.title} className="mt-10">
            <h2 className="text-28 font-semibold">{section.title}</h2>
            <p className="text-17 mt-4 leading-relaxed">{section.body}</p>
          </section>
        ))}
        <div className="mt-10 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base">
            <caption className="mb-4 text-left font-semibold">{guide.comparison.caption}</caption>
            <thead>
              <tr>
                {guide.comparison.headers.map((heading) => (
                  <th key={heading} scope="col" className="border-b-2 p-3">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {guide.comparison.rows.map(([label, value]) => (
                <tr key={label}>
                  <th scope="row" className="border-b p-3 align-top font-semibold">
                    {label}
                  </th>
                  <td className="border-b p-3 align-top">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <section className="mt-10">
          <h2 className="text-28 font-semibold">Your records checklist</h2>
          <ol className="text-17 mt-4 list-decimal space-y-3 pl-6">
            {guide.checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </section>
        <section className="mt-10">
          <h2 className="text-28 font-semibold">Common questions</h2>
          <dl className="mt-4 space-y-6">
            {guide.faqs.map(({ q, a }) => (
              <div key={q}>
                <dt className="text-19 font-semibold">{q}</dt>
                <dd className="text-17 mt-2 leading-relaxed">{a}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section className="mt-10">
          <h2 className="text-28 font-semibold">Sources and current instructions</h2>
          <p className="text-17 mt-3">
            Check the tax year and any later updates before acting. These are the primary sources
            used for this guide.
          </p>
          <ul className="mt-4 list-disc space-y-3 pl-6">
            {guide.sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} className="underline underline-offset-2">
                  {source.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
        <nav aria-label="Related guides" className="mt-10">
          <h2 className="text-28 font-semibold">Keep reading</h2>
          <ul className="mt-4 list-disc space-y-3 pl-6">
            <li>
              <Link
                href={guide.scope === "medicare" ? "/medicare" : "/wealth"}
                className="underline"
              >
                {guide.scope === "medicare"
                  ? "Medicare help in the Triad"
                  : "Money education and tools"}
              </Link>
            </li>
            {guide.related.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="underline">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <aside className="mt-10">
          <GuideCapture />
        </aside>
        <aside className="mt-10 rounded-xl bg-[var(--color-paper)] p-6">
          <h2 className="text-28 font-semibold">Have an insurance question?</h2>
          <p className="text-17 mt-3">
            If this brings up an insurance question, you can{" "}
            <Link href="/start" className="underline">
              start a conversation with Christian
            </Link>
            . No obligation to enroll or buy.
          </p>
          <address className="text-17 mt-4 not-italic">
            Christian Brinkley · Greensboro, NC ·{" "}
            <a href={AGENT.phoneHref} className="underline">
              (919) 408-6671
            </a>
            <br />
            NC Life &amp; Health
          </address>
        </aside>
        <div className="mt-10">
          <ComplianceDisclosure variant={guide.scope === "medicare" ? "medicare" : "general"} />
        </div>
      </article>
    </main>
  );
}
