import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/i18n";
import { Mote } from "./hero-cards";

/**
 * cta-section — Figma 20:1270, 1440×451.
 *
 * Gradient ground #1b5749 → #0b261f, 100px padding, 40px stack gap. Decorative
 * layer: two radial glows, a 6%-opacity arabesque, an 8% grain tile, three
 * drifting motes and two 3%-white monospace glyphs.
 */
export default function CtaSection({
  dict,
}: {
  dict: Dictionary["home"]["cta"];
}) {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#1b5749] to-[var(--color-code-bg)] px-[16px] py-[48px] lg:p-[100px]">
      {/* Full-bleed: the pattern and grain tile edge-to-edge at any viewport
          width; right-side pieces anchor to the right edge instead of a fixed
          1440px band. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
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
          className="absolute right-[-60px] top-[-50px] h-[400px] w-[600px] max-w-none"
        />
        <Image
          src="/figma/cta-pattern.png"
          alt=""
          fill
          sizes="100vw"
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
          className="absolute left-1/2 top-[-120px] size-[960px] max-w-none -translate-x-1/2"
        />

        <span className="absolute left-[80px] top-[150px] font-mono text-[90px] text-[rgba(255,255,255,0.03)]">
          {"{...}"}
        </span>
        <span className="absolute right-[128px] top-[220px] font-mono text-[74px] text-[rgba(255,255,255,0.03)]">
          {"</>"}
        </span>

        <Mote left={150} top={80} delay={0} />
        <Mote left={1100} top={60} delay={3} />
        <Mote left={1250} top={300} delay={6} />
      </div>

      <div className="relative flex flex-col items-center gap-[28px] lg:gap-[40px]">
        <Reveal className="flex w-full max-w-[800px] flex-col items-center gap-[20px]">
          <span className="badge badge-invert">{dict.badge}</span>
          <h2 className="w-full text-center text-[26px] font-bold text-white lg:text-[42px]">
            {dict.title}
          </h2>
          <p className="w-full max-w-[580px] text-center text-[14px] leading-[normal] text-[var(--color-code-txt)] lg:text-[16px]">
            {dict.body}
          </p>
        </Reveal>

      </div>
    </section>
  );
}
