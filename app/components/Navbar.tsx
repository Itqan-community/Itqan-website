import Link from "next/link";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import LangSwitch from "./LangSwitch";
import NavbarLink from "./NavbarLink";
import LinkBtn from "./LinkBtn";
import MobileMenu from "./MobileMenu";

const NavbarLinks = [
  {
    href: "",
    text: "home",
  },
  {
    href: "/projects",
    text: "projects",
  },
  {
    href: "/resources",
    text: "resources",
  },
  {
    href: "/articles",
    text: "articles",
  },
  {
    href: "/tools",
    text: "tools",
  },
  {
    href: "/newsletter",
    text: "newsletter",
  },
];

export default async function Navbar({ locale }: { locale: string }) {
  const t = await getTranslations("nav");

  return (
    <nav className="w-full !py-2 !px-4 md:!px-6 sticky top-0 z-50 bg-white">
      <div className="flex justify-between items-center">
        <Link href={`/${locale}`}>
          <Image
            src="/logo.svg"
            alt={t("logo")}
            width={64}
            height={64}
            className="h-10 md:h-14 w-auto"
            priority
            sizes="(max-width: 768px) 40px, 56px"
          />
        </Link>
        <div className="hidden md:flex gap-4 items-center ms-auto me-4">
          {NavbarLinks.map((link) => (
            <NavbarLink key={link.href} context={link} locale={locale as string} />
          ))}
          <LinkBtn title={t("discord")} href={`https://community.itqan.dev`} target="_blank" variant="outline" locale={locale} />
        </div>
        <div className="hidden md:block">
          <LangSwitch locale={locale as string} />
        </div>
        <MobileMenu locale={locale} NavbarLinks={NavbarLinks} />
      </div>
    </nav>
  );
}
