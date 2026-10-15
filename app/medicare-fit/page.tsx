import type { Metadata } from "next";
import { EngineQuiz } from "@/components/EngineQuiz";
import { quizResult } from "@/lib/leadEngine";
import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import "@/app/lead-engine.css";
export const metadata: Metadata = {
  title: "Medicare questions to bring to a review | Christian Brinkley",
  description:
    "Five questions to help organize your Medicare review. Request a call from Christian Brinkley, a licensed NC insurance agent in Greensboro.",
  alternates: { canonical: "/medicare-fit" },
  robots: { index: false, follow: false },
};
export default function MedicareFit() {
  const combinations = [
    ["healthy", "open", "local", "lowcost", "unsure"],
    ["healthy", "open", "local", "lowcost", "dual"],
    ["complex", "keep", "travel", "freedom", "nond"],
    ["healthy", "open", "local", "lowcost", "nond"],
  ];
  const results = Object.fromEntries(
    combinations.map((answers) => {
      const result = quizResult(answers);
      return [result.key, result];
    }),
  );
  return (
    <div className="engine shell">
      <header className="engine-heading">
        <p className="engine-eyebrow">Christian Brinkley. Licensed NC insurance agent.</p>
        <h1>I’m 21. I help make Medicare easier to talk about.</h1>
        <p>
          Start with five questions about what matters to you. Get a checklist for a conversation,
          without a plan recommendation.
        </p>
        <a className="engine-button" href="tel:+19194086671">
          Call (919) 408-6671
        </a>
      </header>
      <EngineQuiz results={results} />
      <p className="engine-small">
        Educational only. Answers can&apos;t establish eligibility, enrollment rights, or which
        coverage fits you. Don&apos;t enter Medicare numbers, Social Security numbers, or medication
        details.
      </p>
      <p className="engine-small">
        Sources:{" "}
        <a href="https://www.medicare.gov/health-drug-plans/medigap/ready-to-buy/when">
          Medigap timing
        </a>{" "}
        and{" "}
        <a href="https://www.medicare.gov/health-drug-plans/open-enrollment">
          Medicare Open Enrollment
        </a>
        .
      </p>
      <ComplianceDisclosure variant="medicare" />
      <p>
        <a href="tel:+19194086671">(919) 408-6671</a>
      </p>
    </div>
  );
}
