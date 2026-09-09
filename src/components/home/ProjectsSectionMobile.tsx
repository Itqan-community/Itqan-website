import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/i18n";

/**
 * Projects Section Mobile — Figma 183:285, 390×1076.
 *
 * Replaces the desktop slider (one slide + phone media + dots) with three
 * stacked 358px cards: 52px logo tile, title, body, hairline, two pill buttons.
 * The mobile frame carries its own project copy.
 */

/** Non-translatable logos, zipped with dict.items by index. */
const LOGOS = ["/figma/project-apps-arrows.png", "/figma/project-ratq-roadmap.png", "/figma/project-fanar-lighthouse.png"];

export default function ProjectsSectionMobile({
  dict,
}: {
  dict: Dictionary["home"]["projectsMobile"];
}) {
  return (
    <section id="projects" className="w-full bg-white px-[16px] pt-[48px] pb-[48px] lg:hidden">
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
          {dict.items.map((project, i) => (
            <Reveal
              key={project.title}
              delay={i * 70}
              className="card flex flex-col gap-[16px] p-[20px]"
            >
              <div className="flex size-[52px] items-center justify-center rounded-[14px] bg-[var(--brand-a06)]">
                <Image
                  src={LOGOS[i]}
                  alt=""
                  width={28}
                  height={28}
                  className="size-[28px] object-contain"
                />
              </div>
              <h3 className="text-[18px] font-semibold text-[var(--color-topic-title)]">
                {project.title}
              </h3>
              <p className="text-[14px] text-[var(--color-txt-dim)]">{project.body}</p>

              <div className="h-px w-full bg-[var(--brand-a10)]" />

              <div className="flex items-center gap-[8px]">
                <a
                  href={project.secondary.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-[31px] flex-1 items-center justify-center rounded-[8px] border border-[rgba(35,110,91,0.26)] text-[13px] font-medium text-[var(--color-grad-end)]"
                >
                  {project.secondary.label}
                </a>
                <Link
                  href={project.primary.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-[31px] flex-1 items-center justify-center rounded-[8px] bg-[var(--color-brand)] text-[13px] font-medium text-white"
                >
                  {project.primary.label}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
