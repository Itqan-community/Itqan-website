import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import LinkBtn from "../components/LinkBtn";
import ForwardArrow from "../components/ForwardArrow";

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations("home");
  return (
    <>
      <section 
        aria-label="Hero"
        className="flex flex-col items-center justify-center min-h-[calc(100vh-73px)] px-4 sm:px-6 lg:px-8 bg-[url('/home-hero.avif')] bg-center bg-cover bg-no-repeat bg-[#81ffb8]/50 bg-blend-overlay"
      >
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold text-[#6bb38b] leading-tight">
            {t("title")}
          </h1>
          <p className="text-lg sm:text-xl font-semibold mt-4">{t("description")}</p>
          <p className="text-lg sm:text-xl font-semibold mb-8 sm:mb-10">{t("description2")}</p>
          <LinkBtn title={t("discord")} href={`https://discord.gg/24CskUbuuB`} target="_blank" locale={locale} />
        </div>
      </section>

      <section aria-label="Projects" className="py-16 sm:py-20 lg:py-40 px-4 sm:px-6 lg:px-[4%] bg-neutral-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-900 mb-4 sm:mb-6">
              {t("projects.title")}
            </h2>
            <p className="text-base sm:text-lg text-emerald-700 mb-6 sm:mb-8 max-w-3xl mx-auto">
              {t("projects.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
            <Link 
              href={`/${locale}/projects/elevating-quranic-apps-search-experience`}
              className="group flex flex-col rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-neutral-300"
              aria-label={`${t("projects.searchExperience")} - ${t("projects.inProgress")}`}
            >
              <div className="relative aspect-video">
                <Image
                  src="/home-projects-1.avif"
                  alt={`${t("projects.searchExperience")} - Project to enhance search functionality in Quran applications`}
                  fill
                  className="object-cover rounded-xl border border-neutral-300"
                  priority
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-neutral-100 gap-2">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-emerald-900">
                  {t("projects.searchExperience")}
                </h3>
                <div className="bg-emerald-800 opacity-60 text-white text-sm font-semibold px-2 py-0.5 rounded-full w-fit">
                  {t("projects.inProgress")}
                </div>
              </div>
            </Link>

            <Link
              href={`/${locale}/projects/quran-apps-directory`}
              className="group flex flex-col rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-neutral-300"
              aria-label={`${t("projects.quranAppsDirectory.title")} - ${t("projects.launched")}`}
            >
              <div className="relative aspect-video">
                <Image
                  src="/home-projects-2.avif"
                  alt={`${t("projects.quranAppsDirectory.title")} - A comprehensive directory of Quran applications`}
                  fill
                  className="object-cover rounded-xl border border-neutral-300"
                  priority
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-neutral-100 gap-2">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-emerald-900">
                  {t("projects.quranAppsDirectory.title")}
                </h3>
                <div className="bg-emerald-800 opacity-60 text-white text-sm font-semibold px-2 py-0.5 rounded-full w-fit">
                  {t("projects.launched")}
                </div>
              </div>
            </Link>
          </div>

          <div className="flex justify-center mt-8 sm:mt-12">
            <LinkBtn title={t("projects.exploreAll")} href={`/${locale}/projects`} variant="outline" locale={locale} />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-40 px-4 sm:px-6 lg:px-[4%] bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-900 mb-4">
              {t("library.title")}
            </h2>
            <p className="text-emerald-700 text-base sm:text-lg max-w-3xl">
              {t("library.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <Link
              href={`/${locale}/resources/recitation`}
              className="flex flex-col rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative aspect-video">
                <Image
                  src="/home-lib-1.avif"
                  alt={t("library.recitation.title")}
                  fill
                  className="object-cover rounded-xl border border-neutral-300"
                />
              </div>
              <div className="flex flex-col gap-2 p-4 sm:py-6">
                <div className="flex items-center gap-2 justify-between">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-emerald-900">
                    {t("library.recitation.title")}
                  </h3>
                  <div className="text-emerald-600">
                    <ForwardArrow silent locale={locale} />
                  </div>
                </div>
                <p className="text-neutral-600 text-sm sm:text-base">
                  {t("library.recitation.description")}
                </p>
              </div>
            </Link>

            <Link
              href={`/${locale}/resources/mushaf-fonts`}
              className="flex flex-col rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative aspect-video">
                <Image
                  src="/home-lib-2.avif"
                  alt={t("library.mushafFonts.title")}
                  fill
                  className="object-cover rounded-xl object-[50%_28%] border border-neutral-300"
                />
              </div>
              <div className="flex flex-col gap-2 p-4 sm:py-6">
                <div className="flex items-center gap-2 justify-between">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-emerald-900">
                    {t("library.mushafFonts.title")}
                  </h3>
                  <div className="text-emerald-600">
                    <ForwardArrow silent locale={locale} />
                  </div>
                </div>
                <p className="text-neutral-600 text-sm sm:text-base">
                  {t("library.mushafFonts.description")}
                </p>
              </div>
            </Link>

            <Link
              href={`/${locale}/resources/tafseer`}
              className="flex flex-col rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative aspect-video">
                <Image
                  src="/home-lib-3.avif"
                  alt={t("library.tafseer.title")}
                  fill
                  className="object-cover rounded-xl border border-neutral-300"
                />
              </div>
              <div className="flex flex-col gap-2 p-4 sm:py-6">
                <div className="flex items-center gap-2 justify-between">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-emerald-900">
                    {t("library.tafseer.title")}
                  </h3>
                  <div className="text-emerald-600">
                    <ForwardArrow silent locale={locale} />
                  </div>
                </div>
                <p className="text-neutral-600 text-sm sm:text-base">
                  {t("library.tafseer.description")}
                </p>
              </div>
            </Link>

            <Link
              href={`/${locale}/resources/digital-mushaf-layout`}
              className="flex flex-col rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative aspect-video">
                <Image
                  src="/home-lib-4.avif"
                  alt={t("library.digitalMushaf.title")}
                  fill
                  className="object-cover rounded-xl border border-neutral-300"
                />
              </div>
              <div className="flex flex-col gap-2 p-4 sm:py-6">
                <div className="flex items-center gap-2 justify-between">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-emerald-900">
                    {t("library.digitalMushaf.title")}
                  </h3>
                  <div className="text-emerald-600">
                    <ForwardArrow silent locale={locale} />
                  </div>
                </div>
                <p className="text-neutral-600 text-sm sm:text-base">
                  {t("library.digitalMushaf.description")}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section id="faqs" className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-2 mb-8 sm:mb-12">
            <p className="text-lg sm:text-xl font-medium text-emerald-900 text-center">
              {t("faqs.title")}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-emerald-600 text-center">
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
            <h2 className="text-lg sm:text-xl text-emerald-900 mb-4 font-inter">
              {t("community.title")}
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-emerald-600 font-doran leading-normal">
              {t("community.subtitle1")}
              <br />
              {t("community.subtitle2")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <div className="text-emerald-900 text-center font-semibold pb-4 border-b border-neutral-200 text-sm sm:text-base">
              {t("community.points.resources")}
            </div>
            
            <div className="text-emerald-900 text-center font-semibold pb-4 border-b border-neutral-200 text-sm sm:text-base">
              {t("community.points.development")}
            </div>

            <div className="text-emerald-900 text-center font-semibold pb-4 border-b border-neutral-200 text-sm sm:text-base">
              {t("community.points.review")}
            </div>

            <div className="text-emerald-900 text-center font-semibold pb-4 border-b border-neutral-200 text-sm sm:text-base">
              {t("community.points.ux")}
            </div>

            <div className="text-emerald-900 text-center font-semibold text-sm sm:text-base">
              {t("community.points.solo")}
            </div>

            <div className="text-emerald-900 text-center font-semibold text-sm sm:text-base">
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
