import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

/**
 * Articles Section Mobile — Figma-inspired design.
 * White ground, 48px block padding, 32px gap.
 * Stacked article cards with image, title, and description.
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

export default function ArticlesSectionMobile() {
  return (
    <section className="w-full bg-white px-[16px] py-[48px] lg:hidden">
      <div className="flex flex-col gap-[32px]">
        <Reveal className="flex flex-col items-start gap-[12px]">
          <span className="badge">مقالات مختارة</span>
          <h2 className="text-[26px] font-bold text-[var(--color-txt)]">المقالات</h2>
          <p className="text-[14px] text-[var(--color-txt-dim)]">
            مقالات تقنية وعلمية حول تطوير البرمجيات القرآنية والمحتوى الرقمي الإسلامي
          </p>
        </Reveal>

        <div className="flex flex-col gap-[16px]">
          {articles.map((article, i) => (
            <Reveal key={article.title} delay={i * 70}>
              <Link
                href={article.href}
                className="card group flex flex-col gap-[12px] p-[20px]"
              >
                <div className="flex flex-1 flex-col gap-[8px]">
                  <h3 className="text-[17px] font-semibold text-[var(--color-topic-title)] group-hover:text-[var(--color-brand)]">
                    {article.title}
                  </h3>
                  <p className="text-[14px] text-[var(--color-txt-dim)]">
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
