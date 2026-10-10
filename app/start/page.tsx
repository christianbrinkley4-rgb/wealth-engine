import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { breadcrumbJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";
import { SERVICE_AREA_LABEL } from "@/lib/triad";

import { HelpQuiz } from "./HelpQuiz";
import { AGENT } from "@/lib/agent";

export const metadata: Metadata = {
  title: "Get a Personal Medicare and Coverage Review",
  description:
    "Tell us about your situation and get a personal review from Christian Brinkley, a licensed local agent. Free, no call center, no pressure.",
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

export default async function StartPage({
  searchParams,
}: {
  searchParams: Promise<{ quick?: string; topic?: string }>;
}) {
  const params = await searchParams;
  const quickMedicare = params.quick === "1" && params.topic === "medicare";
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: "Get started", path: "/start" }])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: ["main h1", "main h1 + p"],
            },
          }),
        }}
      />
      <section
        className={`bg-[var(--color-navy)] text-[var(--color-paper)] ${quickMedicare ? "py-5 md:py-6" : "py-7 md:py-12"}`}
      >
        <div className="mx-auto max-w-[640px] px-4">
          <p className="text-13 font-medium tracking-[0.12em] text-[var(--color-gold)] uppercase">
            {SERVICE_AREA_LABEL}
          </p>
          <h1 className="font-heading text-28 md:text-32 mt-2 leading-tight font-bold">
            {quickMedicare
              ? "Personal Medicare help in the Triad"
              : "Request your free consultation"}
          </h1>
          <p className="text-18 mt-3 leading-relaxed text-[var(--color-paper)]/90">
            {quickMedicare
              ? "Ask a question or request a coverage review. Your note goes directly to Christian. No cost, no obligation."
              : "Tell me what matters to you. We can meet at home, nearby, by phone, or by video. No cost and no obligation."}
          </p>
          {!quickMedicare ? (
            <p className="text-16 mt-3 text-[var(--color-paper)]/80">
              Licensed agent · {AGENT.licenseLine} · One local agent, not a call center
            </p>
          ) : null}
        </div>
      </section>
      <section
        className={`bg-[var(--color-paper)] ${quickMedicare ? "py-6 md:py-8" : "py-10 md:py-14"}`}
      >
        <div className="app-shell">
          <Suspense fallback={<p role="status">Loading your questions…</p>}>
            <HelpQuiz />
          </Suspense>
          <div className="mx-auto w-full max-w-[640px]">
            <ComplianceDisclosure variant="medicare" />
          </div>
          <div className="mx-auto mt-10 w-full max-w-[640px]">
            <h2 className="text-20 font-semibold text-[var(--color-ink-muted)]">
              Reading while you wait
            </h2>
            <ul className="mt-3 space-y-2 text-16 text-[var(--color-ink-muted)]">
              <li>
                <Link href="/turning-65" className="underline underline-offset-4">
                  Turning 65: the checklist
                </Link>
              </li>
              <li>
                <Link href="/medicare" className="underline underline-offset-4">
                  Medicare in Greensboro and the Triad
                </Link>
              </li>
              <li>
                <Link href="/annual-enrollment" className="underline underline-offset-4">
                  Annual enrollment, Oct 15 to Dec 7
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
