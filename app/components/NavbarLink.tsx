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
      className="text-[14px] font-semibold px-2 py-1 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors duration-200"
    >
      {t(text)}
    </Link>
  );
}
