import type { Dictionary } from "./ar";

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
      submitAppHref: "https://quran-apps.itqan.dev/en/submit-app",
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
      submitAppHref: "https://quran-apps.itqan.dev/en/submit-app",
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

    services: {
      meta: {
        title: "What Does Itqan Offer? — Itqan",
        description: "Six pillars that represent what Itqan offers to serve the field of Quranic tech",
      },
      header: {
        badge: "About Itqan",
        title: "What Does Itqan Offer?",
        subtitle: "Six pillars that represent what Itqan offers to serve the field of Quranic tech",
      },
      contactCta: "Contact us", // md:9
      offerings: [
        {
          icon: "/figma/offering-ecosystem.svg",
          title: "Comprehensive Tech Ecosystem",
          body: "Integrated tools and services for everyone in the Quranic tech space.",
        },
        {
          icon: "/figma/offering-exchange.svg",
          title: "Knowledge Exchange",
          body: "A shared space connecting developers and researchers to unify efforts.",
        },
        {
          icon: "/figma/offering-incubation.svg",
          title: "Project Incubation & Empowerment",
          body: "Technical, strategic, and operational support across project stages.",
        },
        {
          icon: "/figma/offering-network.svg",
          title: "Quranic Projects Network",
          body: "Connecting projects to open collaboration channels and build sustainability",
        },
        {
          icon: "/figma/offering-reach.svg",
          title: "Expanding Impact",
          body: "Strategic guidance to help projects position effectively and reach wider audiences.",
        },
        {
          icon: "/figma/offering-research.svg",
          title: "Scientific Research Support",
          body: "Backing Quranic tech research and academic events to spread knowledge.",
        },
      ],
      eventsBadge: "Community gatherings",
      eventsTitle: "Gatherings & Events",
      events: [
        {
          photo: "/figma/events-meetups.png",
          caption: "Photos from meetups",
          title: "Regular Meetups",
          body: "In-person gatherings for networking and knowledge sharing",
        },
        {
          photo: "/figma/events-workshops.png",
          caption: "Photo from a workshop",
          title: "Workshops & Webinars",
          body: "Specialized sessions addressing specific technical challenges",
        },
        {
          photo: "/figma/events-conferences.png",
          caption: "Photos from conferences",
          title: "Conferences",
          body: "Active participation in tech conferences to build strategic partnerships",
        },
      ],
    },
  },
};

export default en;
