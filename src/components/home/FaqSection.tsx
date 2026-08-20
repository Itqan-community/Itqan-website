"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";

/**
 * FAQ Section — Figma 153:155, 1440×1481.
 * White ground, 96px top / 110px bottom padding, 44px gap.
 * 1020px list, 14px gap; cards are 26px/24px padded with a 12px radius.
 *
 * Every item is drawn expanded in Figma (chevron-up on each card), so the
 * accordion starts fully open and the chevron rotates on toggle.
 */

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "هل مجتمع إتقان يناسبني؟",
    a: "سواءً كنت مطورًا، باحثًا، صاحب مشروع قرآني، جهة داعمة، أو شغوف بالتقنيات القرآنية؛ فمجتمع إتقان هو مساحتك التي تجد فيها نفسك. مكان يجمع أفكارك، ويحتضن نقاشاتك، ويتكاتف معك لتجاوز تحدياتك، لتشارك في صناعة ما تأمل رؤيته في مستقبل التقنيات القرآنية",
  },
  {
    q: "لماذا قد أرغب بالانضمام لمجتمع إتقان؟",
    a: "يمنحك كل ما تحتاجه لبناء وتطوير كودك البرمجي في خدمة القرآن الكريم؛ أدوات وبنية جاهزة، بيانات ومكتبات قرآنية موثوقة، ومشاريع مفتوحة المصدر (مثل فنار ورتق) تختصر عليك شهورًا من العمل. بالإضافة إلى دعم وتسويق لمشروعك؛ إذ نساعدك في تجاوز العقبات التقنية، ونُبرز تطبيقك ونسوّق له عبر قنواتنا ونُدرجه في دليل التطبيقات القرآنية. بجانب إمكانية تطوير مهاراتك وشبكة علاقاتك؛ حيث تنضم لأكثر من 1,500 مطور وباحث، وتشارك في ورش عمل وملتقيات، وتكتسب خبرة عملية مباشرة. وستحقق أثر مستدام من خلال فرصة ليكون كودك مساهمًا في إفادة ملايين المسلمين حول العالم",
  },
  {
    q: "ما المواضيع التي يمكنني السؤال عنها على مجتمع إتقان؟",
    a: "يتيح لك مجتمع إتقان النقاش والسؤال في مختلف مجالات التقنية القرآنية؛ حيث يمكنك طرح التحديات البرمجية ونقاشات المطورين، والاستفسار عن الأدوات والموارد والمعرفة التقنية، وطلب الدعم والمشورة لمشروعك. كما يمكنك البحث عن فرص التعاون والمشاريع، ومشاركة الأفكار والتطبيقات الملهمة، بالإضافة إلى مناقشة البحوث القرآنية وطرح الأسئلة العامة ومتابعة آخر التحديثات والمبادرات",
  },
  {
    q: "هل يشترط أن أكون مبرمجًا للمشاركة في إتقان؟",
    a: "لا، لا يُشترط أن تكون مبرمجًا. يرحب مجتمع إتقان بالجميع؛ سواءً كنت مبرمجًا، أو باحثًا، أو صاحب فكرة أو مشروع قرآني، أو جهة داعمة، أو حتى شغوفًا بالتقنيات القرآنية. هناك مساحة واسعة للجميع للمشاركة بالأفكار، تقديم المشورة، إدارة المشاريع، أو المساهمة في تطوير المحتوى والبحوث.",
  },
  {
    q: "هل المشاركة في مجتمع إتقان مجانية؟",
    a: "نعم، المشاركة في مجتمع إتقان مجانية تمامًا. يمكنك الانضمام، طرح الأسئلة، تصفح المشاريع، والمساهمة في المبادرات والأنشطة دون أي رسوم",
  },
  {
    q: "كيف أضيف تطبيقي إلى دليل التطبيقات القرآنية؟",
    a: (
      <>
        املأ{" "}
        <Link href="/projects/apps" className="text-[var(--color-grad-end)] underline-offset-2 hover:underline">
          نموذج الطلب
        </Link>{" "}
        لإضافة تطبيقك، سيراجع الفريق التقني التطبيق ثم سيعمل على إضافته للدليل
      </>
    ),
  },
  {
    q: "هل تتوفر بيانات أو مكتبات جاهزة يمكنني استخدامها في مشروعي؟",
    a: "على مجتمع إتقان مجموعة من المشاريع المجتمعية التي يمكنك استخدامها مباشرةً في مشروعك، سواء مكتبات أو بيانات أو واجهات برمجية، أو مصاحف رقمية.",
  },
  {
    q: "هل هناك فعاليات أو لقاءات دورية للمجتمع؟",
    a: "نعم، يعقد مؤتمر إتقان لقاءات دورية حضورية وعن بُعد في الرياض، بالإضافة إلى لقاءات حضورية بالقاهرة. بجانب ورش مُنظمة مع جهات قرآنية بارزة وجامعات وخبراء وكفاءات لمناقشة كل ما يتعلق بمجال التقنيات القرآنية.",
  },
  {
    q: "كيف يمكن لجهة أو مؤسسة التعاون مع إتقان كشريك؟",
    a: (
      <>
        تواصل معنا مباشرة عبر{" "}
        <a href="https://join.itqan.dev" target="_blank" rel="noopener noreferrer" className="text-[var(--color-grad-end)] underline-offset-2 hover:underline">
          هذا النموذج
        </a>{" "}
        أو عبر البريد التالي{" "}
        <a
          href="mailto:Connect@itqan.dev"
          className="text-[var(--color-grad-end)] underline-offset-2 hover:underline"
        >
          Connect@itqan.dev
        </a>{" "}
        وسيتواصل معك فريقنا لمناقشة سُبل التعاون
      </>
    ),
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number[]>(faqs.map((_, i) => i));
  const toggle = (i: number) =>
    setOpen((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  return (
    <section className="w-full bg-white pt-[64px] pb-[80px] lg:pt-[96px] lg:pb-[110px]">
      <div className="shell flex flex-col items-center gap-[44px]">
        <Reveal className="flex w-full flex-col items-start gap-[12px]">
          <span className="badge">مساعدة</span>
          <h2 className="w-full text-start text-[26px] font-bold text-[var(--color-txt)] lg:text-[36px]">
            الأسئلة الشائعة
          </h2>
        </Reveal>

        <div className="flex w-full max-w-[1020px] flex-col gap-[14px]">
          {faqs.map((faq, i) => {
            const isOpen = open.includes(i);
            return (
              <Reveal
                key={faq.q}
                delay={Math.min(i, 4) * 60}
                className="overflow-hidden rounded-[12px] border border-[rgba(35,110,91,0.11)] bg-white px-[16px] py-[16px] shadow-[0_8px_22px_-6px_rgba(16,54,45,0.08)] lg:px-[26px] lg:py-[24px]"
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-[8px] text-start lg:gap-[14px]"
                >
                  <span className="min-w-0 flex-1 text-[15px] font-semibold leading-[normal] text-[var(--color-topic-title)] lg:text-[17px]">
                    {faq.q}
                  </span>
                  <Image
                    src="/figma/icon-faq-chevron.svg"
                    alt=""
                    width={18}
                    height={18}
                    className={`size-[18px] shrink-0 transition-transform duration-300 ${
                      isOpen ? "" : "rotate-180"
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-out-expo)] ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pt-[8px] text-start text-[13px] leading-[normal] text-[var(--color-txt-dim)] lg:pt-[12px] lg:text-[14px]">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
