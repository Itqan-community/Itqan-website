"use client";

import { useState, useEffect } from "react";
import { MailerLiteCampaign, getNewsletterArchive } from "@/app/utils/mailerlite";
import { useTranslations } from "next-intl";
import NewsletterCard from "./NewsletterCard";
import LazySection from "./LazySection";

interface NewsletterArchiveProps {
  locale: string;
}

export default function NewsletterArchive({ locale }: NewsletterArchiveProps) {
  const [campaigns, setCampaigns] = useState<MailerLiteCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const t = useTranslations("newsletterArchive");

  // Load initial campaigns
  useEffect(() => {
    loadCampaigns(1, true);
  }, []);

  const loadCampaigns = async (page: number, isInitial = false) => {
    try {
      if (isInitial) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      
      setError(null);
      
      const response = await getNewsletterArchive(page, 10);
      
      if (response.data) {
        if (isInitial) {
          setCampaigns(response.data);
        } else {
          setCampaigns(prev => [...prev, ...response.data]);
        }
        
        // Check if there are more pages
        const hasMorePages = response.meta ? response.meta.current_page < response.meta.last_page : false;
        setHasMore(hasMorePages);
        setCurrentPage(page);
      }
    } catch (err) {
      console.error('Error loading newsletters:', err);
      setError(err instanceof Error ? err.message : 'Failed to load newsletters');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      loadCampaigns(currentPage + 1, false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
        <p className="text-neutral-600">{t("loading")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
          <div className="text-red-600 mb-2">
            <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-800 font-medium mb-2">Error loading newsletters</p>
          <p className="text-red-600 text-sm">{error}</p>
          <button
            onClick={() => loadCampaigns(1, true)}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-neutral-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-neutral-600 text-lg">{t("noNewsletters")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Newsletter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign, index) => (
            <LazySection
              key={campaign.id}
              fallback={
                <div className="bg-gray-100 rounded-2xl p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                  <div className="h-16 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              }
              threshold={0.1}
              rootMargin="200px"
            >
              <NewsletterCard campaign={campaign} locale={locale} />
            </LazySection>
          ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center pt-6">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 hover-lift flex items-center gap-2"
          >
            {loadingMore ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                {t("loading")}
              </>
            ) : (
              t("loadMore")
            )}
          </button>
        </div>
      )}
    </div>
  );
}
