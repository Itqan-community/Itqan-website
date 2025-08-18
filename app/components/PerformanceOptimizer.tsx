"use client";

import { useEffect } from 'react';

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Preload critical resources
    const preloadResources = () => {
      // Preload hero background image
      const heroImg = new Image();
      heroImg.src = '/images/home/hero-bg.avif';
      
      // Preload logo
      const logoImg = new Image();
      logoImg.src = '/logo.svg';
      
      // Preload critical fonts
      if ('fonts' in document) {
        document.fonts.load('300 1em Rubik');
        document.fonts.load('400 1em Rubik');
        document.fonts.load('600 1em Rubik');
      }
    };

    // Intersection Observer for lazy loading
    const setupIntersectionObserver = () => {
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
              }
            }
          });
        });

        // Observe all images with data-src
        document.querySelectorAll('img[data-src]').forEach((img) => {
          imageObserver.observe(img);
        });
      }
    };

    // Service Worker registration for caching
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          await navigator.serviceWorker.register('/sw.js');
        } catch (error) {
          console.log('Service Worker registration failed:', error);
        }
      }
    };

    // Initialize all optimizations
    preloadResources();
    setupIntersectionObserver();
    registerServiceWorker();

    // Cleanup
    return () => {
      // Cleanup if needed
    };
  }, []);

  return null; // This component doesn't render anything
}
