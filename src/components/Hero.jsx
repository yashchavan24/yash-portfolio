import { useRef, Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Shield, ChevronDown, ArrowDown } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'
import HeroScene from './HeroScene'
import { useLanguage } from '../i18n/LanguageContext'

// Typewriter effect
function TypewriterText({ texts, speed = 50, delay = 0 }) {
  const [displayText, setDisplayText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!started) return
    const currentText = texts[textIndex]

    if (!isDeleting && charIndex < currentText.length) {
      const timer = setTimeout(() => {
        setDisplayText(currentText.slice(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      }, speed)
      return () => clearTimeout(timer)
    }

    if (!isDeleting && charIndex === currentText.length) {
      const timer = setTimeout(() => setIsDeleting(true), 2000)
      return () => clearTimeout(timer)
    }

    if (isDeleting && charIndex > 0) {
      const timer = setTimeout(() => {
        setDisplayText(currentText.slice(0, charIndex - 1))
        setCharIndex(charIndex - 1)
      }, speed / 2)
      return () => clearTimeout(timer)
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false)
      setTextIndex((textIndex + 1) % texts.length)
    }
  }, [charIndex, isDeleting, textIndex, texts, speed, started])

  return (
    <span>
      {displayText}
      <span className="animate-pulse text-cyber-cyan">_</span>
    </span>
  )
}

export default function Hero() {
  const { t } = useLanguage()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 1.5]}>
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-black/30 via-transparent to-cyber-black" />
      <div className="absolute inset-0 bg-gradient-to-r from-cyber-black/70 via-transparent to-cyber-black/50" />

      {/* Grid Lines */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `
          linear-gradient(rgba(0,240,255,0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,240,255,0.5) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px'
      }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full">
        <div className="max-w-4xl">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-cyber-cyan/20 bg-cyber-cyan/5 mb-10"
          >
            <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
            <span className="text-xs tracking-[4px] text-cyber-cyan" style={{ fontFamily: 'Orbitron, monospace' }}>
              {t.hero.badge}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl sm:text-8xl lg:text-9xl font-bold leading-[0.85] mb-8"
            style={{
              fontFamily: 'Orbitron, monospace',
              transform: `translate(${mousePos.x * 0.01}px, ${mousePos.y * 0.01}px)`
            }}
          >
            <span className="block text-white">{t.hero.title1}</span>
            <span className="block text-gradient-cyber mt-2">{t.hero.title2}</span>
          </motion.h1>

          {/* Typewriter subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="mb-12"
          >
            <div className="text-lg sm:text-xl text-cyber-text-dim font-mono h-8">
              <span className="text-cyber-green mr-2">$</span>
              <TypewriterText
                texts={[
                  t.hero.subtitle + ' ' + t.hero.highlight1 + ', ' + t.hero.highlight2 + ', ' + t.hero.highlight3,
                  'nmap -sV target.cyber',
                  'scanning ports... 65535 found',
                  'access granted // welcome',
                  t.hero.subtitle + ' ' + t.hero.highlight1 + ', ' + t.hero.highlight2 + ', ' + t.hero.highlight3,
                ]}
                speed={40}
                delay={2000}
              />
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex flex-wrap gap-12 mb-14"
          >
            {[
              { value: '6+', label: t.hero.projects, color: 'text-cyber-cyan' },
              { value: '5+', label: t.hero.securityTools, color: 'text-cyber-purple' },
              { value: '10+', label: t.hero.technologies, color: 'text-cyber-green' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`text-4xl font-bold ${stat.color}`} style={{ fontFamily: 'Orbitron, monospace' }}>
                  {stat.value}
                </div>
                <div className="text-[10px] tracking-[3px] text-cyber-text-dim mt-2" style={{ fontFamily: 'Orbitron, monospace' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="flex flex-wrap gap-5 mb-14"
          >
            <a href="#projects" className="cyber-button group">
              <span>{t.hero.viewProjects}</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </a>
            <a
              href="https://github.com/yashchavan24"
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-button group"
              style={{ borderColor: '#8000ff', color: '#c080ff' }}
            >
              <GithubIcon className="w-4 h-4" />
              <span>{t.hero.github}</span>
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="flex gap-4"
          >
            {[
              { icon: GithubIcon, href: 'https://github.com/yashchavan24', label: 'GitHub' },
              { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/yash-chavan-b42905292/', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:yashchavan.2332@gmail.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-12 h-12 flex items-center justify-center rounded-xl border border-cyber-border hover:border-cyber-cyan/50 bg-cyber-card/30 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,240,255,0.15)]"
                aria-label={label}
              >
                <Icon className="w-5 h-5 text-cyber-text-dim group-hover:text-cyber-cyan transition-colors" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] tracking-[5px] text-cyber-text-dim" style={{ fontFamily: 'Orbitron, monospace' }}>
          {t.hero.scroll}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-cyber-cyan" />
        </motion.div>
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute bottom-6 left-6 text-[10px] text-cyber-cyan/20" style={{ fontFamily: 'monospace' }}>
        SEC://PORTFOLIO<br />
        BUILD v3.0.0
      </div>
    </section>
  )
}
