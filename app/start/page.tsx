import type { Metadata } from "next";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";

import { HelpQuiz } from "./HelpQuiz";

export const metadata: Metadata = {
  title: "What can I help you sort out?",
  description:
    "Two questions about Medicare, retirement income, or life insurance, and you’ll have a real answer. Christian Brinkley, a licensed agent in Greensboro, follows up personally.",
  alternates: { canonical: "/start" },
};

export default function StartPage() {
  return (
    <main className="bg-[var(--color-paper)] text-[var(--color-navy)]">
      <section className="app-shell py-10 md:py-14">
        <HelpQuiz />
        <div className="mx-auto w-full max-w-[640px]">
          <ComplianceDisclosure variant="medicare" />
        </div>
      </section>
    </main>
  );
}
