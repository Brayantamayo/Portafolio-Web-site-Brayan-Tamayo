import React, { lazy, Suspense, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { engineerProfile } from '../data/portfolioData';

const HeroFallingTech = lazy(() =>
  import('./HeroFallingTech').then(({ HeroFallingTech }) => ({ default: HeroFallingTech }))
);

interface HeroProps {
  onOpenContact: () => void;
  isWelcomeDone?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isWelcomeDone = false }) => {
  const heroRef = useRef<HTMLDivElement>(null);

  // Scroll-linked animation: disappears when scrolling down toward AboutMe, reappears when scrolling back up
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.45, 0.95], [1, 0.9, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.45, 0.95], [1, 0.98, 0.91]);
  const heroY = useTransform(scrollYProgress, [0, 0.45, 0.95], [0, -15, -60]);

  // Marquee text array for continuous loop (optimized set)
  const marqueeItems = [
    'BRAYAN CASTAÑEDA TAMAYO',
    'SOFTWARE ARCHITECT',
    'BRAYAN CASTAÑEDA TAMAYO',
    'FULL STACK ENGINEER',
    'BRAYAN CASTAÑEDA TAMAYO',
    'SYSTEMS ARCHITECT',
  ];

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative min-h-[92vh] md:min-h-screen flex flex-col justify-end items-center overflow-hidden bg-[#030712] tech-grid-bg pt-20 pb-0"
    >
      {/* Scroll-animated container that disappears when scrolling down and reappears when scrolling up */}
      <motion.div
        style={{
          opacity: heroOpacity,
          scale: heroScale,
          y: heroY,
          willChange: 'transform, opacity',
        }}
        className="w-full h-full flex flex-col justify-end items-center relative"
      >
        {/* Hardware-accelerated radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] pointer-events-none rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(37,99,235,0.14) 0%, transparent 65%)',
          }}
        />

        {/* =========================================================================
            LAYER 0 (BEHIND PHOTO): Giant Kinetic Marquee of Brayan Tamayo's Name
            ========================================================================= */}
        <div className="absolute inset-x-0 top-[45%] -translate-y-1/2 z-0 pointer-events-none select-none flex flex-col gap-2 overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap gap-10"
            style={{ willChange: 'transform' }}
            animate={{ x: [0, -1400] }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 25,
            }}
          >
            {[...marqueeItems, ...marqueeItems].map((text, i) => (
              <span
                key={i}
                className="text-7xl sm:text-9xl md:text-[11rem] lg:text-[14rem] font-extrabold tracking-tight uppercase inline-block leading-none"
                style={{
                  WebkitTextStroke: '2px rgba(59, 130, 246, 0.40)',
                  color: 'transparent',
                }}
              >
                {text}
              </span>
            ))}
          </motion.div>
        </div>

        {/* =========================================================================
            LAYER 1 (CENTERED): Pre-cutout PNG Photo
            ========================================================================= */}
        <div className="relative z-10 flex flex-col items-center justify-end w-full max-w-4xl px-4 pointer-events-none select-none">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-end justify-center pointer-events-none"
          >
            {/* Subtle halo aura behind head using lightweight radial gradient */}
            <div
              className="absolute -top-10 w-80 h-80 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)',
              }}
            />

            {/* Cutout Photo - Centered and anchored flush to bottom border */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ willChange: 'transform' }}
              className="relative max-w-[320px] sm:max-w-[440px] md:max-w-[500px] lg:max-w-[560px] overflow-visible flex items-end justify-center pointer-events-none select-none"
            >
              <img
                src={engineerProfile.heroPhoto}
                alt="Brayan Tamayo"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                width="560"
                height="680"
                draggable={false}
                className="w-full h-auto object-contain max-h-[72vh] md:max-h-[76vh] block select-none align-bottom pointer-events-none"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* =========================================================================
          LAYER 2: Falling Interactive Tech Squares (Matter.js 2D Physics)
          Drops from the sky when entering the page / welcome finishes
          ========================================================================= */}
      {isWelcomeDone && (
        <Suspense fallback={null}>
          <HeroFallingTech isWelcomeDone={isWelcomeDone} />
        </Suspense>
      )}
    </section>
  );
};
