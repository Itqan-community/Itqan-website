#!/usr/bin/env node
/**
 * Screenshots the running dev server for visual comparison against Figma.
 * Usage: node scripts/shoot.mjs <outDir> [path=/ ...]
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const outDir = resolve(process.argv[2] ?? "shots");
const paths = process.argv.slice(3).length ? process.argv.slice(3) : ["/"];
const base = process.env.BASE_URL ?? "http://localhost:3000";

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();

const viewports = [
  { name: "desktop", width: 1440, height: 1200, dsf: 1 },
  { name: "mobile", width: 390, height: 900, dsf: 2 },
];

for (const vp of viewports) {
  const page = await browser.newPage({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.dsf,
  });

  for (const p of paths) {
    const slug = p === "/" ? "home" : p.replace(/\//g, "-").replace(/^-/, "");
    await page.goto(base + p, { waitUntil: "networkidle" });
    // Force every scroll-reveal into its settled state before capture.
    await page.evaluate(async () => {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise((r) => setTimeout(r, 400));
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 400));
    });
    await page.waitForTimeout(600);
    await page.screenshot({
      path: `${outDir}/${slug}-${vp.name}.png`,
      fullPage: true,
    });
    console.log(`✓ ${slug}-${vp.name}`);
  }

  await page.close();
}

await browser.close();
