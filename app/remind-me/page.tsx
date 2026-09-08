import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { AGENT } from "@/lib/agent";
import { breadcrumbJsonLd, pageOpenGraph, serviceJsonLd } from "@/lib/seo";
import { SERVICE_AREA_LABEL } from "@/lib/triad";

import { RemindMeForm } from "./RemindMeForm";

export const metadata: Metadata = {
  title: { absolute: "Medicare Enrollment Window Reminder — Greensboro" },
  description:
    "Not turning 65 for a while? Give me the month and I will email you before your seven-month sign-up window opens. One email, no newsletter, no sales calls.",
  alternates: { canonical: "/remind-me" },
  openGraph: pageOpenGraph({
    title: "Remind me when my Medicare window opens",
    description:
      "One email, sent a couple of weeks before your enrollment window opens. Nothing else.",
    path: "/remind-me",
  }),
};

export default function RemindMePage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Remind me", path: "/remind-me" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd({
              name: "Medicare enrollment window reminder",
              description:
                "One email before your Initial Enrollment Period opens. No newsletter, no sales drip.",
              path: "/remind-me",
            }),
          ),
        }}
      />

      <section className="bg-[var(--color-navy)] py-10 text-[var(--color-paper)] md:py-14">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 px-4 md:grid-cols-[3fr_2fr] md:gap-14">
          <div>
            <p className="text-13 font-medium tracking-[0.12em] text-[var(--color-gold)] uppercase">
              {SERVICE_AREA_LABEL} · no cost · no obligation
            </p>
            <h1 className="text-32 md:text-38 mt-3 leading-tight font-semibold tracking-tight text-balance">
              Your Medicare dates, and a reminder if you want one.
            </h1>
            <p className="text-19 mt-4 max-w-xl leading-relaxed text-[var(--color-paper)]/85">
              Most people who find this site aren’t ready to decide anything — they turn 65 next
              spring, or their annual window is months away. The mistake that costs money isn’t
              picking the wrong plan, it’s missing the date.
            </p>
            <p className="text-16 mt-5 text-[var(--color-paper)]/70">
              One email from me, not a call center. Or call{" "}
              <a
                href={AGENT.phoneHref}
                className="font-semibold text-[var(--color-paper)] underline"
              >
                {AGENT.phone}
              </a>{" "}
              if the window is already open.
            </p>
          </div>
          <figure className="m-0 md:ml-auto md:max-w-[280px]">
            <Image
              src="/christian-brinkley.jpg"
              alt={`${AGENT.name}, licensed insurance agent in Greensboro, North Carolina`}
              width={1200}
              height={1600}
              priority
              sizes="(max-width: 768px) 100vw, 280px"
              className="w-full rounded-2xl border border-white/15 object-cover shadow-[0_18px_50px_rgba(0,0,0,0.28)]"
            />
            <figcaption className="text-16 mt-4 leading-snug">
              <span className="text-18 block font-semibold">{AGENT.name}</span>
              <span className="block text-[var(--color-paper)]/75">
                Licensed insurance agent · {AGENT.city}, {AGENT.state}
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-10 md:py-14">
        <div className="measure-prose mx-auto max-w-[680px] px-4">
          <RemindMeForm />

          <div className="mt-10 rounded-xl border border-gray-300 bg-white p-6">
            <h2 className="text-20 font-semibold text-[var(--color-navy)]">
              What you’ll actually get
            </h2>
            <ul className="text-17 mt-3 flex list-disc flex-col gap-2 pl-5 leading-relaxed text-[var(--color-ink-muted)]">
              <li>A confirmation now, with my phone number in case something comes up sooner.</li>
              <li>
                One email a couple of weeks before your window opens, with the dates and the two or
                three rules worth knowing before you decide.
              </li>
              <li>
                Nothing else. No newsletter, no drip sequence, and I don’t pass your address to
                anyone.
              </li>
            </ul>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={AGENT.phoneHref}
              className="text-18 inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[var(--color-navy)] px-8 font-semibold text-[var(--color-paper)]"
            >
              <Phone className="size-5 shrink-0" aria-hidden />
              {AGENT.phone}
            </a>
            <Link
              href="/start?topic=medicare"
              className="text-18 inline-flex min-h-14 items-center justify-center rounded-xl border-2 border-[var(--color-navy)] px-8 font-semibold text-[var(--color-navy)]"
            >
              Ask a question now →
            </Link>
          </div>

          <ComplianceDisclosure variant="medicare" />
        </div>
      </section>
    </main>
  );
}
