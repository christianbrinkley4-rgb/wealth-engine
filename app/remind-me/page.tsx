import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { AGENT } from "@/lib/agent";

import { RemindMeForm } from "./RemindMeForm";

export const metadata: Metadata = {
  title: "Remind me when my Medicare window opens",
  description:
    "Not turning 65 for a while? Give me the month and I'll email you before your seven-month sign-up window opens. One email, no newsletter, no sales calls.",
  alternates: { canonical: "/remind-me" },
  openGraph: {
    title: "Remind me when my Medicare window opens",
    description:
      "One email, sent a couple of weeks before your enrollment window opens. Nothing else.",
    url: "/remind-me",
    type: "website",
  },
};

export default function RemindMePage() {
  return (
    <main className="bg-[var(--color-paper)] text-[var(--color-navy)]">
      <section className="app-shell max-w-[680px] py-10 md:py-14">
        <p className="text-[13px] font-medium tracking-[0.12em] text-[var(--color-gold-ink)] uppercase">
          No cost · no obligation
        </p>
        <h1 className="mt-3 text-[32px] leading-tight font-bold tracking-tight text-balance md:text-[38px]">
          I&apos;ll tell you when your window opens.
        </h1>
        <p className="mt-4 text-[19px] leading-relaxed text-[var(--color-ink-muted)]">
          Most people who find this site aren&apos;t ready to decide anything — they turn 65 next
          spring, or their annual window is months away. The mistake that costs money isn&apos;t
          picking the wrong plan, it&apos;s missing the date. So give me the month and I&apos;ll
          email you before it matters.
        </p>

        <div className="mt-8">
          <RemindMeForm />
        </div>

        <div className="mt-10 rounded-xl border border-gray-300 bg-white p-6">
          <h2 className="text-[20px] font-semibold text-[var(--color-navy)]">
            What you&apos;ll actually get
          </h2>
          <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-[17px] leading-relaxed text-[var(--color-ink-muted)]">
            <li>A confirmation now, with my phone number in case something comes up sooner.</li>
            <li>
              One email a couple of weeks before your window opens, with the dates and the two or
              three rules worth knowing before you decide.
            </li>
            <li>
              Nothing else. No newsletter, no drip sequence, and I don&apos;t pass your address to
              anyone.
            </li>
          </ul>
        </div>

        <p className="mt-8 text-center text-[17px] text-[var(--color-ink-muted)]">
          Would rather ask a question now?{" "}
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
