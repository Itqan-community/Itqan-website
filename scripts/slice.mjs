#!/usr/bin/env node
/**
 * Captures one screenshot per <section> of a page so each can be compared
 * against its Figma node.
 * Usage: node scripts/slice.mjs <outDir> <path> [width=1440]
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const outDir = resolve(process.argv[2] ?? "shots");
const path = process.argv[3] ?? "/";
const width = Number(process.argv[4] ?? 1440);
const base = process.env.BASE_URL ?? "http://localhost:3000";

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width, height: 1000 },
  deviceScaleFactor: 1,
});

await page.goto(base + path, { waitUntil: "networkidle" });
await page.evaluate(async () => {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
  window.scrollTo(0, document.body.scrollHeight);
  await new Promise((r) => setTimeout(r, 500));
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 500));
});
await page.waitForTimeout(500);

const slug = path === "/" ? "home" : path.replace(/\//g, "-").replace(/^-/, "");
const targets = await page.$$("body > header, main > *, body > footer");

let i = 0;
for (const el of targets) {
  const box = await el.boundingBox();
  // Sections hidden at this breakpoint (desktop-only / mobile-only) have no box.
  if (!box || box.width === 0 || box.height === 0) continue;
  const name = `${slug}-${String(i).padStart(2, "0")}`;
  await el.screenshot({ path: `${outDir}/${name}.png` });
  console.log(`✓ ${name} ${Math.round(box.width)}x${Math.round(box.height)}`);
  i += 1;
}

await browser.close();
