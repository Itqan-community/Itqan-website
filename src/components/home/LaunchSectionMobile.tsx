import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

/**
 * Launch Section Mobile — Figma 183:325, 390×957.
 *
 * Four stacked 358×157 cards with a 36px number tile at the top-right. The
 * mobile frame carries its own step copy, different from the desktop cards.
 */

const steps = [
  {
    number: "٠١",
    title: "ابدأ من أساس جاهز",
    body: "مكتبات بيانات قرآنية موثوقة ومصاحف رقمية جاهزة تختصر عليك شهور العمل الشاق لتتفرغ للمميزات.",
  },
  {
    number: "٠٢",
    title: "تجاوز العقبات البرمجية",
    body: "استشر الخبراء واستعن بمجتمع تقني مكرس لحل التحديات الفنية الصعبة وضبط النظم.",
  },
  {
    number: "٠٣",
    title: "اجعل مشروعك مرئيًا",
    body: "انشر مخرجاتك وسوق لتطبيقك عبر منصات وقنوات إتقان الرسمية للوصول لأكبر فئة مستهدفة.",
  },
  {
    number: "٠٤",
    title: "ابنِ ما لا يتكرر",
    body: "ندعمك في صقل فكرتك بما يضمن أصالة الفكرة واستدامة التطبيق وموثوقية مرجعيته العلمية.",
  },
];

export default function LaunchSectionMobile() {
  return (
    <section className="w-full bg-[rgba(232,238,235,0.42)] px-[16px] py-[48px] lg:hidden">
      <div className="flex flex-col gap-[32px]">
        <Reveal className="flex flex-col items-start gap-[12px]">
          <span className="badge">لأصحاب المشاريع</span>
          <h2 className="text-[26px] font-bold text-[var(--color-txt)]">
            تطبيقك من الفكرة إلى الإطلاق
          </h2>
          <p className="text-[14px] text-[var(--color-txt-dim)]">
            كل ما يحتاجه مشروعك القرآني ليبدأ بقوة، ينمو بثبات، ويصل للمسلمين في كل مكان
          </p>
        </Reveal>

        <div className="flex flex-col gap-[16px]">
          {steps.map((step, i) => (
            <Reveal
              key={step.number}
              delay={i * 70}
              className="card flex min-h-[157px] flex-col gap-[12px] p-[20px]"
            >
              <div className="flex size-[36px] items-center justify-center rounded-[18px] bg-[var(--brand-a08)] text-[14px] font-semibold text-[var(--color-grad-end)]">
                {step.number}
              </div>
              <h3 className="text-[17px] font-semibold text-[var(--color-topic-title)]">
                {step.title}
              </h3>
              <p className="text-[14px] text-[var(--color-txt-dim)]">{step.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="flex flex-col gap-[12px]">
          <a
            href="https://community.itqan.dev/t/community-support"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary h-[51px] w-full py-0"
          >
            تلقى الدعم والمشورة
          </a>
          <a
            href="https://quran-apps.itqan.dev/ar/submit-app"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost h-[51px] w-full border-[rgba(35,110,91,0.26)] bg-white py-0 text-[var(--color-grad-end)]"
          >
            اضف تطبيقك إلى دليل التطبيقات
          </a>
        </Reveal>
      </div>
    </section>
  );
}
