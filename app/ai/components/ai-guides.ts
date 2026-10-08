export type AiGuide = {
  slug: string;
  title: string;
  blurb: string;
};

export const AI_GUIDES: readonly AiGuide[] = [
  {
    slug: "ai-for-job-search",
    title: "AI for job search",
    blurb:
      "Sharper resumes and better interview prep, without letting it invent your work history.",
  },
  {
    slug: "ai-for-small-business",
    title: "AI for small business",
    blurb: "What a one-person business can automate. From my own playbook, with honest limits.",
  },
  {
    slug: "ai-for-seniors",
    title: "AI for seniors",
    blurb: "The simplest useful starting points for 65 and up, plus the scams to watch for.",
  },
  {
    slug: "ai-money-tasks",
    title: "AI for money tasks",
    blurb:
      "Budgeting help, bill scripts, and subscription audits. Educational, never personal advice.",
  },
  {
    slug: "ai-mistakes-to-avoid",
    title: "AI mistakes to avoid",
    blurb: "Hallucinations, sensitive data, and blind trust. The three traps, and the fix.",
  },
];
