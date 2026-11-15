import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { AGENT } from "@/lib/agent";
import { breadcrumbJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";

import { IntakeForm } from "./IntakeForm";

/**
 * Public appointment prep form, for a person who already has an appointment.
 *
 * Christian sends the link. The page is not a search page, so it is noindex
 * and is not in app/sitemap.ts. Links on it may be followed.
 *
 * The form's answers are sent by email only. See app/api/prep-intake/route.ts.
 */

const PATH = "/appointment-prep";
const title = "Get Ready for Your Appointment | Christian Brinkley";
const description =
  "If you have an appointment with Christian Brinkley, send your medicines, doctors, pharmacy and questions before you meet. Sent by email. Not saved on this website.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: PATH },
  robots: { index: false, follow: true },
  openGraph: pageOpenGraph({ title: "Get ready for your appointment", description, path: PATH }),
  twitter: pageTwitter({ title: "Get ready for your appointment", description }),
};

const P = "text-17 mt-3 leading-relaxed";

export default function AppointmentPrepPage() {
  return (
    <main className="pb-16 text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Get ready for your appointment", path: PATH },
            ]),
          ),
        }}
      />

      <header className="app-shell max-w-3xl py-6">
        <nav aria-label="Breadcrumb" className="text-15">
          <Link href="/" className="underline underline-offset-2">
            Home
          </Link>{" "}
          / Get ready for your appointment
        </nav>
        <h1 className="text-32 mt-4 font-semibold">Get ready for your appointment</h1>
        <p className="text-18 mt-4 leading-relaxed">
          If you have an appointment with me, you can send me your list before we meet. I will
          have your medicines, your doctors, and your pharmacy in front of me. Then we can use our
          time for your questions.
        </p>
        <p className={P}>
          This form is optional. You can skip it and bring your list with you. Our appointment is
          at no cost to you, with no obligation.
        </p>

        <div className="mt-5 rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-5">
          <p className="text-18 font-semibold">What happens to this form</p>
          <ul className="text-17 mt-2 list-disc space-y-1 pl-5 leading-relaxed">
            <li>It is sent to me by email, and to no one else.</li>
            <li>This website does not save your answers.</li>
            <li>I use your answers only to prepare for your appointment.</li>
          </ul>
        </div>

        <p className={P}>
          Do you not have an appointment yet? Call me at{" "}
          <a href={AGENT.phoneHref} className="font-semibold underline underline-offset-2">
            {AGENT.phone}
          </a>{" "}
          or{" "}
          <Link href="/start?topic=medicare" className="underline underline-offset-2">
            send me a question
          </Link>
          .
        </p>
      </header>

      <div className="app-shell max-w-3xl">
        <IntakeForm />
      </div>

      <div className="app-shell max-w-3xl" style={{ marginTop: "2rem" }}>
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
