import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Mail, Phone, Linkedin, Instagram, Copy, Check, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { engineerProfile } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '', role: 'Desarrollo Web Full-Stack' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(engineerProfile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) return;
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      const subject = encodeURIComponent(`[Portafolio] ${formState.role} - ${formState.name}`);
      const body = encodeURIComponent(
        `Hola Brayan,\n\nMi nombre es ${formState.name} (${formState.email}).\nInterés: ${formState.role}\n\nMensaje:\n${formState.message}`
      );
      window.location.href = `mailto:${engineerProfile.email}?subject=${subject}&body=${body}`;
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/80 backdrop-blur-md">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#070d1e] text-slate-200 shadow-2xl z-10 p-6 sm:p-8 overflow-hidden"
      >
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Contacto Directo · Brayan Tamayo</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Iniciar Conversación
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Hablemos sobre arquitectura, proyectos a medida o consultoría de ingeniería.
          </p>
        </div>

        {/* Quick Email Copy Bar */}
        <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.08] flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5 truncate">
            <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-xs font-mono text-slate-200 truncate select-all">
              {engineerProfile.email}
            </span>
          </div>
          <button
            onClick={handleCopyEmail}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center gap-1.5 shrink-0 transition-all active:scale-95 shadow-md shadow-blue-600/30"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? '¡Copiado!' : 'Copiar'}
          </button>
        </div>

        {/* Quick Social & Chat Direct Channels */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <a
            href={engineerProfile.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-black/40 border border-emerald-900/40 hover:border-emerald-500/60 text-slate-300 hover:text-emerald-300 transition-all flex items-center justify-center gap-1.5 text-xs"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp</span>
          </a>
          <a
            href={engineerProfile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-black/40 border border-sky-900/40 hover:border-sky-500/60 text-slate-300 hover:text-sky-300 transition-all flex items-center justify-center gap-1.5 text-xs"
          >
            <Linkedin className="w-3.5 h-3.5 text-sky-400" />
            <span>LinkedIn</span>
          </a>
          <a
            href={engineerProfile.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-black/40 border border-pink-900/40 hover:border-pink-500/60 text-slate-300 hover:text-pink-300 transition-all flex items-center justify-center gap-1.5 text-xs"
          >
            <Instagram className="w-3.5 h-3.5 text-pink-400" />
            <span>Instagram</span>
          </a>
        </div>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-3"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">¡Mensaje Preparado!</h3>
            <p className="text-xs text-slate-300">
              Gracias por escribir, {formState.name}. Se abrió tu cliente de correo para enviar a {engineerProfile.email}.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 pt-2 justify-center">
              <a
                href={`https://wa.me/573226865883?text=${encodeURIComponent(
                  `Hola Brayan, soy ${formState.name}. Escribo sobre: ${formState.role}.\n\n${formState.message}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Enviar vía WhatsApp</span>
              </a>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormState({ name: '', email: '', message: '', role: 'Desarrollo Web Full-Stack' });
                }}
                className="px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs text-slate-300"
              >
                Otro mensaje
              </button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-mono mb-1.5">Tu Nombre Completo *</label>
              <input
                type="text"
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                placeholder="Ej. Carlos Mendoza"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.08] text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-mono mb-1.5">Tu Correo Electrónico *</label>
              <input
                type="email"
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                placeholder="carlos@empresa.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.08] text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-mono mb-1.5">Tipo de Proyecto / Interés</label>
              <select
                value={formState.role}
                onChange={(e) => setFormState({ ...formState, role: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.08] text-white focus:outline-none focus:border-cyan-500 transition-colors"
              >
                <option value="Desarrollo Web Full-Stack">Desarrollo Web Full-Stack</option>
                <option value="Frontend & UI React">Frontend & UI React</option>
                <option value="Arquitectura Cloud & Microservicios">Arquitectura Cloud & Microservicios</option>
                <option value="Consultoría Técnica">Consultoría Técnica & Mentoría</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-mono mb-1.5">Mensaje o Detalles *</label>
              <textarea
                rows={3}
                required
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                placeholder="Cuéntame sobre tu proyecto o qué problema quieres resolver..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.08] text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 rounded-xl shadow-lg shadow-blue-600/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Preparando mensaje...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar Mensaje</span>
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};
