import Link from "next/link";
import { AGENT } from "@/lib/agent";

export function ReviewBookingBox() {
  return (
    <aside className="my-8 rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-6" aria-label="Talk through your Medicare questions">
      <h2 className="text-24 font-semibold">Want to talk it through?</h2>
      <p className="text-18 mt-3">Choose a time for a 45-minute phone review with me, Christian Brinkley. No cost and no obligation to enroll.</p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link href="/aep" data-cta-location="inline" className="btn">Book a 45-minute phone review</Link>
        <a href={AGENT.phoneHref} data-cta-location="inline" className="btn btn-outline">Call {AGENT.phone}</a>
      </div>
      <p className="text-17 mt-4"><Link href="/start?topic=medicare&quick=1" className="underline">Or send a question</Link>. Sending a question doesn&apos;t reserve a time.</p>
      <p className="text-17 mt-3">(919) 408-6671</p>
    </aside>
  );
}
