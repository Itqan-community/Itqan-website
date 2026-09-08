# English Localization (`/en`) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an English version of the site at `/en/...` (Arabic moves to `/ar/...`, root auto-detects) with a fully translated homepage and placeholder internal pages.

**Architecture:** All pages move under `app/[locale]/` (`ar | en`) with a root layout that sets `<html lang dir>` from the segment. A `src/proxy.ts` redirects bare `/` by `Accept-Language` and legacy bare paths to `/ar/<path>`. All Arabic strings move into a typed dictionary (`src/lib/i18n/ar.ts`); components receive their dictionary slice as props from server pages; `en.ts` mirrors the shape and is filled from `landing-page-english.md`.

**Tech Stack:** Next.js 16.3 (App Router, `proxy.ts` convention, `PageProps`/`LayoutProps` helpers), React 19, Tailwind CSS 4, TypeScript, Playwright (dev-only smoke).

**Spec:** `docs/superpowers/specs/2026-09-08-english-localization-design.md` — read it first; this plan argues from it.

## Global Constraints

- Locales are exactly `"ar" | "en"`; Arabic is the primary/x-default locale.
- Arabic at `/ar/...`, English at `/en/...`; bare `/` auto-detects via `Accept-Language`; other bare paths redirect to `/ar/<path>`.
- `src/proxy.ts` (NOT `middleware.ts` — renamed in Next 16; docs: `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`).
- Do not change the visual design of the Arabic site — string relocation only, plus logical-property fixes where RTL is hardcoded.
- Images/assets are shared between locales; nothing in `public/figma/` changes.
- Dictionaries contain only serializable data (no functions, no JSX). Rich text = `(string | { href, label })[]` segments.
- No test framework is installed — verification is `npx tsc --noEmit`, `npm run lint`, `npm run build`, and a throwaway Playwright script (Task 8).
- Verify with `npm run build` at the end of every task; commit after every task.
- `api/` routes, `robots.ts`, `sitemap.ts`, `globals.css`, `og-image.png` stay outside `[locale]`.

---

### Task 1: i18n foundation — types, Arabic dictionary, English dictionary

**Files:**
- Create: `src/lib/i18n/types.ts`
- Create: `src/lib/i18n/ar.ts`
- Create: `src/lib/i18n/en.ts`
- Create: `src/lib/i18n/index.ts`

**Interfaces:**
- Produces: `type Locale = "ar" | "en"`, `type RichSegment = string | { href: string; label: string }`, `type Dictionary = typeof ar`, `const locales: Locale[]`, `hasLocale(x: string): x is Locale`, `getDictionary(locale: Locale): Dictionary` (sync, pure). All later tasks import these from `@/lib/i18n`.

- [ ] **Step 1: Create `src/lib/i18n/types.ts`**

```ts
export type Locale = "ar" | "en";

/** Serializable rich text: plain strings and inline links. */
export type RichSegment = string | { href: string; label: string };
```

- [ ] **Step 2: Create `src/lib/i18n/ar.ts`**

Move every Arabic string currently hardcoded in the listed source into this shape. Values marked `←` must be copied verbatim from the current file (do not retype). Do NOT use `as const` (literal types would force `en.ts` to match character-for-character).

