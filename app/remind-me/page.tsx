import type { Metadata } from "next";

import { pageOpenGraph } from "@/lib/seo";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { AGENT } from "@/lib/agent";

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
    <main className="bg-[var(--color-paper)] text-[var(--color-navy)]">
      <section className="measure-prose app-shell max-w-[680px] py-10 md:py-14">
        <p className="text-13 font-medium tracking-[0.12em] text-[var(--color-gold-ink)] uppercase">
          No cost · no obligation
        </p>
        <h1 className="text-32 md:text-38 mt-3 leading-tight font-bold tracking-tight text-balance">
          Your Medicare dates, and a reminder if you want one.
        </h1>
        <p className="text-19 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
          Most people who find this site aren’t ready to decide anything — they turn 65 next spring,
          or their annual window is months away. The mistake that costs money isn’t picking the
          wrong plan, it’s missing the date. Pick the month you turn 65 and your dates appear below
          right away, with no email needed. Whether I remind you nearer the time is up to you.
        </p>

        <div className="mt-8">
          <RemindMeForm />
        </div>

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

        <p className="text-17 mt-8 text-center text-[var(--color-ink-muted)]">
          Would you rather ask a question now?{" "}
          <Link href="/start" className="font-medium text-[var(--color-navy)] underline">
            Start here
          </Link>{" "}
          or call{" "}
          <a href={AGENT.phoneHref} className="font-medium text-[var(--color-navy)] underline">
            {AGENT.phone}
          </a>
          .
        </p>

        <ComplianceDisclosure variant="medicare" />
      </section>
    </main>
  );
}
