"use client";

import { useIntersectionObserver } from '@/app/hooks/useIntersectionObserver';
import { ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

export default function LazySection({
  children,
  fallback = <div className="h-32 animate-pulse bg-gray-100 rounded" />,
  className = '',
  threshold = 0.1,
  rootMargin = '0px 0px 200px 0px',
}: LazySectionProps) {
  const { targetRef, isVisible } = useIntersectionObserver({
    threshold,
    rootMargin,
    freezeOnceVisible: true,
  });

  return (
    <div ref={targetRef} className={className}>
      {isVisible ? children : fallback}
    </div>
  );
}
