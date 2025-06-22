import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FaBoxOpen, FaDownload, FaExternalLinkAlt } from "react-icons/fa";
import resourcesList from "./resourcesList.json";

export default function Resources() {
  const t = useTranslations("resources");
  const t2 = useTranslations("resources2");

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto bg-neutral-100 flex flex-col items-center" id="resources">
      {/* Hero Section */}
      <div className="w-full flex flex-col lg:flex-row items-center gap-6 sm:gap-8 mb-12 sm:mb-16">
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center max-w-max px-3 py-1 rounded-full gap-2 text-neutral-100 bg-neutral-900">
            <span className="text-sm font-medium rounded-full">{t("badge")}</span>
            <FaBoxOpen size={16} />
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-900 leading-relaxed mb-4">
            {t("headline1")} <br /> {t("headline2")}
          </h1>
        </div>
      </div>

      {/* Resources Table */}
      <div className="w-full">
        {/* Desktop Table */}
        <div className="hidden lg:block">
          {resourcesList.resourcesList.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-8">
              <div className="bg-emerald-800 text-white px-6 py-3 rounded-t-xl">
                <h2 className="text-lg font-semibold">{t2(category.categoryTitle)}</h2>
              </div>
              <div className="bg-white rounded-b-xl shadow-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-emerald-50">
                    <tr>
                      <th className="px-6 py-4 text-start font-semibold text-emerald-900">{t2("tableHeader.title")}</th>
                      <th className="px-6 py-4 text-start font-semibold text-emerald-900">{t2("tableHeader.description")}</th>
                      <th className="px-6 py-4 text-start font-semibold text-emerald-900">{t2("tableHeader.author")}</th>
                      <th className="px-6 py-4 text-start font-semibold text-emerald-900">{t2("tableHeader.link")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {category.items.map((item, itemIndex) => (
                      <tr key={itemIndex} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-start">
                          <div className="font-medium text-emerald-900">{t2(item.title)}</div>
                        </td>
                        <td className="px-6 py-4 text-start">
                          <div className="text-sm text-gray-600 max-w-md line-clamp-3">
                            {t2(item.description)}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-start">
                          <div className="text-sm text-gray-500">{t2(item.author)}</div>
                        </td>
                        <td className="px-6 py-4 text-start">
                          {t2(item.link) && (
                            <Link
                              href={t2(item.link) as string}
                              target="_blank"
                              download={item.download}
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-800 transition-colors"
                            >
                              {item.download ? <FaDownload size={16} /> : <FaExternalLinkAlt size={16} />}
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-8">
          {resourcesList.resourcesList.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="bg-emerald-800 text-white px-4 py-3 rounded-t-xl">
                <h2 className="text-base font-semibold">{t2(category.categoryTitle)}</h2>
              </div>
              <div className="bg-white rounded-b-xl shadow-lg divide-y divide-gray-200">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium text-emerald-900 text-base">{t2(item.title)}</h3>
                        {t2(item.link) && (
                          <Link
                            href={t2(item.link) as string}
                            target="_blank"
                            download={item.download}
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-800 transition-colors flex-shrink-0"
                          >
                            {item.download ? <FaDownload size={14} /> : <FaExternalLinkAlt size={14} />}
                          </Link>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {t2(item.description)}
                      </p>
                      <div className="text-sm text-gray-500">
                        <span className="font-medium">{t2("tableHeader.author")}:</span> {t2(item.author)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
