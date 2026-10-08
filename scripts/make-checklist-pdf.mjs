// Renders scripts/checklist-pdf/turning-65-checklist.html to public/turning-65-checklist.pdf.
// Usage: node scripts/make-checklist-pdf.mjs   (needs Chrome or Edge installed)
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const browser = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
].find(existsSync);
if (!browser) throw new Error("Chrome or Edge not found.");

const src = join(root, "scripts/checklist-pdf/turning-65-checklist.html");
const out = join(root, "public/turning-65-checklist.pdf");
execFileSync(
  browser,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    "--virtual-time-budget=4000",
    `--print-to-pdf=${out}`,
    pathToFileURL(src).href,
  ],
  { stdio: "ignore" },
);
console.log(`wrote ${out}`);
