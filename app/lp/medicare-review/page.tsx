import type { Metadata } from "next";
import { EngineContact } from "@/components/EngineContact";
import { ENGINE_BOOKING_URL } from "@/lib/leadEnginePublic";
import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import "@/app/lead-engine.css";
export const metadata: Metadata = {
  title: "Medicare Review in Greensboro | Christian Brinkley",
  description:
    "Bring your Medicare questions to Christian Brinkley, a licensed NC insurance agent in Greensboro. Request a call or choose a time.",
  alternates: { canonical: "/lp/medicare-review" },
  robots: { index: false, follow: false },
};
export default function MedicareReview() {
  return (
    <div className="engine shell">
      <header className="engine-heading">
        <p className="engine-eyebrow">Local Medicare help. Greensboro and the Piedmont Triad.</p>
        <h1>I’m 21. Let’s make sense of your Medicare questions.</h1>
        <p>
          Bring your plan letter, doctor list, and prescription questions. We can check what to
          review for the year ahead.
        </p>
        <a className="engine-button" href="tel:+19194086671">
          Call (919) 408-6671
        </a>
        <p>No cost for the conversation. No obligation to enroll.</p>
      </header>
      <div className="engine-grid">
        <EngineContact />
        <aside className="engine-card">
          <h2>Prefer to pick a time?</h2>
          <p>
            Use my calendar to choose a time to talk about Medicare. A callback request and a
            calendar booking are separate.
          </p>
          <a className="engine-button" href={ENGINE_BOOKING_URL}>
            Open my Medicare calendar
          </a>
          <h2>What we&apos;ll talk through</h2>
          <ol>
            <li>Your questions and what matters to you.</li>
            <li>Where to check doctors, prescriptions, and costs.</li>
            <li>Your enrollment timing and what needs a closer look.</li>
          </ol>
          <p>
            Have a family member join if you&apos;d like. Please keep Medicare and Social Security
            numbers off this form.
          </p>
          <a href="/aep-checklist">Read the Medicare review checklist</a>
        </aside>
      </div>
      <ComplianceDisclosure variant="medicare" />
      <p>
        <a href="tel:+19194086671">(919) 408-6671</a>
      </p>
      <a className="engine-call" href="tel:+19194086671">
        Call Christian: (919) 408-6671
      </a>
    </div>
  );
}
