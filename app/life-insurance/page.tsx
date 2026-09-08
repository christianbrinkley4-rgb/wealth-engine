import type { Metadata } from "next";
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
import { FeaturedPlaceCards, ServiceAreaTownList } from "@/app/components/ServiceAreaTownList";
import { LeadCluster } from "@/app/components/LeadCluster";
import { SERVICE_AREA_LABEL, SERVICE_AREA_LEDE } from "@/lib/triad";

/**
 * Life insurance, organised around the only question that decides it.
 *
 * The market is saturated with pages comparing term against whole life as
 * though it were a matter of preference. It is not: it is a question of how
 * many more years the money is needed for, and once that is answered the
 * product mostly picks itself. Leading with that is both more useful and more
 * quotable than another comparison table.
 */

export const metadata: Metadata = {
  title: { absolute: "Life Insurance in Greensboro, NC — Kitchen-Table Review" },
  description:
    "A licensed Greensboro agent will sit down and read your policy with you at no cost. Term or permanent comes down to how long the money is needed — not to what someone wants to sell.",
  alternates: { canonical: "/life-insurance" },
  openGraph: pageOpenGraph({
    title: "Life insurance, reviewed at your kitchen table in Greensboro",
    description:
      "The one question that settles term against permanent, and what to check on the policy you already have. No call center.",
    path: "/life-insurance",
  }),
};

const FAQ = [
  {
    q: "Term or whole life?",
    a: "It comes down to how many more years the money needs to be there. If the need ends — a mortgage paid off, a spouse reaching their own pension or Social Security — term coverage for exactly that long is usually the honest answer. If it doesn’t end, permanent coverage exists for that, and it costs a good deal more. Both are legitimate. It’s the mismatch between them that costs people money.",
  },
  {
    q: "I have coverage through work. Is that enough?",
    a: "Find out exactly what happens to it when the job ends. Group coverage usually ends with the job, and it’s rarely portable at a price worth paying. It’s the most common gap I find at retirement — somebody thinks they’re covered, and the coverage left with the badge.",
  },
  {
    q: "How much do I need?",
    a: "Start from what would actually have to get paid, not a multiple of your income. The mortgage balance. The years until your spouse’s own benefits start. What a funeral runs around here. Whether anybody depends on you. That math usually lands somewhere well away from what a calculator tells you.",
  },
  {
    q: "I am in my sixties. Is it too late?",
    a: "No, but the price goes up every year, and a change in health can take options off the table completely. That isn’t a sales line, it’s how underwriting works. It’s also why waiting is the expensive choice in this one case.",
  },
  {
    q: "What should I check on the policy I already have?",
    a: "Two things, and both take five minutes. Who the beneficiary is — that form decides who gets paid, it overrides your will, and an ex-spouse still listed there still gets the money. And when the coverage actually ends, because term policies hold their price for a set number of years and then climb fast.",
  },
  {
    q: "Do you charge for a review?",
    a: "No. A good share of them end with me telling somebody what they’ve got is fine. That’s a real answer, and it takes about twenty minutes — at your kitchen table, a coffee shop, or on the phone.",
  },
  {
    q: "Do you meet in Greensboro, High Point, and Winston-Salem?",
    a: "Yes — and in the towns within about 30 minutes of downtown Greensboro. Kernersville, Summerfield, Jamestown, Oak Ridge, Archdale, and the rest. Kitchen table, a coffee shop, or the phone. Same person either way, and nothing to sign first.",
  },
] as const;

export default function LifeInsurancePage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Life insurance", path: "/life-insurance" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Life insurance in Greensboro, decided by how long the money is needed",
              description:
                "The question that settles term against permanent, and what to check on an existing policy.",
              path: "/life-insurance",
              datePublished: "2026-08-25",
              dateModified: "2026-08-25",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd({
              name: "Life insurance review",
              description:
                "Kitchen-table review of existing coverage anywhere about 30 minutes from downtown Greensboro. No cost, no obligation to buy.",
              path: "/life-insurance",
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Life insurance" }]}
        eyebrow={SERVICE_AREA_LABEL}
        title="Life insurance comes down to one question, and it is not which product."
        lede="How many more years does the money need to be there? Answer that honestly and the product mostly picks itself. I’ll sit down at your kitchen table and read what you already have — at no cost, and with no obligation to buy anything."
        secondaryHref="/start?topic=life_insurance"
        secondaryLabel="Ask a question first →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">If the need ends</h2>
          <p className="text-18 mt-4 leading-relaxed">
            A mortgage with eleven years left. A spouse who reaches their own Social Security at 67.
            A child who finishes school in six years. Those are needs with an end date. Term
            coverage for exactly that long is the honest answer — you’re insuring a stretch of time,
            so pay for a stretch of time.
          </p>
          <h2 className="text-28 mt-10 font-semibold">If it does not</h2>
          <p className="text-18 mt-4 leading-relaxed">
            Final expenses. A disabled adult child. A tax bill that shows up whenever you do. Those
            don’t expire, and permanent coverage exists for them. It costs a good deal more, and
            that isn’t a trick. You’re buying a longer promise.
          </p>
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Both are legitimate products. People lose money in the mismatch between them, and it’s
            usually the person selling who creates it, not the person buying.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">If you already have a policy, check two things</h2>
          <ol className="mt-6 flex flex-col gap-5 text-[18px] leading-relaxed">
            <li>
              <strong>Who the beneficiary is.</strong> That form controls who receives the money and
              it overrides your will. An ex-spouse still named there is still paid. This is the most
              common and most avoidable problem I find.
            </li>
            <li>
              <strong>When it ends.</strong> Term policies are level for a set number of years and
              then the price climbs steeply. Knowing your exact end date is the whole ballgame, and
              it is printed on the policy.
            </li>
          </ol>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            Neither one means buying anything, and neither one needs me. But if you’d rather
            somebody read it with you, that’s twenty minutes and it doesn’t cost anything.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Questions people ask me</h2>
          <dl className="mt-8 flex flex-col gap-7">
            {FAQ.map((item) => (
              <div key={item.q} className="border-t border-gray-300 pt-6">
                <dt className="text-19 font-semibold">{item.q}</dt>
                <dd className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }}
          />
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">
            I sit down within 30 minutes, not on a national queue
          </h2>
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {SERVICE_AREA_LEDE} Life insurance is not sold by county the way Medicare Advantage is.
            What changes by town is who is across the table.
          </p>
          <FeaturedPlaceCards
            hrefFor={(place) => `/life-insurance-in/${place.slug}`}
            labelFor={(place) => `Life insurance in ${place.name}`}
          />
          <p className="text-13 mt-8 font-medium tracking-[0.1em] text-[var(--color-gold-ink)] uppercase">
            Also within about 30 minutes
          </p>
          <ServiceAreaTownList hrefFor={(place) => `/life-insurance-in/${place.slug}`} />
          <p className="text-17 mt-6">
            <Link href="/service-area" className="underline underline-offset-2">
              Every town in the service area →
            </Link>
          </p>
          <LeadCluster
            current="/life-insurance"
            heading="Medicare and retirement, same kitchen table"
          />
        </div>
      </section>

      <KitchenTableClose
        heading="Want someone to read your policy with you?"
        body="Bring what you’ve got. Twenty minutes at your kitchen table or on the phone, no charge, and a fair chance the answer is that you’re already fine."
        href="/start?topic=life_insurance"
        label="Start here →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure />
      </div>
    </main>
  );
}
