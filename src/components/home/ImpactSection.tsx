import { Fragment } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/i18n";

/**
 * Impact Section - Process Graph — Figma 20:1043, 1440×780.
 *
 * #f8fafa ground, 205px top padding — the stats card hangs 65px into the
 * section, so the content rhythm stays 140px below the card — 64px
 * stack gap. Four steps read 01 → 04 right-to-left with 80×20 connectors.
 */

/** Per-step glow shadows from the design, zipped with dict.steps by index. */
const STEP_GLOWS = [
  "0 0 24px 0 rgba(20,184,166,0.2), 0 0 32px 0 rgba(46,128,105,0.2), 0 12px 28px 0 rgba(46,128,105,0.4)",
  "0 0 24px 0 rgba(20,184,166,0.2), 0 10px 24px 0 rgba(0,0,0,0.2)",
  "0 0 24px 0 rgba(20,184,166,0.2), 0 10px 24px 0 rgba(0,0,0,0.2)",
  "0 0 24px 0 rgba(20,184,166,0.2), 0 10px 24px 0 rgba(0,0,0,0.2)",
];

export default function ImpactSection({
  dict,
}: {
  dict: Dictionary["home"]["impact"];
}) {
  return (
    <section className="hidden w-full bg-[#f8fafa] pt-[205px] pb-[80px] lg:block">
      <div className="shell flex flex-col items-center gap-[64px]">
        <Reveal className="flex w-full flex-col items-start gap-[12px]">
          <span className="badge text-[#1b4332]">{dict.badge}</span>
          <h2 className="text-start text-[28px] font-bold text-[#1b4332] lg:text-[36px]">
            {dict.title}
          </h2>
          <p className="max-w-[640px] text-start text-[16px] text-[var(--color-brand)]">
            {dict.subtitle}
          </p>
        </Reveal>

        <div className="flex w-full flex-col items-stretch gap-y-[32px] sm:grid sm:grid-cols-2 lg:flex lg:flex-row lg:items-center">
          {dict.steps.map((step, i) => (
            <Fragment key={step.number}>
              {i > 0 && (
                <div aria-hidden className="relative hidden h-[20px] w-[80px] shrink-0 lg:block">
                  <Image
                    src="/figma/connector.svg"
                    alt=""
                    width={80}
                    height={22}
                    // The asset draws a left-pointing arrow (RTL reading
                    // order); flip it for LTR locales.
                    className="absolute left-0 top-[-2px] h-[22px] w-[80px] max-w-none -scale-x-100 rtl:scale-x-100"
                  />
                </div>
              )}
              <Reveal
                delay={i * 90}
                className="flex min-w-0 flex-1 flex-col items-center gap-[16px] px-[24px] pt-[24px] pb-[32px]"
              >
                <div
                  className="flex size-[104px] shrink-0 items-center justify-center rounded-[52px] border-2 border-[rgba(255,255,255,0.1)] bg-gradient-to-b from-[#2e8069] to-[var(--color-brand)] text-[28px] font-bold text-white"
                  style={{ boxShadow: STEP_GLOWS[i] }}
                >
                  {step.number}
                </div>
                <div className="flex w-full flex-col items-center gap-[8px] text-center">
                  <h3 className="w-full text-[20px] font-bold text-[#1b4332]">
                    {step.title}
                  </h3>
                  <p className="w-full text-[14px] leading-[normal] text-[var(--color-brand)]">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            </Fragment>
          ))}
        </div>

        <Reveal>
          <a href="https://community.itqan.dev" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            {dict.cta}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
