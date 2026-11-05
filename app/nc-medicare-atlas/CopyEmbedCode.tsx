"use client";

import { useState } from "react";

import { ATLAS_COUNTIES, ATLAS_DEFAULT_COUNTY, atlasEmbedCode } from "@/lib/atlasEmbed";

/** County picker plus the ready-to-paste embed code and a copy button. */
export function CopyEmbedCode() {
  const [county, setCounty] = useState(ATLAS_DEFAULT_COUNTY);
  const [copied, setCopied] = useState(false);
  const code = atlasEmbedCode(county);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mt-6">
      <label htmlFor="atlas-county" className="text-17 block font-semibold">
        Which county should it open on?
      </label>
      <select
        id="atlas-county"
        className="text-17 mt-2 w-full rounded-lg border-2 border-[var(--color-navy)] bg-white p-3"
        value={county}
        onChange={(event) => setCounty(event.target.value)}
      >
        {ATLAS_COUNTIES.map((name) => (
          <option key={name} value={name}>
            {name} County
          </option>
        ))}
      </select>
      <p className="text-16 mt-3 text-[var(--color-ink-muted)]">
        Visitors can still switch to any of North Carolina&apos;s 100 counties.
      </p>
      <label htmlFor="atlas-code" className="text-17 mt-6 block font-semibold">
        Paste this into your page
      </label>
      <textarea
        id="atlas-code"
        readOnly
        value={code}
        rows={6}
        className="mt-2 w-full rounded-lg border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-3 font-mono text-[14px] leading-snug"
        onFocus={(event) => event.currentTarget.select()}
      />
      <button
        type="button"
        onClick={copy}
        className="text-17 mt-3 rounded-lg bg-[var(--color-navy)] px-5 py-3 font-semibold text-white"
      >
        {copied ? "Copied" : "Copy the code"}
      </button>
    </div>
  );
}
