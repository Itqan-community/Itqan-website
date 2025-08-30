"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

interface NewsletterSubscribeProps {
  locale: string;
}

export default function NewsletterSubscribe({ locale }: NewsletterSubscribeProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const t = useTranslations("newsletter");

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
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      // In case of error, still show success for UX
      setIsSuccess(true);
      setFormData({ name: "", email: "" });
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
      <div className="w-full max-w-md">
        <div className="text-center p-6 bg-primary-50 rounded-2xl border border-primary-200">
          <h4 className="text-lg font-bold text-primary-900 mb-2 font-fustat">
            {t("successTitle")}
          </h4>
          <p className="text-primary-700 text-sm">
            {t("successMessage")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-4">
        <h4 className="text-lg font-bold text-neutral-100 mb-2 font-fustat">
          {t("title")}
        </h4>
        <p className="text-secondary-300 text-sm leading-relaxed">
          {t("description")}
        </p>
      </div>

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
            className="w-full px-4 py-3 rounded-lg bg-white border border-neutral-200 text-neutral-900 placeholder-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors text-sm"
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
            className="w-full px-4 py-3 rounded-lg bg-white border border-neutral-200 text-neutral-900 placeholder-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors text-sm"
            dir={locale === "ar" ? "rtl" : "ltr"}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !formData.email}
          className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 hover-lift text-sm"
        >
          {isSubmitting ? t("submitting") : t("subscribe")}
        </button>
      </form>
    </div>
  );
}
