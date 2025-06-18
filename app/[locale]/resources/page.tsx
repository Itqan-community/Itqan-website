import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FaBoxOpen } from "react-icons/fa";

export default function Resources() {
  const t = useTranslations("resources");

  return (
    <section className="py-20 px-8 w-full max-w-7xl mx-auto bg-neutral-100 flex flex-col items-center" id="resources">
      {/* Hero Section */}
      <div className="w-full flex flex-col lg:flex-row items-center gap-8 mb-16">
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center max-w-max px-3 py-1 rounded-full gap-2 text-neutral-100 bg-neutral-900">
            <span className="text-sm font-medium rounded-full">{t("badge")}</span>
            <FaBoxOpen size={16} />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-emerald-900 leading-relaxed mb-4">
            {t("headline1")} <br /> {t("headline2")}
          </h1>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Quran Fonts */}
        <Link href={t("mushafFonts.link")} className="flex flex-col gap-4 rounded-xl overflow-hidden">
          <div className="relative aspect-video w-full">
            <Image 
              src="/resources-1.avif"
              alt={t("mushafFonts.title")}
              fill
              className="object-cover rounded-xl border border-neutral-300"
              sizes="100vw"
            />
          </div>
          <div className="group flex flex-col">
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">{t("mushafFonts.title")}</h3>
              <p className="text-neutral-600 text-sm font-medium leading-relaxed">{t("mushafFonts.description")}</p>
            </div>
          </div>
        </Link>

        {/* Quran Recitations */}
        <Link href={t("recitation.link")} className="flex flex-col gap-4 rounded-xl overflow-hidden">
          <div className="relative aspect-video w-full">
            <Image 
              src="/resources-2.avif"
              alt={t("recitation.title")}
              fill
              className="object-cover rounded-xl border border-neutral-300"
              sizes="100vw"
            />
          </div>
          <div className="group flex flex-col">
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">{t("recitation.title")}</h3>
              <p className="text-neutral-600 text-sm font-medium leading-relaxed">{t("recitation.description")}</p>
            </div>
          </div>
        </Link>

        {/* Digital Copies */}
        <Link href={t("digitalMushaf.link")} className="flex flex-col gap-4 rounded-xl overflow-hidden">
          <div className="relative aspect-video w-full">
            <Image 
              src="/resources-3.avif"
              alt={t("digitalMushaf.title")}
              fill
              className="object-cover rounded-xl border border-neutral-300"
              sizes="100vw"
            />
          </div>
          <div className="group flex flex-col">
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">{t("digitalMushaf.title")}</h3>
              <p className="text-neutral-600 text-sm font-medium leading-relaxed">{t("digitalMushaf.description")}</p>
            </div>
          </div>
        </Link>

        {/* Interpretations */}
        <Link href={t("tafseer.link")} className="flex flex-col gap-4 rounded-xl overflow-hidden">
          <div className="relative aspect-video w-full">
            <Image 
              src="/resources-4.avif"
              alt={t("tafseer.title")}
              fill
              className="object-cover rounded-xl border border-neutral-300"
              sizes="100vw"
            />
          </div>
          <div className="group flex flex-col">
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">{t("tafseer.title")}</h3>
              <p className="text-neutral-600 text-sm font-medium leading-relaxed">{t("tafseer.description")}</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Partners Section */}
      <div className="w-full flex flex-col items-center">
        <h2 className="text-xl font-bold text-emerald-900 text-center mb-8 leading-relaxed">
          {t("partnersNote")}
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          <div className="flex items-center justify-center p-4">
            <Image
              src="/resources-partner-1.avif"
              alt={t("partners.qul.name")}
              width={80}
              height={40}
              className="object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="flex items-center justify-center p-4">
            <Image
              src="/resources-partner-2.avif"
              alt={t("partners.quranenc.name")}
              width={120}
              height={40}
              className="object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="flex items-center justify-center p-4">
            <Image
              src="/resources-partner-3.svg"
              alt={t("partners.qurancomplex.name")}
              width={80}
              height={40}
              className="object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