```ts
import type { RichSegment } from "./types";

const ar = {
  meta: {
    title: "إتقان — ملتقى العاملين على التقنيات القرآنية", // ← src/app/layout.tsx:23
    description:
      "مجتمع تقني مفتوح المصدر يسعى لسد الفجوة التقنية وتوفير برمجيات لجميع العاملين على كتاب الله", // ← layout.tsx:24-25
    applicationName: "إتقان",
    authorName: "إتقان",
    ogAlt: "إتقان — ملتقى العاملين على التقنيات القرآنية", // ← layout.tsx:42
  },

  nav: {
    homeAria: "إتقان — الصفحة الرئيسية", // ← Navbar.tsx:37,144
    logoAlt: "إتقان",
    menuAria: "القائمة", // ← Navbar.tsx:159
    cta: "انضم لمجتمع إتقان", // ← Navbar.tsx:138,248
    items: [
      { label: "ما الذي نقدمه؟", href: "/ar/services", external: false }, // ← src/lib/nav.ts:27
      { label: "المشاريع", href: "/ar/#projects", external: false }, // ← nav.ts:28
      { label: "نشرة إتقان", href: "/ar/newsletter", external: false }, // ← nav.ts:29
      { label: "المقالات", href: "/ar/articles", external: false, hidden: true }, // ← nav.ts:30
      { label: "تواصل معنا", href: "https://join.itqan.dev", external: true }, // ← nav.ts:31
    ],
  },

  localeSwitch: {
    /** Label shown on the Arabic site, linking to the English page. */
    toOther: "EN",
    ariaLabel: "Switch to English",
  },

  footer: {
    brand: "إتقان", // ← Footer.tsx:27
    blurb:
      "جمعية ومجتمع تقني مفتوح المصدر يسعى لسد الفجوة وتوفير برمجيات ومصاحف رقمية خالية من الأخطاء ومهيئة للاستخدام مباشرة في الأنظمة والتطبيقات.", // ← src/lib/nav.ts:footerBlurb
    columns: [
      {
        title: "الموارد", // ← nav.ts:footerColumns
        links: [
          { label: "نشرة إتقان", href: "/ar/newsletter", external: false },
          { label: "المقالات", href: "/ar/articles", external: false, hidden: true },
          { label: "مجتمع إتقان", href: "https://community.itqan.dev", external: true },
          { label: "دليل التطبيقات القرآنية", href: "https://quran-apps.itqan.dev", external: true },
        ],
      },
    ],
    followUs: "تابعنا", // ← Footer.tsx:66
    newsletterTitle: "اشترك في النشرة البريدية", // ← Footer.tsx:72
    newsletterText:
      "احصل على آخر التحديثات لمشاريع ومخرجات المجتمع مباشرة في بريدك.", // ← Footer.tsx:73-75
    copyright: "© 2026 مجتمع إتقان. جميع الحقوق محفوظة لخدمة كتاب الله.", // ← nav.ts:copyright
    languageLabel: "العربية (ar)", // ← Footer.tsx:102
  },

  newsletterForm: {
    namePlaceholder: "الاسم", // ← NewsletterSubscribeForm.tsx:36
    emailPlaceholder: "ادخل بريدك الإلكتروني….", // ← NewsletterSubscribeForm.tsx:37 (light tone)
    emailPlaceholderDark: "بريدك الإلكتروني", // ← NewsletterSubscribeForm.tsx:50 (dark tone)
    submitLabel: "اشترك في نشرة إتقان", // ← NewsletterSubscribeForm.tsx:38
    submitLabelDark: "اشترك الآن", // ← NewsletterSubscribeForm.tsx:51
    submittingLabel: "جارٍ الاشتراك…", // ← NewsletterSubscribeForm.tsx:147
    successMessage: "تم الاشتراك بنجاح — ستصلك النشرة القادمة في بريدك.", // ← NewsletterSubscribeForm.tsx:95
    errorFallback: "حدث خطأ أثناء الاشتراك. يرجى المحاولة مرة أخرى.", // ← NewsletterSubscribeForm.tsx:103
    nameSrLabel: "الاسم", // ← NewsletterSubscribeForm.tsx:118
    emailSrLabel: "بريدك الإلكتروني", // ← NewsletterSubscribeForm.tsx:130
  },

  home: {
    hero: {
      title1: "ملتقى العاملين على", // ← Hero.tsx:157
      title2: "التقنيات القرآنية", // ← Hero.tsx:159
      description:
        "مجتمع إتقان هو مساحة تجمع جهود المطورين والباحثين لبناء وصيانة البنية التحتية التقنية، للارتقاء بمنظومة تطبيقات القرآن الكريم واستدامتها", // ← Hero.tsx:164-165
      ctas: [{ label: "انضم إلى المجتمع", href: "https://community.itqan.dev", external: true }], // ← Hero.tsx:169-171
      topics: [
        { category: "المشاريع والتعاون", title: "توحيد تسميات المصطلحات القرآنية في المشاريع المفتوحة", replies: "١٤" }, // ← Hero.tsx:24-28
        { category: "نقاشات المطورين", title: "أفضل طريقة لعرض المصحف مطابقًا للنسخة المطبوعة", replies: "٢٢" },
        { category: "نقاشات المطورين", title: "أزمة المصادر الصوتية المتاحة للمطورين", replies: "٩" },
      ],
      shotAlt: "من لقاءات مجتمع إتقان", // ← Hero.tsx:94,219
      codeCommentFull: "// صفحة من المصحف كبيانات منظّمة", // ← hero-cards.tsx:155
      codeCommentCompact: "// بيانات منظّمة للآيات", // ← hero-cards.tsx:153
      avatarInitials: ["م", "ن", "ح"], // ← hero-cards.tsx:72-76
    },

    stats: {
      items: [
        { value: "+580", label: "نقاش تقني" }, // ← StatsCard.tsx:12-15
        { value: "+5,700", label: "مساهمة", mobileLabel: "مساهمة مضافة" },
        { value: "+1,500", label: "مطور وباحث", mobileLabel: "مطور وباحث نشط" },
        { value: "+15", label: "مشروع مفتوح المصدر" },
      ],
    },

    impact: {
      badge: "مجتمع إتقان", // ← ImpactSection.tsx:46
      title: "كن جزءًا من أثر يمتد", // ← ImpactSection.tsx:48
      subtitle: "في مجتمع إتقان مساحة واسعة تجد فيها نفسك وتصنع بها الفارق", // ← ImpactSection.tsx:51
      cta: "انضم لمجتمع إتقان", // ← ImpactSection.tsx:94
      steps: [
        { number: "01", title: "ساهم", body: "اختر مشروعًا قائمًا وساهم فيه بمهاراتك ومراجعاتك وأفكارك" }, // ← ImpactSection.tsx:14-18
        { number: "02", title: "تعلم", body: "استفد من الخبراء لتطور مهاراتك في التقنيات القرآنية" },
        { number: "03", title: "ناقش", body: "انضم إلى مجتمع المطورين والباحثين وشارك خبراتك وأسئلتك" },
        { number: "04", title: "أطلق", body: "ابنِ قدرة مشروعك أو أطلق عليها دعم من مجتمع إتقان" },
      ],
    },

    impactMobile: {
      badge: "مجتمع إتقان", // ← ImpactSectionMobile.tsx:40
      title: "كن جزءًا من أثر يمتد", // ← ImpactSectionMobile.tsx:41
      subtitle: "في مجتمع إتقان مساحة واسعة تجد فيها نفسك وتصنع بها الفارق للقرآن الكريم", // ← ImpactSectionMobile.tsx:43
      steps: [
        { icon: "/figma/m-rocket.svg", title: "أطلق فكرتك", body: "لديك فكرة مشروع تقني لخدمة القرآن؟ ابنِ عليها بدعم من المطورين والخبراء بالمجتمع" }, // ← ImpactSectionMobile.tsx:14-17
        { icon: "/figma/m-message-square.svg", title: "ناقش وتحاور", body: "انضم إلى نقاشات المطورين والباحثين وشارك خبراتك واستفساراتك البرمجية واللغوية" },
        { icon: "/figma/m-book-open.svg", title: "تعلّم وتطور", body: "استفد من مكتبات المعرفة والدروس المشتركة لتطور مهاراتك في التقنيات القرآنية المتخصصة" },
        { icon: "/figma/m-git-pull-request.svg", title: "ساهم برمزك", body: "اختر مشروعًا قائمًا مفتوح المصدر وساهم في صيانة كوده البرمجي وتدقيقه" },
      ],
    },

    cta: {
      badge: "المجتمع المفتوح", // ← CtaSection.tsx:68
      title: "ساهم في بناء البنية التحتية التقنية للقرآن", // ← CtaSection.tsx:70
      body: "انضم إلى مجتمع المطورين المساهمين في بناء المكتبات البرمجية، وتحسين محركات البحث القرآنية، وتطوير قواعد البيانات الموثوقة التي تخدم مئات التطبيقات.", // ← CtaSection.tsx:73-75
    },

    projects: {
      badge: "مفتوح المصدر", // ← ProjectsSection.tsx:52
      title: "مشاريع مجتمعية", // ← ProjectsSection.tsx:54
      subtitle:
        "مشاريع تقنية مفتوحة المصدر تهدف لسد الثغرات في المحتوى التقني القرآني، متاحة للجميع للمساهمة والاستخدام", // ← ProjectsSection.tsx:56-58
      browseLabel: "تصفح المشروع", // ← ProjectsSection.tsx:105
      items: [
        {
          name: "دليل التطبيقات القرآنية", // ← ProjectsSection.tsx:22-27
          body: "منصة شاملة تجمع تطبيقات القرآن الكريم الرقمية وتُصنّفها وتُوثّقها وفق معايير موحّدة، لتُسهّل على المسلمين اكتشاف التطبيق المناسب لاحتياجهم، وتمنح المطورين والباحثين خريطة واضحة للمشهد التقني القرآني.",
          contributeLabel: "ساهم في الدليل",
        },
        {
          name: "رتق", // ← ProjectsSection.tsx:29-35
          body: "قاعدة معرفية تقنية (Roadmap and Technologies for Qur'an)، تجمع الأدوات والتقنيات اللازمة لتطوير التطبيقات القرآنية وتنظمها في خارطة طريق واضحة للمطورين.",
          contributeLabel: "ساهم في رتق",
        },
        {
          name: "فنار", // ← ProjectsSection.tsx:37-43
          body: "نظام لنشر وإدارة المحتوى القرآني، يمنح الجهات الناشرة مساحة رقمية مستقلة بهويتها الخاصة، تُمكّنها من نشر تلاواتها وأصولها القرآنية بمعايير احترافية وتراخيص محددة تحفظ حقوقها وتُنظم الاستخدام.",
          contributeLabel: "ساهم في فنار",
        },
      ],
      /* Logo + link URLs stay in the component, matched by index:
         logos: ["/figma/project-apps-arrows.png", "/figma/project-ratq-roadmap.png", "/figma/project-fanar-lighthouse.png"]
         sites: ["https://quran-apps.itqan.dev", "https://ratq.itqan.dev", "https://cms.itqan.dev"]
         repos: ["https://github.com/orgs/Itqan-community/projects/4", ".../10", ".../12"] */
    },

    projectsMobile: {
      badge: "مفتوح المصدر", // ← ProjectsSectionMobile.tsx:42
      title: "مشاريع مجتمعية نشطة", // ← ProjectsSectionMobile.tsx:44
      subtitle:
        "مشاريع تقنية مفتوحة المصدر تهدف لسد الثغرات في المحتوى التقني القرآني، متاحة للجميع للمساهمة والاستخدام مباشرة", // ← ProjectsSectionMobile.tsx:46-48
      items: [
        {
          title: "دليل التطبيقات القرآنية", // ← ProjectsSectionMobile.tsx:15-19
          body: "منصة شاملة تجمع تطبيقات القرآن الكريم الرقمية وتُصنّفها وتُوثّقها وفق معايير موحّدة، لتُسهّل على المسلمين اكتشاف التطبيق المناسب لاحتياجهم، وتمنح المطورين والباحثين خريطة واضحة للمشهد التقني القرآني.",
          primary: { label: "تصفح المشروع", href: "https://quran-apps.itqan.dev" },
          secondary: { label: "ساهم في الدليل", href: "https://github.com/orgs/Itqan-community/projects/4" },
        },
        {
          title: "رتق", // ← ProjectsSectionMobile.tsx:21-26
          body: "قاعدة معرفية تقنية (Roadmap and Technologies for Qur'an)، تجمع الأدوات والتقنيات اللازمة لتطوير التطبيقات القرآنية وتنظمها في خارطة طريق واضحة للمطورين.",
          primary: { label: "تصفح رتق", href: "https://ratq.itqan.dev" },
          secondary: { label: "ساهم في رتق", href: "https://github.com/orgs/Itqan-community/projects/10" },
        },
        {
          title: "فنار", // ← ProjectsSectionMobile.tsx:28-33
          body: "نظام لنشر وإدارة المحتوى القرآني، يمنح الجهات الناشرة مساحة رقمية مستقلة بهويتها الخاصة، تُمكّنها من نشر تلاواتها وأصولها القرآنية بمعايير احترافية وتراخيص محددة تحفظ حقوقها وتُنظم الاستخدام.",
          primary: { label: "تصفح فنار", href: "https://cms.itqan.dev" },
          secondary: { label: "ساهم في فنار", href: "https://github.com/orgs/Itqan-community/projects/12" },
        },
      ],
    },

    launch: {
      badge: "لأصحاب المشاريع", // ← LaunchSection.tsx:38
      title: "تطبيقك من الفكرة إلى الإطلاق", // ← LaunchSection.tsx:40
      subtitle: "كل ما يحتاجه مشروعك القرآني ليبدأ بقوة، ينمو بثبات، ويصل للجميع", // ← LaunchSection.tsx:43
      supportCta: "تلقى الدعم والمشورة", // ← LaunchSection.tsx:71, LaunchSectionMobile.tsx:73
      directoryCta: "اضف تطبيقك إلى دليل التطبيقات", // ← LaunchSection.tsx:79, LaunchSectionMobile.tsx:81
      steps: [
        { number: "٠١", title: "ابدأ من أساس جاهز", body: "بيانات ومكتبات قرآنية موثوقة تختصر شهور البحث والإعداد، فتتفرغ لما يميز مشروعك" }, // ← LaunchSection.tsx:12-15
        { number: "٠٢", title: "تجاوز العقبات مع من سبقك إليها", body: "مجتمع تقني يُساندك في التحديات البرمجية ويفتح لك آفاق الشراكة مع مشاريع قرآنية أخرى" },
        { number: "٠٣", title: "اجعل مشروعك مرئيًا", body: "نُبرز مشروعك ونسوق له عبر قنوات إتقان، لا يبقى إنجازك حبيس مستودعك" },
        { number: "٠٤", title: "ابنِ ما لا يتكرر", body: "ندعمك في صقل فكرتك بما يحفظ أصالتها ويخدم استدامة مشروعك بعد الإطلاق" },
      ],
    },

    launchMobile: {
      badge: "لأصحاب المشاريع", // ← LaunchSectionMobile.tsx:39
      title: "تطبيقك من الفكرة إلى الإطلاق", // ← LaunchSectionMobile.tsx:41
      subtitle: "كل ما يحتاجه مشروعك القرآني ليبدأ بقوة، ينمو بثبات، ويصل للمسلمين في كل مكان", // ← LaunchSectionMobile.tsx:44
      supportCta: "تلقى الدعم والمشورة",
      directoryCta: "اضف تطبيقك إلى دليل التطبيقات",
      steps: [
        { number: "٠١", title: "ابدأ من أساس جاهز", body: "مكتبات بيانات قرآنية موثوقة ومصاحف رقمية جاهزة تختصر عليك شهور العمل الشاق لتتفرغ للمميزات." }, // ← LaunchSectionMobile.tsx:13-16
        { number: "٠٢", title: "تجاوز العقبات البرمجية", body: "استشر الخبراء واستعن بمجتمع تقني مكرس لحل التحديات الفنية الصعبة وضبط النظم." },
        { number: "٠٣", title: "اجعل مشروعك مرئيًا", body: "انشر مخرجاتك وسوق لتطبيقك عبر منصات وقنوات إتقان الرسمية للوصول لأكبر فئة مستهدفة." },
        { number: "٠٤", title: "ابنِ ما لا يتكرر", body: "ندعمك في صقل فكرتك بما يضمن أصالة الفكرة واستدامة التطبيق وموثوقية مرجعيته العلمية." },
      ],
    },

    apps: {
      badge: "دليل التطبيقات", // ← AppsSection.tsx:56
      titleDesktop: "تطبيقات بارزة على مجتمع إتقان", // ← AppsSection.tsx:60
      titleMobile: "تطبيقات قرآنية بارزة", // ← AppsSection.tsx:59
      subtitleMobile: "مجموعة من التطبيقات النشطة والمنشورة ضمن دليل المجتمع", // ← AppsSection.tsx:63
      prevAria: "تطبيقات سابقة", // ← AppsSection.tsx:75
      nextAria: "تطبيقات تالية", // ← AppsSection.tsx:125
      items: [
        "تطبيق الكتاب", "أوبن ترتيل", "قرآن تاب", "خطيب", "قاف", "مسلم بيديا",
        "كلمات", "المعلم القرآني", "تطبيق تعاهد", "القرآن مباشر", "الباحث الذكي",
        "محراب القرآن", "Quranlingo", "Qurani.ai", "زلفى", "تجويدوو", "قراءات القرآن",
      ], // ← AppsSection.tsx:19-37 (same order)
      /* Icons stay in the component, matched by index. */
    },

    publisher: {
      badge: "للناشرين", // ← PublisherSection.tsx:15
      title: "انشر محتواك القرآني وأتحه للمطورين", // ← PublisherSection.tsx:25
      body: "انشر محتواك القرآني (تلاوات، تفاسير، ترجمات) على منصة إتقان، ووفّر واجهة برمجية (API) موثوقة تتيح للمطورين والباحثين الوصول إليه بكل يسر.", // ← PublisherSection.tsx:28-29
      cards: [
        {
          title: "تحبير القراءات العشر", // ← PublisherSection.tsx:53
          body: "الذكر الحكيم بأعذب الأصوات وأجمل الأداءات مع نخبة من أفضل القراء في المملكة العربية السعودية والعالم العربي والإسلامي",
        },
        {
          title: "قراءات القرآن", // ← PublisherSection.tsx:81
          body: "منصة للاستماع إلى تسجيلات القرآن الكريم بالقراءات العشر الكبرى والصغرى بصوت الشيخ الدكتور مفتاح السلطني.",
        },
      ],
      nextTitle: "كن الناشر التالي", // ← PublisherSection.tsx:111
      nextBody: "انضم إلينا اليوم وساهم في نشر المعرفة القرآنية حول العالم.", // ← PublisherSection.tsx:114
      registerCta: "سجل كناشر الآن", // ← PublisherSection.tsx:117
    },

    partners: {
      badge: "شراكات", // ← PartnersSection.tsx:33
      title: "شركاؤنا في الرحلة", // ← PartnersSection.tsx:35
      subtitle:
        "نتعاون مع مؤسسات رائدة في خدمة القرآن الكريم وتقنياته لبناء منظومة رقمية متكاملة تخدم الأمة.", // ← PartnersSection.tsx:38-39
    },

    partnersMobile: {
      badge: "الناشرون والشركاء", // ← PartnersSectionMobile.tsx:21
      title: "شركاؤنا في رحلة الأثر", // ← PartnersSectionMobile.tsx:23
      subtitle: "نتعاون مع جهات قرآنية ومؤسسات رائدة لبناء منظومة تقنية متكاملة", // ← PartnersSectionMobile.tsx:26
      featuredName: "تحبير", // ← PartnersSectionMobile.tsx:41
      featuredSubtitle: "المركز السعودي للتلاوات", // ← PartnersSectionMobile.tsx:44
    },

    newsletter: {
      badge: "كل أسبوعين", // ← NewsletterSection.tsx:55
      titleDesktop: "نشرة إتقان", // ← NewsletterSection.tsx:58
      titleMobile: "نشرة إتقان البريدية", // ← NewsletterSection.tsx:57
      bodyDesktop:
        "قصص مُلهمة وأدوات عملية ونقاشات ثرية من عالم التقنيات القرآنية، تصل مباشرةً إلى بريدك", // ← NewsletterSection.tsx:65-67
      bodyMobile: "أفكار ملهمة ومشاريع برمجية جديدة تصل إلى بريدك مباشرة", // ← NewsletterSection.tsx:62
      readLabel: "قراءة النشرة", // ← NewsletterSection.tsx:97
      viewAll: "عرض جميع النشرات", // ← NewsletterSection.tsx:116
      fallbackIssues: [
        { title: "عندما تتقاطع التقنية مع أعظم غاية.. ملامح مستقبل التقنيات القرآنية من القاهرة", href: "/ar/newsletter" }, // ← NewsletterSection.tsx:24-26
        { title: "منصة قاف | حين تحوّلت مشكلة مدير مدرسة لابتكار تخدم المراكز الإسلامية", href: "/ar/newsletter" },
        { title: "الموسوعة القرآنية تُطلق إصدارًا رقميًا مفتوحًا لمصحف الأوقاف الليبية برواية قالون", href: "/ar/newsletter" },
      ],
    },

    faq: {
      badge: "مساعدة", // ← FaqSection.tsx:91
      title: "الأسئلة الشائعة", // ← FaqSection.tsx:93
      items: [
        /* 9 items. Copy q + a from FaqSection.tsx:15-79. Answers with links
           become RichSegment arrays; plain answers become [string]. */
        {
          q: "هل مجتمع إتقان يناسبني؟",
          a: ["سواءً كنت مطورًا، باحثًا، صاحب مشروع قرآني، جهة داعمة، أو شغوف بالتقنيات القرآنية؛ فمجتمع إتقان هو مساحتك التي تجد فيها نفسك. مكان يجمع أفكارك، ويحتضن نقاشاتك، ويتكاتف معك لتجاوز تحدياتك، لتشارك في صناعة ما تأمل رؤيته في مستقبل التقنيات القرآنية"], // ← FaqSection.tsx:17-18
        },
        {
          q: "لماذا قد أرغب بالانضمام لمجتمع إتقان؟",
          a: ["…"], // ← FaqSection.tsx:21-22 (copy full string)
        },
        {
          q: "ما المواضيع التي يمكنني السؤال عنها على مجتمع إتقان؟",
          a: ["…"], // ← FaqSection.tsx:25-26
        },
        {
          q: "هل يشترط أن أكون مبرمجًا للمشاركة في إتقان؟",
          a: ["…"], // ← FaqSection.tsx:29-30
        },
        {
          q: "هل المشاركة في مجتمع إتقان مجانية؟",
          a: ["…"], // ← FaqSection.tsx:33-34
        },
        {
          q: "كيف أضيف تطبيقي إلى دليل التطبيقات القرآنية؟",
          a: [
            "املأ ",
            { href: "https://quran-apps.itqan.dev/ar/submit-app", label: "نموذج الطلب" }, // ← FaqSection.tsx:38-51
            " لإضافة تطبيقك، سيراجع الفريق التقني التطبيق ثم سيعمل على إضافته للدليل",
          ],
        },
        {
          q: "هل تتوفر بيانات أو مكتبات جاهزة يمكنني استخدامها في مشروعي؟",
          a: ["…"], // ← FaqSection.tsx:55
        },
        {
          q: "هل هناك فعاليات أو لقاءات دورية للمجتمع؟",
          a: ["…"], // ← FaqSection.tsx:58-59
        },
        {
          q: "كيف يمكن لجهة أو مؤسسة التعاون مع إتقان كشريك؟",
          a: [
            "تواصل معنا مباشرة عبر ",
            { href: "https://join.itqan.dev", label: "هذا النموذج" }, // ← FaqSection.tsx:63-77
            " أو عبر البريد التالي ",
            { href: "mailto:Connect@itqan.dev", label: "Connect@itqan.dev" },
            " وسيتواصل معك فريقنا لمناقشة سُبل التعاون",
          ],
        },
      ],
    },
  },

  pages: {
    comingSoon: {
      badge: "قريبًا",
      title: "النسخة الإنجليزية قريبًا",
      body: "نعمل على ترجمة هذه الصفحة. يمكنك حاليًا تصفح النسخة العربية الكاملة.",
      cta: "تصفح النسخة العربية",
    },
  },
};

export default ar;
```

