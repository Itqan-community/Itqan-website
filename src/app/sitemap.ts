import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";

const BASE_URL = "https://itqan.dev";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/services`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/projects`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/newsletter`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/articles`, changeFrequency: "weekly", priority: 0.7 },
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/articles/${article.slug}`,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticPages, ...articlePages];
}
