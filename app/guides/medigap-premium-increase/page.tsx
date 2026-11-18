import { MedicareByline } from "@/app/components/MedicareByline";
import { pageTwitter } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { GuideCapture } from "@/app/components/GuideCapture";
import { StandaloneRelatedLinks } from "@/app/components/StandaloneRelatedLinks";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * Why did my Medicare Supplement premium increase?
 *
 * Rate figures are national averages from KFF, not company rates. No company
 * names. The NC underwriting point follows NCDOI's Medicare supplement
 * guidance.
 */

const PATH = "/guides/medigap-premium-increase";

export const metadata: Metadata = {
  title: {
    absolute: "Why Did My Medicare Supplement Premium Increase?",
  },
  description: "Medicare Supplement rate increases are normal. Why your premium went up, whether it rises with age, and what you can do in NC before you cancel anything.",
  alternates: { canonical: PATH },
  openGraph: pageOpenGraph({
    title: "Why did my Medicare Supplement premium increase?",
    description: "Medigap rate increases are normal, and they're not about your claims. Here's why they happen and what your options are in North Carolina.",
    path: PATH,
  }),
  twitter: pageTwitter({
    title: "Why did my Medicare Supplement premium increase?",
    description: "Medigap rate increases are normal, and they're not about your claims. Here's why they happen and what your options are in North Carolina.",
    path: PATH,
  }),
};

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "Why does my Medicare Supplement premium go up every year?",
    a: "The most common reasons are age-based pricing, rising health care costs, and the claims experience of everyone in your plan group. Your premium can also rise when an introductory or household discount ends.",
  },
  {
    q: "Do Medicare Supplement premiums increase with age?",
    a: "They can, depending on how your policy is priced. An attained-age policy goes up as you get older. Issue-age and community-rated policies don't rise just because you age, but they can still go up with health care costs.",
  },
  {
    q: "Did my premium go up because I filed claims?",
    a: "No. A Medicare Supplement company can't raise your individual rate because of your own claims or health. Rate increases apply to a whole class of policyholders, not to one person.",
  },
  {
    q: "Can I switch Medicare Supplement companies to get a lower premium?",
    a: "Yes, you can apply at any time. In North Carolina, outside your one-time open enrollment period, companies can use medical underwriting, so you'll usually answer health questions and could be declined.",
  },
  {
    q: "How much are Medigap premiums going up in 2027?",
    a: "There is no single national increase. KFF found the average Plan G premium rose 13% from 2024 to 2025, to $194 a month. Industry analysis of 2026 filings found Plan G increases of roughly 12% to 26% at several large insurers. Your letter states your increase.",
  },
  {
    q: "Is Plan G the same at every company?",
    a: "Yes. Medicare Supplement plans are standardized, so a Plan G covers the same benefits no matter which company sells it. What differs is the premium, the pricing method, and the company's rate history.",
  },
  {
    q: "Should I cancel my Medicare Supplement before applying for a new one?",
    a: "No. Keep your current policy until the new company has approved your application and given you a start date. If you cancel first and get declined, you could be left without a supplement.",
  },
];

