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

/**
 * إتقان — Full Website (Figma 20:870), 1440×8446.
 * Section order and vertical rhythm follow the frame top-to-bottom.
 */

// The newsletter section fetches the latest campaigns from MailerLite.
export const revalidate = 3600;
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <StatsCard />
        <ImpactSection />
        <ImpactSectionMobile />
        <CtaSection />
        <ProjectsSection />
        <ProjectsSectionMobile />
        <LaunchSection />
        <LaunchSectionMobile />
        <AppsSection />
        <PublisherSection />
        <PartnersSection />
        <PartnersSectionMobile />
        <NewsletterSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
