"use client";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { FaArrowRight } from "react-icons/fa";

export default function JoinUsBtn() {
  const t = useTranslations("nav");
  const locale = useLocale();

  return (
    <Link
      href="https://discord.gg/24CskUbuuB"
      target="_blank"
      rel="noopener"
      className="bg-emerald-900 hover:bg-emerald-800 text-white rounded-full !px-4 !py-2 font-bold flex items-center gap-2"
    >
      {t("discord")} <FaArrowRight className={`inline-block ${locale === "ar" ? "scale-x-[-1]" : ""}`} />
    </Link>
  );
}
