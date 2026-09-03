import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

/**
 * Partners Section — Figma 151:176, 1440×952.
 * White ground, 96px block padding, 44px gap.
 * Grid of 232×180 cards, 20px gutter — five per row at 1240px.
 *
 * The grid is pinned to ltr so the card order matches the Figma rows exactly;
 * each caption keeps its own direction.
 */

export const partners = [
  { name: "جمعية مكنون لتحفيظ القرآن الكريم بالرياض", logo: "/figma/partner-maknoon.png", w: 160, h: 56, contain: true },
  { name: "مركز تفسير للدراسات القرآنية", logo: "/figma/partner-tafsir.png", w: 160, h: 56, contain: true },
  { name: "جمعية البرهان لخدمة القرآن والسنة", logo: "/figma/partner-burhan.png", w: 160, h: 56, contain: true },
  { name: "Quran.com", logo: "/figma/partner-qurancom.png", w: 160, h: 56, contain: true },
  { name: "ترتيل Tarteel.ai", logo: "/figma/partner-tarteel.svg", w: 160, h: 25.43 },
  { name: "Greentech", logo: "/figma/partner-greentech.svg", w: 160, h: 53.6 },
  { name: "بي دي إم إس", logo: "/figma/partner-bdms.svg", w: 46.667, h: 56 },
  { name: "مجموعة زاد", logo: "/figma/partner-zad.png", w: 160, h: 56, contain: true },
  { name: "نقاية Nuqayah", logo: "/figma/partner-nuqayah.svg", w: 64.211, h: 56 },
  { name: "الموسوعة القرآنية Quran Pedia", logo: "/figma/partner-quranpedia.png", w: 160, h: 56, contain: true },
  { name: "mp3 quran", logo: "/figma/partner-mp3quran.png", w: 160, h: 56, contain: true },
  { name: "تطبيق زلفى", logo: "/figma/partner-zalfa.svg", w: 56, h: 56 },
];

export default function PartnersSection() {
  return (
    <section className="hidden w-full bg-white py-[64px] lg:block lg:py-[96px]">
      <div className="shell flex flex-col items-center gap-[44px]">
        <Reveal className="flex w-full flex-col items-start gap-[12px]">
          <span className="badge">شراكات</span>
          <h2 className="w-full text-start text-[28px] font-bold text-[var(--color-txt)] lg:text-[36px]">
            شركاؤنا في الرحلة
          </h2>
          <p className="w-full max-w-[660px] text-start text-[16px] leading-[normal] text-[var(--color-txt-dim)]">
            نتعاون مع مؤسسات رائدة في خدمة القرآن الكريم وتقنياته لبناء منظومة رقمية
            متكاملة تخدم الأمة.
          </p>
        </Reveal>

        <div dir="rtl" className="partners-grid-desktop w-full">
          {partners.map((partner, i) => (
            <Reveal
              key={partner.name}
              delay={(i % 5) * 60}
              className="flex h-[180px] w-[calc(50%-10px)] flex-col items-center justify-center gap-[12px] overflow-hidden rounded-[12px] border border-[rgba(35,110,91,0.11)] bg-white px-[14px] py-[22px] shadow-[0_8px_22px_-6px_rgba(16,54,45,0.08)] sm:w-[calc(33.333%-14px)] lg:w-[232px]"
            >
              <div className="flex h-[56px] w-[160px] items-center justify-center">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={Math.round(partner.w)}
                  height={Math.round(partner.h)}
                  style={{ width: partner.w, height: partner.h }}
                  className={`max-w-none ${partner.contain ? "object-contain" : ""}`}
                />
              </div>
              <p
                dir="auto"
                className="w-full text-center text-[12px] font-medium leading-[normal] text-[var(--color-topic-title)]"
              >
                {partner.name}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
