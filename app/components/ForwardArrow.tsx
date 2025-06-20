import { FaArrowRight } from "react-icons/fa";

export default function ForwardArrow({ 
  silent, 
  size = 16, 
  locale = "en" 
}: { 
  silent?: boolean, 
  size?: number,
  locale?: string 
}) {
  return (
    <FaArrowRight 
      size={size}
      className={`inline-block ${locale === "ar" ? "scale-x-[-1]" : ""} ${silent ? "pointer-events-none" : ""}`}
    />
  );
}
