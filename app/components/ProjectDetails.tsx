import Image from "next/image";
import Link from "next/link";
import LinkBtn from "./LinkBtn";
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
  projectLink: string;
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
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
            {t(title)}
          </h3>
          <p className="text-base sm:text-lg max-w-4xl mx-auto leading-relaxed">
            {t(subtitle)}
          </p>
        </div>
        {/* {headerImage && (
          <div className="w-full h-64 md:h-96 relative">
            <Image
              src={t(headerImage)}
              alt={t(title)}
              fill
              className="object-cover rounded-lg"
              sizes="100vw"
            />
          </div>
        )} */}
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto mt-8 sm:mt-12 px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Image */}
          <div className="relative w-full max-w-sm mx-auto lg:max-w-none lg:mt-0 h-fit">
            <Image
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
                  href={t(projectLink)}
                  target="_blank"
                  variant="fill"
                  locale={locale}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Discord Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex justify-center">
          <Link
            href={t(discordLink)}
            target="_blank"
            rel="noopener"
            className="group bg-white rounded-3xl p-4 sm:p-6 flex items-center gap-3 sm:gap-4 hover:shadow-lg transition-all duration-200 max-w-md w-full"
          >
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
              <Image
                src={t(discordImage)}
                alt="Discord"
                fill
                className="object-cover rounded-lg"
                sizes="64px"
              />
            </div>
            <div className="flex items-center gap-2">
              <p className="text-base sm:text-lg font-medium text-emerald-900">
                {t(discordText)}
              </p>
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#5865F2] rounded flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 