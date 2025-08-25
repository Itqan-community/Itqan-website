import Link from "next/link";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/app/sanity/live";
import { Locale } from "@/i18n/routing";
import Image from "next/image";
import { urlFor } from "../../sanity/image";
import ForwardArrow from "../../components/ForwardArrow";
import { getTranslations } from "next-intl/server";

const ARTICLES_QUERY = defineQuery(`*[_type == "article"]{
  name,
  slug,
  title,
  subtitle,
  description,
  image{
    _type,
    alt,
    caption,
    asset->
  }
}`);

interface ArticlesPageProps {
  params: { locale: Locale };
}

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';

export default async function ArticlesPage({ params: { locale } }: ArticlesPageProps) {
  const { data: articles } = await sanityFetch({ query: ARTICLES_QUERY });
  const t = await getTranslations("articles");

  // Helper function to safely get image URL
  const getImageUrl = (image: any) => {
    try {
      if (!image || !image.asset) return null;
      return urlFor(image).url();
    } catch (error) {
      console.error('Error generating image URL:', error);
      return null;
    }
  };

  // Helper function to safely extract localized content
  const getLocalizedContent = (content: string | { [key: string]: string } | undefined) => {
    if (!content) return '';
    if (typeof content === 'string') return content;
    return content[locale] || content.ar || content.en || '';
  };

  return (
    <section aria-label="Articles" className="py-16 sm:py-20 lg:py-40 px-4 sm:px-6 lg:px-[4%] bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:justify-between mb-8 sm:mb-12">
          <div className="text-start max-w-[635px] mb-6 sm:mb-0">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
              {t('badge')}
            </h2>
            <p className="text-xl sm:text-2xl text-primary-700 mb-6 sm:mb-0">
              {t("headline1")} {t("headline2")}
            </p>
          </div>
        </div>

        {/* Articles cards */}
        <div className="w-full flex flex-col gap-6 sm:gap-8">
          {articles.map((article: any) => {
            const title = getLocalizedContent(article?.title);
            const subtitle = getLocalizedContent(article?.subtitle);
            const description = getLocalizedContent(article?.description);
            const imageUrl = getImageUrl(article?.image);

            return (
              <Link 
                key={article?.slug?.current}
                href={`/${locale}/articles/${article?.slug?.current}`}
                className="group flex flex-col rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 w-full max-w-3xl"
              >
                {imageUrl && (
                  <div className="relative aspect-video w-full">
                    <Image
                      src={imageUrl}
                      alt={title}
                      fill
                      className="object-cover rounded-xl"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 70vw"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-2 py-4 sm:py-6 px-4 sm:px-6 items-start">
                  <div className="flex items-center justify-between gap-2 mb-2 w-full">
                    <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold text-primary-900">
                      {title}
                    </h4>
                    <ForwardArrow silent size={22} locale={locale} />
                  </div>
                  <p className="text-basic text-neutral-600">
                    {description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
