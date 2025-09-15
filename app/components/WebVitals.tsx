"use client";

import { useEffect } from 'react';

export default function WebVitals() {
  useEffect(() => {
    // Dynamically import web-vitals to avoid blocking the main thread
    import('web-vitals').then((webVitals) => {
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

      // Monitor all Core Web Vitals using the correct API
      if ('onCLS' in webVitals) webVitals.onCLS(sendToAnalytics);
      if ('onINP' in webVitals) webVitals.onINP(sendToAnalytics); // INP replaces FID
      if ('onFCP' in webVitals) webVitals.onFCP(sendToAnalytics);
      if ('onLCP' in webVitals) webVitals.onLCP(sendToAnalytics);
      if ('onTTFB' in webVitals) webVitals.onTTFB(sendToAnalytics);
      
      // Fallback for older versions
      if ('onFID' in webVitals) (webVitals as any).onFID(sendToAnalytics);
    }).catch((error) => {
      console.warn('Failed to load web-vitals:', error);
    });
  }, []);

  return null;
}
