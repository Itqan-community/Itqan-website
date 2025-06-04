"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function LangSwitch({ locale }: { locale: string}) {
  const toggleLocale = locale === "en" ? "ar" : "en";
  const pathname = usePathname();


  return (
    <Link
      href={`/${toggleLocale}${pathname.substring(3)}`}
      className="text-emerald-900 hover:text-emerald-800 font-semibold flex items-center gap-2"
    >
      <span>{toggleLocale === "ar" ? "عربي" : "English"}</span>
      <Image src={`/flag-${toggleLocale}.svg`} alt={toggleLocale} width={32} height={32} />
    </Link>
  );
}
