import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

/**
 * Launch Section — Figma 149:147, 1440×731.
 * rgba(232,238,235,.42) ground, 100px padding, 56px stack gap.
 * Four 292×250 cards read ٠١ → ٠٤ right-to-left.
 */

const steps = [
  {
    number: "٠١",
    title: "ابدأ من أساس جاهز",
    body: "بيانات ومكتبات قرآنية موثوقة تختصر شهور البحث والإعداد، فتتفرغ لما يميز مشروعك",
  },
  {
    number: "٠٢",
    title: "تجاوز العقبات مع من سبقك إليها",
    body: "مجتمع تقني يُساندك في التحديات البرمجية ويفتح لك آفاق الشراكة مع مشاريع قرآنية أخرى",
  },
  {
    number: "٠٣",
    title: "اجعل مشروعك مرئيًا",
    body: "نُبرز مشروعك ونسوق له عبر قنوات إتقان، لا يبقى إنجازك حبيس مستودعك",
  },
  {
    number: "٠٤",
    title: "ابنِ ما لا يتكرر",
    body: "ندعمك في صقل فكرتك بما يحفظ أصالتها ويخدم استدامة مشروعك بعد الإطلاق",
  },
];

export default function LaunchSection() {
  return (
    <section className="hidden w-full bg-[rgba(232,238,235,0.42)] py-[64px] lg:block lg:py-[100px]">
      <div className="shell flex flex-col items-center gap-[56px]">
        <Reveal className="flex w-full flex-col items-start gap-[12px]">
          <span className="badge">لأصحاب المشاريع</span>
          <h2 className="w-full text-start text-[28px] font-bold text-[var(--color-txt)] lg:text-[36px]">
            تطبيقك من الفكرة إلى الإطلاق
          </h2>
          <p className="w-full max-w-[640px] text-start text-[16px] leading-[normal] text-[var(--color-txt-dim)]">
            كل ما يحتاجه مشروعك القرآني ليبدأ بقوة، ينمو بثبات، ويصل للجميع
          </p>
        </Reveal>

        <div className="grid w-full grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal
              key={step.number}
              delay={i * 80}
              className="card flex min-h-[250px] flex-col items-start gap-[18px] px-[24px] py-[28px]"
            >
              <div className="flex size-[44px] shrink-0 items-center justify-center rounded-[22px] bg-[var(--brand-a08)] text-[15px] font-semibold text-[var(--color-grad-end)]">
                {step.number}
              </div>
              <div className="flex w-full flex-col gap-[8px] text-start">
                <h3 className="text-[17px] font-semibold leading-[normal] text-[var(--color-topic-title)]">
                  {step.title}
                </h3>
                <p className="text-[14px] leading-[normal] text-[var(--color-txt-dim)]">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="flex flex-col gap-[12px] sm:flex-row sm:items-center">
          <a href="https://community.itqan.dev/t/community-support" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            تلقى الدعم والمشورة
          </a>
          <a
            href="https://quran-apps.itqan.dev/ar/submit-app"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost border-[rgba(35,110,91,0.26)] bg-white text-[var(--color-grad-end)]"
          >
            اضف تطبيقك إلى دليل التطبيقات
          </a>
        </Reveal>
      </div>
    </section>
  );
}
