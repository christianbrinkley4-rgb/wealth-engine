import { ENGINE_BOOKING_URL } from "@/lib/leadEnginePublic";
import Image from "next/image";
import { TrustFacts } from "@/app/components/TrustFacts";
import { Phone } from "lucide-react";

import { AGENT } from "@/lib/agent";

/** The close at the bottom of a service page: a face, a number, one next step. */
export function KitchenTableClose({
  heading,
  body,
  href,
}: {
  heading: string;
  body: string;
  href: string;
  label: string;
}) {
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
            <a
              data-cta-location="page_close"
              href={ENGINE_BOOKING_URL}
              target="_blank"
              rel="noopener"
              className="btn"
            >
              Book a 45-minute phone review
            </a>
            <a data-cta-location="page_close" href={AGENT.phoneHref} className="btn">
              <Phone size={19} aria-hidden />
              Call Christian&apos;s direct line: {AGENT.phone}
            </a>
            {href !== AGENT.phoneHref && (
              <a href="/start" className="underline">
                Or send a question
              </a>
            )}
          </div>
          <TrustFacts compact />
          <p className="ktc-note">
            Free consultation in person or by phone. It’s me who answers. {AGENT.hours}
          </p>
        </div>
      </div>
    </section>
  );
}
