import Reveal from "@/components/ui/Reveal";

/**
 * Stats Card — Figma 37:146, 1240×132.
 *
 * Absolutely placed at y=910 on the 1440 frame so it straddles the hero and the
 * impact section. The row reads left-to-right in the design (+22,000 leftmost),
 * so the flex container is pinned to ltr while the labels stay Arabic.
 */

const stats = [
  { value: "+22,000", label: "زيارة للمجتمع", valueColor: "var(--color-brand)", labelColor: "var(--color-txt-dim)" },
  { value: "+580", label: "نقاش تقني", valueColor: "var(--color-brand)", labelColor: "var(--color-txt-dim)" },
  { value: "+5,700", label: "مساهمة", mobileLabel: "مساهمة مضافة", valueColor: "var(--color-brand)", labelColor: "var(--color-txt-dim)" },
  { value: "+1,500", label: "مطور وباحث", mobileLabel: "مطور وباحث نشط", valueColor: "#1a5c47", labelColor: "#66736e" },
  { value: "+15", label: "مشروع مفتوح المصدر", valueColor: "#1a5c47", labelColor: "#66736e" },
];

export default function StatsCard() {
  return (
    // Desktop pulls the card up so it straddles the hero (y=910 on the 1440
    // frame). The mobile frame (183:233) sits flush after the hero instead.
    <Reveal className="relative z-20 mx-auto mt-[24px] w-full max-w-[calc(1240px+200px)] px-[16px] lg:-mt-[66px] lg:px-[100px]">
      <div className="relative overflow-hidden rounded-[18px] border-[1.5px] border-[rgba(24,72,57,0.2)] bg-[#fafefc] px-[24px] py-[28px] shadow-[0_6px_20px_0_rgba(0,0,0,0.08),0_20px_60px_-10px_rgba(24,72,57,0.15)]">
        {/* Mobile (183:233) stacks the stats into 55px rows split by hairlines;
            desktop (37:146) lays them out as one ltr row with 56px dividers. */}
        <div
          dir="ltr"
          className="flex flex-col items-stretch md:flex-row md:items-center md:justify-center"
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="contents">
              {i > 0 && (
                <>
                  <div className="my-[16px] h-px w-full shrink-0 bg-[#e0e3e0] md:hidden" />
                  <div className="hidden h-[56px] w-px shrink-0 bg-[#e0e3e0] md:block" />
                </>
              )}
              <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-[4px] text-center md:gap-[6px] md:py-[8px]">
                <p
                  className="whitespace-nowrap text-[28px] font-bold"
                  style={{ color: stat.valueColor }}
                >
                  {stat.value}
                </p>
                <p
                  className="whitespace-nowrap text-[13px]"
                  style={{ color: stat.labelColor }}
                >
                  {/* The mobile frame uses slightly longer labels. */}
                  <span className={stat.mobileLabel ? "md:hidden" : undefined}>
                    {stat.mobileLabel ?? stat.label}
                  </span>
                  {stat.mobileLabel && <span className="hidden md:inline">{stat.label}</span>}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Accent (39:146) — 3px gradient rule flush with the base. */}
        <div
          aria-hidden
          className="absolute inset-x-[-1.5px] bottom-0 h-[3px] rounded-[18px]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(24,72,57,0) 0%, rgba(61,224,150,0.8) 20%, rgb(24,72,57) 50%, rgba(61,224,150,0.8) 80%, rgba(24,72,57,0) 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_0_2px_rgba(24,72,57,0.04)]"
        />
      </div>
    </Reveal>
  );
}
