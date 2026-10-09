import Link from "next/link";
import { ServiceHero } from "./ServiceHero";
import { KitchenTableClose } from "./KitchenTableClose";
import { ComplianceDisclosure } from "./ComplianceDisclosure";
import { LOCAL_MEDICARE_TOWNS } from "@/lib/localMedicareFacts";
import { articleJsonLd, breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";

export function LocalMedicarePage({ townKey }: { townKey: string }) {
  const town = LOCAL_MEDICARE_TOWNS[townKey];
  const headline = `Medicare help in ${town.name}, North Carolina`;
  const schema = [
    breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Service area", path: "/service-area" }, { name: `Medicare in ${town.name}`, path: town.path }]),
    articleJsonLd({ headline, description: town.intro, path: town.path, datePublished: town.path.startsWith("/medicare-in/") ? "2026-08-25" : "2026-10-04", dateModified: "2026-10-09" }),
    serviceJsonLd({ name: `Medicare help in ${town.name}`, description: town.intro, path: town.path }),
  ];
  return <main className="text-[var(--color-navy)]">
    {schema.map((data, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />)}
    <ServiceHero crumbs={[{ name: "Home", href: "/" }, { name: "Service area", href: "/service-area" }, { name: town.name }]} eyebrow={town.name} title={headline} lede={town.intro} secondaryHref="/start?topic=medicare" secondaryLabel="Request a consultation →" />
    <section className="bg-white py-10"><div className="measure-prose app-shell max-w-3xl">
      <p className="text-15 text-[var(--color-ink-muted)]">Public sources checked <time dateTime="2026-10-09">October 9, 2026</time>. These organizations are independent of my practice.</p>
      {town.facts.map(item => <section key={item.kind} className="mt-8 border-t border-gray-200 pt-6">
        <h2 className="text-24 font-semibold">{item.name}</h2>
        <p className="text-18 mt-3 leading-relaxed">{item.body}</p>
        <a data-handoff href={item.sourceUrl} className="text-17 mt-2 inline-flex min-h-11 items-center underline underline-offset-2">Source: {item.name}</a>
      </section>)}
      <p className="text-18 mt-8 leading-relaxed">For the enrollment and coverage questions shared across towns, use the <Link href="/learn" className="underline">Medicare guides</Link>. To organize doctors, medicines, and pharmacies before checking coverage, make a <Link href="/medicare-plan-checklist" className="underline">research checklist</Link>.</p>
      {townKey === "greensboro" ? <p className="text-18 mt-4">You can also read about <Link href="/medicare-supplement-plans-greensboro-nc" className="underline">Medigap in Greensboro</Link>, the <Link href="/medicare-advantage-vs-medigap-greensboro-nc" className="underline">local comparison</Link>, and the <Link href="/turning-65-checklist" className="underline">turning-65 checklist</Link>.</p> : null}
      <p className="text-17 mt-4"><Link href="/service-area" className="underline">All the towns I serve</Link> · <Link href="/keep-my-doctor" className="underline">How to check your doctors</Link></p>
    </div></section>
    <KitchenTableClose heading={`Talk about Medicare in ${town.name}`} body="We can discuss your current coverage, doctors, prescriptions, and questions by phone or arrange a consultation. No cost, with no obligation to enroll or buy." href="/start?topic=medicare" label="Ask a question" />
    <ComplianceDisclosure />
  </main>;
}
