import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { ARTICLES } from "@/lib/articles";
import { breadcrumbJsonLd, pageOpenGraph } from "@/lib/seo";

const description =
  "Plain answers to the Medicare questions Triad neighbors ask me most. Original Medicare, Medigap, nursing home costs, and turning 65.";

export const metadata: Metadata = {
  title: { absolute: "Medicare Questions, Answered | Christian Brinkley" },
  description,
  alternates: { canonical: "/answers" },
  openGraph: pageOpenGraph({
    title: "Medicare Questions, Answered",
    description,
    path: "/answers",
  }),
};

export default function AnswersIndexPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Answers", path: "/answers" },
            ]),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Answers" }]}
        eyebrow="Greensboro, High Point & Winston-Salem"
        title="Medicare questions, answered"
        lede="These come from real questions neighbors ask me. Each answer is short, written in plain English, and checked against Medicare.gov."
        secondaryHref="/start?topic=medicare"
        secondaryLabel="Ask me your question →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <ul className="flex flex-col gap-8">
            {ARTICLES.map((article) => (
              <li key={article.slug} className="border-t border-gray-300 pt-6">
                <h2 className="text-24 font-semibold">
                  <Link href={`/answers/${article.slug}`} className="underline underline-offset-2">
                    {article.title}
                  </Link>
                </h2>
                <p className="text-18 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                  {article.lede}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <KitchenTableClose
        heading="Have a different question?"
        body="Ask it. The consultation is no cost, with no obligation to enroll."
        href="/start?topic=medicare"
        label="Request a consultation →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
