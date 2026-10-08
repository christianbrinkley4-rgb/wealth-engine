import type { Metadata } from "next";

import { NextUp, PageHead } from "@/app/wealth/ui/shell";
import { ToolGrid } from "@/app/wealth/ui/ToolGrid";
import { wealthMetadata } from "@/lib/wealth/seo";

const path = "/wealth/quiz";

export const metadata: Metadata = wealthMetadata({
  title: "Money Quizzes: First $1,000 and Money Personality",
  description:
    "Two quick money quizzes. Find out what to think about doing with your first $1,000, and which of four money personalities you are.",
  path,
});

export default function QuizIndexPage() {
  return (
    <main>
      <PageHead
        eyebrow="Quizzes"
        title={
          <>
            Two minutes. <span className="w-mark">One honest answer.</span>
          </>
        }
        lede="No email wall at the end. You answer, you get the result, you can share it."
        crumbs={[{ name: "Quizzes", path }]}
      />
      <section className="w-section-tight">
        <div className="w-shell">
          <ToolGrid kinds={["Quiz"]} />
        </div>
      </section>
      <NextUp
        links={[
          { href: "/wealth/calculators", label: "Play with the calculators", kind: "Calculators" },
          { href: "/wealth/learn", label: "Read the plain-English guides", kind: "Learn" },
          { href: "/wealth/journey", label: "Follow the journey", kind: "Building in public" },
        ]}
      />
    </main>
  );
}
