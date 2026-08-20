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
    body: "منصة شاملة تجمع تطبيقات القرآن الكريم الرقمية وتُصنّفها وتُوثّقها لتبسيط وصول المسلمين لاحتياجاتهم وتوجيه جهود المطورين.",
    primary: { label: "تصفح المشروع", href: "/projects/apps" },
    secondary: { label: "ساهم معنا", href: "https://github.com/itqan-community" },
  },
  {
    title: "رتـــــق",
    body: "خارطة طريق تقنية تجمع وتنسق الأدوات ومحركات البحث وقواعد البيانات لتبسيط بناء التطبيقات القرآنية.",
    primary: { label: "تصفح رتق", href: "/projects/ratq" },
    secondary: { label: "ساهم الآن", href: "https://github.com/itqan-community" },
  },
  {
    title: "فنـــــار",
    body: "نظام إدارة محتوى ونشر مستقل للجهات القرآنية، مع حماية احترافية للحقوق الفكرية والتراخيص الرقمية.",
    primary: { label: "تصفح فنار", href: "/projects/fanar" },
    secondary: { label: "تطوع بالترميز", href: "https://github.com/itqan-community" },
  },
];

export default function ProjectsSectionMobile() {
  return (
    <section className="w-full bg-white px-[16px] pt-[48px] pb-[48px] lg:hidden">
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
                <span className="size-[28px] rounded-[8px] bg-gradient-to-b from-[#2e8069] to-[var(--color-grad-end)]" />
              </div>
              <h3 className="text-[18px] font-semibold text-[var(--color-topic-title)]">
                {project.title}
              </h3>
              <p className="text-[14px] text-[var(--color-txt-dim)]">{project.body}</p>

              <div className="h-px w-full bg-[var(--brand-a10)]" />

              <div className="flex items-center gap-[8px]">
                <Link
                  href={project.primary.href}
                  className="flex h-[31px] flex-1 items-center justify-center rounded-[8px] bg-[var(--color-brand)] text-[13px] font-medium text-white"
                >
                  {project.primary.label}
                </Link>
                <a
                  href={project.secondary.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-[31px] flex-1 items-center justify-center rounded-[8px] border border-[rgba(35,110,91,0.26)] text-[13px] font-medium text-[var(--color-grad-end)]"
                >
                  {project.secondary.label}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
