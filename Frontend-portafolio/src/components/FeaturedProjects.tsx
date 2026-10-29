import React, { useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Cpu, Globe } from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import { Project } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';

export const FeaturedProjects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isSectionInView = useInView(sectionRef, { amount: 0.1 });

  // Scroll-linked animation matching About Me: disappears when scrolling down, reappears when scrolling back up
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.15, 0.8, 0.96], [0, 1, 1, 0]);
  const sectionScale = useTransform(scrollYProgress, [0, 0.15, 0.8, 0.96], [0.94, 1, 1, 0.94]);
  const sectionY = useTransform(scrollYProgress, [0, 0.15, 0.8, 0.96], [50, 0, 0, -50]);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="proyectos"
      ref={sectionRef}
      className="py-28 relative border-t border-blue-900/20 bg-[#040814] overflow-hidden section-contain"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/4 right-5 w-[650px] h-[650px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-10 left-5 w-[500px] h-[500px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)',
        }}
      />

      <motion.div
        style={{
          opacity: sectionOpacity,
          scale: sectionScale,
          y: sectionY,
          willChange: 'transform, opacity',
        }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Clean section header: user requested only "Proyectos" */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Proyectos
          </h2>
        </motion.div>

        {/* Projects Card Display: Centered when single project, responsive grid if multiple */}
        <div
          className={
            projectsData.length === 1
              ? 'max-w-xl mx-auto w-full'
              : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch'
          }
        >
          {projectsData.map((project, index) => {
            const isSpecialFeatured = project.isFeatured || project.id === 'mariachis-texas';

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative rounded-3xl p-[2px] overflow-visible group shadow-2xl flex flex-col h-full"
              >
                {/* 1. Rotating Conic-Gradient Aura Halo */}
                <div className="absolute -inset-[3px] rounded-[28px] overflow-hidden pointer-events-none z-0">
                  <motion.div
                    className="w-[200%] h-[200%] -top-[50%] -left-[50%] absolute opacity-40 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: isSpecialFeatured
                        ? 'conic-gradient(from 0deg, transparent 0deg, #2563eb 60deg, #38bdf8 120deg, #818cf8 180deg, #2563eb 240deg, transparent 360deg)'
                        : 'conic-gradient(from 0deg, transparent 0deg, #1d4ed8 60deg, #0284c7 120deg, #6366f1 180deg, #1d4ed8 240deg, transparent 360deg)',
                      filter: 'blur(16px)',
                      willChange: 'transform',
                    }}
                    animate={isSectionInView ? { rotate: 360 } : false}
                    transition={{
                      repeat: Infinity,
                      duration: isSpecialFeatured ? 8 : 12,
                      ease: 'linear',
                    }}
                  />
                </div>

                {/* Soft ambient aura glow behind the border */}
                <div
                  className="absolute -inset-2 rounded-[30px] opacity-60 blur-md pointer-events-none z-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(56,189,248,0.25) 0%, rgba(99,102,241,0.15) 50%, transparent 75%)',
                  }}
                />

                {/* 2. Precision Laser Runner around card perimeter */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id={`cardAura-${project.id}`}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#2563eb" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#38bdf8" stopOpacity="1" />
                      <stop offset="75%" stopColor="#818cf8" stopOpacity="1" />
                      <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                  <motion.rect
                    x="1.5"
                    y="1.5"
                    width="calc(100% - 3px)"
                    height="calc(100% - 3px)"
                    rx="24"
                    fill="none"
                    stroke={`url(#cardAura-${project.id})`}
                    strokeWidth="2.5"
                    strokeDasharray="180 750"
                    animate={isSectionInView ? { strokeDashoffset: [0, -930] } : false}
                    transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                    style={{
                      filter: 'drop-shadow(0 0 10px rgba(56, 189, 248, 0.9))',
                    }}
                  />
                </svg>

                {/* 3. Solid Inner Card Content */}
                <div className="relative rounded-[26px] bg-[#070e24]/95 backdrop-blur-xl z-10 overflow-hidden border border-blue-800/30 flex flex-col flex-grow">
                  {/* Image Preview Container */}
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-blue-900/40 bg-slate-950 group/img">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      width="640"
                      height="400"
                      className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070e24] via-transparent to-transparent opacity-60" />

                    {/* Live status badge */}
                    <div className="absolute top-3.5 left-3.5">
                      {project.demoUrl?.includes('mariachis') ? (
                        <span className="px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-[11px] font-semibold flex items-center gap-1.5 shadow-xl">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                          </span>
                          En Producción · Live
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-blue-500/30 text-blue-300 text-[11px] font-mono">
                          {project.categoryLabel}
                        </span>
                      )}
                    </div>

                    {/* Quick Visit Arrow */}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-3.5 right-3.5 p-2.5 rounded-full bg-blue-600/90 hover:bg-blue-500 text-white shadow-xl backdrop-blur-md transition-all hover:scale-110 flex items-center justify-center group/btn"
                        title="Visitar proyecto"
                      >
                        <ArrowUpRight className="w-4 h-4 group-hover/btn:rotate-45 transition-transform" />
                      </a>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                    <div>
                      {/* Category and Year */}
                      <div className="flex items-center justify-between text-xs font-mono text-blue-400 mb-2">
                        <span className="px-2 py-0.5 rounded bg-blue-950/60 border border-blue-900/50">
                          {project.categoryLabel}
                        </span>
                        <span>{project.year}</span>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight group-hover:text-blue-300 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs font-medium text-cyan-400 mt-1 line-clamp-1">
                        {project.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3 line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Technologies list */}
                    <div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800/40 text-blue-300 text-[11px] font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-2 py-0.5 rounded bg-blue-950/40 text-slate-400 text-[11px] font-mono">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-2 flex items-center gap-2.5">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md active:scale-95 group/link"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          <span>{project.demoUrl.includes('render') ? 'Sitio en Vivo' : 'Demo'}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                        </a>
                      )}

                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-xs border border-slate-700 transition-all active:scale-95"
                      >
                        <Cpu className="w-3.5 h-3.5 text-blue-400" />
                        <span>Detalles</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed Architecture Project Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </motion.div>
    </section>
  );
};
