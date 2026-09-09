import Reveal from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/i18n";

/**
 * Launch Section — Figma 149:147, 1440×731.
 * rgba(232,238,235,.42) ground, 100px padding, 56px stack gap.
 * Four 292×250 cards read 1 → 4 right-to-left.
 */

export default function LaunchSection({
  dict,
}: {
  dict: Dictionary["home"]["launch"];
}) {
  return (
    <section className="hidden w-full bg-[rgba(232,238,235,0.42)] py-[64px] lg:block lg:py-[100px]">
      <div className="shell flex flex-col items-center gap-[56px]">
        <Reveal className="flex w-full flex-col items-start gap-[12px]">
          <span className="badge">{dict.badge}</span>
          <h2 className="w-full text-start text-[28px] font-bold text-[var(--color-txt)] lg:text-[36px]">
            {dict.title}
          </h2>
          <p className="w-full max-w-[640px] text-start text-[16px] leading-[normal] text-[var(--color-txt-dim)]">
            {dict.subtitle}
          </p>
        </Reveal>

        <div className="grid w-full grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-4">
          {dict.steps.map((step, i) => (
            <Reveal
              key={step.number}
              delay={i * 80}
              className="card flex min-h-[250px] flex-col items-start gap-[18px] px-[24px] py-[28px]"
            >
              <div className="flex size-[44px] shrink-0 items-center justify-center rounded-[22px] bg-[var(--brand-a08)] text-[15px] font-semibold text-[var(--color-grad-end)]">
                {step.number}
              </div>
              <div className="flex w-full flex-col gap-[8px] text-start">
                {/* Arabic titles wrap unevenly (1-2 lines); reserve two lines so
                    every card's body starts on the same horizontal line. */}
                <h3 className="text-[17px] font-semibold leading-[normal] text-[var(--color-topic-title)] rtl:min-h-[42px]">
                  {step.title}
                </h3>
                <p className="text-[14px] leading-[normal] text-[var(--color-txt-dim)]">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="flex flex-col gap-[12px] sm:flex-row sm:items-center">
          <a href="https://community.itqan.dev/t/community-support" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            {dict.supportCta}
          </a>
          <a
            href={dict.submitAppHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost border-[rgba(35,110,91,0.26)] bg-white text-[var(--color-grad-end)]"
          >
            {dict.directoryCta}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
