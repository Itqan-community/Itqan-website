import Link from "next/link";
import ForwardArrow from "./ForwardArrow";
import { IconType } from "react-icons";

interface LinkBtnProps {
  title: string;
  href: string;
  variant?: "fill" | "outline" | "text";
  target?: string;
  locale?: string;
  icon?: IconType;
}

export default function LinkBtn({ 
  title,
  href,
  variant = "fill",
  target = "_self",
  locale = "en",
  icon
}: LinkBtnProps) {

  const baseStyles = variant === "text" 
    ? "flex items-center gap-2 max-w-fit text-sm sm:text-base text-black hover:text-primary-600"
    : "rounded-full !px-3 sm:!px-4 !py-2 sm:!py-3 flex items-center gap-2 max-w-fit transition-all duration-200 text-sm sm:text-base";

  const variantStyles = variant === "fill" 
    ? "bg-primary-600 hover:bg-primary-700 text-white hover:shadow-lg"
    : variant === "outline"
    ? "border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white hover:shadow-lg"
    : "text-primary-600";

  return (
    <Link
      href={href}
      target={target}
      className={`${baseStyles} transition-colors duration-200 ${variantStyles} ${variant !== "text" ? "hover-lift" : ""} font-semibold`}
    >
      {title} <ForwardArrow size={16} locale={locale} icon={icon} />
    </Link>
  );
}
