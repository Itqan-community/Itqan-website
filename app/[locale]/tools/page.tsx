import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaTools } from "react-icons/fa";
import ForwardArrow from "../../components/ForwardArrow";

export default function Tools() {
  const t = useTranslations("tools");
  return (
    <section className="py-20 px-8 w-full max-w-7xl mx-auto bg-neutral-100 flex flex-col" id="tools">
      <div className="flex flex-col mb-12 w-full">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center max-w-max px-3 py-1 rounded-full gap-2 text-neutral-100 bg-neutral-900">
            <span className="text-sm font-medium rounded-full">{t("title")}</span>
            <FaTools size={16} />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-emerald-900 leading-relaxed" >
            {t("title")}
          </h3>
        </div>
        <div className="flex flex-col gap-8">
          {/* Sura API */}
          <Link href={t("suraApi.link")} target="_blank" className="flex flex-col gap-4 p-6 rounded-xl bg-white hover:shadow-xl shadow-neutral-200 transition-shadow">
            <div className="flex flex-col">
              <h4 className="text-xl font-bold mb-2">{t("suraApi.title")}</h4>
              <p className="text-neutral-600 text-sm font-medium leading-relaxed mb-4">{t("suraApi.description")}</p>
              <div className="flex items-center justify-between text-emerald-900">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-neutral-500">{t("author")}:</span>
                  <span className="text-sm text-neutral-500 font-medium">{t("suraApi.author")}</span>
                </div>
                <ForwardArrow size={16} silent />
              </div>
            </div>
          </Link>

          {/* King Fahd Complex Platform */}
          <Link href={t("devPlatform.link")} target="_blank" className="flex flex-col gap-4 p-6 rounded-xl bg-white hover:shadow-xl shadow-neutral-200 transition-shadow">
            <div className="flex flex-col">
              <h4 className="text-xl font-bold mb-2">{t("devPlatform.title")}</h4>
              <p className="text-neutral-600 text-sm font-medium leading-relaxed mb-4">{t("devPlatform.description")}</p>
              <div className="flex items-center justify-between text-emerald-900">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-neutral-500">{t("author")}:</span>
                  <span className="text-sm text-neutral-500 font-medium">{t("devPlatform.author")}</span>
                </div>
                <ForwardArrow size={16} silent />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}