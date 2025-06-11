import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import LinkBtn from "../components/LinkBtn";

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
              href={`/${locale}/projects/quran-apps-directory`}
              className="group flex flex-col rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-neutral-300"
              aria-label={`${t("projects.quranAppsDirectory")} - ${t("projects.launched")}`}
            >
              <div className="relative aspect-video">
                <Image
                  src="/home-projects-1.avif"
                  alt={`${t("projects.quranAppsDirectory")} - A comprehensive directory of Quran applications`}
                  fill
                  className="object-cover rounded-xl"
                  priority
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-neutral-100">
                <h3 className="text-2xl font-bold text-emerald-900">
                  {t("projects.quranAppsDirectory")}
                </h3>
                <div className="bg-emerald-800 opacity-60 text-white text-sm font-semibold px-2 py-0.5 rounded-full">
                  {t("projects.launched")}
                </div>
              </div>
            </Link>

            <Link
              href={`/${locale}/projects/elevating-quranic-apps-search-experience`}
              className="group flex flex-col rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-neutral-300"
              aria-label={`${t("projects.searchExperience")} - ${t("projects.inProgress")}`}
            >
              <div className="relative aspect-video">
                <Image
                  src="/home-projects-2.avif"
                  alt={`${t("projects.searchExperience")} - Project to enhance search functionality in Quran applications`}
                  fill
                  className="object-cover rounded-xl"
                  priority
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-neutral-100">
                <h3 className="text-2xl font-bold text-emerald-900">
                  {t("projects.searchExperience")}
                </h3>
                <div className="bg-emerald-800 opacity-60 text-white text-sm font-semibold px-2 py-0.5 rounded-full">
                  {t("projects.inProgress")}
                </div>
              </div>
            </Link>
          </div>

          <div className="flex justify-center mt-12">
            <LinkBtn title={t("projects.exploreAll")} href={`/${locale}/projects`} variant="outline" />
          </div>
        </div>
      </section>
    </main>
  );
}
