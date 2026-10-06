import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import { AGENT } from "@/lib/agent";

/** The close at the bottom of a service page: a face, a number, one next step. */
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
  const cleanLabel = label.replace(/\s*→\s*$/, "");
  return (
    <section className="ktc">
      <div className="shell">
        <div className="ktc-card" data-reveal>
          <Image
            src="/christian-brinkley-square.jpg"
            alt={`${AGENT.name}, licensed insurance agent in ${AGENT.city}`}
            width={192}
            height={192}
            sizes="88px"
            className="ktc-avatar"
          />
          <p className="ktc-who">
            <strong>{AGENT.name}</strong>
            <span>
              {AGENT.licenseLine} · {AGENT.city}, {AGENT.state}
            </span>
          </p>
          <h2>{heading}</h2>
          <p>{body}</p>
          <div className="ktc-actions">
            <a href={AGENT.phoneHref} className="btn">
              <Phone size={19} aria-hidden />
              {AGENT.phone}
            </a>
            <Link href={href} className="btn btn-outline">
              {cleanLabel} <ArrowRight size={18} className="arrow" aria-hidden />
            </Link>
          </div>
          <p className="ktc-note">
            Free consultation in person or by phone. It’s me who answers. {AGENT.hours}
          </p>
        </div>
      </div>
    </section>
  );
}
