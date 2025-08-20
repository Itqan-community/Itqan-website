import { IconType } from "react-icons";
import { FaArrowRight } from "react-icons/fa";
import { LuArrowRight } from "react-icons/lu";

export default function ForwardArrow({ 
  silent, 
  size = 16, 
  locale = "en",
  icon: Icon = LuArrowRight
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
