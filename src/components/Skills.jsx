import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Shield, Code, Database, Cloud, Wrench, Brain } from 'lucide-react'
import SkillsScene from './SkillsScene'
import { useLanguage } from '../i18n/LanguageContext'

const skillCategories = [
  {
    title: 'Cybersecurity',
    icon: Shield,
    iconBg: 'bg-cyan-500/10 border-cyan-500/20',
    iconColor: 'text-cyan-400',
    barColor: 'bg-cyan-400',
    skills: [
      { name: 'Threat Analysis', level: 92 },
      { name: 'MITRE ATT&CK', level: 88 },
      { name: 'Penetration Testing', level: 80 },
      { name: 'SOC Operations', level: 90 },
      { name: 'Malware Analysis', level: 78 },
    ],
  },
  {
    title: 'Programming',
    icon: Code,
    iconBg: 'bg-purple-500/10 border-purple-500/20',
    iconColor: 'text-purple-400',
    barColor: 'bg-purple-400',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'JavaScript', level: 88 },
      { name: 'TypeScript', level: 82 },
      { name: 'HTML/CSS', level: 95 },
      { name: 'SQL', level: 85 },
    ],
  },
  {
    title: 'Frameworks',
    icon: Wrench,
    iconBg: 'bg-green-500/10 border-green-500/20',
    iconColor: 'text-green-400',
    barColor: 'bg-green-400',
    skills: [
      { name: 'Next.js', level: 88 },
      { name: 'React', level: 90 },
      { name: 'Node.js', level: 85 },
      { name: 'Three.js', level: 75 },
      { name: 'Tailwind CSS', level: 92 },
    ],
  },
  {
    title: 'AI & Data',
    icon: Brain,
    iconBg: 'bg-pink-500/10 border-pink-500/20',
    iconColor: 'text-pink-400',
    barColor: 'bg-pink-400',
    skills: [
      { name: 'Machine Learning', level: 78 },
      { name: 'NLP / LLMs', level: 80 },
      { name: 'Data Analysis', level: 82 },
      { name: 'Statistical Methods', level: 75 },
      { name: 'OpenAI API', level: 85 },
    ],
  },
  {
    title: 'Database & Cloud',
    icon: Database,
    iconBg: 'bg-blue-500/10 border-blue-500/20',
    iconColor: 'text-blue-400',
    barColor: 'bg-blue-400',
    skills: [
      { name: 'PostgreSQL', level: 85 },
      { name: 'Prisma ORM', level: 80 },
      { name: 'Redis', level: 75 },
      { name: 'Vercel / Netlify', level: 88 },
      { name: 'Supabase', level: 82 },
    ],
  },
  {
    title: 'Security Tools',
    icon: Cloud,
    iconBg: 'bg-cyan-500/10 border-cyan-500/20',
    iconColor: 'text-cyan-400',
    barColor: 'bg-cyan-400',
    skills: [
      { name: 'Wireshark', level: 85 },
      { name: 'Nmap', level: 80 },
      { name: 'Burp Suite', level: 78 },
      { name: 'Metasploit', level: 72 },
      { name: 'OWASP Tools', level: 85 },
    ],
  },
]

const tools = [
  'Git', 'GitHub', 'Vite', 'Webpack', 'npm', 'Prisma',
  'JWT', 'OAuth', 'AES-256', 'bcrypt', 'Helmet', 'Zod',
  'Framer Motion', 'GSAP', 'WebGL', 'SQLite',
]

function SkillBar({ name, level, barColor, delay }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-cyber-text">{name}</span>
        <span className="text-[10px] text-cyber-text-dim" style={{ fontFamily: 'Orbitron, monospace' }}>
          {level}%
        </span>
      </div>
      <div className="h-2 bg-cyber-card rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.5, delay: delay * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={`h-full rounded-full ${barColor}`}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="skills" className="relative py-32 sm:py-44 overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]}>
          <Suspense fallback={null}>
            <SkillsScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Background Accent */}
      <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-cyber-green/3 rounded-full blur-[200px]" />

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
            <div className="h-[1px] w-16 bg-gradient-to-r from-cyber-green to-transparent" />
            <span className="text-xs tracking-[6px] text-cyber-green" style={{ fontFamily: 'Orbitron, monospace' }}>
              {t.skills.sectionNum}
            </span>
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white" style={{ fontFamily: 'Orbitron, monospace' }}>
            {t.skills.title} <span className="text-gradient-green">{t.skills.title2}</span>
          </h2>
          <p className="text-cyber-text-dim text-lg max-w-2xl mt-6">
            {t.skills.desc}
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: catIndex * 0.1 }}
              className="glass-card p-8 hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${category.iconBg}`}>
                  <category.icon className={`w-6 h-6 ${category.iconColor}`} />
                </div>
                <h3 className="text-white font-semibold text-sm tracking-wide" style={{ fontFamily: 'Orbitron, monospace' }}>
                  {category.title}
                </h3>
              </div>
              {category.skills.map((skill, i) => (
                <SkillBar key={skill.name} {...skill} barColor={category.barColor} delay={catIndex * 2 + i} />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Tools & Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-xl font-semibold text-white mb-8 text-center" style={{ fontFamily: 'Orbitron, monospace' }}>
            <span className="text-gradient-cyber">{t.skills.toolsTitle}</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {tools.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ scale: 1.1, y: -3 }}
                className="px-5 py-2.5 text-xs rounded-xl border border-cyber-border bg-cyber-card/50 text-cyber-text-dim hover:text-cyber-cyan hover:border-cyber-cyan/30 transition-all cursor-default"
                style={{ fontFamily: 'Orbitron, monospace' }}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
