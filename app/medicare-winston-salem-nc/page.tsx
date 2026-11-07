import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { LocationBusinessMarkup } from "@/app/components/LocationBusinessMarkup";
import { MedicareByline } from "@/app/components/MedicareByline";
import { RelatedMedicareGuides } from "@/app/components/RelatedMedicareGuides";
import { ServiceHero } from "@/app/components/ServiceHero";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  pageOpenGraph,
  pageTwitter,
  serviceJsonLd,
} from "@/lib/seo";

const path = "/medicare-winston-salem-nc";
const title = "Medicare Winston-Salem NC | Local Help from Christian Brinkley";
const description =
  "Medicare Winston-Salem NC help from a licensed local agent. 2026 costs, enrollment dates, and free, no-obligation reviews in person or by phone.";
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: pageOpenGraph({ title, description, path }),
  twitter: pageTwitter({ title, description }),
};

const FAQ = [
  {
    q: "Do I need a local agent, or can I sign up on my own?",
    a: "You can sign up on your own. You do not need an agent. Some people like having someone local to walk through their options, answer questions, and check their doctors with them. It is up to you.",
  },
  {
    q: "What does a review with Christian cost?",
    a: "Nothing. A review is free, and there is no obligation to enroll in anything.",
  },
  {
    q: "When is Medicare open enrollment?",
    a: "The Annual Enrollment Period runs October 15 through December 7. Changes take effect January 1. If you are turning 65, you have a separate 7-month Initial Enrollment Period around your birthday month.",
  },
  {
    q: "Can I keep my doctors?",
    a: "It depends on the plan. Networks can differ by county and can change from year to year. Always check your own doctors against a plan for the year you are considering.",
  },
  {
    q: "What if I live outside Winston-Salem?",
    a: "I also serve Greensboro, High Point, Burlington, Kernersville, Clemmons, and Lewisville. Anywhere else in North Carolina, we can do your review by phone.",
  },
] as const;

