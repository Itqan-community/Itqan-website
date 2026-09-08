import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import StatsCard from "@/components/home/StatsCard";
import ImpactSection from "@/components/home/ImpactSection";
import ImpactSectionMobile from "@/components/home/ImpactSectionMobile";
import CtaSection from "@/components/home/CtaSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import ProjectsSectionMobile from "@/components/home/ProjectsSectionMobile";
import LaunchSection from "@/components/home/LaunchSection";
import LaunchSectionMobile from "@/components/home/LaunchSectionMobile";
import AppsSection from "@/components/home/AppsSection";
import PublisherSection from "@/components/home/PublisherSection";
import PartnersSection from "@/components/home/PartnersSection";
import PartnersSectionMobile from "@/components/home/PartnersSectionMobile";
import NewsletterSection from "@/components/home/NewsletterSection";
import FaqSection from "@/components/home/FaqSection";
import { getDictionary, hasLocale } from "@/lib/i18n";

/**
 * إتقان — Full Website (Figma 20:870), 1440×8446.
 * Section order and vertical rhythm follow the frame top-to-bottom.
 */

// Newsletter cards come from MailerLite; render on the server so the API key is available.
export const dynamic = "force-dynamic";
export default async function HomePage({
  params,
}: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <Navbar locale={locale} />
      <main className="flex-1">
        <Hero dict={dict.home.hero} />
        <StatsCard dict={dict.home.stats} />
        <ImpactSection dict={dict.home.impact} />
        <ImpactSectionMobile dict={dict.home.impactMobile} />
        <CtaSection dict={dict.home.cta} />
        <ProjectsSection dict={dict.home.projects} />
        <ProjectsSectionMobile dict={dict.home.projectsMobile} />
        <LaunchSection dict={dict.home.launch} />
        <LaunchSectionMobile dict={dict.home.launchMobile} />
        <AppsSection dict={dict.home.apps} />
        <PublisherSection dict={dict.home.publisher} />
        <PartnersSection dict={dict.home.partners} />
        <PartnersSectionMobile dict={dict.home.partnersMobile} />
        <NewsletterSection
          dict={dict.home.newsletter}
          formLabels={dict.newsletterForm}
          locale={locale}
        />
        <FaqSection dict={dict.home.faq} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
