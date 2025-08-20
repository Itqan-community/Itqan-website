"use client";

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  minOpacity: number;
  maxOpacity: number;
  animationDelay: number;
  animationDuration: number;
  color: string;
}

export default function AnimatedBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Generate stars with semi-organized grid layout
    const generateStars = () => {
      const stars: Star[] = [];
      const numStars = Math.floor((canvas.width * canvas.height) / 2000); // Increased star count
      
      // Light shades of orange, green, and primary colors
      const colors = [
        '#FFB366', // Light orange
        '#FFCC80', // Lighter orange
        '#98FB98', // Pale green
        '#669B80', // Primary color (from your theme)
        '#FFD54F', // Light yellow/orange
      ];

      // Create a semi-organized grid with 60% organization and 40% randomness
      const gridSpacing = Math.sqrt((canvas.width * canvas.height) / numStars) * 0.8;
      const gridCols = Math.ceil(canvas.width / gridSpacing);
      const gridRows = Math.ceil(canvas.height / gridSpacing);
      
      let starIndex = 0;
      
      for (let row = 0; row < gridRows && starIndex < numStars; row++) {
        for (let col = 0; col < gridCols && starIndex < numStars; col++) {
          // 60% chance to place star in organized grid position
          if (Math.random() < 0.6) {
            const baseX = col * gridSpacing;
            const baseY = row * gridSpacing;
            
            // Add some randomness to grid positions (±20% of grid spacing)
            const randomOffset = gridSpacing * 0.2;
            const x = baseX + (Math.random() - 0.5) * randomOffset;
            const y = baseY + (Math.random() - 0.5) * randomOffset;
            
            // Ensure star is within canvas bounds
            if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
              const minOpacity = Math.random() * 0.3 + 0.2; // 0.2 to 0.5
              const maxOpacity = Math.random() * 0.3 + 0.7; // 0.7 to 1.0
              
              stars.push({
                x,
                y,
                size: Math.random() * 2 + 1.5,
                minOpacity,
                maxOpacity,
                animationDelay: Math.random() * 1000,
                animationDuration: Math.random() * 1500 + 1000,
                color: colors[Math.floor(Math.random() * colors.length)],
              });
              starIndex++;
            }
          }
        }
      }
      
      // Fill remaining stars with random positions (40% randomness)
      while (starIndex < numStars) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        
        const minOpacity = Math.random() * 0.3 + 0.2; // 0.2 to 0.5
        const maxOpacity = Math.random() * 0.3 + 0.7; // 0.7 to 1.0
        
        stars.push({
          x,
          y,
          size: Math.random() * 2 + 1.5,
          minOpacity,
          maxOpacity,
          animationDelay: Math.random() * 1000,
          animationDuration: Math.random() * 1500 + 1000,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
        starIndex++;
      }
      
      return stars;
    };

    starsRef.current = generateStars();

    // Animation function
    const animate = (timestamp: number) => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      starsRef.current.forEach((star) => {
        const time = timestamp + star.animationDelay;
        const cycle = (time % star.animationDuration) / star.animationDuration;
        
        // Create blinking effect from maxOpacity to minOpacity using sine wave
        const opacityRange = star.maxOpacity - star.minOpacity;
        const blinkOpacity = star.maxOpacity - (opacityRange * Math.sin(cycle * Math.PI * 2));
        
        ctx.save();
        ctx.globalAlpha = blinkOpacity;
        ctx.fillStyle = star.color;
        
        // Draw star as a rectangle
        const rectSize = star.size;
        ctx.fillRect(star.x - rectSize/2, star.y - rectSize/2, rectSize, rectSize);
        
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-50"
      style={{
        background: 'transparent',
      }}
    />
  );
}
