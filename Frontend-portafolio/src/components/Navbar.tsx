import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  // Optimized scroll direction detection: only triggers state update when value actually flips
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;
    if (Math.abs(diff) < 8) return; // Ignore micro-jitters

    if (diff > 0 && latest > 120) {
      setHidden((prev) => (!prev ? true : prev));
      if (mobileMenuOpen) setMobileMenuOpen(false);
    } else if (diff < 0 || latest <= 50) {
      setHidden((prev) => (prev ? false : prev));
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -120, opacity: 0 },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl"
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Floating Card with continuous SVG perimeter light beam */}
      <div className="relative rounded-xl shadow-xl">
        
        {/* SVG Perimeter Runner - 100% traces the complete rectangular rounded perimeter */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle base track */}
          <rect
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            rx="12"
            fill="none"
            stroke="rgba(59, 130, 246, 0.25)"
            strokeWidth="1.5"
          />

          {/* Sharp core electric blue laser beam */}
          <motion.rect
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            rx="12"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="2.5"
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray="22 78"
            style={{ willChange: 'stroke-dashoffset' }}
            animate={{ strokeDashoffset: [0, -100] }}
            transition={{ repeat: Infinity, duration: 6.5, ease: 'linear' }}
          />

          {/* Bright leading tip of the light */}
          <motion.rect
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            rx="12"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray="6 94"
            style={{ willChange: 'stroke-dashoffset' }}
            animate={{ strokeDashoffset: [0, -100] }}
            transition={{ repeat: Infinity, duration: 6.5, ease: 'linear' }}
          />
        </svg>

        {/* Inner White Card matching user reference */}
        <div className="relative bg-white/95 text-slate-900 backdrop-blur-md rounded-xl px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between z-10 border border-slate-200/80">
          
          {/* Left: Black badge with letter & name, matching [R] RICHARD */}
          <a
            href="#inicio"
            className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-black text-white flex items-center justify-center font-bold font-mono text-sm shadow-sm group-hover:scale-105 transition-transform">
              B
            </div>
            <span className="text-xs sm:text-sm font-extrabold tracking-widest uppercase text-black">
              BRAYAN
            </span>
          </a>

          {/* Center: Requested links (INICIO, ABOUT ME, PROYECTOS, MI STACK, CONTACTAME) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-[11px] lg:text-xs font-bold uppercase tracking-wider text-slate-600">
            <a
              href="#inicio"
              className="hover:text-black transition-colors whitespace-nowrap py-1 relative group/link"
            >
              <span>Inicio</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all group-hover/link:w-full" />
            </a>
            <a
              href="#about"
              className="hover:text-black transition-colors whitespace-nowrap py-1 relative group/link"
            >
              <span>About Me</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all group-hover/link:w-full" />
            </a>
            <a
              href="#proyectos"
              className="hover:text-black transition-colors whitespace-nowrap py-1 relative group/link"
            >
              <span>Proyectos</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all group-hover/link:w-full" />
            </a>
            <a
              href="#stack"
              className="hover:text-black transition-colors whitespace-nowrap py-1 relative group/link"
            >
              <span>Mi Stack</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all group-hover/link:w-full" />
            </a>
            <a
              href="#contacto"
              className="hover:text-black transition-colors whitespace-nowrap py-1 relative group/link"
            >
              <span>Contáctame</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all group-hover/link:w-full" />
            </a>
          </nav>

          {/* Mobile hamburger button */}
          <div className="md:hidden flex items-center shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-700 hover:text-black rounded-lg focus:outline-none"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 bg-white text-slate-900 rounded-xl p-5 shadow-2xl border border-blue-500/30"
          >
            <nav className="flex flex-col gap-3 font-bold uppercase text-xs tracking-wider text-slate-700">
              <a
                href="#inicio"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-black py-1.5 transition-colors"
              >
                Inicio
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-black py-1.5 transition-colors"
              >
                About Me
              </a>
              <a
                href="#proyectos"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-black py-1.5 transition-colors"
              >
                Proyectos
              </a>
              <a
                href="#stack"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-black py-1.5 transition-colors"
              >
                Mi Stack
              </a>
              <a
                href="#contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-black py-1.5 transition-colors"
              >
                Contáctame
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
