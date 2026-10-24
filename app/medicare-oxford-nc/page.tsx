import { RelatedMedicareGuides } from "@/app/components/RelatedMedicareGuides";
import { MedicareByline } from "@/app/components/MedicareByline";
import { pageTwitter } from "@/lib/seo";
import type { Metadata } from "next";
import { LocationBusinessMarkup } from "@/app/components/LocationBusinessMarkup";
import Link from "next/link";


import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";

import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  pageOpenGraph,
  serviceJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Medicare Help in Oxford, NC | Christian Brinkley",
  },
  description:
    "Turning 65 or reviewing your Medicare plan in Oxford, NC? Free local help from Christian Brinkley, licensed NC agent. Call (919) 408-6671.",
  alternates: { canonical: "/medicare-oxford-nc" },
  openGraph: pageOpenGraph({
    title: "Medicare Help in Oxford, NC | Christian Brinkley",
    description:
      "Free, no-pressure Medicare plan reviews for Oxford and Granville County. A local licensed agent, not a call center.",
    path: "/medicare-oxford-nc",
  }),
  twitter: pageTwitter({
    title: "Medicare Help in Oxford, NC | Christian Brinkley",
    description:
      "Free, no-pressure Medicare plan reviews for Oxford and Granville County. A local licensed agent, not a call center.",
    path: "/medicare-oxford-nc",
  }),
};

const FAQ = [
  {
    q: "When is the Annual Enrollment Period?",
    a: "October 15 through December 7 every year. Changes you make take effect January 1.",
  },
  {
    q: "What is SHIIP, and should I use it?",
    a: "SHIIP stands for Seniors' Health Insurance Information Program. It's North Carolina's free, unbiased Medicare counseling service, and Granville County Senior Services offers it at 107 Lanier Street in Oxford. Yes, use it. Then talk to me too. There's no rule against getting two free opinions.",
  },
  {
    q: "Do you meet people in person?",
    a: "Yes. Phone and video work fine, but if you'd rather sit down face to face, I can meet at the library in Oxford or somewhere else convenient in Granville County.",
  },
  {
    q: "I live in Stovall (or Stem, or Butner). Do you help there too?",
    a: "Absolutely. I cover all of Granville County. Stovall, Stem, Butner, Creedmoor, Oxford, all of it.",
  },
] as const;

