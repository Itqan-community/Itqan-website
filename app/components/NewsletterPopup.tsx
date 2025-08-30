"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { LuX } from "react-icons/lu";

interface NewsletterPopupProps {
  locale: string;
}

export default function NewsletterPopup({ locale }: NewsletterPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const t = useTranslations("newsletterPopup");

  // Check if it's the first visit and show popup
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem("itqan-newsletter-popup-shown");
    
    if (!hasVisitedBefore) {
      // Delay popup appearance for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000); // Show after 3 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const closePopup = () => {
    setIsOpen(false);
    // Mark that the popup has been shown
    localStorage.setItem("itqan-newsletter-popup-shown", "true");
  };

  // Close popup when clicking outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  // Close popup on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closePopup();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create FormData object with the required format for MailerLite
    const formDataObj = new FormData();
    formDataObj.append("fields[name]", formData.name);
    formDataObj.append("fields[email]", formData.email);
    formDataObj.append("ml-submit", "1");
    formDataObj.append("anticsrf", "true");

    try {
      const response = await fetch(
        "https://assets.mailerlite.com/jsonp/1744457/forms/163268270328120782/subscribe",
        {
          method: "POST",
          body: formDataObj,
          mode: "no-cors", // Required for cross-origin requests to MailerLite
        }
      );

      // Since mode is no-cors, we can't check response status
      // We'll assume success and show success message
      setIsSuccess(true);
      setFormData({ name: "", email: "" });
      
      // Close popup after successful subscription
      setTimeout(() => {
        closePopup();
      }, 2000);
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      // In case of error, still show success for UX
      setIsSuccess(true);
      setFormData({ name: "", email: "" });
      
      setTimeout(() => {
        closePopup();
      }, 2000);
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

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
      
      {/* Popup Modal */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div 
          className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-in-out ${
            isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={closePopup}
            className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-600 transition-colors z-10"
            aria-label={t("close")}
          >
            <LuX size={24} />
          </button>

          {/* Content */}
          <div className="p-8">
            {isSuccess ? (
              // Success State
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-2 font-fustat">
                  {t("successTitle")}
                </h3>
                <p className="text-neutral-600 text-sm">
                  {t("successMessage")}
                </p>
              </div>
            ) : (
              // Form State
              <>
                {/* Header */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-primary-900 mb-2 font-fustat">
                    {t("title")}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {t("description")}
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t("namePlaceholder")}
                      aria-label={t("namePlaceholder")}
                      autoComplete="given-name"
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 text-neutral-900 placeholder-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors text-sm"
                      dir={locale === "ar" ? "rtl" : "ltr"}
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t("emailPlaceholder")}
                      aria-label={t("emailPlaceholder")}
                      autoComplete="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 text-neutral-900 placeholder-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors text-sm"
                      dir={locale === "ar" ? "rtl" : "ltr"}
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.email}
                      className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 hover-lift text-sm"
                    >
                      {isSubmitting ? t("submitting") : t("subscribe")}
                    </button>
                    
                    <button
                      type="button"
                      onClick={closePopup}
                      className="px-6 py-3 border border-neutral-200 text-neutral-600 hover:bg-neutral-50 rounded-lg transition-colors duration-200 text-sm font-medium"
                    >
                      {t("later")}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
