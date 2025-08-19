import { IconType } from "react-icons";
import { FaArrowRight } from "react-icons/fa";

export default function ForwardArrow({ 
  silent, 
  size = 16, 
  locale = "en",
  icon: Icon = FaArrowRight
}: { 
  silent?: boolean, 
  size?: number,
  locale?: string,
  icon?: IconType
}) {
  return (
    <Icon
      size={size} 
      className={`inline-block ${locale === "ar" ? "scale-x-[-1]" : ""} ${silent ? "pointer-events-none" : ""}`}
    />
  );
}
