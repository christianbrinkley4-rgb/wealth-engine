import type { Metadata } from "next";
import Link from "next/link";
import { articleJsonLd, breadcrumbJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";
import { TpmoDisclaimer } from "@/components/TpmoDisclaimer";
import { PlanChecklist } from "./PlanChecklist";
import "./checklist.css";
const path = "/medicare-plan-checklist";
const title = "Medicare Plan Research Checklist | Christian Brinkley";
const description = "Organize doctors, prescriptions, pharmacies, costs, and travel on your device. Print a sheet to take to Medicare.gov or a no-cost conversation.";
export const metadata: Metadata = { title: { absolute: title }, description, alternates: { canonical: path }, openGraph: pageOpenGraph({ title, description, path }), twitter: pageTwitter({ title, description }) };
export default function ChecklistPage() {
  return <main className="checklist-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Medicare guides", path: "/learn" }, { name: "Plan research checklist", path }]),
      articleJsonLd({ headline: title, description, path, datePublished: "2026-10-09", dateModified: "2026-10-09" }),
    ]) }} />
    <header className="app-shell max-w-3xl py-6"><nav aria-label="Breadcrumb"><Link href="/learn">Medicare guides</Link> / Plan research checklist</nav><h1 className="text-32 mt-4 font-semibold">Get ready to research Medicare plans</h1><p className="text-18 mt-4">Gather what matters to you in four short steps. This checklist does not show or compare plans, check coverage, or choose a plan for you.</p><p className="text-15 mt-3">Updated October 9, 2026</p></header>
    <PlanChecklist />
    <div className="app-shell max-w-3xl py-8"><TpmoDisclaimer /></div>
  </main>;
}
