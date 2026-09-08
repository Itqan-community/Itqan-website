# English Localization (`/en`) — Design Spec

Date: 2026-09-08
Status: Approved design, pending implementation plan

## Goal

Add an English version of the Itqan website using a full locale-prefixed routing
structure (`/ar/...`, `/en/...`), with auto-detection on the bare root. The English
homepage is translated from `landing-page-english.md`; internal English pages ship
as translated-chrome placeholders. Arabic remains the primary language.

## Decisions (user-approved)

1. **Option 3** — full `[locale]` dynamic segment; all pages live under a locale prefix.
2. Bare root `/` **auto-detects** via `Accept-Language`: Arabic browsers → `/ar`,
   everyone else → `/en`. Other bare legacy paths (`/projects`, ...) → `/ar/<path>`
   (Arabic-first SEO preservation).
3. Language switcher in the navbar (desktop + mobile drawer).
4. English homepage fully translated; English internal pages are placeholders with
   translated chrome. No translated article bodies.
5. Images shared between locales (skip for now).

## Architecture

### Routing

- All pages move from `app/` into `app/[locale]/`, where `locale` is `"ar" | "en"`.
  `app/[locale]/layout.tsx` validates with `hasLocale` + `notFound()`.
- `generateStaticParams` on the layout returns `[{ locale: "ar" }, { locale: "en" }]`.
- Resulting routes:
  - `/ar`, `/en` — homepage
  - `/ar|en/projects` — projects explorer
  - `/ar|en/newsletter` — newsletter archive
  - `/ar|en/articles`, `/ar|en/articles/[slug]` — articles
  - `/ar|en/services` — what we offer
- Stay outside `[locale]`: `app/api/newsletter/*` (route handlers), `app/robots.ts`,
  `app/sitemap.ts`, `app/globals.css`, `app/og-image.png`.

### Proxy (`src/proxy.ts`)

Next.js 16 file convention (renamed from middleware). Exported function `proxy`:

- Skip `_next`, `/api`, files with extensions, `favicon.ico`.
- If pathname starts with `/ar` or `/en` → pass through.
- If pathname is `/` → detect via `Accept-Language` (simple `ar` prefix check on the
  header is sufficient; no i18n matcher library) → redirect to `/ar` or `/en`.
- Else → redirect to `/ar/<path>` (preserves query string).
- Matcher excludes `_next` internal paths; API and static assets excluded in the
  function itself.

### Layouts & direction

- Single root layout `app/[locale]/layout.tsx`:
  `<html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>`.
- Fonts unchanged: Readex Pro (arabic + latin subsets) + JetBrains Mono.
- Per-locale metadata from the dictionary (title, description); og-image shared.
- `LayoutProps<'/[locale]'>` and `PageProps<'/[locale]/...'>` typed helpers.

### Dictionaries

- `src/lib/i18n/types.ts` — the `Locale` type and the `Dictionary` type (derived
  from `typeof ar` so `en.ts` is type-checked against the Arabic shape).
- `src/lib/i18n/ar.ts` — all Arabic strings currently hardcoded inline move here:
  - Navbar/footer labels (from `src/lib/nav.ts`, which becomes per-locale data),
  - All 16 home sections (`src/components/home/*`) incl. hero topics, stats, impact
    cards, CTA, projects, launch, apps, publishers, partners, newsletter, FAQ.
- Internal-page copy (services/projects/newsletter/articles headings) stays in its
  own page file — each internal page renders exactly one locale (Arabic content or
  English placeholder), so no per-locale strings are needed there.
- `src/lib/i18n/en.ts` — English content from `landing-page-english.md`.
- Shape: one nested object per component/section (e.g. `dict.home.hero`,
  `dict.nav`, `dict.faq.items`), plus arrays for repeated data (stats, FAQ, partners).
- Strings are plain serializable data — no functions in dictionaries — so client
  components receive their slice as props.

### Component refactor pattern

- Server components: pages read `getDictionary(locale)` and pass the relevant slice
  down as props.
- Client components (`Navbar`, `Footer` if interactive, `NewsletterSubscribeForm`,
  `ProjectsExplorer`, FAQ accordion, `NewsletterCard`) receive their dictionary
  slice as props; no new context providers.
- Components keep their default behavior unchanged visually; only text sourcing
  changes. Any hardcoded `dir="rtl"` / `text-right` (articles page) is replaced
  with logical properties (`text-start`/`text-end`) or removed (inherits from
  `<html dir>`).
- Internal link hrefs in nav/footer become locale-prefixed (e.g. `/ar/newsletter`,
  `/en/newsletter`); external links unchanged.

### Language switcher

- `src/components/layout/LocaleSwitch.tsx` (client): shows "EN" on Arabic pages and
  "عربي" on English pages; swaps the first path segment via `usePathname`.
- Rendered in the desktop navbar (next to the CTA) and in the mobile drawer.

## Pages & content

- **`/ar`**: identical content to today's homepage (strings relocated to dict).
- **`/en`**: fully translated from `landing-page-english.md`, same sections, same
  order, same imagery. Stats (15+, 1500+, 5700+, 580+), project cards (Fanar, RATQ,
  Quranic Apps Directory), apps grid, publishers, partners, newsletter carousel,
  FAQ (9 items) all translated.
- **`/ar/<internal>`**: current pages moved verbatim under the locale segment.
- **`/en/<internal>`** (`/en/projects`, `/en/newsletter`, `/en/articles`,
  `/en/services`, `/en/articles/[slug]`): translated Navbar/Footer/PageHeader +
  placeholder body ("English version coming soon") in a styled card; no translated
  data (no article cards, no explorer, no archive grid).

## SEO

- `sitemap.ts` emits both locales per page with `alternates.languages` hreflang
  pairs (`ar`, `en`, `x-default` → `/ar`).
- Each page's `metadata` gets `alternates: { canonical, languages }` for its locale.
- Root page (`/`) itself is never rendered — the proxy always redirects, so no
  duplicate canonical.

## Error handling

- Unknown locale in URL (`/fr/...`) → `notFound()` → default 404.
- Proxy failures fall through to normal routing (redirects are best-effort).
- Newsletter archive fetch failure behavior unchanged per locale.

## Testing & verification

- `npm run build` must pass.
- `npm run lint`.
- Playwright smoke script (throwaway, not committed unless asked):
  - `/` redirects by `Accept-Language` (ar and en cases)
  - `/projects` → `/ar/projects`
  - `/ar` and `/en` render with correct `lang`/`dir` on `<html>`
  - `/en` homepage contains key English strings; `/ar` unchanged
  - `/en/projects` shows placeholder
  - switcher swaps locale on current path
- Verify no Arabic string remains rendered on `/en` (spot check via DOM text).

## Out of scope

- Translated article bodies, projects data, newsletter archive content (placeholders only).
- Image localization.
- Auto-locale negotiation on deep links (only `/` auto-detects).
