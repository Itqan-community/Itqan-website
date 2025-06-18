import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function Projects() {
  const t = useTranslations("home.projects");
  return (
    <section className="py-20 px-8 bg-neutral-100 min-h-[80vh] max-w-7xl mx-auto flex flex-col items-center" id="projects">
      <div className="flex flex-col items-center mb-12">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center max-w-max px-2 py-1 rounded-full gap-1 text-neutral-100 bg-neutral-900">
            <span className="text-sm font-medium rounded-full px-4 py-1">{t("badge")}</span>
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="white">
                <path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
              </svg>
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-emerald-900 leading-relaxed" >
            {t("headline")}
          </h3>
        </div>
      </div>
      {/* First project */}
      <div className="w-full flex mb-8">
        <Link href={t("quranAppsDirectory.link") || "#"} target="_blank" className="group flex flex-col overflow-hidden hover:shadow-2xl transition-shadow w-full rounded-xl">
          <div className="relative aspect-video w-full">
            <Image
              src={t("quranAppsDirectory.image")}
              alt={t("quranAppsDirectory.title")}
              fill
              className="object-cover object-[27%_64%] rounded-xl border border-neutral-300"
              sizes="100vw"
              priority
            />
          </div>
          <div className="flex items-center justify-between gap-2 p-6">
            <h4 className="text-xl font-bold text-emerald-900 mb-2" >{t("quranAppsDirectory.title")}</h4>
            <div className="bg-emerald-800 opacity-60 text-white text-sm font-semibold px-2 py-0.5 rounded-full min-w-max">
              {t("launched")}
            </div>
          </div>
        </Link>
      </div>
      {/* Second and Third projects row */}
      <div className="w-full flex justify-between gap-4">
        {/* Second project */}
        <div className="group flex flex-col overflow-hidden hover:shadow-2xl transition-shadow rounded-xl cursor-pointer flex-1">
          <div className="relative aspect-video w-full">
            <Image
              src={t("advancedSearch.image")}
              alt={t("advancedSearch.title")}
              fill
              className="object-cover rounded-xl border border-neutral-300"
            />
          </div>
          <div className="flex items-center justify-between gap-2 p-6">
            <h4 className="text-xl font-bold text-emerald-900 mb-2" >{t("advancedSearch.title")}</h4>
            <div className="bg-emerald-800 opacity-60 text-white text-sm font-semibold px-2 py-0.5 rounded-full min-w-max">
              {t("inProgress")}
            </div>
          </div>
        </div>
        {/* Third project */}
        <div className="group flex flex-col overflow-hidden hover:shadow-2xl transition-shadow rounded-xl cursor-pointer flex-1">
          <div className="relative aspect-video w-full">
            <Image
              src={t("quranContentManagementSystem.image")}
              alt={t("quranContentManagementSystem.title")}
              fill
              className="object-cover rounded-xl border border-neutral-300"
            />
          </div>
          <div className="flex items-center justify-between gap-2 p-6">
            <h4 className="text-xl font-bold text-emerald-900 mb-2">{t("quranContentManagementSystem.title")}</h4>
            <div className="bg-emerald-800 opacity-60 text-white text-sm font-semibold px-2 py-0.5 rounded-full min-w-max">
              {t("inProgress")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
