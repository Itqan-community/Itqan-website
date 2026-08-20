import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import NewsletterCard from "@/components/newsletter/NewsletterCard";
import NewsletterSubscribeForm from "./NewsletterSubscribeForm";
import {
  filterNewsletterArchiveForDisplay,
  getNewsletterArchive,
  isMailerLiteConfigured,
  type MailerLiteCampaign,
} from "@/lib/mailerlite";

/**
 * Newsletter Section — Figma 152:153, 1440×579.
 * rgba(232,238,235,.42) ground, 96px block padding, 44px gap.
 * Three 397.33×130 issue cards, then the subscribe row.
 *
 * The three cards are the latest sent campaigns from MailerLite. When the
 * API key is not configured or the fetch fails, the static issues below
 * keep the section rendered (their links point at the archive page).
 */

const fallbackIssues = [
  {
    title: "عندما تتقاطع التقنية مع أعظم غاية.. ملامح مستقبل التقنيات القرآنية من القاهرة",
    href: "/resources/newsletter",
  },
  {
    title: "منصة قاف | حين تحوّلت مشكلة مدير مدرسة لابتكار تخدم المراكز الإسلامية",
    href: "/resources/newsletter",
  },
  {
    title:
      "الموسوعة القرآنية تُطلق إصدارًا رقميًا مفتوحًا لمصحف الأوقاف الليبية برواية قالون",
    href: "/resources/newsletter",
  },
];

async function loadLatestIssues(): Promise<MailerLiteCampaign[]> {
  if (!isMailerLiteConfigured()) return [];

  try {
    const response = await getNewsletterArchive(1, 3);
    return filterNewsletterArchiveForDisplay(response.data ?? []);
  } catch (error) {
    console.error("Failed to load newsletter issues:", error);
    return [];
  }
}

export default async function NewsletterSection() {
  const campaigns = await loadLatestIssues();

  return (
    <section className="w-full bg-[rgba(232,238,235,0.42)] py-[64px] lg:py-[96px]">
      <div className="shell flex flex-col items-center gap-[44px]">
        <Reveal className="flex w-full flex-col items-start gap-[12px]">
          <span className="badge">كل أسبوعين</span>
          <h2 className="w-full text-start text-[26px] font-bold text-[var(--color-txt)] lg:text-[36px]">
            <span className="lg:hidden">نشرة إتقان البريدية</span>
            <span className="hidden lg:inline">نشرة إتقان</span>
          </h2>
          <p className="w-full max-w-[660px] text-start text-[14px] leading-[normal] text-[var(--color-txt-dim)] lg:text-[16px]">
            <span className="lg:hidden">
              أفكار ملهمة ومشاريع برمجية جديدة تصل إلى بريدك مباشرة
            </span>
            <span className="hidden lg:inline">
              قصص مُلهمة وأدوات عملية ونقاشات ثرية من عالم التقنيات القرآنية، تصل مباشرةً
              إلى بريدك
            </span>
          </p>
        </Reveal>

        <div className="no-scrollbar -mx-[16px] flex w-[calc(100%+32px)] snap-x snap-mandatory gap-[16px] overflow-x-auto px-[16px] md:mx-0 md:grid md:w-full md:grid-cols-3 md:gap-[24px] md:overflow-visible md:px-0">
          {campaigns.length > 0
            ? campaigns.map((campaign, i) => (
                <Reveal
                  key={campaign.id}
                  delay={i * 80}
                  className="w-[280px] shrink-0 snap-start md:w-auto md:shrink"
                >
                  <NewsletterCard campaign={campaign} />
                </Reveal>
              ))
            : fallbackIssues.map((issue, i) => (
                <Reveal
                  key={issue.title}
                  delay={i * 80}
                  className="flex min-h-[130px] w-[280px] shrink-0 snap-start flex-col items-start justify-between overflow-hidden rounded-[12px] border border-[rgba(35,110,91,0.11)] bg-white px-[20px] pt-[24px] pb-[20px] shadow-[0_10px_28px_-8px_rgba(16,54,45,0.12)] md:w-auto md:shrink md:px-[26px] md:pt-[28px] md:pb-[24px]"
                >
                  <h3 className="w-full text-start text-[17px] font-semibold leading-[normal] text-[var(--color-topic-title)]">
                    {issue.title}
                  </h3>
                  <Link
                    href={issue.href}
                    className="mt-[12px] flex items-center gap-[6px] text-[14px] font-medium leading-[22px] text-[var(--color-grad-end)]"
                  >
                    <span>قراءة النشرة</span>
                    <Image
                      src="/figma/icon-arrow-read.svg"
                      alt=""
                      width={14}
                      height={14}
                      className="size-[14px]"
                    />
                  </Link>
                </Reveal>
              ))}
        </div>

        <Reveal>
          <Link
            href="/resources/newsletter"
            className="flex items-center gap-[6px] text-[15px] font-medium text-[var(--color-grad-end)] transition-colors duration-200 hover:text-[var(--color-brand)]"
          >
            <span>عرض جميع النشرات</span>
            <Image
              src="/figma/icon-arrow-read.svg"
              alt=""
              width={14}
              height={14}
              className="size-[14px]"
            />
          </Link>
        </Reveal>

        <Reveal className="w-full sm:w-auto">
          <NewsletterSubscribeForm sourcepage="homepage" />
        </Reveal>
      </div>
    </section>
  );
}
