"use client";

import { Check, Printer, Share2 } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";

const URL_TO_SHARE = "https://christianbrinkleync.com/state-health-plan-checklist";
const BUTTON =
  "text-17 inline-flex min-h-14 items-center justify-center gap-2 rounded-xl px-6 font-semibold";

/** Share (or copy) the link, and print. Most people forward this to a spouse or a friend. */
export function ChecklistActions() {
  const [copied, setCopied] = useState(false);

  async function share() {
    const data = {
      title: "State Health Plan retiree checklist: Nov. 6 deadline",
      text: "NC state retirees on Medicare: what to check before the State Health Plan's November 6 deadline.",
      url: URL_TO_SHARE,
    };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(URL_TO_SHARE);
      setCopied(true);
    } catch {
      // Cancelled share sheet or blocked clipboard: nothing to do.
    }
  }

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 3000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={share}
        className={`${BUTTON} bg-[var(--color-navy)] text-[var(--color-paper)]`}
      >
        {copied ? <Check className="size-5" aria-hidden /> : <Share2 className="size-5" aria-hidden />}
        {copied ? "Link copied" : "Send this to a friend"}
      </button>
      <button
        type="button"
        onClick={() => window.print()}
        className={`${BUTTON} border-2 border-[var(--color-navy)] bg-white text-[var(--color-navy)]`}
      >
        <Printer className="size-5" aria-hidden /> Print it
      </button>
    </div>
  );
}

const CLOSES_AT = Date.parse("2026-11-07T05:00:00Z");

/** After November 6, 2026 (Eastern), say plainly that the window has closed. */
export function DeadlineNote() {
  const closed = useSyncExternalStore(
    () => () => {},
    () => Date.now() > CLOSES_AT,
    () => false,
  );
  if (!closed) return null;
  return (
    <p className="text-17 mt-6 rounded-xl border-2 border-red-700 bg-white p-4 font-semibold" role="status">
      Open enrollment for the 2027 plan year closed on November 6, 2026. Outside open enrollment you
      generally need a qualifying event to change plans. Call the State Health Plan at 855-859-0966
      if you&apos;re not sure where you stand.
    </p>
  );
}
