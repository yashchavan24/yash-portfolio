import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Shield, Code, Brain, Terminal, Lock, Zap, ArrowRight } from 'lucide-react'
import AboutScene from './AboutScene'
import { useLanguage } from '../i18n/LanguageContext'

export default function About() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const highlights = [
    { icon: Shield, title: t.about.cyberSec.title, description: t.about.cyberSec.desc, color: 'cyan' },
    { icon: Brain, title: t.about.aiDefense.title, description: t.about.aiDefense.desc, color: 'purple' },
    { icon: Code, title: t.about.fullStack.title, description: t.about.fullStack.desc, color: 'green' },
    { icon: Terminal, title: t.about.automation.title, description: t.about.automation.desc, color: 'pink' },
    { icon: Lock, title: t.about.secureArch.title, description: t.about.secureArch.desc, color: 'cyan' },
    { icon: Zap, title: t.about.performance.title, description: t.about.performance.desc, color: 'blue' },
  ]

  const colorMap = {
    cyan: { bg: 'bg-cyan-500/10 border-cyan-500/20', text: 'text-cyan-400', line: 'from-cyan-500' },
    purple: { bg: 'bg-purple-500/10 border-purple-500/20', text: 'text-purple-400', line: 'from-purple-500' },
    green: { bg: 'bg-green-500/10 border-green-500/20', text: 'text-green-400', line: 'from-green-500' },
    pink: { bg: 'bg-pink-500/10 border-pink-500/20', text: 'text-pink-400', line: 'from-pink-500' },
    blue: { bg: 'bg-blue-500/10 border-blue-500/20', text: 'text-blue-400', line: 'from-blue-500' },
  }

  return (
    <section id="about" ref={sectionRef} className="relative py-32 sm:py-44 overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]}>
          <Suspense fallback={null}>
            <AboutScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Background Accents */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyber-cyan/3 rounded-full blur-[200px]" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-cyber-purple/3 rounded-full blur-[200px]" />

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
            <div className="h-[1px] w-16 bg-gradient-to-r from-cyber-cyan to-transparent" />
            <span className="text-xs tracking-[6px] text-cyber-cyan" style={{ fontFamily: 'Orbitron, monospace' }}>
              {t.about.sectionNum}
            </span>
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white" style={{ fontFamily: 'Orbitron, monospace' }}>
            {t.about.title1} <br />
            <span className="text-gradient-cyber">{t.about.title2}</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="space-y-8 text-cyber-text leading-loose text-lg sm:text-xl">
              <p>
                {t.about.bio1} <span className="text-white font-semibold">{t.about.bio1Name}</span>, {t.about.bio1Role} <span className="text-cyber-cyan">{t.about.bio1Location}</span>. {t.about.bio1College} <span className="text-white font-medium">{t.about.bio1CollegeName}</span>
              </p>
              <p>
                {t.about.bio2} <span className="text-cyber-purple">{t.about.bio2AI}</span> {t.about.bio2And}{' '}
                <span className="text-cyber-cyan">{t.about.bio2SEC}</span>. {t.about.bio2Text}{' '}
                <span className="text-cyber-green">{t.about.bio2Anticipate}</span> {t.about.bio2End}
              </p>
              <p>
                {t.about.bio3} <span className="text-cyber-cyan">{t.about.bio3End}</span> {t.about.bio3End2}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="mt-14 grid grid-cols-3 gap-5">
              {[
                { value: 'St. Vincent', label: t.about.college },
                { value: 'Cyber Sec', label: t.about.focus },
                { value: 'Full-Stack', label: t.about.dev },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="glass-card p-5 text-center"
                >
                  <div className="text-sm font-bold text-white" style={{ fontFamily: 'Orbitron, monospace' }}>
                    {stat.value}
                  </div>
                  <div className="text-[9px] tracking-[2px] text-cyber-text-dim mt-2" style={{ fontFamily: 'Orbitron, monospace' }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Highlights Grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            {highlights.map((item, i) => {
              const colors = colorMap[item.color] || colorMap.cyan
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="glass-card p-6 group hover:scale-[1.02] transition-transform duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${colors.bg} group-hover:scale-110 transition-transform`}>
                    <item.icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-3">{item.title}</h3>
                  <p className="text-cyber-text-dim text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
