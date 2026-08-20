"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import Reveal from "@/components/ui/Reveal";

/**
 * Category Filter Section (205:249) + Projects Grid Section (205:263) +
 * Pagination Section (205:379) from the all-projects page.
 *
 * Grid: 3 rows × 3 cards, 397×209 each, 24px gutter, 64px block padding.
 * The Figma frame shows page 1 of 3 with the "الكل" filter active; search and
 * filtering are wired up here so the page actually works.
 */

type Project = {
  title: string;
  body: string;
  tags: string[];
  icon: string;
  contributors: string;
  category: string;
};

const filters = ["الكل", "واجهات برمجية", "تطبيقات", "أدوات", "بيانات", "بحث علمي"];

const projects: Project[] = [
  {
    title: "فنار",
    body: "منصة بحث دلالي في القرآن الكريم باستخدام الذكاء الاصطناعي لتسهيل الوصول إلى الآيات والمفاهيم.",
    tags: ["API", "بحث"],
    icon: "/figma/proj-icon-search.svg",
    contributors: "3 مساهمين",
    category: "واجهات برمجية",
  },
  {
    title: "رتق",
    body: "أداة مفتوحة المصدر لتصحيح النصوص القرآنية تلقائيًا وتحقق سلامتها قبل نشرها.",
    tags: ["أدوات", "NLP"],
    icon: "/figma/proj-icon-shield-check.svg",
    contributors: "7 مساهمين",
    category: "أدوات",
  },
  {
    title: "مصحف API",
    body: "واجهة برمجية موحدة للوصول إلى بيانات المصحف الشريف والتفاسير والترجمات بسهولة.",
    tags: ["API", "بيانات"],
    icon: "/figma/proj-icon-cpu.svg",
    contributors: "12 مساهم",
    category: "واجهات برمجية",
  },
  {
    title: "الباحث الذكي",
    body: "محرك بحث متقدم في التفاسير والمراجع القرآنية يعتمد على معالجة اللغة الطبيعية.",
    tags: ["بحث علمي"],
    icon: "/figma/proj-icon-search.svg",
    contributors: "5 مساهمين",
    category: "بحث علمي",
  },
  {
    title: "قاعدة البيانات القرآنية",
    body: "أكبر قاعدة بيانات مفتوحة للمحتوى القرآني المهيكل لتسهيل التطوير والبحث.",
    tags: ["بيانات"],
    icon: "/figma/proj-icon-database.svg",
    contributors: "9 مساهمين",
    category: "بيانات",
  },
  {
    title: "محرك البحث الدلالي",
    body: "بحث دلالي متقدم يربط بين الآيات والمواضيع والبحوث الفقهية المعاصرة.",
    tags: ["AI"],
    icon: "/figma/proj-icon-search.svg",
    contributors: "4 مساهمين",
    category: "بحث علمي",
  },
  {
    title: "تطبيق الكتاب",
    body: "تطبيق قراءة المصحف بتجربة مستخدم عصرية ومتقنة ومصممة للاستخدام اليومي.",
    tags: ["تطبيقات"],
    icon: "/figma/proj-icon-book-open.svg",
    contributors: "6 مساهمين",
    category: "تطبيقات",
  },
  {
    title: "أوبن ترتيل",
    body: "نموذج ذكاء اصطناعي للتعرف على التلاوة القرآنية وتحليل جودة الصوت.",
    tags: ["AI", "صوت"],
    icon: "/figma/proj-icon-mic.svg",
    contributors: "15 مساهم",
    category: "أدوات",
  },
  {
    title: "Quranlingo",
    body: "منصة تعلم حفظ القرآن بأسلوب تفاعلي ومحفز لجميع الأعمار.",
    tags: ["تطبيقات", "تعليم"],
    icon: "/figma/proj-icon-graduation-cap.svg",
    contributors: "8 مساهمين",
    category: "تطبيقات",
  },
];

/** The Figma frame paginates 1 / 2 / 3 over a 9-card page. */
const TOTAL_PAGES = 3;

