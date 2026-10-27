"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Link from "@/components/Link";

const loading = () => (
  <p role="status" className="py-8">
    Loading your Medicare tool...
  </p>
);
const AepQuiz = dynamic(() => import("@/app/aep-quiz/AepQuiz").then((m) => m.AepQuiz), {
  ssr: false,
  loading,
});
const Penalty = dynamic(
  () => import("@/app/part-b-penalty/PartBPenaltyCalculator").then((m) => m.PartBPenaltyCalculator),
  { ssr: false, loading },
);
const Timeline = dynamic(
  () => import("@/components/MedicareTimeline").then((m) => m.MedicareTimeline),
  { ssr: false, loading },
);
const tools = [
  { id: "aep", label: "Check whether to act during AEP", href: "/aep-quiz" },
  { id: "penalty", label: "Estimate a Part B late enrollment penalty", href: "/part-b-penalty" },
  {
    id: "dates",
    label: "Find your turning-65 enrollment dates",
    href: "/turning-65#enrollment-dates",
  },
] as const;
type ToolId = (typeof tools)[number]["id"];

export function MedicareGuideTools({ currentYear }: { currentYear: number }) {
  const [active, setActive] = useState<ToolId | null>(null);
  return (
    <section className="bg-[var(--color-paper)] py-12" aria-labelledby="medicare-tools-title">
      <div className="app-shell">
        <h2 id="medicare-tools-title" className="text-28 font-semibold">
          Work through your dates and questions
        </h2>
        <p className="text-17 mt-4">
          Choose a tool to use here, or open its own page. Results are educational estimates and do
          not enroll you in a plan.
        </p>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {tools.map((tool) => (
            <li key={tool.id} className="card-surface p-5">
              <button
                type="button"
                className="btn w-full"
                aria-expanded={active === tool.id}
                aria-controls={`medicare-tool-${tool.id}`}
                onClick={() => setActive(active === tool.id ? null : tool.id)}
              >
                {tool.label}
              </button>
              <Link className="mt-4 block underline" href={tool.href}>
                Open this Medicare tool on its own page
              </Link>
            </li>
          ))}
        </ul>
        {tools.map((tool) => (
          <div
            key={tool.id}
            id={`medicare-tool-${tool.id}`}
            hidden={active !== tool.id}
            className="mt-6 min-h-64"
          >
            {active === tool.id ? (
              tool.id === "aep" ? (
                <AepQuiz />
              ) : tool.id === "penalty" ? (
                <Penalty />
              ) : (
                <Timeline currentYear={currentYear} />
              )
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
