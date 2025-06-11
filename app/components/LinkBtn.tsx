"use client";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { FaArrowRight } from "react-icons/fa";

interface LinkBtnProps {
  title: string;
  href: string;
  variant?: "fill" | "outline";
  target?: string;
}

export default function LinkBtn({ 
  title,
  href,
  variant = "fill",
  target = "_self"
}: LinkBtnProps) {
  const locale = useLocale();

  const baseStyles = "rounded-full !px-4 !py-2 font-bold flex items-center gap-2 max-w-fit transition-all duration-200";
  const variantStyles = variant === "fill" 
    ? "bg-emerald-900 hover:bg-emerald-800 text-white"
    : "border border-emerald-900 text-emerald-900 hover:bg-emerald-900 hover:text-white";

  return (
    <Link
      href={href}
      target={target}
      className={`${baseStyles} ${variantStyles}`}
    >
      {title} <FaArrowRight className={`inline-block ${locale === "ar" ? "scale-x-[-1]" : ""}`} />
    </Link>
  );
}
