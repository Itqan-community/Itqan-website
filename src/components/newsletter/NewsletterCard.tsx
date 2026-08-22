import Image from "next/image";
import {
  getBareedNewsletterReadUrl,
  type MailerLiteCampaign,
} from "@/lib/mailerlite";

interface NewsletterCardProps {
  campaign: MailerLiteCampaign;
  /** Archive page shows the send date; the home section cards don't. */
  showDate?: boolean;
}

const dateOptions = { year: "numeric", month: "long", day: "numeric" } as const;

/** "١٥ محرم ١٤٤٨ / 23 مارس 2026" — Hijri first, then Gregorian. */
function formatSendDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";

  const hijri = new Intl.DateTimeFormat("ar-SA", {
    ...dateOptions,
    calendar: "islamic-umalqura",
  }).format(date);
  const gregorian = new Intl.DateTimeFormat("ar-SA", dateOptions).format(date);

  return `${hijri} / ${gregorian}`;
}

export default function NewsletterCard({ campaign, showDate = false }: NewsletterCardProps) {
  const primary = campaign.emails[0];
  const title = primary?.subject || campaign.name;
  const href = getBareedNewsletterReadUrl(campaign);
  const date = showDate ? formatSendDate(campaign.scheduled_for ?? campaign.created_at) : "";

  return (
    <article className="flex h-full min-h-[130px] flex-col items-start justify-between overflow-hidden rounded-[12px] border border-[rgba(35,110,91,0.11)] bg-white px-[20px] pt-[24px] pb-[20px] shadow-[0_10px_28px_-8px_rgba(16,54,45,0.12)] md:px-[26px] md:pt-[28px] md:pb-[24px]">
      <div className="flex w-full flex-col items-start gap-[8px]">
        <h3 className="w-full text-start text-[17px] font-semibold leading-[normal] text-[var(--color-topic-title)]">
          {title}
        </h3>
        {date && (
          <div className="flex w-full flex-col items-start gap-[10px]">
            <span className="badge max-w-full text-start">
              <span className="block min-w-0 whitespace-normal">
                {campaign.name}
              </span>
            </span>
            <span className="flex items-center gap-[10px]">
              <span aria-hidden className="h-[12px] w-px bg-[var(--brand-a20)]" />
              <span className="text-[12px] text-[var(--color-txt-dim)]">
                {date}
              </span>
            </span>
          </div>
        )}
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
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
      </a>
    </article>
  );
}
