import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/app/sanity/image";
import { Locale } from "@/i18n/routing";
import ForwardArrow from "../../../components/ForwardArrow";
import { FaDownload } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";

interface ArticleDetailsProps {
  article: {
    name: string;
    title: string | { [key: string]: string };
    subtitle: string | { [key: string]: string };
    description: string | { [key: string]: string };
    image: any;
    contentSections: Array<{
      title: string | { [key: string]: string };
      blocks: Array<{
        type: string;
        title?: string | { [key: string]: string };
        description?: string | { [key: string]: string };
        points?: Array<{
          title: string | { [key: string]: string };
          description: string | { [key: string]: string };
        }>;
        columns?: Array<{ [key: string]: string }>;
        rows?: Array<{ [key: string]: string }>;
        file?: {
          asset: {
            _ref: string;
            url: string;
          };
        };
      }>;
    }>;
  };
  locale: Locale;
}

export default async function ArticleDetails({ article, locale }: ArticleDetailsProps) {
  const t = await getTranslations("articles");

  // Helper function to safely extract localized content
  const getLocalizedContent = (content: string | { [key: string]: string } | undefined) => {
    if (!content) return '';
    if (typeof content === 'string') return content;
    return content[locale] || content.ar || content.en || '';
  };

  // Helper function to get file URL
  const getFileUrl = (file: any) => {
    if (!file || !file.asset) return null;
    return file.asset.url || null;
  };

  // Helper function to find downloadable blocks
  const getDownloadableBlocks = () => {
    const downloadableBlocks: any[] = [];
    article?.contentSections?.forEach((section: any) => {
      section.blocks?.forEach((block: any) => {
        if (block.type === 'downloadable') {
          downloadableBlocks.push(block);
        }
      });
    });
    return downloadableBlocks;
  };

  // Render content blocks
  const renderBlock = (block: any) => {
    switch (block.type) {
      case 'text':
        return (
          <div key={getLocalizedContent(block.title)} className="mb-8">
            {block.title && (
              <h4 className="text-neutral-900 mb-2 font-fustat">
                {getLocalizedContent(block.title)}
              </h4>
            )}
            {block.description && (
              <p className="text-sm sm:text-base leading-relaxed text-neutral-500">
                {getLocalizedContent(block.description)}
              </p>
            )}
          </div>
        );

      case 'bullets':
        return (
          <div key={getLocalizedContent(block.title)} className="mb-8">
            {block.title && (
              <h4 className="text-neutral-900 mb-2 font-fustat">
                {getLocalizedContent(block.title)}
              </h4>
            )}
            {block.points && (
              <ul className="list-disc list-inside space-y-4">
                {block.points.map((point: any, index: number) => (
                  <li key={index} className="text-neutral-500">
                    <span className="font-fustat text-neutral-900">
                      {getLocalizedContent(point.title)}
                    </span>
                    <p className="text-sm sm:text-base leading-relaxed mt-2 ml-5">
                      {getLocalizedContent(point.description)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );

      case 'table':
        return (
          <div key={getLocalizedContent(block.title)} className="mb-8">
            {block.title && (
              <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-4 font-fustat">
                {getLocalizedContent(block.title)}
              </h3>
            )}
            {block.columns && block.rows && (
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-neutral-300 text-sm">
                      <thead>
                        <tr className="bg-neutral-50">
                          {block.columns.map((column: any, index: number) => (
                            <th key={index} className="whitespace-nowrap border border-neutral-300 px-3 py-2 text-start text-neutral-900 font-fustat">
                              {getLocalizedContent(column)}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-300">
                        {block.rows.map((row: any, rowIndex: number) => (
                          <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                            {row.cells.map((cell: any, cellIndex: number) => (
                              <td key={cellIndex} className="whitespace-normal border border-neutral-300 px-3 py-2 text-neutral-500">
                                {cell[locale] || cell.ar || cell.en}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'downloadable':
        // Download actions are now rendered separately above the content
        return null;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-auto max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
      {/* Back Button */}
      <div className="pt-6 sm:pt-8">
        <Link 
          href={`/${locale}/articles`}
          className="inline-flex items-center gap-2 transition-colors"
        >
          <div className="scale-x-[-1]">
            <ForwardArrow silent size={16} locale={locale} />
          </div>
          <span className="text-sm sm:text-base">{t("backToArticles")}</span>
        </Link>
      </div>

      {/* Header Section */}
      <div className="relative" id="cover">
        <div className="text-start mt-8 sm:mt-12">
          <h1 className="text-5xl font-semibold mb-4 leading-tight text-primary-900">
            {getLocalizedContent(article.title)}
          </h1>
          {article.subtitle && (
            <p className="text-base sm:text-lg max-w-4xl leading-relaxed mb-6 text-neutral-500">
              {getLocalizedContent(article.subtitle)}
            </p>
          )}
        </div>
        
        {article.image && article.image.asset && (
          <div className="w-full h-72 md:h-[450px] lg:h-[520px] relative mt-8">
            <Image
              src={urlFor(article.image).url()}
              alt={getLocalizedContent(article.title)}
              fill
              className="object-cover rounded-3xl"
              sizes="100vw"
              priority
            />
          </div>
        )}
      </div>

      {/* Content and Download Section */}
      <div className="mt-8 sm:mt-12 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-6">
          {/* Content Section - Start Side */}
          <div className="flex-1 w-full">
            {/* Content Sections */}
            {article?.contentSections && (
              <div className="flex flex-col gap-12">
                {article.contentSections.map((section: any, sectionIndex: number) => (
                  <section key={sectionIndex}>
                    {section.title && (
                      <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-4 font-fustat">
                        {getLocalizedContent(section.title)}
                      </h3>
                    )}
                    <div className="space-y-6">
                      {section.blocks?.map((block: any, blockIndex: number) => (
                        <div key={blockIndex}>
                          {renderBlock(block)}
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </div>

          {/* Download Actions - End Side */}
          {getDownloadableBlocks().length > 0 && (
            <div className="w-full lg:w-auto lg:min-w-[320px] lg:max-w-[400px]">
              <div className="sticky top-8">
                {getDownloadableBlocks().map((block: any, index: number) => {
                  const fileUrl = getFileUrl(block.file);
                  return fileUrl ? (
                    <div key={index} className="mb-4">
                      <Link
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="relative overflow-hidden rounded-3xl cursor-pointer block w-full"
                      >
                        {/* Background image container */}
                        <div className="absolute inset-0">
                          <Image
                            src="/images/texture-bg.avif"
                            alt=""
                            fill
                            className="object-cover opacity-25 sepia-[1]"
                            sizes="(max-width: 768px) 100vw, 400px"
                          />
                          <div className="absolute inset-0 bg-primary-600/90"></div>
                        </div>
                        
                        {/* Content container */}
                        <div className="relative z-10 p-4">
                          {/* Header with icon and title */}
                          <div className="flex flex-col items-start gap-2 mb-2">
                            <div className="flex-shrink-0">
                              <LuDownload className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-white font-bold text-lg sm:text-xl leading-tight">
                                {getLocalizedContent(block.title)}
                              </h4>
                            </div>
                          </div>
                          
                          {/* Description/CTA */}
                          <div className="mt-1">
                            <p className="text-white/90 text-sm">
                              {getLocalizedContent(block.description) || (locale === 'ar' ? 'حمّل الدليل الآن' : 'Download the guide now')}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
