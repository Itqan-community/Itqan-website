import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import ForwardArrow from "../../components/ForwardArrow";
import { FaFileAlt, FaFileDownload } from "react-icons/fa";

export default function Blog() {
  const t = useTranslations("blog");
  return (
    <section className="py-20 px-8 w-full max-w-7xl mx-auto bg-neutral-100 flex flex-col items-center" id="blogs">
      <div className="w-full flex flex-col items-start mb-12">
        <div className="flex flex-col items-start gap-4 mb-6">
          <div className="flex items-center max-w-max px-3 py-1 rounded-full gap-2 text-neutral-100 bg-neutral-900">
            <span className="text-sm font-medium rounded-full">{t("badge")}</span>
            <FaFileAlt size={16} />
          </div>
          <div className="flex flex-col gap-2 items-start">
            <h1 className="text-2xl md:text-3xl font-bold text-emerald-900 text-start leading-relaxed">{t("headline1")} <br /> {t("headline2")}</h1>
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
