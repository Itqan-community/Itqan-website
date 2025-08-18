"use client";

import { motion } from "framer-motion";

const cards = [1, 2, 3, 4, 5];

export default function AnimatedHero() {
  // Check if language in URL is Arabic
  const isRTL = window.location.pathname.includes('/ar');

  return (
    <section className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
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
          className="flex gap-4"
          animate={{
            gap: ["1rem", "3rem"],
            transition: {
              delay: 1.2,
              duration: 0.3,
              ease: "easeOut",
            }
          }}
        >
          {cards.map((card, i) => {
            const offsets = [0, -40, -60, -40, 0];
            const yFinal = offsets[i];
            // Flip rotation values for RTL
            const rotations = isRTL ? [8, 4, 0, -4, -8] : [-8, -4, 0, 4, 8];
            const rotation = rotations[i];
            // Also flip initial rotation for RTL
            const initialRotation = 0;

            return (
              <motion.div
                key={card}
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
                      delay: i === 0 ? .5 : (((i+1)/5 * 0.4) +.5), // Each card starts appearing when previous is 50% done
                    },
                    y: {
                      delay: 1.2,
                      duration: 0.3
                    },
                    rotate: {
                      delay: 1.2,
                      duration: 0.3
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
          className="text-4xl font-bold text-emerald-900"
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: .3,
              delay: 1.4, // Increased delay to appear after cards
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
