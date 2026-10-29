import React from 'react';

export interface TechItem {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'datascience' | 'ai';
  categoryLabel: string;
  color: string;
  glowColor: string;
  keycapTop: string;
  keycapSkirt: string;
  textColor: string;
  svg: React.ReactNode;
}

export const techStackList: TechItem[] = [
  // --- ROW 1: Frontend & Foundations ---
  {
    name: 'JavaScript',
    category: 'frontend',
    categoryLabel: 'Lenguaje Web',
    color: '#f7df1e',
    glowColor: 'rgba(247, 223, 30, 0.45)',
    keycapTop: '#eab308',
    keycapSkirt: '#a16207',
    textColor: '#000000',
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8">
        <rect width="128" height="128" rx="16" fill="#f7df1e" />
        <path d="M75.3 103.5c4.7 2.6 10.4 4.3 16.3 4.3 8.9 0 14.4-4.5 14.4-11.7 0-7.8-6.1-10.6-14.7-14.2l-4.5-1.9c-11.6-4.9-17.7-10.8-17.7-21.7 0-12.8 9.9-22.3 25.4-22.3 7 0 12.8 1.8 16.8 3.9l-3.9 9.8c-3.1-1.7-7.4-3.1-12.8-3.1-8.5 0-13.3 4.3-13.3 10.6 0 7.3 5.3 9.9 14.1 13.6l4.5 1.9c12.7 5.4 18.5 11.5 18.5 22.8 0 14.3-11 23.3-27.2 23.3-7.6 0-14.7-2.3-18.7-4.7l3.8-10.5zm-44.4-1.2c3.4 2 7.7 3.3 12.2 3.3 6.9 0 10.9-3.4 10.9-10.8V37.2h12v57.8c0 13.5-8 19.8-21.9 19.8-6.9 0-12.8-1.9-16.1-4l2.9-8.5z" fill="#000000" />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    categoryLabel: 'Tipado Estricto',
    color: '#3178c6',
    glowColor: 'rgba(49, 120, 198, 0.45)',
    keycapTop: '#2563eb',
    keycapSkirt: '#1d4ed8',
    textColor: '#ffffff',
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8">
        <rect width="128" height="128" rx="16" fill="#3178c6" />
        <path d="M66.4 56.5h-16v45.7h-11.4V56.5H23V46.8h43.4v9.7zm38.6 30.6c-2.4 9.9-10.7 15.9-22.9 15.9-14.7 0-23.7-8.9-23.7-23.4 0-14.7 9.5-23.8 24.3-23.8 13.9 0 21.8 7.3 22.9 17.5H94.4c-.9-5.1-4.7-8.3-11.5-8.3-7.5 0-12.4 4.8-12.4 14.3 0 9.2 4.6 14.3 12.3 14.3 6.6 0 10.6-3.2 11.6-8.2l10.6 1.7z" fill="#ffffff" />
      </svg>
    ),
  },
  {
    name: 'HTML5',
    category: 'frontend',
    categoryLabel: 'Estructura Semántica',
    color: '#e44d26',
    glowColor: 'rgba(228, 77, 38, 0.45)',
    keycapTop: '#f97316',
    keycapSkirt: '#c2410c',
    textColor: '#ffffff',
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8">
        <path d="M19.2 114.7L9.9 10.7h108.2l-9.3 104-44.8 12.4-44.8-12.4z" fill="#ffffff" />
        <path d="M64 117.8l36.5-10.1 7.9-88.7H64v98.8z" fill="#e44d26" />
        <path d="M64 45.1v17.4h19.5l-1.8 20.3-17.7 4.8v18.1l32.1-8.9 4.3-48.4H64zm0-23.7v17.4h37.4l1.5-17.4H64z" fill="#ffffff" />
        <path d="M64 45.1H44.2l-1.5-17.4H64V21.4H23.8l4.4 50.1H64V45.1zm0 37.6l-17.7-4.8-.9-10.8H25.7l2 23.3 36.3 10.1V82.7z" fill="#f16529" />
      </svg>
    ),
  },
  {
    name: 'CSS3',
    category: 'frontend',
    categoryLabel: 'Estilos & Diseño',
    color: '#1572b6',
    glowColor: 'rgba(21, 114, 182, 0.45)',
    keycapTop: '#0284c7',
    keycapSkirt: '#0369a1',
    textColor: '#ffffff',
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8">
        <path d="M19.2 114.7L9.9 10.7h108.2l-9.3 104-44.8 12.4-44.8-12.4z" fill="#ffffff" />
        <path d="M64 117.8l36.5-10.1 7.9-88.7H64v98.8z" fill="#1572b6" />
        <path d="M64 54.3h18.2l-1.7 18.9-16.5 4.5v18.1l30.9-8.6 3.9-43.5 1.5-16.8H64v27.4zm0-27.4h39.2l1.5-16.8H64V26.9z" fill="#ffffff" />
        <path d="M64 54.3H45.5l-1.5-16.8H64V26.9H25.5l4.4 49.3H64V54.3zm0 33.7l-16.5-4.5-.9-10.8H28.9l2 22.5 33.1 9.2V88z" fill="#33a9dc" />
      </svg>
    ),
  },
  {
    name: 'React',
    category: 'frontend',
    categoryLabel: 'Biblioteca UI',
    color: '#00d8ff',
    glowColor: 'rgba(0, 216, 255, 0.5)',
    keycapTop: '#0ea5e9',
    keycapSkirt: '#0284c7',
    textColor: '#ffffff',
    svg: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-8 h-8">
        <circle cx="0" cy="0" r="2.05" fill="#ffffff" />
        <g stroke="#ffffff" strokeWidth="1.2" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    categoryLabel: 'Utility-First CSS',
    color: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    keycapTop: '#06b6d4',
    keycapSkirt: '#0891b2',
    textColor: '#ffffff',
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8">
        <path d="M37 45.5c4.8-19.4 17-29.1 36.4-29.1 24.3 0 31.5 17 38.8 26.7 4.9 6.5 10.9 12.1 20.6 12.1 4.9 0 9.7-1.2 14.6-3.6-4.8 19.4-17 29.1-36.4 29.1-24.3 0-31.5-17-38.8-26.7-4.9-6.5-10.9-12.1-20.6-12.1-4.9 0-9.7 1.2-14.6 3.6zm-36.4 34c4.9-19.4 17-29.1 36.4-29.1 24.3 0 31.5 17 38.8 26.7 4.9 6.5 10.9 12.1 20.6 12.1 4.9 0 9.7-1.2 14.6-3.6-4.8 19.4-17 29.1-36.4 29.1-24.3 0-31.5-17-38.8-26.7-4.9-6.5-10.9-12.1-20.6-12.1-4.9 0-9.7 1.2-14.6 3.6z" fill="#ffffff" />
      </svg>
    ),
  },

  // --- ROW 2: Mobile & Modern Tools ---
  {
    name: 'Flutter',
    category: 'frontend',
    categoryLabel: 'Multiplataforma',
    color: '#02569b',
    glowColor: 'rgba(2, 86, 155, 0.5)',
    keycapTop: '#1d4ed8',
    keycapSkirt: '#1e40af',
    textColor: '#ffffff',
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8">
        <path d="M76.9 16.5L25.6 67.8l15.4 15.4L107.7 16.5H76.9zm0 43.1L51.3 85.2l15.4 15.4L92.3 75 76.9 59.6zm15.4 15.4l-15.4 15.4 15.4 15.4h30.8L92.3 75z" fill="#ffffff" />
        <path d="M76.9 90.4l-15.4-15.4 15.4-15.4 15.4 15.4-15.4 15.4z" fill="#93c5fd" />
      </svg>
    ),
  },
  {
    name: 'Dart',
    category: 'frontend',
    categoryLabel: 'Lenguaje Flutter',
    color: '#00b4ab',
    glowColor: 'rgba(0, 180, 171, 0.45)',
    keycapTop: '#0d9488',
    keycapSkirt: '#115e59',
    textColor: '#ffffff',
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8">
        <path d="M22.5 18h46.7L109.8 58.6 68.6 99.8 22.5 18z" fill="#ffffff" />
        <path d="M68.6 99.8L18 53.7V18l50.6 81.8z" fill="#5eead4" />
      </svg>
    ),
  },
  {
    name: 'Vite',
    category: 'frontend',
    categoryLabel: 'Fast Bundler',
    color: '#bd34fe',
    glowColor: 'rgba(189, 52, 254, 0.45)',
    keycapTop: '#8b5cf6',
    keycapSkirt: '#6d28d9',
    textColor: '#ffffff',
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8">
        <path d="M116.5 18.2L68.7 108.6c-1.8 3.5-6.8 3.5-8.6 0L12.3 18.2c-2.1-4 1.4-8.7 5.8-7.8l45.4 9.1c.5.1 1 .1 1.5 0l45.7-9.1c4.4-.9 7.9 3.8 5.8 7.8z" fill="#ffffff" />
        <path d="M64 28.5L88 15l-16.5 45h21L53 113l7.5-47h-18L64 28.5z" fill="#ffea83" />
      </svg>
    ),
  },
  {
    name: 'Figma',
    category: 'frontend',
    categoryLabel: 'UI/UX Interface',
    color: '#f24e1e',
    glowColor: 'rgba(242, 78, 30, 0.45)',
    keycapTop: '#e11d48',
    keycapSkirt: '#be123c',
    textColor: '#ffffff',
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8">
        <path d="M43 128c11.6 0 21-9.4 21-21V86H43c-11.6 0-21 9.4-21 21s9.4 21 21 21z" fill="#ffffff" />
        <path d="M22 64c0-11.6 9.4-21 21-21h21v43H43c-11.6 0-21-9.4-21-21z" fill="#ffffff" />
        <path d="M22 21c0-11.6 9.4-21 21-21h21v43H43c-11.6 0-21-9.4-21-21z" fill="#ffffff" />
        <path d="M64 0h21c11.6 0 21 9.4 21 21s-9.4 21-21 21H64V0z" fill="#ffffff" />
        <path d="M106 64c0 11.6-9.4 21-21 21s-21-9.4-21-21 9.4-21 21-21 21 9.4 21 21z" fill="#ffffff" />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    category: 'backend',
    categoryLabel: 'Runtime Backend',
    color: '#339933',
    glowColor: 'rgba(51, 153, 51, 0.45)',
    keycapTop: '#16a34a',
    keycapSkirt: '#15803d',
    textColor: '#ffffff',
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8">
        <path d="M64 8.7L16.2 36.3v55.4L64 119.3l47.8-27.6V36.3L64 8.7z" fill="#ffffff" />
        <path d="M64 36.8L40.2 50.5v27.4L64 91.6l23.8-13.7V50.5L64 36.8z" fill="#16a34a" />
      </svg>
    ),
  },
  {
    name: 'Express',
    category: 'backend',
    categoryLabel: 'API Microframework',
    color: '#ffffff',
    glowColor: 'rgba(255, 255, 255, 0.35)',
    keycapTop: '#334155',
    keycapSkirt: '#1e293b',
    textColor: '#ffffff',
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8">
        <text x="64" y="80" textAnchor="middle" fill="#ffffff" fontSize="42" fontWeight="bold" fontFamily="monospace">ex</text>
      </svg>
    ),
  },

  // --- ROW 3: Backend Engines & Frameworks ---
  {
    name: 'NestJS',
    category: 'backend',
    categoryLabel: 'Modular Framework',
    color: '#e0234e',
    glowColor: 'rgba(224, 35, 78, 0.45)',
    keycapTop: '#dc2626',
    keycapSkirt: '#b91c1c',
    textColor: '#ffffff',
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8">
        <path d="M116.5 48.7c-3.1-6.1-8.1-11.2-14.3-14.6l-20.9-11.4c-6.2-3.4-13.6-4.2-20.5-2.3-6.9 1.9-12.8 6.4-16.5 12.5L25.6 64.2c-3.8 6.1-4.7 13.5-2.6 20.4 2.1 6.8 6.9 12.5 13.2 15.9l20.9 11.4c6.2 3.4 13.6 4.2 20.5 2.3 6.9-1.9 12.8-6.4 16.5-12.5l18.7-31.3c2.4-4.1 3.7-8.8 3.7-13.7v-8z" fill="#ffffff" />
      </svg>
    ),
  },
  {
    name: 'Python',
    category: 'backend',
    categoryLabel: 'Sistemas & AI',
    color: '#3776ab',
    glowColor: 'rgba(55, 118, 171, 0.45)',
    keycapTop: '#1e3a8a',
    keycapSkirt: '#172554',
    textColor: '#ffffff',
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8">
        <path d="M63.6 8c-28.7 0-26.9 12.4-26.9 12.4l.1 12.9h27.4v3.9H25.3S8 35.2 8 64c0 28.7 15.1 27.6 15.1 27.6h9v-12.7s-.5-15.1 14.8-15.1h25.4s14.4.2 14.4-13.9V21.9S88.9 8 63.6 8zm-14.7 8.3a4.4 4.4 0 1 1 0 8.8 4.4 4.4 0 0 1 0-8.8z" fill="#ffffff" />
        <path d="M64.4 120c28.7 0 26.9-12.4 26.9-12.4l-.1-12.9H63.8v-3.9h38.9S120 92.8 120 64c0-28.7-15.1-27.6-15.1-27.6h-9v12.7s.5 15.1-14.8 15.1H55.7s-14.4-.2-14.4 13.9v27.9s-2.2 14 23.1 14zm14.7-8.3a4.4 4.4 0 1 1 0-8.8 4.4 4.4 0 0 1 0 8.8z" fill="#ffd43b" />
      </svg>
    ),
  },
  {
    name: 'FastAPI',
    category: 'backend',
    categoryLabel: 'High-Throughput API',
    color: '#059669',
    glowColor: 'rgba(5, 150, 105, 0.45)',
    keycapTop: '#0d9488',
    keycapSkirt: '#0f766e',
    textColor: '#ffffff',
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8">
        <path d="M68 24L34 72h26l-4 32 34-48H64l4-32z" fill="#ffffff" />
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    category: 'database',
    categoryLabel: 'Base Relacional',
    color: '#336791',
    glowColor: 'rgba(51, 103, 145, 0.45)',
    keycapTop: '#1e40af',
    keycapSkirt: '#1e3a8a',
    textColor: '#ffffff',
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8">
        <path d="M64 12C35.3 12 12 35.3 12 64s23.3 52 52 52 52-23.3 52-52S92.7 12 64 12z" fill="#ffffff" />
        <ellipse cx="64" cy="64" rx="28" ry="32" fill="#1e40af" />
      </svg>
    ),
  },
  {
    name: 'SQL',
    category: 'database',
    categoryLabel: 'Consultas Estructuradas',
    color: '#0284c7',
    glowColor: 'rgba(2, 132, 199, 0.45)',
    keycapTop: '#0891b2',
    keycapSkirt: '#0e7490',
    textColor: '#ffffff',
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8">
        <ellipse cx="64" cy="30" rx="36" ry="12" fill="#ffffff" />
        <path d="M28 30v30c0 6.6 16.1 12 36 12s36-5.4 36-12V30H28z" fill="#ffffff" opacity="0.8" />
        <path d="M28 60v30c0 6.6 16.1 12 36 12s36-5.4 36-12V60H28z" fill="#ffffff" opacity="0.6" />
      </svg>
    ),
  },
  {
    name: 'MongoDB',
    category: 'database',
    categoryLabel: 'NoSQL Documental',
    color: '#13aa52',
    glowColor: 'rgba(19, 170, 82, 0.45)',
    keycapTop: '#059669',
    keycapSkirt: '#047857',
    textColor: '#ffffff',
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8">
        <path d="M63.8 8C59.9 14.8 34.6 57.3 34.6 78c0 19.7 14.5 35.7 30 39.7 13.9-3.7 27.6-18.7 27.6-39.7 0-20.7-24.5-63.2-28.4-70zm-1.1 94.6v-73c.7 1.3 10.3 16.5 10.3 36.5 0 20.3-8.8 33.3-10.3 36.5z" fill="#ffffff" />
      </svg>
    ),
  },

  // --- ROW 4: ORM, DevOps & Cloud ---
  {
    name: 'Prisma',
    category: 'database',
    categoryLabel: 'ORM Moderno',
    color: '#5a67d8',
    glowColor: 'rgba(90, 103, 216, 0.45)',
    keycapTop: '#6366f1',
    keycapSkirt: '#4338ca',
    textColor: '#ffffff',
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8">
        <path d="M107.5 97.4L72.1 14.6c-2.4-5.6-10.4-5.6-12.8 0L19.4 108.3c-2.1 4.9 2.5 10.1 7.6 8.7l74.9-20.2c4.8-1.3 7.8-6.1 5.6-10.6z" fill="#ffffff" />
      </svg>
    ),
  },
  {
    name: 'Docker',
    category: 'devops',
    categoryLabel: 'Contenedores',
    color: '#2496ed',
    glowColor: 'rgba(36, 150, 237, 0.45)',
    keycapTop: '#0284c7',
    keycapSkirt: '#0369a1',
    textColor: '#ffffff',
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8">
        <path d="M124.8 62.4c-1.3-1-4.7-2.1-8.5-1.5-.7-6.2-4.9-11.4-11-14.1l-2.1-.9-.8 2.1c-1.8 4.7-2.4 9.7-1.8 14.8-4.5 1.5-8.4 4.5-11.1 8.5H57.4V56.2h12.5V41.7H57.4V27.2H42.9v14.5H28.4v14.5H13.9v15.1c-6.8 2.6-11.5 9-11.9 16.3-.5 8.7 4.1 16.9 11.7 21.2 14.3 8.1 33.1 10.5 49.3 6.6 15.3-3.7 28.9-13.4 37.6-26.7 8.3.1 16.2-3.8 21.3-10.4 4.1-5.4 4.8-11.4 3-17.7l-.5-1.7-.5-1.5z" fill="#ffffff" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    category: 'devops',
    categoryLabel: 'Version Control',
    color: '#ffffff',
    glowColor: 'rgba(255, 255, 255, 0.35)',
    keycapTop: '#27272a',
    keycapSkirt: '#18181b',
    textColor: '#ffffff',
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8">
        <path fillRule="evenodd" clipRule="evenodd" d="M64 8C33.1 8 8 33.1 8 64c0 24.8 16.1 45.8 38.3 53.2 2.8.5 3.8-1.2 3.8-2.7v-9.6c-15.6 3.4-18.9-7.5-18.9-7.5-2.6-6.5-6.3-8.2-6.3-8.2-5.1-3.5.4-3.4.4-3.4 5.6.4 8.6 5.8 8.6 5.8 5 8.6 13.2 6.1 16.4 4.7.5-3.6 2-6.1 3.6-7.5-12.4-1.4-25.5-6.2-25.5-27.7 0-6.1 2.2-11.1 5.8-15-1-.6-2.5-7.1.6-14.8 0 0 4.7-1.5 15.4 5.7 4.5-1.2 9.3-1.9 14.1-1.9s9.6.6 14.1 1.9c10.7-7.2 15.4-5.7 15.4-5.7 3.1 7.7 1.6 14.2.6 14.8 3.6 3.9 5.8 8.9 5.8 15 0 21.6-13.1 26.3-25.6 27.7 2 1.7 3.9 5.2 3.9 10.5v15.6c0 1.5 1 3.3 3.9 2.7C104 109.8 120 88.8 120 64c0-30.9-25.1-56-56-56z" fill="#ffffff" />
      </svg>
    ),
  },
  {
    name: 'Postman',
    category: 'devops',
    categoryLabel: 'Testing APIs',
    color: '#ff6c37',
    glowColor: 'rgba(255, 108, 55, 0.45)',
    keycapTop: '#ea580c',
    keycapSkirt: '#c2410c',
    textColor: '#ffffff',
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8">
        <circle cx="64" cy="64" r="56" fill="#ffffff" />
        <path d="M42 45l46 19-46 19v-12l25-7-25-7V45z" fill="#ea580c" />
      </svg>
    ),
  },
  {
    name: 'Pandas',
    category: 'datascience',
    categoryLabel: 'Data Science',
    color: '#e70488',
    glowColor: 'rgba(231, 4, 136, 0.45)',
    keycapTop: '#be185d',
    keycapSkirt: '#9d174d',
    textColor: '#ffffff',
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8">
        <rect x="24" y="24" width="20" height="80" rx="4" fill="#ffffff" />
        <rect x="54" y="44" width="20" height="60" rx="4" fill="#ffffff" />
        <rect x="84" y="32" width="20" height="72" rx="4" fill="#ffffff" />
      </svg>
    ),
  },
  {
    name: 'NumPy',
    category: 'datascience',
    categoryLabel: 'Cálculo Numérico',
    color: '#4d77cf',
    glowColor: 'rgba(77, 119, 207, 0.45)',
    keycapTop: '#3b82f6',
    keycapSkirt: '#1d4ed8',
    textColor: '#ffffff',
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8">
        <path d="M30 35l34-20 34 20v40l-34 20-34-20V35z" fill="#ffffff" />
      </svg>
    ),
  },

  // --- ROW 5: Data & AI Ecosystem ---
  {
    name: 'Matplotlib',
    category: 'datascience',
    categoryLabel: 'Gráficos & Visualización',
    color: '#11557c',
    glowColor: 'rgba(17, 85, 124, 0.45)',
    keycapTop: '#155e75',
    keycapSkirt: '#164e63',
    textColor: '#ffffff',
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8">
        <circle cx="64" cy="64" r="42" fill="none" stroke="#ffffff" strokeWidth="8" strokeDasharray="14 6" />
        <circle cx="64" cy="64" r="20" fill="#ffffff" />
      </svg>
    ),
  },
  {
    name: 'Ollama',
    category: 'ai',
    categoryLabel: 'LLMs Locales',
    color: '#ffffff',
    glowColor: 'rgba(255, 255, 255, 0.45)',
    keycapTop: '#f8fafc',
    keycapSkirt: '#cbd5e1',
    textColor: '#0f172a',
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8">
        <circle cx="48" cy="54" r="8" fill="#0f172a" />
        <circle cx="80" cy="54" r="8" fill="#0f172a" />
        <ellipse cx="64" cy="80" rx="18" ry="10" fill="#0f172a" />
        <path d="M38 28l12 16M90 28L78 44" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Claude',
    category: 'ai',
    categoryLabel: 'Anthropic AI',
    color: '#d97706',
    glowColor: 'rgba(217, 119, 6, 0.45)',
    keycapTop: '#d97706',
    keycapSkirt: '#b45309',
    textColor: '#ffffff',
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8">
        <circle cx="64" cy="40" r="14" fill="#ffffff" />
        <circle cx="44" cy="74" r="14" fill="#ffffff" />
        <circle cx="84" cy="74" r="14" fill="#ffffff" />
        <circle cx="64" cy="64" r="8" fill="#ffffff" />
      </svg>
    ),
  },
  {
    name: 'OpenAI Codex',
    category: 'ai',
    categoryLabel: 'Síntesis de Código',
    color: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    keycapTop: '#10b981',
    keycapSkirt: '#059669',
    textColor: '#ffffff',
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8">
        <path d="M64 26l28 16v32l-28 16-28-16V42l28-16zm0 18.5L46 54.8v20.4L64 85.5l18-10.3V54.8L64 44.5z" fill="#ffffff" />
      </svg>
    ),
  },
  {
    name: 'LangChain',
    category: 'ai',
    categoryLabel: 'Orquestación LLM',
    color: '#22c55e',
    glowColor: 'rgba(34, 197, 94, 0.45)',
    keycapTop: '#15803d',
    keycapSkirt: '#166534',
    textColor: '#ffffff',
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8">
        <circle cx="42" cy="64" r="18" fill="none" stroke="#ffffff" strokeWidth="8" />
        <circle cx="86" cy="64" r="18" fill="none" stroke="#ffffff" strokeWidth="8" />
        <line x1="56" y1="64" x2="72" y2="64" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'MCP',
    category: 'ai',
    categoryLabel: 'Model Context Protocol',
    color: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    keycapTop: '#0284c7',
    keycapSkirt: '#0369a1',
    textColor: '#ffffff',
    svg: (
      <svg viewBox="0 0 128 128" className="w-8 h-8">
        <circle cx="64" cy="38" r="10" fill="#ffffff" />
        <circle cx="38" cy="84" r="10" fill="#ffffff" />
        <circle cx="90" cy="84" r="10" fill="#ffffff" />
        <line x1="64" y1="38" x2="38" y2="84" stroke="#ffffff" strokeWidth="5" />
        <line x1="64" y1="38" x2="90" y2="84" stroke="#ffffff" strokeWidth="5" />
        <line x1="38" y1="84" x2="90" y2="84" stroke="#ffffff" strokeWidth="5" />
        <circle cx="64" cy="68" r="6" fill="#93c5fd" />
      </svg>
    ),
  },
];
