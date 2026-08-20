"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "@/components/ui/Reveal";

/**
 * Projects Section — Figma 20:1146, 1440×948.
 * White ground, 56px block padding, 40px gap; slider is 232:204.
 *
 * Figma composes one slide (فنار) and three dots. The two remaining slides use
 * the same template with the project names carried over from the footer nav —
 * their copy is not specified in the design file.
 */

type Project = {
  name: string;
  logo: string;
  media: string;
  body: string;
  site: string;
  repo: string;
};

const projects: Project[] = [
  {
    name: "فنار",
    logo: "/figma/project-fanar-logo.png",
    media: "/figma/project-fanar-media.png",
    body: "نظام لنشر وإدارة المحتوى القرآني، يمنح الجهات الناشرة مساحة رقمية مستقلة بهويتها الخاصة، تُمكّنها من نشر تلاواتها وأصولها القرآنية بمعايير احترافية وتراخيص محددة تحفظ حقوقها وتُنظم الاستخدام",
    site: "https://fanar.itqan.dev",
    repo: "https://github.com/itqan-community",
  },
  {
    name: "رتق",
    logo: "/figma/project-fanar-logo.png",
    media: "/figma/project-fanar-media.png",
    body: "مشروع مفتوح المصدر لسد الثغرات في المحتوى التقني القرآني، ومتاح للجميع للمساهمة والاستخدام.",
    site: "https://ratq.itqan.dev",
    repo: "https://github.com/itqan-community",
  },
  {
    name: "دليل التطبيقات القرآنية",
    logo: "/figma/project-fanar-logo.png",
    media: "/figma/project-fanar-media.png",
    body: "دليل مُجمّع للتطبيقات القرآنية البارزة، يعرّف بها ويربط المطورين بمصادرها ومكتباتها المفتوحة.",
    site: "https://apps.itqan.dev",
    repo: "https://github.com/itqan-community",
  },
];

export default function ProjectsSection() {
  const [index, setIndex] = useState(0);
  const project = projects[index];
  const go = (delta: number) =>
    setIndex((i) => (i + delta + projects.length) % projects.length);

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

        <Reveal className="flex w-full flex-col items-center gap-[24px]">
          {/* Slide — media leads in the DOM so it lands on the right under RTL. */}
          <article className="flex w-full flex-col items-center gap-[48px] rounded-[32px] border border-[var(--brand-a10)] bg-white p-[20px] drop-shadow-[0_12px_20px_rgba(0,0,0,0.05)] lg:flex-row lg:p-[40px]">
            <div className="relative h-[360px] w-full shrink-0 overflow-hidden rounded-[24px] bg-[#0b2a24] lg:h-[520px] lg:w-[480px]">
              <Image
                key={project.media}
                src={project.media}
                alt={project.name}
                fill
                sizes="(max-width: 1023px) 100vw, 480px"
                className="object-cover"
              />
              <button
                type="button"
                aria-label={`تشغيل الفيديو التعريفي لـ${project.name}`}
                className="absolute left-1/2 top-1/2 flex size-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[36px] border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.15)] backdrop-blur-[6px] transition-transform duration-200 hover:scale-105"
              >
                <Image
                  src="/figma/icon-play.svg"
                  alt=""
                  width={28}
                  height={28}
                  className="size-[28px]"
                />
              </button>
            </div>

            <div className="flex min-w-0 flex-1 flex-col items-start gap-[24px]">
              <div className="flex size-[80px] items-center justify-center rounded-[20px] bg-[var(--brand-a06)]">
                <Image
                  key={project.logo}
                  src={project.logo}
                  alt=""
                  width={48}
                  height={48}
                  className="size-[48px] object-contain"
                />
              </div>

              <div className="flex w-full flex-col gap-[12px] text-start">
                <h3 className="text-[20px] font-semibold text-[var(--color-topic-title)]">
                  {project.name}
                </h3>
                <p className="text-[14px] leading-[normal] text-[var(--color-txt-dim)]">
                  {project.body}
                </p>
              </div>

              <div className="flex w-full flex-wrap items-center justify-start gap-[12px]">
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-[10px] rounded-[12px] border border-[rgba(35,110,91,0.26)] bg-white px-[16px] py-[12px] text-[14px] font-medium text-[var(--color-grad-end)] transition-colors duration-200 hover:bg-[var(--brand-a06)]"
                >
                  <span>ساهم في {project.name}</span>
                  <Image
                    src="/figma/icon-github.svg"
                    alt=""
                    width={18}
                    height={18}
                    className="size-[18px]"
                  />
                </a>
                <a
                  href={project.site}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-[10px] rounded-[12px] bg-[var(--color-brand)] px-[16px] py-[12px] text-[14px] font-medium text-white transition-colors duration-200 hover:bg-[var(--color-grad-start)]"
                >
                  <span>تصفح المشروع</span>
                  <Image
                    src="/figma/icon-external-link.svg"
                    alt=""
                    width={18}
                    height={18}
                    className="size-[18px]"
                  />
                </a>
              </div>
            </div>
          </article>

          {/* Controls — under RTL the back affordance (›) sits right, next (‹) left. */}
          <div className="flex w-full items-center justify-between">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="المشروع السابق"
              className="flex size-[44px] items-center justify-center rounded-[22px] border border-[var(--brand-a10)] bg-white transition-colors duration-200 hover:bg-[var(--brand-a06)]"
            >
              <Image
                src="/figma/icon-chevron-right.svg"
                alt=""
                width={20}
                height={20}
                className="size-[20px]"
              />
            </button>

            <div className="flex items-center gap-[10px]">
              {projects.map((p, i) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`الانتقال إلى ${p.name}`}
                  aria-current={i === index}
                  className={`size-[10px] rounded-[5px] transition-colors duration-200 ${
                    i === index ? "bg-[var(--color-brand)]" : "bg-[rgba(18,70,58,0.08)]"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="المشروع التالي"
              className="flex size-[44px] items-center justify-center rounded-[22px] border border-[var(--brand-a10)] bg-white transition-colors duration-200 hover:bg-[var(--brand-a06)]"
            >
              <Image
                src="/figma/icon-chevron-left.svg"
                alt=""
                width={20}
                height={20}
                className="size-[20px]"
              />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
