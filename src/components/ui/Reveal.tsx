"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger offset in ms — mirrors the staggered section entrances in Figma. */
  delay?: number;
  className?: string;
  as?: ElementType;
} & React.HTMLAttributes<HTMLElement>;

/**
 * Scroll-triggered entrance. Uses the same 24px lift + ease-out-expo curve the
 * Figma timeline applies to the hero background, applied once per element.
 *
 * The hidden state lives behind `@media (scripting: enabled)`, so with
 * scripting off every section renders visible — and no inline class-setting
 * script is needed, which would otherwise break hydration.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // No IntersectionObserver: reveal immediately via the DOM rather than a
    // synchronous setState, which would cascade a second render.
    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("is-in");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
