import Link from "next/link";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import LangSwitch from "./LangSwitch";
import NavbarLink from "./NavbarLink";
import LinkBtn from "./LinkBtn";
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
    href: "/categories",
    text: "resources",
  },
  {
    href: "/blog",
    text: "reports",
  },
];
export default async function Navbar({ locale }: { locale: string }) {
  const t = await getTranslations("nav");

  return (
    <nav className="w-full bg-neutral-100 border-b border-neutral-200 !py-2 !px-6 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        <Link href={`/${locale}`} className="p-4">
          <Image
            src="/logo.svg"
            alt={t("logo")}
            width={64}
            height={64}
            className="h-14 w-auto"
          />
        </Link>
        <div className="flex gap-8 items-center">
          {NavbarLinks.map((link) => (
            <NavbarLink key={link.href} context={link} locale={locale as string} />
          ))}
          <LinkBtn title={t("discord")} href={`https://discord.gg/24CskUbuuB`} target="_blank" variant="outline" />
        </div>
        <LangSwitch locale={locale as string} />
      </div>
    </nav>
  );
}
