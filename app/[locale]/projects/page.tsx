import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import SafeImage from "../../components/SafeImage";
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
    <section className="py-16 sm:py-20 lg:py-40 px-4 sm:px-6 lg:px-[4%] bg-neutral-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-emerald-900 mb-4 sm:mb-6">
            {t("title")}
          </h2>
          <p className="text-base sm:text-lg text-emerald-700 mb-6 sm:mb-8 max-w-3xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* First project */}
          <div className="w-full flex mb-6 sm:mb-8">
            <Link href={`/${locale}/projects/1`} className="group flex flex-col overflow-hidden hover:shadow-2xl transition-shadow w-full rounded-xl">
              <div className="relative aspect-video w-full">
                <SafeImage
                  src={t("quranAppsDirectory.image")}
                  alt={t("quranAppsDirectory.title")}
                  fill
                  className="object-cover object-[27%_64%] rounded-xl border border-neutral-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 70vw"
                  priority
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 sm:p-6">
                <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold text-emerald-900" >
                  {t("quranAppsDirectory.title")}
                </h4>
                <div className="bg-emerald-800 opacity-60 text-white text-sm  px-2 py-0.5 rounded-full w-fit">
                  {t("launched")}
                </div>
              </div>
            </Link>
          </div>
          
          {/* Second and Third projects row */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            {/* Second project */}
            <Link href={`/${locale}/projects/2`} className="group flex flex-col overflow-hidden hover:shadow-2xl transition-shadow rounded-xl cursor-pointer flex-1">
              <div className="relative aspect-video w-full">
                <SafeImage
                  src={t("advancedSearch.image")}
                  alt={t("advancedSearch.title")}
                  fill
                  className="object-cover rounded-xl border border-neutral-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 35vw"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 sm:p-6">
                <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold text-emerald-900" >
                  {t("advancedSearch.title")}
                </h4>
                <div className="bg-emerald-800 opacity-60 text-white text-sm  px-2 py-0.5 rounded-full w-fit">
                  {t("inProgress")}
                </div>
              </div>
            </Link>
            
            {/* Third project */}
            <Link href={`/${locale}/projects/3`} className="group flex flex-col overflow-hidden hover:shadow-2xl transition-shadow rounded-xl cursor-pointer flex-1">
              <div className="relative aspect-video w-full">
                <SafeImage
                  src={t("quranContentManagementSystem.image")}
                  alt={t("quranContentManagementSystem.title")}
                  fill
                  className="object-cover rounded-xl border border-neutral-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 35vw"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 sm:p-6">
                <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold text-emerald-900">
                  {t("quranContentManagementSystem.title")}
                </h4>
                <div className="bg-emerald-800 opacity-60 text-white text-sm  px-2 py-0.5 rounded-full w-fit">
                  {t("inProgress")}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
