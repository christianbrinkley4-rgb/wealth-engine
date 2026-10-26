import { ENGINE_BOOKING_URL } from "@/lib/leadEnginePublic";
import Link from "next/link";
import { SHIIP_CONTACT_URL } from "@/lib/planChecklist";

export function ShiipAndAgent() {
  return (
    <section className="bg-[var(--color-paper)] py-12">
      <div className="measure-prose app-shell max-w-3xl">
        <h2 className="text-28 font-semibold">SHIIP counseling and help from a licensed agent</h2>
        <p className="text-18 mt-4">
          North Carolina SHIIP provides free, unbiased Medicare counseling. A licensed agent can
          explain the plans they represent and help with enrollment applications.
        </p>
        <p className="text-17 mt-4">
          SHIIP is a useful place to start if you want independent guidance. Counselors do not sell
          or endorse insurance products, according to the{" "}
          <a
            className="underline"
            href="https://www.ncdoi.gov/consumers/medicare-and-seniors-health-insurance-information-program-shiip"
          >
            NC Department of Insurance
          </a>
          . They can help you understand coverage and compare options. Ask your local counselor what
          enrollment assistance they offer.
        </p>
        <p className="text-17 mt-4">
          When you want to discuss specific plans I represent, I can check your doctors,
          prescriptions, and costs, then help you apply if you decide to enroll. I represent a
          limited number of companies and receive a commission if you enroll through me. There is no
          charge for the consultation.
        </p>
        <p className="text-17 mt-4">
          <a className="underline" href={SHIIP_CONTACT_URL}>
            Find a SHIIP counselor in your county
          </a>
          {" or "}
          <Link className="underline" href={ENGINE_BOOKING_URL} target="_blank" rel="noopener">
            Book a 45-minute phone review
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
