"use client";

import { MailerLiteCampaign } from "@/app/utils/mailerlite";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface NewsletterCardProps {
  campaign: MailerLiteCampaign;
  locale: string;
}

export default function NewsletterCard({ campaign, locale }: NewsletterCardProps) {
  const t = useTranslations("newsletterArchive");
  
  // Get the primary email for the campaign
  const primaryEmail = campaign.emails[0];
  
  // Arabic numeral characters (٠-٩)
  const toArabicNumerals = (str: string) =>
    str.replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);

  const dateOpts = { year: 'numeric' as const, month: 'long' as const, day: 'numeric' as const };

  // Hijri first, then Miladi (Gregorian)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const hijriOptions = { ...dateOpts, calendar: 'islamic-umalqura' as const };
    const hijri =
      locale === 'ar'
        ? toArabicNumerals(new Intl.DateTimeFormat('ar-SA', hijriOptions).format(date))
        : new Intl.DateTimeFormat('en-US', hijriOptions).format(date);
    const miladi =
      locale === 'ar'
        ? toArabicNumerals(new Intl.DateTimeFormat('ar-SA', dateOpts).format(date))
        : new Intl.DateTimeFormat('en-US', dateOpts).format(date);
    return `${hijri} / ${miladi}`;
  };

  // Get preview URL or create a fallback
  const getNewsletterUrl = () => {
    if (primaryEmail?.preview_url) {
      return primaryEmail.preview_url.replace("preview.mailerlite.com", "bareed.itqan.dev");
    }
    // Fallback to a generic newsletter view URL if preview is not available
    return `https://bareed.itqan.dev/campaigns/${campaign.id}`;
  };

  const updateUrlWithBareedDomain = (url: string) => {
    return url.replace("preview.mailerlite.io", "bareed.itqan.dev");
  };

  return (
    <div className="group bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 hover:shadow-lg hover:border-primary-200 transition-all duration-300 hover-lift h-full">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="mb-4">
          <h3 className="font-bold text-lg text-primary-900 mb-2 group-hover:text-primary-700 transition-colors">
            {primaryEmail.subject}
          </h3>
          <p className="text-xs text-neutral-600">
            {campaign.name} {t("publishedOn")} {formatDate(campaign.scheduled_for ?? campaign.created_at)}
          </p>
        </div>

        {/* Subject line if available */}
        {primaryEmail?.subject && (
          <div className="mt-auto mb-4">
            <p className="text-neutral-700 leading-relaxed line-clamp-3">
              {campaign.id === "163894378917528820"
                ? "رحلة إتقان تبدأ من تحدي التطبيقات القرآنية.. قصص وأدوات تفتح آفاقًا جديدة للمطورين 🌍📱"
                : campaign.id === "165600823697475277"
                  ? "من ترتيل و”باحوث” إلى Quran Tab.. ابتكارات تضع التقنيات القرآنية في صدارة المشهد 🚀📖"
                  : primaryEmail.preheader}
            </p>
          </div>
        )}


        {/* Action button */}
        {primaryEmail.preview_url && (
        <div className="">
          <Link
            href={updateUrlWithBareedDomain(primaryEmail.preview_url)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 hover-lift text-sm"
          >
            {t("readNewsletter")}
            <svg 
              className={`w-4 h-4 ${locale === 'ar' ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6l6 6-6 6" />
            </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
