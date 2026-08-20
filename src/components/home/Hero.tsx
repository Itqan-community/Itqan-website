import Image from "next/image";
import { CodePanel, Mote, ShotCard, TopicCard, type Topic } from "./hero-cards";

/**
 * Hero — إتقان (20:871), 1440×900.
 *
 * Layout: 35px column gap (space/col-gap), 101px gutters, 80px block padding.
 * Copy column 520px, visual stage 600×540.
 *
 * Motion (from the Figma timeline, node 20:871 / 20:872):
 *   root — opacity 0→1, scale .97→1, 800ms, cubic-bezier(.16,1,.3,1)
 *   bg   — opacity 0→1, y 24→0,      600ms, cubic-bezier(.4,0,.6,1)
 *   card column — 39.42px/s over a 788.4px cycle → 20s linear loop
 */

const topics: Topic[] = [
  {
    category: "المشاريع والتعاون",
    title: "توحيد تسميات المصطلحات القرآنية في المشاريع المفتوحة",
    replies: "١٤",
  },
  {
    category: "نقاشات المطورين",
    title: "أفضل طريقة لعرض المصحف مطابقًا للنسخة المطبوعة",
    replies: "٢٢",
  },
  {
    category: "نقاشات المطورين",
    title: "أزمة المصادر الصوتية المتاحة للمطورين",
    replies: "٩",
  },
];

/** Base y of each card in the 540px window; pitch is 131.4px. */
const CYCLE = 788.4;

const trackItems = [
  { kind: "topic", index: 2, left: 36, top: -158.47 },
  { kind: "shot", index: 3, left: 312, top: -27.07 },
  { kind: "topic", index: 1, left: 36, top: 104.33 },
  { kind: "shot", index: 2, left: 312, top: 235.73 },
  { kind: "topic", index: 0, left: 36, top: 367.13 },
  { kind: "shot", index: 1, left: 312, top: 498.53 },
] as const;

