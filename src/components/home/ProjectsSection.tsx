import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

/**
 * Projects Section — Figma 20:1146, 1440×948.
 * White ground, 56px block padding, 40px gap.
 * Three project cards in a grid with logo, title, description, and action buttons.
 */

type Project = {
  name: string;
  logo: string;
  body: string;
  contributeLabel: string;
  site: string;
  repo: string;
};

const projects: Project[] = [
  {
    name: "دليل التطبيقات القرآنية",
    logo: "/figma/project-apps-arrows.png",
    body: "منصة شاملة تجمع تطبيقات القرآن الكريم الرقمية وتُصنّفها وتُوثّقها وفق معايير موحّدة، لتُسهّل على المسلمين اكتشاف التطبيق المناسب لاحتياجهم، وتمنح المطورين والباحثين خريطة واضحة للمشهد التقني القرآني.",
    contributeLabel: "ساهم في الدليل",
    site: "https://quran-apps.itqan.dev",
    repo: "https://github.com/orgs/Itqan-community/projects/4",
  },
  {
    name: "رتق",
    logo: "/figma/project-ratq-roadmap.png",
    body: "قاعدة معرفية تقنية (Roadmap and Technologies for Qur'an)، تجمع الأدوات والتقنيات اللازمة لتطوير التطبيقات القرآنية وتنظمها في خارطة طريق واضحة للمطورين.",
    contributeLabel: "ساهم في رتق",
    site: "https://ratq.itqan.dev",
    repo: "https://github.com/orgs/Itqan-community/projects/10",
  },
  {
    name: "فنار",
    logo: "/figma/project-fanar-lighthouse.png",
    body: "نظام لنشر وإدارة المحتوى القرآني، يمنح الجهات الناشرة مساحة رقمية مستقلة بهويتها الخاصة، تُمكّنها من نشر تلاواتها وأصولها القرآنية بمعايير احترافية وتراخيص محددة تحفظ حقوقها وتُنظم الاستخدام.",
    contributeLabel: "ساهم في فنار",
    site: "https://cms.itqan.dev",
    repo: "https://github.com/orgs/Itqan-community/projects/12",
  },
];

export default function ProjectsSection() {
  return (
    <section className="hidden w-full bg-white py-[56px] lg:block">
      <div className="shell flex flex-col items-center gap-[40px]">
        <Reveal className="flex w-full flex-col items-start gap-[8px]">
          <span className="badge">مفتوح المصدر</span>
          <h2 className="text-start text-[28px] font-bold text-[var(--color-txt)] lg:text-[36px]">
            مشاريع مجتمعية
          </h2>
          <p className="w-full max-w-[640px] text-start text-[16px] leading-[normal] text-[var(--color-txt-dim)]">
            مشاريع تقنية مفتوحة المصدر تهدف لسد الثغرات في المحتوى التقني القرآني، متاحة
            للجميع للمساهمة والاستخدام
          </p>
        </Reveal>

        <div className="grid w-full grid-cols-1 gap-[24px] md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal
              key={project.name}
              delay={i * 80}
              className="flex flex-col gap-[20px] rounded-[12px] border border-[rgba(35,110,91,0.1)] bg-white p-[26px] pt-[28px] pb-[24px] shadow-[0_12px_32px_-8px_rgba(16,54,45,0.14)]"
            >
              <div className="flex size-[64px] items-center justify-center rounded-[16px] bg-[rgba(35,110,91,0.06)]">
                <Image
                  src={project.logo}
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
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center rounded-[8px] border border-[rgba(35,110,91,0.26)] bg-transparent px-[16px] py-[9px] text-[13px] font-medium text-[var(--color-grad-end)] transition-colors duration-200 hover:bg-[var(--brand-a06)]"
                >
                  {project.contributeLabel}
                </a>
                <Link
                  href={project.site}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center rounded-[8px] bg-[rgba(35,110,91,0.1)] px-[16px] py-[9px] text-[13px] font-medium text-[var(--color-grad-end)] transition-colors duration-200 hover:bg-[var(--brand-a10)]"
                >
                  تصفح المشروع
                </Link>
              </div>
            </Reveal>
          ))}
        </div>


      </div>
    </section>
  );
}
