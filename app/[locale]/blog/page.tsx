import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import ForwardArrow from "../../components/ForwardArrow";
import { FaFileAlt, FaFileDownload } from "react-icons/fa";

interface BlogProps {
  params: {
    locale: string;
  };
}

export default async function Blog({ params }: BlogProps) {
  const t = await getTranslations("blog");
  
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto bg-neutral-100 flex flex-col items-center" id="blogs">
      <div className="w-full flex flex-col items-start mb-8 sm:mb-12">
        <div className="flex flex-col items-start gap-4 mb-6">
          <div className="flex items-center max-w-max px-3 py-1 rounded-full gap-2 text-neutral-100 bg-neutral-900">
            <span className="text-sm font-medium rounded-full">{t("badge")}</span>
            <FaFileAlt size={16} />
          </div>
          <div className="flex flex-col gap-2 items-start">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-emerald-900 text-start leading-relaxed">
              {t("headline1")} <br /> {t("headline2")}
            </h1>
          </div>
        </div>
      </div>
      
      {/* Blog cards */}
      <div className="w-full flex flex-col gap-6 sm:gap-8">
        {/* Open Source License Article */}
        <Link 
          href={`/${params.locale}/blog/opensource-license`}
          className="group flex flex-col rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 w-full max-w-3xl"
        >
          <div className="relative aspect-video w-full">
            <Image
              src={t("opensourceLicense.image")}
              alt={t("opensourceLicense.title")}
              fill
              className="object-cover rounded-xl"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 70vw"
              priority
            />
          </div>
          <div className="flex flex-col gap-2 py-4 sm:py-6 px-4 sm:px-6 items-start">
            <div className="flex items-center justify-between gap-2 mb-2 w-full">
              <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold text-emerald-900">
                {t("opensourceLicense.title")}
              </h4>
              <ForwardArrow silent size={22} locale={params.locale} />
            </div>
            <p className="text-basic text-neutral-600">
              {t("opensourceLicense.description")}
            </p>
          </div>
        </Link>

        {/* Development Guide - Internal Article */}
        <Link 
          href={`/${params.locale}/blog/development-guide`}
          className="group flex flex-col rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 w-full max-w-3xl"
        >
          <div className="relative aspect-video w-full">
            <Image
              src={t("developmentGuide.image")}
              alt={t("developmentGuide.title")}
              fill
              className="object-cover rounded-xl"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 70vw"
            />
          </div>
          <div className="flex flex-col gap-2 py-4 sm:py-6 px-4 sm:px-6 items-start">
            <div className="flex items-center justify-between gap-2 mb-2 w-full">
              <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold text-emerald-900">
                {t("developmentGuide.title")}
              </h4>
              <ForwardArrow silent size={22} locale={params.locale} />
            </div>
            <p className="text-basic text-neutral-600">
              {t("developmentGuide.description")}
            </p>
          </div>
        </Link>

        {/* Evaluation Guide - External Link */}
        <Link 
          href={`/${params.locale}/blog/evaluation-guide`}
          rel="noopener noreferrer"
          className="group flex flex-col rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 w-full max-w-3xl"
        >
          <div className="relative aspect-video w-full">
            <Image
              src={t("evaluationGuide.image")}
              alt={t("evaluationGuide.title")}
              fill
              className="object-cover rounded-xl"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 70vw"
            />
          </div>
          <div className="flex flex-col gap-2 py-4 sm:py-6 px-4 sm:px-6 items-start">
            <div className="flex items-center justify-between gap-2 mb-2 w-full">
              <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold text-emerald-900">
                {t("evaluationGuide.title")}
              </h4>
              <ForwardArrow silent size={22} locale={params.locale} />
            </div>
            <p className="text-basic text-neutral-600">
              {t("evaluationGuide.description")}
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
}
