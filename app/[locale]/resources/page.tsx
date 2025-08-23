import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/app/sanity/live";
import { Locale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { FaBoxOpen, FaDownload, FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";

const RESOURCES_QUERY = defineQuery(`*[_type == "resource"]{
  name,
  title,
  category,
  description,
  author,
  license,
  externalUrl,
  file{
    asset->
  }
}`);

interface ResourcesPageProps {
  params: { locale: Locale };
}

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';

export default async function ResourcesPage({ params: { locale } }: ResourcesPageProps) {
  const { data: resources } = await sanityFetch({ query: RESOURCES_QUERY });
  const t = await getTranslations("resources");
  const t2 = await getTranslations("resources2");

  // Helper function to get localized content
  const getLocalizedContent = (obj: any, field: string) => {
    if (!obj || !obj[field]) return '';
    return typeof obj[field] === 'object' 
      ? obj[field][locale] || obj[field].en || obj[field]
      : obj[field];
  };

     // Group resources by category
   const groupedResources = resources?.reduce((acc: any, resource: any) => {
     const category = resource.category || 'other';
     if (!acc[category]) {
       acc[category] = [];
     }
     acc[category].push(resource);
     return acc;
   }, {}) || {};

   // Debug: Log all available categories and resources
   console.log('All available categories:', Object.keys(groupedResources));
   console.log('All resources:', resources?.map((r: any) => ({ name: r.name, category: r.category })));



     // Category order and titles
   const categoryOrder = ['mushafs', 'fonts', 'tafsir', 'translations', 'linguistics', 'linguistic', 'tajweed', 'audio', 'other'];
   const categoryTitles: { [key: string]: string } = {
     mushafs: t2("mushafs.title"),
     fonts: t2("fonts.title"),
     tafsir: t2("tafsir.title"),
     translations: t2("translations.title"),
     linguistics: t2("linguistics.title"),
     linguistic: t2("linguistics.title"), // Alternative spelling
     tajweed: t2("tajweed.title"),
     audio: t2("audio.title"),
     other: t2("other.title")
   };

  return (
    <section aria-label="Resources" className="py-16 sm:py-20 lg:py-40 px-4 sm:px-6 lg:px-[4%] bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:justify-between mb-8 sm:mb-12">
          <div className="text-start max-w-[635px] mb-6 sm:mb-0">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
              {t("badge")}
            </h2>
            <p className="text-xl sm:text-2xl text-primary-700 mb-6 sm:mb-0">
            {t("headline1")} {t("headline2")}
            </p>
          </div>
        </div>

      {/* Resources Grid */}
      <div className="w-full space-y-8">
        {categoryOrder.map((category) => {
          const categoryResources = groupedResources[category] || [];
          if (categoryResources.length === 0) return null;

          return (
            <div key={category}>
              <div className="bg-primary-800 text-white px-6 py-3 rounded-t-xl">
                <h2 className="text-lg">{categoryTitles[category]}</h2>
              </div>
              <div className="bg-white rounded-b-xl shadow-lg">
                <div className="grid grid-cols-1 divide-y divide-gray-200">
                                     {categoryResources.map((resource: any, itemIndex: number) => {
                     const title = getLocalizedContent(resource, 'title');
                     const description = getLocalizedContent(resource, 'description');
                     const author = getLocalizedContent(resource, 'author');
                     const license = resource.license || t2("resourceLicense");
                     
                     // Debug file data
                     console.log('Resource:', resource.name, 'File:', resource.file, 'File Asset:', resource.file?.asset);
                     
                     // More comprehensive file check
                     const hasFile = resource.file && resource.file.asset && (resource.file.asset._ref || resource.file.asset.url);
                     const hasExternalUrl = resource.externalUrl;
                     const isDownload = hasFile || (hasExternalUrl && hasExternalUrl.includes('/docs/'));
                     const shouldShowLink = hasFile || hasExternalUrl;
                     
                     // Always show download for files, visit for external URLs
                     let linkUrl = '#';
                     if (hasFile && resource.file?.asset) {
                       if (resource.file.asset._ref) {
                         linkUrl = `https://cdn.sanity.io/files/0tupxlj8/production/${resource.file.asset._ref.replace('file-', '').replace('-', '.')}`;
                       } else if (resource.file.asset.url) {
                         linkUrl = resource.file.asset.url;
                       }
                     } else if (hasExternalUrl) {
                       linkUrl = hasExternalUrl;
                     }
                     
                     // Debug link logic
                     console.log('Resource:', resource.name, 'hasFile:', hasFile, 'hasExternalUrl:', hasExternalUrl, 'shouldShowLink:', shouldShowLink, 'isDownload:', isDownload);

                    return (
                      <div key={itemIndex} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col gap-4">
                                                                                  <div className="flex items-start justify-between gap-4">
                               <h3 className="font-medium text-primary-900 text-lg">{title}</h3>
                               {(hasFile || hasExternalUrl) && (
                                                                <Link
                                   href={linkUrl}
                                   target="_blank"
                                   download={isDownload}
                                   rel="noopener noreferrer"
                                   className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 transition-colors flex-shrink-0"
                                 >
                                {isDownload ? (
                                  <>
                                    <FaDownload size={16} />
                                    <span className="hidden sm:inline">{t2("download")}</span>
                                  </>
                                ) : (
                                  <>
                                    <FaExternalLinkAlt size={16} />
                                    <span className="hidden sm:inline">{t2("visit")}</span>
                                  </>
                                )}
                              </Link>
                            )}
                          </div>
                          <p className="text-gray-600 leading-relaxed">
                            {description}
                          </p>
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
                            <div className="text-sm text-gray-500">
                              <span className="font-medium">{t2("tableHeader.author")}:</span> {author}
                            </div>
                            <div className="text-sm text-gray-500">
                              <span className="font-medium">{t2("tableHeader.license")}:</span>{" "}
                              <Link 
                                href={`/${locale}/blog/opensource-license`}
                                className="text-primary-600 hover:text-primary-800 transition-colors"
                              >
                                {license}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
}
