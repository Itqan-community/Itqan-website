import Link from "next/link";
import ForwardArrow from "./ForwardArrow";

interface LinkBtnProps {
  title: string;
  href: string;
  variant?: "fill" | "outline";
  target?: string;
  locale?: string;
}

export default function LinkBtn({ 
  title,
  href,
  variant = "fill",
  target = "_self",
  locale = "en"
}: LinkBtnProps) {

  const baseStyles = "rounded-full !px-3 sm:!px-4 !py-2 sm:!py-3 flex items-center gap-2 max-w-fit transition-all duration-200 text-sm sm:text-base";
  const variantStyles = variant === "fill" 
    ? "bg-emerald-900 hover:bg-emerald-800 text-white hover:shadow-lg"
    : "border border-emerald-900 text-emerald-900 hover:bg-emerald-900 hover:text-white hover:shadow-lg";

  return (
    <Link
      href={href}
      target={target}
      className={`${baseStyles} ${variantStyles} hover-lift`}
    >
      {title} <ForwardArrow size={16} locale={locale} />
    </Link>
  );
}
