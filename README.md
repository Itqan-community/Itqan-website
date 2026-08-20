# إتقان — itqan.dev

Next.js 16 (App Router) + Tailwind v4 port of the **itqan-v2** Figma file.

- Figma: `WMg16AJgSV6L9HmtNXkW9P`
- Language/direction: Arabic, `dir="rtl"` on `<html>`
- Type: Readex Pro (UI) + JetBrains Mono (code), both via `next/font/google`

```bash
npm run dev      # http://localhost:3000
npm run build
```

## Layout

```
src/app/                  /  •  /services  •  /projects
src/components/layout/    Navbar, Footer
src/components/home/      the 13 home sections
src/components/projects/  ProjectsExplorer (filter + grid + pagination)
src/components/ui/        Reveal (scroll entrance)
src/lib/nav.ts            nav + footer content
public/figma/             every exported Figma asset
scripts/                  asset fetcher + screenshot helpers
```

## Design tokens

`src/app/globals.css` mirrors the Figma variable collection 1:1 — the CSS custom
property names match the Figma variable paths (`color/brand` → `--color-brand`,
`radius/topic` → `--radius-topic`, and so on), so the two stay legible against
each other. Every component references tokens rather than raw hex.

Two conventions worth knowing:

- **Line height.** Every text style in the file uses Figma's auto line height,
  which resolves to the font's own metrics. That is `line-height: normal` in
  CSS, set once on `body` — not a numeric multiplier. Substituting a looser
  value inflates every section by 3–15%.
- **RTL child order.** Figma has no RTL auto-layout, so the designer ordered
  horizontal children left-to-right on canvas. Under `dir="rtl"` the first DOM
  child renders furthest right, so the DOM order is the **reverse** of the Figma
  child list. Sections where visual order matters more than reading order
  (partner grid, stats row) are pinned with `dir="ltr"` instead.

## Assets

MCP asset URLs expire ~7 days after export, so every asset is committed under
`public/figma/`. `scripts/figma-assets.json` maps each committed file back to
its export URL; re-run the fetcher after re-exporting from Figma:

```bash
node scripts/fetch-figma-assets.mjs
```

## Motion

Taken from the Figma timeline (`get_motion_context` on the hero cohort) and from
the component descriptions in the file:

| Element | Spec |
| --- | --- |
| Hero root | opacity 0→1, scale .97→1, 800ms `cubic-bezier(.16,1,.3,1)` |
| Hero backdrop | opacity 0→1, y 24→0, 600ms `cubic-bezier(.4,0,.6,1)` |
| Hero card column | 39.42px/s over a 788.4px cycle → 20s linear loop |
| Mote | rises 160px over 9s, fades in at 25%, out at 100% |
| Button / Primary | hover lifts 2px, deeper shadow (`transform .18s`, `box-shadow .25s`) |
| Button / Ghost | hover adds a 6% brand tint and lifts 2px |

Section entrances use `Reveal` (IntersectionObserver) with the same easing.
Everything collapses under `prefers-reduced-motion`.

## Verifying against Figma

```bash
node scripts/slice.mjs <outDir> <path> [width]   # one PNG per section
node scripts/shoot.mjs <outDir> [paths...]       # full-page, desktop + mobile
```

Section heights currently land within ~1% of the Figma frames at 1440px.

## Known deviations

- **Apps section badge** (`دليل التطبيقات`) uses `#a7d4c8` on a
  `rgba(255,255,255,.08)` pill, exactly as specified — which is near-invisible on
  the white ground. Kept faithful; worth raising with the designer.
- **All Apps Legend** (`180:354`) is `visible: false` in Figma, so it is not
  rendered.
- **Projects slider** — Figma composes one slide (فنار) plus three dots. Slides 2
  and 3 reuse the template with project names from the footer nav; their copy is
  not in the design file.
- **Mobile.** The 390px frames are a separate design, not a reflow. The Impact
  and Projects sections have bespoke mobile components matching frames `183:249`
  and `183:285`. The remaining sections reflow the desktop design instead of
  matching their abbreviated mobile frames — see the note below.

### Remaining mobile work

`itqan-mobile-website` (`183:176`) and `itqan-services-mobile` (`206:236`)
restructure these sections with their own copy; they currently render as a
responsive stack of the desktop content:

| Section | Mobile frame | Current |
| --- | --- | --- |
| Hero | 183:182 (921px) | 985px |
| Stats | 183:233 (372px) | 272px |
| CTA | 183:276 (366px) | 438px |
| Launch | 183:325 (957px) | 1591px |
| Apps | 183:352 (358px, 4-card rail) | 397px |
| Partners | 183:372 (438px, chips + featured publisher) | 1478px |
| Newsletter | 183:396 (343px, form only) | 938px |
| FAQ | 183:407 (428px, 2 items) | 2225px |
| Footer | 183:423 (599px) | 1293px |

Note that several mobile frames show an abbreviated subset (4 of 17 apps, 6 of
12 partners, 2 of 9 FAQs). Matching those frames literally would drop real
content, so the mobile pass should adopt their *layout* while keeping the full
content set.
