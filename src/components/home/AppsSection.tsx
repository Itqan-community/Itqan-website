"use client";

import Image from "next/image";
import { useRef } from "react";
import Reveal from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/i18n";

/**
 * Apps Section — Figma 150:151, 1440×372.
 * White ground, 48px block padding, 32px gap. 160×160 cards, 16px gutter,
 * 48px round arrow buttons flanking a masked rail.
 *
 * The "All Apps Legend" child (180:354) is hidden in the Figma file
 * (visible: false), so it is not rendered here.
 *
 * Note: the section badge uses #a7d4c8 on a rgba(255,255,255,.08) pill, which
 * is what the design specifies — it reads as very low contrast on white.
 */

/** Non-translatable icons, zipped with dict.items by index (undefined = none). */
const APP_ICONS: (string | undefined)[] = ["/figma/app-alkitab.png", undefined, "/figma/app-qurantab.png", "/figma/app-khateeb.png", "/figma/app-qaf.png", "/figma/app-muslimpedia.png", "/figma/app-kalimat.png", undefined, "/figma/app-taahud.png", "/figma/app-quran-live.png", "/figma/app-smart-search.png", "/figma/app-mihrab.png", "/figma/app-quranlingo.png", "/figma/app-quraniai.png", "/figma/app-zalfa.svg", "/figma/app-tajweedo.png", "/figma/app-qiraat.png"];

/** One card + one gutter. */
const STEP = 176;

export default function AppsSection({
  dict,
}: {
  dict: Dictionary["home"]["apps"];
}) {
  const railRef = useRef<HTMLDivElement>(null);

  /** `dir` = 1 advances toward later apps, -1 goes back. Under RTL, moving
      toward later content means a negative scrollLeft delta. */
  const scrollRail = (dir: 1 | -1) => {
    const isRtl =
      typeof document !== "undefined" &&
      document.documentElement.dir === "rtl";
    const sign = isRtl ? -1 : 1;
    railRef.current?.scrollBy({ left: sign * dir * STEP * 2, behavior: "smooth" });
  };

  return (
    <section className="w-full bg-white py-[48px]">
      <div className="shell flex flex-col items-center gap-[32px]">
        <Reveal className="flex w-full flex-col items-start gap-[12px]">
          <span className="rounded-[100px] bg-[rgba(255,255,255,0.08)] px-[14px] py-[6px] text-[12px] font-medium text-[#a7d4c8]">
            {dict.badge}
          </span>
          <h2 className="text-start text-[26px] font-bold text-[#0f2820] lg:text-[36px]">
            <span className="lg:hidden">{dict.titleMobile}</span>
            <span className="hidden lg:inline">{dict.titleDesktop}</span>
          </h2>
          <p className="text-start text-[14px] text-[var(--color-txt-dim)] lg:hidden">
            {dict.subtitleMobile}
          </p>
        </Reveal>

        <div className="flex w-full items-center gap-[16px]">
          {/* First child lands on the right under RTL — the "back" affordance.
              Note: icon-arrow-left.svg draws a right-pointing chevron and
              icon-arrow-right.svg a left-pointing one (assets are named for
              their slot, not their geometry). */}
          <button
            type="button"
            onClick={() => scrollRail(-1)}
            aria-label={dict.prevAria}
            className="hidden size-[48px] shrink-0 items-center justify-center rounded-[24px] border border-[#e5e7eb] bg-white transition-colors duration-200 hover:bg-[var(--brand-a04)] sm:flex"
          >
            <Image
              src="/figma/icon-arrow-left.svg"
              alt=""
              width={20}
              height={20}
              className="size-[20px]"
            />
          </button>

          <div
            ref={railRef}
            className="no-scrollbar h-[120px] min-w-0 flex-1 overflow-x-auto overflow-y-hidden lg:h-[160px]"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0, #000 56px, #000 calc(100% - 56px), transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0, #000 56px, #000 calc(100% - 56px), transparent 100%)",
            }}
          >
            <div className="flex h-full items-center gap-[16px]">
              {dict.items.map((name, i) => {
                const icon = APP_ICONS[i];
                return (
                <div
                  key={name}
                  className="flex h-[120px] w-[140px] shrink-0 flex-col items-center justify-center gap-[10px] overflow-hidden rounded-[16px] border border-[#e5e7eb] bg-white lg:size-[160px]"
                >
                  {icon ? (
                    <Image
                      src={icon}
                      alt=""
                      width={48}
                      height={48}
                      className="size-[40px] rounded-[12px] object-contain lg:size-[48px]"
                    />
                  ) : (
                    <div className="size-[40px] rounded-[12px] bg-[rgba(35,110,91,0.07)] lg:size-[48px]" />
                  )}
                  <p className="w-full px-[8px] text-center text-[12px] font-medium leading-[16px] text-[#0f2820]">
                    {name}
                  </p>
                </div>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={() => scrollRail(1)}
            aria-label={dict.nextAria}
            className="hidden size-[48px] shrink-0 items-center justify-center rounded-[24px] border border-[#e5e7eb] bg-white transition-colors duration-200 hover:bg-[var(--brand-a04)] sm:flex"
          >
            <Image
              src="/figma/icon-arrow-right.svg"
              alt=""
              width={20}
              height={20}
              className="size-[20px]"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
