import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/i18n";

/**
 * Projects Section — Figma 20:1146, 1440×948.
 * White ground, 56px block padding, 40px gap.
 * Three project cards in a grid with logo, title, description, and action buttons.
 */

/** Non-translatable data, zipped with dict.items by index. */
const PROJECT_META = [
  { logo: "/figma/project-apps-arrows.png", site: "https://quran-apps.itqan.dev", repo: "https://github.com/orgs/Itqan-community/projects/4" },
  { logo: "/figma/project-ratq-roadmap.png", site: "https://ratq.itqan.dev", repo: "https://github.com/orgs/Itqan-community/projects/10" },
  { logo: "/figma/project-fanar-lighthouse.png", site: "https://cms.itqan.dev", repo: "https://github.com/orgs/Itqan-community/projects/12" },
];

export default function ProjectsSection({
  dict,
}: {
  dict: Dictionary["home"]["projects"];
}) {
  return (
    <section id="projects" className="hidden w-full bg-white py-[56px] lg:block">
      <div className="shell flex flex-col items-center gap-[40px]">
        <Reveal className="flex w-full flex-col items-start gap-[8px]">
          <span className="badge">{dict.badge}</span>
          <h2 className="text-start text-[28px] font-bold text-[var(--color-txt)] lg:text-[36px]">
            {dict.title}
          </h2>
          <p className="w-full max-w-[640px] text-start text-[16px] leading-[normal] text-[var(--color-txt-dim)]">
            {dict.subtitle}
          </p>
        </Reveal>

        <div className="grid w-full grid-cols-1 gap-[24px] md:grid-cols-2 lg:grid-cols-3">
          {dict.items.map((project, i) => {
            const meta = PROJECT_META[i];
            return (
            <Reveal
              key={project.name}
              delay={i * 80}
              className="flex flex-col gap-[20px] rounded-[12px] border border-[rgba(35,110,91,0.1)] bg-white p-[26px] pt-[28px] pb-[24px] shadow-[0_12px_32px_-8px_rgba(16,54,45,0.14)]"
            >
              <div className="flex size-[64px] items-center justify-center rounded-[16px] bg-[rgba(35,110,91,0.06)]">
                <Image
                  src={meta.logo}
                  alt=""
                  width={36}
                  height={36}
                  className="size-[36px] object-contain"
                />
              </div>

              <div className="flex flex-1 flex-col gap-[12px]">
                <h3 className="text-[20px] font-semibold text-[var(--color-topic-title)]">
                  {project.name}
                </h3>
                <p className="text-[14px] leading-[normal] text-[var(--color-txt-dim)]">
                  {project.body}
                </p>
              </div>

              <div className="h-px w-full bg-[rgba(18,70,58,0.08)]" />

              <div className="flex items-center gap-[8px]">
                <a
                  href={meta.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center rounded-[8px] border border-[rgba(35,110,91,0.26)] bg-transparent px-[16px] py-[9px] text-[13px] font-medium text-[var(--color-grad-end)] transition-colors duration-200 hover:bg-[var(--brand-a06)]"
                >
                  {project.contributeLabel}
                </a>
                <Link
                  href={meta.site}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center rounded-[8px] bg-[rgba(35,110,91,0.1)] px-[16px] py-[9px] text-[13px] font-medium text-[var(--color-grad-end)] transition-colors duration-200 hover:bg-[var(--brand-a10)]"
                >
                  {dict.browseLabel}
                </Link>
              </div>
            </Reveal>
            );
          })}
        </div>


      </div>
    </section>
  );
}
