import Link from "next/link";
import type { Dictionary } from "@/lib/i18n";

/** Placeholder body for not-yet-translated English pages. */
export default function ComingSoon({
  dict,
  backHref,
}: {
  dict: Dictionary["pages"]["comingSoon"];
  backHref: string;
}) {
  return (
    <section className="w-full bg-white px-[16px] py-[64px] lg:py-[96px]">
      <div className="shell flex flex-col items-center gap-[16px] text-center">
        <span className="badge">{dict.badge}</span>
        <h2 className="text-[26px] font-bold text-[var(--color-txt)] lg:text-[36px]">
          {dict.title}
        </h2>
        <p className="max-w-[520px] text-[15px] leading-[normal] text-[var(--color-txt-dim)]">
          {dict.body}
        </p>
        <Link href={backHref} className="btn btn-primary mt-[8px]">
          {dict.cta}
        </Link>
      </div>
    </section>
  );
}
