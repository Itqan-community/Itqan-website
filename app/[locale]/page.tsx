import { getTranslations } from "next-intl/server";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/app/sanity/live";
import { Locale } from "@/i18n/routing";
import { urlFor } from "../sanity/image";
import Link from "next/link";
import LinkBtn from "../components/LinkBtn";
import ForwardArrow from "../components/ForwardArrow";
import SEOKeywords from "../components/SEOKeywords";
import SafeImage from "../components/SafeImage";
import LazySection from "../components/LazySection";
import dynamicImport from "next/dynamic";

// Dynamically import AnimatedHero to reduce initial bundle size /
const AnimatedHero = dynamicImport(() => import("../components/AnimatedHero"), {
  loading: () => (
    <div className="h-[100vh] bg-gradient-to-br from-primary-50 to-primary-100 animate-pulse" />
  ),
  ssr: false // This component requires client-side features
});


// Partner data
const partners = [
  { name: "Islamic Content", image: "/images/partners/islamiccontent.svg", href: "https://islamiccontent.org/" },
  { name: "Maknon", image: "/images/partners/maknon.png", href: "https://maknon.org.sa/" },
  { name: "Tafsir", image: "/images/partners/tafsir.avif", href: "https://tafsir.net" },
  { name: "Al Borhan", image: "/images/partners/alborhan.png", href: "https://alborhan.sa" },
  { name: "Quran", image: "/images/partners/quran.avif", href: "https://quran.com" },
  { name: "Tarteel", image: "/images/partners/tarteel.svg", href: "https://www.tarteel.ai" },
  { name: "QuranPedia", image: "/images/partners/quranpedia.avif", href: "https://quranpedia.net/" },
  { name: "Nuqayah", image: "/images/partners/nuqayah.svg", href: "https://nuqayah.com" },
  { name: "Zad Group", image: "/images/partners/zadgroup.avif", href: "https://zadgroup.net/" },
  { name: "PakData", image: "/images/partners/pakdata.svg", href: "https://pakdata.com" },
  { name: "GTAF", image: "/images/partners/gtaf.svg", href: "https://gtaf.org/" },
  { name: "MP3 Quran", image: "/images/partners/mp3quran.png", href: "https://mp3quran.net" },
];

const PROJECTS_QUERY = defineQuery(`*[_type == "project" && (slug.current == "quran-apps-directory" || slug.current == "content-management-system")]{
  name,
  slug,
  title,
  description,
  status,
  image{
    _type,
    alt,
    caption,
    asset->
  }
}`);

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

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';

