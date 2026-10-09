import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { articleJsonLd, breadcrumbJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";

import { PlanChecklist } from "./PlanChecklist";
import "./checklist.css";

const path = "/medicare-plan-checklist";
const title = "Medicare Plan Research Checklist | Christian Brinkley";
const description =
  "List your doctors, prescriptions, pharmacy and priorities on your own device. Print one sheet to take to Medicare.gov or to a no-cost conversation.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: pageOpenGraph({ title, description, path }),
  twitter: pageTwitter({ title, description }),
};

export default function ChecklistPage() {
  return (
    <main className="checklist-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Medicare guides", path: "/learn" },
              { name: "Plan research checklist", path },
            ]),
            articleJsonLd({
              headline: "Medicare plan research checklist",
              description,
              path,
              datePublished: "2026-10-09",
              dateModified: "2026-10-09",
            }),
          ]),
        }}
      />
      <header className="app-shell max-w-3xl py-6">
        <nav aria-label="Breadcrumb" className="text-15">
          <Link href="/learn" className="underline underline-offset-2">
            Medicare guides
          </Link>{" "}
          / Plan research checklist
        </nav>
        <h1 className="text-32 mt-4 font-semibold">Get your list ready before you compare plans</h1>
        <p className="text-18 mt-4 leading-relaxed">
          Comparing plans goes badly when you’re hunting for a pill bottle halfway through. Four
          short steps, then one sheet with your doctors, prescriptions and pharmacy on it.
        </p>
        <p className="text-17 mt-3 leading-relaxed">
          This page does not show plans, compare plans, or check whether anything is covered.
          Medicare.gov does that. This gets you ready for it.
        </p>
        <p className="text-17 mt-3 leading-relaxed">
          New to Medicare this year? Do the{" "}
          <Link href="/turning-65-checklist" className="underline underline-offset-2">
            turning-65 checklist
          </Link>{" "}
          first. It covers when to sign up.
        </p>
      </header>
      <PlanChecklist />
      <div className="app-shell max-w-3xl pb-10">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
