import Link from "next/link";
import LinkBtn from "./LinkBtn";
import SafeImage from "./SafeImage";
import { getTranslations } from "next-intl/server";
import ForwardArrow from "./ForwardArrow";
import { urlFor } from "../sanity/image";

interface ProjectDetailsProps {
  project: any;
  locale: string;
  title: string;
  description: string;
  subDescription?: string;
}

export default async function ProjectDetails({
  project,
  locale = "ar",
  title,
  description,
  subDescription,
}: ProjectDetailsProps) {
  const t = await getTranslations("home.projects");

  // Helper function to safely get image URL
  const getImageUrl = (image: any) => {
    try {
      if (!image || !image.asset) return null;
      return urlFor(image).url();
    } catch (error) {
      console.error('Error generating image URL:', error);
      return null;
    }
  };

  // Helper function to render content blocks
  const renderContentBlock = (block: any) => {
    if (!block || !block.type) return null;

    const blockTitle = typeof block.title === 'object' && block.title
      ? block.title[locale] || block.title.en 
      : block.title || '';
    const blockDescription = typeof block.description === 'object' && block.description
      ? block.description[locale] || block.description.en
      : block.description || '';

    switch (block.type) {
      case 'text':
        return (
          <div key={block._key || `block-${Math.random()}`} className="mb-8">
            {blockTitle && (
              <h4 className="text-lg sm:text-xl font-bold text-primary-900 mb-4">
                {blockTitle}
              </h4>
            )}
            {blockDescription && (
              <p className="text-sm sm:text-base text-neutral-800 leading-relaxed">
                {blockDescription}
              </p>
            )}
          </div>
        );
      
             case 'bullets':
         return (
           <div key={block._key || `block-${Math.random()}`} className="mb-8">
             {blockTitle && (
               <h4 className="text-[28px] font-bold text-primary-700 mb-4">
                 {blockTitle}
               </h4>
             )}
             {block.points && Array.isArray(block.points) && (
               <ul className="space-y-2">
                 {block.points.map((point: any, index: number) => {
                   const pointTitle = typeof point.title === 'object' && point.title
                     ? point.title[locale] || point.title.en
                     : point.title || '';
                   const pointDescription = typeof point.description === 'object' && point.description
                     ? point.description[locale] || point.description.en
                     : point.description || '';
                   
                   return (
                     <li key={index} className="flex items-start gap-2">
                       <span className="text-neutral-600 mt-1">•</span>
                       <div>
                         {pointTitle && (
                           <p className="text-sm sm:text-base font-medium text-neutral-800">{pointTitle}</p>
                         )}
                         {pointDescription && (
                           <p className="text-sm text-neutral-600 mt-1">{pointDescription}</p>
                         )}
                       </div>
                     </li>
                   );
                 })}
               </ul>
             )}
           </div>
         );
      
      case 'table':
        return (
          <div key={block._key || `block-${Math.random()}`} className="mb-8">
            {blockTitle && (
              <h4 className="text-lg sm:text-xl font-bold text-primary-900 mb-4">
                {blockTitle}
              </h4>
            )}
            {block.columns && Array.isArray(block.columns) && block.rows && Array.isArray(block.rows) && (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-neutral-300">
                  <thead>
                    <tr>
                      {block.columns.map((column: any, index: number) => {
                        const columnText = typeof column === 'object' && column
                          ? column[locale] || column.en
                          : column || '';
                        return (
                          <th key={index} className="border border-neutral-300 px-4 py-2 bg-neutral-100 text-left">
                            {columnText}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row: any, rowIndex: number) => (
                      <tr key={rowIndex}>
                        {row.cells && Array.isArray(row.cells) && row.cells.map((cell: any, cellIndex: number) => (
                          <td key={cellIndex} className="border border-neutral-300 px-4 py-2">
                            {cell || ''}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      
      case 'downloadable':
        return (
          <div key={block._key || `block-${Math.random()}`} className="mb-8">
            {blockTitle && (
              <h4 className="text-lg sm:text-xl font-bold text-primary-900 mb-4">
                {blockTitle}
              </h4>
            )}
            {block.file && (
              <LinkBtn 
                title={t("downloadFile")} 
                href={getImageUrl(block.file) || '#'} 
                target="_blank" 
                variant="outline" 
                locale={locale} 
              />
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <article className="min-h-screen w-auto">

      {/* Header Section - centered */}
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-white" id="cover">
        <div className="max-w-6xl w-full mx-auto text-center">
          <h3 className="text-[56px] font-semibold text-primary-700 mb-6 leading-tight">
            {title}
          </h3>
          {subDescription && (
            <p className="text-[20px] font-normal max-w-3xl mx-auto leading-relaxed mb-12">
              {subDescription}
            </p>
          )}
                     {project.image && (
             <div className="w-full">
               <div className="w-full aspect-[2/1] relative">
                                   <SafeImage
                    src={getImageUrl(project.image) || '/images/projects/default.jpg'}
                    alt={title || 'Project image'}
                    fill
                    className="object-cover rounded-[32px]"
                    sizes="100vw"
                    priority
                  />
               </div>
             </div>
           )}
        </div>
      </div>

             {/* Content Section */}
       <section className="py-16 sm:py-20 lg:py-40 px-4 sm:px-6 lg:px-[4%] bg-neutral-50">
        <div className="max-w-6xl mx-auto">
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                         {/* Image */}
             {project.subImage && (
               <div className="relative w-full max-w-sm mx-auto lg:max-w-none lg:mt-0 h-fit">
                  <SafeImage
                    src={getImageUrl(project.subImage) || '/images/projects/default.jpg'}
                    alt={title || 'Project sub image'}
                    width={500}
                    height={800}
                    className="w-full h-auto max-h-[800px] object-cover rounded-[32px]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  />
               </div>
             )}

            {/* Content */}
            <div className="space-y-6">
              <p className="text-base sm:text-lg leading-relaxed text-neutral-800">
                {description}
              </p>

              {/* Render content blocks */}
              {project.contentBlocks && Array.isArray(project.contentBlocks) && 
                project.contentBlocks.map((block: any) => renderContentBlock(block))
              }

              {project.url && (
                <div className="pt-4">
                  <LinkBtn 
                    title={t("visitProject")} 
                    href={project.url} 
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
      <section className="py-16 sm:py-20 lg:py-40 px-4 sm:px-6 lg:px-[4%] bg-neutral-100 flex justify-center">
        <LinkBtn title={t("joinDiscord")} href={`https://discord.gg/24CskUbuuB`} target="_blank" variant="outline" locale={locale} />
      </section>
    </article>
  );
} 