export default async function Home({ params: { locale } }: { params: { locale: Locale } }) {
  const t = await getTranslations("home");
  const t2 = await getTranslations("resources2");
  
  // Fetch data in parallel for better performance
  const [projectsResult, resourcesResult] = await Promise.all([
    sanityFetch({ query: PROJECTS_QUERY }),
    sanityFetch({ query: RESOURCES_QUERY })
  ]);
  
  const { data: projects } = projectsResult;
  const { data: resources } = resourcesResult;

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

  // Filter and validate the fetched projects
  const validProjects = Array.isArray(projects) 
    ? projects.filter((project: any) => project && project.name && project.title)
    : [];

  // Sort projects: launched first, then in-progress
  const sortedProjects = validProjects
    .sort((a: any, b: any) => {
      if (a.status === 'launched' && b.status !== 'launched') return -1;
      if (a.status !== 'launched' && b.status === 'launched') return 1;
      return 0;
    });

  return (
    <>
      <SEOKeywords />
      <AnimatedHero locale={locale} />

      <section aria-label="Projects" className="py-16 sm:py-20 lg:py-40 px-4 sm:px-6 lg:px-[4%] bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:justify-between mb-8 sm:mb-12">
            <div className="text-start max-w-[635px] mb-6 sm:mb-0">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
                {t("projects.title")}
              </h2>
              <p className="text-xl sm:text-2xl text-primary-700 mb-6 sm:mb-0">
                {t("projects.description")}
              </p>
            </div>
            <div className="w-full sm:w-auto">
              <LinkBtn title={t("projects.exploreAll")} href={`/${locale}/projects`} variant="outline" locale={locale} />
            </div>
          </div>

          {sortedProjects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
                {sortedProjects.map((project: any, index: number) => {
                  const title = typeof project.title === 'object' 
                    ? project.title[locale] || project.title.en 
                    : project.title || 'Project';
                  const description = typeof project.description === 'object'
                    ? project.description[locale] || project.description.en
                    : project.description || '';

                  return (
                    <Link 
                      key={project.slug?.current || project.name || `project-${index}`}
                      href={`/${locale}/projects/${project.slug?.current || project.name}`}
                      className="flex flex-col rounded-xl overflow-hidden group"
                      aria-label={`${title} - ${project.status === 'launched' ? t("projects.launched") : t("projects.inProgress")}`}
                    >
                      <div className="relative aspect-video overflow-hidden rounded-[20px] cursor-pointer">
                        <SafeImage
                          src={getImageUrl(project.image) || '/images/projects/default.jpg'}
                          alt={`${title} - ${description}`}
                          fill
                          className="object-cover rounded-[20px] transition-transform duration-300 group-hover:scale-110"
                          priority={index === 0}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                                             <div className="flex flex-col sm:flex-col items-start p-4 bg-neutral-50 gap-2">
                          <div className={`text-white text-sm px-2 py-0.5 rounded-full w-fit ${
                            project.status === 'launched' 
                              ? 'bg-green-600' 
                              : 'bg-yellow-600'
                          }`}>
                            {project.status === 'launched' ? t("projects.launched") : t("projects.inProgress")}
                          </div>
                          <h3 className="text-lg sm:text-xl lg:text-3xl font-semibold text-primary-900">
                            {title}
                          </h3>
                        </div>
                    </Link>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-neutral-600 text-lg">No projects available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      <section className="pb-16 sm:pb-20 lg:pb-40 px-4 sm:px-6 lg:px-[4%] bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:justify-between mb-8 sm:mb-12">
            <div className="text-start max-w-[635px] mb-6 sm:mb-0">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
                {t("library.title")}
              </h2>
              <p className="text-xl sm:text-2xl text-primary-700 mb-6 sm:mb-0">
                {t("library.description")}
              </p>
            </div>
            <div className="w-full sm:w-auto">
              <LinkBtn title={t("discoverResources")} href={`/${locale}/resources`} variant="outline" locale={locale} />
            </div>
          </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
             {Array.isArray(resources) && resources.length > 0 ? (
               resources
                 .slice(0, 2)
                 .map((resource: any, index: number) => {
                   const title = typeof resource.title === 'object' 
                     ? resource.title[locale] || resource.title.en 
                     : resource.title || 'Resource';
                   const description = typeof resource.description === 'object'
                     ? resource.description[locale] || resource.description.en
                     : resource.description || '';
                   const author = typeof resource.author === 'object'
                     ? resource.author[locale] || resource.author.en
                     : resource.author || '';
                   const license = typeof resource.license === 'object'
                     ? resource.license[locale] || resource.license.en
                     : resource.license || '';
                   // Determine if it's a download or external link
                   const isDownload = resource.file && resource.file.asset;
                   const link = isDownload 
                     ? resource.file.asset.url 
                     : (resource.externalUrl || '');

                   return (
                     <div key={resource.name || `resource-${index}`} className="flex flex-col gap-2 p-4 sm:p-6 rounded-xl bg-white cursor-pointer group">
                       <Link 
                         href={link} 
                         target="_blank" 
                         download={isDownload}
                         className="flex flex-col gap-2"
                       >
                         <h4 className="text-lg sm:text-xl font-semibold mb-2">{title}</h4>
                         <p className="text-neutral-600 text-sm sm:text-base font-medium leading-relaxed mb-4">
                           {description}
                         </p>
                       </Link>
                       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-primary-900 gap-2 mt-auto">
                         <div className="flex flex-col text-primary-900 gap-2 mt-auto">
                           <div className="flex items-center gap-2">
                             <span className="text-sm text-neutral-500">{t2("tableHeader.author")}:</span>
                             <span className="text-sm text-neutral-500 font-medium">{author}</span>
                           </div>
                           <div className="flex items-center gap-2">
                             <span className="text-sm text-neutral-500">{t2("tableHeader.license")}:</span>
                             <Link 
                               href={`/${locale}/blog/opensource-license`}
                               className="text-sm font-medium text-primary-600 hover:text-primary-800 transition-colors"
                             >
                               {license}
                             </Link>
                           </div>
                         </div>
                         <div className={`transition-transform duration-300 ${locale === 'ar' ? 'group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`}>
                           <ForwardArrow size={16} locale={locale} />
                         </div>
                       </div>
                     </div>
                   );
                 })
             ) : (
               <div className="col-span-2 text-center py-12">
                 <p className="text-neutral-600 text-lg">No resources available at the moment.</p>
               </div>
             )}
           </div>
        </div>
      </section>

      <LazySection 
        className="pt-16 sm:pt-20 lg:pt-40 bg-white"
        fallback={
          <div className="pt-16 sm:pt-20 lg:pt-40 bg-white">
            <div className="mx-auto px-4 sm:px-6 lg:px-[4%]">
              <div className="h-40 animate-pulse bg-gray-100 rounded mb-8"></div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-[200px] animate-pulse bg-gray-100 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        }
      >
        <section>
          <div className="mx-auto">
            <div className="flex flex-col items-center text-center mb-8 sm:mb-12 px-4 sm:px-6 lg:px-[4%]">
              <div className="max-w-[635px]">
                <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-neutral-900 mb-4">
                  {t("partners.title")}
                </h2>
                <p className="text-xl sm:text-2xl text-primary-700">
                  {t("partners.description")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-0 border border-neutral-200 border-b-0 shadow-[inset_0_-1px_0_0_#e5e5e5]">
              {partners.map((partner, index) => (
                <Link
                  key={index}
                  href={partner.href}
                  target="_blank"
                  className={`group bg-white border-e border-b border-neutral-200 `}
                  aria-label={`Visit ${partner.name}`}
                >
                  <div className="h-[200px] flex items-center justify-center overflow-hidden">
                    <SafeImage
                      src={partner.image}
                      alt={partner.name}
                      width={96}
                      height={64}
                      className="w-1/2 h-1/2 object-contain transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                      sizes="(max-width: 640px) 48px, (max-width: 768px) 60px, 96px"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </LazySection>

      <section className="py-16 sm:py-20 lg:py-40 px-4 sm:px-6 lg:px-[4%] bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
            <div className="max-w-[635px]">
              <p className="text-xl sm:text-2xl text-primary-700 mb-4">
                {t("community.title")}
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-neutral-900">
                {t("community.subtitle1")}
                <br />
                {t("community.subtitle2")}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <div className="text-primary-900 font-semibold opacity-80 text-center  pb-4 border-b border-neutral-200 text-sm sm:text-base">
              {t("community.points.resources")}
            </div>
            
            <div className="text-primary-900 font-semibold opacity-80 text-center  pb-4 border-b border-neutral-200 text-sm sm:text-base">
              {t("community.points.development")}
            </div>

            <div className="text-primary-900 font-semibold opacity-80 text-center  pb-4 border-b border-neutral-200 text-sm sm:text-base">
              {t("community.points.review")}
            </div>

            <div className="text-primary-900 font-semibold opacity-80 text-center  pb-4 border-b border-neutral-200 text-sm sm:text-base">
              {t("community.points.ux")}
            </div>

            <div className="text-primary-900 font-semibold opacity-80 text-center  text-sm sm:text-base">
              {t("community.points.solo")}
            </div>

            <div className="text-primary-900 font-semibold opacity-80 text-center  text-sm sm:text-base">
              {t("community.points.growth")}
            </div>
          </div>

          {/* Community Join Section */}
          {/* <div className="mt-16 sm:mt-20 flex items-center justify-center gap-6 sm:gap-8"> */}
            {/* Member Count */}
            {/* <div className="flex items-center">
              <p className="font-semibold ">
                {locale === 'ar' ? '+ ١٥٠٠ عضو' : '+ 1,500 members'}
              </p>
            </div> */}

            {/* Profile Images - Middle (Overlapping) */}
            {/* <div className={`flex items-center ${locale === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-white shadow-md">
                <SafeImage 
                  src="https://framerusercontent.com/images/YdxSIdS9T4Qcehm3obXdZS78I.jpg" 
                  alt="Community member" 
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-white shadow-md -ml-2 sm:-ml-3">
                <SafeImage 
                  src="https://framerusercontent.com/images/RMGqFGBG4fl8mGaHLZFtZkZdk.jpg" 
                  alt="Community member" 
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-white shadow-md -ml-2 sm:-ml-3">
                <SafeImage 
                  src="https://framerusercontent.com/images/npcY47BF91ZeTvivxEV3VEVQcg.jpg" 
                  alt="Community member" 
                  width={56}
                  height={56}
                  className="w-full h-full object-cover object-left"
                  loading="lazy"
                />
              </div>
            </div> */}

            {/* Join Link */}
            {/* <div className="flex items-center">
              <LinkBtn 
                title={locale === 'ar' ? 'انضم للمجتمع' : 'Join Community'} 
                href="https://community.itqan.dev" 
                target="_blank" 
                variant="text" 
                locale={locale} 
              />
            </div>
          </div> */}
        </div>
      </section>

      <section id="faqs" className="py-16 sm:py-20 lg:py-40 px-4 sm:px-6 lg:px-[4%] bg-white">
        <div className="max-w-4xl mx-auto">
                      <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
              <div className="max-w-[635px]">
                <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-neutral-900 mb-4">
                  {t("faqs.title")}
                </h2>
                <p className="text-xl sm:text-2xl text-primary-700">
                  {t("faqs.subtitle")}
                </p>
              </div>
            </div>

          <div className="max-w-3xl mx-auto">
            <details className="border-b border-neutral-200">
              <summary className="flex items-center justify-between py-4 sm:py-6 cursor-pointer hover:bg-neutral-50 transition-colors">
                <h3 className="text-base sm:text-lg font-medium text-primary-900 pr-4">
                  {t("faqs.questions.join.title")}
                </h3>
                <div className="text-primary-700 flex-shrink-0">
                  <svg viewBox="0 0 24 24" width="20" height="20" className="sm:w-6 sm:h-6">
                    <path fill="currentColor" d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"/>
                  </svg>
                </div>
              </summary>
              <div className="pb-4 sm:pb-6 text-neutral-600 text-sm sm:text-base">
                {t("faqs.questions.join.answer")}
              </div>
            </details>

            <details className="border-b border-neutral-200">
              <summary className="flex items-center justify-between py-4 sm:py-6 cursor-pointer hover:bg-neutral-50 transition-colors">
                <h3 className="text-base sm:text-lg font-medium text-primary-900 pr-4">
                  {t("faqs.questions.support.title")}
                </h3>
                <div className="text-primary-700 flex-shrink-0">
                  <svg viewBox="0 0 24 24" width="20" height="20" className="sm:w-6 sm:h-6">
                    <path fill="currentColor" d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"/>
                  </svg>
                </div>
              </summary>
              <div className="pb-4 sm:pb-6 text-neutral-600 text-sm sm:text-base">
                {t("faqs.questions.support.answer")}
              </div>
            </details>

            <details>
              <summary className="flex items-center justify-between py-4 sm:py-6 cursor-pointer hover:bg-neutral-50 transition-colors">
                <h3 className="text-base sm:text-lg font-medium text-primary-900 pr-4">
                  {t("faqs.questions.topics.title")}
                </h3>
                <div className="text-primary-700 flex-shrink-0">
                  <svg viewBox="0 0 24 24" width="20" height="20" className="sm:w-6 sm:h-6">
                    <path fill="currentColor" d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"/>
                  </svg>
                </div>
              </summary>
              <div className="pb-4 sm:pb-6 text-neutral-600 text-sm sm:text-base">
                {t("faqs.questions.topics.answer")}
              </div>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
