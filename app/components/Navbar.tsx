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
    href: "/blog",
    text: "reports",
  },
  {
    href: "/tools",
    text: "tools",
  },
];

export default async function Navbar({ locale }: { locale: string }) {
  const t = await getTranslations("nav");

  return (
    <nav className="w-full bg-neutral-100 border-b border-neutral-200 !py-2 !px-4 md:!px-6 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        <Link href={`/${locale}`} className="p-2 md:p-4">
          <Image
            src="/logo.svg"
            alt={t("logo")}
            width={64}
            height={64}
            className="h-10 md:h-14 w-auto"
          />
        </Link>
        <div className="hidden md:flex gap-6 lg:gap-8 items-center">
          {NavbarLinks.map((link) => (
            <NavbarLink key={link.href} context={link} locale={locale as string} />
          ))}
          <LinkBtn title={t("discord")} href={`https://discord.gg/24CskUbuuB`} target="_blank" variant="outline" locale={locale} />
        </div>
        <div className="hidden md:block">
          <LangSwitch locale={locale as string} />
        </div>
        <MobileMenu locale={locale} NavbarLinks={NavbarLinks} />
      </div>
    </nav>
  );
}
