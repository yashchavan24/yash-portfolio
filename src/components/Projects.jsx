import { useState, useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Shield, Globe, Brain, Lock, Code, Eye } from 'lucide-react'
import { GithubIcon } from './Icons'
import ProjectsScene from './ProjectsScene'
import { useLanguage } from '../i18n/LanguageContext'

const projects = [
  {
    title: 'NEXUS',
    subtitle: 'Social Community Platform',
    description: 'A full-stack social community platform with real-time features, AI assistant, and beautiful dark UI. OAuth authentication, live feed, communities, messaging, and Claude AI integration.',
    tech: ['Next.js 14', 'TypeScript', 'Prisma', 'PostgreSQL', 'Redis', 'Tailwind'],
    icon: Globe,
    gradient: 'from-cyan-500/20 to-blue-500/20',
    github: 'https://github.com/yashchavan24/nexus-social-app',
    live: 'https://nexus-social-app.vercel.app',
    features: ['OAuth (GitHub + Google)', 'Real-time Feed', 'AI Assistant', 'Direct Messaging', 'Interest Communities'],
    accent: 'text-cyan-400',
    border: 'border-cyan-500/20',
    bg: 'bg-cyan-500/5',
  },
  {
    title: 'CYBERSENTINEL',
    subtitle: 'AI-Powered SOC Automation',
    description: 'End-to-end cybersecurity automation: AI threat engine with MITRE ATT&CK mapping, statistical heuristics, LLM enrichment, severity scoring, and automatic alert dispatch.',
    tech: ['React', 'Node.js', 'SQLite', 'Vite', 'AI/ML'],
    icon: Shield,
    gradient: 'from-green-500/20 to-emerald-500/20',
    github: 'https://github.com/yashchavan24/cybersentinel',
    live: 'https://cybersentinel-lbnkgtclm-yashchavan24s-projects.vercel.app',
    features: ['MITRE ATT&CK Rules', 'AI Threat Engine', 'LLM Enrichment', 'Real-time Dashboard', 'Alert Dispatch'],
    accent: 'text-green-400',
    border: 'border-green-500/20',
    bg: 'bg-green-500/5',
  },
  {
    title: 'MATCHA 抹茶',
    subtitle: '3D E-Commerce Experience',
    description: 'An artisanal luxury e-commerce and interactive digital experience for ceremonial Japanese matcha with 3D WebGL inspection, ambient particle field, and mindful brewing calculator.',
    tech: ['Three.js', 'Vanilla JS', 'CSS3', 'WebGL', 'GSAP'],
    icon: Eye,
    gradient: 'from-purple-500/20 to-pink-500/20',
    github: 'https://github.com/yashchavan24/matcha',
    live: null,
    features: ['3D WebGL Inspector', 'Particle Field', 'Brewing Calculator', 'Quiz System', 'Cart & Checkout'],
    accent: 'text-purple-400',
    border: 'border-purple-500/20',
    bg: 'bg-purple-500/5',
  },
  {
    title: 'PhishingShield',
    subtitle: 'Phishing Detection System',
    description: 'Intelligent phishing detection and prevention system using machine learning and rule-based analysis to identify and block phishing attempts in real-time.',
    tech: ['Python', 'ML/AI', 'Security', 'NLP'],
    icon: Lock,
    gradient: 'from-pink-500/20 to-rose-500/20',
    github: 'https://github.com/yashchavan24/PhishingShield',
    live: null,
    features: ['URL Analysis', 'ML Detection', 'Real-time Scanning', 'Threat Intelligence', 'Report Generation'],
    accent: 'text-pink-400',
    border: 'border-pink-500/20',
    bg: 'bg-pink-500/5',
  },
  {
    title: 'MalwareScanner',
    subtitle: 'Malware Analysis Tool',
    description: 'Advanced malware scanning and analysis tool that uses signature-based detection and behavioral analysis to identify malicious software and provide detailed reports.',
    tech: ['Python', 'Security', 'Analysis', 'Regex'],
    icon: Shield,
    gradient: 'from-cyan-500/20 to-teal-500/20',
    github: 'https://github.com/yashchavan24/malware-scanner',
    live: null,
    features: ['Signature Detection', 'Behavioral Analysis', 'Hash Scanning', 'IOC Extraction', 'Report Builder'],
    accent: 'text-cyan-400',
    border: 'border-cyan-500/20',
    bg: 'bg-cyan-500/5',
  },
  {
    title: 'SentinelOps',
    subtitle: 'Security Operations Dashboard',
    description: 'A comprehensive security operations center dashboard for monitoring, tracking, and managing cybersecurity incidents and operational workflows.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Security Ops'],
    icon: Code,
    gradient: 'from-blue-500/20 to-indigo-500/20',
    github: 'https://github.com/yashchavan24/sentinel-ops',
    live: null,
    features: ['Incident Tracking', 'Alert Management', 'Real-time Monitoring', 'Report Dashboard', 'Team Collaboration'],
    accent: 'text-blue-400',
    border: 'border-blue-500/20',
    bg: 'bg-blue-500/5',
  },
]

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hover, setHover] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * -10, y: x * 10 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setHover(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative"
      style={{ perspective: '1200px' }}
    >
      <div
        className={`glass-card p-8 h-full relative overflow-hidden transition-all duration-300 ${hover ? `shadow-[0_0_60px_rgba(0,240,255,0.08)] ${project.border}` : ''}`}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Gradient overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${project.bg} ${project.border} group-hover:scale-110 transition-transform`}>
              <project.icon className={`w-7 h-7 ${project.accent}`} />
            </div>
            <div className="flex gap-2">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-cyber-border hover:border-cyber-cyan/50 bg-cyber-card/50 transition-all"
              >
                <GithubIcon className="w-4 h-4 text-cyber-text-dim group-hover:text-cyber-cyan" />
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-cyber-border hover:border-cyber-cyan/50 bg-cyber-card/50 transition-all"
                >
                  <ExternalLink className="w-4 h-4 text-cyber-text-dim group-hover:text-cyber-cyan" />
                </a>
              )}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Orbitron, monospace' }}>
            {project.title}
          </h3>
          <p className={`text-xs tracking-[2px] mb-4 ${project.accent}`} style={{ fontFamily: 'Orbitron, monospace' }}>
            {project.subtitle}
          </p>

          {/* Description */}
          <p className="text-cyber-text-dim text-sm leading-relaxed mb-6 line-clamp-3">
            {project.description}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.features.slice(0, 4).map((feature) => (
              <span
                key={feature}
                className="px-3 py-1.5 text-[10px] tracking-wider rounded-lg border border-cyber-border bg-cyber-card/50 text-cyber-text-dim"
                style={{ fontFamily: 'Orbitron, monospace' }}
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-cyber-border/50">
            {project.tech.map((tech) => (
              <span key={tech} className="text-xs text-cyber-text-dim">
                <span className={`${project.accent} opacity-40`}>#</span>{tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="projects" className="relative py-32 sm:py-44 overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]}>
          <Suspense fallback={null}>
            <ProjectsScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyber-purple/3 rounded-full blur-[250px]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-16 bg-gradient-to-r from-cyber-purple to-transparent" />
            <span className="text-xs tracking-[6px] text-cyber-purple" style={{ fontFamily: 'Orbitron, monospace' }}>
              {t.projects.sectionNum}
            </span>
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white" style={{ fontFamily: 'Orbitron, monospace' }}>
            {t.projects.title} <span className="text-gradient-cyber">{t.projects.title2}</span>
          </h2>
          <p className="text-cyber-text-dim text-lg max-w-2xl mt-6">
            {t.projects.desc}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <a
            href="https://github.com/yashchavan24?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="cyber-button inline-block"
          >
            {t.projects.viewAll}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
