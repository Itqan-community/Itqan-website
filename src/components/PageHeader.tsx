import type { CSSProperties } from "react";
import Image from "next/image";

/**
 * Page Header — Figma 135:162 (services) / 205:238 (all projects).
 *
 * 300px band on white with a layered decorative backdrop: two radial glows, a
 * 7%-opacity arabesque, a 5% grain tile at 160px, one large soft glow and two
 * oversized monospace glyphs at 9% brand.
 */
export default function PageHeader({
  badge,
  title,
  subtitle,
  minHeight = 300,
  /** Mobile frame 206:243 is 193px tall. */
  mobileMinHeight = 193,
  patternOpacity = 0.07,
  /** The services header (135:162) adds a grain tile and a large soft glow;
      the all-projects header (205:238) does not. */
  softLayers = true,
}: {
  badge: string;
  title: string;
  subtitle: string;
  minHeight?: number;
  mobileMinHeight?: number;
  patternOpacity?: number;
  softLayers?: boolean;
}) {
  return (
    <section
      className="relative w-full overflow-hidden bg-[var(--color-bg)] [min-height:var(--hdr-min-m)] lg:[min-height:var(--hdr-min)]"
      style={
        {
          "--hdr-min": `${minHeight}px`,
          "--hdr-min-m": `${mobileMinHeight}px`,
        } as CSSProperties
      }
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-full w-[1440px] -translate-x-1/2">
          <Image
            src="/figma/glow-brand.svg"
            alt=""
            width={600}
            height={400}
            className="absolute left-[-100px] top-[-100px] h-[400px] w-[600px] max-w-none"
          />
          <Image
            src="/figma/glow-em.svg"
            alt=""
            width={500}
            height={350}
            className="absolute left-[800px] top-[-50px] h-[350px] w-[500px] max-w-none"
          />
          <Image
            src="/figma/pattern.png"
            alt=""
            width={1440}
            height={320}
            style={{ opacity: patternOpacity }}
            className="absolute left-0 top-0 h-[320px] w-[1440px] max-w-none object-cover"
          />
          {softLayers && (
            <>
              <div
                className="absolute left-0 top-0 h-[300px] w-[1440px] opacity-[0.05]"
                style={{
                  backgroundImage: 'url("/figma/grain.png")',
                  backgroundSize: "160px 160px",
                }}
              />
              <Image
                src="/figma/glow.svg"
                alt=""
                width={1100}
                height={1100}
                className="absolute left-[-240px] top-[-430px] size-[1100px] max-w-none"
              />
            </>
          )}
          <span className="absolute left-[96px] top-[34px] font-mono text-[92px] text-[rgba(35,110,91,0.09)]">
            {"{ }"}
          </span>
          <span className="absolute left-[300px] top-[168px] font-mono text-[64px] text-[rgba(35,110,91,0.09)]">
            {"</>"}
          </span>
        </div>
      </div>

      <div className="shell relative flex flex-col items-start justify-center gap-[10px] py-[24px] [min-height:var(--hdr-min-m)] lg:gap-[14px] lg:py-[48px] lg:[min-height:var(--hdr-min)]">
        <span className="badge">{badge}</span>
        <h1 className="anim-lift text-start text-[26px] font-bold text-[var(--color-txt)] lg:text-[46px]">
          {title}
        </h1>
        <p className="w-full max-w-[620px] text-start text-[14px] leading-[normal] text-[var(--color-txt-dim)] lg:text-[17px] lg:leading-[28px]">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
