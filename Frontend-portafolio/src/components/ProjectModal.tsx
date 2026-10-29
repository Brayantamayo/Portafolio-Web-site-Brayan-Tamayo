import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, CheckCircle2, Cpu, Activity, Calendar } from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // ESC key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
        {/* Backdrop click handler */}
        <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-blue-800/40 bg-[#091124] text-slate-200 shadow-2xl z-10 my-auto"
        >
          {/* Header Image Cover */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-950">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center filter brightness-90"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#091124] via-[#091124]/40 to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg bg-black/60 hover:bg-black text-slate-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Overlaid Title & Category */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
                <span>{project.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{project.year}</span>
                <span aria-hidden="true">·</span>
                <span>{project.role}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight text-balance">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Impact Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-[#040814] border border-blue-900/30">
              {project.impactMetrics.map((metric, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-2xl font-bold text-white tabular-nums">
                    {metric.value}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Description */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue-400" />
                Resumen de la Arquitectura & Desafío
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {project.extendedDescription}
              </p>
            </div>

            {/* Key Architecture Highlights */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-400" />
                Puntos Clave del Diseño del Sistema
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-300">
                {project.architectureHighlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#0c1630] border border-blue-900/20">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies Used (Zero-Pill: Clean unboxed metadata) */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Stack & Tecnologías Utilizadas
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-md bg-[#0c1630] border border-blue-900/40 text-blue-200 font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-blue-900/30 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Ver Código
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Inspeccionar Demostración
                  </a>
                )}
              </div>

              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-lg transition-colors"
              >
                Cerrar Ventana
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
