import type { Metadata } from "next";
import { Readex_Pro, JetBrains_Mono } from "next/font/google";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import "./globals.css";
import ogImage from "./og-image.png";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://itqan.dev"),
  title: "إتقان — ملتقى العاملين على التقنيات القرآنية",
  description:
    "مجتمع تقني مفتوح المصدر يسعى لسد الفجوة التقنية وتوفير برمجيات لجميع العاملين على كتاب الله",
  applicationName: "إتقان",
  authors: [{ name: "إتقان" }],
  creator: "إتقان",
  publisher: "إتقان",
  icons: {
    icon: "/figma/logo-itqan-small.png",
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
        alt: "إتقان — ملتقى العاملين على التقنيات القرآنية",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${readex.variable} ${jetbrains.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
