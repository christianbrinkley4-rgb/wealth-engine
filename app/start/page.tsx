import type { Metadata } from "next";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { breadcrumbJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";
import { SERVICE_AREA_LABEL } from "@/lib/triad";

import { HelpQuiz } from "./HelpQuiz";

export const metadata: Metadata = {
  title: "What can I help you figure out?",
  description:
    "Two questions about turning 65, annual enrollment, life insurance, or retirement income. A licensed Greensboro agent follows up in person — kitchen table, not a call center.",
  alternates: { canonical: "/start" },
  openGraph: pageOpenGraph({
    title: "What can I help you figure out?",
    description:
      "Turning 65, annual enrollment, life insurance, or retirement income — two questions, then a real answer from a Greensboro agent.",
    path: "/start",
  }),
  twitter: pageTwitter({
    title: "What can I help you figure out?",
    description:
      "Turning 65, annual enrollment, life insurance, or retirement income — two questions, then a real answer from a Greensboro agent.",
  }),
};

export default function StartPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: "Get started", path: "/start" }])),
        }}
      />
      <section className="bg-[var(--color-navy)] py-10 text-[var(--color-paper)] md:py-12">
        <div className="mx-auto max-w-[640px] px-4">
          <p className="text-13 font-medium tracking-[0.12em] text-[var(--color-gold)] uppercase">
            {SERVICE_AREA_LABEL}
          </p>
          <h1 className="font-heading text-28 md:text-32 mt-2 leading-tight font-bold">
            What can I help you figure out?
          </h1>
          <p className="text-18 mt-3 leading-relaxed text-[var(--color-paper)]/90">
            Turning 65, annual enrollment, life insurance, or retirement income — one tap, then a
            real answer from a local agent. Kitchen table, not a call center. No cost, nothing to
            sign.
          </p>
          <ul className="text-16 mt-5 flex flex-col gap-2 text-[var(--color-paper)]/80">
            <li>Licensed in North Carolina · master&apos;s student at UNCG</li>
            <li>Your information is never sold</li>
            <li>Usually same-day follow-up</li>
          </ul>
        </div>
      </section>
      <section className="bg-[var(--color-paper)] py-10 md:py-14">
        <div className="app-shell">
          <HelpQuiz />
          <div className="mx-auto w-full max-w-[640px]">
            <ComplianceDisclosure variant="medicare" />
          </div>
        </div>
      </section>
    </main>
  );
}
