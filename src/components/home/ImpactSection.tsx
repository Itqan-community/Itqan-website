import { Fragment } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

/**
 * Impact Section - Process Graph — Figma 20:1043, 1440×780.
 *
 * #f8fafa ground, 140px top padding (the stats card overlaps into it), 64px
 * stack gap. Four steps read 01 → 04 right-to-left with 80×20 connectors.
 */

const steps = [
  {
    number: "01",
    title: "ساهم",
    body: "اختر مشروعًا قائمًا وساهم فيه بمهاراتك ومراجعاتك وأفكارك",
    /* Step 1 carries an extra brand glow in Figma. */
    glow: "0 0 24px 0 rgba(20,184,166,0.2), 0 0 32px 0 rgba(46,128,105,0.2), 0 12px 28px 0 rgba(46,128,105,0.4)",
  },
  {
    number: "02",
    title: "تعلم",
    body: "استفد من الخبراء لتطور مهاراتك في التقنيات القرآنية",
    glow: "0 0 24px 0 rgba(20,184,166,0.2), 0 10px 24px 0 rgba(0,0,0,0.2)",
  },
  {
    number: "03",
    title: "ناقش",
    body: "انضم إلى مجتمع المطورين والباحثين وشارك خبراتك وأسئلتك",
    glow: "0 0 24px 0 rgba(20,184,166,0.2), 0 10px 24px 0 rgba(0,0,0,0.2)",
  },
  {
    number: "04",
    title: "أطلق",
    body: "ابنِ قدرة مشروعك أو أطلق عليها دعم من مجتمع إتقان",
    glow: "0 0 24px 0 rgba(20,184,166,0.2), 0 10px 24px 0 rgba(0,0,0,0.2)",
  },
];

export default function ImpactSection() {
  return (
    <section className="hidden w-full bg-[#f8fafa] pt-[140px] pb-[80px] lg:block">
      <div className="shell flex flex-col items-center gap-[64px]">
        <Reveal className="flex w-full flex-col items-start gap-[12px]">
          <span className="badge text-[#1b4332]">مجتمع إتقان</span>
          <h2 className="text-start text-[28px] font-bold text-[#1b4332] lg:text-[36px]">
            كن جزءًا من أثر يمتد
          </h2>
          <p className="max-w-[640px] text-start text-[16px] text-[var(--color-brand)]">
            في مجتمع إتقان مساحة واسعة تجد فيها نفسك وتصنع بها الفارق
          </p>
        </Reveal>

        <div className="flex w-full flex-col items-stretch gap-y-[32px] sm:grid sm:grid-cols-2 lg:flex lg:flex-row lg:items-center">
          {steps.map((step, i) => (
            <Fragment key={step.number}>
              {i > 0 && (
                <div aria-hidden className="relative hidden h-[20px] w-[80px] shrink-0 lg:block">
                  <Image
                    src="/figma/connector.svg"
                    alt=""
                    width={80}
                    height={22}
                    className="absolute left-0 top-[-2px] h-[22px] w-[80px] max-w-none"
                  />
                </div>
              )}
              <Reveal
                delay={i * 90}
                className="flex min-w-0 flex-1 flex-col items-center gap-[16px] px-[24px] pt-[24px] pb-[32px]"
              >
                <div
                  className="flex size-[104px] shrink-0 items-center justify-center rounded-[52px] border-2 border-[rgba(255,255,255,0.1)] bg-gradient-to-b from-[#2e8069] to-[var(--color-brand)] text-[28px] font-bold text-white"
                  style={{ boxShadow: step.glow }}
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
          <a href="https://join.itqan.dev" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            انضم لمجتمع إتقان
          </a>
        </Reveal>
      </div>
    </section>
  );
}
