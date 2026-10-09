import type { Metadata } from "next";
import Link from "next/link";
import { CONTENT_CATALOG } from "@/lib/contentCatalog";
import { pageOpenGraph, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/app/wealth/ui/shell";
const title = "Money and Medicare guides";
const description =
  "Plain-language guides to retirement taxes, Medicare, and common money questions.";
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/guides" },
  openGraph: pageOpenGraph({ title, description, path: "/guides" }),
};
export default function Guides() {
  return (
    <main className="app-shell py-14">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
        ])}
      />
      <p className="eyebrow">Learn at your pace</p>
      <h1 className="text-40 font-semibold">{title}</h1>
      <p className="text-19 mt-4">{description}</p>
      <ul className="mt-8 grid gap-6 md:grid-cols-2">
        {CONTENT_CATALOG.filter((page) => page.path.startsWith("/guides/")).map((page) => (
          <li key={page.path}>
            <Link href={page.path} className="card card-interactive block h-full p-6">
              <h2 className="text-24 font-semibold">{page.title}</h2>
              <p className="mt-3">{page.blurb}</p>
              <span className="mt-4 inline-block underline">Read the guide</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-10">
        <Link href="/wealth/learn">Explore money basics</Link>
        {" · "}
        <Link href="/tools">Try a calculator</Link>
        {" · "}
        <Link href="/editorial-policy">About our information</Link>
      </p>
    </main>
  );
}