Replace every `"…"` with the exact string copied from the cited file/line. Nothing else in the app changes in this task.

- [ ] **Step 3: Create `src/lib/i18n/en.ts`**

Same shape as `ar.ts` (TypeScript enforces it: `const en: Dictionary = { ... }`). Add `export type Dictionary = typeof ar;` at the end of `ar.ts`, then `en.ts` imports it: `import type { Dictionary } from "./ar";`. Content from `landing-page-english.md`:

```ts
const en: Dictionary = {
  meta: {
    title: "Itqan — Where Quranic Tech Builders Meet",
    description:
      "An open-source tech community closing the technical gap and providing software for everyone working with the Book of Allah",
    applicationName: "Itqan",
    authorName: "Itqan",
    ogAlt: "Itqan — Where Quranic Tech Builders Meet",
  },

  nav: {
    homeAria: "Itqan — Home",
    logoAlt: "Itqan",
    menuAria: "Menu",
    cta: "Join Itqan Community", // landing-page-english.md:7
    items: [
      { label: "What We Offer", href: "/en/services", external: false }, // md:3
      { label: "Projects", href: "/en/#projects", external: false }, // md:4
      { label: "Itqan Newsletter", href: "/en/newsletter", external: false }, // md:5
      { label: "Articles", href: "/en/articles", external: false, hidden: true },
      { label: "Contact Us", href: "https://join.itqan.dev", external: true }, // md:6
    ],
  },

  localeSwitch: {
    toOther: "عربي",
    ariaLabel: "التبديل إلى العربية",
  },

  footer: {
    brand: "Itqan",
    blurb:
      "An open-source tech association and community working to close the gap and provide error-free software and digital Mushafs, ready for direct use in systems and applications.",
    columns: [
      {
        title: "Resources",
        links: [
          { label: "Itqan Newsletter", href: "/en/newsletter", external: false },
          { label: "Articles", href: "/en/articles", external: false, hidden: true },
          { label: "Itqan Community", href: "https://community.itqan.dev", external: true },
          { label: "Quranic Apps Guide", href: "https://quran-apps.itqan.dev", external: true },
        ],
      },
    ],
    followUs: "Follow us",
    newsletterTitle: "Subscribe to the newsletter",
    newsletterText:
      "Get the latest updates on community projects and outputs straight to your inbox.",
    copyright: "© 2026 Itqan Community. All rights reserved in service of the Book of Allah.",
    languageLabel: "English (en)",
  },

  newsletterForm: {
    namePlaceholder: "Name", // md:103
    emailPlaceholder: "Your email", // md:103
    emailPlaceholderDark: "Your email",
    submitLabel: "Subscribe to the Itqan Newsletter", // md:103
    submitLabelDark: "Subscribe now",
    submittingLabel: "Subscribing…",
    successMessage: "Subscribed successfully — the next issue will land in your inbox.",
    errorFallback: "Something went wrong while subscribing. Please try again.",
    nameSrLabel: "Name",
    emailSrLabel: "Your email",
  },

  home: {
    hero: {
      title1: "Where we meet to serve", // md:9 — headline pairs as two gradient lines
      title2: "Quranic Tech",
      description:
        "Itqan Community is a space where developers and researchers build and maintain the technical infrastructure behind Quranic apps and technology", // md:9
      ctas: [
        { label: "Browse projects", href: "/en/#projects", external: false }, // md:9
        { label: "Join the community", href: "https://community.itqan.dev", external: true }, // md:9
      ],
      topics: [
        { category: "Projects & collaboration", title: "Unifying Quranic terminology labels across open-source projects", replies: "14" },
        { category: "Developer discussions", title: "The best way to render a Mushaf identical to the printed edition", replies: "22" },
        { category: "Developer discussions", title: "The crisis of available audio sources for developers", replies: "9" },
      ],
      shotAlt: "From Itqan community meetups",
      codeCommentFull: "// A Mushaf page as structured data",
      codeCommentCompact: "// Structured ayah data",
      avatarInitials: ["A", "N", "H"],
    },

    stats: {
      items: [
        { value: "+580", label: "discussion threads" }, // md:12
        { value: "+5,700", label: "contributions", mobileLabel: "contributions added" },
        { value: "+1,500", label: "developers and researchers", mobileLabel: "active developers and researchers" },
        { value: "+15", label: "open-source projects" },
      ],
    },

    impact: {
      badge: "Itqan Community", // md:17
      title: "Be part of a lasting impact", // md:17
      subtitle: "Itqan Community is a wide space where you find your place and make a difference", // md:19
      cta: "Join the community", // md:27
      steps: [
        { number: "01", title: "Contribute", body: "Choose an existing project and contribute using your skills, reviews, and ideas" }, // md:23
        { number: "02", title: "Learn", body: "Benefit from experts to develop your specialized Quranic technology skills" },
        { number: "03", title: "Discuss", body: "Join the developers' and researchers' community to share your experience and questions" },
        { number: "04", title: "Launch", body: "Build your project's capabilities or launch it with support from the Itqan community" },
      ],
    },

    impactMobile: {
      badge: "Itqan Community",
      title: "Be part of a lasting impact",
      subtitle: "Itqan Community is a wide space where you find your place and make a difference",
      steps: [
        { icon: "/figma/m-rocket.svg", title: "Launch your idea", body: "Build your project's capabilities or launch it with support from the Itqan community" },
        { icon: "/figma/m-message-square.svg", title: "Discuss and engage", body: "Join the developers' and researchers' community to share your experience and questions" },
        { icon: "/figma/m-book-open.svg", title: "Learn and grow", body: "Benefit from experts to develop your specialized Quranic technology skills" },
        { icon: "/figma/m-git-pull-request.svg", title: "Contribute with code", body: "Choose an existing project and contribute using your skills, reviews, and ideas" },
      ],
    },

    cta: {
      badge: "Open Community", // md:31 area
      title: "Contribute to Building the Technical Infrastructure for the Quran", // md:31
      body: "Join the developer community contributing to building software libraries, improving Quranic search engines, and developing reliable databases that serve hundreds of applications", // md:33
    },

    projects: {
      badge: "Open Source", // md:40
      title: "Community projects", // md:40
      subtitle: "Open-source projects aimed at bridging gaps in Quranic technical content, available to everyone for contribution and use", // md:42
      browseLabel: "Browse the project", // md:44
      items: [
        {
          name: "Quranic Apps Directory", // md:44 (directory first to match the ar order: directory, RATQ, fanar)
          body: "A platform that gathers digital Quran applications, classifies them, and documents them against unified criteria, so Muslims can find the application that suits their need, and developers and researchers have a clear map of the Quranic technology landscape.",
          contributeLabel: "Contribute to the Directory",
        },
        {
          name: "RATQ", // md:44
          body: "A technical knowledge base (Roadmap and Technologies for Qur'an) compiling tools and technologies needed for Quran app development organized into a clear roadmap for developers.",
          contributeLabel: "Contribute to RATQ",
        },
        {
          name: "Fanar", // md:44
          body: "A system for publishing and managing Quranic content, providing publishers with an independent digital space under their own identity to publish recitations and Quranic assets with professional standards and licenses.",
          contributeLabel: "Contribute to Fanar",
        },
      ],
    },

    projectsMobile: {
      badge: "Open Source",
      title: "Community projects", // md:40
      subtitle: "Open-source projects aimed at bridging gaps in Quranic technical content, available to everyone for contribution and use",
      items: [
        {
          title: "Quranic Apps Directory",
          body: "A platform that gathers digital Quran applications, classifies them, and documents them against unified criteria, so Muslims can find the application that suits their need, and developers and researchers have a clear map of the Quranic technology landscape.",
          primary: { label: "Browse the Directory", href: "https://quran-apps.itqan.dev" },
          secondary: { label: "Contribute to the Directory", href: "https://github.com/orgs/Itqan-community/projects/4" },
        },
        {
          title: "RATQ",
          body: "A technical knowledge base (Roadmap and Technologies for Qur'an) compiling tools and technologies needed for Quran app development organized into a clear roadmap for developers.",
          primary: { label: "Browse RATQ", href: "https://ratq.itqan.dev" },
          secondary: { label: "Contribute to RATQ", href: "https://github.com/orgs/Itqan-community/projects/10" },
        },
        {
          title: "Fanar",
          body: "A system for publishing and managing Quranic content, providing publishers with an independent digital space under their own identity to publish recitations and Quranic assets with professional standards and licenses.",
          primary: { label: "Browse Fanar", href: "https://cms.itqan.dev" },
          secondary: { label: "Contribute to Fanar", href: "https://github.com/orgs/Itqan-community/projects/12" },
        },
      ],
    },

    launch: {
      badge: "For project owners", // md:49
      title: "Your App from Idea to Launch", // md:49
      subtitle: "Your Quranic project needs to start strong, grow steadily, and reach all", // md:51
      supportCta: "Get support and advice", // md:56
      directoryCta: "Add your app to the Directory", // md:56
      steps: [
        { number: "01", title: "Ready Foundation", body: "Quranic data and libraries that save months of work." }, // md:53
        { number: "02", title: "Overcome Obstacles", body: "Expert consultation and support" },
        { number: "03", title: "Visibility & Reach", body: "Marketing and promotion through Itqan's channels." },
        { number: "04", title: "Unique Impact", body: "Refined ideas ensuring originality, sustainability, and reliability" },
      ],
    },

    launchMobile: {
      badge: "For project owners",
      title: "Your App from Idea to Launch",
      subtitle: "Your Quranic project needs to start strong, grow steadily, and reach all",
      supportCta: "Get support and advice",
      directoryCta: "Add your app to the Directory",
      steps: [
        { number: "01", title: "Ready Foundation", body: "Quranic data and libraries that save months of work." },
        { number: "02", title: "Overcome Obstacles", body: "Expert consultation and support" },
        { number: "03", title: "Visibility & Reach", body: "Marketing and promotion through Itqan's channels." },
        { number: "04", title: "Unique Impact", body: "Refined ideas ensuring originality, sustainability, and reliability" },
      ],
    },

    apps: {
      badge: "Apps Directory",
      titleDesktop: "Featured apps on the Itqan community", // md:61
      titleMobile: "Featured Quranic applications", // md:61
      subtitleMobile: "A selection of active apps listed in the community directory",
      prevAria: "Previous apps",
      nextAria: "Next apps",
      items: [
        "AlKetab", "Open Tarteel", "Quran Tab", "Khatiib", "Qaf", "Muslimpedia",
        "Kalimat", "Al-Mu'allim Al-Qur'ani", "Taahod", "Quran Mobasher", "Bahith",
        "Mehrab", "Quranlingo", "Qurani.ai", "Zulfa", "Tajweedoo", "Qeraat Alquraan",
      ], // md:63 — same order as the ar items
    },

    publisher: {
      badge: "For publishers", // md:68
      title: "Publish your Quranic content and empower developers", // md:68
      body: "Publish your Quranic content recitations, tafsir, translations on the Itqan platform, with a reliable API that lets developers and researchers reach it easily.", // md:70
      cards: [
        {
          title: "Tahbeer al-Qira'at al-'Ashr", // md:72
          body: "The Wise Remembrance in the finest voices and renditions, with a select group of the best reciters in Saudi Arabia and the Arab and Muslim world.",
        },
        {
          title: "Qeraat Alquraan", // md:72
          body: "A platform for listening to recordings of the Noble Quran in the major and minor ten readings, in the voice of Sheikh Dr. Miftah Al-Sultani.",
        },
      ],
      nextTitle: "Be the next publisher", // md:75
      nextBody: "Join us today and take part in spreading Quranic knowledge worldwide.", // md:77
      registerCta: "Register as a publisher now", // md:77
    },

    partners: {
      badge: "Partnerships", // md:81
      title: "Our partners on the journey", // md:81
      subtitle: "We collaborate with leading organizations in serving the Holy Quran and its technologies to build an integrated digital ecosystem serving the Ummah", // md:83
    },

    partnersMobile: {
      badge: "Publishers & partners",
      title: "Our partners on the journey",
      subtitle: "We collaborate with leading organizations in serving the Holy Quran and its technologies to build an integrated digital ecosystem",
      featuredName: "Tahbeer",
      featuredSubtitle: "The Saudi Center for Recitations",
    },

    newsletter: {
      badge: "Every two weeks", // md:92
      titleDesktop: "Itqan Newsletter", // md:94
      titleMobile: "Itqan Newsletter", // md:94
      bodyDesktop: "Inspiring stories, practical tools, and insightful discussions from the world of Quranic technologies, delivered straight to your inbox.", // md:96
      bodyMobile: "Inspiring stories and new software projects delivered straight to your inbox",
      readLabel: "Read the issue",
      viewAll: "View all issues",
      fallbackIssues: [
        { title: "Where technology meets the greatest purpose: shaping the future of Quranic tech from Cairo", href: "/en/newsletter" },
        { title: "Qaf platform | When a school principal's problem became innovation serving Islamic centers", href: "/en/newsletter" },
        { title: "Quranic Encyclopedia launches an open digital edition of the Libyan Endowments Mushaf in the Qalun reading", href: "/en/newsletter" },
      ],
    },

    faq: {
      badge: "Help",
      title: "Frequently asked questions", // md:108
      items: [
        {
          q: "Is Itqan Community right for me?", // md:110
          a: ["Whether you are a developer, a researcher, the owner of a Quranic project, a supporting organization, or simply passionate about Quranic technologies, Itqan Community is your space. A place that gathers your ideas, holds your discussions, and stands with you in overcoming your challenges, so you can take part in shaping what you hope to see in the future of Quranic technologies."], // md:112
        },
        {
          q: "Why would I want to join Itqan Community?", // md:114
          a: ["It gives you what you need to build and develop your code in service of the Noble Quran: ready tools and infrastructure, reliable Quranic data and libraries, and open-source projects (such as Fanar and RATQ) that save you months of work. Alongside that, support and promotion for your project: we help you overcome technical obstacles, feature your application and promote it through our channels, and list it in the Quranic Apps Directory. There is also the chance to develop your skills and your network: you join more than 1,500 developers and researchers, take part in workshops and gatherings, and gain direct practical experience. And you achieve lasting impact, through the opportunity for your code to benefit millions of Muslims around the world."], // md:116
        },
        {
          q: "What topics can I ask about in Itqan Community?", // md:118
          a: ["Itqan Community lets you discuss and ask about the various areas of Quranic technology: you can raise programming challenges and developer discussions, ask about tools, resources, and technical knowledge, and request support and advice for your project. You can also look for collaboration opportunities and projects, share ideas and noteworthy applications, and discuss Quranic research, ask general questions, and follow the latest updates and initiatives."], // md:120
        },
        {
          q: "Do I have to be a programmer to take part in Itqan?", // md:122
          a: ["No. Itqan Community welcomes everyone: programmers, researchers, owners of a Quranic idea or project, supporting organizations, and those simply passionate about Quranic technologies. There is ample space for everyone to share ideas, offer advice, manage projects, or contribute to developing content and research."], // md:124
        },
        {
          q: "Is taking part in Itqan Community free?", // md:126
          a: ["Yes, participation in Itqan Community is entirely free. You can join, ask questions, browse projects, and contribute to initiatives and activities at no cost."], // md:128
        },
        {
          q: "How do I add my app to the Quranic Apps Directory?", // md:130
          a: [
            "Fill in the ",
            { href: "https://quran-apps.itqan.dev/en/submit-app", label: "submission form" }, // md:132
            " to add your application. The technical team will review it and then work on adding it to the directory.",
          ],
        },
        {
          q: "Are there ready data or libraries I can use in my project?", // md:134
          a: ["Itqan Community hosts a set of community projects you can use directly in your project, whether libraries, data, APIs, or digital Mushafs."], // md:136
        },
        {
          q: "Are there regular community events or gatherings?", // md:138
          a: ["Yes. The Itqan conference holds regular gatherings, both in person and remotely, in Riyadh, along with in-person gatherings in Cairo. There are also workshops organized with prominent Quranic bodies, universities, experts, and specialists to discuss everything related to the field of Quranic technologies."], // md:140
        },
        {
          q: "How can an organization or institution partner with Itqan?", // md:142
          a: [
            "Contact us directly through ",
            { href: "https://join.itqan.dev/", label: "this form" }, // md:144
            " or at ",
            { href: "mailto:Connect@itqan.dev", label: "Connect@itqan.dev" },
            ", and our team will get in touch to discuss ways of working together.",
          ],
        },
      ],
    },
  },

  pages: {
    comingSoon: {
      badge: "Coming soon",
      title: "English version coming soon",
      body: "We are working on translating this page. In the meantime, you can browse the full Arabic version.",
      cta: "Browse the Arabic version",
    },
  },
};

export default en;
```

