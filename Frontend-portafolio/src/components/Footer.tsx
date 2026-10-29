import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { engineerProfile } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-blue-900/30 bg-[#02050e] py-12 text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-blue-900/20">
          
          {/* Brand mark */}
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            <span className="text-sm font-bold text-white tracking-tight">
              {engineerProfile.name}
            </span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="text-slate-400">Ingeniería de Software & Arquitectura</span>
          </div>

          {/* Quick links */}
          <div className="flex items-center gap-6 text-slate-400 font-medium">
            <a href="#inicio" className="hover:text-blue-400 transition-colors">
              Inicio
            </a>
            <a href="#about" className="hover:text-blue-400 transition-colors">
              About Me
            </a>
            <a href="#proyectos" className="hover:text-blue-400 transition-colors">
              Proyectos
            </a>
            <a href="#stack" className="hover:text-blue-400 transition-colors">
              Mi Stack
            </a>
            <a href="#contacto" className="hover:text-blue-400 transition-colors">
              Contáctame
            </a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-[#070e24] border border-blue-900/40 text-slate-300 hover:text-white hover:bg-blue-600 transition-colors flex items-center gap-1.5"
            aria-label="Volver arriba"
          >
            <ArrowUp className="w-4 h-4" />
            <span className="text-[11px] font-medium">Arriba</span>
          </button>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} Brayan Castañeda Tamayo. Diseñado con arquitectura modular, React 19 y Tailwind CSS.
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href={engineerProfile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              LinkedIn
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={engineerProfile.instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-400 transition-colors"
            >
              Instagram
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={engineerProfile.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-400 transition-colors"
            >
              WhatsApp
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={`mailto:${engineerProfile.email}`}
              className="hover:text-blue-400 transition-colors"
            >
              Correo
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={engineerProfile.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
