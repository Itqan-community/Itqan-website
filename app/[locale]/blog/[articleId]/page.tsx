import { notFound } from "next/navigation";
import ArticleDetails from "../../../components/ArticleDetails";
import { getArticleById } from "../../../data/articles";

interface ArticlePageProps {
  params: {
    articleId: string;
    locale: string;
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const { articleId, locale } = params;
  
  // Get article data from centralized data source
  const articleData = getArticleById(articleId);
  
  // Check if article exists
  if (!articleData) {
    notFound();
  }

  return <ArticleDetails {...articleData} locale={locale} />;
} 