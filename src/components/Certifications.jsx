import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, Shield, Brain, ExternalLink, CheckCircle, Globe, BookOpen } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const certifications = [
  {
    icon: Shield,
    titleKey: 'hpTitle',
    issuerKey: 'hpIssuer',
    dateKey: 'hpDate',
    descKey: 'hpDesc',
    color: 'cyan',
    iconBg: 'bg-cyan-500/10 border-cyan-500/20',
    iconColor: 'text-cyan-400',
    credentialUrl: 'https://www.linkedin.com/posts/yash-chavan-b42905292_hp-certification-activity-7270291867861196800-MJjo',
  },
  {
    icon: Globe,
    titleKey: 'jlptN5Title',
    issuerKey: 'jlptN5Issuer',
    dateKey: 'jlptN5Date',
    descKey: 'jlptN5Desc',
    color: 'purple',
    iconBg: 'bg-purple-500/10 border-purple-500/20',
    iconColor: 'text-purple-400',
    credentialUrl: null,
  },
  {
    icon: BookOpen,
    titleKey: 'jlptN4Title',
    issuerKey: 'jlptN4Issuer',
    dateKey: 'jlptN4Date',
    descKey: 'jlptN4Desc',
    color: 'green',
    iconBg: 'bg-green-500/10 border-green-500/20',
    iconColor: 'text-green-400',
    credentialUrl: null,
  },
  {
    icon: Brain,
    titleKey: 'cyberTitle',
    issuerKey: 'cyberIssuer',
    dateKey: 'cyberDate',
    descKey: 'cyberDesc',
    color: 'pink',
    iconBg: 'bg-pink-500/10 border-pink-500/20',
    iconColor: 'text-pink-400',
    credentialUrl: null,
  },
  {
    icon: Award,
    titleKey: 'aiTitle',
    issuerKey: 'aiIssuer',
    dateKey: 'aiDate',
    descKey: 'aiDesc',
    color: 'blue',
    iconBg: 'bg-blue-500/10 border-blue-500/20',
    iconColor: 'text-blue-400',
    credentialUrl: null,
  },
]

export default function Certifications() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const sectionRef = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  return (
    <section ref={sectionRef} className="relative py-32 sm:py-44 overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-cyber-cyan/3 rounded-full blur-[250px] -translate-y-1/2" />

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
              {t.certs.sectionNum}
            </span>
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white" style={{ fontFamily: 'Orbitron, monospace' }}>
            {t.certs.title} <span className="text-gradient-cyber">{t.certs.title2}</span>
          </h2>
        </motion.div>

        {/* Certifications */}
        <div className="space-y-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group"
            >
              <div className="glass-card p-8 flex flex-col sm:flex-row items-start gap-6 hover:scale-[1.01] transition-transform duration-300">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center flex-shrink-0 ${cert.iconBg} group-hover:scale-110 transition-transform`}>
                  <cert.icon className={`w-8 h-8 ${cert.iconColor}`} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg mb-2">
                    {t.certs[cert.titleKey]}
                  </h3>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-sm ${cert.iconColor}`}>{t.certs[cert.issuerKey]}</span>
                    <span className="text-cyber-text-dim">•</span>
                    <span className="text-sm text-cyber-text-dim">{t.certs[cert.dateKey]}</span>
                  </div>
                  <p className="text-cyber-text-dim text-sm leading-relaxed mb-4">
                    {t.certs[cert.descKey]}
                  </p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className={`w-4 h-4 ${cert.iconColor}`} />
                    <span className="text-[10px] tracking-[3px] text-cyber-text-dim" style={{ fontFamily: 'Orbitron, monospace' }}>
                      VERIFIED
                    </span>
                  </div>
                </div>

                {/* Link */}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-cyber-border hover:border-cyber-cyan/50 bg-cyber-card/50 transition-all flex-shrink-0"
                  >
                    <ExternalLink className="w-4 h-4 text-cyber-text-dim group-hover:text-cyber-cyan" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