export default function MedigapPremiumIncreasePage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: PATH },
              { name: "Medigap premium increases", path: PATH },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Why Did My Medicare Supplement Premium Increase?",
              description: "Medicare Supplement rate increases are normal. Why your premium went up, whether it rises with age, and what you can do in NC before you cancel anything.",
              path: PATH,
              datePublished: "2026-10-13",
              dateModified: "2026-11-15",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Guides" }, { name: "Medigap premium increases" }]}
        eyebrow="Guide · Updated November 15, 2026"
        title={"Why did my Medicare Supplement premium increase?"}
        lede={"Most Medicare Supplement premium increases come from your age, rising health care costs, and the claims of everyone in your plan group. They don't come from your own claims. Here's how it works and what you can do before you cancel anything."}
        secondaryHref="/start?topic=medicare&quick=1"
        secondaryLabel="Request a free consultation"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <div className="rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-6">
            <p className="text-19 font-semibold">In short</p>
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              {"Medicare Supplement premiums usually go up over time because of age-based pricing and rising health care costs. Your own claims don't raise your rate. You can shop for the same plan letter at another company, but in North Carolina that usually means answering health questions. Never cancel your current policy until a new one is approved."}
            </p>
          </div>

          <h2 className="text-28 mt-12 font-semibold">{"It's not because you used your coverage"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"I hear this worry a lot. Someone has a surgery, and then their premium goes up, and they connect the two. That isn't how Medicare Supplement pricing works. A company can't single you out and raise your rate because you had claims. Increases apply to a whole group of policyholders at once."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"A company also can't cancel your Medicare Supplement because of your health. As long as you pay the premium, the policy is guaranteed renewable."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"The usual reasons a premium goes up"}</h2>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">{"Your age."}</strong>{" "}
              {"Many policies are priced so the premium goes up as you get older. More on that below."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Rising health care costs."}</strong>{" "}
              {"When doctors, hospitals, and Medicare's own deductibles cost more, the supplement that pays those bills costs more to run."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"The claims of your whole group."}</strong>{" "}
              {"If the people in your plan and area use more care than the company expected, the company may raise rates for all of them."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"A discount ended."}</strong>{" "}
              {"Some policies start with a new-customer or household discount. When it phases out, your bill goes up even if the base rate didn't."}
            </li>
          </ul>
          <h2 className="text-28 mt-12 font-semibold">{"What the 2027 numbers look like"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"The increases are real, and they are the steepest in years. KFF, analyzing national data, found the average Medicare Supplement premium among current policyholders reached $244 a month in 2025, up 7 percent from $228 in 2024 and up 20 percent from $203 in 2020. Plan G, the most common plan, averaged $194 a month in 2025, up 13 percent in one year and 38 percent since 2020. Plan N averaged $184 a month. Those are averages across policyholders of every age, not quotes for a new 65-year-old."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"The 2026 filings point the same way. Industry analysis of 2026 rate filings found Plan G increases of roughly 12 percent to 26 percent at several large insurers. In North Carolina, 2026 application data from United Medicare Advisors put the median 65-year-old Plan G applicant at $150 a month, with the middle half of North Carolina Plan G rates at 65 running $126 to $150. Your price depends on your age, your county, the company, and whether you use tobacco."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"One 2027 figure is already set by CMS: the High Deductible Plan G deductible is $3,050 for 2027, up from $2,950 in 2026. The 2027 Part B premium and deductible had not been announced by CMS as of November 15, 2026. Do not trust a page that lists 2027 Part B figures as final before CMS announces them."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"What to do when the letter arrives"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"Read the new premium and the date it takes effect. Then compare the same plan letter at other companies, because the benefits are identical and only the price differs. Ask each company for its rate history over the last few years. A low first-year price from a company with steep annual increases is not a bargain."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"If your Medicare Advantage plan is ending for 2027, the deadline is different: you have a guaranteed right to buy certain Medigap policies without health questions through March 4, 2027. That is 63 days after coverage ends on December 31, 2026. After that date, North Carolina companies can ask health questions. Read the "}
            <Link href="/guides/medicare-advantage-plans-leaving-nc-2027" className="underline underline-offset-2">
              {"plan-ending guide"}
            </Link>
            {" for the full dates."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"How your policy is priced"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"Medicare Supplement policies are priced in one of three ways. Which one you have explains a lot about your increases."}
          </p>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">{"Attained-age rated."}</strong>{" "}
              {"The premium is based on your current age, so it rises as you get older. It often starts lower and climbs."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Issue-age rated."}</strong>{" "}
              {"The premium is based on your age when you bought the policy. It doesn't go up because you age, but it can still go up for inflation and other reasons."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Community rated."}</strong>{" "}
              {"Everyone with the policy pays the same premium regardless of age. It can still rise with costs."}
            </li>
          </ul>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"If you don't know which you have, call the company and ask. Ask too what the rate increases have been over the last few years. That history tells you more than this year's letter."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"The same letter is the same coverage"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"Here's something that works in your favor. Medicare Supplement plans are standardized. A Plan G from one company covers exactly what a Plan G from another company covers. The only differences are the price and the company behind it."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"That means if your premium has climbed, you can compare the same plan letter at other companies without giving up any benefits. If you want to compare letters too, I wrote about "}
            <Link href="/guides/medigap-plan-g-vs-plan-n-nc" className="underline underline-offset-2">
              {"Plan G vs. Plan N"}
            </Link>
            {"."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"Switching in North Carolina"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"This is the part people don't expect. Your guaranteed right to buy any Medicare Supplement, with no health questions, is a one-time six-month window. It starts when you're 65 or older and enrolled in Part B. After that, the NC Department of Insurance says companies can use medical underwriting to decide whether to accept your application."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"So if you want to move to a lower-priced company later, you'll usually fill out a health questionnaire. If you're in good health, you may be approved. If you have serious conditions, you may be declined. There are a few special situations where you have a guaranteed right again, such as your plan ending."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"That's why the order matters:"}
          </p>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">{"Apply first."}</strong>{" "}
              {"Apply for the new policy while keeping your current one."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Wait for approval."}</strong>{" "}
              {"Get the approval and the start date in writing."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Then cancel."}</strong>{" "}
              {"Only cancel the old policy once the new one is active. Never the other way around."}
            </li>
          </ul>
          <h2 className="text-28 mt-12 font-semibold">{"Other ways to lower the bill"}</h2>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">{"Ask about discounts."}</strong>{" "}
              {"Some companies offer a discount for paying by bank draft or for two people in the same household."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Look at a different plan letter."}</strong>{" "}
              {"Some letters cost less each month in exchange for copays or a deductible. Switching letters usually involves health questions too."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Consider Medicare Advantage carefully."}</strong>{" "}
              {"You can move to a Medicare Advantage plan during the fall window, and I explain that on the "}
              <Link href="/aep" className="underline underline-offset-2">
                {"Annual Enrollment page"}
              </Link>
              {". Just know that getting a Medicare Supplement back later may require passing underwriting. Read "}
              <Link href="/medicare-advantage-vs-medigap-greensboro-nc" className="underline underline-offset-2">
                {"Advantage vs. Medigap"}
              </Link>
              {" before you decide."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Get free counseling."}</strong>{" "}
              {"NC SHIIP counselors don't sell insurance and can help you compare. Call 1-855-408-1212."}
            </li>
          </ul>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"If you'd like me to check what the same plan letter costs elsewhere and whether you'd likely be approved, "}
            <Link href="/start?topic=medicare&quick=1" className="underline underline-offset-2">
              {"book a free consultation"}
            </Link>
            {". If staying put is the better move, I'll tell you that."}
          </p>
          <p className="text-16 mt-8 leading-relaxed text-[var(--color-ink-muted)]">
            {"Sources, checked November 15, 2026: "}
            <a href="https://www.kff.org/medicare/key-facts-about-medigap-enrollment-and-premiums-for-medicare-beneficiaries/" rel="noopener" className="underline underline-offset-2">
              {"KFF: Key Facts About Medigap Enrollment and Premiums for Medicare Beneficiaries, October 13, 2026"}
            </a>
            {"; "}
            <a href="https://www.ncdoi.gov/consumers/medicare-and-seniors-health-insurance-information-program-shiip/medicare-supplement-medigap-plans" rel="noopener" className="underline underline-offset-2">
              {"NC Department of Insurance: Medicare supplement plans"}
            </a>
            {"; "}
            <a href="https://www.medicare.gov/publications/02110-medigap-guide-health-insurance.pdf" rel="noopener" className="underline underline-offset-2">
              {"Medicare.gov: Choosing a Medigap Policy (official guide, PDF)"}
            </a>
            {"."}
          </p>
          <GuideTownLinks />
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Common questions</h2>
          <dl className="mt-8 flex flex-col gap-6">
            {FAQS.map((item) => (
              <div key={item.q} className="border-t border-gray-300 pt-5">
                <dt className="text-19 font-semibold">{item.q}</dt>
                <dd className="text-17 mt-1 leading-relaxed text-[var(--color-ink-muted)]">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
          <p className="text-17 mt-8 leading-relaxed text-[var(--color-ink-muted)]">
            {"Got a rate increase letter?"} Call or text Christian Brinkley in Greensboro, NC at {AGENT.phone}.
            The consultation is free, with no obligation.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <StandaloneRelatedLinks slug="medigap-premium-increase" />
          <GuideCapture />
        </div>
      </section>

      <KitchenTableClose
        heading={"Compare before you cancel anything"}
        body={`${"Bring the letter and your policy. I’ll look at how your plan is priced, what the same letter costs at other companies, and whether switching makes sense."} Call or text ${AGENT.phone}.`}
        href="/start?topic=medicare&quick=1"
        label="Request a free consultation"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
      <MedicareByline reviewed="2026-11-15" />
    </main>
  );
}
