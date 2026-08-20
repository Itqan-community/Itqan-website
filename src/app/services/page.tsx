import Image from "next/image";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/ui/Reveal";

/**
 * إتقان — ما الذي نقدمه؟ (Figma 135:134, 1440×2335).
 * Mobile frame: 206:236, 390×1758.
 *
 * Offerings and events are listed in RTL reading order; the Figma child lists
 * run left-to-right, i.e. the reverse of these arrays.
 */

export const metadata: Metadata = {
  title: "ما الذي تقدمه إتقان؟ — إتقان",
  description: "ستة محاور تشكّل ما تقدمه إتقان لخدمة مجال التقنيات القرآنية.",
};

const offerings = [
  {
    icon: "/figma/offering-ecosystem.svg",
    title: "البيئة التقنية الشاملة",
    body: "منظومة متكاملة من الخدمات والأدوات لجميع العاملين في مجال التقنيات القرآنية",
  },
  {
    icon: "/figma/offering-exchange.svg",
    title: "مساحة لتبادل الخبرات",
    body: "نجمع العاملين في التقنيات القرآنية في مساحة مشتركة للتلاقي وتبادل الخبرات وتوحيد الجهود",
  },
  {
    icon: "/figma/offering-incubation.svg",
    title: "تمكين وحضانة المشاريع",
    body: "نقدم دعمًا تقنيًا واستراتيجيًا وتشغيليًا للمشاريع القرآنية في مختلف مراحل تطورها",
  },
  {
    icon: "/figma/offering-network.svg",
    title: "شبكة من المشاريع القرآنية",
    body: "شبكة تربط المشاريع القرآنية لفتح قنوات تعاون تُسرع أثرها وتدعم استدامتها",
  },
  {
    icon: "/figma/offering-reach.svg",
    title: "التوجيه وتوسيع الأثر",
    body: "نساعد المشاريع القرآنية على تحديد جمهورها وتحسين تموضعها، لتصل إلى أوسع شريحة ممكنة",
  },
  {
    icon: "/figma/offering-research.svg",
    title: "دعم البحث العلمي",
    body: "ندعم البحث العلمي في التقنيات القرآنية ونغطي الفعاليات البحثية لنشر المعرفة وتوسيع أثرها",
  },
];

const events = [
  {
    photo: "/figma/events-meetups.png",
    caption: "صور من الملتقيات",
    title: "ملتقيات دورية",
    body: "نعقد لقاءات حضورية، تجمع المطورين والباحثين والمهتمين بالتقنيات القرآنية لتبادل الخبرات وفتح النقاشات وبناء علاقات مهنية مثمرة",
  },
  {
    photo: "/figma/events-workshops.png",
    caption: "صورة من ورش العمل",
    title: "ورش العمل والندوات عبر الإنترنت",
    body: "ننظم ورش عمل وجلسات متخصصة تجمع الخبراء والباحثين والمطورين حول تحديات تقنية قرآنية محددة، بهدف الخروج بتوصيات عملية",
  },
  {
    photo: "/figma/events-conferences.png",
    caption: "صور من المؤتمرات",
    title: "المؤتمرات",
    body: "نشارك في المؤتمرات التقنية والبحثية المتخصصة، للتواصل مع الباحثين والمطورين وبناء شراكات تدفع مجال التقنيات القرآنية إلى الأمام",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHeader
          badge="عن إتقان"
          title="ما الذي تقدمه إتقان؟"
          subtitle="ستة محاور تشكّل ما تقدمه إتقان لخدمة مجال التقنيات القرآنية."
        />

        {/* Offerings Section — 136:149 */}
        <section className="w-full bg-white py-[32px] lg:py-[90px]">
          <div className="shell flex flex-col items-center gap-[24px] lg:gap-[44px]">
            <div className="no-scrollbar -mx-[16px] flex w-[calc(100%+32px)] snap-x snap-mandatory gap-[12px] overflow-x-auto px-[16px] md:mx-0 md:grid md:w-full md:grid-cols-2 md:gap-[24px] md:overflow-visible md:px-0 lg:grid-cols-3">
              {offerings.map((item, i) => (
                <Reveal
                  key={item.title}
                  delay={(i % 3) * 80}
                  className="card flex min-h-[125px] w-[280px] shrink-0 snap-start flex-col items-start gap-[12px] px-[16px] py-[16px] md:min-h-[214px] md:w-auto md:shrink md:gap-[20px] md:px-[28px] md:py-[32px]"
                >
                  <div className="flex size-[40px] shrink-0 items-center justify-center rounded-[24px] bg-[var(--brand-a06)] md:size-[48px]">
                    <Image
                      src={item.icon}
                      alt=""
                      width={24}
                      height={24}
                      className="size-[24px]"
                    />
                  </div>
                  <div className="flex w-full flex-col gap-[8px] text-start">
                    <h2 className="text-[15px] font-semibold leading-[normal] text-[var(--color-topic-title)] md:text-[18px] md:leading-[26px]">
                      {item.title}
                    </h2>
                    <p className="text-[13px] text-[var(--color-txt-dim)] md:text-[14px]">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <a href="https://join.itqan.dev" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                تواصل معنا
              </a>
            </Reveal>
          </div>
        </section>

        {/* Events Section — 137:151 */}
        <section className="w-full bg-[rgba(232,238,235,0.42)] pt-[32px] pb-[40px] lg:pt-[90px] lg:pb-[100px]">
          <div className="shell flex flex-col items-center gap-[24px] lg:gap-[44px]">
            <Reveal className="flex w-full flex-col items-start gap-[12px]">
              <span className="badge">لقاءات المجتمع</span>
              <h2 className="text-start text-[22px] font-bold text-[var(--color-txt)] lg:text-[36px]">
                الفعاليات والمؤتمرات
              </h2>
            </Reveal>

            <div className="no-scrollbar -mx-[16px] flex w-[calc(100%+32px)] snap-x snap-mandatory gap-[12px] overflow-x-auto px-[16px] md:mx-0 md:grid md:w-full md:grid-cols-3 md:gap-[24px] md:overflow-visible md:px-0">
              {events.map((event, i) => (
                <Reveal
                  key={event.title}
                  delay={i * 80}
                  className="flex w-[280px] shrink-0 snap-start flex-col items-start overflow-hidden rounded-[12px] border border-[var(--brand-a10)] bg-white shadow-[var(--shadow-card)] md:w-auto md:shrink"
                >
                  <div className="relative h-[120px] w-full bg-[var(--color-bg-2)] md:h-[196px]">
                    <Image
                      src={event.photo}
                      alt={event.caption}
                      fill
                      sizes="(max-width: 767px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex w-full flex-col gap-[6px] px-[16px] pt-[14px] pb-[16px] text-start md:gap-[8px] md:px-[24px] md:pt-[20px] md:pb-[26px]">
                    <p className="text-[12px] text-[var(--color-txt-dim)] opacity-85">
                      {event.caption}
                    </p>
                    <h3 className="text-[15px] font-semibold leading-[normal] text-[var(--color-topic-title)] md:text-[18px] md:leading-[26px]">
                      {event.title}
                    </h3>
                    <p className="text-[13px] text-[var(--color-txt-dim)] md:text-[14px]">
                      {event.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
