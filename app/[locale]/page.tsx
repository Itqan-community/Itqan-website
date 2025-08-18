import { getTranslations } from "next-intl/server";
import Link from "next/link";
import LinkBtn from "../components/LinkBtn";
import ForwardArrow from "../components/ForwardArrow";
import SEOKeywords from "../components/SEOKeywords";
import SafeImage from "../components/SafeImage";

import { FaDownload } from "react-icons/fa";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/app/sanity/live";
import { Locale } from "@/i18n/routing";
import { urlFor } from "../sanity/image";
import AnimatedHero from "../components/AnimatedHero";

// Partner data
const partners = [
  { name: "Nuqayah", image: "/images/partners/nuqayah.svg", href: "https://nuqayah.com" },
  { name: "GTAF", image: "/images/partners/gtaf.svg", href: "https://gtaf.org/" },
  { name: "MP3 Quran", image: "/images/partners/mp3quran.png", href: "https://mp3quran.net" },
  { name: "PakData", image: "/images/partners/pakdata.png", href: "https://pakdata.com" },
  { name: "Quran", image: "/images/partners/quran.avif", href: "https://quran.com" },
  { name: "QuranPedia", image: "/images/partners/quranpedia.avif", href: "https://quranpedia.net/" },
  { name: "Tafsir", image: "/images/partners/tafsir.avif", href: "https://tafsir.net" },
  { name: "Tarteel", image: "/images/partners/tarteel.png", href: "https://www.tarteel.ai" },
  { name: "Zad Group", image: "/images/partners/zadgroup.avif", href: "https://zadgroup.net/" },
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

// Force dynamic rendering for better performance
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

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
      <section 
        aria-label="Hero"
        className="flex flex-col items-center justify-center min-h-[calc(100vh-73px)] px-4 sm:px-6 lg:px-8 bg-[url('/images/home/hero-bg.avif')] bg-center bg-cover bg-no-repeat"
        style={{
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-semibold text-emerald-600 leading-tight">
            {t("title")}
          </h1>
          <p className="text-lg sm:text-xl  mt-4 text-emerald-900">{t("description")}</p>
          <p className="text-lg sm:text-xl  mb-8 sm:mb-10 text-emerald-900">{t("description2")}</p>
          <LinkBtn title={t("discord")} href={`https://discord.gg/24CskUbuuB`} target="_blank" locale={locale} />
        </div>
      </section>

      <section aria-label="Projects" className="py-16 sm:py-20 lg:py-40 px-4 sm:px-6 lg:px-[4%] bg-neutral-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-emerald-900 mb-4 sm:mb-6">
              {t("projects.title")}
            </h2>
            <p className="text-base sm:text-lg text-emerald-700 mb-6 sm:mb-8 max-w-3xl mx-auto">
              {t("projects.description")}
            </p>
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
                      className="group flex flex-col rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-neutral-300"
                      aria-label={`${title} - ${project.status === 'launched' ? t("projects.launched") : t("projects.inProgress")}`}
                    >
                      <div className="relative aspect-video">
                        <SafeImage
                          src={getImageUrl(project.image) || '/images/projects/default.jpg'}
                          alt={`${title} - ${description}`}
                          fill
                          className="object-cover rounded-xl border border-neutral-300"
                          priority={index === 0}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-neutral-100 gap-2">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-emerald-900">
                          {title}
                        </h3>
                        <div className="bg-emerald-800 opacity-60 text-white text-sm  px-2 py-0.5 rounded-full w-fit">
                          {project.status === 'launched' ? t("projects.launched") : t("projects.inProgress")}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="flex justify-center mt-8 sm:mt-12">
                <LinkBtn title={t("projects.exploreAll")} href={`/${locale}/projects`} variant="outline" locale={locale} />
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-neutral-600 text-lg">No projects available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-40 px-4 sm:px-6 lg:px-[4%] bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-emerald-900 mb-4">
              {t("library.title")}
            </h2>
            <p className="text-emerald-700 text-base sm:text-lg max-w-3xl">
              {t("library.description")}
            </p>
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
                     <div key={resource.name || `resource-${index}`} className="flex flex-col gap-2 p-4 sm:p-6 rounded-xl bg-white hover:shadow-xl shadow-neutral-200 transition-all duration-300 hover:-translate-y-1">
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
                       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-emerald-900 gap-2 mt-auto">
                         <div className="flex flex-col text-emerald-900 gap-2 mt-auto">
                           <div className="flex items-center gap-2">
                             <span className="text-sm text-neutral-500">{t2("tableHeader.author")}:</span>
                             <span className="text-sm text-neutral-500 font-medium">{author}</span>
                           </div>
                           <div className="flex items-center gap-2">
                             <span className="text-sm text-neutral-500">{t2("tableHeader.license")}:</span>
                             <Link 
                               href={`/${locale}/blog/opensource-license`}
                               className="text-sm font-medium text-emerald-600 hover:text-emerald-800 transition-colors"
                             >
                               {license}
                             </Link>
                           </div>
                         </div>
                         {isDownload ? (
                           <FaDownload size={16} />
                         ) : (
                           <ForwardArrow size={16} silent locale={locale} />
                         )}
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

          <div className="flex justify-center mt-8 sm:mt-12">
            <LinkBtn title={t("discoverResources")} href={`/${locale}/resources`} variant="outline" locale={locale} />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-40 px-4 sm:px-6 lg:px-[4%] bg-neutral-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-emerald-900 mb-4">
              {t("partners.title")}
            </h2>
            <p className="text-emerald-700 text-base sm:text-lg max-w-3xl whitespace-pre-line">
              {t("partners.description")}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {partners.map((partner, index) => (
              <Link
                key={index}
                href={partner.href}
                target="_blank"
                className="group"
                aria-label={`Visit ${partner.name}`}
              >
                <div className="w-32 sm:w-40 lg:w-48 h-20 sm:h-24 lg:h-28 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center justify-center p-4">
                  <SafeImage
                    src={partner.image}
                    alt={partner.name}
                    width={120}
                    height={80}
                    className="max-w-full max-h-full object-contain transition-all duration-300"
                    style={{ width: 'auto', height: 'auto' }}
                    loading="lazy"
                    sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 192px"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="faqs" className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-2 mb-8 sm:mb-12">
            <p className="text-lg sm:text-xl font-medium text-emerald-900 text-center">
              {t("faqs.title")}
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-emerald-600 text-center">
              {t("faqs.subtitle")}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <details className="border-b border-neutral-200">
              <summary className="flex items-center justify-between py-4 sm:py-6 cursor-pointer hover:bg-neutral-50 transition-colors">
                <h3 className="text-base sm:text-lg font-medium text-emerald-900 pr-4">
                  {t("faqs.questions.join.title")}
                </h3>
                <div className="text-emerald-700 flex-shrink-0">
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
                <h3 className="text-base sm:text-lg font-medium text-emerald-900 pr-4">
                  {t("faqs.questions.support.title")}
                </h3>
                <div className="text-emerald-700 flex-shrink-0">
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
                <h3 className="text-base sm:text-lg font-medium text-emerald-900 pr-4">
                  {t("faqs.questions.topics.title")}
                </h3>
                <div className="text-emerald-700 flex-shrink-0">
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

      <section className="py-12 sm:py-16 bg-white px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-lg sm:text-xl text-emerald-900 mb-4 font-semibold font-rubik">
              {t("community.title")}
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-emerald-600 font-doran leading-normal">
              {t("community.subtitle1")}
              <br />
              {t("community.subtitle2")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <div className="text-emerald-900 text-center  pb-4 border-b border-neutral-200 text-sm sm:text-base">
              {t("community.points.resources")}
            </div>
            
            <div className="text-emerald-900 text-center  pb-4 border-b border-neutral-200 text-sm sm:text-base">
              {t("community.points.development")}
            </div>

            <div className="text-emerald-900 text-center  pb-4 border-b border-neutral-200 text-sm sm:text-base">
              {t("community.points.review")}
            </div>

            <div className="text-emerald-900 text-center  pb-4 border-b border-neutral-200 text-sm sm:text-base">
              {t("community.points.ux")}
            </div>

            <div className="text-emerald-900 text-center  text-sm sm:text-base">
              {t("community.points.solo")}
            </div>

            <div className="text-emerald-900 text-center  text-sm sm:text-base">
              {t("community.points.growth")}
            </div>
          </div>

          <div className="text-center mt-8 sm:mt-12 flex justify-center">
            <LinkBtn title={t("community.cta")} href={`https://discord.gg/24CskUbuuB`} target="_blank" variant="outline" locale={locale} />
          </div>
        </div>
      </section>
    </>
  );
}
