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
    absolute: "Medicare Agent in Stem, NC | Christian Brinkley",
  },
  description:
    "A Medicare agent for Stem, NC and Granville County. Free, no-pressure help from Christian Brinkley, a licensed North Carolina agent. Call (919) 408-6671.",
  alternates: { canonical: "/medicare-agent-stem-nc" },
  openGraph: pageOpenGraph({
    title: "Medicare Agent in Stem, NC | Christian Brinkley",
    description:
      "Free Medicare plan reviews for Stem and Granville County. A local licensed agent, not a call center.",
    path: "/medicare-agent-stem-nc",
  }),
  twitter: pageTwitter({
    title: "Medicare Agent in Stem, NC | Christian Brinkley",
    description:
      "Free Medicare plan reviews for Stem and Granville County. A local licensed agent, not a call center.",
    path: "/medicare-agent-stem-nc",
  }),
};

const FAQ = [
  {
    q: "Stem is a small town. Do you really come out this way?",
    a: "Yes. I already help folks in Creedmoor, Oxford, and Butner, and Stem completes the picture for Granville County. Small towns get skipped by most agents because the numbers are smaller. That is exactly why I show up. Phone, video, or in person, same as anywhere else.",
  },
  {
    q: "My doctors are in Oxford, and some are in Durham. Is that covered?",
    a: "It can be, but the county line is the thing to watch. You live in Granville County, so your plans are Granville County plans, while your doctors sit in Granville and Durham counties. A review checks every one of them against the plan's network. The drive is easy. The network question is the whole job.",
  },
  {
    q: "I never see anyone advertising Medicare help in Stem. Why is that?",
    a: "Because most marketing chases big zip codes. Stem is small, so the mailers and the call centers mostly skip it. That does not mean your Medicare questions are smaller. It means you get a local agent who actually answers his own phone instead of a national call center.",
  },
  {
    q: "Do you cover the rest of Granville County too?",
    a: "All of it. Creedmoor, Oxford, Butner, Stovall, Wilton, Berea, and Stem. If you are in Granville County, you are in my area.",
  },
] as const;

export default function MedicareAgentStemPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Service area", path: "/medicare-nc-towns" },
              { name: "Medicare agent in Stem, NC", path: "/medicare-agent-stem-nc" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medicare agent in Stem, NC, for Granville County's quiet corner.",
              description:
                "Plain-English Medicare help for Stem and Granville County from Christian Brinkley, a licensed insurance agent in North Carolina.",
              path: "/medicare-agent-stem-nc",
              datePublished: "2026-10-10",
              dateModified: "2026-10-10",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd({
              name: "Medicare plan review in Stem, NC",
              description:
                "A free, no-pressure Medicare plan review with a licensed local agent serving Stem and Granville County, NC.",
              path: "/medicare-agent-stem-nc",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }}
      />
      <LocationBusinessMarkup path="/medicare-agent-stem-nc" />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Service area", href: "/medicare-nc-towns" },
          { name: "Medicare agent in Stem, NC" },
        ]}
        eyebrow="Medicare agent · Stem and Granville County"
        title="Medicare Agent in Stem, NC"
        lede="Stem is one of Granville County's quiet towns: small, rural, and easy to overlook. Most Medicare marketing overlooks it too. But your healthcare doesn't care how big your town is. Your doctors are in Oxford or Durham, your hospital is a drive away, and your questions deserve the same real answers as anyone's. I'm Christian Brinkley, a licensed insurance agent in North Carolina. I help folks in Stem and across Granville County understand their Medicare options in plain English. Free, no pressure, and yes, I really do come out this way."
        secondaryHref="/plan-check"
        secondaryLabel="Take the plan-fit quiz →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Medicare in Stem: Granville County&apos;s Quiet Corner</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Stem&apos;s size is the whole point of this page. The national call
              centers don&apos;t market here. The mailers mostly skip you. And yet your
              Medicare situation is just as real as anyone&apos;s: a GP in Oxford,
              maybe a specialist in Durham, prescriptions to keep track of, and a plan
              that changes its details every year whether you notice or not.
            </p>
            <p>
              The county-line question matters more in a town like Stem than in a big
              city. You live in Granville County. Some of your doctors are in Durham
              County. Plans are built by county, so the review has to check your actual
              doctors against your actual plan, not assume the next county over is
              covered the same way.
            </p>
            <p>
              And here&apos;s something small towns have going for them: when you call
              me, you get me. No phone tree, no &ldquo;your call is important to
              us.&rdquo; Twenty minutes, your questions, straight answers.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Where I can Meet</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              <strong>Your home, or a Granville County library branch.</strong>{" "}In a
              town like Stem, meeting at your kitchen table is often the easiest
              option, and I&apos;m happy to do it. If you&apos;d rather meet in
              public, the county&apos;s library branches work well.
            </p>
            <p>
              <strong>Senior programs in Granville County.</strong> The county has
              programs and gathering spots for older adults. Worth knowing about
              whether or not you ever meet with me. Small towns take care of their own, and
              these programs are part of that.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Annual Enrollment: October 15 to December 7</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              October 15 through December 7, every year. Your plan&apos;s Annual Notice
              of Change arrives by September 30. When your doctors span two counties,
              the network pages of that letter are the ones to read carefully. I
              explain how to read the ANOC on my{" "}
              <Link href="/anoc" className="underline underline-offset-2">
                ANOC page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What a Free Review Covers</h2>
          <ul className="text-17 mt-4 space-y-3 leading-relaxed text-[var(--color-ink-muted)]">
            <li>Your current coverage and what you&apos;re paying</li>
            <li>Your Oxford and Durham doctors, all checked against the plan&apos;s network</li>
            <li>Your prescription costs under the new plan details</li>
            <li>Whatever&apos;s been confusing you, explained straight</li>
          </ul>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            Phone, video, or in person at your home. Folks from{" "}
            <Link href="/medicare-creedmoor-nc" className="underline underline-offset-2">
              Creedmoor
            </Link>
            ,{" "}
            <Link href="/medicare-oxford-nc" className="underline underline-offset-2">
              Oxford
            </Link>
            ,{" "}
            <Link href="/medicare-butner-nc" className="underline underline-offset-2">
              Butner
            </Link>
            , and everywhere in Granville County are welcome.
          </p>
        </div>
      </section>



      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Common Questions in Stem</h2>
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
            I also help folks in{" "}
            <Link href="/medicare-creedmoor-nc" className="underline underline-offset-2">
              Creedmoor
            </Link>
            ,{" "}
            <Link href="/medicare-oxford-nc" className="underline underline-offset-2">
              Oxford
            </Link>
            , and{" "}
            <Link href="/medicare-butner-nc" className="underline underline-offset-2">
              Butner
            </Link>
            . And here&apos;s{" "}
            <Link href="/medicare-nc-towns" className="underline underline-offset-2">
              the full list of towns I serve
            </Link>
            .
          </p>
        </div>
      </section>

      <KitchenTableClose
        heading="From a neighbor, not a call center"
        body="About twenty minutes, free, and you'll actually understand your options. If your plan is already fine, I'll tell you so."
        href="/start?topic=medicare&quick=1"
        label="Request a free review →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
      <MedicareByline reviewed="2026-10-10" />
      <RelatedMedicareGuides />
    </main>
  );
}
