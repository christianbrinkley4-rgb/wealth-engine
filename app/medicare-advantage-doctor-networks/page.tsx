import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { LeadCluster } from "@/app/components/LeadCluster";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, howToJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * SEO article: "Can I Keep My Doctor? How to Check Medicare Advantage Networks
 * in Guilford and Forsyth Counties". Target query: keep my doctor medicare
 * advantage nc.
 *
 * This is the Triad-specific companion to /keep-my-doctor (the general
 * how-to-check guide). The angle here: our health systems contract with
 * different plans, counties have different plan lists, and "my neighbor's
 * plan" is a shaky basis for choosing yours.
 */

export const metadata: Metadata = {
  title: {
    absolute:
      "Can I Keep My Doctor? Checking Medicare Advantage Networks in Guilford & Forsyth Counties",
  },
  description:
    '"My doctor takes Medicare" isn\'t the same as "in my plan\'s network." How to verify your doctors for a Medicare Advantage plan in Greensboro, High Point, and Winston-Salem.',
  alternates: { canonical: "/medicare-advantage-doctor-networks" },
  openGraph: pageOpenGraph({
    title:
      "Can I keep my doctor? Checking Medicare Advantage networks in Guilford & Forsyth counties",
    description:
      "The trap that catches people every fall — and the five steps that make sure your doctors are actually in your plan's network.",
    path: "/medicare-advantage-doctor-networks",
  }),
};

const STEPS = [
  {
    t: "Get the plan's provider directory — the current one",
    b: "Every Medicare Advantage plan publishes a directory of in-network doctors. Use the one for the plan year you're enrolling in (2027, during this fall's Annual Enrollment), not last year's. Directories change.",
  },
  {
    t: "Search the directory yourself",
    b: "Look up each of your doctors by name — your primary care physician and every specialist you see regularly. Don't stop at the practice name; confirm the individual doctor.",
  },
  {
    t: "Call the plan and confirm",
    b: 'Directories have errors. It happens more than anyone admits. Call the plan\'s member services number and ask directly: "Is Dr. [Name] in-network for [exact plan name] in 2027?" Write down the date, the name of the person you spoke with, and what they said.',
  },
  {
    t: "Call your doctor's office and confirm from their side",
    b: "Ask the front desk: \"Do you participate in [exact plan name] for 2027?\" Bring the plan's full name, not just the insurance company's name — one company sells many plans with different networks.",
  },
  {
    t: "Recheck every fall",
    b: "Networks change during Annual Enrollment. A doctor who was in-network this year can leave a network next year. This check isn't one-and-done; it's part of your annual review.",
  },
] as const;

const FAQ = [
  {
    q: 'My doctor says they "take Medicare." Am I covered?',
    a: "If you have Original Medicare, generally yes. If you have (or are considering) a Medicare Advantage plan, not necessarily — you need to confirm they're in that specific plan's network.",
  },
  {
    q: "What happens if I see an out-of-network doctor on a Medicare Advantage plan?",
    a: "It depends on the plan type. HMO plans typically don't cover out-of-network care except emergencies. PPO plans usually cover it but at a higher cost to you. Check your plan's documents — or ask me and we'll look together.",
  },
  {
    q: "Do provider networks change every year?",
    a: "They can. Plans renegotiate contracts with doctors and hospitals annually, which is why the network check belongs in your fall review every single year.",
  },
  {
    q: "I have Original Medicare with a Medigap plan. Do I need to worry about networks?",
    a: "Much less. Any provider that accepts Medicare assignment takes Original Medicare, nationwide. That's one of the structural differences between Original Medicare and Medicare Advantage.",
  },
  {
    q: "Can you check my doctors for me?",
    a: "Yes — bring your doctor list to a free review and we'll verify each one against the plans you're considering.",
  },
] as const;

