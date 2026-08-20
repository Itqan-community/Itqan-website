import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

/**
 * Projects Section Mobile — Figma 183:285, 390×1076.
 *
 * Replaces the desktop slider (one slide + phone media + dots) with three
 * stacked 358px cards: 52px logo tile, title, body, hairline, two pill buttons.
 * The mobile frame carries its own project copy.
 */

const projects = [
  {
    title: "دليل التطبيقات القرآنية",
    logo: "/figma/project-apps-arrows.png",
    body: "منصة شاملة تجمع تطبيقات القرآن الكريم الرقمية وتُصنّفها وتُوثّقها وفق معايير موحّدة، لتُسهّل على المسلمين اكتشاف التطبيق المناسب لاحتياجهم، وتمنح المطورين والباحثين خريطة واضحة للمشهد التقني القرآني.",
    primary: { label: "تصفح المشروع", href: "https://quran-apps.itqan.dev" },
    secondary: { label: "ساهم في الدليل", href: "https://github.com/orgs/Itqan-community/projects/4" },
  },
  {
    title: "رتق",
    logo: "/figma/project-ratq-roadmap.png",
    body: "قاعدة معرفية تقنية (Roadmap and Technologies for Qur'an)، تجمع الأدوات والتقنيات اللازمة لتطوير التطبيقات القرآنية وتنظمها في خارطة طريق واضحة للمطورين.",
    primary: { label: "تصفح رتق", href: "https://ratq.itqan.dev" },
    secondary: { label: "ساهم في رتق", href: "https://github.com/orgs/Itqan-community/projects/10" },
  },
  {
    title: "فنار",
    logo: "/figma/project-fanar-lighthouse.png",
    body: "نظام لنشر وإدارة المحتوى القرآني، يمنح الجهات الناشرة مساحة رقمية مستقلة بهويتها الخاصة، تُمكّنها من نشر تلاواتها وأصولها القرآنية بمعايير احترافية وتراخيص محددة تحفظ حقوقها وتُنظم الاستخدام.",
    primary: { label: "تصفح فنار", href: "https://cms.itqan.dev" },
    secondary: { label: "ساهم في فنار", href: "https://github.com/orgs/Itqan-community/projects/12" },
  },
];

export default function ProjectsSectionMobile() {
  return (
    <section id="projects" className="w-full bg-white px-[16px] pt-[48px] pb-[48px] lg:hidden">
      <div className="flex flex-col gap-[32px]">
        <Reveal className="flex flex-col items-start gap-[12px]">
          <span className="badge">مفتوح المصدر</span>
          <h2 className="text-[26px] font-bold text-[var(--color-txt)]">
            مشاريع مجتمعية نشطة
          </h2>
          <p className="text-[14px] text-[var(--color-txt-dim)]">
            مشاريع تقنية مفتوحة المصدر تهدف لسد الثغرات في المحتوى التقني القرآني، متاحة
            للجميع للمساهمة والاستخدام مباشرة
          </p>
        </Reveal>

        <div className="flex flex-col gap-[16px]">
          {projects.map((project, i) => (
            <Reveal
              key={project.title}
              delay={i * 70}
              className="card flex flex-col gap-[16px] p-[20px]"
            >
              <div className="flex size-[52px] items-center justify-center rounded-[14px] bg-[var(--brand-a06)]">
                <Image
                  src={project.logo}
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
