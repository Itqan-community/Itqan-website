import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/PageHeader";
import ProjectsExplorer from "@/components/projects/ProjectsExplorer";

/**
 * all-projects-page — Figma 205:207, 1440×3200.
 * Page Header → Stats Bar → Category Filter → Projects Grid → Pagination → footer.
 */

export const metadata: Metadata = {
  title: "مشاريع مجتمع إتقان — إتقان",
  description:
    "استكشف المشاريع التقنية المفتوحة المصدر التي تخدم القرآن الكريم وتسعى لتوفير حلول مهيئة للاستخدام المباشر.",
};

const stats = [
  { label: "تصنيفات", value: "12 تصنيف" },
  { label: "مساهمون", value: "180+ مساهم" },
  { label: "مشاريع نشطة", value: "42 مشروع" },
];

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHeader
          badge="مشاريع المجتمع"
          title="مشاريع مجتمع إتقان"
          subtitle="استكشف المشاريع التقنية المفتوحة المصدر التي تخدم القرآن الكريم وتسعى لتوفير حلول مهيئة للاستخدام المباشر."
          minHeight={320}
          patternOpacity={0.05}
          softLayers={false}
        />

        {/* Stats Bar — 205:483 */}
        <section className="w-full border-b border-[var(--brand-a10)] bg-[var(--color-bg)] py-[24px]">
          <div className="shell flex flex-col gap-[24px] sm:flex-row sm:items-center">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-1 flex-col items-start gap-[4px]">
                <p className="text-[13px] font-medium text-[var(--color-txt-dim)]">
                  {stat.label}
                </p>
                <p className="text-[22px] font-bold text-[var(--color-topic-title)] lg:text-[28px]">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <ProjectsExplorer />
      </main>
      <Footer />
    </>
  );
}
