/**
 * Screenshot capture helper for the portfolio.
 *
 * Captures a live page at exactly the size the portfolio's browser-frame
 * cards use (1440×900 @ 2x) and saves it straight into the right project
 * folder under public/shots/.
 *
 * Setup (once):
 *   npx playwright install chromium
 *
 * Usage:
 *   node capture.mjs <project-id> "<url>" <name>
 *
 * Examples:
 *   node capture.mjs tracksphere "https://talhadev-pk.github.io/tracksphere/#/app/overview" overview
 *   node capture.mjs tracksphere "https://talhadev-pk.github.io/tracksphere/#/app/board"    kanban
 *   node capture.mjs restaurantos "http://localhost:5173/" pos
 *
 * Tip: to capture an app's dark theme, set the theme inside that app first —
 * its preference is persisted, but each capture uses a fresh browser profile,
 * so append the light/dark variant of what you want to show, or capture the
 * route whose default theme you prefer.
 *
 * After capturing, register each file in src/config/portfolio.ts (README has
 * the full guide), then commit + push.
 */

import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const [, , projectId, url, name] = process.argv;

const VALID_IDS = ["flowpilot", "commerceos", "proseq-ai", "tracksphere", "nexacore", "restaurantos"];

if (!projectId || !url || !name) {
  console.error(
    "Usage: node capture.mjs <project-id> \"<url>\" <name>\n" +
      "  project-id: " + VALID_IDS.join(", ")
  );
  process.exit(1);
}

if (!VALID_IDS.includes(projectId)) {
  console.error(`Unknown project id "${projectId}". Valid: ${VALID_IDS.join(", ")}`);
  process.exit(1);
}

const safeName = name.replace(/[^a-z0-9-]+/gi, "-").toLowerCase();
const outDir = path.join("public", "shots", projectId);
const outFile = path.join(outDir, `${safeName}.png`);

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2, // retina-crisp
});

console.log(`Opening ${url} …`);
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(2500); // let animations settle / loader finish
await page.screenshot({ path: outFile });
await browser.close();

console.log(`Saved → ${outFile}`);
console.log(`Register it in src/config/portfolio.ts:`);
console.log(
  `  { src: "shots/${projectId}/${safeName}.png", alt: "${projectId} ${safeName} view", caption: "${safeName}" },`
);
