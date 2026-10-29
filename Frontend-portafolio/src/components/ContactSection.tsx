import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  Phone,
  PhoneCall,
  Mail,
  Linkedin,
  Instagram,
  Copy,
  Check,
  MessageCircle,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { engineerProfile } from '../data/portfolioData';

interface ContactSectionProps {
  onOpenModal?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = () => {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll-linked animation: disappears smoothly when scrolling away, reappears when scrolling back
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.22, 0.72, 0.98], [0, 1, 1, 0]);
  const sectionScale = useTransform(scrollYProgress, [0, 0.22, 0.72, 0.98], [0.94, 1, 1, 0.94]);
  const sectionY = useTransform(scrollYProgress, [0, 0.22, 0.72, 0.98], [40, 0, 0, -40]);

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="py-24 sm:py-32 relative bg-[#030712] border-t border-slate-800/50 overflow-hidden section-contain"
    >
      {/* Target anchor fallback */}
      <span id="contactame" className="absolute -top-24 opacity-0 pointer-events-none" />

      {/* Subtle background ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <motion.div
        style={{
          opacity: sectionOpacity,
          scale: sectionScale,
          y: sectionY,
        }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Contáctame
          </h2>
        </div>

        {/* Clean Executive Contact Card (matching reference image style) */}
        <div className="bg-[#0b1220]/90 backdrop-blur-xl border border-slate-700/60 hover:border-blue-500/40 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl shadow-blue-950/40 transition-all duration-300">
          <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-14">
            
            {/* Left side: Circular photo with overlapping blue phone badge */}
            <div className="relative shrink-0 flex items-center justify-center">
              {/* Circular portrait avatar */}
              <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-slate-700/80 bg-gradient-to-b from-slate-800 to-slate-900 shadow-2xl relative">
                <img
                  src={engineerProfile.userPhoto}
                  alt={engineerProfile.name}
                  width="208"
                  height="208"
                  className="w-full h-full object-cover object-top filter contrast-[1.05]"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Overlapping Blue Phone Badge (top-left of the circle, as shown in user's reference) */}
              <div
                className="absolute top-0 left-0 -translate-x-1 -translate-y-1 sm:-translate-x-2 sm:-translate-y-2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl shadow-blue-600/50 border-2 border-[#0b1220]"
                title="Disponible para llamadas y mensajes"
              >
                <PhoneCall className="w-6 h-6 sm:w-7 sm:h-7 animate-pulse" />
              </div>

              {/* Small status indicator at bottom-right */}
              <div className="absolute bottom-2 right-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 border border-emerald-500/40 text-[11px] font-medium text-emerald-400 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Online</span>
              </div>
            </div>

            {/* Right side: Clean, human statement + Big Phone number + Fast Actions */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                Brayan Castañeda Tamayo
              </h3>
              {/* Friendly, professional message */}
              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-6">
                Sé que tu tiempo es valioso, así que he facilitado todo para que podamos hablar de tu proyecto o propuesta directamente, sin rodeos ni intermediarios.
              </p>

              {/* Prominent Large Phone Number (exact layout from user reference) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-center md:justify-start gap-4 mb-8">
                <a
                  href={`tel:+57${engineerProfile.phone}`}
                  className="inline-flex items-center justify-center md:justify-start gap-3 group text-white hover:text-blue-400 transition-colors"
                >
                  <span className="p-3 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md shadow-blue-600/20">
                    <Phone className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
                  </span>
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                    {engineerProfile.phoneFormatted}
                  </span>
                </a>

                {/* Quick copy phone button */}
                <button
                  onClick={() => handleCopy(`+57 ${engineerProfile.phone}`, 'phone')}
                  className="self-center p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700/60 transition-all text-xs flex items-center gap-1.5"
                  title="Copiar número de teléfono"
                >
                  {copiedType === 'phone' ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                {/* WhatsApp Primary */}
                <a
                  href={`https://wa.me/573226865883?text=${encodeURIComponent(
                    'Hola Brayan, vi tu portafolio y me gustaría conversar sobre un proyecto.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-900/30 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chatear por WhatsApp</span>
                </a>

                {/* Call directly */}
                <a
                  href={`tel:+57${engineerProfile.phone}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-900/30 active:scale-95"
                >
                  <Phone className="w-4 h-4" />
                  <span>Llamar Ahora</span>
                </a>

                {/* Send Email */}
                <a
                  href={`mailto:${engineerProfile.email}?subject=${encodeURIComponent(
                    'Propuesta o Consulta de Proyecto - Brayan Tamayo'
                  )}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-sm border border-slate-700 transition-all active:scale-95"
                >
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>Enviar Correo</span>
                </a>
              </div>
            </div>
          </div>

          {/* Clean secondary channels: Email, LinkedIn, Instagram */}
          <div className="mt-10 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Email item */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all">
              <a
                href={`mailto:${engineerProfile.email}`}
                className="flex items-center gap-3 truncate group"
              >
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                  <Mail className="w-4 h-4 shrink-0" />
                </div>
                <div className="truncate text-left">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Correo</div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-cyan-400 truncate transition-colors">
                    {engineerProfile.email}
                  </div>
                </div>
              </a>
              <button
                onClick={() => handleCopy(engineerProfile.email, 'email')}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
                title="Copiar correo electrónico"
              >
                {copiedType === 'email' ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* LinkedIn item */}
            <a
              href={engineerProfile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/40 group transition-all"
            >
              <div className="flex items-center gap-3 truncate">
                <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 group-hover:bg-sky-500/20 transition-colors">
                  <Linkedin className="w-4 h-4 shrink-0" />
                </div>
                <div className="truncate text-left">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">LinkedIn</div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-sky-400 truncate transition-colors">
                    brayan-castañeda-tamayo
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-sky-400 transition-colors shrink-0" />
            </a>

            {/* Instagram item */}
            <a
              href={engineerProfile.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-pink-500/40 group transition-all"
            >
              <div className="flex items-center gap-3 truncate">
                <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400 group-hover:bg-pink-500/20 transition-colors">
                  <Instagram className="w-4 h-4 shrink-0" />
                </div>
                <div className="truncate text-left">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Instagram</div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-pink-400 truncate transition-colors">
                    @{engineerProfile.instagramHandle}
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-pink-400 transition-colors shrink-0" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
