import Link from "next/link";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/app/sanity/live";
import { Locale } from "@/i18n/routing";
import Image from "next/image";
import { urlFor } from "../../sanity/image";
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

  // Split articles into featured (first 3) and regular articles
  const featuredArticles = articles.slice(0, 3);
  const regularArticles = articles.slice(3);

  // Helper function to render an article card
  const renderArticleCard = (article: any, size: 'small' | 'large' = 'small') => {
    const title = getLocalizedContent(article?.title);
    const subtitle = getLocalizedContent(article?.subtitle);
    const description = getLocalizedContent(article?.description);
    const imageUrl = getImageUrl(article?.image);

    if (size === 'large') {
      return (
        <Link 
          key={article?.slug?.current}
          href={`/${locale}/articles/${article?.slug?.current}`}
          className="group flex flex-col h-full"
        >
          {imageUrl && (
            <div className="relative w-full flex-grow overflow-hidden rounded-[20px] mb-4">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover rounded-[20px] transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 40vw"
              />
            </div>
          )}
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-primary-900 text-xl sm:text-2xl lg:text-3xl">
              {title}
            </h4>
            <p className="text-neutral-600 text-base sm:text-lg">
              {description}
            </p>
          </div>
        </Link>
      );
    }

    return (
      <Link 
        key={article?.slug?.current}
        href={`/${locale}/articles/${article?.slug?.current}`}
        className="group flex flex-col h-full"
      >
        {imageUrl && (
          <div className="relative w-full overflow-hidden rounded-[20px] mb-4 aspect-video">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover rounded-[20px] transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 30vw"
            />
          </div>
        )}
        <div className="flex flex-col gap-2 flex-grow">
          <h4 className="font-semibold text-primary-900 text-lg sm:text-xl">
            {title}
          </h4>
          <p className="text-neutral-600 text-sm sm:text-base">
            {description}
          </p>
        </div>
      </Link>
    );
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

        {/* Featured Articles Section */}
        {featuredArticles.length > 0 && (
          <div className="mb-16 sm:mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* First column: 1/3 width - contains first 2 articles */}
              <div className="lg:col-span-1 flex flex-col gap-6">
                {featuredArticles.slice(0, 2).map((article: any) => renderArticleCard(article, 'small'))}
              </div>
              
              {/* Second column: 2/3 width - contains the 3rd article */}
              {featuredArticles[2] && (
                <div className="lg:col-span-2">
                  {renderArticleCard(featuredArticles[2], 'large')}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Regular Articles Section */}
        {regularArticles.length > 0 && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {regularArticles.map((article: any) => renderArticleCard(article, 'small'))}
            </div>
          </div>
        )}

        {/* Show all articles in regular grid if less than 3 articles total */}
        {articles.length > 0 && articles.length < 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {articles.map((article: any) => renderArticleCard(article, 'small'))}
          </div>
        )}
      </div>
    </section>
  );
}
