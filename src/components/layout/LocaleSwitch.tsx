"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDictionary, type Locale } from "@/lib/i18n";

/** Swaps the first path segment: /ar/x ⇄ /en/x. */
export default function LocaleSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? "/";
  const dict = getDictionary(locale);
  const target = pathname.replace(/^\/(ar|en)(?=\/|$)/, locale === "ar" ? "/en" : "/ar");
  return (
    <Link
      href={target}
      aria-label={dict.localeSwitch.ariaLabel}
      className="flex items-center gap-[6px] px-[4px] py-[8px] text-[15px] font-medium text-[var(--color-txt)] transition-colors duration-200 hover:text-[var(--color-brand)]"
    >
      {dict.localeSwitch.toOther}
    </Link>
  );
}
