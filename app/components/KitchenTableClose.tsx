import Link from "next/link";
import { Phone } from "lucide-react";

import { AGENT } from "@/lib/agent";

export function KitchenTableClose({
  heading,
  body,
  href,
  label,
}: {
  heading: string;
  body: string;
  href: string;
  label: string;
}) {
  return (
    <section className="bg-[var(--color-paper)] py-14 md:py-16">
      <div className="app-shell max-w-2xl text-center">
        <h2 className="text-28 font-semibold">{heading}</h2>
        <p className="text-18 mt-4 text-[var(--color-ink-muted)]">{body}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={AGENT.phoneHref}
            className="text-18 inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[var(--color-navy)] px-8 font-semibold text-[var(--color-paper)]"
          >
            <Phone className="size-5 shrink-0" aria-hidden />
            {AGENT.phone}
          </a>
          <Link
            href={href}
            className="text-18 inline-flex min-h-14 items-center justify-center rounded-xl border-2 border-[var(--color-navy)] px-8 font-semibold text-[var(--color-navy)]"
          >
            {label}
          </Link>
        </div>
        <p className="text-16 mt-6 text-[var(--color-ink-muted)]">
          Free consultation in person or by phone. {AGENT.hours}
        </p>
      </div>
    </section>
  );
}
