/**
 * Navigation and footer content, transcribed from the Figma Navbar component
 * (133:79) and footer-section (20:1335 / 137:175).
 *
 * Order here is RTL reading order: the first item sits furthest to the right.
 */

export type NavItem = {
  label: string;
  href: string;
  menu?: { label: string; href: string }[];
};

export const navItems: NavItem[] = [
  { label: "ما الذي نقدمه؟", href: "/services" },
  { label: "المشاريع", href: "/#projects" },
  { label: "دراسات", href: "/resources/studies" },
  { label: "تقارير", href: "/resources/reports" },
  { label: "الورش", href: "/resources/workshops" },
  { label: "تواصل معنا", href: "https://join.itqan.dev" },
];

export const footerColumns = [
  {
    title: "المشاريع",
    links: [
      { label: "فنار", href: "/projects/fanar" },
      { label: "رتق", href: "/projects/ratq" },
      { label: "دليل التطبيقات القرآنية", href: "/projects/apps" },
      { label: "مستندات المطورين (API)", href: "/docs" },
    ],
  },
  {
    title: "عن إتقان",
    links: [
      { label: "من نحن؟", href: "/about" },
      { label: "مبادرات إتقان (رمضان الأثر)", href: "/about/initiatives" },
      { label: "تواصل معنا", href: "https://join.itqan.dev" },
      { label: "انضم لمجتمع إتقان", href: "https://join.itqan.dev" },
    ],
  },
  {
    title: "الموارد",
    links: [
      { label: "دراسات", href: "/resources/studies" },
      { label: "تقارير", href: "/resources/reports" },
      { label: "الورش", href: "/resources/workshops" },
    ],
  },
];

export const socialLinks = [
  { label: "GitHub", href: "https://github.com", icon: "/figma/social-github.svg" },
  { label: "X", href: "https://x.com", icon: "/figma/social-circle-x.svg" },
  { label: "Twitter", href: "https://twitter.com", icon: "/figma/social-twitter.svg" },
];

export const footerBlurb =
  "جمعية ومجتمع تقني مفتوح المصدر يسعى لسد الفجوة وتوفير برمجيات ومصاحف رقمية خالية من الأخطاء ومهيئة للاستخدام مباشرة في الأنظمة والتطبيقات.";

export const copyright = "© 2026 مجتمع إتقان. جميع الحقوق محفوظة لخدمة كتاب الله.";
