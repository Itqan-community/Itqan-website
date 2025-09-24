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
  
  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  // Get preview URL or create a fallback
  const getNewsletterUrl = () => {
    if (primaryEmail?.preview_url) {
      return primaryEmail.preview_url;
    }
    // Fallback to a generic newsletter view URL if preview is not available
    return `https://preview.mailerlite.com/campaigns/${campaign.id}`;
  };

  return (
    <div className="group bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 hover:shadow-lg hover:border-primary-200 transition-all duration-300 hover-lift h-full">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="mb-4">
          <h3 className="font-bold text-xl text-primary-900 mb-2 group-hover:text-primary-700 transition-colors">
            {campaign.name}
          </h3>
          <p className="text-sm text-neutral-600">
            {t("publishedOn")} {formatDate(campaign.finished_at || campaign.created_at)}
          </p>
        </div>

        {/* Subject line if available */}
        {primaryEmail?.subject && (
          <div className="mb-4">
            <p className="text-neutral-700 leading-relaxed line-clamp-2">
              {primaryEmail.subject}
            </p>
          </div>
        )}


        {/* Action button */}
        <div className="mt-auto pt-4">
          <Link
            href={getNewsletterUrl()}
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
      </div>
    </div>
  );
}
