import type { Metadata } from "next";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { breadcrumbJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";
import { SERVICE_AREA_LABEL } from "@/lib/triad";

import { HelpQuiz } from "./HelpQuiz";

export const metadata: Metadata = {
  title: "Get a Personal Medicare and Coverage Review",
  description:
    "Answer a few questions about Medicare, life insurance, or retirement timing. A local licensed agent personally reviews your situation.",
  alternates: { canonical: "/start" },
  openGraph: pageOpenGraph({
    title: "Get a personal Medicare and coverage review",
    description:
      "Share your situation and get a personal review from a Greensboro-based licensed agent.",
    path: "/start",
  }),
  twitter: pageTwitter({
    title: "Get a personal Medicare and coverage review",
    description:
      "Share your situation and get a personal review from a Greensboro-based licensed agent.",
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
            Get a clear second set of eyes
          </h1>
          <p className="text-18 mt-3 leading-relaxed text-[var(--color-paper)]/90">
            Choose your situation, answer a few focused questions, and review the key considerations
            before deciding whether to schedule a conversation.
          </p>
          <ul className="text-16 mt-5 flex flex-col gap-2 text-[var(--color-paper)]/80">
            <li>Licensed in North Carolina · master&apos;s student at UNCG</li>
            <li>Personal review from one local licensed agent</li>
            <li>Free consultation · no obligation</li>
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
