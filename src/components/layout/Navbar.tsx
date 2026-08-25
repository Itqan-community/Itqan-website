"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/nav";

const isExternal = (href: string) => /^https?:\/\//.test(href);

/**
 * Navbar — Figma 133:79.
 *
 * "الهيدر — RTL top navigation: logo (→ الرئيسية) at the right, primary links,
 *  and the انضم لمجتمع إتقان CTA at the left. الموارد and عن إتقان open dropdowns."
 *
 * Desktop: 76px tall, 100px gutters, 1px rgba(35,110,91,.1) bottom hairline.
 * Mobile (183:177): 64px tall with a 32px hamburger inset 16px from the edge.
 */
export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
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
          <Link href="/" aria-label="إتقان — الصفحة الرئيسية" className="shrink-0">
            <Image
              src="/figma/itqan-logo-dark.png"
              alt="إتقان"
              width={140}
              height={50}
              priority
              className="h-[50px] w-[140px] object-contain"
            />
          </Link>

          <ul className="flex items-center gap-[26px]">
            {navItems.map((item) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => item.menu && setOpenMenu(item.label)}
                onMouseLeave={() => item.menu && setOpenMenu(null)}
              >
                {isExternal(item.href) ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-[5px] px-[4px] py-[8px] text-[15px] font-medium text-[var(--color-txt)] transition-colors duration-200 hover:text-[var(--color-brand)]"
                    aria-expanded={item.menu ? openMenu === item.label : undefined}
                  >
                    <span>{item.label}</span>
                    {item.menu && (
                      <Image
                        src="/figma/icon-chevron-down.svg"
                        alt=""
                        width={16}
                        height={16}
                        className={`size-[16px] transition-transform duration-200 ${
                          openMenu === item.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center gap-[5px] px-[4px] py-[8px] text-[15px] font-medium text-[var(--color-txt)] transition-colors duration-200 hover:text-[var(--color-brand)]"
                    aria-expanded={item.menu ? openMenu === item.label : undefined}
                  >
                    <span>{item.label}</span>
                    {item.menu && (
                      <Image
                        src="/figma/icon-chevron-down.svg"
                        alt=""
                        width={16}
                        height={16}
                        className={`size-[16px] transition-transform duration-200 ${
                          openMenu === item.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>
                )}

                {item.menu && (
                  <div
                    className={`absolute end-0 top-full min-w-[240px] origin-top rounded-[var(--radius-topic)] border border-[var(--brand-a10)] bg-white p-[8px] shadow-[var(--shadow-card)] transition-all duration-200 ${
                      openMenu === item.label
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-[6px] opacity-0"
                    }`}
                  >
                    {item.menu.map((sub) =>
                      isExternal(sub.href) ? (
                        <a
                          key={sub.label}
                          href={sub.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block rounded-[8px] px-[12px] py-[10px] text-[14px] text-[var(--color-txt-dim)] transition-colors duration-150 hover:bg-[var(--brand-a06)] hover:text-[var(--color-brand)]"
                        >
                          {sub.label}
                        </a>
                      ) : (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="block rounded-[8px] px-[12px] py-[10px] text-[14px] text-[var(--color-txt-dim)] transition-colors duration-150 hover:bg-[var(--brand-a06)] hover:text-[var(--color-brand)]"
                        >
                          {sub.label}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Second child sits at the left under RTL: the join CTA. */}
        <a href="https://community.itqan.dev" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          انضم لمجتمع إتقان
        </a>
      </nav>

      {/* ----------------------------------------------------------------- mobile */}
      <div className="flex h-[64px] items-center justify-between px-[16px] lg:hidden">
        <Link href="/" aria-label="إتقان — الصفحة الرئيسية">
          <Image
            src="/figma/itqan-logo-dark.png"
            alt="إتقان"
            width={104}
            height={38}
            priority
            className="h-[38px] w-[104px] object-contain"
          />
        </Link>

        {/* Hamburger — 32px box, 16px/12px rules as drawn in 183:178. */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="القائمة"
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

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden border-t border-[var(--brand-a10)] bg-white transition-[max-height] duration-300 ease-[var(--ease-out-expo)] lg:hidden ${
          mobileOpen ? "max-h-[520px]" : "max-h-0 border-t-0"
        }`}
      >
        <ul className="flex flex-col gap-[2px] px-[16px] py-[12px]">
          {navItems.map((item) => (
            <li key={item.label}>
              {isExternal(item.href) ? (
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
              {item.menu && (
                <ul className="mb-[4px] ps-[12px]">
                  {item.menu.map((sub) => (
                    <li key={sub.label}>
                      {isExternal(sub.href) ? (
                        <a
                          href={sub.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-[8px] px-[12px] py-[9px] text-[13px] text-[var(--color-txt-dim)]"
                        >
                          {sub.label}
                        </a>
                      ) : (
                        <Link
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-[8px] px-[12px] py-[9px] text-[13px] text-[var(--color-txt-dim)]"
                        >
                          {sub.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
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
              انضم لمجتمع إتقان
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
