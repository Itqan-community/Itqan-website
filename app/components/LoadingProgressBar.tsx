"use client";

import { useNavigationProgress } from '../hooks/useNavigationProgress';

export default function LoadingProgressBar() {
  const { isNavigating, progress } = useNavigationProgress();

  if (!isNavigating) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-primary-600 transition-all duration-300 ease-out">
      <div 
        className="h-full bg-primary-400 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
