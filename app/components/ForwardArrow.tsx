import { memo } from 'react';

interface ForwardArrowProps {
  silent?: boolean;
  size?: number;
  locale?: string;
}

const ForwardArrow = memo(function ForwardArrow({ 
  silent, 
  size = 16, 
  locale = "en"
}: ForwardArrowProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`inline-block ${locale === "ar" ? "scale-x-[-1]" : ""} ${silent ? "pointer-events-none" : ""}`}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
});

export default ForwardArrow;
