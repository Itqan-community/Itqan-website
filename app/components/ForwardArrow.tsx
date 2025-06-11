"use client";
import { useLocale } from "next-intl";
import { FaArrowRight } from "react-icons/fa";

export default function ForwardArrow({ silent }: { silent?: boolean }) {
  const locale = useLocale();
  
  return (
    <FaArrowRight 
      className={`inline-block ${locale === "ar" ? "scale-x-[-1]" : ""} ${silent ? "pointer-events-none" : ""}`}
    />
  );
}
