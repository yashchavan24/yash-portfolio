import { motion } from 'framer-motion'
import { Mail, Heart, Shield } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'
import { useLanguage } from '../i18n/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="relative border-t border-cyber-border bg-cyber-dark/50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 border border-cyber-cyan/40 rotate-45" />
              <span className="text-gradient-cyber font-bold text-sm" style={{ fontFamily: 'Orbitron, monospace' }}>Y</span>
            </div>
            <div>
              <span className="text-white text-sm font-semibold" style={{ fontFamily: 'Orbitron, monospace' }}>
                YASH CHAVAN
              </span>
              <span className="text-cyber-text-dim text-xs block" style={{ fontFamily: 'Orbitron, monospace' }}>
                {t.footer.role}
              </span>
            </div>
          </div>

          {/* Center */}
          <div className="text-center">
            <p className="text-cyber-text-dim text-xs flex items-center gap-1">
              {t.footer.crafted} <Heart className="w-3 h-3 text-cyber-magenta" /> {t.footer.secured}
              <Shield className="w-3 h-3 text-cyber-cyan" />
            </p>
            <p className="text-cyber-text-dim text-[10px] mt-1 tracking-wider" style={{ fontFamily: 'Orbitron, monospace' }}>
              {t.footer.copyright}
            </p>
          </div>

          {/* Social */}
          <div className="flex gap-3">
            {[
              { icon: GithubIcon, href: 'https://github.com/yashchavan24' },
              { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/yash-chavan-b42905292/' },
              { icon: Mail, href: 'mailto:yashchavan.2332@gmail.com' },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-cyber-border hover:border-cyber-cyan/50 bg-cyber-card/30 transition-all hover:shadow-[0_0_15px_rgba(0,240,255,0.15)] group"
              >
                <Icon className="w-4 h-4 text-cyber-text-dim group-hover:text-cyber-cyan transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* ASCII Art Divider */}
        <div className="mt-8 text-center">
          <p className="text-cyber-text-dim/30 text-[10px] tracking-[2px]" style={{ fontFamily: 'monospace' }}>
            ═══════════════════════════════════════════════════════════
          </p>
        </div>
      </div>
    </footer>
  )
}