export default function DoctorNetworksPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Annual enrollment 2026", path: "/aep" },
              {
                name: "Doctor networks",
                path: "/medicare-advantage-doctor-networks",
              },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline:
                "Can I Keep My Doctor? How to Check Medicare Advantage Networks in Guilford and Forsyth Counties",
              description:
                'Why "takes Medicare" and "in my plan\'s network" are different things — and five steps to verify your doctors before you enroll.',
              path: "/medicare-advantage-doctor-networks",
              datePublished: "2026-09-19",
              dateModified: "2026-09-19",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            howToJsonLd({
              name: "How to check whether your doctors are in a Medicare Advantage plan's network",
              description:
                "Five verification steps: the plan directory, the plan's member services, and your doctor's office — checked from both sides.",
              path: "/medicare-advantage-doctor-networks",
              steps: STEPS.map((step) => ({ name: step.t, text: step.b })),
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Annual enrollment 2026", href: "/aep" },
          { name: "Doctor networks" },
        ]}
        eyebrow="Guilford & Forsyth counties · Piedmont Triad"
        title="Can I keep my doctor?"
        lede="It's the first question almost everyone asks me — and it's the right one. But the answer has a trap in it, and the trap catches people every fall during Annual Enrollment."
        secondaryHref="/schedule?topic=medicare"
        secondaryLabel="Check my doctors with me →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <p className="text-17 leading-relaxed text-[var(--color-ink-muted)]">
            Here it is: <strong>“my doctor takes Medicare”</strong> and{" "}
            <strong>“my doctor is in my plan&apos;s network”</strong> are two different things. A
            doctor can accept Medicare patients generally and still not be in-network for your
            specific Medicare Advantage plan. If you enroll based on the first statement and the
            reality is the second, you find out at the worst possible moment.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            I&apos;m Christian Brinkley, a licensed Medicare agent in Greensboro. Here&apos;s how I
            tell folks across Guilford and Forsyth counties to check properly — before they enroll,
            not after. Want the general step-by-step?{" "}
            <Link href="/keep-my-doctor" className="underline underline-offset-2">
              Read the full keep-your-doctor guide
            </Link>
            .
          </p>

          <h2 className="text-28 mt-12 font-semibold">The two things you have to verify</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              <strong>1. Does the doctor accept Medicare?</strong> Most doctors do. This is the easy
              question and usually a yes.
            </p>
            <p>
              <strong>
                2. Is the doctor in-network for the specific plan you&apos;re considering?
              </strong>{" "}
              This is the question that matters for Medicare Advantage. Advantage plans have
              networks — lists of doctors and hospitals they&apos;ve contracted with. Go out of
              network and you may pay more, or the plan may not cover the visit at all (depending on
              the plan type).
            </p>
            <p>
              With Original Medicare plus a supplement, the picture is simpler: any doctor that
              accepts Medicare assignment takes it, anywhere in the country. That&apos;s one of the
              genuine tradeoffs between the two paths —{" "}
              <Link href="/advantage-vs-medigap" className="underline underline-offset-2">
                here&apos;s how Advantage and Medigap compare
              </Link>{" "}
              — and it&apos;s worth understanding before you choose.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">How to actually check (5 steps)</h2>
          <ol className="mt-8 flex flex-col gap-6">
            {STEPS.map((item, index) => (
              <li key={item.t} className="flex gap-5 border-t border-gray-300 pt-5">
                <span className="text-18 flex size-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)] font-bold text-[var(--color-paper)]">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-20 font-semibold">{item.t}</h3>
                  <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                    {item.b}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Why this matters more in the Triad</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Greensboro, High Point, and Winston-Salem are served by large health systems — Cone
              Health, Atrium Health Wake Forest Baptist, Novant Health — and each contracts with
              different Medicare Advantage plans. That means the network question here isn&apos;t
              abstract: the hospital you&apos;d go to in an emergency and the specialists your
              neighbors recommend may sit in different plans&apos; networks.
            </p>
            <p>
              It&apos;s also why county matters. Medicare Advantage and Part D plans are sold by
              county — Greensboro and most of High Point are in Guilford County, Winston-Salem is in
              Forsyth County, and the plan lists can differ. We check the plans available at your
              home address, not your neighbor&apos;s.
            </p>
            <p>
              Which brings up the shakiest way to pick a plan: “my neighbor loves hers.” Your
              neighbor sees different doctors, takes different prescriptions, and goes to different
              facilities. The right plan is the one whose network includes <em>your</em> doctors —
              which is exactly what the five steps above verify.
            </p>
          </div>

          <h2 className="text-28 mt-12 font-semibold">What I&apos;d do in your shoes</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              If keeping your current doctors is your top priority, start there and work backward:
              confirm who&apos;s in-network first, then compare costs among the plans that pass the
              test. If you&apos;re flexible on doctors and focused on total cost, run the numbers
              first —{" "}
              <Link href="/medicare-costs" className="underline underline-offset-2">
                here&apos;s what Medicare costs
              </Link>{" "}
              — and then verify the network. Either order works. Skipping the network check
              doesn&apos;t.
            </p>
            <p>
              And if this feels like a lot of phone calls: that&apos;s genuinely part of what I do.
              When folks sit down with me for a fall review —{" "}
              <Link href="/aep" className="underline underline-offset-2">
                book one here
              </Link>{" "}
              — we check their doctors together. It&apos;s free, and it&apos;s one of the
              highest-value 30 minutes in the whole process. You can also{" "}
              <Link href="/annual-enrollment" className="underline underline-offset-2">
                review the full annual enrollment guide
              </Link>{" "}
              for everything else the fall window covers.
            </p>
            <p>
              Call or text me at {AGENT.phone}, Monday–Saturday 8:00–7:00 — you&apos;ll reach me,
              not a call center.
            </p>
          </div>

          <h2 className="text-28 mt-12 font-semibold">Common questions</h2>
          <dl className="mt-8 flex flex-col gap-7">
            {FAQ.map((item) => (
              <div key={item.q} className="border-t border-gray-300 pt-6">
                <dt className="text-19 font-semibold">{item.q}</dt>
                <dd className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                  {item.q === "Can you check my doctors for me?" ? (
                    <>
                      Yes —{" "}
                      <Link
                        href="/schedule?topic=medicare"
                        className="underline underline-offset-2"
                      >
                        bring your doctor list to a free review
                      </Link>{" "}
                      and we&apos;ll verify each one against the plans you&apos;re considering. Call
                      or text {AGENT.phone}.
                    </>
                  ) : (
                    item.a
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }}
          />
          <GuideTownLinks />
          <LeadCluster
            current="/medicare-advantage-doctor-networks"
            heading="More Medicare help, or book your review"
          />
        </div>
      </section>

      <KitchenTableClose
        heading="Let's check your doctors together"
        body="Bring your doctor list to a free review — in person around Greensboro or by phone — and we'll verify each one against the plans you're considering."
        href="/schedule?topic=medicare"
        label="Book my free review →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
