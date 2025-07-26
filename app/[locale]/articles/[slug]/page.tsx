import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/app/sanity/live";
import { Locale } from "@/i18n/routing";
import ArticleDetails from "./ArticleDetails";
import { notFound } from "next/navigation";

const ARTICLE_QUERY = defineQuery(`*[_type == "article" && slug.current == $slug][0]{
  name,
  slug,
  title,
  subtitle,
  description,
  image{
    _type,
    alt,
    caption,
    asset->
  },
  contentSections[]{
    title,
    blocks[]{
      type,
      title,
      description,
      points[]{
        title,
        description
      },
      columns[],
      rows[]
    }
  }
}`);

interface ArticlePageProps {
  params: {
    locale: Locale;
    slug: string;
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { data: article } = await sanityFetch({ 
    query: ARTICLE_QUERY,
    params: { slug: params.slug }
  });

  if (!article) {
    notFound();
  }

  return <ArticleDetails article={article} locale={params.locale} />;
} 