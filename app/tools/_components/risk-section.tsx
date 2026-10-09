/**
 * "What could go wrong" panel for the /tools calculators. Every scenario
 * shows the downside in plain language with its source. Educational only:
 * it describes math and history, never advice.
 */

import type { RiskScenario } from "@/lib/wealth/risk";

export function RiskSection({ scenarios }: { scenarios: RiskScenario[] }) {
  return (
    <section className="t-risk" aria-label="What could go wrong">
      <h3>What could go wrong</h3>
      <p className="t-risk-intro">
        The projection above is the happy path. Here is the other side of the math.
      </p>
      <div>
        {scenarios.map((scenario) => (
          <div className="t-risk-row" key={scenario.title}>
            <h4>{scenario.title}</h4>
            <p>{scenario.body}</p>
            <p className="t-risk-src">
              Source:{" "}
              {scenario.sourceUrl ? (
                <a href={scenario.sourceUrl} target="_blank" rel="noopener noreferrer">
                  {scenario.sourceLabel}
                </a>
              ) : (
                scenario.sourceLabel
              )}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
