import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

/**
 * Articles Section — Figma-inspired design.
 * White ground, 56px block padding, 40px gap.
 * Featured article (large) + 2 regular articles in a grid.
 */

type Article = {
  title: string;
  description: string;
  href: string;
  image?: string;
};

const articles: Article[] = [
  {
    title: "عندما تتقاطع التقنية مع أعظم غاية.. ملامح مستقبل التقنيات القرآنية من القاهرة",
    description:
      "نظرة على أحدث التطورات في مجال التقنيات القرآنية وكيف تسهم في خدمة كتاب الله ونشره بطريقة مبتكرة",
    href: "/resources/articles",
  },
  {
    title: "منصة قاف | حين تحوّلت مشكلة مدير مدرسة لابتكار تخدم المراكز الإسلامية",
    description:
      "قصة نجاح منصة قاف التي بدأت بحل مشكلة بسيطة وتطورت لتصبح أداة شاملة للمراكز الإسلامية",
    href: "/resources/articles",
  },
  {
    title: "الموسوعة القرآنية تُطلق إصدارًا رقميًا مفتوحًا لمصحف الأوقاف الليبية برواية قالون",
    description:
      "إطلاق جديد للموسوعة القرآنية يوفر مصحفًا رقميًا مفتوح المصدر برواية قالون عن نافع",
    href: "/resources/articles",
  },
];

export default function ArticlesSection() {
  const featured = articles[0];
  const regular = articles.slice(1);

  return (
    <section className="hidden w-full bg-white py-[56px] lg:block">
      <div className="shell flex flex-col items-center gap-[40px]">
        <Reveal className="flex w-full flex-col items-start gap-[8px]">
          <span className="badge">مقالات مختارة</span>
          <h2 className="text-start text-[28px] font-bold text-[var(--color-txt)] lg:text-[36px]">
            المقالات
          </h2>
          <p className="w-full max-w-[640px] text-start text-[16px] leading-[normal] text-[var(--color-txt-dim)]">
            مقالات تقنية وعلمية حول تطوير البرمجيات القرآنية والمحتوى الرقمي الإسلامي
          </p>
        </Reveal>

        <div className="grid w-full grid-cols-1 gap-[24px] lg:grid-cols-3">
          {/* Featured Article - spans 2 columns */}
          <Reveal className="lg:col-span-2">
            <Link
              href={featured.href}
              className="group flex h-full flex-col gap-[16px] rounded-[12px] border border-[rgba(35,110,91,0.1)] bg-white p-[24px] shadow-[0_12px_32px_-8px_rgba(16,54,45,0.14)] transition-shadow duration-200 hover:shadow-[0_16px_40px_-8px_rgba(16,54,45,0.18)]"
            >
              <div className="flex flex-1 flex-col gap-[12px]">
                <h3 className="text-[20px] font-semibold leading-[normal] text-[var(--color-topic-title)] group-hover:text-[var(--color-brand)]">
                  {featured.title}
                </h3>
                <p className="text-[14px] leading-[normal] text-[var(--color-txt-dim)]">
                  {featured.description}
                </p>
              </div>
              <div className="flex items-center gap-[6px] text-[14px] font-medium text-[var(--color-grad-end)]">
                <span>قراءة المقال</span>
                <Image
                  src="/figma/icon-arrow-read.svg"
                  alt=""
                  width={14}
                  height={14}
                  className="size-[14px] transition-transform duration-200 group-hover:-translate-x-1"
                />
              </div>
            </Link>
          </Reveal>

          {/* Regular Articles - 2 cards in 1 column */}
          <div className="flex flex-col gap-[24px]">
            {regular.map((article, i) => (
              <Reveal key={article.title} delay={i * 80}>
                <Link
                  href={article.href}
                  className="group flex h-full flex-col gap-[12px] rounded-[12px] border border-[rgba(35,110,91,0.1)] bg-white p-[20px] shadow-[0_10px_28px_-8px_rgba(16,54,45,0.12)] transition-shadow duration-200 hover:shadow-[0_14px_32px_-8px_rgba(16,54,45,0.16)]"
                >
                  <div className="flex flex-1 flex-col gap-[8px]">
                    <h3 className="text-[17px] font-semibold leading-[normal] text-[var(--color-topic-title)] group-hover:text-[var(--color-brand)]">
                      {article.title}
                    </h3>
                    <p className="text-[14px] leading-[normal] text-[var(--color-txt-dim)]">
                      {article.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-[6px] text-[14px] font-medium text-[var(--color-grad-end)]">
                    <span>قراءة المقال</span>
                    <Image
                      src="/figma/icon-arrow-read.svg"
                      alt=""
                      width={14}
                      height={14}
                      className="size-[14px] transition-transform duration-200 group-hover:-translate-x-1"
                    />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <Link
            href="/resources/articles"
            className="flex items-center gap-[6px] text-[15px] font-medium text-[var(--color-grad-end)] transition-colors duration-200 hover:text-[var(--color-brand)]"
          >
            <span>عرض جميع المقالات</span>
            <Image
              src="/figma/icon-arrow-read.svg"
              alt=""
              width={14}
              height={14}
              className="size-[14px]"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
