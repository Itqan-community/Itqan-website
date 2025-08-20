"use client";

import { Easing, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import AnimatedBg from "./AnimatedBg";

const cards = [
  { id: 1, image: '/images/home/hero-card-headset.svg' },
  { id: 2, image: '/images/home/hero-card-laptop.svg' },
  { id: 3, image: '/images/home/hero-card-mushaf.svg' },
  { id: 4, image: '/images/home/hero-card-phone.svg' },
  { id: 5, image: '/images/home/hero-card-vr.svg' },
];

export default function AnimatedHero({ locale }: { locale: string }) {
  // Use locale prop instead of window.location.pathname
  const isRTL = locale === 'ar';

  // Memoize rotation values to prevent unnecessary recalculations
  const rotationValues = useMemo(() => {
    return isRTL ? [4, 2, 0, -2, -4] : [-4, -2, 0, 2, 4];
  }, [isRTL]);
  const xOffsets = useMemo(() => {
    return isRTL ? [0, 8, 0, -8, 0] : [0, -8, 0, 8, 0];
  }, [isRTL]);

  const bowAnimationDuration = 0.32;
  const bowAnimationDelay = 1.2;
  const cardsFadeInDelay = 0.4;
  const eaInOut: Easing = [.36,.01,.25,1.16];

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-white overflow-x-hidden px-4">
      <AnimatedBg />
      <div className="relative z-10 flex flex-col items-center gap-12 md:gap-20 mt-[20vh]">
        <motion.div
          initial="hidden"
          // animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="flex gap-2 md:gap-4"
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
             const offsets = [0, -30, -60, -30, 0];
             const desktopOffsets = [0, -35, -75, -35, 0];
             const yFinal = window.innerWidth >= 768 ? desktopOffsets[i] : offsets[i];
            // Use memoized rotation values
            const rotation = rotationValues[i];
            // Also flip initial rotation for RTL
            const initialRotation = 0;
                         // Scale up middle card during bow animation
             const finalScale = i === 2 ? 1.2 : 1;

            return (
                             <motion.div
                 key={`${card.id}-${locale}`} // Add locale and key to force re-render on language change
                                   className="h-24 w-24 sm:h-32 sm:w-32 md:h-48 md:w-48 lg:h-56 lg:w-56 rounded-xl md:rounded-2xl overflow-hidden"
                 initial={{ 
                   opacity: 0, 
                   y: 100, 
                   rotate: initialRotation, 
                   scale: 0.8, 
                   x: 0,
                 }}
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
                      delay: i === 0 ? .5 : (((i+1)/cards.length * cardsFadeInDelay) + .4), // Each card starts appearing when previous is 50% done
                    },
                    y: {
                      delay: bowAnimationDelay,
                      duration: bowAnimationDuration,
                      ease: eaInOut,
                    },
                    x: {
                      delay: bowAnimationDelay,
                      duration: bowAnimationDuration,
                      ease: eaInOut,
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
              >
                <motion.div
                  className="w-full h-full relative"
                >
                  {i === 2 && (
                                         <motion.div
                       className="absolute z-0 inset-0 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delay: bowAnimationDelay,
                        duration: bowAnimationDuration,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                                     <Image src={card.image} alt={`Hero Card ${card.id}`} width={160} height={160} className="w-full h-full object-cover absolute inset-0 z-10" />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

                 <motion.div 
           key={`title-${locale}`} // Add locale and key to force re-render on language change
           className="text-2xl md:text-4xl font-bold text-primary-600"
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
           <div className="px-4 max-w-[100vw]">
             <h1 className="font-[900] text-2xl sm:text-3xl md:text-4xl lg:text-[56px] text-primary-600 text-center mb-4 md:mb-8 leading-tight">
               {locale === 'ar' ? 'خِـدمَة كِـتاب الله غـايتُنا الكُـبرى' : 'Serving Quran is our greatest Ghayah'}
             </h1>
             <p className="text-[17.5px] font-system font-normal text-neutral-900 text-center leading-relaxed max-w-[579px] mx-auto">
               {locale === 'ar' 
                 ? 'نهدف لبناء أكبر مجتمع تقني يركز على تطوير تطبيقات القرآن الكريم وتحسين تجربة المستخدم لخدمة المسلمين حول العالم'
                 : 'We are building the largest community for developing Quranic technology and improving the user experience for Muslims around the world'}
             </p>
           </div>
         </motion.div>
      </div>
    </section>
  );
}
