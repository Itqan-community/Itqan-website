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
  /**
   * Hidden items stay defined here but are filtered out of the navbar.
   * Flip to false to bring them back.
   */
  hidden?: boolean;
};

export const navItems: NavItem[] = [
  { label: "ما الذي نقدمه؟", href: "/services" },
  { label: "المشاريع", href: "/#projects" },
  { label: "نشرة إتقان", href: "/newsletter" },
  { label: "المقالات", href: "/articles", hidden: true },
  { label: "تواصل معنا", href: "https://join.itqan.dev" },
];

export type FooterLink = {
  label: string;
  href: string;
  /** Same idea as NavItem.hidden — kept in code, filtered out of the footer. */
  hidden?: boolean;
};

export const footerColumns: { title: string; links: FooterLink[] }[] = [
  {
    title: "الموارد",
    links: [
      { label: "نشرة إتقان", href: "/newsletter" },
      { label: "المقالات", href: "/articles", hidden: true },
      { label: "مجتمع إتقان", href: "https://community.itqan.dev" },
      { label: "دليل التطبيقات القرآنية", href: "https://quran-apps.itqan.dev" },
    ],
  },
];

export const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/ItqanCommunity/",
    icon: "/figma/social-facebook.svg",
  },
  { label: "X", href: "https://x.com/itqan_community", icon: "/figma/social-x.svg" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/itqan-community",
    icon: "/figma/social-linkedin.svg",
  },
];

export const footerBlurb =
  "جمعية ومجتمع تقني مفتوح المصدر يسعى لسد الفجوة وتوفير برمجيات ومصاحف رقمية خالية من الأخطاء ومهيئة للاستخدام مباشرة في الأنظمة والتطبيقات.";

export const copyright = "© 2026 مجتمع إتقان. جميع الحقوق محفوظة لخدمة كتاب الله.";
