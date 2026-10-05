/**
 * The disclosures that have to be visible, rendered where people actually are:
 * the quiz and both calculators. Previously this component existed but was
 * mounted on zero pages.
 *
 * `medicare` adds the CMS-facing language required of a Third Party Marketing
 * Organization. Use it on anything that mentions Medicare.
 */

import { TpmoDisclaimer } from "@/components/TpmoDisclaimer";
import { AGENT, ESTIMATE_DISCLAIMER, GOVERNMENT_DISCLAIMER, hasPublishableNpn } from "@/lib/agent";

export function ComplianceDisclosure({
  variant = "general",
  showEstimateNote = false,
}: {
  variant?: "general" | "medicare";
  showEstimateNote?: boolean;
}) {
  return (
    <aside aria-label="Required disclosures" className="disclosure measure-prose">
      <h2>Disclosures</h2>

      <div>
        {variant === "medicare" ? <TpmoDisclaimer className="disclosure-tpmo" /> : null}
        <p>
          {AGENT.name} is a licensed insurance agent ({AGENT.licenseLine})
          {/* Never print a placeholder NPN on a licensed agent’s disclosure. */}
          {hasPublishableNpn() ? `, National Producer Number ${AGENT.npn}` : ""}. This site is his
          own. He represents a limited number of insurance companies and does not offer every plan
          available in the area. This site is not a government agency and is not endorsed by one.
        </p>

        {showEstimateNote ? <p>{ESTIMATE_DISCLAIMER}</p> : null}

        {variant === "medicare" ? (
          <p className="disclosure-strong">{GOVERNMENT_DISCLAIMER}</p>
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
