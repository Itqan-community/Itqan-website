import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

/**
 * Publisher Section — Figma 151:151, 1440×635.
 * linear-gradient(#f5fbfa → #e8eeeb), 48px block padding.
 * Content Column (194:201): header, two publisher cards, dashed CTA card.
 */
export default function PublisherSection() {
  return (
    <section className="w-full bg-gradient-to-b from-[#f5fbfa] to-[var(--color-bg-2)] py-[48px]">
      <div className="shell flex flex-col items-start gap-[24px]">
        <Reveal className="flex w-full flex-col items-start gap-[16px]">
          <div className="flex items-center gap-[12px]">
            <span className="badge">للناشرين</span>
            <Image
              src="/figma/logo-itqan-small.png"
              alt="إتقان"
              width={53}
              height={28}
              className="h-[28px] w-[53px] object-contain"
            />
          </div>
          <h2 className="w-full text-start text-[30px] font-bold leading-[1.1] text-[var(--color-txt)] lg:text-[42px]">
            انشر محتواك القرآني وأتحه للمطورين
          </h2>
          <p className="w-full max-w-[560px] text-start text-[16px] leading-[normal] text-[var(--color-txt-dim)]">
            انشر محتواك القرآني (تلاوات، تفاسير، ترجمات) على منصة إتقان، ووفّر واجهة
            برمجية (API) موثوقة تتيح للمطورين والباحثين الوصول إليه بكل يسر.
          </p>
        </Reveal>

        <div className="grid w-full grid-cols-1 gap-[24px] lg:grid-cols-2">
          <Reveal className="flex items-center gap-[16px] self-stretch overflow-hidden rounded-[16px] border border-[rgba(35,110,91,0.13)] bg-white p-[24px] shadow-[0_2px_10px_-2px_rgba(16,54,45,0.07),0_12px_32px_-8px_rgba(16,54,45,0.14)]">
            <div className="flex size-[56px] shrink-0 items-center justify-center rounded-[28px] border border-[var(--brand-a10)] bg-[#f5fbfa]">
              <Image
                src="/figma/publisher-tahbeer.png"
                alt=""
                width={44}
                height={44}
                className="size-[44px] rounded-[12px] object-cover"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col items-start gap-[8px] text-start">
              <h3 className="text-[18px] font-bold leading-[1.2] text-[var(--color-topic-title)]">
                تحبير القراءات العشر
              </h3>
              <p className="text-[13px] leading-[1.5] text-[var(--color-txt-dim)] opacity-85">
                الذكر الحكيم بأعذب الأصوات وأجمل الأداءات مع نخبة من أفضل القراء في
                المملكة العربية السعودية والعالم العربي والإسلامي
              </p>
            </div>
          </Reveal>

          <Reveal
            delay={90}
            className="flex items-center gap-[16px] self-stretch overflow-hidden rounded-[16px] border border-[rgba(35,110,91,0.13)] bg-white p-[24px] shadow-[0_12px_32px_-8px_rgba(16,54,45,0.14)]"
          >
            <div className="relative h-[41px] w-[104px] shrink-0 overflow-hidden rounded-[12px]">
              <Image
                src="/figma/publisher-saudi-center.png"
                alt=""
                fill
                sizes="104px"
                className="object-contain"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col items-start gap-[4px] text-start">
              <h3 className="w-full text-[17px] font-semibold text-[var(--color-topic-title)]">
                المركز السعودي للتلاوات القرآنية والأحاديث النبوية
              </h3>
              <p className="w-full text-[13px] leading-[normal] text-[var(--color-txt-dim)]">
                الذكر الحكيم بأعذب الأصوات وأجمل الأداءات مع نخبة من أفضل القراء في
                المملكة العربية السعودية والعالم العربي والإسلامي
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal className="flex w-full flex-col items-center">
          <div className="flex w-full flex-col items-center gap-[8px] rounded-[16px] border-2 border-dashed border-[rgba(35,110,91,0.13)] bg-[#f5fbfa] px-[24px] py-[16px]">
            <div className="flex size-[64px] items-center justify-center rounded-[32px] border border-[rgba(35,110,91,0.13)] bg-white">
              <Image
                src="/figma/icon-plus.svg"
                alt=""
                width={32}
                height={32}
                className="size-[32px]"
              />
            </div>
            <div className="flex w-full flex-col items-center gap-[4px] text-center">
              <h3 className="text-[17px] font-semibold text-[var(--color-txt)]">
                كن الناشر التالي
              </h3>
              <p className="text-[13px] text-[var(--color-txt-dim)]">
                انضم إلينا اليوم وساهم في نشر المعرفة القرآنية حول العالم.
              </p>
            </div>
            <a href="https://join.itqan.dev" target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-[2px]">
              سجل كناشر الآن
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
