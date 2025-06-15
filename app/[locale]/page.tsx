import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import LinkBtn from "../components/LinkBtn";
import ForwardArrow from "../components/ForwardArrow";

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations("home");
  return (
    <main>
      {/* Hero section */}
      <section 
        aria-label="Hero"
        className="flex flex-col items-center justify-center h-[calc(100vh-73px)] bg-[url('/home-hero.avif')] bg-center bg-cover bg-no-repeat bg-[#81ffb8]/50 bg-blend-overlay"
      >
        <h1 className="text-[56px] font-bold text-[#6bb38b] text-center">{t("title")}</h1>
        <p className="text-xl font-semibold">{t("description")}</p>
        <p className="text-xl font-semibold mb-10">{t("description2")}</p>
        <LinkBtn title={t("discord")} href={`https://discord.gg/24CskUbuuB`} target="_blank" />
      </section>

      {/* Projects section */}
      <section aria-label="Projects" className="py-40 px-[4%] bg-neutral-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-emerald-900 mb-6">{t("projects.title")}</h2>
            <p className="text-lg text-emerald-700 mb-8">{t("projects.description")}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Link 
              href={`/${locale}/projects/elevating-quranic-apps-search-experience`}
              className="group flex flex-col rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-neutral-300"
              aria-label={`${t("projects.searchExperience")} - ${t("projects.inProgress")}`}
            >
              <div className="relative aspect-video">
                <Image
                  src="/home-projects-1.avif"
                  alt={`${t("projects.searchExperience")} - Project to enhance search functionality in Quran applications`}
                  fill
                  className="object-cover rounded-xl border border-neutral-300"
                  priority
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-neutral-100">
                <h3 className="text-2xl font-bold text-emerald-900">
                  {t("projects.searchExperience")}
                </h3>
                <div className="bg-emerald-800 opacity-60 text-white text-sm font-semibold px-2 py-0.5 rounded-full min-w-max">
                  {t("projects.inProgress")}
                </div>
              </div>
            </Link>

            <Link
              href={`/${locale}/projects/quran-apps-directory`}
              className="group flex flex-col rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-neutral-300"
              aria-label={`${t("projects.quranAppsDirectory")} - ${t("projects.launched")}`}
            >
              <div className="relative aspect-video">
                <Image
                  src="/home-projects-2.avif"
                  alt={`${t("projects.quranAppsDirectory")} - A comprehensive directory of Quran applications`}
                  fill
                  className="object-cover rounded-xl border border-neutral-300"
                  priority
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-neutral-100">
                <h3 className="text-2xl font-bold text-emerald-900">
                  {t("projects.quranAppsDirectory")}
                </h3>
                <div className="bg-emerald-800 opacity-60 text-white text-sm font-semibold px-2 py-0.5 rounded-full min-w-max">
                  {t("projects.launched")}
                </div>
              </div>
            </Link>
          </div>

          <div className="flex justify-center mt-12">
            <LinkBtn title={t("projects.exploreAll")} href={`/${locale}/projects`} variant="outline" />
          </div>
        </div>
      </section>

      {/* Library section */}
      <section className="py-40 px-[4%] bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-4xl font-bold text-emerald-900 mb-4">
              {t("library.title")}
            </h2>
            <p className="text-emerald-700 text-lg">
              {t("library.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              href={`/${locale}/categories/recitation`}
              className="flex flex-col rounded-xl overflow-hidden"
            >
              <div className="relative aspect-video">
                <Image
                  src="/home-lib-1.avif"
                  alt={t("library.recitation.title")}
                  fill
                  className="object-cover rounded-xl border border-neutral-300"
                />
              </div>
              <div className="flex flex-col gap-2 py-6 ">
                <div className="flex items-center gap-2 justify-between">
                  <h3 className="text-2xl font-bold text-emerald-900">
                    {t("library.recitation.title")}
                  </h3>
                  <div className="text-emerald-600">
                    <ForwardArrow silent />
                  </div>
                </div>
                <p className="text-neutral-600">
                  {t("library.recitation.description")}
                </p>
              </div>
            </Link>

            <Link
              href={`/${locale}/categories/mushaf-fonts`}
              className="flex flex-col rounded-xl overflow-hidden"
            >
              <div className="relative aspect-video">
                <Image
                  src="/home-lib-2.avif"
                  alt={t("library.mushafFonts.title")}
                  fill
                  className="object-cover rounded-xl object-[50%_28%] border border-neutral-300"
                />
              </div>
              <div className="flex flex-col gap-2 py-6">
                <div className="flex items-center gap-2 justify-between">
                  <h3 className="text-2xl font-bold text-emerald-900">
                    {t("library.mushafFonts.title")}
                  </h3>
                  <div className="text-emerald-600">
                    <ForwardArrow silent />
                  </div>
                </div>
                <p className="text-neutral-600">
                  {t("library.mushafFonts.description")}
                </p>
              </div>
            </Link>

            <Link
              href={`/${locale}/categories/tafseer`}
              className="flex flex-col rounded-xl overflow-hidden"
            >
              <div className="relative aspect-video">
                <Image
                  src="/home-lib-3.avif"
                  alt={t("library.tafseer.title")}
                  fill
                  className="object-cover rounded-xl border border-neutral-300"
                />
              </div>
              <div className="flex flex-col gap-2 py-6">
                <div className="flex items-center gap-2 justify-between">
                  <h3 className="text-2xl font-bold text-emerald-900">
                    {t("library.tafseer.title")}
                  </h3>
                  <div className="text-emerald-600">
                    <ForwardArrow silent />
                  </div>
                </div>
                <p className="text-neutral-600">
                  {t("library.tafseer.description")}
                </p>
              </div>
            </Link>

            <Link
              href={`/${locale}/categories/digital-mushaf-layout`}
              className="flex flex-col rounded-xl overflow-hidden"
            >
              <div className="relative aspect-video">
                <Image
                  src="/home-lib-4.avif"
                  alt={t("library.digitalMushaf.title")}
                  fill
                  className="object-cover rounded-xl border border-neutral-300"
                />
              </div>
              <div className="flex flex-col gap-2 py-6">
                <div className="flex items-center gap-2 justify-between">
                  <h3 className="text-2xl font-bold text-emerald-900">
                    {t("library.digitalMushaf.title")}
                  </h3>
                  <div className="text-emerald-600">
                    <ForwardArrow silent />
                  </div>
                </div>
                <p className="text-neutral-600">
                  {t("library.digitalMushaf.description")}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section id="faqs" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-2 mb-12">
            <p className="text-xl font-medium text-emerald-900 text-center">
              {t("faqs.title")}
            </p>
            <h2 className="text-3xl font-bold text-emerald-600 text-center">
              {t("faqs.subtitle")}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <details className="border-b border-neutral-200">
              <summary className="flex items-center justify-between py-6 cursor-pointer">
                <h3 className="text-lg font-medium text-emerald-900">
                  {t("faqs.questions.join.title")}
                </h3>
                <div className="text-emerald-700">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"/>
                  </svg>
                </div>
              </summary>
              <div className="pb-6 text-neutral-600">
                {t("faqs.questions.join.answer")}
              </div>
            </details>

            <details className="border-b border-neutral-200">
              <summary className="flex items-center justify-between py-6 cursor-pointer">
                <h3 className="text-lg font-medium text-emerald-900">
                  {t("faqs.questions.support.title")}
                </h3>
                <div className="text-emerald-700">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"/>
                  </svg>
                </div>
              </summary>
              <div className="pb-6 text-neutral-600">
                {t("faqs.questions.support.answer")}
              </div>
            </details>

            <details>
              <summary className="flex items-center justify-between py-6 cursor-pointer">
                <h3 className="text-lg font-medium text-emerald-900">
                  {t("faqs.questions.topics.title")}
                </h3>
                <div className="text-emerald-700">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"/>
                  </svg>
                </div>
              </summary>
              <div className="pb-6 text-neutral-600">
                {t("faqs.questions.topics.answer")}
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Disclaimer section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-xl text-emerald-900 mb-4 font-inter">{t("community.title")}</h2>
            <p className="text-3xl font-bold text-emerald-600 font-doran leading-normal">
              {t("community.subtitle1")}
              <br />
              {t("community.subtitle2")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="text-emerald-900 text-center font-semibold pb-4 border-b border-neutral-200">
              {t("community.points.resources")}
            </div>
            
            <div className="text-emerald-900 text-center font-semibold pb-4 border-b border-neutral-200">
              {t("community.points.development")}
            </div>

            <div className="text-emerald-900 text-center font-semibold pb-4 border-b border-neutral-200">
              {t("community.points.review")}
            </div>

            <div className="text-emerald-900 text-center font-semibold pb-4 border-b border-neutral-200">
              {t("community.points.ux")}
            </div>

            <div className="text-emerald-900 text-center font-semibold">
              {t("community.points.solo")}
            </div>

            <div className="text-emerald-900 text-center font-semibold">
              {t("community.points.growth")}
            </div>
          </div>

          <div className="text-center mt-12 flex justify-center">
            <LinkBtn title={t("community.cta")} href={`https://discord.gg/24CskUbuuB`} target="_blank" variant="outline" />
          </div>
        </div>
      </section>
      
      {/* Footer section */}
      <section className="relative bg-[#193B2D] py-20 overflow-hidden">
        {/* Background image with blur effect */}
        <div 
          className="absolute inset-0 opacity-[0.16] scale-[1.48] rotate-[10.7deg] skew-x-[10.7deg]"
          style={{
            maskImage: 'radial-gradient(50% 100% at 50% 0%, black 0%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(50% 100% at 50% 0%, black 0%, transparent 100%)',
            filter: 'blur(3px)',
          }}
        >
          <Image
            src="/home-footer-bg.png"
            alt=""
            fill
            className="object-cover"
            style={{ objectPosition: '36.7% 79%' }}
          />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative text-neutral-100">
          {/* CTA */}
          <Link
            href="https://discord.gg/24CskUbuuB"
            target="_blank"
            rel="noopener"
            className="flex items-center justify-center me-auto max-w-max gap-4 mb-20 hover:opacity-90 transition-opacity"
          >
            <h2 className="text-4xl font-bold text-neutral-100 font-doran text-right">
              {t("footer.cta")}
            </h2>

            <ForwardArrow silent size={26} />
          </Link>

          {/* Footer bottom */}
          <div className="flex items-center justify-between gap-6">
            <div>
              <p className="text-[#868E8B] text-center" style={{letterSpacing: '-0.5px'}}>
                {t("footer.copyright")}
              </p>
                <Image
                  src="/home-footer-ayah.svg"
                  alt=""
                  className="object-cover grayscale invert"
                  width={230}
                  height={46}
                />
            </div>

            <Link href={`/${locale}`}>
              <Image
                src="/logo.svg"
                alt="Itqan"
                width={80}
                height={80}
                className="brightness-0 contrast-200 grayscale invert saturate-200"
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