export default function MedicareWinstonSalemPage() {
  return (
    <main className="text-[var(--color-navy)]">
      {[
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Medicare in Winston-Salem", path },
        ]),
        articleJsonLd({
          headline: title,
          description,
          path,
          datePublished: "2026-11-07",
          dateModified: "2026-11-07",
        }),
        serviceJsonLd({ name: "Free Medicare consultation in Winston-Salem", description, path }),
        faqJsonLd(FAQ),
      ].map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
        />
      ))}
      <LocationBusinessMarkup path={path} />
      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Medicare in Winston-Salem" }]}
        eyebrow="Winston-Salem and Forsyth County"
        title="Medicare Winston-Salem NC"
        lede="Medicare is federal, but the help around it can be local. Free Medicare help in Winston-Salem, NC from Christian Brinkley, a licensed local insurance agent. Meet at home or talk by phone. No obligation to enroll."
        secondaryHref="/start?topic=medicare&quick=1"
        secondaryLabel="Request a free Medicare conversation"
      />
      <MedicareByline reviewed="2026-11-07" />

      <section className="measure-prose app-shell max-w-3xl py-8">
        <h2 className="text-28 font-semibold">Medicare in Winston-Salem at a Glance</h2>
        <p className="text-18 mt-4">
          Medicare is a federal program. The rules are the same here as they are in any other state.
          But the help around it can be local, and that matters when you are sorting through your
          choices. The{" "}
          <Link href="/medicare-agent-winston-salem-nc" className="underline underline-offset-2">
            Medicare agent in Winston-Salem
          </Link>{" "}
          page carries the Forsyth County plan numbers and the Atrium and Novant doctor check.
        </p>
        <p className="text-17 mt-4 leading-relaxed">
          I am Christian Brinkley, a licensed NC insurance agent based in Greensboro. I work with
          people who are getting close to 65 and people who are already on Medicare.
        </p>
        <p className="text-17 mt-4 leading-relaxed">
          We can meet at your home, somewhere nearby, or talk by phone. Whatever is easiest for you.
          A review with me is free. There is no obligation to enroll in anything. If you want help
          from a local agent, start with the{" "}
          <Link href="/medicare-agent-winston-salem-nc" className="underline underline-offset-2">
            Medicare agent in Winston-Salem guide
          </Link>
          .
        </p>
      </section>

      <section className="measure-prose app-shell max-w-3xl py-8">
        <h2 className="text-28 font-semibold">What Medicare Costs in 2026</h2>
        <p className="text-18 mt-4">
          Some Medicare costs are set nationally. That means they are the same in North Carolina as
          anywhere else.
        </p>
        <p className="text-17 mt-4 leading-relaxed">
          The standard Part B premium for 2026 is $202.90 a month. The Part B deductible is $283 a
          year.
        </p>
        <p className="text-17 mt-4 leading-relaxed">
          If you have Part D drug coverage, there is a cap on what you pay out of pocket. In 2026,
          that cap is $2,100. These numbers are a good starting point. Your own costs will depend on
          the coverage you choose.{" "}
          <Link href="/medicare-costs-2026" className="underline underline-offset-2">
            See every 2026 Medicare cost
          </Link>
          .
        </p>
      </section>

      <section className="measure-prose app-shell max-w-3xl py-8">
        <h2 className="text-28 font-semibold">When You Can Enroll</h2>
        <p className="text-17 mt-4 leading-relaxed">
          If you are turning 65, you get a 7-month Initial Enrollment Period. It starts 3 months
          before your birthday month, includes your birthday month, and runs 3 months after.{" "}
          <Link href="/turning-65" className="underline underline-offset-2">
            Find your enrollment dates
          </Link>
          .
        </p>
        <p className="text-17 mt-4 leading-relaxed">
          If you already have Medicare, there is the Annual Enrollment Period. It runs October 15
          through December 7 each year. Changes you make during Annual Enrollment take effect
          January 1.{" "}
          <Link href="/aep" className="underline underline-offset-2">
            Read the Annual Enrollment guide
          </Link>
          .
        </p>
      </section>

      <section className="measure-prose app-shell max-w-3xl py-8">
        <h2 className="text-28 font-semibold">Doctors and Hospitals in Winston-Salem</h2>
        <p className="text-17 mt-4 leading-relaxed">
          Medicare Advantage plan availability and networks can differ by county. Winston-Salem is
          in Forsyth County. Greensboro is in Guilford County. So what is available to you depends
          on where you live.
        </p>
        <p className="text-17 mt-4 leading-relaxed">
          Most doctors in Winston-Salem work within one of two systems: Atrium Health Wake Forest
          Baptist or Novant Health. Atrium Health Wake Forest Baptist Medical Center is at 1
          Medical Center Boulevard. Novant Health Forsyth Medical Center is at 3333 Silas Creek
          Parkway. Medicare plans do not treat those two systems the same way, and that can change
          from one year to the next. A plan might include both systems, one of them, or only some
          of their doctors.
        </p>
        <p className="text-17 mt-4 leading-relaxed">
          Original Medicare, alone or with a Medicare Supplement, works with any doctor or hospital
          that accepts Medicare, including both systems. Medicare Advantage plans use networks, so
          check the hospital and each of your doctors by name for next year. Here is how to check
          each system:{" "}
          <Link
            href="/guides/atrium-wake-forest-baptist-medicare-doctors"
            className="underline underline-offset-2"
          >
            Atrium Health Wake Forest Baptist doctors
          </Link>{" "}
          and{" "}
          <Link
            href="/guides/novant-health-medicare-doctors"
            className="underline underline-offset-2"
          >
            Novant Health doctors
          </Link>
          .
        </p>
        <p className="text-17 mt-4 leading-relaxed">
          People here often see specialists in Greensboro or High Point too. List those offices
          separately. Always check your own doctors against a plan for the year you are
          considering. Networks can change, so do not assume last year&apos;s answer still holds.
        </p>
      </section>

      <section className="measure-prose app-shell max-w-3xl py-8">
        <h2 className="text-28 font-semibold">Local Help in Winston-Salem</h2>
        <p className="text-17 mt-4 leading-relaxed">
          Free SHIIP counseling is available in Forsyth County. The Shepherd&apos;s Center of
          Greater Winston-Salem has hosted SHIIP counseling during open enrollment. You can also
          call SHIIP statewide at 1-855-408-1212, Monday through Friday.
        </p>
        <p className="text-17 mt-4 leading-relaxed">
          I meet at your home anywhere in Forsyth County, including Clemmons, Lewisville, Rural
          Hall, Walkertown, and Pfafftown, or at a public spot you choose. Family members are
          welcome to sit in.
        </p>
      </section>

      <section className="measure-prose app-shell max-w-3xl py-8">
        <h2 className="text-28 font-semibold">Towns I Serve</h2>
        <p className="text-17 mt-4 leading-relaxed">
          I am based in Greensboro, but I also work with people in{" "}
          <Link href="/medicare-agent-winston-salem-nc" className="underline underline-offset-2">
            Winston-Salem
          </Link>
          ,{" "}
          <Link href="/medicare-agent-high-point-nc" className="underline underline-offset-2">
            High Point
          </Link>
          ,{" "}
          <Link href="/medicare-agent-burlington-nc" className="underline underline-offset-2">
            Burlington
          </Link>
          , and{" "}
          <Link href="/medicare-agent-kernersville-nc" className="underline underline-offset-2">
            Kernersville
          </Link>
          .
        </p>
        <p className="text-17 mt-4 leading-relaxed">
          I serve Granville County too, including{" "}
          <Link href="/medicare-agent-granville-county-nc" className="underline underline-offset-2">
            Creedmoor, Oxford, and Butner
          </Link>
          . If you live somewhere else in North Carolina, that is fine. Phone reviews work the same
          anywhere in the state.
        </p>
      </section>

      <section className="measure-prose app-shell max-w-3xl py-8">
        <h2 className="text-28 font-semibold">Questions about Medicare in Winston-Salem</h2>
        {FAQ.map((item) => (
          <div key={item.q} className="mt-6">
            <h3 className="text-20 font-semibold">{item.q}</h3>
            <p className="text-17 mt-2">{item.a}</p>
          </div>
        ))}
        <p className="text-16 mt-6">
          This page is for educational purposes only. To talk it through, call{" "}
          <a href="tel:+19194086671" className="underline underline-offset-2">
            (919) 408-6671
          </a>{" "}
          or request a free review at{" "}
          <Link href="/aep" className="underline underline-offset-2">
            christianbrinkleync.com/aep
          </Link>
          .
        </p>
      </section>

      <RelatedMedicareGuides />
      <KitchenTableClose
        heading="Bring your Medicare questions"
        body="I will go through your doctors, prescriptions, and coverage options with you. Free, with no obligation to enroll."
        href="/start?topic=medicare&quick=1"
        label="Request a free conversation"
      />
      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
