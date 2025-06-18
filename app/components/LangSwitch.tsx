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
      className="text-emerald-900 hover:text-emerald-800 font-semibold flex items-center gap-2"
    >
      <span>{toggleLocale === "ar" ? "ع" : "E"}</span>
      <FaGlobe size={22} />
    </Link>
  );
}
