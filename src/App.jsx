import { useState } from 'react'
import { LanguageProvider } from './i18n/LanguageContext'
import GlobeIntro from './components/GlobeIntro'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Certifications from './components/Certifications'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import {
  GlitchMatrixTransition,
  ParticleBurstTransition,
  FlipCardsTransition,
  TerminalScanTransition,
  SignalWaveTransition,
} from './components/SectionTransitions'

function App() {
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <LanguageProvider>
      {/* Globe Intro Animation */}
      {!introComplete && (
        <GlobeIntro onComplete={() => setIntroComplete(true)} />
      )}

      {/* Main Portfolio */}
      <div className={`relative bg-cyber-black min-h-screen transition-opacity duration-500 ${introComplete ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
        <Hero />
        <GlitchMatrixTransition />
        <About />
        <ParticleBurstTransition />
        <Certifications />
        <FlipCardsTransition />
        <Projects />
        <TerminalScanTransition />
        <Skills />
        <SignalWaveTransition />
        <Contact />
        <Footer />
      </div>
    </LanguageProvider>
  )
}

export default App
