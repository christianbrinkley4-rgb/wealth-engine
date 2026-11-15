import type { Metadata } from "next";

import { PrepSheetBuilder } from "./PrepSheetBuilder";
import "./prep-sheet.css";

/**
 * Private prep sheet builder, for Christian only.
 *
 * Kept out of search and out of the site on purpose:
 * - noindex and nofollow, below.
 * - Not in app/sitemap.ts.
 * - Not linked from the header, the footer, or any page.
 *
 * The site has no login. This page is safe to leave reachable because it
 * shows nothing until someone types into it, and it saves and sends nothing.
 * It must stay that way: never load, store, or send client data here.
 */

export const metadata: Metadata = {
  title: { absolute: "Appointment prep sheet" },
  description: "Private working page.",
  robots: { index: false, follow: false, nocache: true },
};

export default function PrepSheetPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <header className="app-shell max-w-3xl py-6">
        <h1 className="text-32 font-semibold">Appointment prep sheet</h1>
        <p className="text-17 mt-3 leading-relaxed">
          Enter what you know about the client and the appointment. The sheet below fills in as
          you type. It lists each drug, the drug plan question for each drug, and what you still
          need to ask.
        </p>
      </header>
      <div className="app-shell max-w-3xl">
        <PrepSheetBuilder />
      </div>
    </main>
  );
}
