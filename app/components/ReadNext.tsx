import Link from "next/link";
import type { ReactNode } from "react";

/**
 * One or two sentences pointing a reader at the page that answers their next
 * question. Written per page, in the reading flow. Not a link list.
 */
export function ReadNext({ children }: { children: ReactNode }) {
  return (
    <div className="measure-prose app-shell max-w-3xl py-8">
      <div className="text-18 space-y-4 leading-relaxed [&_a]:underline [&_a]:underline-offset-2">
        {children}
      </div>
    </div>
  );
}

/** The pointer to the plan research checklist, worded once. */
export function ChecklistPointer() {
  return (
    <p>
      Before you compare plans, get your doctors, prescriptions and pharmacy onto one page.{" "}
      <Link href="/medicare-plan-checklist">The research checklist</Link> makes a sheet you can
      print, and nothing you type leaves your device.
    </p>
  );
}
