"use client";

import Link from "next/link";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

import { ShareButton } from "@/app/wealth/ui/controls";
import { useMarkExplored } from "@/app/wealth/ui/hooks";
import { Confetti } from "@/app/wealth/ui/Confetti";
import { FIRST_1000_START, getPlanResult, getTreeNode } from "@/lib/wealth/quizzes";

const path = "/wealth/quiz/first-1000";
/** The longest route through the tree, for the progress dots. */
const MAX_STEPS = 5;

export function FirstThousandQuiz() {
  useMarkExplored("first-1000");
  const [trail, setTrail] = useState<string[]>([FIRST_1000_START]);

  // A shared link opens straight on its plan.
  useEffect(() => {
    const plan = new URLSearchParams(window.location.search).get("plan");
    if (plan && getPlanResult(plan)) queueMicrotask(() => setTrail([FIRST_1000_START, `result:${plan}`]));
  }, []);

  const [picked, setPicked] = useState<number | null>(null);
  // Hold for a beat so the choice visibly lands before the next question slides in.
  const choose = (next: string, index: number) => {
    if (picked !== null) return;
    setPicked(index);
    window.setTimeout(() => {
      setPicked(null);
      setTrail((previous) => [...previous, next]);
    }, 300);
  };

  const current = trail[trail.length - 1];
  const result = current.startsWith("result:") ? getPlanResult(current.slice(7)) : undefined;
  const node = result ? undefined : getTreeNode(current);
  const restart = () => setTrail([FIRST_1000_START]);

  if (result) {
    return (
      <div className="w-quiz w-result">
        <div className="w-result-card" data-tilt>
          <Confetti />
          <p className="w-eyebrow">A plan to think over</p>
          <h2 className="w-result-name" style={{ fontSize: "clamp(2rem, 9vw, 3.2rem)", fontStyle: "normal" }}>
            {result.title}
          </h2>
          <p className="w-result-sum">{result.summary}</p>
        </div>
        <div className="w-prose" style={{ marginTop: 28 }}>
          <p className="w-steps-title">Steps people take from here</p>
          <ol>
            {result.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="w-answer" style={{ marginTop: 8 }}>
            <span>Watch out</span>
            {result.watchOut}
          </p>
        </div>
        <ul className="w-next-list" style={{ marginTop: 24 }}>
          {result.links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>
                <span>Next</span>
                <strong>{link.label}</strong>
                <ArrowUpRight size={20} aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
        <div className="w-btn-row">
          <ShareButton
            title="What should I do with my first $1,000?"
            text={`My plan: ${result.title}. Get yours in about a minute:`}
            path={`${path}?plan=${result.id}`}
            label="Share my plan"
            className="w-btn"
          />
          <button type="button" className="w-btn w-btn-ghost" onClick={restart}>
            <RotateCcw size={18} aria-hidden /> Start over
          </button>
        </div>
        <p className="w-note">
          <strong>This is education, not advice.</strong> It&apos;s the standard order for the basics, based
          on a few questions. It doesn&apos;t know your whole situation, and it never recommends a product.
        </p>
      </div>
    );
  }

  if (!node) return null;
  const step = trail.length;

  return (
    <div className="w-quiz">
      <div className="w-quiz-progress" aria-hidden>
        {Array.from({ length: MAX_STEPS }, (_, index) => (
          <i key={index} data-on={index < step ? "true" : undefined} />
        ))}
      </div>
      <div className="w-quiz-step" key={node.id}>
        <p className="w-eyebrow">Question {step}</p>
        <h2 className="w-quiz-q">{node.question}</h2>
        {node.help ? <p className="w-quiz-help">{node.help}</p> : null}
        <ul className="w-options">
          {node.options.map((option, index) => (
            <li key={option.label}>
              <button
                type="button"
                className="w-option"
                data-picked={picked === index ? "true" : undefined}
                onClick={() => choose(option.next, index)}
              >
                <b aria-hidden>{String.fromCharCode(65 + index)}</b>
                {option.label}
              </button>
            </li>
          ))}
        </ul>
        {trail.length > 1 ? (
          <button type="button" className="w-quiz-back" onClick={() => setTrail((previous) => previous.slice(0, -1))}>
            Back
          </button>
        ) : null}
      </div>
    </div>
  );
}
