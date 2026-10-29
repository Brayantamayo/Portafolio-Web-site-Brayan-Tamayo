export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'cloud' | 'frontend' | 'ai-pipeline' | 'devops' | 'mobile';
  categoryLabel: string;
  image: string;
  description: string;
  extendedDescription: string;
  role: string;
  impactMetrics: { label: string; value: string }[];
  technologies: string[];
  architectureHighlights: string[];
  demoUrl?: string;
  githubUrl?: string;
  isFeatured?: boolean;
  year: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: {
    name: string;
    level: string; // e.g. "Arquitectura Senior", "Avanzado"
    years: number;
    icon?: string;
  }[];
}

export interface Experience {
  id: string;
  period: string;
  role: string;
  company: string;
  companyLocation: string;
  summary: string;
  achievements: string[];
  techStack: string[];
}

export interface ArchitectureNode {
  id: string;
  title: string;
  role: string;
  latency: string;
  technologies: string[];
  description: string;
  connections: string[];
  status: 'active' | 'synced' | 'optimized';
}
