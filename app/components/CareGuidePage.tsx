import type { Metadata } from "next";
import Link from "next/link";
import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { CARE_GUIDES, careGuide } from "@/lib/careGuides";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  pageOpenGraph,
  serviceJsonLd,
} from "@/lib/seo";

export function careGuideMetadata(slug: string): Metadata {
  const guide = careGuide(slug);
  return {
    title: { absolute: guide.title },
    description: guide.description,
    alternates: { canonical: `/${slug}` },
    openGraph: pageOpenGraph({
      title: guide.title,
      description: guide.description,
      path: `/${slug}`,
    }),
  };
}

export function CareGuidePage({ slug }: { slug: string }) {
  const guide = careGuide(slug);
  const path = `/${slug}`;
  const request = `/start?topic=care_coverage&stage=${guide.focus}`;
  const label = guide.title.split(" in ")[0];
  return (
    <main className="text-[var(--color-navy)]">
      {[
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Care coverage", path: "/care-coverage" },
          { name: label, path },
        ]),
        articleJsonLd({
          headline: guide.title,
          description: guide.description,
          path,
          datePublished: "2026-09-10",
          dateModified: "2026-09-10",
        }),
        serviceJsonLd({ name: `${label} consultation`, description: guide.description, path }),
        faqJsonLd(guide.faq),
      ].map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Care coverage", href: "/care-coverage" },
          { name: label },
        ]}
        eyebrow={`${label} · Greensboro and the Triad`}
        title={guide.headline}
        lede={guide.introduction}
        secondaryHref={request}
        secondaryLabel="Request a free consultation →"
        note="No cost. No obligation to buy. Policy terms and eligibility vary."
      />
      <div className="app-shell max-w-3xl py-10">
        <p className="text-16 leading-relaxed text-[var(--color-ink-muted)]">
          By{" "}
          <Link href="/about" className="underline underline-offset-4">
            {AGENT.name}
          </Link>
          , licensed insurance agent in North Carolina. Updated September 10, 2026.
        </p>
      </div>
      {guide.sections.map((section, index) => (
        <section
          key={section.heading}
          className={index % 2 === 0 ? "bg-white py-12" : "bg-[var(--color-paper)] py-12"}
        >
          <div className="measure-prose app-shell max-w-3xl">
            <h2 className="text-28 font-semibold">{section.heading}</h2>
            <p className="text-18 mt-4 leading-relaxed">{section.text}</p>
          </div>
        </section>
      ))}
      <section className="app-shell max-w-3xl py-12">
        <h2 className="text-28 font-semibold">Questions to bring to your consultation</h2>
        <ul className="text-18 mt-6 list-disc space-y-3 pl-6 leading-relaxed">
          {guide.questions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>
        <p className="text-18 mt-6 leading-relaxed">
          We can meet in Greensboro, High Point, Winston-Salem, or a nearby community. Bring any
          current policy you’d like to review. A spouse or family member is welcome.
        </p>
        <Link
          href="/service-area"
          className="text-18 mt-4 inline-block underline underline-offset-4"
        >
          See the communities I serve →
        </Link>
      </section>
      <section className="bg-white py-12">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Questions you may have</h2>
          <dl className="mt-6 space-y-7">
            {guide.faq.map((item) => (
              <div key={item.q} className="border-t border-gray-300 pt-5">
                <dt className="text-20 font-semibold">{item.q}</dt>
                <dd className="text-18 mt-3 leading-relaxed">{item.a}</dd>
              </div>
            ))}
          </dl>
          <h2 className="text-24 mt-12 font-semibold">Helpful resources</h2>
          <p className="text-17 mt-3 leading-relaxed">
            These resources explain general coverage questions. Your policy documents describe the
            benefits and requirements of a specific product.
          </p>
          <ul className="text-17 mt-4 space-y-3">
            {guide.sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} className="underline underline-offset-4">
                  {source.title}
                </a>
              </li>
            ))}
          </ul>
          <ComplianceDisclosure variant="general" />
        </div>
      </section>
      <KitchenTableClose
        heading="Let’s talk about what matters to your family."
        body="We can review your questions and current coverage together. Your insurance consultation is no cost, with no obligation to buy."
        href={request}
        label="Request a free consultation →"
      />
      <section className="app-shell max-w-3xl pb-12">
        <h2 className="text-24 font-semibold">More about care coverage</h2>
        <ul className="text-18 mt-4 space-y-3">
          {CARE_GUIDES.filter((item) => item.slug !== slug).map((item) => (
            <li key={item.slug}>
              <Link href={`/${item.slug}`} className="underline underline-offset-4">
                {item.title.split(" in ")[0]}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
