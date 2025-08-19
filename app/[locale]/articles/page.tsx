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

export default async function ArticlesPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
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

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto bg-neutral-100 flex flex-col items-center" id="articles">
      <div className="w-full flex flex-col items-start mb-8 sm:mb-12">
        <div className="flex flex-col items-start gap-4 mb-6">
          <div className="flex items-center max-w-max px-3 py-1 rounded-full gap-2 text-neutral-100 bg-neutral-900">
            <span className="text-sm font-medium rounded-full">{t("badge")}</span>
          </div>
          <div className="flex flex-col gap-2 items-start">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary-900 text-start leading-relaxed">
              {t("headline1")} <br /> {t("headline2")}
            </h1>
          </div>
        </div>
      </div>
      
      {/* Articles cards */}
      <div className="w-full flex flex-col gap-6 sm:gap-8">
        {articles.map((article: any) => {
          // Extract localized content
          const title = typeof article?.title === 'object' 
            ? article.title[locale] || article.title.ar || article.title.en || ''
            : article?.title || '';
          
          const subtitle = typeof article?.subtitle === 'object'
            ? article.subtitle[locale] || article.subtitle.ar || article.subtitle.en || ''
            : article?.subtitle || '';
          
          const description = typeof article?.description === 'object'
            ? article.description[locale] || article.description.ar || article.description.en || ''
            : article?.description || '';

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
    </section>
  );
}
