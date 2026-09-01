import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, MapPin, Send, MessageSquare, Shield, ArrowRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'
import ContactScene from './ContactScene'
import { useLanguage } from '../i18n/LanguageContext'

const socialLinks = [
  {
    icon: GithubIcon,
    label: 'GitHub',
    value: 'yashchavan24',
    href: 'https://github.com/yashchavan24',
    iconBg: 'bg-cyan-500/10 border-cyan-500/20',
    iconColor: 'text-cyan-400',
  },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    value: 'Yash Chavan',
    href: 'https://www.linkedin.com/in/yash-chavan-b42905292/',
    iconBg: 'bg-blue-500/10 border-blue-500/20',
    iconColor: 'text-blue-400',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'yashchavan.2332@gmail.com',
    href: 'mailto:yashchavan.2332@gmail.com',
    iconBg: 'bg-green-500/10 border-green-500/20',
    iconColor: 'text-green-400',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Nagpur, Maharashtra, India',
    href: null,
    iconBg: 'bg-purple-500/10 border-purple-500/20',
    iconColor: 'text-purple-400',
  },
]

export default function Contact() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio Contact from ${formState.name}`)
    const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`)
    window.open(`mailto:yashchavan.2332@gmail.com?subject=${subject}&body=${body}`, '_blank')
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setFormState({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="relative py-32 sm:py-44 overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]}>
          <Suspense fallback={null}>
            <ContactScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-cyan/3 rounded-full blur-[250px]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-20 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-cyber-cyan" />
            <span className="text-xs tracking-[6px] text-cyber-cyan" style={{ fontFamily: 'Orbitron, monospace' }}>
              {t.contact.sectionNum}
            </span>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-cyber-cyan" />
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white" style={{ fontFamily: 'Orbitron, monospace' }}>
            {t.contact.title} <span className="text-gradient-cyber">{t.contact.title2}</span>
          </h2>
          <p className="text-cyber-text-dim text-lg max-w-xl mx-auto mt-6">
            {t.contact.desc}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-card p-10 relative overflow-hidden">
              <div className="absolute inset-0 scan-line pointer-events-none" />

              <div className="flex items-center gap-3 mb-8">
                <MessageSquare className="w-6 h-6 text-cyber-cyan" />
                <h3 className="text-white font-semibold text-lg" style={{ fontFamily: 'Orbitron, monospace' }}>
                  {t.contact.formTitle}
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs tracking-[3px] text-cyber-text-dim mb-3" style={{ fontFamily: 'Orbitron, monospace' }}>
                    {t.contact.name}
                  </label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-5 py-4 bg-cyber-dark border border-cyber-border rounded-xl text-white text-sm focus:outline-none focus:border-cyber-cyan/50 focus:shadow-[0_0_20px_rgba(0,240,255,0.1)] transition-all"
                    placeholder={t.contact.namePlaceholder}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-[3px] text-cyber-text-dim mb-3" style={{ fontFamily: 'Orbitron, monospace' }}>
                    {t.contact.email}
                  </label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-5 py-4 bg-cyber-dark border border-cyber-border rounded-xl text-white text-sm focus:outline-none focus:border-cyber-cyan/50 focus:shadow-[0_0_20px_rgba(0,240,255,0.1)] transition-all"
                    placeholder={t.contact.emailPlaceholder}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-[3px] text-cyber-text-dim mb-3" style={{ fontFamily: 'Orbitron, monospace' }}>
                    {t.contact.message}
                  </label>
                  <textarea
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    rows={6}
                    className="w-full px-5 py-4 bg-cyber-dark border border-cyber-border rounded-xl text-white text-sm focus:outline-none focus:border-cyber-cyan/50 focus:shadow-[0_0_20px_rgba(0,240,255,0.1)] transition-all resize-none"
                    placeholder={t.contact.messagePlaceholder}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="cyber-button w-full flex items-center justify-center gap-3 group"
                >
                  {sent ? (
                    <>
                      <Shield className="w-4 h-4" />
                      {t.contact.sentBtn}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {t.contact.sendBtn}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-5"
          >
            {socialLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {link.href ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card p-6 flex items-center gap-5 group cursor-pointer block hover:scale-[1.02] transition-transform duration-300"
                  >
                    <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center group-hover:scale-110 transition-transform ${link.iconBg}`}>
                      <link.icon className={`w-7 h-7 ${link.iconColor}`} />
                    </div>
                    <div>
                      <p className="text-xs tracking-[3px] text-cyber-text-dim mb-1" style={{ fontFamily: 'Orbitron, monospace' }}>
                        {link.label.toUpperCase()}
                      </p>
                      <p className="text-white font-medium">{link.value}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-cyber-text-dim group-hover:text-cyber-cyan ml-auto group-hover:translate-x-1 transition-all" />
                  </a>
                ) : (
                  <div className="glass-card p-6 flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${link.iconBg}`}>
                      <link.icon className={`w-7 h-7 ${link.iconColor}`} />
                    </div>
                    <div>
                      <p className="text-xs tracking-[3px] text-cyber-text-dim mb-1" style={{ fontFamily: 'Orbitron, monospace' }}>
                        {link.label.toUpperCase()}
                      </p>
                      <p className="text-white font-medium">{link.value}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Availability Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="glass-card p-8 mt-4 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/5 to-transparent" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-cyber-green rounded-full animate-pulse" />
                  <span className="text-xs tracking-[4px] text-cyber-green" style={{ fontFamily: 'Orbitron, monospace' }}>
                    {t.contact.available}
                  </span>
                </div>
                <p className="text-cyber-text text-sm leading-relaxed">
                  {t.contact.availableDesc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
