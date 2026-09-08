import Link from "next/link";
import type { Dictionary } from "@/lib/i18n";

/** Placeholder CTA for not-yet-translated English pages. */
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
        <Link href={backHref} className="btn btn-primary mt-[8px]">
          {dict.cta}
        </Link>
      </div>
    </section>
  );
}
