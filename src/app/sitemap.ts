import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { locales } from "@/lib/i18n";

const BASE_URL = "https://itqan.dev";

export const dynamic = "force-static";

const PATHS = [
  "",
  "/services",
  "/projects",
  "/newsletter",
  "/articles",
  ...articles.map((article) => `/articles/${article.slug}`),
];

const CHANGE_FREQUENCY = {
  "": "monthly",
  "/services": "monthly",
  "/projects": "monthly",
  "/newsletter": "monthly",
  "/articles": "weekly",
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap((path) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}${path}`,
      changeFrequency: (CHANGE_FREQUENCY as Record<string, MetadataRoute.Sitemap[number]["changeFrequency"]>)[path] ?? "yearly",
      priority: path === "" ? 1 : path === "/articles" ? 0.7 : path === "/newsletter" ? 0.6 : 0.8,
      alternates: {
        languages: {
          ar: `${BASE_URL}/ar${path}`,
          en: `${BASE_URL}/en${path}`,
          "x-default": `${BASE_URL}/ar${path}`,
        },
      },
    }))
  );
}
