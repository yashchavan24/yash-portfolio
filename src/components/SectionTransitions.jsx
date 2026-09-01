import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

// ============================================
// TRANSITION 1: Hero → About — GLITCH MATRIX
// ============================================
export function GlitchMatrixTransition() {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.5 })
  const [glitchActive, setGlitchActive] = useState(false)

  useEffect(() => {
    if (isInView) {
      setGlitchActive(true)
      const timer = setTimeout(() => setGlitchActive(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [isInView])

  const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ'

  return (
    <div ref={ref} className="relative h-40 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-black via-cyber-dark to-cyber-black" />

      {/* Matrix rain columns */}
      <div className="absolute inset-0 flex justify-around opacity-20">
        {Array.from({ length: 30 }).map((_, i) => (
          <MatrixColumn key={i} delay={i * 0.05} active={glitchActive} chars={matrixChars} />
        ))}
      </div>

      {/* Glitch lines */}
      {glitchActive && (
        <>
          <motion.div
            className="absolute left-0 right-0 h-[2px] bg-cyber-cyan"
            initial={{ top: '0%', opacity: 0 }}
            animate={{ top: '100%', opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.5, repeat: 3 }}
          />
          <motion.div
            className="absolute left-0 right-0 h-[1px] bg-cyber-purple"
            initial={{ top: '100%', opacity: 0 }}
            animate={{ top: '0%', opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.3, repeat: 4, delay: 0.1 }}
          />
        </>
      )}

      {/* Center text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="text-center">
          <div className={`text-xs tracking-[8px] ${glitchActive ? 'text-cyber-cyan' : 'text-cyber-text-dim'}`} style={{ fontFamily: 'Orbitron, monospace' }}>
            <GlitchText text="LOADING PROFILE" active={glitchActive} />
          </div>
          <div className="mt-2 flex justify-center gap-1">
            {[0, 1, 2, 3, 4].map(i => (
              <motion.div
                key={i}
                className="w-8 h-1 bg-cyber-cyan/30"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Horizontal scan lines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,240,255,0.02) 3px, rgba(0,240,255,0.02) 4px)',
      }} />
    </div>
  )
}

function MatrixColumn({ delay, active, chars }) {
  const [text, setText] = useState('')
  const [y, setY] = useState(-100)

  useEffect(() => {
    const interval = setInterval(() => {
      const len = 3 + Math.floor(Math.random() * 5)
      const newText = Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('\n')
      setText(newText)
      setY(active ? Math.random() * 200 - 50 : -100)
    }, 200 + Math.random() * 300)
    return () => clearInterval(interval)
  }, [active, chars])

  return (
    <motion.div
      className="text-[10px] text-cyber-cyan leading-tight"
      style={{ fontFamily: 'monospace', writingMode: 'vertical-rl' }}
      animate={{ y, opacity: active ? 0.6 : 0.1 }}
      transition={{ duration: 0.3 }}
    >
      {text}
    </motion.div>
  )
}

function GlitchText({ text, active }) {
  if (!active) return <span>{text}</span>
  return (
    <span className="relative">
      <span className="text-cyber-cyan">{text}</span>
      <span className="absolute top-0 left-0 text-cyber-magenta opacity-50" style={{ transform: 'translate(2px, -1px)' }}>{text}</span>
      <span className="absolute top-0 left-0 text-cyber-green opacity-50" style={{ transform: 'translate(-2px, 1px)' }}>{text}</span>
    </span>
  )
}

// ============================================
// TRANSITION 2: About → Certifications — PARTICLE BURST
// ============================================
export function ParticleBurstTransition() {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.5 })
  const [burst, setBurst] = useState(false)

  useEffect(() => {
    if (isInView) {
      setBurst(true)
      const timer = setTimeout(() => setBurst(false), 1500)
      return () => clearTimeout(timer)
    }
  }, [isInView])

  return (
    <div ref={ref} className="relative h-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-black via-cyber-dark to-cyber-black" />

      {/* Particle burst */}
      <div className="absolute inset-0 flex items-center justify-center">
        {burst && Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: ['#00f0ff', '#8000ff', '#00ff88', '#ff00ff'][i % 4],
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos((i / 40) * Math.PI * 2) * (100 + Math.random() * 200),
              y: Math.sin((i / 40) * Math.PI * 2) * (50 + Math.random() * 100),
              opacity: 0,
              scale: 0,
            }}
            transition={{ duration: 1 + Math.random() * 0.5, ease: 'easeOut' }}
          />
        ))}

        {/* Central flash */}
        {burst && (
          <motion.div
            className="absolute w-4 h-4 rounded-full bg-cyber-cyan"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 20, opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </div>

      {/* Expanding rings */}
      {burst && [0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyber-cyan/30"
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{ width: 400, height: 400, opacity: 0 }}
          transition={{ duration: 1, delay: i * 0.2, ease: 'easeOut' }}
        />
      ))}

      {/* Center badge */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="px-6 py-3 border border-cyber-purple/30 rounded-full bg-cyber-dark/80 backdrop-blur">
          <span className="text-xs tracking-[6px] text-cyber-purple" style={{ fontFamily: 'Orbitron, monospace' }}>
            CREDENTIALS VERIFIED
          </span>
        </div>
      </motion.div>
    </div>
  )
}

