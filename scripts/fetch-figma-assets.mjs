#!/usr/bin/env node
/**
 * Downloads exported Figma assets into public/figma.
 *
 * The MCP asset URLs expire ~7 days after export, so every asset referenced by
 * a component is committed to the repo. Re-export from Figma and update the
 * manifest below if a design changes.
 *
 * Usage: node scripts/fetch-figma-assets.mjs [path/to/manifest.json]
 *   manifest: { "public/figma/<name>.<ext>": "<figma asset url>" }
 */

import { mkdir, writeFile, readFile, access } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const manifestPath = resolve(process.argv[2] ?? "scripts/figma-assets.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

let downloaded = 0;
let skipped = 0;
const failures = [];

await Promise.all(
  Object.entries(manifest).map(async ([target, url]) => {
    const out = resolve(target);
    try {
      await access(out);
      skipped += 1;
      return;
    } catch {
      // not present yet — fetch it
    }

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const body = Buffer.from(await res.arrayBuffer());
      if (body.length === 0) throw new Error("empty body");
      await mkdir(dirname(out), { recursive: true });
      await writeFile(out, body);
      downloaded += 1;
    } catch (err) {
      failures.push(`${target}: ${err.message}`);
    }
  })
);

console.log(`downloaded ${downloaded}, already present ${skipped}, failed ${failures.length}`);
if (failures.length) {
  for (const f of failures) console.error("  ✗", f);
  process.exit(1);
}