export default function MedicareOxfordPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Service area", path: "/medicare-nc-towns" },
              { name: "Medicare help in Oxford, NC", path: "/medicare-oxford-nc" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medicare help in Oxford, NC, from a local licensed agent.",
              description:
                "Plain-English Medicare help for Oxford and Granville County from Christian Brinkley, a licensed insurance agent in North Carolina.",
              path: "/medicare-oxford-nc",
              datePublished: "2026-10-04",
              dateModified: "2026-10-04",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd({
              name: "Medicare plan review in Oxford, NC",
              description:
                "A free, no-pressure Medicare plan review with a licensed local agent serving Oxford and Granville County, NC.",
              path: "/medicare-oxford-nc",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }}
      />
      <LocationBusinessMarkup path="/medicare-oxford-nc" />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Service area", href: "/medicare-nc-towns" },
          { name: "Medicare help in Oxford, NC" },
        ]}
        eyebrow="Medicare help · Oxford and Granville County"
        title="Medicare Help in Oxford, NC"
        lede="Oxford is the county seat of Granville County, and it feels like it. Downtown Main Street, the courthouse, folks who have lived here for decades and know their neighbors. If you're on Medicare here, or about to be, you deserve someone who actually knows the area and will sit down with your paperwork instead of rushing you through a script. I'm Christian Brinkley. I'm a licensed insurance agent in North Carolina, I live over in Creedmoor, and I help people across Granville County understand their Medicare options. The help is free. No cost, no pressure."
        secondaryHref="/plan-check"
        secondaryLabel="Take the plan-fit quiz →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Medicare in Oxford: What Locals Run Into</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Here&apos;s the thing about Oxford. You&apos;re close enough to Durham that a
              lot of folks see specialists there, but far enough that your plan&apos;s
              network actually matters. A plan that looks fine on paper can get expensive
              fast if your cardiologist or your pharmacy isn&apos;t in it.
            </p>
            <p>
              A lot of Oxford residents I talk to are in one of three spots. Turning 65 and
              sorting through the mail avalanche for the first time. Already on a plan and
              wondering why the drug costs changed. Or helping a parent figure it out, which
              is its own kind of stressful.
            </p>
            <p>
              One local advantage worth knowing: Granville County Senior Services, right at
              107 Lanier Street in Oxford, offers SHIIP counseling. That&apos;s the
              state&apos;s free, unbiased Medicare counseling program. It&apos;s a great
              starting point, and I&apos;m happy to be your second set of eyes after. Two
              free opinions beat one.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Local Resources Worth Knowing</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              <strong>Richard H. Thornton Library</strong>, 210 Main Street, Oxford. The main
              branch of the Granville County library system, right downtown. If you ever
              want to meet up and go through your ANOC letter together somewhere quiet, this
              is a solid spot. Easy Main Street parking.
            </p>
            <p>
              <strong>Granville County Senior Services</strong>, 107 Lanier Street, Oxford.
              The county&apos;s senior center, open weekdays. They run the SHIIP Medicare
              counseling mentioned above, plus fitness programs, meals, and transportation
              help. If you&apos;re 60 or older and haven&apos;t been in, it&apos;s worth a
              visit on its own merits.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Annual Enrollment: October 15 to December 7</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Every fall, Medicare Advantage and Part D plans can change their costs, their
              drug lists, and their networks for the next year. Your plan is supposed to
              mail you an Annual Notice of Change by September 30. Most people file it with
              the junk mail. Don&apos;t.
            </p>
            <p>
              The review takes twenty minutes. I look at what changed, check your doctors
              and your prescriptions against the new details, and you go into January
              knowing where you stand. If your plan is still the right fit, I&apos;ll tell
              you that. I explain the ANOC letter in plain English on my{" "}
              <Link href="/anoc" className="underline underline-offset-2">
                ANOC page
              </Link>{" "}
              too.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What a Free Review Covers</h2>
          <ul className="text-17 mt-4 space-y-3 leading-relaxed text-[var(--color-ink-muted)]">
            <li>What you have now and what you pay for it</li>
            <li>Whether your doctors and pharmacy are covered next year</li>
            <li>What your prescriptions will cost under the new plan details</li>
            <li>
              Any questions you have, including the ones you think are dumb (they aren&apos;t)
            </li>
          </ul>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            You can do it by phone or video, or I can meet somewhere local like the Thornton
            Library. Folks from{" "}
            <Link href="/medicare-butner-nc" className="underline underline-offset-2">
              Butner
            </Link>{" "}
            and{" "}
            <Link href="/medicare-creedmoor-nc" className="underline underline-offset-2">
              Creedmoor
            </Link>{" "}
            usually come through Oxford for this too. Whatever&apos;s easiest for you.
          </p>
        </div>
      </section>



      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Common Questions in Oxford</h2>
          <div className="text-17 mt-6 space-y-6 leading-relaxed text-[var(--color-ink-muted)]">
            {FAQ.map((item) => (
              <div key={item.q}>
                <h3 className="text-20 font-semibold">{item.q}</h3>
                <p className="mt-2">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <p className="text-17 leading-relaxed text-[var(--color-ink-muted)]">
            I&apos;m based in Granville County, so meeting up around Oxford is easy. Here&apos;s{" "}
            <Link href="/medicare-nc-towns" className="underline underline-offset-2">
              the full list of towns I serve
            </Link>
            .
          </p>
        </div>
      </section>

      <KitchenTableClose
        heading="From Granville County, for Granville County"
        body="About twenty minutes, free, and you'll actually understand your options. No call centers, just me."
        href="/start?topic=medicare&quick=1"
        label="Request a free review →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
      <MedicareByline reviewed="2026-10-04" />
      <RelatedMedicareGuides />
    </main>
  );
}
