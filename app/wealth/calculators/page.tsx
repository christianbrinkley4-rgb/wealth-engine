import type { Metadata } from "next";

import { EducationNote, NextUp, PageHead } from "@/app/wealth/ui/shell";
import { ToolGrid } from "@/app/wealth/ui/ToolGrid";
import { wealthMetadata } from "@/lib/wealth/seo";

const path = "/wealth/calculators";

export const metadata: Metadata = wealthMetadata({
  title: "Free Money Calculators",
  description:
    "Four free calculators: compound interest, 50/30/20 budget, debt payoff (avalanche vs snowball), and Roth vs traditional. No sign-up.",
  path,
});

export default function CalculatorsPage() {
  return (
    <main>
      <PageHead
        eyebrow="Calculators"
        title={
          <>
            Change a number. <span className="w-mark">See what happens.</span>
          </>
        }
        lede="Four calculators with live sliders and charts. They remember your numbers on this device, and nothing gets sent anywhere."
        crumbs={[{ name: "Calculators", path }]}
      />
      <section className="w-section-tight">
        <div className="w-shell">
          <ToolGrid kinds={["Calculator"]} />
          <EducationNote />
        </div>
      </section>
      <NextUp
        links={[
          { href: "/wealth/quiz", label: "Take a one-minute quiz", kind: "Quizzes" },
          { href: "/wealth/learn", label: "Read the plain-English guides", kind: "Learn" },
          { href: "/wealth/tools", label: "Download the free tools", kind: "Downloads" },
        ]}
      />
    </main>
  );
}
