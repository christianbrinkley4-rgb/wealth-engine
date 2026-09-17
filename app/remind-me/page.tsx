import type { Metadata } from "next";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { MedicareTimeline } from "@/components/MedicareTimeline";
import { breadcrumbJsonLd, pageOpenGraph } from "@/lib/seo";
import { SERVICE_AREA_LABEL } from "@/lib/triad";

export const metadata: Metadata = {
  title: { absolute: "Find and Save Your Medicare Enrollment Dates" },
  description:
    "Find your estimated Medicare enrollment dates and save them to your calendar. No contact information needed. Personal help is available if you have questions.",
  alternates: { canonical: "/remind-me" },
  robots: { index: false, follow: true },
  openGraph: pageOpenGraph({
    title: "Keep your Medicare dates handy",
    description:
      "A free tool to help you find your enrollment dates and save them to your calendar.",
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
              { name: "Your Medicare dates", path: "/remind-me" },
            ]),
          ),
        }}
      />
      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Your Medicare dates" }]}
        eyebrow={SERVICE_AREA_LABEL}
        title="Keep your Medicare dates handy."
        lede="If you’re planning ahead for 65, knowing your enrollment dates is a helpful place to start. Use the free tool below to find your estimated dates, then save them to your calendar or print a copy."
        secondaryHref="#enrollment-dates"
        secondaryLabel="Find my dates →"
        note="No name, email, or phone number needed to use the tool."
      />
      <section id="enrollment-dates" className="personal-section personal-shell">
        <div className="personal-section-heading">
          <div>
            <p className="personal-eyebrow">PLAN AHEAD AT YOUR OWN PACE</p>
            <h2>When do you turn 65?</h2>
            <p className="personal-body">
              You can add these dates to your own calendar and choose a reminder there. If you
              already have Medicare or will keep coverage through work, I can help you understand
              which enrollment rules apply to you.
            </p>
          </div>
        </div>
        <MedicareTimeline currentYear={new Date().getUTCFullYear()} />
        <ComplianceDisclosure variant="medicare" />
      </section>
      <KitchenTableClose
        heading="Have a question about your dates?"
        body="We can review your timing and current coverage together. Your consultation is no cost, with no obligation to enroll."
        href="/start?topic=medicare"
        label="Ask a Medicare question →"
      />
    </main>
  );
}
