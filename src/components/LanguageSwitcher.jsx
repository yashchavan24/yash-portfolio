import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { languages } from '../i18n/translations'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const current = languages.find((l) => l.code === language)

  return (
    <div ref={ref} className="relative z-50">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-cyber-border bg-cyber-card/50 hover:border-cyber-cyan/50 transition-all group"
      >
        <Globe className="w-4 h-4 text-cyber-text-dim group-hover:text-cyber-cyan transition-colors" />
        <span className="text-xs tracking-wider text-cyber-text-dim group-hover:text-cyber-text" style={{ fontFamily: 'Orbitron, monospace' }}>
          {current?.flag} {current?.code.toUpperCase()}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-44 glass-card p-2 rounded-xl border border-cyber-border shadow-2xl"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setLanguage(lang.code); setOpen(false) }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                  language === lang.code
                    ? 'bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20'
                    : 'text-cyber-text-dim hover:bg-cyber-card hover:text-cyber-text border border-transparent'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="text-xs tracking-wider" style={{ fontFamily: 'Orbitron, monospace' }}>
                  {lang.name}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
