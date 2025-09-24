import { getTranslations } from "next-intl/server";
import { Locale } from "@/i18n/routing";
import NewsletterArchive from "@/app/components/NewsletterArchive";
import EnhancedNewsletterSubscribe from "@/app/components/EnhancedNewsletterSubscribe";
import { Metadata } from "next";

interface NewsletterPageProps {
  params: { locale: Locale };
}

// Generate metadata for SEO
export async function generateMetadata({ params: { locale } }: NewsletterPageProps): Promise<Metadata> {
  const t = await getTranslations("newsletterArchive");
  
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';

export default async function NewsletterPage({ params: { locale } }: NewsletterPageProps) {
  const t = await getTranslations("newsletterArchive");

  return (
    <div className="py-16 sm:py-20 lg:py-40 px-4 sm:px-6 lg:px-[4%] bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter Archive Header */}
        <div className="flex flex-col sm:flex-row items-start sm:justify-between mb-8 sm:mb-12">
          <div className="text-start max-w-[635px] mb-6 sm:mb-0">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
              {t("title")}
            </h2>
            <p className="text-xl sm:text-2xl text-primary-700 mb-6 sm:mb-0">
              {t("description")}
            </p>
          </div>
        </div>

        {/* Newsletter Archive Content */}
        <NewsletterArchive locale={locale} />
      </div>
    </div>
  );
}
