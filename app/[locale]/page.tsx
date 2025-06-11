import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import LinkBtn from "../components/LinkBtn";
import ForwardArrow from "../components/ForwardArrow";

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations("home");
  return (
    <main>
      {/* Hero section */}
      <section 
        aria-label="Hero"
        className="flex flex-col items-center justify-center h-[calc(100vh-73px)] bg-[url('/home-hero.avif')] bg-center bg-cover bg-no-repeat bg-[#81ffb8]/50 bg-blend-overlay"
      >
        <h1 className="text-[56px] font-bold text-[#6bb38b] text-center">{t("title")}</h1>
        <p className="text-xl font-semibold">{t("description")}</p>
        <p className="text-xl font-semibold mb-10">{t("description2")}</p>
        <LinkBtn title={t("discord")} href={`https://discord.gg/24CskUbuuB`} target="_blank" />
      </section>

      {/* Projects section */}
      <section aria-label="Projects" className="py-40 px-[4%] bg-neutral-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-emerald-900 mb-6">{t("projects.title")}</h2>
            <p className="text-lg text-emerald-700 mb-8">{t("projects.description")}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
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
              <div className="flex items-center justify-between p-4 bg-neutral-100">
                <h3 className="text-2xl font-bold text-emerald-900">
                  {t("projects.searchExperience")}
                </h3>
                <div className="bg-emerald-800 opacity-60 text-white text-sm font-semibold px-2 py-0.5 rounded-full min-w-max">
                  {t("projects.inProgress")}
                </div>
              </div>
            </Link>

            <Link
              href={`/${locale}/projects/quran-apps-directory`}
              className="group flex flex-col rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-neutral-300"
              aria-label={`${t("projects.quranAppsDirectory")} - ${t("projects.launched")}`}
            >
              <div className="relative aspect-video">
                <Image
                  src="/home-projects-2.avif"
                  alt={`${t("projects.quranAppsDirectory")} - A comprehensive directory of Quran applications`}
                  fill
                  className="object-cover rounded-xl border border-neutral-300"
                  priority
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-neutral-100">
                <h3 className="text-2xl font-bold text-emerald-900">
                  {t("projects.quranAppsDirectory")}
                </h3>
                <div className="bg-emerald-800 opacity-60 text-white text-sm font-semibold px-2 py-0.5 rounded-full min-w-max">
                  {t("projects.launched")}
                </div>
              </div>
            </Link>
          </div>

          <div className="flex justify-center mt-12">
            <LinkBtn title={t("projects.exploreAll")} href={`/${locale}/projects`} variant="outline" />
          </div>
        </div>
      </section>

      {/* Library section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-4xl font-bold text-emerald-900 mb-4">
              {t("library.title")}
            </h2>
            <p className="text-emerald-700 text-lg">
              {t("library.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              href={`/${locale}/categories/recitation`}
              className="flex flex-col rounded-xl overflow-hidden"
            >
              <div className="relative aspect-video">
                <Image
                  src="/home-lib-1.avif"
                  alt={t("library.recitation.title")}
                  fill
                  className="object-cover rounded-xl border border-neutral-300"
                />
              </div>
              <div className="flex flex-col gap-2 py-6 ">
                <div className="flex items-center gap-2 justify-between">
                  <h3 className="text-2xl font-bold text-emerald-900">
                    {t("library.recitation.title")}
                  </h3>
                  <div className="text-emerald-600">
                    <ForwardArrow silent />
                  </div>
                </div>
                <p className="text-neutral-600">
                  {t("library.recitation.description")}
                </p>
              </div>
            </Link>

            <Link
              href={`/${locale}/categories/mushaf-fonts`}
              className="flex flex-col rounded-xl overflow-hidden"
            >
              <div className="relative aspect-video">
                <Image
                  src="/home-lib-2.avif"
                  alt={t("library.mushafFonts.title")}
                  fill
                  className="object-cover rounded-xl object-[50%_28%] border border-neutral-300"
                />
              </div>
              <div className="flex flex-col gap-2 p-6 ">
                <div className="flex items-center gap-2 justify-between">
                  <h3 className="text-2xl font-bold text-emerald-900">
                    {t("library.mushafFonts.title")}
                  </h3>
                  <div className="text-emerald-600">
                    <ForwardArrow silent />
                  </div>
                </div>
                <p className="text-neutral-600">
                  {t("library.mushafFonts.description")}
                </p>
              </div>
            </Link>

            <Link
              href={`/${locale}/categories/tafseer`}
              className="flex flex-col rounded-xl overflow-hidden"
            >
              <div className="relative aspect-video">
                <Image
                  src="/home-lib-3.avif"
                  alt={t("library.tafseer.title")}
                  fill
                  className="object-cover rounded-xl border border-neutral-300"
                />
              </div>
              <div className="flex flex-col gap-2 p-6 ">
                <div className="flex items-center gap-2 justify-between">
                  <h3 className="text-2xl font-bold text-emerald-900">
                    {t("library.tafseer.title")}
                  </h3>
                  <div className="text-emerald-600">
                    <ForwardArrow silent />
                  </div>
                </div>
                <p className="text-neutral-600">
                  {t("library.tafseer.description")}
                </p>
              </div>
            </Link>

            <Link
              href={`/${locale}/categories/digital-mushaf-layout`}
              className="flex flex-col rounded-xl overflow-hidden"
            >
              <div className="relative aspect-video">
                <Image
                  src="/home-lib-4.avif"
                  alt={t("library.digitalMushaf.title")}
                  fill
                  className="object-cover rounded-xl border border-neutral-300"
                />
              </div>
              <div className="flex flex-col gap-2 p-6 ">
                <div className="flex items-center gap-2 justify-between">
                  <h3 className="text-2xl font-bold text-emerald-900">
                    {t("library.digitalMushaf.title")}
                  </h3>
                  <div className="text-emerald-600">
                    <ForwardArrow silent />
                  </div>
                </div>
                <p className="text-neutral-600">
                  {t("library.digitalMushaf.description")}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
