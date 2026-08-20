import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

/**
 * Partners Section Mobile — Figma 183:372, 390×438.
 *
 * Replaces the 232×180 desktop card grid with a 358×72 featured-publisher row
 * and a wrapped row of 38px name chips. The frame mocks six chips; all twelve
 * partners are rendered here in the same layout.
 */

const partners = [
  "Tarteel.ai",
  "Quran.com",
  "البرهان",
  "تفسير",
  "مكنون",
  "Greentech",
  "بي دي إم إس",
  "مجموعة زاد",
  "Nuqayah",
  "Quran Pedia",
  "زلفى",
  "mp3 quran",
];

export default function PartnersSectionMobile() {
  return (
    <section className="w-full bg-white px-[16px] py-[48px] lg:hidden">
      <div className="flex flex-col gap-[32px]">
        <Reveal className="flex flex-col items-start gap-[12px]">
          <span className="badge">الناشرون والشركاء</span>
          <h2 className="text-[26px] font-bold text-[var(--color-txt)]">
            شركاؤنا في رحلة الأثر
          </h2>
          <p className="text-[14px] text-[var(--color-txt-dim)]">
            نتعاون مع جهات قرآنية ومؤسسات رائدة لبناء منظومة تقنية متكاملة
          </p>
        </Reveal>

        {/* Featured Publisher — 183:378 */}
        <Reveal className="flex h-[72px] items-center gap-[12px] rounded-[12px] border border-[rgba(35,110,91,0.11)] bg-white px-[16px] shadow-[0_8px_22px_-6px_rgba(16,54,45,0.08)]">
          <Image
            src="/figma/publisher-tahbeer.png"
            alt=""
            width={40}
            height={40}
            className="size-[40px] shrink-0 rounded-[10px] object-cover"
          />
          <div className="flex min-w-0 flex-col items-start">
            <p className="text-[15px] font-semibold text-[var(--color-topic-title)]">
              تحبير
            </p>
            <p className="text-[12px] text-[var(--color-txt-dim)]">
              المركز السعودي للتلاوات
            </p>
          </div>
        </Reveal>

        {/* Partners Grid Mobile — 183:383 */}
        <Reveal className="flex flex-wrap justify-center gap-[10px]">
          {partners.map((name) => (
            <span
              key={name}
              className="flex h-[38px] items-center rounded-[10px] border border-[rgba(35,110,91,0.11)] bg-[#f5fbfa] px-[12px] text-[12px] font-medium text-[var(--color-topic-title)]"
            >
              {name}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
