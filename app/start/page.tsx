import type { Metadata } from "next";
import { Suspense } from "react";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { AGENT } from "@/lib/agent";
import { breadcrumbJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";
import { SERVICE_AREA_LABEL } from "@/lib/triad";

import { HelpQuiz } from "./HelpQuiz";

export const metadata: Metadata = {
  title: "Get a Personal Medicare and Coverage Review",
  description:
    "Answer a few questions about Medicare, life insurance, or retirement timing. A local licensed agent personally reviews your situation.",
  alternates: { canonical: "/start" },
  robots: { index: false, follow: true },
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
      <section className="bg-[var(--color-navy)] py-7 text-[var(--color-paper)] md:py-12">
        <div className="mx-auto max-w-[640px] px-4">
          <p className="text-13 font-medium tracking-[0.12em] text-[var(--color-gold)] uppercase">
            {SERVICE_AREA_LABEL}
          </p>
          <h1 className="font-heading text-28 md:text-32 mt-2 leading-tight font-bold">
            Request your free consultation
          </h1>
          <p className="text-18 mt-3 leading-relaxed text-[var(--color-paper)]/90">
            Tell me what matters to you. We can meet at home, nearby, by phone, or by video. No cost
            and no obligation.
          </p>
          <p className="text-16 mt-3 text-[var(--color-paper)]/80">
            Licensed in North Carolina · {AGENT.education}
          </p>
        </div>
      </section>
      <section className="bg-[var(--color-paper)] py-10 md:py-14">
        <div className="app-shell">
          <Suspense fallback={<p role="status">Loading your questions…</p>}>
            <HelpQuiz />
          </Suspense>
          <div className="mx-auto w-full max-w-[640px]">
            <ComplianceDisclosure variant="medicare" />
          </div>
        </div>
      </section>
    </main>
  );
}
