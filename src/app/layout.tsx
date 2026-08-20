import type { Metadata } from "next";
import { Readex_Pro, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
  title: "إتقان — حيث يلتقي من يخدمون القرآن بالتقنية",
  description:
    "مجتمع إتقان: جمعية ومجتمع تقني مفتوح المصدر يسعى لسد الفجوة وتوفير برمجيات ومصاحف رقمية خالية من الأخطاء ومهيئة للاستخدام مباشرة في الأنظمة والتطبيقات.",
  icons: {
    icon: "/figma/logo-itqan-small.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${readex.variable} ${jetbrains.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}
