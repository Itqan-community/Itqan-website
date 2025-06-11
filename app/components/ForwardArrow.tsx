import { getLocale } from "next-intl/server";
import { FaArrowRight } from "react-icons/fa";

export default async function ForwardArrow({ silent }: { silent?: boolean }) {
  const locale = await getLocale();
  
  return (
    <FaArrowRight 
      className={`inline-block ${locale === "ar" ? "scale-x-[-1]" : ""} ${silent ? "pointer-events-none" : ""}`}
    />
  );
}
