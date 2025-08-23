import Link from "next/link";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/app/sanity/live";
import { Locale } from "@/i18n/routing";
import { FaTools } from "react-icons/fa";
import ForwardArrow from "../../components/ForwardArrow";
import { getTranslations } from "next-intl/server";

const TOOLS_QUERY = defineQuery(`*[_type == "tool"]{
  name,
  title,
  description,
  author,
  url
}`);

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';

export default async function ToolsPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const { data: tools } = await sanityFetch({ query: TOOLS_QUERY });
  const t = await getTranslations("tools");

  return (
    <section aria-label="Tools" className="py-16 sm:py-20 lg:py-40 px-4 sm:px-6 lg:px-[4%] bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:justify-between mb-8 sm:mb-12">
          <div className="text-start max-w-[635px] mb-6 sm:mb-0">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
              {t("title")}
            </h2>
            <p className="text-xl sm:text-2xl text-primary-700 mb-6 sm:mb-0">
              {t("description")}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6 sm:gap-8">
          {tools.map((tool: any) => {
            // Extract localized content
            const title = typeof tool?.title === 'object' 
              ? tool.title[locale] || tool.title.ar || tool.title.en || ''
              : tool?.title || '';
            
            const description = typeof tool?.description === 'object'
              ? tool.description[locale] || tool.description.ar || tool.description.en || ''
              : tool?.description || '';

            const author = typeof tool?.author === 'object'
              ? tool.author[locale] || tool.author.ar || tool.author.en || ''
              : tool?.author || '';

            return (
              <Link 
                key={tool?.name}
                href={tool?.url || '#'} 
                target="_blank" 
                className="flex flex-col gap-4 p-4 sm:p-6 rounded-xl bg-white hover:shadow-xl shadow-neutral-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col">
                  <h4 className="text-lg sm:text-xl font-semibold mb-2">{title}</h4>
                  <p className="text-neutral-600 text-sm sm:text-base font-medium leading-relaxed mb-4">
                    {description}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-primary-900 gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-neutral-500">{t("author")}:</span>
                      <span className="text-sm text-neutral-500 font-medium">{author}</span>
                    </div>
                    <ForwardArrow size={16} silent locale={locale} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
