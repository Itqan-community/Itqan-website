import { Locale, routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import "@/app/globals.css";
import Navbar from "@/app/components/Navbar";
// import { headers } from "next/headers";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const messages = await getMessages();
  const t = messages.home as { title: string; description: string };

  return {
    title: {
      default: "Itqan",
      template: "%s | Itqan"
    },
    description: t.description,
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
        'en': '/en',
        'ar': '/ar',
      },
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: '/',
      siteName: 'Itqan',
      locale: locale,
      type: 'website',
      images: [
        {
          url: '/og-image.jpg', // Make sure to add this image to your public folder
          width: 1200,
          height: 630,
          alt: 'Itqan - Serving Quran is our greatest Ghayah',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.description,
      images: ['/og-image.jpg'], // Same image as OpenGraph
      creator: '@itqan', // Add your Twitter handle
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

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const locale = params.locale;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  const messages = await getMessages();
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className="bg-gray-100">
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}