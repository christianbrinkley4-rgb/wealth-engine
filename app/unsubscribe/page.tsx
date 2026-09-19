import type { Metadata } from "next";

import { UnsubscribeForm } from "./UnsubscribeForm";

export const metadata: Metadata = {
  title: { absolute: "Unsubscribe from emails" },
  description: "Stop receiving follow-up emails. One click, no hard feelings.",
  alternates: { canonical: "/unsubscribe" },
  robots: { index: false, follow: false },
};

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams?: Promise<{ token?: string }>;
}) {
  const params = await searchParams;
  return (
    <main className="text-[var(--color-navy)]">
      <section className="personal-section personal-shell">
        <div className="personal-section-heading">
          <div>
            <p className="personal-eyebrow">EMAIL PREFERENCES</p>
            <h1>Unsubscribe</h1>
            <p className="personal-body">
              No hard feelings. One click below and I&apos;ll stop the follow-up emails. You can
              still reach me directly anytime — my number and email are at the bottom of every page.
            </p>
          </div>
        </div>
        <UnsubscribeForm token={params?.token ?? ""} />
      </section>
    </main>
  );
}
