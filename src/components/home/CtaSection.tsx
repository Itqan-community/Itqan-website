import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { Mote } from "./hero-cards";

/**
 * cta-section — Figma 20:1270, 1440×451.
 *
 * Gradient ground #1b5749 → #0b261f, 100px padding, 40px stack gap. Decorative
 * layer: two radial glows, a 6%-opacity arabesque, an 8% grain tile, three
 * drifting motes and two 3%-white monospace glyphs.
 */
export default function CtaSection() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#1b5749] to-[var(--color-code-bg)] px-[16px] py-[48px] lg:p-[100px]">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-full w-[1440px] -translate-x-1/2">
          <Image
            src="/figma/cta-glow-brand.svg"
            alt=""
            width={700}
            height={450}
            className="absolute left-[-150px] top-[-100px] h-[450px] w-[700px] max-w-none"
          />
          <Image
            src="/figma/cta-glow-em.svg"
            alt=""
            width={600}
            height={400}
            className="absolute left-[900px] top-[-50px] h-[400px] w-[600px] max-w-none"
          />
          <Image
            src="/figma/cta-pattern.png"
            alt=""
            fill
            sizes="1440px"
            className="max-w-none object-cover opacity-[0.06]"
          />
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: 'url("/figma/cta-grain.png")',
              backgroundSize: "160px 160px",
            }}
          />
          <Image
            src="/figma/cta-bg-glow.svg"
            alt=""
            width={960}
            height={960}
            className="absolute left-[240px] top-[-120px] size-[960px] max-w-none"
          />

          <span className="absolute left-[80px] top-[150px] font-mono text-[90px] text-[rgba(255,255,255,0.03)]">
            {"{...}"}
          </span>
          <span className="absolute left-[1180px] top-[220px] font-mono text-[74px] text-[rgba(255,255,255,0.03)]">
            {"</>"}
          </span>

          <Mote left={150} top={80} delay={0} />
          <Mote left={1100} top={60} delay={3} />
          <Mote left={1250} top={300} delay={6} />
        </div>
      </div>

      <div className="relative flex flex-col items-center gap-[28px] lg:gap-[40px]">
        <Reveal className="flex w-full max-w-[800px] flex-col items-center gap-[20px]">
          <span className="badge badge-invert">المجتمع المفتوح</span>
          <h2 className="w-full text-center text-[26px] font-bold text-white lg:text-[42px]">
            ساهم في بناء البنية التحتية التقنية للقرآن
          </h2>
          <p className="w-full max-w-[580px] text-center text-[14px] leading-[normal] text-[var(--color-code-txt)] lg:text-[16px]">
            انضم إلى مجتمع المطورين المساهمين في بناء المكتبات البرمجية، وتحسين محركات
            البحث القرآنية، وتطوير قواعد البيانات الموثوقة التي تخدم مئات التطبيقات.
          </p>
        </Reveal>

        <Reveal delay={120} className="flex w-full justify-center">
          <Link href="/projects" className="btn btn-primary h-[51px] w-full py-0 text-center lg:h-auto lg:w-auto lg:py-[16px]">
            اكتشف المشاريع النشطة على المجتمع
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
