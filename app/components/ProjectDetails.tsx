import Image from "next/image";
import Link from "next/link";
import LinkBtn from "./LinkBtn";
import SafeImage from "./SafeImage";
import { getTranslations } from "next-intl/server";
import { FaArrowLeft } from "react-icons/fa";
import ForwardArrow from "./ForwardArrow";

interface ProjectDetailsProps {
  // Project metadata
  id: string;
  status?: 'launched' | 'inProgress' | 'planned';
  locale?: string;
  
  // Header section
  title: string;
  subtitle: string;
  headerImage?: string;
  
  // Main content
  contentImage: string;
  description: string;
  importanceTitle: string;
  importanceItems: string[];
  rolesTitle: string;
  rolesItems: string[];
  projectLink?: string;
  projectLinkText: string;
  
  // Discord section
  discordText: string;
  discordLink: string;
  discordImage: string;
}

export default async function ProjectDetails({
  id,
  status,
  locale = "ar",
  title,
  subtitle,
  headerImage,
  contentImage,
  description,
  importanceTitle,
  importanceItems,
  rolesTitle,
  rolesItems,
  projectLink,
  projectLinkText,
  discordText,
  discordLink,
  discordImage,
}: ProjectDetailsProps) {
  const t = await getTranslations("home.projects");
  return (
    <div className="min-h-screen w-auto">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <Link 
          href={`/${locale}/projects`}
          className="inline-flex items-center gap-2 text-emerald-900 hover:text-emerald-700 transition-colors"
        >
          <div className="scale-x-[-1]">
            <ForwardArrow silent size={16} locale={locale} />
          </div>
          <span className="font-medium text-sm sm:text-base">{t("exploreAll")}</span>
        </Link>
      </div>

      {/* Header Section */}
      <div className="relative" id="cover">
        <div className="text-center mt-8 sm:mt-12 px-4 sm:px-6">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 leading-tight">
            {t(title)}
          </h3>
          <p className="text-base sm:text-lg max-w-4xl mx-auto leading-relaxed mb-6 text-neutral-500">
            {t(subtitle)}
          </p>
        </div>
        {headerImage && (
          <div className="max-w-6xl mx-auto w-full h-64 md:h-96 relative mt-8">
            <SafeImage
              src={t(headerImage)}
              alt={t(title)}
              fill
              className="object-cover rounded-lg"
              sizes="100vw"
              priority
            />
          </div>
        )}
      </div>

      {/* Content Section */}
      <section className="py-16 sm:py-20 lg:py-40 px-4 sm:px-6 lg:px-[4%] bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
            {/* Image */}
            <div className="relative w-full max-w-sm mx-auto lg:max-w-none lg:mt-0 h-fit">
              <SafeImage
                src={t(contentImage)}
                alt={t(title)}
                width={500}
                height={800}
                className="w-full h-auto max-h-[600px] object-contain rounded-xl"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
              />
            </div>

            {/* Content */}
            <div className="space-y-6">
              <p className="text-base sm:text-lg leading-relaxed text-neutral-800">
                {t(description)}
              </p>

              <div>
                <h4 className="text-lg sm:text-xl font-bold text-emerald-900 mb-4">
                  {t(importanceTitle)}
                </h4>
                <ul className="space-y-2">
                  {importanceItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1">•</span>
                      <p className="text-sm sm:text-base text-neutral-800">{t(item)}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg sm:text-xl font-bold text-emerald-900 mb-4">
                  {t(rolesTitle)}
                </h4>
                <ul className="space-y-2">
                  {rolesItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1">•</span>
                      <p className="text-sm sm:text-base text-neutral-800">{t(item)}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {projectLink && (
                <div className="pt-4">
                  <LinkBtn 
                    title={t(projectLinkText)} 
                    href={projectLink} 
                    target="_blank" 
                    variant="outline" 
                    locale={locale} 
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Discord Section */}
      <section className="py-16 sm:py-20 lg:py-40 px-4 sm:px-6 lg:px-[4%] bg-neutral-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-col items-center gap-4 sm:gap-6">
            <h3 className="text-lg sm:text-xl font-semibold text-emerald-900">
              {t(discordText)}
            </h3>
            <Link 
              href={discordLink}
              target="_blank"
              className="group flex items-center gap-3 hover:opacity-90 transition-opacity"
            >
              <SafeImage
                src={t(discordImage)}
                alt="Discord"
                width={200}
                height={60}
                className="object-contain"
                sizes="200px"
              />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 