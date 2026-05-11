"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface MethodologyPanelProps {
  context: "wealth" | "medicare";
}

export default function MethodologyPanel({ context }: MethodologyPanelProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="methodology">
        <AccordionTrigger>How We Calculate Your Results (Methodology)</AccordionTrigger>
        <AccordionContent>
          {context === "wealth" ? (
            <div className="space-y-3 text-sm font-light text-slate-300">
              <p>
                Projections compare a 6.0% self-directed growth path against a 7.8% guided fiduciary
                path to illustrate the long-term impact of disciplined planning.
              </p>
              <p>
                2026 estimates model scheduled tax-law reversion with bracket and standard-deduction
                adjustments. Federal and North Carolina impacts are shown separately.
              </p>
              <p>
                This is educational planning guidance from the UNCG research initiative. Final
                decisions should include account-specific holdings, RMD timing, and actual income
                sources.
              </p>
            </div>
          ) : (
            <div className="space-y-3 text-sm font-light text-slate-300">
              <p>
                Medicare IRMAA thresholds are evaluated against modified AGI using current CMS
                surcharge tiers for Part B and Part D adjustments.
              </p>
              <p>
                Greensboro / Winston-Salem regional averages compare Medigap + Part D versus
                Medicare Advantage annual cost structures for practical scenario analysis.
              </p>
              <p>
                Projections are educational and should be reviewed with plan documents, drug
                formularies, provider networks, and anticipated Required Minimum Distributions
                (RMDs).
              </p>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
