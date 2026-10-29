import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, MapPin, Calendar, CheckCircle } from 'lucide-react';
import { experienceData } from '../data/portfolioData';

export const WorkExperience: React.FC = () => {
  return (
    <section id="experiencia" className="py-20 lg:py-28 relative border-t border-blue-900/20 bg-[#040814]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
              <span>04. Trayectoria Profesional</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">Impacto Comprobado</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
              Experiencia en Arquitectura & Liderazgo Técnico
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-sm">
            Historial de ejecución liderando proyectos críticos, reduciendo latencias y optimizando costes de infraestructura.
          </p>
        </div>

        {/* Timeline List */}
        <div className="space-y-8">
          {experienceData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-6 sm:p-8 rounded-2xl border border-blue-900/30 bg-[#070e24] shadow-lg relative overflow-hidden group hover:border-blue-700/50 transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-1">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5" />
                      {item.company}
                    </span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.companyLocation}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {item.role}
                  </h3>
                </div>

                <div className="text-xs font-mono font-semibold text-blue-300 bg-[#0b1636] border border-blue-900/40 px-3 py-1.5 rounded-lg w-fit shrink-0 tabular-nums">
                  {item.period}
                </div>
              </div>

              {/* Summary */}
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                {item.summary}
              </p>

              {/* Achievements with quantifiable rigor */}
              <div className="space-y-2.5 mb-6">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Logros & Resultados de Ingeniería
                </span>
                <ul className="space-y-2">
                  {item.achievements.map((ach, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech stack used in this role */}
              <div className="pt-4 border-t border-blue-900/20 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-[11px] text-slate-400 mr-2">Tecnologías clave:</span>
                {item.techStack.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="font-mono text-slate-300 px-2 py-0.5 rounded bg-[#0b1530] border border-blue-900/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
