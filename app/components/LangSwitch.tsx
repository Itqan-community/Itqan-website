"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuGlobe } from "react-icons/lu";

export default function LangSwitch({ locale }: { locale: string}) {
  const toggleLocale = locale === "en" ? "ar" : "en";
  const pathname = usePathname();


  return (
    <Link
      href={`/${toggleLocale}${pathname.substring(3)}`}
      className="flex items-center gap-1 sm:gap-2 transition-colors duration-200 p-2 rounded-lg hover:bg-primary-50"
    >
      <LuGlobe size={18} className="sm:w-5 sm:h-5" />
      <span className={`text-sm sm:text-base font-semibold ${locale === "en" ? "!relative !top-[-3px]" : ""}`}>{toggleLocale === "ar" ? "ع" : "E"}</span>
    </Link>
  );
}
