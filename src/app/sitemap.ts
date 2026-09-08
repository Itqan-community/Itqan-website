import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { locales } from "@/lib/i18n";

const BASE_URL = "https://itqan.dev";

export const dynamic = "force-static";

type PathConfig = {
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const STATIC_PATHS: Record<string, PathConfig> = {
  "": { changeFrequency: "monthly", priority: 1 },
  "/services": { changeFrequency: "monthly", priority: 0.8 },
  "/projects": { changeFrequency: "monthly", priority: 0.8 },
  "/newsletter": { changeFrequency: "monthly", priority: 0.6 },
  "/articles": { changeFrequency: "weekly", priority: 0.7 },
};

const ARTICLE_CONFIG: PathConfig = { changeFrequency: "yearly", priority: 0.5 };

const PATHS: Record<string, PathConfig> = {
  ...STATIC_PATHS,
  ...Object.fromEntries(
    articles.map((article) => [`/articles/${article.slug}`, ARTICLE_CONFIG]),
  ),
};

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.entries(PATHS).flatMap(([path, config]) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}${path}`,
      changeFrequency: config.changeFrequency,
      priority: config.priority,
      alternates: {
        languages: {
          ...Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}${path}`]),
          ),
          "x-default": `${BASE_URL}/${locales[0]}${path}`,
        },
      },
    })),
  );
}
