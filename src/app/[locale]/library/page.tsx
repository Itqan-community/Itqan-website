import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { hasLocale, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "مكتبة مجتمع إتقان للموارد والتقنيات القرآنية — إتقان",
  description:
    "دليل رقمي متخصص ومصنّف للأصول التقنية المفتوحة: يشمل نماذج تسميع القرآن، حزم الصوتيات، الخطوط، البرمجيات، والأبحاث.",
};

export default async function LibraryPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  return (
    <>
      <Navbar locale={locale} />
      <main className="flex-1 w-full min-h-screen bg-[#f8faf9]">
        <iframe
          src="/library/index.html"
          title="مكتبة إتقان للموارد المفتوحة"
          className="w-full h-full min-h-[90vh] border-0"
        />
      </main>
      <Footer locale={locale} />
    </>
  );
}