function TrackItem({
  item,
  offset,
}: {
  item: (typeof trackItems)[number];
  offset: number;
}) {
  return (
    <div
      className="absolute"
      style={{ left: `${item.left}px`, top: `${item.top + offset}px` }}
    >
      {item.kind === "topic" ? (
        <TopicCard topic={topics[item.index]} />
      ) : (
        <ShotCard
          src={`/figma/hero-shot-${item.index}.png`}
          alt="من لقاءات مجتمع إتقان"
        />
      )}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-bg)]">
      {/* ------------------------------------------------------------ bg layer */}
      <div
        aria-hidden
        className="anim-lift pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-0 h-[900px] w-[1440px] -translate-x-1/2">
          <Image
            src="/figma/hero-glow-brand.svg"
            alt=""
            width={1273}
            height={1273}
            className="absolute left-[-388px] top-[-402.4px] size-[1272.79px] max-w-none"
          />
          <Image
            src="/figma/hero-glow-em.svg"
            alt=""
            width={1160}
            height={1160}
            className="absolute left-[-83.43px] top-[216.17px] size-[1159.66px] max-w-none"
          />
          <Image
            src="/figma/hero-pattern.png"
            alt=""
            width={778}
            height={702}
            priority
            className="absolute left-[662.4px] top-0 h-[702px] w-[777.6px] max-w-none object-cover opacity-15"
          />
          <div
            className="absolute inset-0 opacity-10 mix-blend-multiply"
            style={{
              backgroundImage: 'url("/figma/hero-grain.png")',
              backgroundSize: "100px 100px",
            }}
          />
          <span className="absolute left-[57.6px] top-[108px] font-mono text-[110px] text-[var(--brand-a10)]">
            {"{ }"}
          </span>
          <span className="absolute left-[345.6px] top-[589px] font-mono text-[58px] text-[var(--brand-a10)]">
            [ ]
          </span>
          <span className="absolute left-[633.6px] top-[730px] font-mono text-[74px] text-[var(--brand-a10)]">
            {"</>"}
          </span>
        </div>
      </div>

      {/* --------------------------------------------------------- content row */}
      <div className="anim-rise relative mx-auto flex min-h-[640px] w-full max-w-[1440px] flex-col items-center justify-center gap-[var(--space-col-gap)] px-[16px] py-[56px] lg:min-h-[900px] lg:flex-row lg:px-[101px] lg:py-[80px]">
        {/* Copy — first in the DOM so it lands on the right under RTL. */}
        <div className="flex w-full flex-col items-start gap-[22px] lg:w-[520px]">
          <h1 className="flex w-full flex-col text-start text-[34px] font-bold sm:text-[44px] lg:text-[62px]">
            <span className="text-[var(--color-txt)]">ملتقى العاملين على</span>
            <span className="bg-gradient-to-b from-[#2e8069] via-[#1b5749] via-[70%] to-[#1b5749] bg-clip-text text-transparent">
              التقنات القرآنية
            </span>
          </h1>

          <p className="w-full text-start text-[16px] leading-[normal] text-[var(--color-txt-dim)] lg:w-[470px] lg:text-[18px]">
            مجتمع إتقان هو مساحة تجمع جهود المطورين والباحثين لبناء وصيانة البنية التحتية
            التقنية، للارتقاء بمنظومة تطبيقات القرآن الكريم واستدامتها
          </p>

          <div className="flex w-full flex-col gap-[var(--space-cta-gap)] pt-[12px] lg:w-auto lg:flex-row lg:items-center">
            <a href="https://join.itqan.dev" target="_blank" rel="noopener noreferrer" className="btn btn-primary h-[51px] w-full py-0 lg:h-auto lg:w-auto lg:py-[16px]">
              انضم إلى المجتمع
            </a>
          </div>
        </div>

        {/* Visual Scene Mobile — Figma 183:198, 358×460.
            A 320px orbit holding one topic card, three motes, and a 320×124
            code panel beneath it. */}
        <div className="relative h-[460px] w-[358px] shrink-0 lg:hidden">
          <div className="absolute left-[19px] top-0 size-[320px]">
            <span
              aria-hidden
              className="absolute left-[10px] top-[10px] size-[300px] rounded-full bg-[radial-gradient(circle,rgba(55,130,110,0.13)_0%,rgba(55,130,110,0)_68%)]"
            />
            <div className="absolute left-[50px] top-[99px] w-[220px]">
              <TopicCard topic={topics[0]} className="w-[220px] min-h-[123px]" />
            </div>
            <Mote left={40} top={60} delay={0} />
            <Mote left={280} top={90} delay={3} />
            <Mote left={120} top={260} delay={6} />
          </div>
          <CodePanel
            className="absolute left-[19px] top-[336px] w-[320px]"
            lines="compact"
          />
        </div>

        {/* Visual stage — absolute children use physical left/top, so the
            composition is identical under RTL. */}
        <div className="relative hidden h-[540px] w-[600px] shrink-0 lg:block">
          <div className="absolute left-1/2 top-1/2 h-[540px] w-[600px] -translate-x-1/2 -translate-y-1/2">
            <Image
              src="/figma/hero-halo.svg"
              alt=""
              width={950}
              height={950}
              className="pointer-events-none absolute left-[-175.18px] top-[-215.98px] size-[950.35px] max-w-none"
            />
            <Image
              src="/figma/hero-orbit.svg"
              alt=""
              width={576}
              height={576}
              className="pointer-events-none absolute left-[12px] top-[-28.8px] size-[576px] max-w-none"
            />
            <Image
              src="/figma/hero-orbit-inner.png"
              alt=""
              width={484}
              height={484}
              className="pointer-events-none absolute left-[58.08px] top-[17.28px] size-[483.84px] max-w-none"
            />

            {/* Carousel window — the Figma track mask fades the top and bottom. */}
            <div
              className="absolute left-0 top-0 h-[540px] w-[600px] overflow-hidden"
              style={{
                maskImage: 'url("/figma/hero-track-mask.svg")',
                WebkitMaskImage: 'url("/figma/hero-track-mask.svg")',
                maskSize: "600px 540px",
                WebkitMaskSize: "600px 540px",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
              }}
            >
              <div
                className="absolute inset-0 will-change-transform"
                style={{ animation: "itqan-hero-marquee 20s linear infinite" }}
              >
                {trackItems.map((item) => (
                  <TrackItem key={`a-${item.kind}-${item.index}`} item={item} offset={0} />
                ))}
                {trackItems.map((item) => (
                  <TrackItem
                    key={`b-${item.kind}-${item.index}`}
                    item={item}
                    offset={CYCLE}
                  />
                ))}
              </div>
            </div>

            <Mote left={240} top={302.4} delay={0} />
            <Mote left={312} top={334.8} delay={2.4} />
            <Mote left={198} top={356.4} delay={4.8} />
            <Mote left={366} top={313.2} delay={7.1} />

            <CodePanel className="absolute left-[258px] top-[385.2px] w-[360px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