// ============================================
// TRANSITION 3: Certifications → Projects — 3D FLIP CARDS
// ============================================
export function FlipCardsTransition() {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.5 })
  const [flipPhase, setFlipPhase] = useState(0)

  useEffect(() => {
    if (isInView) {
      const t1 = setTimeout(() => setFlipPhase(1), 200)
      const t2 = setTimeout(() => setFlipPhase(2), 600)
      const t3 = setTimeout(() => setFlipPhase(3), 1000)
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
    }
  }, [isInView])

  const cards = ['<> CODE', '</> BUILD', '0x DEPLOY']

  return (
    <div ref={ref} className="relative h-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-black via-cyber-dark to-cyber-black" />

      <div className="absolute inset-0 flex items-center justify-center gap-8">
        {cards.map((text, i) => (
          <motion.div
            key={i}
            className="relative w-32 h-20"
            style={{ perspective: '600px' }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <motion.div
              className="absolute inset-0 rounded-xl border border-cyber-border bg-cyber-card/80 flex items-center justify-center backface-hidden"
              animate={{ rotateY: flipPhase > i ? 180 : 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-xs text-cyber-text-dim" style={{ fontFamily: 'Orbitron, monospace' }}>???</span>
            </motion.div>
            <motion.div
              className="absolute inset-0 rounded-xl border border-cyber-cyan/30 bg-cyber-dark/90 flex items-center justify-center"
              style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
            >
              <span className="text-xs text-cyber-cyan font-bold" style={{ fontFamily: 'Orbitron, monospace' }}>{text}</span>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// TRANSITION 4: Projects → Skills — TERMINAL SCAN
// ============================================
export function TerminalScanTransition() {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.5 })
  const [lines, setLines] = useState([])
  const [scanLine, setScanLine] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const terminalLines = [
      { text: '$ skill --scan --verbose', color: 'text-cyber-green', delay: 0 },
      { text: '[SCAN] Cybersecurity.............. 92%', color: 'text-cyber-cyan', delay: 200 },
      { text: '[SCAN] Programming................. 90%', color: 'text-cyber-purple', delay: 400 },
      { text: '[SCAN] Frameworks.................. 88%', color: 'text-cyber-green', delay: 600 },
      { text: '[SCAN] AI & Data................... 85%', color: 'text-cyber-purple', delay: 800 },
      { text: '[OK] Arsenal loaded. Ready to deploy.', color: 'text-cyber-green', delay: 1000 },
    ]

    terminalLines.forEach((line, i) => {
      setTimeout(() => setLines(prev => [...prev, line]), line.delay)
    })

    const scanInterval = setInterval(() => {
      setScanLine(prev => (prev + 1) % 100)
    }, 30)

    return () => clearInterval(scanInterval)
  }, [isInView])

  return (
    <div ref={ref} className="relative h-48 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-black via-[#050510] to-cyber-black" />

      {/* Terminal window */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-2 bg-cyber-dark border border-b-0 border-cyber-border rounded-t-xl">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-[10px] text-cyber-text-dim" style={{ fontFamily: 'monospace' }}>yash@portfolio:~$</span>
        </div>

        {/* Terminal body */}
        <div className="bg-[#0a0a15] border border-cyber-border rounded-b-xl p-4 min-h-[120px] relative overflow-hidden">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`text-xs mb-1 ${line.color}`}
              style={{ fontFamily: 'monospace' }}
            >
              {line.text}
            </motion.div>
          ))}

          {/* Cursor */}
          <div className="inline-block w-2 h-4 bg-cyber-cyan animate-pulse" />

          {/* Scan line */}
          <motion.div
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyber-cyan/40 to-transparent"
            animate={{ top: `${scanLine}%` }}
            transition={{ duration: 0.03 }}
          />
        </div>
      </motion.div>
    </div>
  )
}

// ============================================
// TRANSITION 5: Skills → Contact — SIGNAL WAVE
// ============================================
export function SignalWaveTransition() {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.5 })
  const [waves, setWaves] = useState([])

  useEffect(() => {
    if (!isInView) return
    const interval = setInterval(() => {
      setWaves(prev => {
        const newWaves = [...prev, { id: Date.now(), color: ['#00f0ff', '#8000ff', '#00ff88'][prev.length % 3] }]
        return newWaves.slice(-5)
      })
    }, 400)
    return () => clearInterval(interval)
  }, [isInView])

  return (
    <div ref={ref} className="relative h-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-black via-cyber-dark to-cyber-black" />

      {/* Expanding signal waves */}
      <div className="absolute inset-0 flex items-center justify-center">
        {waves.map(wave => (
          <motion.div
            key={wave.id}
            className="absolute rounded-full border"
            style={{ borderColor: wave.color }}
            initial={{ width: 0, height: 0, opacity: 0.8 }}
            animate={{ width: 500, height: 500, opacity: 0, borderWidth: 1 }}
            transition={{ duration: 2, ease: 'easeOut' }}
          />
        ))}

        {/* Center pulse */}
        <motion.div
          className="w-4 h-4 rounded-full bg-cyber-cyan"
          animate={{
            scale: [1, 1.5, 1],
            boxShadow: ['0 0 20px rgba(0,240,255,0.5)', '0 0 40px rgba(0,240,255,0.8)', '0 0 20px rgba(0,240,255,0.5)'],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>

      {/* Text */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
          <span className="text-xs tracking-[5px] text-cyber-green" style={{ fontFamily: 'Orbitron, monospace' }}>
            SIGNAL ACTIVE — READY TO CONNECT
          </span>
        </div>
      </motion.div>
    </div>
  )
}
