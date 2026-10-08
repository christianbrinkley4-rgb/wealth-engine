"use client";

/** Client wrapper: mounts the shared quiz runner with this quiz's data. */

import { QuizRunner } from "./quiz-engine/quiz-engine";
import { DATA } from "./data";

export function MedigapQuizClient() {
  return <QuizRunner data={DATA} />;
}