- [ ] **Step 4: Create `src/lib/i18n/index.ts`**

```ts
import ar from "./ar";
import en from "./en";
import type { Locale } from "./types";

export type { Locale, RichSegment } from "./types";

export type Dictionary = typeof ar;
export type { Dictionary };

export const locales: Locale[] = ["ar", "en"];

export const hasLocale = (value: string): value is Locale =>
  (locales as string[]).includes(value);

const dictionaries: Record<Locale, Dictionary> = { ar, en };

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];
```

In `en.ts`, the type annotation is `const en: Dictionary = { ... }` with `import type { Dictionary } from "./ar";` — `Dictionary` is exported from `ar.ts` via `export type Dictionary = typeof ar;` added to the end of `ar.ts`.

- [ ] **Step 5: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors (files are not imported anywhere yet — that is fine).

- [ ] **Step 6: Commit**

```bash
git add src/lib/i18n
git commit -m "feat(i18n): add typed ar/en dictionaries"
```

---

### Task 2: Proxy — root auto-detect and legacy redirects

**Files:**
- Create: `src/proxy.ts`

**Interfaces:**
- Produces: redirect behavior only. `/` → `/ar` or `/en` by `Accept-Language`; `/projects` → `/ar/projects`; `/ar/...`, `/en/...`, `/api/...`, files → pass through.

