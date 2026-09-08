import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/i18n";

/**
 * Impact Section Mobile — Figma 183:249, 390×938.
 *
 * The mobile frame replaces the desktop process graph (numbered circles +
 * connectors) with four stacked 358×161 cards, each with a 40px icon tile at
 * the top-right, and carries its own copy.
 */

export default function ImpactSectionMobile({
  dict,
}: {
  dict: Dictionary["home"]["impactMobile"];
}) {
  return (
    <section className="w-full bg-[#f8fafa] px-[16px] pt-[48px] pb-[48px] lg:hidden">
      <div className="flex flex-col gap-[32px]">
        <Reveal className="flex flex-col items-start gap-[12px]">
          <span className="badge text-[#1b4332]">{dict.badge}</span>
          <h2 className="text-[26px] font-bold text-[#1b4332]">{dict.title}</h2>
          <p className="text-[14px] text-[var(--color-brand)]">
            {dict.subtitle}
          </p>
        </Reveal>

        <div className="flex flex-col gap-[16px]">
          {dict.steps.map((step, i) => (
            <Reveal
              key={step.title}
              delay={i * 70}
              className="card flex min-h-[161px] flex-col gap-[12px] p-[20px]"
            >
              <div className="flex size-[40px] items-center justify-center rounded-[12px] bg-[var(--brand-a08)]">
                <Image
                  src={step.icon}
                  alt=""
                  width={20}
                  height={20}
                  className="size-[20px]"
                />
              </div>
              <h3 className="text-[17px] font-semibold text-[var(--color-topic-title)]">
                {step.title}
              </h3>
              <p className="text-[14px] text-[var(--color-txt-dim)]">{step.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
