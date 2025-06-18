import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import ForwardArrow from "../../components/ForwardArrow";
import { FaFileDownload } from "react-icons/fa";

export default function Blog() {
  const t = useTranslations("blog");
  return (
    <section className="py-20 px-4 bg-neutral-100 min-h-[80vh] flex flex-col items-start" id="blogs">
      <div className="w-full flex flex-col items-start mb-12">
        <div className="flex flex-col items-start gap-4 mb-6">
          <div className="flex items-center max-w-max px-2 py-1 rounded-full gap-1 text-neutral-100 bg-neutral-900">
            <span className="text-sm font-medium rounded-full px-4 py-1">{t("badge")}</span>
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f2f2f2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width: '100%', height: '100%'}}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            </span>
          </div>
          <div className="flex flex-col gap-2 items-start">
            <p className="text-2xl md:text-3xl font-bold text-emerald-900 text-start leading-relaxed">{t("headline1")}</p>
            <p className="text-2xl md:text-3xl font-bold text-emerald-900 text-start leading-relaxed">{t("headline2")}</p>
          </div>
        </div>
      </div>
      {/* Blog card: full width */}
      <div className="w-full flex flex-col gap-8">
        <Link href={t("opensourceLicense.link") || "#"} className="group flex flex-col rounded-xl overflow-hidden hover:shadow-2xl transition-shadow w-full max-w-4xl">
          <div className="relative aspect-video w-full">
            <Image
              src={t("opensourceLicense.image")}
              alt={t("opensourceLicense.title")}
              fill
              className="object-cover rounded-xl"
              sizes="100vw"
              priority
            />
          </div>
          <div className="flex flex-col gap-2 py-6 px-4 items-start">
            <div className="flex items-center justify-between gap-2 mb-2 w-full">
              <h4 className="text-xl font-bold text-emerald-900">{t("opensourceLicense.title")}</h4>
              <ForwardArrow silent size={22} />
            </div>
          </div>
        </Link>

        <Link href={t("developmentGuide.link") || "#"} target="_blank" className="group flex flex-col rounded-xl overflow-hidden hover:shadow-2xl transition-shadow w-full max-w-4xl">
          <div className="relative aspect-video w-full">
            <Image
              src={t("developmentGuide.image")}
              alt={t("developmentGuide.title")}
              fill
              className="object-cover rounded-xl"
              sizes="100vw"
            />
          </div>
          <div className="flex flex-col gap-2 py-6 px-4 items-start">
            <div className="flex items-center justify-between gap-2 mb-2 w-full">
              <h4 className="text-xl font-bold text-emerald-900">{t("developmentGuide.title")}</h4>
              <FaFileDownload size={22} />
            </div>
          </div>
        </Link>

        <Link href={t("evaluationGuide.link") || "#"} target="_blank" className="group flex flex-col rounded-xl overflow-hidden hover:shadow-2xl transition-shadow w-full max-w-4xl">
          <div className="relative aspect-video w-full">
            <Image
              src={t("evaluationGuide.image")}
              alt={t("evaluationGuide.title")}
              fill
              className="object-cover rounded-xl"
              sizes="100vw"
            />
          </div>
          <div className="flex flex-col gap-2 py-6 px-4 items-start">
            <div className="flex items-center justify-between gap-2 mb-2 w-full">
              <h4 className="text-xl font-bold text-emerald-900">{t("evaluationGuide.title")}</h4>
              <FaFileDownload size={22} />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
