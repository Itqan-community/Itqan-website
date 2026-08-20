import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewsletterCard from "@/components/newsletter/NewsletterCard";
import {
  filterNewsletterArchiveForDisplay,
  getNewsletterArchive,
  type MailerLiteCampaign,
} from "@/lib/mailerlite";

export const metadata: Metadata = {
  title: "نشرة إتقان البريدية",
  description:
    "أرشيف نشرات إتقان — قصص مُلهمة وأدوات عملية ونقاشات ثرية من عالم التقنيات القرآنية.",
};

// Fetch MailerLite at request time so Netlify runtime env is visible.
export const dynamic = "force-dynamic";

const PAGE_SIZE = 12;
const MAX_CAMPAIGNS = 60;

async function loadArchive(): Promise<MailerLiteCampaign[]> {
  const campaigns: MailerLiteCampaign[] = [];
  let page = 1;
  let lastPage = 1;

  do {
    const response = await getNewsletterArchive(page, PAGE_SIZE);
    campaigns.push(...(response.data ?? []));
    lastPage = response.meta?.last_page ?? page;
    page += 1;
  } while (page <= lastPage && campaigns.length < MAX_CAMPAIGNS);

  return filterNewsletterArchiveForDisplay(campaigns);
}

export default async function NewsletterArchivePage() {
  let campaigns: MailerLiteCampaign[] = [];
  let failed = false;

  try {
    campaigns = await loadArchive();
  } catch (error) {
    console.error("Failed to load newsletter archive:", error);
    failed = true;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="shell py-[64px] lg:py-[96px]">
          <div className="flex flex-col items-start gap-[12px]">
            <span className="badge">أرشيف النشرة</span>
            <h1 className="text-[26px] font-bold text-[var(--color-txt)] lg:text-[36px]">
              نشرة إتقان البريدية
            </h1>
            <p className="max-w-[660px] text-[14px] leading-[normal] text-[var(--color-txt-dim)] lg:text-[16px]">
              كل إصدارات النشرة منذ البداية — قصص مُلهمة وأدوات عملية من عالم التقنيات
              القرآنية.
            </p>
          </div>

          {failed ? (
            <p className="mt-[48px] text-[15px] text-[var(--color-txt-dim)]">
              تعذر تحميل الأرشيف حاليًا. يرجى المحاولة لاحقًا.
            </p>
          ) : campaigns.length === 0 ? (
            <p className="mt-[48px] text-[15px] text-[var(--color-txt-dim)]">
              لا توجد نشرات منشورة بعد.
            </p>
          ) : (
            <div className="mt-[48px] grid grid-cols-1 gap-[24px] md:grid-cols-2 lg:grid-cols-3">
              {campaigns.map((campaign) => (
                <NewsletterCard key={campaign.id} campaign={campaign} showDate />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
