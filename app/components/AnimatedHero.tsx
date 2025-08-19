"use client";

import { Easing, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

// Force dynamic rendering to prevent caching issues
export const dynamic = 'force-dynamic';

const cards = [1, 2, 3, 4, 5];

export default function AnimatedHero({ locale }: { locale: string }) {
  // Use locale prop instead of window.location.pathname
  const isRTL = locale === 'ar';
  
  // Force re-render when locale changes
  const [key, setKey] = useState(0);
  
  useEffect(() => {
    setKey(prev => prev + 1);
  }, [locale]);

  // Memoize rotation values to prevent unnecessary recalculations
  const rotationValues = useMemo(() => {
    return isRTL ? [8, 4, 0, -4, -8] : [-8, -4, 0, 4, 8];
  }, [isRTL]);
  const xOffsets = useMemo(() => {
    return isRTL ? [0, 16, 0, -16, 0] : [0, -16, 0, 16, 0];
  }, [isRTL]);

  const bowAnimationDuration = 0.4;
  const bowAnimationDelay = 1.4;
  const cardsFadeInDelay = 0.4;
  const eaInOutg: Easing = [.36,.01,.25,1.16];

  return (
    <section className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-12">
        <motion.div
          key={`container-${key}`} // Force re-render of container
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
            const offsets = [0, -40, -90, -40, 0];
            const yFinal = offsets[i];
            // Use memoized rotation values
            const rotation = rotationValues[i];
            // Also flip initial rotation for RTL
            const initialRotation = 0;
            // Scale up middle card during bow animation
            const finalScale = i === 2 ? 1.3 : 1;

            return (
              <motion.div
                key={`${card}-${locale}-${key}`} // Add locale and key to force re-render on language change
                className="h-[240px] w-[190px] rounded-2xl bg-gradient-to-t from-[#96c0ab] to-[#669b80] shadow-lg"
                initial={{ opacity: 0, y: 100, rotate: initialRotation, scale: 0.8, x: 0 }}
                animate={{
                  opacity: [0, 1, 1],
                  y: [100, yFinal],
                  x: [0, xOffsets[i]],
                  rotate: [initialRotation, rotation],
                  scale: [1, 1, finalScale],
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
                    x: {
                      delay: bowAnimationDelay,
                      duration: bowAnimationDuration,
                      ease: eaInOutg,
                    },
                    rotate: {
                      delay: bowAnimationDelay,
                      duration: bowAnimationDuration
                    },
                    scale: {
                      times: [0, 0, 1],
                      delay: bowAnimationDelay,
                      duration: bowAnimationDuration
                    }
                  },
                }}
                // whileHover={{
                //   scale: 1.2,
                //   transition: { 
                //     duration: 0.3,
                //     ease: "easeOut"
                //   }
                // }}
              />
            );
          })}
        </motion.div>

        <motion.div 
          key={`title-${locale}-${key}`} // Add locale and key to force re-render on language change
          className="text-4xl font-bold text-[#669b80]"
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
          <div>
            <h1 className="font-[900] text-5xl text-[#669b80] text-center mb-8">خِـدمَة كِـتاب الله غـايتُنا الكُـبرى</h1>
            <p className="text-2xl font-system font-bold text-neutral-900 text-center">نهدف لبناء أكبر مجتمع لتطوير تقنيات القرآن الكريم مفتوحة المصدر</p>
            <p className="text-2xl font-system font-bold text-neutral-900 text-center">وتحسين تجربة الاستخدام لخدمة المسلمين حول العالم</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
