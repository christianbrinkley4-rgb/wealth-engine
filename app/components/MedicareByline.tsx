import Image from "next/image";
import Link from "@/components/Link";
import { AGENT, hasPublishableNpn } from "@/lib/agent";
import { formatArticleDate } from "@/app/components/ArticleBody";

export function MedicareByline({ reviewed }: { reviewed: string }) {
  return (
    <aside className="shell flex items-center gap-4 py-6" aria-label="About the author">
      <Image
        src="/christian-brinkley-square.jpg"
        alt="Christian Brinkley"
        width={56}
        height={56}
        sizes="56px"
        className="rounded-full"
      />
      <p className="text-16 text-[var(--color-ink-muted)]">
        By{" "}
        <Link href="/about" className="underline">
          {AGENT.name}
        </Link>
        , Licensed NC Insurance Agent
        {hasPublishableNpn() ? ` (NPN ${AGENT.npn})` : ""}.
        <br />
        Last reviewed <time dateTime={reviewed}>{formatArticleDate(reviewed)}</time>. Personal
        Medicare help in {AGENT.city}, {AGENT.state}.
      </p>
    </aside>
  );
}
