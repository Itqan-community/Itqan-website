import { getLocale } from "next-intl/server";
import { FaArrowRight } from "react-icons/fa";

export default async function ForwardArrow({ silent, size = 16 }: { silent?: boolean, size?: number }) {
  const locale = await getLocale();
  
  return (
    <FaArrowRight 
      size={size}
      className={`inline-block ${locale === "ar" ? "scale-x-[-1]" : ""} ${silent ? "pointer-events-none" : ""}`}
    />
  );
}
