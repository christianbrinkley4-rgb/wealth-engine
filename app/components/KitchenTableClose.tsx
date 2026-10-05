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
            alt=""
            width={128}
            height={128}
            sizes="64px"
            className="ktc-avatar"
          />
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
          <p className="ktc-note">Free consultation in person or by phone. {AGENT.hours}</p>
        </div>
      </div>
    </section>
  );
}
