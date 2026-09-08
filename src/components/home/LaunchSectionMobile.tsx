import Reveal from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/i18n";

/**
 * Launch Section Mobile — Figma 183:325, 390×957.
 *
 * Four stacked 358×157 cards with a 36px number tile at the top-right. The
 * mobile frame carries its own step copy, different from the desktop cards.
 */

export default function LaunchSectionMobile({
  dict,
}: {
  dict: Dictionary["home"]["launchMobile"];
}) {
  return (
    <section className="w-full bg-[rgba(232,238,235,0.42)] px-[16px] py-[48px] lg:hidden">
      <div className="flex flex-col gap-[32px]">
        <Reveal className="flex flex-col items-start gap-[12px]">
          <span className="badge">{dict.badge}</span>
          <h2 className="text-[26px] font-bold text-[var(--color-txt)]">
            {dict.title}
          </h2>
          <p className="text-[14px] text-[var(--color-txt-dim)]">
            {dict.subtitle}
          </p>
        </Reveal>

        <div className="flex flex-col gap-[16px]">
          {dict.steps.map((step, i) => (
            <Reveal
              key={step.number}
              delay={i * 70}
              className="card flex min-h-[157px] flex-col gap-[12px] p-[20px]"
            >
              <div className="flex size-[36px] items-center justify-center rounded-[18px] bg-[var(--brand-a08)] text-[14px] font-semibold text-[var(--color-grad-end)]">
                {step.number}
              </div>
              <h3 className="text-[17px] font-semibold text-[var(--color-topic-title)]">
                {step.title}
              </h3>
              <p className="text-[14px] text-[var(--color-txt-dim)]">{step.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="flex flex-col gap-[12px]">
          <a
            href="https://community.itqan.dev/t/community-support"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary h-[51px] w-full py-0"
          >
            {dict.supportCta}
          </a>
          <a
            href="https://quran-apps.itqan.dev/ar/submit-app"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost h-[51px] w-full border-[rgba(35,110,91,0.26)] bg-white py-0 text-[var(--color-grad-end)]"
          >
            {dict.directoryCta}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
