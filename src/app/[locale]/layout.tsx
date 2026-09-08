import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Readex_Pro, JetBrains_Mono } from "next/font/google";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";
import "../globals.css";
import ogImage from "../og-image.png";

const readex = Readex_Pro({
  variable: "--font-readex",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL("https://itqan.dev"),
    title: dict.meta.title,
    description: dict.meta.description,
    applicationName: dict.meta.applicationName,
    authors: [{ name: dict.meta.authorName }],
    creator: dict.meta.authorName,
    publisher: dict.meta.authorName,
    icons: { icon: "/figma/logo-itqan-small.png" },
    alternates: {
      languages: {
        ar: `https://itqan.dev/ar`,
        en: `https://itqan.dev/en`,
        "x-default": `https://itqan.dev/ar`,
      },
    },
    // Declared here rather than via the `opengraph-image.png` file convention:
    // Turbopack doesn't read `opengraph-image.alt.txt`, so alt text would be dropped.
    openGraph: {
      images: [
        {
          url: ogImage.src,
          width: ogImage.width,
          height: ogImage.height,
          type: "image/png",
          alt: dict.meta.ogAlt,
        },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${readex.variable} ${jetbrains.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
