import { TRAFFIC_GUIDES, TRAFFIC_GUIDE_DATE } from "@/lib/trafficGuides";
import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/articles";
import { ASK_QUESTIONS } from "@/lib/askWall";
import { SITE_URL } from "@/lib/seo";
import { TAX_ARTICLES } from "@/lib/taxArticles";
import { TRIAD_CITIES } from "@/lib/triad";
import { WEALTH_ARTICLES } from "@/lib/wealth/articles";
import { PERSONALITIES } from "@/lib/wealth/quizzes";

const STATIC_ROUTES: Array<{
  path: string;
  lastModified?: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1.0, lastModified: "2026-10-07" },
  { path: "/insurance-services", changeFrequency: "monthly", priority: 0.9, lastModified: "2026-10-07" },
  { path: "/care-coverage", changeFrequency: "monthly", priority: 0.85 },
  { path: "/long-term-care-insurance", changeFrequency: "monthly", priority: 0.85 },
  { path: "/short-term-care-insurance", changeFrequency: "monthly", priority: 0.8 },
  { path: "/critical-illness-insurance", changeFrequency: "monthly", priority: 0.8 },
  { path: "/turning-65", changeFrequency: "weekly", priority: 0.95 },
  { path: "/medicare-costs", changeFrequency: "monthly", priority: 0.9 },
  { path: "/medicare-numbers-2027", changeFrequency: "weekly", priority: 0.95, lastModified: "2026-10-08" },
  { path: "/numbers", changeFrequency: "weekly", priority: 0.95, lastModified: "2026-10-08" },
  { path: "/medicare-changes-2027", changeFrequency: "weekly", priority: 0.95, lastModified: "2026-10-08" },
  { path: "/medicare-part-d-donut-hole-2027", changeFrequency: "monthly", priority: 0.9, lastModified: "2026-10-08" },
  { path: "/turning-65-checklist", changeFrequency: "monthly", priority: 0.9, lastModified: "2026-10-08" },
  { path: "/medicare-advantage-vs-medigap-greensboro-nc", changeFrequency: "monthly", priority: 0.9, lastModified: "2026-10-08" },
  { path: "/medicare-supplement-plans-greensboro-nc", changeFrequency: "monthly", priority: 0.9, lastModified: "2026-10-08" },
  { path: "/special-enrollment", changeFrequency: "monthly", priority: 0.85 },
  { path: "/annual-enrollment", changeFrequency: "weekly", priority: 0.95 },
  { path: "/aep", changeFrequency: "weekly", priority: 0.95 },
  { path: "/anoc", changeFrequency: "weekly", priority: 0.9 },
  { path: "/medicare-creedmoor-nc", changeFrequency: "weekly", priority: 0.9 },
  { path: "/medicare-asheboro-nc", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-10-04" },
  { path: "/medicare-mebane-nc", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-10-04" },
  { path: "/medicare-oxford-nc", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-10-04" },
  { path: "/medicare-eden-nc", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-10-04" },
  { path: "/medicare-roxboro-nc", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-10-04" },
  { path: "/medicare-madison-nc", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-10-04" },
  { path: "/medicare-butner-nc", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-10-04" },
  { path: "/medicare-graham-nc", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-10-04" },
  { path: "/medicare-liberty-nc", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-10-04" },
  { path: "/medicare-ramseur-nc", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-10-04" },
  { path: "/medicare-nc-towns", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-10-04" },
  { path: "/plan-check", changeFrequency: "weekly", priority: 0.95, lastModified: "2026-10-04" },
  { path: "/medicare-annual-enrollment-2026-checklist", changeFrequency: "monthly", priority: 0.9 },
  { path: "/medicare-advantage-doctor-networks", changeFrequency: "monthly", priority: 0.9 },
  { path: "/advantage-vs-medigap", changeFrequency: "monthly", priority: 0.9 },
  { path: "/social-security-timing", changeFrequency: "monthly", priority: 0.9 },
  { path: "/keep-my-doctor", changeFrequency: "monthly", priority: 0.9 },
  { path: "/helping-a-parent", changeFrequency: "monthly", priority: 0.9 },
  { path: "/irmaa-appeal", changeFrequency: "monthly", priority: 0.85 },
  { path: "/service-area", changeFrequency: "monthly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.85 },
  { path: "/privacy", changeFrequency: "monthly", priority: 0.5 },
  { path: "/medicare", changeFrequency: "weekly", priority: 0.8 },
  { path: "/part-b-penalty", changeFrequency: "monthly", priority: 0.9 },
  { path: "/medicare-costs-2026", changeFrequency: "monthly", priority: 0.95 },
  { path: "/plan", changeFrequency: "weekly", priority: 0.8 },
  { path: "/annuities", changeFrequency: "monthly", priority: 0.85 },
  { path: "/life-insurance", changeFrequency: "monthly", priority: 0.85 },
  { path: "/retirement-income", changeFrequency: "monthly", priority: 0.85 },
  { path: "/roth-window", changeFrequency: "weekly", priority: 0.55 },
  { path: "/answers", changeFrequency: "weekly", priority: 0.8, lastModified: "2026-10-01" },
  { path: "/learn", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-10-05" },
  { path: "/taxes-and-retirement", changeFrequency: "monthly", priority: 0.85, lastModified: "2026-10-05" },
  { path: "/medicare-words", changeFrequency: "monthly", priority: 0.85, lastModified: "2026-10-05" },
  // The christianbuildswealth hub.
  ...[
    "/wealth",
    "/wealth/calculators",
    "/wealth/quiz",
    "/wealth/quiz/first-1000",
    "/wealth/quiz/money-personality",
    "/wealth/learn",
    "/wealth/journey",
    "/wealth/tools",
    "/wealth/money-moves-in-your-20s",
    "/wealth/roth-ira-explained",
    "/wealth/building-in-public",
    "/wealth/teens-first-job-money-guide",
    "/wealth/credit-score-basics",
    "/wealth/budgeting-that-actually-works",
    "/wealth/student-loans-payoff-plan",
    "/wealth/buying-first-home-money-guide",
    "/wealth/401k-explained",
    "/wealth/life-insurance-explained",
    "/wealth/529-college-savings-basics",
    "/wealth/catch-up-contributions-after-50",
    "/wealth/pre-retirement-5-year-checklist",
    "/wealth/first-tax-return-guide",
    "/wealth/tax-brackets-explained-plainly",
    "/wealth/roth-vs-traditional-taxes",
    "/wealth/disability-insurance-explained",
    "/wealth/health-insurance-basics",
    "/wealth/broke-money-reset-plan",
    "/wealth/emergency-fund-guide",
    "/wealth/social-security-explained",
    "/wealth/hsa-explained",
    "/wealth/rmd-explained-73",
    "/wealth/credit-cards-beginners",
    "/wealth/rent-vs-buy-math",
    "/wealth/car-buying-money-guide",
    "/wealth/side-hustle-taxes",
    "/wealth/529-vs-roth-for-college",
    "/links",
  ].map((path) => ({
    path,
    changeFrequency: "weekly" as const,
    priority: path === "/wealth" ? 0.9 : path === "/links" ? 0.4 : 0.8,
    lastModified: "2026-10-08",
  })),
  // Standalone money calculators.
  ...[
    "/tools",
    "/tools/roth-vs-traditional",
    "/tools/emergency-fund",
    "/tools/debt-payoff",
    "/tools/retirement-projector",
    "/tools/take-home-pay",
    "/tools/life-insurance-needs",
    "/tools/compound-interest",
    "/tools/budget",
    "/tools/medigap-or-advantage-quiz",
    "/tools/roth-conversion-quiz",
    "/tools/cd-or-savings-quiz",
  ].map((path) => ({
    path,
    changeFrequency: "weekly" as const,
    priority: path === "/tools" ? 0.85 : 0.75,
    lastModified: "2026-10-08",
  })),
  // AI in daily life guides.
  ...[
    "/ai",
    "/ai/ai-tools-compared",
    "/ai/which-ai-for-which-task",
    "/ai/ai-for-job-search",
    "/ai/ai-for-small-business",
    "/ai/ai-for-seniors",
    "/ai/ai-money-tasks",
    "/ai/ai-mistakes-to-avoid",
    "/ai/connect",
  ].map((path) => ({
    path,
    changeFrequency: "weekly" as const,
    priority: path === "/ai" ? 0.85 : 0.75,
    lastModified: "2026-10-08",
  })),
  { path: "/guides", changeFrequency: "weekly", priority: 0.8, lastModified: TRAFFIC_GUIDE_DATE },
  ...TRAFFIC_GUIDES.map((guide) => ({ path: `/guides/${guide.slug}`, changeFrequency: "monthly" as const, priority: 0.8, lastModified: TRAFFIC_GUIDE_DATE })),
  // Self-directed SEO guides.
  ...[
    "/guides/what-medicare-does-not-cover",
    "/guides/medicare-hsa-contributions",
    "/guides/working-while-collecting-social-security",
    "/guides/is-social-security-taxed",
    "/guides/missed-medicare-enrollment",
    "/guides/medicare-automatic-renewal",
    "/guides/medicare-part-b-employer-coverage",
    "/guides/medicare-travel",
    "/guides/irmaa-brackets-2026",
    "/guides/standard-deduction-seniors-2026",
  ].map((path) => ({
    path,
    changeFrequency: "weekly" as const,
    priority: 0.8,
    lastModified: "2026-10-08",
  })),
  ...PERSONALITIES.map((type) => ({
    path: `/wealth/quiz/money-personality/${type.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
    lastModified: "2026-10-06",
  })),
  ...WEALTH_ARTICLES.map((article) => ({
    path: `/wealth/learn/${article.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    lastModified: article.updated,
  })),
  ...TAX_ARTICLES.map((article) => ({
    path: `/taxes-and-retirement/${article.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    lastModified: article.updated,
  })),
  ...ARTICLES.map((article) => ({
    path: `/answers/${article.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.85,
    lastModified: article.updated,
  })),
  // "Ask Christian" public Q&A wall.
  {
    path: "/ask",
    changeFrequency: "weekly" as const,
    priority: 0.8,
    lastModified: "2026-10-08",
  },
  ...ASK_QUESTIONS.map((question) => ({
    path: `/ask/${question.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    lastModified: question.updated,
  })),
];

/**
 * Stamped when the content last actually changed, not at build time. Using
 * `new Date()` told crawlers every page on the site had been rewritten on
 * every deploy, which is the fastest way to have lastmod ignored entirely.
 */
const CONTENT_LAST_REVIEWED = "2026-10-01";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = CONTENT_LAST_REVIEWED;

  // One entry per Triad city, generated from the same source the pages use.
  const cityRoutes: MetadataRoute.Sitemap = TRIAD_CITIES.flatMap((city) => [
    {
      url: `${SITE_URL}/medicare-in/${city.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/life-insurance-in/${city.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/retirement-in/${city.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
  ]);

  return [
    ...STATIC_ROUTES.map(({ path, changeFrequency, priority, lastModified: own }) => ({
      url: `${SITE_URL}${path}`,
      lastModified: own ?? lastModified,
      changeFrequency,
      priority,
    })),
    ...cityRoutes,
  ];
}
