"use client";

/** Client wrapper: mounts the shared quiz runner with this quiz's data. */

import { QuizRunner } from "../medigap-or-advantage-quiz/quiz-engine/quiz-engine";
import { DATA } from "./data";

export function RothConversionQuizClient() {
  return <QuizRunner data={DATA} />;
}
