"use client";

import { useEffect } from 'react';

export default function WebVitals() {
  useEffect(() => {
    // Dynamically import web-vitals to avoid blocking the main thread
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Send to analytics
      const sendToAnalytics = (metric: any) => {
        // Send to Google Analytics if available
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', metric.name, {
            custom_parameter_1: Math.round(metric.value),
            custom_parameter_2: metric.id,
            custom_parameter_3: metric.delta,
          });
        }
        
        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
          console.log('Web Vital:', metric);
        }
      };

      // Monitor all Core Web Vitals
      getCLS(sendToAnalytics);
      getFID(sendToAnalytics);
      getFCP(sendToAnalytics);
      getLCP(sendToAnalytics);
      getTTFB(sendToAnalytics);
    }).catch((error) => {
      console.warn('Failed to load web-vitals:', error);
    });
  }, []);

  return null;
}
