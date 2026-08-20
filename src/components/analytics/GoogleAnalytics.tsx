"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const GA_MEASUREMENT_ID = "G-8Q8J5KPQFC";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || typeof window.gtag !== "function") return;

    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: `${pathname}${window.location.search}`,
    });
  }, [pathname]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = function(){window.dataLayer.push(arguments);};
          window.gtag('js', new Date());
          window.gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