- [ ] **Step 1: Create `src/proxy.ts`**

```ts
import { NextResponse, type NextRequest } from "next/server";

const LOCALES = ["ar", "en"];

function hasLocalePrefix(pathname: string): boolean {
  const first = pathname.split("/")[1] ?? "";
  return LOCALES.includes(first);
}

/** Matches "ar" as a standalone language tag in Accept-Language, e.g.
    "ar-SA,ar;q=0.9,en;q=0.8" but not "en" or "az". */
function prefersArabic(acceptLanguage: string): boolean {
  return /(?:^|,)\s*ar(?:[-;,]|$)/.test(acceptLanguage);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (hasLocalePrefix(pathname)) return;

  const url = request.nextUrl.clone();
  if (pathname === "/") {
    const locale = prefersArabic(request.headers.get("accept-language") ?? "")
      ? "ar"
      : "en";
    url.pathname = `/${locale}`;
  } else {
    // Legacy bare paths (pre-localization bookmarks) → the Arabic site.
    url.pathname = `/ar${pathname}`;
  }
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
```

- [ ] **Step 2: Build to verify the convention compiles**

Run: `npm run build`
Expected: build succeeds; output shows no proxy errors.

- [ ] **Step 3: Commit**

```bash
git add src/proxy.ts
git commit -m "feat(i18n): locale auto-detect and legacy redirects via proxy"
```

---

### Task 3: Locale-aware Navbar, Footer, NewsletterSubscribeForm, NewsletterCard

**Files:**
- Modify: `src/components/layout/Navbar.tsx`
- Create: `src/components/layout/LocaleSwitch.tsx`
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/components/home/NewsletterSubscribeForm.tsx`
- Modify: `src/components/newsletter/NewsletterCard.tsx`
- Modify: `src/app/page.tsx`, `src/app/services/page.tsx`, `src/app/projects/page.tsx`, `src/app/newsletter/page.tsx`, `src/app/articles/page.tsx`, `src/app/articles/[slug]/page.tsx` (pass `locale="ar"` — temporary; Task 4 replaces these)
- Delete: `src/lib/nav.ts`

**Interfaces:**
- Consumes: `getDictionary`, `Dictionary`, `Locale`, `RichSegment` from `@/lib/i18n` (Task 1).
- Produces:
  - `Navbar({ locale }: { locale: Locale })`
  - `LocaleSwitch({ locale }: { locale: Locale })`
  - `Footer({ locale }: { locale: Locale })`
  - `NewsletterSubscribeForm({ sourcepage?, inputId?, tone?, labels }: { labels: Dictionary["newsletterForm"] & { tone-specific submit/email labels resolved by caller } })` — actually the form takes `labels: NewsletterFormLabels` where `NewsletterFormLabels = { namePlaceholder, emailPlaceholder, submitLabel, submittingLabel, successMessage, errorFallback, nameSrLabel, emailSrLabel }` and the caller picks light/dark variants from the dict (`emailPlaceholder` vs `emailPlaceholderDark`, `submitLabel` vs `submitLabelDark`).
  - `NewsletterCard({ campaign, showDate?, locale }: { locale: Locale })` — date formats `ar-SA` for ar, `en-GB` for en; read label per locale.

- [ ] **Step 1: Create `src/components/layout/LocaleSwitch.tsx`**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDictionary, type Locale } from "@/lib/i18n";

/** Swaps the first path segment: /ar/x ⇄ /en/x. */
export default function LocaleSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? "/";
  const dict = getDictionary(locale);
  const target = pathname.replace(/^\/(ar|en)(?=\/|$)/, locale === "ar" ? "/en" : "/ar");
  return (
    <Link
      href={target}
      aria-label={dict.localeSwitch.ariaLabel}
      className="flex items-center gap-[6px] px-[4px] py-[8px] text-[15px] font-medium text-[var(--color-txt)] transition-colors duration-200 hover:text-[var(--color-brand)]"
    >
      {dict.localeSwitch.toOther}
    </Link>
  );
}
```

- [ ] **Step 2: Rewrite `Navbar.tsx` to take `locale`**

- Signature: `export default function Navbar({ locale }: { locale: Locale })`.
- Top: `import { getDictionary, type Locale } from "@/lib/i18n";` then `const dict = getDictionary(locale); const items = dict.nav.items.filter((item) => !item.hidden);`
- Replace all `navItems` usages with `items`; `isExternal(item.href)` becomes `item.external`.
- `aria-label="إتقان — الصفحة الرئيسية"` → `{dict.nav.homeAria}` (both desktop + mobile logo links); logo `alt` → `{dict.nav.logoAlt}`.
- CTA text `انضم لمجتمع إتقان` → `{dict.nav.cta}` (desktop + mobile drawer).
- Hamburger `aria-label="القائمة"` → `{dict.nav.menuAria}`.
- Desktop CTA row: render `<LocaleSwitch locale={locale} />` immediately before the join CTA `<a>` inside the second flex child (so it sits at the left end under RTL).
- Mobile drawer: add a `<li className="pt-[8px]"><LocaleSwitch locale={locale} /></li>` after the join CTA `<li>`.
- Delete the `import { navItems } from "@/lib/nav";` line.

- [ ] **Step 3: Rewrite `Footer.tsx` to take `locale`**

- Signature: `export default function Footer({ locale }: { locale: Locale })`.
- `import { getDictionary, type Locale } from "@/lib/i18n";` + `const dict = getDictionary(locale);`
- Delete the `@/lib/nav` import; use `dict.footer.*`:
  - `footerBlurb` → `dict.footer.blurb`; `footerColumns` → `dict.footer.columns` (use `link.external` instead of the regex); `socialLinks` — social URLs/icons are locale-independent: keep a local `const socialLinks = [...]` in Footer.tsx copied verbatim from the deleted `src/lib/nav.ts` (Facebook, X, LinkedIn with their `/figma/social-*.svg` icons).
  - `تابعنا` → `{dict.footer.followUs}`; newsletter column title/text → `dict.footer.newsletterTitle` / `dict.footer.newsletterText`.
  - `إتقان` brand line → `{dict.footer.brand}`; `العربية (ar)` → `{dict.footer.languageLabel}`; `copyright` → `{dict.footer.copyright}`.
- The footer globe button becomes a locale switch: replace the `<button>` (lines 94-103) with:

```tsx
<Link
  href={locale === "ar" ? "/en" : "/ar"}
  className="flex items-center gap-[6px] transition-opacity duration-200 hover:opacity-80"
>
  <Image src="/figma/icon-globe.svg" alt="" width={14} height={14} className="size-[14px]" />
  <span>{dict.footer.languageLabel}</span>
</Link>
```

- The footer `NewsletterSubscribeForm` call gains `labels`:

```tsx
<NewsletterSubscribeForm
  tone="dark"
  sourcepage="footer"
  inputId={`footer-email-${locale}`}
  labels={{
    namePlaceholder: dict.newsletterForm.namePlaceholder,
    emailPlaceholder: dict.newsletterForm.emailPlaceholderDark,
    submitLabel: dict.newsletterForm.submitLabelDark,
    submittingLabel: dict.newsletterForm.submittingLabel,
    successMessage: dict.newsletterForm.successMessage,
    errorFallback: dict.newsletterForm.errorFallback,
    nameSrLabel: dict.newsletterForm.nameSrLabel,
    emailSrLabel: dict.newsletterForm.emailSrLabel,
  }}
/>
```

