"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import RichSegments from "@/components/ui/RichSegments";
import type { Dictionary } from "@/lib/i18n";

/**
 * FAQ Section — Figma 153:155, 1440×1481.
 * White ground, 96px top / 110px bottom padding, 44px gap.
 * 1020px list, 14px gap; cards are 26px/24px padded with a 12px radius.
 *
 * The accordion starts collapsed and the chevron rotates on toggle.
 */

export default function FaqSection({
  dict,
}: {
  dict: Dictionary["home"]["faq"];
}) {
  const [open, setOpen] = useState<number[]>([]);
  const toggle = (i: number) =>
    setOpen((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  return (
    <section className="w-full bg-white pt-[64px] pb-[80px] lg:pt-[96px] lg:pb-[110px]">
      <div className="shell flex flex-col items-center gap-[44px]">
        <Reveal className="flex w-full flex-col items-start gap-[12px]">
          <span className="badge">{dict.badge}</span>
          <h2 className="w-full text-start text-[26px] font-bold text-[var(--color-txt)] lg:text-[36px]">
            {dict.title}
          </h2>
        </Reveal>

        <div className="flex w-full max-w-[1020px] flex-col gap-[14px]">
          {dict.items.map((faq, i) => {
            const isOpen = open.includes(i);
            return (
              <Reveal
                key={faq.q}
                delay={Math.min(i, 4) * 60}
                className="overflow-hidden rounded-[12px] border border-[rgba(35,110,91,0.11)] bg-white px-[16px] py-[16px] shadow-[0_8px_22px_-6px_rgba(16,54,45,0.08)] lg:px-[26px] lg:py-[24px]"
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-[8px] text-start lg:gap-[14px]"
                >
                  <span className="min-w-0 flex-1 text-[15px] font-semibold leading-[normal] text-[var(--color-topic-title)] lg:text-[17px]">
                    {faq.q}
                  </span>
                  <Image
                    src="/figma/icon-faq-chevron.svg"
                    alt=""
                    width={18}
                    height={18}
                    className={`size-[18px] shrink-0 transition-transform duration-300 ${
                      isOpen ? "" : "rotate-180"
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-out-expo)] ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pt-[8px] text-start text-[13px] leading-[normal] text-[var(--color-txt-dim)] lg:pt-[12px] lg:text-[14px]">
                      <RichSegments segments={faq.a} />
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
