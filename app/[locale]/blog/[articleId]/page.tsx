import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ArticleDetails from "../../../components/ArticleDetails";
import { getArticleById } from "../../../data/articles";
import StructuredData from "@/app/components/StructuredData";

interface ArticlePageProps {
  params: {
    articleId: string;
    locale: string;
  };
}

export async function generateMetadata({ params: { articleId, locale } }: ArticlePageProps): Promise<Metadata> {
  const articleData = getArticleById(articleId);
  
  if (!articleData) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    };
  }

  const t = await getTranslations("blog");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://itqan.dev';
  
  // Get translated article title and description
  const articleTitle = t(articleData.title);
  const articleDescription = t(articleData.description);
  const articleSubtitle = t(articleData.subtitle);

  return {
    title: articleTitle,
    description: articleDescription,
    keywords: [
      "Quran Technology",
      "Islamic Software",
      "Quran Development",
      "Muslim Developers",
      "Open Source",
      articleTitle,
      "Quran Applications",
      "Islamic Technology"
    ],
    authors: [{ name: t(articleData.author) }],
    openGraph: {
      title: articleTitle,
      description: articleDescription,
      url: `${baseUrl}/${locale}/blog/${articleId}`,
      siteName: locale === 'ar' ? 'إتقان' : 'ITQAN',
      locale: locale,
      type: 'article',
      images: [
        {
          url: t(articleData.headerImage || articleData.contentImage),
          width: 1200,
          height: 630,
          alt: articleTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: articleTitle,
      description: articleDescription,
      images: [t(articleData.headerImage || articleData.contentImage)],
    },
    alternates: {
      canonical: `/${locale}/blog/${articleId}`,
      languages: {
        'ar': `/ar/blog/${articleId}`,
        'en': `/en/blog/${articleId}`,
      },
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { articleId, locale } = params;
  
  // Get article data from centralized data source
  const articleData = getArticleById(articleId);
  
  // Check if article exists
  if (!articleData) {
    notFound();
  }

  const t = await getTranslations("blog");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://itqan.dev';

  // Prepare structured data for the article
  const structuredData = {
    title: t(articleData.title),
    description: t(articleData.description),
    image: t(articleData.headerImage || articleData.contentImage),
    publishDate: t(articleData.publishDate),
    url: `${baseUrl}/${locale}/blog/${articleId}`,
  };

  return (
    <>
      <StructuredData type="article" data={structuredData} />
      <ArticleDetails {...articleData} locale={locale} />
    </>
  );
}

// Generate static params for known articles
export async function generateStaticParams() {
  const { getArticleIds } = await import("../../../data/articles");
  const ids = getArticleIds();
  
  // Generate params for both locales
  const params = [];
  for (const articleId of ids) {
    params.push({ articleId, locale: "ar" });
    params.push({ articleId, locale: "en" });
  }
  
  return params;
} 