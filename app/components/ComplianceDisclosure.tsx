/**
 * The disclosures that have to be visible, rendered where people actually are:
 * the quiz and both calculators. Previously this component existed but was
 * mounted on zero pages.
 *
 * `medicare` adds the CMS-facing language required of a Third Party Marketing
 * Organization. Use it on anything that mentions Medicare.
 */

import {
  AGENT,
  ESTIMATE_DISCLAIMER,
  GOVERNMENT_DISCLAIMER,
  hasPublishableNpn,
  TPMO_DISCLAIMER,
} from "@/lib/agent";

export function ComplianceDisclosure({
  variant = "general",
  showEstimateNote = false,
}: {
  variant?: "general" | "medicare";
  showEstimateNote?: boolean;
}) {
  return (
    <aside
      aria-label="Required disclosures"
      className="mt-12 rounded-xl border border-gray-300 bg-white p-5 text-[15px] leading-relaxed text-[var(--color-ink-muted)] md:p-6"
    >
      <h2 className="text-[15px] font-semibold tracking-[0.06em] text-[var(--color-navy)] uppercase">
        Disclosures
      </h2>

      <div className="mt-3 space-y-3">
        <p>
          {AGENT.name} is a licensed insurance agent ({AGENT.linesOfAuthority.join(", ")}) in{" "}
          {AGENT.licensedStates.join(", ")}
          {/* Never print a placeholder NPN on a licensed agent's disclosure. */}
          {hasPublishableNpn() ? `, National Producer Number ${AGENT.npn}` : ""}. This site is his
          own. He represents a limited number of insurance companies and does not offer every plan
          available in the area. This site is not a government agency and is not endorsed by one.
        </p>

        {showEstimateNote ? <p>{ESTIMATE_DISCLAIMER}</p> : null}

        {variant === "medicare" ? (
          <>
            <p>{TPMO_DISCLAIMER}</p>
            <p className="font-medium text-[var(--color-navy)]">{GOVERNMENT_DISCLAIMER}</p>
          </>
        ) : null}

        <p>
          Information you submit goes to {AGENT.name} only. It is never sold, and it is not shared
          with other agents or lead companies.
        </p>
      </div>
    </aside>
  );
}

export default ComplianceDisclosure;