- [ ] **Step 4: Rewrite `NewsletterSubscribeForm.tsx` labels**

- Extend props:

```ts
export type NewsletterFormLabels = {
  namePlaceholder: string;
  emailPlaceholder: string;
  submitLabel: string;
  submittingLabel: string;
  successMessage: string;
  errorFallback: string;
  nameSrLabel: string;
  emailSrLabel: string;
};
```

- `labels` becomes a required prop (`labels: NewsletterFormLabels`).
- Remove `namePlaceholder`, `placeholder`, `submitLabel` from `toneStyles` (keep the className fields).
- In JSX: `placeholder={styles.namePlaceholder}` → `placeholder={labels.namePlaceholder}`; email input placeholder → `labels.emailPlaceholder`; both sr-only labels → `labels.nameSrLabel` / `labels.emailSrLabel`; button: `{status === "submitting" ? labels.submittingLabel : labels.submitLabel}`.
- Hardcoded strings: `"تم الاشتراك بنجاح — ستصلك النشرة القادمة في بريدك."` → `labels.successMessage`; the error fallback string in the catch → `labels.errorFallback` (used when `err` is not an `Error`).

- [ ] **Step 5: Locale-aware `NewsletterCard.tsx`**

- Props: `{ campaign, showDate = false, locale = "ar" }: { campaign: MailerLiteCampaign; showDate?: boolean; locale: Locale }`.
- `formatSendDate(iso, locale)`: for `"ar"` keep the current Hijri + Gregorian `ar-SA` output; for `"en"` return `new Intl.DateTimeFormat("en-GB", dateOptions).format(date)`.
- `قراءة النشرة` → `locale === "ar" ? "قراءة النشرة" : "Read the issue"` (single inline ternary; it is one string in a server-rendered card used by two locales — no dictionary round-trip needed).

- [ ] **Step 6: Update all current call sites (still at root paths)**

In every page that renders `<Navbar />` / `<Footer />` (`src/app/page.tsx`, `src/app/services/page.tsx`, `src/app/projects/page.tsx`, `src/app/newsletter/page.tsx`, `src/app/articles/page.tsx`, `src/app/articles/[slug]/page.tsx`), change to `<Navbar locale="ar" />` and `<Footer locale="ar" />`. In `src/app/newsletter/page.tsx` the `<NewsletterCard ... showDate />` call gains `locale="ar"`.

- [ ] **Step 7: Delete `src/lib/nav.ts`**

Its contents now live in the dictionaries (labels/hrefs) and Footer.tsx (socials).

