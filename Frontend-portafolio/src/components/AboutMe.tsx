import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { Sparkles, Terminal, Code2, Cpu, Rocket } from 'lucide-react';
import { engineerProfile } from '../data/portfolioData';

export const AboutMe: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isCardInView = useInView(cardRef, { amount: 0.1 });

  // Scroll-linked animation: disappears when scrolling down past it, reappears when scrolling back up
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  // Entry from bottom (0 -> 0.25), full visibility in view (0.25 -> 0.65), exit to top as user scrolls down (0.65 -> 0.95)
  // When scrolling back up, this reverses in real-time
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.62, 0.94], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.22, 0.62, 0.94], [0.93, 1, 1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 0.22, 0.62, 0.94], [50, 0, 0, -60]);

  return (
    <section id="about" className="py-28 relative border-t border-blue-900/20 bg-[#030712] overflow-hidden section-contain">
      {/* Background radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 65%)',
        }}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance">
            Desarrollo de Software & Arquitectura
          </h2>
        </motion.div>

        {/* Card with Scroll Animation (disappears when scrolling down, reappears when scrolling up) & Orbiting Aura */}
        <motion.div
          ref={cardRef}
          style={{
            opacity,
            scale,
            y,
            willChange: 'transform, opacity',
          }}
          className="relative rounded-3xl p-[2px] overflow-visible shadow-2xl group transition-shadow duration-500"
        >
          {/* ======================================================== */}
          {/* 1. OUTER ROTATING GRADIENT AURA (HALO QUE RODEA LA CARTA) */}
          {/* ======================================================== */}
          <div className="absolute -inset-[3px] rounded-[28px] overflow-hidden pointer-events-none z-0">
            <motion.div
              animate={isCardInView ? { rotate: 360 } : false}
              transition={{ repeat: Infinity, duration: 7, ease: 'linear' }}
              className="absolute -inset-[150%] origin-center"
              style={{
                background:
                  'conic-gradient(from 0deg at 50% 50%, rgba(59,130,246,0) 0deg, rgba(56,189,248,0.95) 70deg, rgba(147,51,234,0.85) 130deg, rgba(59,130,246,0) 190deg, rgba(14,165,233,1) 250deg, rgba(99,102,241,0.9) 310deg, rgba(59,130,246,0) 360deg)',
              }}
            />
          </div>

          {/* Soft ambient aura glow behind the border */}
          <div
            className="absolute -inset-2 rounded-[30px] opacity-75 blur-md pointer-events-none z-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(circle, rgba(56,189,248,0.3) 0%, rgba(99,102,241,0.2) 50%, transparent 75%)',
            }}
          />

          {/* ======================================================== */}
          {/* 2. SVG RUNNING LASER AURA TRACING THE PERIMETER         */}
          {/* ======================================================== */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="aboutAuraGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="1" />
                <stop offset="75%" stopColor="#818cf8" stopOpacity="1" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Sharp laser beam runner orbiting the perimeter */}
            <motion.rect
              x="1.5"
              y="1.5"
              width="calc(100% - 3px)"
              height="calc(100% - 3px)"
              rx="24"
              fill="none"
              stroke="url(#aboutAuraGradient)"
              strokeWidth="2.5"
              strokeDasharray="180 800"
              animate={isCardInView ? { strokeDashoffset: [0, -980] } : false}
              transition={{ repeat: Infinity, duration: 5.5, ease: 'linear' }}
              style={{
                filter: 'drop-shadow(0 0 10px rgba(56, 189, 248, 0.95))',
              }}
            />
          </svg>

          {/* ======================================================== */}
          {/* 3. SOLID INNER CARD CONTENT CONTAINER                   */}
          {/* ======================================================== */}
          <div className="relative rounded-[26px] bg-[#070e24]/95 backdrop-blur-xl p-8 sm:p-12 lg:p-14 z-10 overflow-hidden border border-blue-800/30">
            {/* Subtle inner grid lines */}
            <div
              className="absolute inset-0 pointer-events-none opacity-5"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />

            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-12 relative z-10">
              
              {/* Brayan's Photo Avatar */}
              <div className="relative shrink-0">
                <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-blue-500/60 shadow-xl bg-slate-950">
                  <img
                    src={engineerProfile.userPhoto}
                    alt={engineerProfile.name}
                    loading="lazy"
                    decoding="async"
                    width="176"
                    height="176"
                    className="w-full h-full object-cover object-top filter brightness-100 group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-2.5 -right-2 px-3 py-1 rounded-full bg-blue-600 text-[11px] font-bold text-white uppercase tracking-wider shadow-md flex items-center gap-1.5 border border-blue-400/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  Dev
                </div>
              </div>

              {/* Profile Bio & Content */}
              <div className="space-y-5 text-center md:text-left flex-grow">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {engineerProfile.name}
                  </h3>
                  <p className="text-sm font-mono text-blue-400 mt-1 flex items-center justify-center md:justify-start gap-2">
                    <Terminal className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Senior Full-Stack Software Engineer & Systems Architect</span>
                  </p>
                </div>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed text-pretty">
                  Soy un ingeniero de software apasionado por transformar ideas en productos digitales de alto rendimiento. Me especializo en la construcción de aplicaciones web reactivas con React y TypeScript, arquitecturas escalables en la nube y soluciones intuitivas orientadas al usuario final.
                </p>

                <p className="text-sm sm:text-base text-slate-400 leading-relaxed text-pretty">
                  Mi enfoque combina un diseño visual vanguardista con una infraestructura de backend sólida, limpia y mantenible, garantizando tiempos de carga ultrarrápidos y experiencias digitales fluidas.
                </p>

                {/* Status and tags */}
                <div className="pt-4 border-t border-blue-900/30 flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs">
                  <span className="px-3.5 py-1.5 rounded-xl bg-[#0b1636] border border-blue-900/50 text-blue-300 font-medium hover:border-blue-500/50 transition-colors flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                    React 19 & TypeScript
                  </span>
                  <span className="px-3.5 py-1.5 rounded-xl bg-[#0b1636] border border-blue-900/50 text-blue-300 font-medium hover:border-blue-500/50 transition-colors flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-blue-400" />
                    Node.js & Cloud Deployments
                  </span>
                  <span className="px-3.5 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-medium hover:border-emerald-500/60 transition-colors flex items-center gap-1.5">
                    <Rocket className="w-3.5 h-3.5 text-emerald-400" />
                    Disponible para Nuevos Proyectos
                  </span>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
