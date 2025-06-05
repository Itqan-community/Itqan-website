import { getTranslations } from "next-intl/server";
import JoinUsBtn from "../components/JoinUsBtn";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

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
        <JoinUsBtn />
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
              className="group relative overflow-hidden rounded-xl aspect-video"
              aria-label={`${t("projects.quranAppsDirectory")} - ${t("projects.launched")}`}
            >
              <div className="absolute inset-0">
                <Image
                  src="/projects/quran-apps-directory.png"
                  alt={`${t("projects.quranAppsDirectory")} - A comprehensive directory of Quran applications`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-black/50 flex items-end justify-between p-4">
                <h3 className="text-2xl font-bold text-white">
                  {t("projects.quranAppsDirectory")}
                </h3>
                <div className="bg-white/90 text-emerald-900 text-sm font-semibold px-2 py-0.5 rounded-full w-fit mb-2">
                  {t("projects.launched")}
                </div>
              </div>
            </Link>

            <Link
              href={`/${locale}/projects/elevating-quranic-apps-search-experience`}
              className="group relative overflow-hidden rounded-xl aspect-video"
              aria-label={`${t("projects.searchExperience")} - ${t("projects.inProgress")}`}
            >
              <div className="absolute inset-0">
                <Image
                  src="/projects/search-experience.jpg"
                  alt={`${t("projects.searchExperience")} - Project to enhance search functionality in Quran applications`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-black/50 p-6 flex flex-col justify-end">
                <div className="bg-white/90 text-emerald-900 text-sm font-semibold px-3 py-1 rounded-full w-fit mb-2">
                  {t("projects.inProgress")}
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {t("projects.searchExperience")}
                </h3>
              </div>
            </Link>
          </div>

          <div className="text-center">
            <Link
              href={`/${locale}/projects`}
              className="inline-flex items-center gap-2 border-2 border-emerald-900 text-emerald-900 hover:bg-emerald-900 hover:text-white rounded-full px-6 py-2 font-semibold transition-colors"
              aria-label={t("projects.exploreAll")}
            >
              <FaArrowRight className={`${locale === "ar" ? "rotate-180" : ""}`} />
              {t("projects.exploreAll")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
