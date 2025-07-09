import { Locale, routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import "@/app/globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "../components/Footer";
import { seoData } from "../data/seoData";
import GoogleAnalytics from "@/app/components/GoogleAnalytics";
import PageTracking from "@/app/components/PageTracking";
import StructuredData from "@/app/components/StructuredData";
// import { headers } from "next/headers";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const messages = await getMessages();
  const meta = seoData[locale as keyof typeof seoData];

  return {
    title: {
      default: locale === 'ar' ? 'إتقان | مجتمع تطوير تقنيات القرآن' : 'ITQAN | Quran Tech Community',
      template: locale === 'ar' ? '%s | إتقان' : '%s | ITQAN'
    },
    description: meta.description,
    keywords: [
      "itqan", "اتقان", "ITQAN", "إتقان",
      "Quran Technology", "Islamic Technology", "Quran Development", 
      "Muslim Developers", "Quran Apps", "Islamic Software",
      "Open Source", "Community", "Quranic Applications",
      "Quran Technology Community", "مجتمع تقنيات القرآن",
      "تطوير تطبيقات القرآن", "تقنيات إسلامية", "مطورون مسلمون"
    ],
    authors: [{ name: "Itqan Community - مجتمع إتقان" }],
    creator: "Itqan Community - مجتمع إتقان",
    publisher: "Itqan Community - مجتمع إتقان",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'ar': '/ar',
        'en': '/en',
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: meta.url,
      siteName: locale === 'ar' ? 'إتقان' : 'ITQAN',
      locale: locale,
      type: 'website',
      images: [
        {
          url: meta.image,
          width: 1200,
          height: 630,
          alt: locale === 'ar' ? 'إتقان - خدمة القرآن هي أعظم غايتنا' : 'Itqan - Serving Quran is our greatest Ghayah',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [meta.image],
      creator: '@itqan',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
      yahoo: 'your-yahoo-verification-code',
    },
  };
}

type Props = {
  children: React.ReactNode;
  params: { locale: Locale };
};

export default async function RootLayout({ children, params }: Props) {
  const locale = params.locale;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  const messages = await getMessages();
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        {/* Essential Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#059669" />
        <meta name="msapplication-TileColor" content="#059669" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={locale === 'ar' ? 'إتقان' : 'ITQAN'} />
        
        {/* Google Fonts - Rubik */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet" />
        
        {/* Favicon icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Structured Data */}
        <StructuredData />
      </head>
      <body className="bg-gray-100 flex flex-col min-h-screen" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale} />
          <main className="flex-1">
            {children}
          </main>
          <Footer locale={locale} />
          <GoogleAnalytics />
          <PageTracking />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}