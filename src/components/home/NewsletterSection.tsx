import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import NewsletterCard from "@/components/newsletter/NewsletterCard";
import NewsletterSubscribeForm from "./NewsletterSubscribeForm";
import {
  filterNewsletterArchiveForDisplay,
  getNewsletterArchive,
  type MailerLiteCampaign,
} from "@/lib/mailerlite";
import type { Dictionary, Locale } from "@/lib/i18n";

/**
 * Newsletter Section — Figma 152:153, 1440×579.
 * rgba(232,238,235,.42) ground, 96px block padding, 44px gap.
 * Three 397.33×130 issue cards, then the subscribe row.
 *
 * The three cards are the latest sent campaigns from MailerLite. When the
 * API key is not configured or the fetch fails, the static issues below
 * keep the section rendered (their links point at the archive page).
 */

async function loadLatestIssues(): Promise<MailerLiteCampaign[]> {
  try {
    const response = await getNewsletterArchive(1, 3);
    return filterNewsletterArchiveForDisplay(response.data ?? []);
  } catch (error) {
    console.error("Failed to load newsletter issues:", error);
    return [];
  }
}

export default async function NewsletterSection({
  dict,
  formLabels,
  locale,
}: {
  dict: Dictionary["home"]["newsletter"];
  /** The light-tone form labels come from the shared newsletterForm slice. */
  formLabels: Dictionary["newsletterForm"];
  locale: Locale;
}) {
  const campaigns = await loadLatestIssues();
  const archiveHref = locale === "ar" ? "/ar/newsletter" : "/en/newsletter";

  return (
    <section className="w-full bg-[rgba(232,238,235,0.42)] py-[64px] lg:py-[96px]">
      <div className="shell flex flex-col items-center gap-[44px]">
        <Reveal className="flex w-full flex-col items-start gap-[12px]">
          <span className="badge">{dict.badge}</span>
          <h2 className="w-full text-start text-[26px] font-bold text-[var(--color-txt)] lg:text-[36px]">
            <span className="lg:hidden">{dict.titleMobile}</span>
            <span className="hidden lg:inline">{dict.titleDesktop}</span>
          </h2>
          <p className="w-full max-w-[660px] text-start text-[14px] leading-[normal] text-[var(--color-txt-dim)] lg:text-[16px]">
            <span className="lg:hidden">{dict.bodyMobile}</span>
            <span className="hidden lg:inline">{dict.bodyDesktop}</span>
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
                  <NewsletterCard campaign={campaign} locale={locale} />
                </Reveal>
              ))
            : dict.fallbackIssues.map((issue, i) => (
                <Reveal
                  key={issue.title}
                  delay={i * 80}
                  className="flex min-h-[130px] w-[280px] shrink-0 snap-start overflow-hidden rounded-[12px] border border-[rgba(35,110,91,0.11)] bg-white shadow-[0_10px_28px_-8px_rgba(16,54,45,0.12)] transition-shadow duration-200 hover:shadow-[0_16px_32px_-8px_rgba(16,54,45,0.18)] md:w-auto md:shrink"
                >
                  {/* The whole card is one link to the archive. */}
                  <Link
                    href={archiveHref}
                    className="flex w-full flex-1 flex-col items-start justify-between px-[20px] pt-[24px] pb-[20px] md:px-[26px] md:pt-[28px] md:pb-[24px]"
                  >
                    <h3 className="w-full text-start text-[17px] font-semibold leading-[normal] text-[var(--color-topic-title)]">
                      {issue.title}
                    </h3>
                    <span className="mt-[12px] flex items-center gap-[6px] text-[14px] font-medium leading-[22px] text-[var(--color-grad-end)]">
                      <span>{dict.readLabel}</span>
                      <Image
                        src="/figma/icon-arrow-read.svg"
                        alt=""
                        width={14}
                        height={14}
                        className="size-[14px]"
                      />
                    </span>
                  </Link>
                </Reveal>
              ))}
        </div>

        <Reveal>
          <Link
            href={archiveHref}
            className="flex items-center gap-[6px] text-[15px] font-medium text-[var(--color-grad-end)] transition-colors duration-200 hover:text-[var(--color-brand)]"
          >
            <span>{dict.viewAll}</span>
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
          <NewsletterSubscribeForm
            sourcepage="homepage"
            labels={{
              namePlaceholder: formLabels.namePlaceholder,
              emailPlaceholder: formLabels.emailPlaceholder,
              submitLabel: formLabels.submitLabel,
              submittingLabel: formLabels.submittingLabel,
              successMessage: formLabels.successMessage,
              errorFallback: formLabels.errorFallback,
              nameSrLabel: formLabels.nameSrLabel,
              emailSrLabel: formLabels.emailSrLabel,
            }}
          />
        </Reveal>
      </div>
    </section>
  );
}
