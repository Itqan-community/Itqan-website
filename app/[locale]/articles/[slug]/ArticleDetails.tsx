import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/app/sanity/image";
import { Locale } from "@/i18n/routing";
import ForwardArrow from "../../../components/ForwardArrow";
import { FaDownload } from "react-icons/fa";

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
        const fileUrl = getFileUrl(block.file);
        return (
          <div key={getLocalizedContent(block.title)} className="mb-8">
            {fileUrl && (
              <Link
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="bg-neutral-50 rounded-xl p-6 border border-neutral-200 cursor-pointer flex items-center justify-between mt-8"
              >
                <p className="text-sm sm:text-base leading-relaxed">
                  {getLocalizedContent(block.title)}
                </p>
                <FaDownload size={20} />
              </Link>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-auto max-w-3xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
      {/* Back Button */}
      <div className="px-4 sm:px-6 pt-6 sm:pt-8">
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
        <div className="text-center mt-8 sm:mt-12 px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 leading-tight text-primary-900">
            {getLocalizedContent(article.title)}
          </h1>
          {article.subtitle && (
            <p className="text-base sm:text-lg max-w-4xl mx-auto leading-relaxed mb-6 text-neutral-500">
              {getLocalizedContent(article.subtitle)}
            </p>
          )}
        </div>
        
        {article.image && article.image.asset && (
          <div className="max-w-6xl mx-auto w-full h-64 md:h-96 relative mt-8">
            <Image
              src={urlFor(article.image).url()}
              alt={getLocalizedContent(article.title)}
              fill
              className="object-cover rounded-lg"
              sizes="100vw"
              priority
            />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto mt-8 sm:mt-12 px-4 sm:px-6 py-8 sm:py-12">
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
    </div>
  );
}
