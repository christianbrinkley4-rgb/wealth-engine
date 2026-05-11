"use client";

import { Card } from "@/components/ui/card";

export default function ComplianceDisclosure() {
  return (
    <Card className="p-6 sm:p-7">
      <p className="display-eyebrow text-cyan-300/80">Educational Use Disclosure</p>
      <p className="mt-3 text-sm font-light leading-relaxed text-slate-400">
        Triad Wealth Research Engine is an educational research instrument authored under the UNC
        Greensboro Accelerated Master of Accounting program. It does not provide individualized
        investment, tax, legal, or insurance advice. Tax law, Medicare premiums, and policy rules
        evolve. Final household decisions should be reviewed against complete account data, income
        plan, Social Security timing, and plan documents — preferably with an independent fiduciary.
      </p>
    </Card>
  );
}
