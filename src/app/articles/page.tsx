import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "تقارير قرآنية — إتقان",
  description:
    "مجموعة من المقالات والتقارير المتخصصة في تقنيات القرآن الكريم لمساعدتك في تطوير تطبيقات قرآنية متميزة ومستدامة.",
};

type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  image: string;
  readMoreLabel: string;
  featured?: boolean;
};

const articles: Article[] = [
  {
    slug: "quranic-apps-guide",
    title: "دليلك لتأسيس التطبيقات القرآنية",
    description:
      "يعد تطوير التطبيقات القرآنية تحدياً فريداً حيث تلتقي فيه عدة مجالات، وقد تم إعداد هذا الدليل ليكون مرشدًا ومعينًا للمهتمين بتأسيس تطبيقات قرآنية متميزة، من خلال إرشادات عملية تهم وتساعد المطورين والمؤسسين لبناء تطبيقات قرآنية نوعية ومستدامة الأثر.",
    category: "مقال تقني",
    image: "/figma/article-quranic-apps.png",
    readMoreLabel: "قراءة المقال",
  },
  {
    slug: "publishing-licenses",
    title: "رخص النشر",
    description:
      "دليل شامل لرخص النشر ودورها الحاسم في تطوير التقنيات القرآنية، بما في ذلك تحليل مفصل لأنواع الرخص المختلفة وتأثيراتها على المجتمع.",
    category: "مقال تقني",
    image: "/figma/article-licenses.png",
    readMoreLabel: "قراءة المقال",
  },
  {
    slug: "evaluation-guide",
    title: "الدليل الإرشادي لتقييم المشاريع القرآنية التقنية الناشئة",
    description:
      "في عصر الابتكار التقني، يمثل هذا الدليل أداةً فريدة لكل ساعٍ إلى تقييم مشاريع قرآنية تقنية ناشئة، أو تقييم مشروعه الخاص، فهو يقدم منهجية تقييمية واضحةً ورصينة، تُعين المحكّمين وأصحاب المشاريع على حدٍ سواء، على تقييم دقيق لجودة تلك المشاريع وضمان استدامة أثرها.",
    category: "أدلة إرشادية",
    image: "/figma/article-evaluation.png",
    readMoreLabel: "اقرأ المقال كاملاً",
    featured: true,
  },
];

export default function ArticlesPage() {
  const halfWidth = articles.filter((a) => !a.featured);
  const fullWidth = articles.find((a) => a.featured);

  return (
    <>
      <Navbar />
      <main className="flex-1" dir="rtl">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[#f4faf7] px-[16px] py-[48px] sm:px-[24px] lg:px-[100px] lg:py-[80px]">
          <div className="absolute left-[-240px] top-[-430px] size-[1100px]">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(35,110,91,0.06)] to-transparent rounded-full blur-3xl" />
          </div>
          <p className="absolute left-[120px] top-[40px] hidden whitespace-nowrap font-['JetBrains_Mono'] text-[92px] text-[rgba(35,110,91,0.09)] lg:block">
            {`{ }`}
          </p>
          <p className="absolute left-[340px] top-[180px] hidden whitespace-nowrap font-['JetBrains_Mono'] text-[64px] text-[rgba(35,110,91,0.09)] lg:block">
            {`</>`}
          </p>

          <div className="relative mx-auto flex w-full max-w-[800px] flex-col items-center gap-[16px]">
            <Reveal>
              <span className="badge">الموارد المعرفية</span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="text-center text-[32px] font-bold leading-[1.35] text-[var(--color-txt)] sm:text-[40px] lg:text-[46px]">
                تقارير قرآنية
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="w-full max-w-[640px] text-center text-[15px] leading-[1.8] text-[var(--color-txt-dim)] sm:text-[16px]">
                نقدم لك مجموعة من المقالات والتقارير المتخصصة في تقنيات القرآن الكريم لمساعدتك
                في تطوير تطبيقات قرآنية متميزة ومستدامة
              </p>
            </Reveal>
          </div>
        </section>

        {/* Articles Grid Section */}
        <section className="bg-white px-[16px] py-[48px] sm:px-[24px] lg:px-[100px] lg:py-[80px]">
          <div className="flex flex-col gap-[32px] lg:gap-[40px]">
            {/* Top Row - Half Width Cards */}
            <div className="flex flex-col gap-[24px] md:flex-row md:gap-[40px]">
              {halfWidth.map((article, i) => (
                <Reveal key={article.slug} delay={i * 80} className="flex-1">
                  <Link
                    href={`/articles/${article.slug}`}
                    className="group flex flex-col gap-[20px] rounded-[14px] border-[1.5px] border-[rgba(35,110,91,0.1)] bg-white p-[24px] shadow-[0_12px_16px_rgba(16,54,45,0.08)] transition-shadow duration-200 hover:shadow-[0_16px_24px_rgba(16,54,45,0.12)]"
                  >
                    <div className="relative h-[200px] w-full overflow-hidden rounded-[14px] border border-[rgba(35,110,91,0.1)] sm:h-[240px]">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex items-start">
                      <span className="rounded-[6px] bg-[rgba(35,110,91,0.08)] px-[10px] py-[4px] text-[11px] text-[var(--color-grad-end)]">
                        {article.category}
                      </span>
                    </div>
                    <h2 className="text-[18px] font-semibold text-[var(--color-txt)] text-right">
                      {article.title}
                    </h2>
                    <p className="min-h-[72px] overflow-hidden text-right text-[14px] text-[var(--color-txt-dim)] sm:min-h-[96px]">
                      {article.description}
                    </p>
                    <div className="flex items-center gap-[6px] text-[14px] font-medium text-[var(--color-grad-end)]">
                      <span>{article.readMoreLabel}</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="transition-transform duration-200 group-hover:-translate-x-1"
                      >
                        <path
                          d="M8.75 3.5L5.25 7L8.75 10.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>

            {/* Full Width Card */}
            {fullWidth && (
              <Reveal delay={160}>
                <Link
                  href={`/articles/${fullWidth.slug}`}
                  className="group flex flex-col items-stretch gap-[24px] rounded-[14px] border-[1.5px] border-[rgba(35,110,91,0.1)] bg-white p-[20px] shadow-[0_12px_16px_rgba(16,54,45,0.08)] transition-shadow duration-200 hover:shadow-[0_16px_24px_rgba(16,54,45,0.12)] sm:p-[32px] lg:flex-row lg:items-center lg:gap-[32px]"
                >
                  <div className="flex w-full flex-1 flex-col items-start gap-[16px]">
                    <div className="flex items-start">
                      <span className="rounded-[6px] bg-[rgba(35,110,91,0.08)] px-[12px] py-[4px] text-[11px] text-[var(--color-grad-end)]">
                        {fullWidth.category}
                      </span>
                    </div>
                    <h2 className="text-[20px] font-semibold text-[var(--color-txt)] text-right">
                      {fullWidth.title}
                    </h2>
                    <p className="text-[16px] text-[var(--color-txt-dim)] text-right">
                      {fullWidth.description}
                    </p>
                    <div className="flex items-center gap-[6px] text-[14px] font-medium text-[var(--color-grad-end)]">
                      <span>{fullWidth.readMoreLabel}</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="transition-transform duration-200 group-hover:-translate-x-1"
                      >
                        <path
                          d="M8.75 3.5L5.25 7L8.75 10.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="relative h-[220px] w-full shrink-0 overflow-hidden rounded-[14px] border border-[rgba(35,110,91,0.1)] lg:h-[300px] lg:w-[500px]">
                    <Image
                      src={fullWidth.image}
                      alt={fullWidth.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
              </Reveal>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
