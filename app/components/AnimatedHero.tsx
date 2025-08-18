"use client";

import { Easing, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

// Force dynamic rendering to prevent caching issues
export const dynamic = 'force-dynamic';

// Add cache-busting headers
export const generateMetadata = () => {
  return {
    other: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  };
};

const cards = [1, 2, 3, 4, 5];

export default function AnimatedHero({ locale }: { locale: string }) {
  // Use locale prop instead of window.location.pathname
  const isRTL = locale === 'ar';
  
  // Force re-render when locale changes
  const [key, setKey] = useState(0);
  const [timestamp, setTimestamp] = useState(Date.now());
  
  useEffect(() => {
    setKey(prev => prev + 1);
    setTimestamp(Date.now());
  }, [locale]);

  // Memoize rotation values to prevent unnecessary recalculations
  const rotationValues = useMemo(() => {
    return isRTL ? [8, 4, 0, -4, -8] : [-8, -4, 0, 4, 8];
  }, [isRTL]);

  const bowAnimationDuration = 0.4;
  const bowAnimationDelay = 1.4;
  const cardsFadeInDelay = 0.4;
  const eaInOutg: Easing = [.36,.01,.25,1.16];

  return (
    <section className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          key={`container-${key}-${timestamp}`} // Force re-render of container with timestamp
          initial="hidden"
          // animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="flex gap-4"
          animate={{
            gap: ["1rem", "3rem"],
            transition: {
              delay: bowAnimationDelay,
              duration: bowAnimationDuration,
              ease: "easeInOut",
            }
          }}
        >
          {cards.map((card, i) => {
            const offsets = [0, -40, -60, -40, 0];
            const yFinal = offsets[i];
            // Use memoized rotation values
            const rotation = rotationValues[i];
            // Also flip initial rotation for RTL
            const initialRotation = 0;

            return (
              <motion.div
                key={`${card}-${locale}-${key}-${timestamp}`} // Add locale, key, and timestamp to force re-render on language change
                className="h-40 w-28 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg"
                initial={{ opacity: 0, y: 100, rotate: initialRotation, scale: 0.8 }}
                animate={{
                  opacity: [0, 1, 1],
                  y: [100, yFinal],
                  rotate: [initialRotation, rotation],
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    ease: [0.175, 0.885, 0.32, 1.275], // Bounce easing
                    opacity: {
                      duration: 0.8,
                      delay: i === 0 ? .5 : (((i+1)/cards.length * cardsFadeInDelay) + .5), // Each card starts appearing when previous is 50% done
                    },
                    y: {
                      delay: bowAnimationDelay,
                      duration: bowAnimationDuration,
                      ease: eaInOutg,
                    },
                    rotate: {
                      delay: bowAnimationDelay,
                      duration: bowAnimationDuration
                    }
                  },
                }}
                whileHover={{
                  scale: 1.2,
                  transition: { 
                    duration: 0.3,
                    ease: "easeOut"
                  }
                }}
              />
            );
          })}
        </motion.div>

        <motion.h1 
          key={`title-${locale}-${key}-${timestamp}`} // Add locale, key, and timestamp to force re-render on language change
          className="text-4xl font-bold text-emerald-900"
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: bowAnimationDuration,
              delay: bowAnimationDelay + 0.2, // Increased delay to appear after cards
              ease: [0.19, 1, 0.22, 1],
            }
          }}
        >
          Beautiful Cards
        </motion.h1>
      </div>
    </section>
  );
}
