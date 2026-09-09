"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import LocaleSwitch from "./LocaleSwitch";
import { getDictionary, type Locale } from "@/lib/i18n";

/**
 * Navbar — Figma 133:79.
 *
 * "الهيدر — RTL top navigation: logo (→ الرئيسية) at the right, primary links,
 *  and the انضم لمجتمع إتقان CTA at the left."
 *
 * Desktop: 76px tall, 100px gutters, 1px rgba(35,110,91,.1) bottom hairline.
 * Mobile (183:177): 64px tall with a 32px hamburger inset 16px from the edge.
 */
export default function Navbar({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const items = dict.nav.items.filter((item) => !item.hidden);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--color-bg)]/95 backdrop-blur-[10px] border-b border-[var(--brand-a10)]">
      {/* ---------------------------------------------------------------- desktop */}
      <nav className="shell hidden h-[76px] items-center justify-between lg:flex">
        {/* First child sits at the right under RTL: logo + links. */}
        <div className="flex items-center gap-[40px]">
          <Link href={`/${locale}`} aria-label={dict.nav.homeAria} className="shrink-0">
            <Image
              src="/figma/itqan-logo-dark.png"
              alt={dict.nav.logoAlt}
              width={140}
              height={50}
              priority
              className="h-[50px] w-[140px] object-contain"
            />
          </Link>

          <ul className="flex items-center gap-[26px]">
            {items.map((item) => (
              <li key={item.label}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-[5px] px-[4px] py-[8px] text-[15px] font-medium text-[var(--color-txt)] transition-colors duration-200 hover:text-[var(--color-brand)]"
                  >
                    <span>{item.label}</span>
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center gap-[5px] px-[4px] py-[8px] text-[15px] font-medium text-[var(--color-txt)] transition-colors duration-200 hover:text-[var(--color-brand)]"
                  >
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Second child sits at the left under RTL: locale switch + join CTA. */}
        <div className="flex items-center gap-[12px]">
          <LocaleSwitch locale={locale} />
          <a href="https://community.itqan.dev" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            {dict.nav.cta}
          </a>
        </div>
      </nav>

      {/* ----------------------------------------------------------------- mobile */}
      <div className="flex h-[64px] items-center justify-between px-[16px] lg:hidden">
        <Link href={`/${locale}`} aria-label={dict.nav.homeAria}>
          <Image
            src="/figma/itqan-logo-dark.png"
            alt={dict.nav.logoAlt}
            width={104}
            height={38}
            priority
            className="h-[38px] w-[104px] object-contain"
          />
        </Link>

        <div className="flex items-center gap-[12px]">
          <LocaleSwitch locale={locale} />

          {/* Hamburger — 32px box, 16px/12px rules as drawn in 183:178. */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={dict.nav.menuAria}
            aria-expanded={mobileOpen}
            className="flex size-[32px] flex-col items-center justify-center gap-[3px]"
          >
            <span
              className={`h-[1.5px] w-[16px] rounded-full bg-[var(--color-txt)] transition-transform duration-200 ${
                mobileOpen ? "translate-y-[4.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-[16px] rounded-full bg-[var(--color-txt)] transition-opacity duration-200 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-[1.5px] rounded-full bg-[var(--color-txt)] transition-transform duration-200 ${
                mobileOpen ? "w-[16px] -translate-y-[4.5px] -rotate-45" : "w-[12px]"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden border-t border-[var(--brand-a10)] bg-white transition-[max-height] duration-300 ease-[var(--ease-out-expo)] lg:hidden ${
          mobileOpen ? "max-h-[520px]" : "max-h-0 border-t-0"
        }`}
      >
        <ul className="flex flex-col gap-[2px] px-[16px] py-[12px]">
          {items.map((item) => (
            <li key={item.label}>
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-[8px] px-[12px] py-[12px] text-[15px] font-medium text-[var(--color-txt)]"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-[8px] px-[12px] py-[12px] text-[15px] font-medium text-[var(--color-txt)]"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
          <li className="pt-[8px]">
            <a
              href="https://community.itqan.dev"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="btn btn-primary w-full"
            >
              {dict.nav.cta}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
