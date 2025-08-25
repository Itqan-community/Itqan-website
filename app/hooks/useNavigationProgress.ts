"use client";

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function useNavigationProgress() {
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const intervalRef = useRef<NodeJS.Timeout>();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const navigationStartTime = useRef<number>(0);

  useEffect(() => {
    const startNavigation = () => {
      // Prevent multiple simultaneous navigations
      if (isNavigating) return;
      
      setIsNavigating(true);
      setProgress(0);
      navigationStartTime.current = Date.now();

      // Clear any existing intervals
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Start progress animation
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            return 90;
          }
          return prev + Math.random() * 15 + 5;
        });
      }, 100);
    };

    const completeNavigation = () => {
      setProgress(100);
      
      // Clear any existing timeouts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setIsNavigating(false);
        setProgress(0);
      }, 300);
    };

    // Detect navigation start by monitoring link clicks
    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && 
          link.href && 
          link.href !== window.location.href && 
          !link.href.startsWith('mailto:') && 
          !link.href.startsWith('tel:') &&
          !link.target && // Don't trigger for external links with target="_blank"
          !link.hasAttribute('download') &&
          !link.href.includes('#')) { // Don't trigger for anchor links
        startNavigation();
      }
    };

    // Detect Next.js Link component clicks (they might not have href immediately)
    const handleNextLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest('[role="link"], [data-navigation]');
      
      if (link) {
        startNavigation();
      }
    };

    // Detect programmatic navigation
    const handlePopState = () => {
      startNavigation();
    };

    // Add event listeners
    if (typeof window !== 'undefined') {
      document.addEventListener('click', handleLinkClick);
      document.addEventListener('click', handleNextLinkClick);
      window.addEventListener('popstate', handlePopState);
    }

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      if (typeof window !== 'undefined') {
        document.removeEventListener('click', handleLinkClick);
        document.removeEventListener('click', handleNextLinkClick);
        window.removeEventListener('popstate', handlePopState);
      }
    };
  }, []);

  // Handle pathname changes (navigation completion)
  useEffect(() => {
    if (pathname !== previousPathname.current) {
      previousPathname.current = pathname;
      
      if (isNavigating) {
        // Calculate minimum loading time to prevent flickering
        const elapsed = Date.now() - navigationStartTime.current;
        const minLoadingTime = Math.max(300, elapsed);
        
        // Complete navigation when pathname changes (new page is loaded)
        const completeTimeout = setTimeout(() => {
          setProgress(100);
          setTimeout(() => {
            setIsNavigating(false);
            setProgress(0);
          }, 200);
        }, minLoadingTime);

        return () => clearTimeout(completeTimeout);
      }
    }
  }, [pathname, isNavigating]);

  return { isNavigating, progress };
}