export default function ProjectsExplorer() {
  const [active, setActive] = useState("الكل");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const visible = useMemo(() => {
    const q = query.trim();
    return projects.filter((p) => {
      const matchesFilter = active === "الكل" || p.category === active;
      const matchesQuery =
        q === "" || p.title.includes(q) || p.body.includes(q) || p.tags.some((t) => t.includes(q));
      return matchesFilter && matchesQuery;
    });
  }, [active, query]);

  return (
    <>
      {/* Category Filter Section — 205:249 */}
      <section className="w-full py-[24px]">
        <div className="shell flex flex-wrap items-center gap-[12px]">
          <div className="flex h-[44px] w-full items-center gap-[10px] rounded-[100px] border border-[var(--brand-a10)] bg-white px-[16px] sm:w-[320px]">
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              type="search"
              placeholder="ابحث عن مشروع..."
              aria-label="ابحث عن مشروع"
              className="min-w-0 flex-1 bg-transparent text-[14px] text-[var(--color-txt)] outline-none placeholder:text-[var(--color-txt-dim)]"
            />
            <Image
              src="/figma/icon-search-input.svg"
              alt=""
              width={18}
              height={18}
              className="size-[18px] shrink-0"
            />
          </div>

          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => {
                setActive(filter);
                setPage(1);
              }}
              aria-pressed={active === filter}
              className={`rounded-[100px] border px-[20px] py-[10px] text-[14px] font-medium transition-colors duration-200 ${
                active === filter
                  ? "border-transparent bg-[var(--color-brand)] text-white"
                  : "border-[var(--brand-a10)] text-[var(--color-txt-dim)] hover:bg-[var(--brand-a04)]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid Section — 205:263 */}
      <section className="w-full py-[64px]">
        <div className="shell">
          {visible.length === 0 ? (
            <p className="py-[48px] text-center text-[16px] text-[var(--color-txt-dim)]">
              لا توجد مشاريع مطابقة لبحثك.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-[24px] md:grid-cols-2 lg:grid-cols-3">
              {visible.map((project, i) => (
                <Reveal
                  key={project.title}
                  delay={(i % 3) * 70}
                  className="flex min-h-[209px] flex-col gap-[16px] overflow-hidden rounded-[var(--radius-topic)] border border-[var(--brand-a10)] bg-white p-[24px] shadow-[0_12px_32px_-8px_rgba(16,54,45,0.08)]"
                >
                  {/* Under RTL the tags land right and the icon tile left. */}
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-start gap-[6px]">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-[6px] bg-[#f5fbfa] px-[10px] py-[4px] text-[11px] font-medium text-[var(--color-grad-end)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex size-[44px] shrink-0 items-center justify-center rounded-[12px] bg-[var(--color-grad-start)]">
                      <Image
                        src={project.icon}
                        alt=""
                        width={20}
                        height={20}
                        className="size-[20px]"
                      />
                    </div>
                  </div>

                  <div className="flex w-full flex-1 flex-col gap-[8px] text-start">
                    <h2 className="text-[18px] font-semibold text-[var(--color-topic-title)]">
                      {project.title}
                    </h2>
                    <p className="text-[14px] text-[var(--color-txt-dim)]">{project.body}</p>
                  </div>

                  <div className="flex w-full items-center justify-between">
                    <Link
                      href="/projects"
                      className="flex items-center gap-[6px] text-[14px] font-medium text-[var(--color-grad-start)]"
                    >
                      <span>عرض المشروع ←</span>
                      <span className="flex size-[16px] items-center justify-center">
                        <Image
                          src="/figma/icon-arrow-link.svg"
                          alt=""
                          width={8}
                          height={8}
                          className="size-[8px]"
                        />
                      </span>
                    </Link>
                    <p className="text-[13px] font-medium text-[var(--color-txt-dim)]">
                      {project.contributors}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Pagination Section — 205:379 */}
      <section className="w-full px-[16px] pt-[48px] pb-[80px] lg:px-[100px]">
        <div className="flex items-center justify-center gap-[12px]">
          {/* First in the DOM sits right: the "previous page" affordance. */}
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="الصفحة السابقة"
            className="rounded-[100px] border border-[var(--brand-a10)] bg-[#f5fbfa] p-[10px] disabled:opacity-40"
          >
            <span className="flex size-[16px] items-center justify-center">
              <Image
                src="/figma/icon-page-next.svg"
                alt=""
                width={8}
                height={8}
                className="size-[8px]"
              />
            </span>
          </button>

          {Array.from({ length: TOTAL_PAGES }, (_, i) => TOTAL_PAGES - i).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              aria-current={page === n ? "page" : undefined}
              className={`rounded-[100px] px-[16px] py-[10px] text-[14px] font-medium transition-colors duration-200 ${
                page === n
                  ? "bg-[var(--color-brand)] text-white"
                  : "border border-[var(--brand-a10)] bg-[#f5fbfa] text-[var(--color-txt-dim)]"
              }`}
            >
              {n}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
            disabled={page === TOTAL_PAGES}
            aria-label="الصفحة التالية"
            className="rounded-[100px] border border-[var(--brand-a10)] bg-[#f5fbfa] p-[10px] disabled:opacity-40"
          >
            <span className="flex size-[16px] items-center justify-center">
              <Image
                src="/figma/icon-page-prev.svg"
                alt=""
                width={8}
                height={8}
                className="size-[8px]"
              />
            </span>
          </button>
        </div>
      </section>
    </>
  );
}
