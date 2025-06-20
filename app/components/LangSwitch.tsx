"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGlobe } from "react-icons/fa";

export default function LangSwitch({ locale }: { locale: string}) {
  const toggleLocale = locale === "en" ? "ar" : "en";
  const pathname = usePathname();


  return (
    <Link
      href={`/${toggleLocale}${pathname.substring(3)}`}
      className="text-emerald-900 hover:text-emerald-800 font-semibold flex items-center gap-1 sm:gap-2 transition-colors duration-200 p-2 rounded-lg hover:bg-emerald-50"
    >
      <span className="text-sm sm:text-base">{toggleLocale === "ar" ? "ع" : "E"}</span>
      <FaGlobe size={18} className="sm:w-5 sm:h-5" />
    </Link>
  );
}
