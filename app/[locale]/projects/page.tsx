import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FaCog } from "react-icons/fa";

interface ProjectsProps {
  params: {
    locale: string;
  };
}

export default function Projects({ params }: ProjectsProps) {
  const { locale } = params;
  const t = useTranslations("home.projects");
  
  return (
    <section className="py-20 px-8 bg-neutral-100 w-full max-w-7xl mx-auto flex flex-col items-center" id="projects">
      <div className="flex flex-col items-center mb-12">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center max-w-max px-3 py-1 rounded-full gap-2 text-neutral-100 bg-neutral-900">
            <span className="text-sm font-medium rounded-full">{t("badge")}</span>
            <FaCog size={16} />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-emerald-900 leading-relaxed" >
            {t("headline")}
          </h3>
        </div>
      </div>
      {/* First project */}
      <div className="w-full flex mb-8">
        <Link href={`/${locale}/projects/1`} className="group flex flex-col overflow-hidden hover:shadow-2xl transition-shadow w-full rounded-xl">
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
