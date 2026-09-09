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
    /** Segment labels — language names are self-evident, so both dictionaries share them. */
    labels: { ar: "عربي", en: "EN" },
    groupLabel: "اللغة",
    ariaToAr: "التبديل إلى العربية",
    ariaToEn: "Switch to English",
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
    languageLabel: "English (en)", // ← Footer.tsx:102
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
      submitAppHref: "https://quran-apps.itqan.dev/ar/submit-app", // ← LaunchSection.tsx:55
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
      submitAppHref: "https://quran-apps.itqan.dev/ar/submit-app",
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
        {
          q: "هل مجتمع إتقان يناسبني؟",
          a: ["سواءً كنت مطورًا، باحثًا، صاحب مشروع قرآني، جهة داعمة، أو شغوف بالتقنيات القرآنية؛ فمجتمع إتقان هو مساحتك التي تجد فيها نفسك. مكان يجمع أفكارك، ويحتضن نقاشاتك، ويتكاتف معك لتجاوز تحدياتك، لتشارك في صناعة ما تأمل رؤيته في مستقبل التقنيات القرآنية"], // ← FaqSection.tsx:17-18
        },
        {
          q: "لماذا قد أرغب بالانضمام لمجتمع إتقان؟",
          a: ["يمنحك كل ما تحتاجه لبناء وتطوير كودك البرمجي في خدمة القرآن الكريم؛ أدوات وبنية جاهزة، بيانات ومكتبات قرآنية موثوقة، ومشاريع مفتوحة المصدر (مثل فنار ورتق) تختصر عليك شهورًا من العمل. بالإضافة إلى دعم وتسويق لمشروعك؛ إذ نساعدك في تجاوز العقبات التقنية، ونُبرز تطبيقك ونسوّق له عبر قنواتنا ونُدرجه في دليل التطبيقات القرآنية. بجانب إمكانية تطوير مهاراتك وشبكة علاقاتك؛ حيث تنضم لأكثر من 1,500 مطور وباحث، وتشارك في ورش عمل وملتقيات، وتكتسب خبرة عملية مباشرة. وستحقق أثر مستدام من خلال فرصة ليكون كودك مساهمًا في إفادة ملايين المسلمين حول العالم"], // ← FaqSection.tsx:21-22
        },
        {
          q: "ما المواضيع التي يمكنني السؤال عنها على مجتمع إتقان؟",
          a: ["يتيح لك مجتمع إتقان النقاش والسؤال في مختلف مجالات التقنية القرآنية؛ حيث يمكنك طرح التحديات البرمجية ونقاشات المطورين، والاستفسار عن الأدوات والموارد والمعرفة التقنية، وطلب الدعم والمشورة لمشروعك. كما يمكنك البحث عن فرص التعاون والمشاريع، ومشاركة الأفكار والتطبيقات الملهمة، بالإضافة إلى مناقشة البحوث القرآنية وطرح الأسئلة العامة ومتابعة آخر التحديثات والمبادرات"], // ← FaqSection.tsx:25-26
        },
        {
          q: "هل يشترط أن أكون مبرمجًا للمشاركة في إتقان؟",
          a: ["لا، لا يُشترط أن تكون مبرمجًا. يرحب مجتمع إتقان بالجميع؛ سواءً كنت مبرمجًا، أو باحثًا، أو صاحب فكرة أو مشروع قرآني، أو جهة داعمة، أو حتى شغوفًا بالتقنيات القرآنية. هناك مساحة واسعة للجميع للمشاركة بالأفكار، تقديم المشورة، إدارة المشاريع، أو المساهمة في تطوير المحتوى والبحوث."], // ← FaqSection.tsx:29-30
        },
        {
          q: "هل المشاركة في مجتمع إتقان مجانية؟",
          a: ["نعم، المشاركة في مجتمع إتقان مجانية تمامًا. يمكنك الانضمام، طرح الأسئلة، تصفح المشاريع، والمساهمة في المبادرات والأنشطة دون أي رسوم"], // ← FaqSection.tsx:33-34
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
          a: ["على مجتمع إتقان مجموعة من المشاريع المجتمعية التي يمكنك استخدامها مباشرةً في مشروعك، سواء مكتبات أو بيانات أو واجهات برمجية، أو مصاحف رقمية."], // ← FaqSection.tsx:55
        },
        {
          q: "هل هناك فعاليات أو لقاءات دورية للمجتمع؟",
          a: ["نعم، يعقد مؤتمر إتقان لقاءات دورية حضورية وعن بُعد في الرياض، بالإضافة إلى لقاءات حضورية بالقاهرة. بجانب ورش مُنظمة مع جهات قرآنية بارزة وجامعات وخبراء وكفاءات لمناقشة كل ما يتعلق بمجال التقنيات القرآنية."], // ← FaqSection.tsx:58-59
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

    services: {
      meta: {
        title: "ما الذي تقدمه إتقان؟ — إتقان",
        description: "ستة محاور تشكّل ما تقدمه إتقان لخدمة مجال التقنيات القرآنية.",
      },
      header: {
        badge: "عن إتقان",
        title: "ما الذي تقدمه إتقان؟",
        subtitle: "ستة محاور تشكّل ما تقدمه إتقان لخدمة مجال التقنيات القرآنية.",
      },
      contactCta: "تواصل معنا",
      offerings: [
        {
          icon: "/figma/offering-ecosystem.svg",
          title: "البيئة التقنية الشاملة",
          body: "منظومة متكاملة من الخدمات والأدوات لجميع العاملين في مجال التقنيات القرآنية",
        },
        {
          icon: "/figma/offering-exchange.svg",
          title: "مساحة لتبادل الخبرات",
          body: "نجمع العاملين في التقنيات القرآنية في مساحة مشتركة للتلاقي وتبادل الخبرات وتوحيد الجهود",
        },
        {
          icon: "/figma/offering-incubation.svg",
          title: "تمكين وحضانة المشاريع",
          body: "نقدم دعمًا تقنيًا واستراتيجيًا وتشغيليًا للمشاريع القرآنية في مختلف مراحل تطورها",
        },
        {
          icon: "/figma/offering-network.svg",
          title: "شبكة من المشاريع القرآنية",
          body: "شبكة تربط المشاريع القرآنية لفتح قنوات تعاون تُسرع أثرها وتدعم استدامتها",
        },
        {
          icon: "/figma/offering-reach.svg",
          title: "التوجيه وتوسيع الأثر",
          body: "نساعد المشاريع القرآنية على تحديد جمهورها وتحسين تموضعها، لتصل إلى أوسع شريحة ممكنة",
        },
        {
          icon: "/figma/offering-research.svg",
          title: "دعم البحث العلمي",
          body: "ندعم البحث العلمي في التقنيات القرآنية ونغطي الفعاليات البحثية لنشر المعرفة وتوسيع أثرها",
        },
      ],
      eventsBadge: "لقاءات المجتمع",
      eventsTitle: "الفعاليات والمؤتمرات",
      events: [
        {
          photo: "/figma/events-meetups.png",
          caption: "صور من الملتقيات",
          title: "ملتقيات دورية",
          body: "نعقد لقاءات حضورية، تجمع المطورين والباحثين والمهتمين بالتقنيات القرآنية لتبادل الخبرات وفتح النقاشات وبناء علاقات مهنية مثمرة",
        },
        {
          photo: "/figma/events-workshops.png",
          caption: "صورة من ورش العمل",
          title: "ورش العمل والندوات عبر الإنترنت",
          body: "ننظم ورش عمل وجلسات متخصصة تجمع الخبراء والباحثين والمطورين حول تحديات تقنية قرآنية محددة، بهدف الخروج بتوصيات عملية",
        },
        {
          photo: "/figma/events-conferences.png",
          caption: "صور من المؤتمرات",
          title: "المؤتمرات",
          body: "نشارك في المؤتمرات التقنية والبحثية المتخصصة، للتواصل مع الباحثين والمطورين وبناء شراكات تدفع مجال التقنيات القرآنية إلى الأمام",
        },
      ],
    },
  },
};

export default ar;

export type Dictionary = typeof ar;
