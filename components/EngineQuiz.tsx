"use client";
import { useRef, useState } from "react";
import { FIT_QUESTIONS, ENGINE_BOOKING_URL } from "@/lib/leadEnginePublic";
import { EngineContact } from "./EngineContact";

type Result = { title: string; points: string[] };
export function EngineQuiz({ results }: { results: Record<string, Result> }) {
  const [answers, setAnswers] = useState<string[]>([]);
  const [step, setStep] = useState(0);
  const [saved, setSaved] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  function move(next: number) {
    setStep(next);
    requestAnimationFrame(() => {
      heading.current?.focus({ preventScroll: true });
      heading.current?.scrollIntoView({ block: "center", behavior: "instant" });
    });
  }
  const key =
    answers[4] === "unsure"
      ? "eligibility-check"
      : answers[4] === "dual"
        ? "dual-review"
        : answers[0] === "complex" ||
            answers[1] === "keep" ||
            answers[2] === "travel" ||
            ["predictable", "freedom"].includes(answers[3])
          ? "compare-coverage"
          : "compare-costs";
  if (saved)
    return (
      <section className="engine-card" aria-live="polite">
        <h2 tabIndex={-1} ref={heading}>
          {results[key].title}
        </h2>
        <ul>
          {results[key].points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <p>
          Your request is saved. This checklist isn&apos;t a plan recommendation or an eligibility
          decision.
        </p>
        <p>
          <a
            href={ENGINE_BOOKING_URL}
            target="_blank"
            rel="noopener"
            data-cta-location="tool_result"
            className="engine-button"
          >
            Book a 45-minute phone review
          </a>
          {" "}
          <a href="/start" className="underline">
            Or send a question
          </a>
        </p>
        <p>
          <a href="tel:+19194086671">(919) 408-6671</a>
        </p>
      </section>
    );
  if (step === FIT_QUESTIONS.length)
    return (
      <section>
        <h2 className="engine-sr" tabIndex={-1} ref={heading}>
          Request your next steps
        </h2>
        <EngineContact
          answers={answers}
          onSaved={() => {
            setSaved(true);
            requestAnimationFrame(() => heading.current?.focus());
          }}
        />
        <button className="engine-back" onClick={() => move(4)}>
          Back to the last question
        </button>
      </section>
    );
  const question = FIT_QUESTIONS[step];
  return (
    <section className="engine-card">
      <p>Question {step + 1} of 5</p>
      <progress max={5} value={step + 1} aria-label="Quiz progress" />
      <h2 tabIndex={-1} ref={heading}>
        {question.title}
      </h2>
      <div className="engine-options">
        {question.options.map(([value, label]) => (
          <button
            key={value}
            aria-pressed={answers[step] === value}
            onClick={() => {
              const next = answers.slice(0, step);
              next[step] = value;
              setAnswers(next);
              move(step + 1);
            }}
          >
            {label}
          </button>
        ))}
      </div>
      {step > 0 && (
        <button className="engine-back" onClick={() => move(step - 1)}>
          Back
        </button>
      )}
    </section>
  );
}
