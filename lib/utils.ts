import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * The type scale in globals.css is named by its pixel size at the default root
 * (text-18, text-28…). tailwind-merge only knows Tailwind's own scale names, so
 * without this it reads `text-20` as a colour rather than a font size and stops
 * treating the two as conflicting — which let a base `text-18` survive
 * alongside an overriding `text-20` and win on source order.
 */
const TYPE_SCALE = [
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "22",
  "24",
  "26",
  "27",
  "28",
  "30",
  "32",
  "34",
  "36",
  "38",
  "40",
  "42",
  "46",
  "48",
];

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: TYPE_SCALE }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
