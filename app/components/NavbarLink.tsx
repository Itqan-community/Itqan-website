"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

interface NavbarLinkProps {
  context: {
    href: string;
    text: string;
  };
  locale: string;
}

export default function NavbarLink({
  context: { href, text },
  locale,
}: NavbarLinkProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <Link
      href={`/${locale}${href}`}
      className={`${
        pathname === `/${locale}${href}`
          ? "text-green-600 underline underline-offset-2"
          : "text-green-800"
      } hover:text-green-700 font-semibold text-sm sm:text-base transition-colors duration-200`}
    >
      {t(text)}
    </Link>
  );
}
