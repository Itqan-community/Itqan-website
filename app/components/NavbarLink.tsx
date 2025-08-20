import Link from "next/link";
import { getTranslations } from "next-intl/server";

interface NavbarLinkProps {
  context: {
    href: string;
    text: string;
  };
  locale: string;
}

export default async function NavbarLink({
  context: { href, text },
  locale,
}: NavbarLinkProps) {
  const t = await getTranslations("nav");

  return (
    <Link
      href={`/${locale}${href}`}
      className={` hover:text-primary-600 hover:underline text-sm sm:text-base transition-colors duration-200 font-semibold`}
    >
      {t(text)}
    </Link>
  );
}
