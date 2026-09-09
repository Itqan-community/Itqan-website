"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDictionary, type Locale } from "@/lib/i18n";

/** Segmented pill with a globe prefix: highlights the current locale, links to the other. */
export default function LocaleSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? "/";
  const dict = getDictionary(locale);
  const other: Locale = locale === "ar" ? "en" : "ar";
  const target = pathname.replace(/^\/(ar|en)(?=\/|$)/, `/${other}`);

  return (
    <div className="locale-switch" role="group" aria-label={dict.localeSwitch.groupLabel}>
      <span className="locale-switch__icon" aria-hidden="true">
        <Image src="/figma/icon-globe-dim.svg" alt="" width={16} height={16} className="size-[16px]" />
      </span>
      {(["en", "ar"] as const).map((l) =>
        l === locale ? (
          <span key={l} className="locale-switch__seg locale-switch__seg--active" aria-current="true">
            {dict.localeSwitch.labels[l]}
          </span>
        ) : (
          <Link
            key={l}
            href={target}
            className="locale-switch__seg"
            aria-label={l === "ar" ? dict.localeSwitch.ariaToAr : dict.localeSwitch.ariaToEn}
          >
            {dict.localeSwitch.labels[l]}
          </Link>
        )
      )}
    </div>
  );
}
