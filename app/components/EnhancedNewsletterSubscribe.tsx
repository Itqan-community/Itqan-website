"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { subscribeToNewsletter } from "@/app/utils/mailerlite";

interface EnhancedNewsletterSubscribeProps {
  locale: string;
  sourcepage?: string;
}

export default function EnhancedNewsletterSubscribe({ 
  locale, 
  sourcepage = "homepage" 
}: EnhancedNewsletterSubscribeProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const t = useTranslations("newsletter");

  // Auto-reset success state after 3 seconds
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  // Auto-reset error state after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await subscribeToNewsletter(
        formData.email,
        formData.name || undefined,
        sourcepage
      );

      setIsSuccess(true);
      setFormData({ name: "", email: "" });
    } catch (err) {
      console.error("Newsletter subscription error:", err);
      setError(
        err instanceof Error 
          ? err.message 
          : locale === 'ar' 
            ? 'حدث خطأ أثناء الاشتراك. يرجى المحاولة مرة أخرى.'
            : 'An error occurred while subscribing. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-md md:max-w-4xl">
        <div className="text-center p-6 bg-green-50 rounded-2xl border border-green-200">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h4 className="text-lg font-bold text-green-900 mb-2 font-fustat">
            {t("successTitle")}
          </h4>
          <p className="text-green-700 text-sm">
            {t("successMessage")}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-md md:max-w-4xl">
        <div className="text-center p-6 bg-red-50 rounded-2xl border border-red-200 mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h4 className="text-lg font-bold text-red-900 mb-2 font-fustat">
            {locale === 'ar' ? 'خطأ في الاشتراك' : 'Subscription Error'}
          </h4>
          <p className="text-red-700 text-sm mb-3">
            {error}
          </p>
          <button
            onClick={() => setError(null)}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            {locale === 'ar' ? 'حاول مرة أخرى' : 'Try Again'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md md:max-w-4xl">
      <div className="mb-4">
        <h4 className="text-lg font-bold text-neutral-100 mb-2 font-fustat">
          {t("title")}
        </h4>
        <p className="text-secondary-300 text-sm leading-relaxed">
          {t("description")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t("namePlaceholder")}
            aria-label={t("namePlaceholder")}
            autoComplete="given-name"
            className="w-full px-4 py-3 rounded-lg bg-white border border-neutral-200 text-neutral-900 placeholder-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors text-sm"
            dir={locale === "ar" ? "rtl" : "ltr"}
          />
        </div>

        <div className="flex-1">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("emailPlaceholder")}
            aria-label={t("emailPlaceholder")}
            autoComplete="email"
            required
            className="w-full px-4 py-3 rounded-lg bg-white border border-neutral-200 text-neutral-900 placeholder-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors text-sm"
            dir={locale === "ar" ? "rtl" : "ltr"}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !formData.email}
          className="w-full md:w-auto md:px-8 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 hover-lift text-sm whitespace-nowrap flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              {t("submitting")}
            </>
          ) : (
            t("subscribe")
          )}
        </button>
      </form>

      {/* Source tracking indicator (only visible in development) */}
      {process.env.NODE_ENV === 'development' && (
        <p className="text-xs text-neutral-400 mt-2">
          Source: {sourcepage}
        </p>
      )}
    </div>
  );
}
