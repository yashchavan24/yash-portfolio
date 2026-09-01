import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  const navLinks = [
    { label: t.nav.home, href: '#hero' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.skills, href: '#skills' },
    { label: t.nav.contact, href: '#contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = ['hero', 'about', 'projects', 'skills', 'contact']
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < window.innerHeight / 2) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cyber-black/90 backdrop-blur-xl border-b border-cyber-border shadow-[0_4px_30px_rgba(0,240,255,0.05)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 border border-cyber-cyan/50 rotate-45 group-hover:rotate-[135deg] transition-transform duration-500" />
            <span className="text-gradient-cyber font-bold text-lg" style={{ fontFamily: 'Orbitron, monospace' }}>Y</span>
          </div>
          <div className="hidden sm:block">
            <span className="text-cyber-text-dim text-xs tracking-[4px] block leading-tight" style={{ fontFamily: 'Orbitron, monospace' }}>
              YASH
            </span>
            <span className="text-cyber-cyan text-[10px] tracking-[6px]" style={{ fontFamily: 'Orbitron, monospace' }}>
              CHAVAN
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-xs tracking-[3px] font-medium transition-all duration-300 ${
                  isActive ? 'text-cyber-cyan' : 'text-cyber-text-dim hover:text-cyber-text'
                }`}
                style={{ fontFamily: 'Orbitron, monospace' }}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-cyber-cyan"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            )
          })}
        </div>

        {/* Language Switcher + Status */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <div className="flex items-center gap-2 text-xs text-cyber-green" style={{ fontFamily: 'Orbitron, monospace' }}>
            <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
            {t.nav.online}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
        >
          <span className={`w-6 h-[2px] bg-cyber-cyan transition-all ${mobileOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
          <span className={`w-6 h-[2px] bg-cyber-cyan transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-[2px] bg-cyber-cyan transition-all ${mobileOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cyber-black/95 backdrop-blur-xl border-b border-cyber-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm tracking-[4px] py-2 text-cyber-text-dim hover:text-cyber-cyan transition-colors"
                  style={{ fontFamily: 'Orbitron, monospace' }}
                >
                  <span className="text-cyber-cyan/40 mr-2">0{i + 1}.</span>
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
