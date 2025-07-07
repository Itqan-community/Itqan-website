import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FaBoxOpen, FaDownload, FaExternalLinkAlt } from "react-icons/fa";
import resourcesList from "./resourcesList.json";

export default function Resources() {
  const t = useTranslations("resources");
  const t2 = useTranslations("resources2");
  const locale = useLocale();

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto bg-neutral-100 flex flex-col items-center" id="resources">
      {/* Hero Section */}
      <div className="w-full flex flex-col lg:flex-row items-center gap-6 sm:gap-8 mb-12 sm:mb-16">
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center max-w-max px-3 py-1 rounded-full gap-2 text-neutral-100 bg-neutral-900">
            <span className="text-sm font-medium rounded-full">{t("badge")}</span>
            <FaBoxOpen size={16} />
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-emerald-900 leading-relaxed mb-4">
            {t("headline1")} <br /> {t("headline2")}
          </h1>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="w-full space-y-8">
        {resourcesList.resourcesList.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <div className="bg-emerald-800 text-white px-6 py-3 rounded-t-xl">
              <h2 className="text-lg ">{t2(category.categoryTitle)}</h2>
            </div>
            <div className="bg-white rounded-b-xl shadow-lg">
              <div className="grid grid-cols-1 divide-y divide-gray-200">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-medium text-emerald-900 text-lg">{t2(item.title)}</h3>
                        {t2(item.link) && (
                          <Link
                            href={t2(item.link) as string}
                            target="_blank"
                            download={item.download}
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-800 transition-colors flex-shrink-0"
                          >
                            {item.download ? (
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
                        {t2(item.description)}
                      </p>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">{t2("tableHeader.author")}:</span> {t2(item.author)}
                        </div>
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">{t2("tableHeader.license")}:</span>{" "}
                          <Link 
                            href={`/${locale}/blog/opensource-license`}
                            className="text-emerald-600 hover:text-emerald-800 transition-colors"
                          >
                            {t2(item.license)}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
