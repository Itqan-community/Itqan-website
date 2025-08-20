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
    ? "flex items-center gap-2 max-w-fit text-sm sm:text-base text-neutral-900 hover:text-primary-600"
    : "rounded-full !px-3 sm:!px-4 flex items-center gap-2 max-w-fit text-sm sm:text-base";

  const variantStyles = variant === "fill" 
    ? "bg-primary-600 hover:bg-primary-700 text-white hover:shadow-lg"
    : variant === "outline"
    ? "!py-2 shadow-[0_0_0_1px_rgba(163,163,163,1)] hover:bg-primary-50 text-neutral-700 duration-200"
    : "";

  return (
    <Link
      href={href}
      target={target}
      className={`${baseStyles} ${variantStyles} ${variant === "fill" ? "hover-lift transition-all duration-200" : ""} font-semibold`}
    >
      {title} <ForwardArrow size={16} locale={locale} icon={icon} />
    </Link>
  );
}