- [ ] **Step 8: Typecheck, lint, build**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: all pass.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat(i18n): locale-aware navbar, footer, newsletter form/card + locale switcher"
```

---

### Task 4: Move pages under `app/[locale]` with a locale-aware root layout

**Files:**
- Create: `src/app/[locale]/layout.tsx`
- Create: `src/app/[locale]/page.tsx` (move from `src/app/page.tsx`)
- Move: `src/app/services/page.tsx` → `src/app/[locale]/services/page.tsx`
- Move: `src/app/projects/page.tsx` → `src/app/[locale]/projects/page.tsx`
- Move: `src/app/newsletter/page.tsx` → `src/app/[locale]/newsletter/page.tsx`
- Move: `src/app/articles/page.tsx` → `src/app/[locale]/articles/page.tsx`
- Move: `src/app/articles/[slug]/page.tsx` → `src/app/[locale]/articles/[slug]/page.tsx`
- Delete: `src/app/layout.tsx`, `src/app/page.tsx`, and the now-empty route dirs
- Keep in place: `src/app/globals.css`, `src/app/og-image.png`, `src/app/api/`, `src/app/robots.ts`, `src/app/sitemap.ts`

**Interfaces:**
- Consumes: `getDictionary`, `hasLocale`, `locales`, `Locale` (Task 1); `Navbar/Footer` with `locale` (Task 3).
- Produces: every page receives `locale` from `params`; `LayoutProps<"/[locale]">` / `PageProps<"/[locale]">` typed helpers.

- [ ] **Step 1: Create `src/app/[locale]/layout.tsx`** (replaces `src/app/layout.tsx`)

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Readex_Pro, JetBrains_Mono } from "next/font/google";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";
import "../globals.css";
import ogImage from "../og-image.png";

const readex = Readex_Pro({
  variable: "--font-readex",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL("https://itqan.dev"),
    title: dict.meta.title,
    description: dict.meta.description,
    applicationName: dict.meta.applicationName,
    authors: [{ name: dict.meta.authorName }],
    creator: dict.meta.authorName,
    publisher: dict.meta.authorName,
    icons: { icon: "/figma/logo-itqan-small.png" },
    alternates: {
      languages: {
        ar: `https://itqan.dev/ar`,
        en: `https://itqan.dev/en`,
        "x-default": `https://itqan.dev/ar`,
      },
    },
    openGraph: {
      images: [
        {
          url: ogImage.src,
          width: ogImage.width,
          height: ogImage.height,
          type: "image/png",
          alt: dict.meta.ogAlt,
        },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${readex.variable} ${jetbrains.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
```

Note: keep the original comment above `openGraph` about Turbopack and `opengraph-image.alt.txt`.

- [ ] **Step 2: Move the homepage**

Move `src/app/page.tsx` to `src/app/[locale]/page.tsx` and change it to:

```tsx
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import StatsCard from "@/components/home/StatsCard";
import ImpactSection from "@/components/home/ImpactSection";
import ImpactSectionMobile from "@/components/home/ImpactSectionMobile";
import CtaSection from "@/components/home/CtaSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import ProjectsSectionMobile from "@/components/home/ProjectsSectionMobile";
import LaunchSection from "@/components/home/LaunchSection";
import LaunchSectionMobile from "@/components/home/LaunchSectionMobile";
import AppsSection from "@/components/home/AppsSection";
import PublisherSection from "@/components/home/PublisherSection";
import PartnersSection from "@/components/home/PartnersSection";
import PartnersSectionMobile from "@/components/home/PartnersSectionMobile";
import NewsletterSection from "@/components/home/NewsletterSection";
import FaqSection from "@/components/home/FaqSection";
import { getDictionary, hasLocale } from "@/lib/i18n";

// Newsletter cards come from MailerLite; render on the server so the API key is available.
export const dynamic = "force-dynamic";

export default async function HomePage({
  params,
}: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <Navbar locale={locale} />
      <main className="flex-1">
        <Hero dict={dict.home.hero} />
        <StatsCard dict={dict.home.stats} />
        <ImpactSection dict={dict.home.impact} />
        <ImpactSectionMobile dict={dict.home.impactMobile} />
        <CtaSection dict={dict.home.cta} />
        <ProjectsSection dict={dict.home.projects} />
        <ProjectsSectionMobile dict={dict.home.projectsMobile} />
        <LaunchSection dict={dict.home.launch} />
        <LaunchSectionMobile dict={dict.home.launchMobile} />
        <AppsSection dict={dict.home.apps} />
        <PublisherSection dict={dict.home.publisher} />
        <PartnersSection dict={dict.home.partners} />
        <PartnersSectionMobile dict={dict.home.partnersMobile} />
        <NewsletterSection dict={dict.home.newsletter} locale={locale} />
        <FaqSection dict={dict.home.faq} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
```

(The `dict` props on the home components are added in Task 5 — in this task, pass none of them and keep the components as-is; the build will still pass because components don't require props yet. Keep the import of `getDictionary` and the `<Navbar locale={locale} />` / `<Footer locale={locale} />` changes; leave the section list exactly as the moved file has it.)

- [ ] **Step 3: Move internal pages**

For each of `services`, `projects`, `newsletter`, `articles`, `articles/[slug]`: `git mv` the folder under `src/app/[locale]/`, then:
- `src/app/[locale]/services/page.tsx`, `projects/page.tsx`, `newsletter/page.tsx`, `articles/page.tsx`: change `<Navbar />` → `<Navbar locale="ar" />`, `<Footer />` → `<Footer locale="ar" />` (these are the Arabic pages; Task 6 adds the English siblings). In `newsletter/page.tsx`, `<NewsletterCard campaign={campaign} showDate />` gains `locale="ar"`.
- `src/app/[locale]/articles/[slug]/page.tsx`:
  - `generateStaticParams` returns `articles.map((article) => ({ slug: article.slug }))` — unchanged.
  - Signatures become `{ params }: { params: Promise<{ locale: string; slug: string }> }`; await and `notFound()` when `!hasLocale(locale) || !getArticleBySlug(slug)`.
  - `<Navbar locale="ar" />`, `<Footer locale="ar" />`, and `<Link href="/articles">` → `<Link href="/ar/articles">` ("العودة إلى المقالات" back link).
  - Remove the hard `dir="rtl"` on `<main>` (the `<html dir>` now handles it) and keep the internal `dir="ltr"`/`dir="rtl"` islands in the article hero as-is.
- Delete `src/app/layout.tsx`, `src/app/page.tsx`, and the emptied `src/app/services`, `src/app/projects`, `src/app/newsletter`, `src/app/articles` directories.

- [ ] **Step 4: Verify routes**

Run: `npm run build`
Expected: build passes; output lists `/[locale]`, `/[locale]/services`, `/[locale]/projects`, `/[locale]/newsletter`, `/[locale]/articles`, `/[locale]/articles/[slug]`.

Run the dev server briefly (`npm run dev`) and check with curl:
- `curl -sI http://localhost:3000/ | head -5` → 307 to `/ar` or `/en`
- `curl -s http://localhost:3000/ar | grep -o '<html[^>]*>'` → `<html lang="ar" dir="rtl" ...>`
- `curl -s http://localhost:3000/en | grep -o '<html[^>]*>'` → `<html lang="en" dir="ltr" ...>`
Stop the dev server after checking.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(i18n): move all pages under /[locale] with locale-aware root layout"
```

---

### Task 5: Refactor home components to dictionary props

**Files (all in `src/components/home/`):**
- Modify: `Hero.tsx`, `hero-cards.tsx`, `StatsCard.tsx`, `ImpactSection.tsx`, `ImpactSectionMobile.tsx`, `CtaSection.tsx`, `ProjectsSection.tsx`, `ProjectsSectionMobile.tsx`, `LaunchSection.tsx`, `LaunchSectionMobile.tsx`, `AppsSection.tsx`, `PublisherSection.tsx`, `PartnersSection.tsx`, `PartnersSectionMobile.tsx`, `NewsletterSection.tsx`, `NewsletterSubscribeForm.tsx` (labels done in Task 3), `FaqSection.tsx`
- Create: `src/components/ui/RichSegments.tsx`

**Interfaces:**
- Consumes: `dict.home.*` slices (Task 1), `PageProps` home page passing slices (Task 4).
- Produces: each section's signature (all others keep their existing rendering/CSS):
  - `Hero({ dict }: { dict: Dictionary["home"]["hero"] })`
  - `StatsCard({ dict }: { dict: Dictionary["home"]["stats"] })`
  - `ImpactSection({ dict }: { dict: Dictionary["home"]["impact"] })`
  - `ImpactSectionMobile({ dict }: { dict: Dictionary["home"]["impactMobile"] })`
  - `CtaSection({ dict }: { dict: Dictionary["home"]["cta"] })`
  - `ProjectsSection({ dict }: { dict: Dictionary["home"]["projects"] })`
  - `ProjectsSectionMobile({ dict }: { dict: Dictionary["home"]["projectsMobile"] })`
  - `LaunchSection({ dict }: { dict: Dictionary["home"]["launch"] })`
  - `LaunchSectionMobile({ dict }: { dict: Dictionary["home"]["launchMobile"] })`
  - `AppsSection({ dict }: { dict: Dictionary["home"]["apps"] })`
  - `PublisherSection({ dict }: { dict: Dictionary["home"]["publisher"] })`
  - `PartnersSection({ dict }: { dict: Dictionary["home"]["partners"] })`
  - `PartnersSectionMobile({ dict }: { dict: Dictionary["home"]["partnersMobile"] })`
  - `NewsletterSection({ dict, locale }: { dict: Dictionary["home"]["newsletter"]; locale: Locale })`
  - `FaqSection({ dict }: { dict: Dictionary["home"]["faq"] })`
  - `RichSegments({ segments }: { segments: RichSegment[] })`

- [ ] **Step 1: Create `src/components/ui/RichSegments.tsx`**

```tsx
import type { RichSegment } from "@/lib/i18n";

/** Renders dictionary rich-text segments: plain strings and inline links. */
export default function RichSegments({ segments }: { segments: RichSegment[] }) {
  return (
    <>
      {segments.map((segment, i) =>
        typeof segment === "string" ? (
          <span key={i}>{segment}</span>
        ) : (
          <a
            key={i}
            href={segment.href}
            target={segment.href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="text-[var(--color-grad-end)] underline-offset-2 hover:underline"
          >
            {segment.label}
          </a>
        )
      )}
    </>
  );
}
```

- [ ] **Step 2: `Hero.tsx` + `hero-cards.tsx`**

- Delete the local `topics` const; accept `dict` and use `const topics: Topic[] = dict.topics;`.
- `hero-cards.tsx` changes:
  - `TopicCard` gains optional `avatarInitials?: [string, string, string]` prop, default `["م", "ن", "ح"]`; render `<Avatar initial={avatarInitials[0]} />` etc.
  - `CodePanel` gains required `comment: string` prop; replace the two hardcoded Arabic comment strings with `{comment}` (keep the `lines` switch — it only controls which extra code lines render).
- In `Hero.tsx`:
  - `<TopicCard topic={topics[item.index]} />` and the mobile variant gain `avatarInitials={dict.avatarInitials}`.
  - Both `ShotCard alt="من لقاءات مجتمع إتقان"` → `alt={dict.shotAlt}`.
  - `<CodePanel ... />` (2 call sites) gain `comment={titleLines/dict...}`: desktop `comment={dict.codeCommentFull}`, mobile `comment={dict.codeCommentCompact}`.
  - Headline: `ملتقى العاملين على` → `{dict.title1}`, `التقنيات القرآنية` → `{dict.title2}`.
  - Paragraph → `{dict.description}`.
  - CTA block: replace the single `<a>` with a mapped list over `dict.ctas` (flex-row already handles multiple):

```tsx
<div className="flex w-full flex-col gap-[var(--space-cta-gap)] pt-[12px] lg:w-auto lg:flex-row lg:items-center">
  {dict.ctas.map((cta) =>
    cta.external ? (
      <a key={cta.label} href={cta.href} target="_blank" rel="noopener noreferrer" className="btn btn-primary h-[51px] w-full py-0 lg:h-auto lg:w-auto lg:py-[16px]">
        {cta.label}
      </a>
    ) : (
      <Link key={cta.label} href={cta.href} className="btn btn-primary h-[51px] w-full py-0 lg:h-auto lg:w-auto lg:py-[16px]">
        {cta.label}
      </Link>
    )
  )}
</div>
```

  (add `import Link from "next/link";`)

- [ ] **Step 3: `StatsCard.tsx`**

- Accept `dict`; delete the local `stats` const; render `dict.items.map(...)` with the same JSX. The `valueColor`/`labelColor` styling stays positional: keep two local const arrays for colors and zip by index:

```ts
const VALUE_COLORS = ["var(--color-brand)", "var(--color-brand)", "#1a5c47", "#1a5c47"];
const LABEL_COLORS = ["var(--color-txt-dim)", "var(--color-txt-dim)", "#66736e", "#66736e"];
```

  `key={stat.label}` → `key={`${stat.value}-${stat.label}`}`.

- [ ] **Step 4: Impact sections, CTA, Launch sections**

- `ImpactSection.tsx`: accept `dict`; delete local `steps` (keep the per-step `glow` shadows as a local array zipped by index, same trick as StatsCard). Replace badge/title/subtitle/CTA text with `dict.*`.
- `ImpactSectionMobile.tsx`: accept `dict`; delete local `steps` (icons stay in the dict `steps[].icon`); text swaps.
- `CtaSection.tsx`: accept `dict`; badge/title/body swaps.
- `LaunchSection.tsx` / `LaunchSectionMobile.tsx`: accept `dict`; delete local `steps`; `تلقى الدعم والمشورة` → `{dict.supportCta}` (2 files); `اضف تطبيقك إلى دليل التطبيقات` → `{dict.directoryCta}`.

- [ ] **Step 5: Projects sections**

- `ProjectsSection.tsx`: accept `dict`; delete local `projects` const; keep a local const for non-translatable data zipped by index:

```ts
const PROJECT_META = [
  { logo: "/figma/project-apps-arrows.png", site: "https://quran-apps.itqan.dev", repo: "https://github.com/orgs/Itqan-community/projects/4" },
  { logo: "/figma/project-ratq-roadmap.png", site: "https://ratq.itqan.dev", repo: "https://github.com/orgs/Itqan-community/projects/10" },
  { logo: "/figma/project-fanar-lighthouse.png", site: "https://cms.itqan.dev", repo: "https://github.com/orgs/Itqan-community/projects/12" },
];
```

  Render `dict.items.map((project, i) => ...)` using `PROJECT_META[i]`; the hard-coded `تصفح المشروع` button label → `{dict.browseLabel}`.
- `ProjectsSectionMobile.tsx`: same pattern; `primary`/`secondary` now come from `dict.items[i].primary` / `.secondary` (labels + hrefs both in the dict; no local meta needed except logos):

```ts
const LOGOS = ["/figma/project-apps-arrows.png", "/figma/project-ratq-roadmap.png", "/figma/project-fanar-lighthouse.png"];
```

- [ ] **Step 6: `AppsSection.tsx`**

- Accept `dict`; delete local `apps` names; keep icons zipped by index:

```ts
const APP_ICONS = ["/figma/app-alkitab.png", undefined, "/figma/app-qurantab.png", "/figma/app-khateeb.png", "/figma/app-qaf.png", "/figma/app-muslimpedia.png", "/figma/app-kalimat.png", undefined, "/figma/app-taahud.png", "/figma/app-quran-live.png", "/figma/app-smart-search.png", "/figma/app-mihrab.png", "/figma/app-quranlingo.png", "/figma/app-quraniai.png", "/figma/app-zalfa.svg", "/figma/app-tajweedo.png", "/figma/app-qiraat.png"];
```

- `dir`-aware scrolling: the `scrollBy({ left: -dir * STEP * 2 })` negation compensates for RTL. Make it explicit:

```ts
const isRtl = typeof document !== "undefined" && document.documentElement.dir === "rtl";
const sign = isRtl ? -1 : 1;
railRef.current?.scrollBy({ left: sign * dir * STEP * 2, behavior: "smooth" });
```

- Text swaps: badge pill, `titleDesktop`/`titleMobile` spans, mobile subtitle, `aria-label`s (`dict.prevAria` / `dict.nextAria`).

- [ ] **Step 7: `PublisherSection.tsx`**

- Accept `dict`; swap badge/title/body; the two publisher cards use `dict.cards[0]` / `dict.cards[1]` (hrefs/logos stay inline); the dashed CTA card uses `dict.nextTitle`, `dict.nextBody`, `dict.registerCta`.

- [ ] **Step 8: Partners sections**

- `PartnersSection.tsx`: accept `dict`; swap badge/title/subtitle. The exported `partners` array (names are proper nouns, already bilingual, `dir="auto"` per card) stays unchanged for both locales.
- `PartnersSectionMobile.tsx`: accept `dict`; swap badge/title/subtitle and the featured-publisher name/subtitle (`dict.featuredName` / `dict.featuredSubtitle`).

- [ ] **Step 9: `NewsletterSection.tsx`**

- Signature: `export default async function NewsletterSection({ dict, locale }: { dict: Dictionary["home"]["newsletter"]; locale: Locale })`.
- Delete local `fallbackIssues`; use `dict.fallbackIssues`.
- Text swaps: badge, `titleMobile`/`titleDesktop` spans, mobile/desktop body spans, `قراءة النشرة` → `{dict.readLabel}`, `عرض جميع النشرات` → `{dict.viewAll}`.
- Links: `href="/newsletter"` (3 occurrences: fallback card, view-all) → `locale === "ar" ? "/ar/newsletter" : "/en/newsletter"` (compute once as `const archiveHref`).
- `<NewsletterCard campaign={campaign} />` gains `locale={locale}`.
- `<NewsletterSubscribeForm sourcepage="homepage" />` gains the labels object, built the same way as in Footer (Task 3 Step 3) but with the light-tone fields (`emailPlaceholder`, `submitLabel`).

- [ ] **Step 10: `FaqSection.tsx`**

- Accept `dict`; delete local `faqs`.
- Render `dict.items.map((faq, i) => ...)`; answer body becomes `<RichSegments segments={faq.a} />` inside the existing `<p>`.

- [ ] **Step 11: Typecheck, lint, build**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: all pass. The Arabic homepage must render identically (spot-check `/ar` in dev).

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "feat(i18n): home sections take dictionary slices"
```

---

### Task 6: English internal pages (placeholders) + home page wiring for `/en`

**Files:**
- Create: `src/components/ComingSoon.tsx`
- Create: `src/app/[locale]/services/page-en.tsx` — NO: Next file conventions forbid extra exports as pages. Instead:
- Modify: `src/app/[locale]/services/page.tsx`, `src/app/[locale]/projects/page.tsx`, `src/app/[locale]/newsletter/page.tsx`, `src/app/[locale]/articles/page.tsx`, `src/app/[locale]/articles/[slug]/page.tsx` — each becomes locale-dispatching: `ar` renders today's Arabic content, `en` renders `<ComingSoon />` chrome.
- Verify `src/app/[locale]/page.tsx` (already locale-dispatching from Task 4/5).

**Interfaces:**
- Consumes: `getDictionary`, `hasLocale` (Task 1); `ComingSoon` produced below with signature `ComingSoon({ dict, backHref }: { dict: Dictionary["pages"]["comingSoon"]; backHref: string })`.
- Produces: `/en/services`, `/en/projects`, `/en/newsletter`, `/en/articles`, `/en/articles/[slug]` render the placeholder.

- [ ] **Step 1: Create `src/components/ComingSoon.tsx`**

```tsx
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/i18n";

/** Placeholder body for not-yet-translated English pages. */
export default function ComingSoon({
  dict,
  backHref,
}: {
  dict: Dictionary["pages"]["comingSoon"];
  backHref: string;
}) {
  return (
    <section className="w-full bg-white px-[16px] py-[64px] lg:py-[96px]">
      <div className="shell flex flex-col items-center gap-[16px] text-center">
        <span className="badge">{dict.badge}</span>
        <h2 className="text-[26px] font-bold text-[var(--color-txt)] lg:text-[36px]">
          {dict.title}
        </h2>
        <p className="max-w-[520px] text-[15px] leading-[normal] text-[var(--color-txt-dim)]">
          {dict.body}
        </p>
        <Link href={backHref} className="btn btn-primary mt-[8px]">
          {dict.cta}
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Locale-dispatch each internal page**

Each page gets the same preamble:

```ts
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import ComingSoon from "@/components/ComingSoon";

export default async function Page({ params }: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);

  if (locale === "en") {
    return (
      <>
        <Navbar locale="en" />
        <main className="flex-1">
          <PageHeader
            badge={dict.pages.comingSoon.badge}
            title={dict.pages.comingSoon.title}
            subtitle={dict.pages.comingSoon.body}
          />
          <ComingSoon dict={dict.pages.comingSoon} backHref="/ar/services" />
        </main>
        <Footer locale="en" />
      </>
    );
  }
  // ... existing Arabic JSX unchanged ...
}
```

Per page specifics:
- `services/page.tsx`: wraps the existing Arabic JSX after the `en` early return. `PageProps<"/[locale]/services">`.
- `projects/page.tsx`: same pattern (`backHref="/ar/projects"`; keep `export const metadata` Arabic-only — it only applies to the ar route's rendering; for `en` the layout-level metadata stands. Note: a single `metadata` export applies to both locales — acceptable; the title says "إتقان" which is fine on the placeholder).
- `newsletter/page.tsx`: for `en`, skip the MailerLite fetch entirely — the `en` early return comes **before** `loadArchive()` is called. Restructure: make the component body resolve locale first; only the Arabic branch calls `loadArchive()`. `backHref="/ar/newsletter"`.
- `articles/page.tsx`: same pattern (`backHref="/ar/articles"`). Also remove the hard `dir="rtl"` on `<main>` and the hardcoded `text-right` classes → `text-start` (they flip correctly per `<html dir>`); the back-button SVG rotation is fine as-is.
- `articles/[slug]/page.tsx`: params `{ locale, slug }`; for `en`, render `<Navbar locale="en" />` + `<ComingSoon dict={dict.pages.comingSoon} backHref="/ar/articles" />` + `<Footer locale="en" />` (article data unused); for `ar`, the existing article rendering with `locale="ar"` chrome (from Task 4). `generateMetadata` keeps Arabic metadata for ar; for en return `{}`.

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: passes. Dev-server spot check: `curl -s http://localhost:3000/en/projects | grep -c "coming soon"` → ≥1; `curl -s http://localhost:3000/en/projects | grep -c "مشاريع"` → 0 (no Arabic text leaks onto the English page).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(i18n): english placeholder pages for internal routes"
```

---

### Task 7: Sitemap + per-page hreflang alternates

**Files:**
- Modify: `src/app/sitemap.ts`

**Interfaces:**
- Consumes: `locales` from `@/lib/i18n`, `articles` from `@/lib/articles`.
- Produces: sitemap entries with `alternates.languages` (`ar`, `en`, `x-default: ar`).

- [ ] **Step 1: Rewrite `src/app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { locales } from "@/lib/i18n";

const BASE_URL = "https://itqan.dev";

export const dynamic = "force-static";

const PATHS = [
  "",
  "/services",
  "/projects",
  "/newsletter",
  "/articles",
  ...articles.map((article) => `/articles/${article.slug}`),
];

const CHANGE_FREQUENCY = {
  "": "monthly",
  "/services": "monthly",
  "/projects": "monthly",
  "/newsletter": "monthly",
  "/articles": "weekly",
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap((path) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}${path}`,
      changeFrequency: (CHANGE_FREQUENCY as Record<string, MetadataRoute.Sitemap[number]["changeFrequency']>)[path] ?? "yearly",
      priority: path === "" ? 1 : path === "/articles" ? 0.7 : path === "/newsletter" ? 0.6 : 0.8,
      alternates: {
        languages: {
          ar: `${BASE_URL}/ar${path}`,
          en: `${BASE_URL}/en${path}`,
          "x-default": `${BASE_URL}/ar${path}`,
        },
      },
    }))
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run build` then inspect `.next` output or run `npm run start` and `curl -s http://localhost:3000/sitemap.xml | head -40` — expect `<urlset>` with `xhtml:link rel="alternate"` entries for both locales.

- [ ] **Step 3: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat(i18n): per-locale sitemap with hreflang alternates"
```

---

### Task 8: End-to-end verification (build, lint, Playwright smoke)

**Files:**
- Create (throwaway, in temp dir): `C:\Users\medo_\AppData\Local\Temp\opencode\smoke-i18n.mjs`

**Interfaces:**
- Consumes: everything above. Playwright is a devDependency (`playwright@^1.62.1`).

- [ ] **Step 1: Full gate**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: all pass.

- [ ] **Step 2: Write the smoke script**

```js
// Run: node smoke-i18n.mjs (dev server must be running on :3000)
import { chromium } from "playwright";

const BASE = "http://localhost:3000";
let failed = 0;
const check = (name, ok) => {
  console.log(`${ok ? "PASS" : "FAIL"} ${name}`);
  if (!ok) failed++;
};

const browser = await chromium.launch();
const page = await browser.newPage();

// 1. Root redirect by Accept-Language
let res = await page.request.get(`${BASE}/`, { headers: { "accept-language": "ar-SA,ar;q=0.9" }, maxRedirects: 0 });
check("root + ar header -> /ar", res.status() === 307 && res.headers().location === "/ar");
res = await page.request.get(`${BASE}/`, { headers: { "accept-language": "en-US,en;q=0.9" }, maxRedirects: 0 });
check("root + en header -> /en", res.status() === 307 && res.headers().location === "/en");

// 2. Legacy path redirect
res = await page.request.get(`${BASE}/projects`, { maxRedirects: 0 });
check("bare /projects -> /ar/projects", res.status() === 307 && res.headers().location === "/ar/projects");

// 3. html lang/dir
await page.goto(`${BASE}/ar`);
check("/ar html lang=ar dir=rtl", (await page.getAttribute("html", "lang")) === "ar" && (await page.getAttribute("html", "dir")) === "rtl");
await page.goto(`${BASE}/en`);
check("/en html lang=en dir=ltr", (await page.getAttribute("html", "lang")) === "en" && (await page.getAttribute("html", "dir")) === "ltr");

// 4. English homepage content, no Arabic leak
const enText = await page.textContent("body");
check("/en has English hero", enText.includes("Where we meet to serve") && enText.includes("Quranic Tech"));
check("/en has FAQ", enText.includes("Frequently asked questions"));
check("/en has no Arabic body text", !/[\u0600-\u06FF]/.test(enText.replace(/\s+/g, " ")));

// 5. Arabic homepage unchanged spot-check
await page.goto(`${BASE}/ar`);
const arText = await page.textContent("body");
check("/ar has Arabic hero", arText.includes("ملتقى العاملين على"));

// 6. Locale switcher swaps prefix
await page.goto(`${BASE}/ar/projects`);
const switchHref = await page.getAttribute("header a[href^='/en']", "href");
check("switcher links to /en/projects", switchHref === "/en/projects");

// 7. English placeholder page
await page.goto(`${BASE}/en/projects`);
const phText = await page.textContent("body");
check("/en/projects shows placeholder", phText.includes("English version coming soon"));

await browser.close();
process.exit(failed ? 1 : 0);
```

Note on check 4: the HTML may legitimately contain Arabic in `lang="ar"` metadata or inline `<script>` payloads; the regex runs against the visible `body` text only — if a false positive appears from font-preload or JSON payloads, narrow to `page.locator("main").textContent()` and re-run before "fixing" anything.

- [ ] **Step 3: Run it**

Run (two terminals or `start /b`): `npm run dev` then `node C:\Users\medo_\AppData\Local\Temp\opencode\smoke-i18n.mjs`
Expected: all PASS.

- [ ] **Step 4: Fix any failures, re-run, then final commit**

```bash
git add -A
git commit -m "test(i18n): verify locale routing, content, and switcher"
```

The smoke script itself stays in the temp dir (throwaway), not committed.

---

## Self-Review Notes

- Spec coverage: routing/proxy (Tasks 2, 4), layouts/dir (Task 4), dictionaries (Task 1), component refactor (Tasks 3, 5), EN homepage content (Tasks 1, 5), EN placeholders (Task 6), switcher (Task 3), sitemap/hreflang (Task 7), verification (Task 8). Error handling: unknown locale → `notFound()` (Tasks 4, 6); proxy best-effort (Task 2). ✔
- Placeholder scan: Task 1 Step 2 uses `"…"` markers ONLY as "copy the string at the cited file:line" pointers with the full text present in the cited source — the executor must replace them; everything else is complete code.
- Type consistency: `Dictionary` derived from `typeof ar`; `en: Dictionary` is type-checked against it; `RichSegment` used by `RichSegments` + FAQ dict; `locale` prop names consistent across Navbar/Footer/pages. ✔
