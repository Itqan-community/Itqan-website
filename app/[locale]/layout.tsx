import { Locale, routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import "@/app/globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "../components/Footer";
import { seoData } from "../data/seoData";
// import { headers } from "next/headers";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const messages = await getMessages();
  const t = messages.home as { title: string; description: string };
  const meta = seoData[locale as 'en' | 'ar'];

  return {
    title: {
      default: locale === 'ar' ? 'إتقان | مجتمع تطوير تقنيات القرآن' : 'ITQAN | Quran Tech Community',
      template: locale === 'ar' ? '%s | إتقان' : '%s | ITQAN'
    },
    description: meta.description,
    keywords: ["Quran", "Technology", "Muslim", "Open Source", "Community", "Quran Apps"],
    authors: [{ name: "Itqan Community" }],
    creator: "Itqan Community",
    publisher: "Itqan Community",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
    alternates: {
      canonical: '/',
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
        {/* Favicon icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="bg-gray-100 flex flex-col min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale} />
          <main className="flex-1">
            {children}
          </main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}