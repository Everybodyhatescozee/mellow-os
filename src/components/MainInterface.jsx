import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Tile from './Tile'
import ModeToggle from './ModeToggle'
import ModeSelector from './ModeSelector'
import CursorTrail from './CursorTrail'
import TerminalBackground from './TerminalBackground'
import NeuralNetwork from './NeuralNetwork'
import NeuralCore from './NeuralCore'
import FloatBreather from './FloatBreather'
import BootSequence from './BootSequence'
import FixMode from './FixMode'
import ErrorBoundary from './ErrorBoundary'
import SOCDashboard from './SOCDashboard'

export default function MainInterface(){
  const [mode, setMode] = useState(() => localStorage.getItem('mellow_mode') || 'flow')
  const [showBoot, setShowBoot] = useState(false)
  const [bootMode, setBootMode] = useState(mode)
  const [selectorOpen, setSelectorOpen] = useState(false)

  useEffect(()=>{
    localStorage.setItem('mellow_mode', mode)
  },[mode])

  // Handle mode selection from selector
  const handleModeSelect = (newMode) => {
    setSelectorOpen(false)
    if (newMode !== mode) {
      setBootMode(newMode)
      setShowBoot(true)
    }
  }

  const handleBootComplete = () => {
    setShowBoot(false)
    setMode(bootMode)
  }

  return (
    <div className="min-h-screen relative overflow-hidden" data-mode={mode}>
      {/* Mode-specific boot sequence overlay */}
      <AnimatePresence>
        {showBoot && (
          <BootSequence key="boot" mode={bootMode} onFinish={handleBootComplete} />
        )}
      </AnimatePresence>

      {/* Mode Selector */}
      <ModeSelector 
        currentMode={mode}
        onSelectMode={handleModeSelect}
        isOpen={selectorOpen}
        onClose={() => setSelectorOpen(false)}
      />

      {/* Background animations */}
      <AnimatePresence mode="wait">
        {mode === 'flow' ? (
          <NeuralNetwork key="neural" mode={mode} />
        ) : mode === 'freeze' ? (
          <motion.div 
            key="freeze-bg"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-mellowBlack via-mellowBlack to-mellowPurple/20" />
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'radial-gradient(circle at 20% 30%, rgba(92,75,138,0.15), transparent)',
                  'radial-gradient(circle at 80% 70%, rgba(0,184,148,0.15), transparent)',
                  'radial-gradient(circle at 50% 50%, rgba(92,75,138,0.15), transparent)',
                ]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        ) : mode === 'float' ? (
          <motion.div 
            key="float-bg"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-mellowBlack via-mellowBlack to-cyan-400/10" />
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'radial-gradient(circle at 30% 20%, rgba(34,211,238,0.1), transparent)',
                  'radial-gradient(circle at 70% 80%, rgba(96,165,250,0.1), transparent)',
                  'radial-gradient(circle at 30% 20%, rgba(34,211,238,0.1), transparent)',
                ]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        ) : mode === 'soc' ? (
          <motion.div 
            key="soc-bg"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-mellowBlack via-mellowBlack to-red-900/20" />
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'radial-gradient(circle at 20% 30%, rgba(248,113,113,0.15), transparent)',
                  'radial-gradient(circle at 80% 70%, rgba(239,68,68,0.15), transparent)',
                  'radial-gradient(circle at 50% 50%, rgba(248,113,113,0.15), transparent)',
                ]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        ) : (
          <TerminalBackground key="terminal" mode={mode} />
        )}
      </AnimatePresence>
      <CursorTrail mode={mode} />

      <div className="absolute inset-0 -z-10">
        <motion.div className="w-full h-full"
          animate={{
            background: mode === 'flow' 
              ? 'radial-gradient(circle at 20% 30%, rgba(92,75,138,0.15), rgba(0,0,0,0)), radial-gradient(circle at 80% 70%, rgba(0,184,148,0.12), rgba(0,0,0,0))'
              : mode === 'freeze'
              ? 'radial-gradient(circle at 50% 50%, rgba(92,75,138,0.1), rgba(0,0,0,0.98)), radial-gradient(circle at 30% 70%, rgba(0,184,148,0.08), rgba(0,0,0,0.98))'
              : 'radial-gradient(circle at 30% 40%, rgba(20,20,20,0.8), rgba(0,0,0,0.95)), radial-gradient(circle at 70% 60%, rgba(40,40,40,0.6), rgba(0,0,0,0.95))'
          }}
          transition={{duration:1.2}}
        />
      </div>

      {mode === 'flow' ? (
        // Flow mode - Just neural network with fading title
        <div className="max-w-7xl mx-auto py-16 px-4 md:px-8 relative z-10 min-h-screen flex flex-col items-center justify-center">
          <motion.div
            initial={{opacity:0, scale:0.9}}
            animate={{opacity:1, scale:1}}
            exit={{opacity:0, scale:0.9}}
            transition={{duration:1.2, ease: [0.22, 1, 0.36, 1]}}
            className="text-center"
          >
            <motion.h1 
              className="text-7xl md:text-9xl font-heading font-bold tracking-tight mb-6"
              style={{
                textShadow: '0 0 60px rgba(92,75,138,0.6), 0 0 120px rgba(0,184,148,0.3)'
              }}
              initial={{opacity:1}}
              animate={{
                opacity: [1, 1, 0],
                textShadow: [
                  '0 0 60px rgba(92,75,138,0.6), 0 0 120px rgba(0,184,148,0.3)',
                  '0 0 80px rgba(92,75,138,0.8), 0 0 160px rgba(0,184,148,0.4)',
                  '0 0 60px rgba(92,75,138,0.6), 0 0 120px rgba(0,184,148,0.3)'
                ]
              }}
              transition={{duration: 4, ease: "easeInOut"}}
            >
              Mellow OS
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-400 font-mono tracking-wide"
              initial={{opacity:0}}
              animate={{opacity: [0, 1, 1, 0]}}
              transition={{duration: 4, times: [0, 0.2, 0.7, 1]}}
            >
              Percy Mawela — 23 — cybersecurity specialist
            </motion.p>
            <motion.p
              className="mt-6 text-sm text-mellowGreen/80 font-mono"
              initial={{opacity:0}}
              animate={{opacity: [0, 1, 1, 0]}}
              transition={{duration: 4, times: [0, 0.3, 0.7, 1]}}
            >
              Neural network of security & systems expertise
            </motion.p>
          </motion.div>
          <ModeToggle mode={mode} onOpenSelector={() => setSelectorOpen(true)} />
        </div>
  ) : mode === 'freeze' ? (
        // Freeze mode - Neural Core full page
        <div className="max-w-[1600px] mx-auto py-6 md:py-8 px-4 md:px-8 relative z-10 h-screen flex flex-col">
          <motion.header 
            className="mb-4 md:mb-6"
            initial={{opacity:0, y:-20}}
            animate={{opacity:1, y:0}}
            transition={{duration:0.8, ease: [0.22, 1, 0.36, 1]}}
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold tracking-tight text-mellowOff">
                  Neural Core
                </h1>
                <p className="mt-1 md:mt-2 text-xs sm:text-sm text-gray-400 font-mono">
                  Minimal interval timer for deep focus
                </p>
              </div>
              <motion.div
                className="text-mellowGreen text-[10px] sm:text-xs font-mono"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ❄ FREEZE
              </motion.div>
            </div>
          </motion.header>

          <motion.div 
            className="flex-1 overflow-auto"
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay:0.3, duration:0.8}}
          >
            <NeuralCore mode={mode}/>
          </motion.div>

          <ModeToggle mode={mode} onOpenSelector={() => setSelectorOpen(true)} />
        </div>
      ) : mode === 'float' ? (
        // Float mode - Breathing interface full page
        <div className="max-w-[1600px] mx-auto py-6 md:py-8 px-4 md:px-8 relative z-10 h-screen flex flex-col">
          <motion.header 
            className="mb-4 md:mb-6"
            initial={{opacity:0, y:-20}}
            animate={{opacity:1, y:0}}
            transition={{duration:0.8, ease: [0.22, 1, 0.36, 1]}}
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold tracking-tight text-mellowOff">
                  Float Mode
                </h1>
                <p className="mt-1 md:mt-2 text-xs sm:text-sm text-gray-400 font-mono">
                  Guided breathing for focus, calm, and creativity
                </p>
              </div>
              <motion.div
                className="text-cyan-400 text-[10px] sm:text-xs font-mono"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🌬 FLOAT
              </motion.div>
            </div>
          </motion.header>

          <motion.div 
            className="flex-1 overflow-hidden"
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay:0.3, duration:0.8}}
          >
            <FloatBreather />
          </motion.div>

          <ModeToggle mode={mode} onOpenSelector={() => setSelectorOpen(true)} />
        </div>
  ) : mode === 'fix' ? (
        // Fix mode - custom scripts & automations
        <div className="max-w-[1600px] mx-auto py-6 md:py-8 px-4 md:px-8 relative z-10 h-screen flex flex-col">
          <motion.header 
            className="mb-4 md:mb-6"
            initial={{opacity:0, y:-20}}
            animate={{opacity:1, y:0}}
            transition={{duration:0.8, ease: [0.22, 1, 0.36, 1]}}
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold tracking-tight text-mellowOff">
                  Fix Mode
                </h1>
                <p className="mt-1 md:mt-2 text-xs sm:text-sm text-gray-400 font-mono">
                  Custom scripts & automations
                </p>
              </div>
              <motion.div
                className="text-yellow-400 text-[10px] sm:text-xs font-mono"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🛠 FIX
              </motion.div>
            </div>
          </motion.header>

          <motion.div 
            className="flex-1 overflow-auto p-4"
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay:0.3, duration:0.8}}
          >
            <ErrorBoundary>
              <FixMode />
            </ErrorBoundary>
          </motion.div>

          <ModeToggle mode={mode} onOpenSelector={() => setSelectorOpen(true)} />
        </div>
      ) : mode === 'soc' ? (
        // SOC mode - Security Operations Center
        <div className="max-w-[1600px] mx-auto py-6 md:py-8 px-4 md:px-8 relative z-10 h-screen flex flex-col">
          <motion.header 
            className="mb-4 md:mb-6"
            initial={{opacity:0, y:-20}}
            animate={{opacity:1, y:0}}
            transition={{duration:0.8, ease: [0.22, 1, 0.36, 1]}}
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold tracking-tight text-mellowOff">
                  Security Operations Center
                </h1>
                <p className="mt-1 md:mt-2 text-xs sm:text-sm text-gray-400 font-mono">
                  Real-time threat monitoring & incident response
                </p>
              </div>
              <motion.div
                className="text-red-400 text-[10px] sm:text-xs font-mono"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🛡 SOC
              </motion.div>
            </div>
          </motion.header>

          <motion.div 
            className="flex-1 overflow-auto"
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay:0.3, duration:0.8}}
          >
            <ErrorBoundary>
              <SOCDashboard />
            </ErrorBoundary>
          </motion.div>

          <ModeToggle mode={mode} onOpenSelector={() => setSelectorOpen(true)} />
        </div>
      ) : (
        // Focus mode - Portfolio landing page
        <div className="max-w-7xl mx-auto py-12 md:py-16 px-4 md:px-8 relative z-10">
          <motion.div
            initial={{opacity:0, y:20}}
            animate={{opacity:1, y:0}}
            transition={{duration:0.8, ease: [0.22, 1, 0.36, 1]}}
            className="mb-16 md:mb-24"
          >
            <motion.h1 
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-bold tracking-tight mb-6"
              style={{
                textShadow: '0 0 60px rgba(92,75,138,0.6), 0 0 120px rgba(0,184,148,0.3)'
              }}
            >
              Percy Mawela
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-mellowGreen font-mono mb-4"
              initial={{opacity:0}}
              animate={{opacity:1}}
              transition={{delay:0.2}}
            >
              Cybersecurity Analyst · Systems Thinker
            </motion.p>
            <motion.p 
              className="text-base md:text-lg text-gray-400 max-w-3xl leading-relaxed"
              initial={{opacity:0}}
              animate={{opacity:1}}
              transition={{delay:0.4}}
            >
              I work at the intersection of cybersecurity, systems thinking, and thoughtful software design.
              My focus is on understanding threats, patterns, and workflows — from SOC monitoring and incident response fundamentals to building tools that prioritize clarity over noise.
              I’m interested in how security systems actually operate in practice, and how they can be designed to support better decisions under pressure.
            </motion.p>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay:0.6}}
          >
            <motion.div 
              className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
              whileHover={{ scale: 1.02, borderColor: 'rgba(239,68,68,0.3)' }}
            >
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="text-lg font-bold text-mellowOff mb-2">Security Operations (SOC Foundations)</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Monitoring and analyzing security events using SIEM concepts, alert triage, and incident response workflows.
                Focused on understanding attacker behavior, reducing noise, and escalating incidents with context.
              </p>
            </motion.div>

            <motion.div 
              className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
              whileHover={{ scale: 1.02, borderColor: 'rgba(0,184,148,0.3)' }}
            >
              <div className="text-3xl mb-3">🐍</div>
              <h3 className="text-lg font-bold text-mellowOff mb-2">Security Automation</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Writing Python scripts to automate repetitive security tasks, enrich alerts, and support SOC workflows.
                Exploring how small automations can improve response speed and analyst focus.
              </p>
            </motion.div>

            <motion.div 
              className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
              whileHover={{ scale: 1.02, borderColor: 'rgba(92,75,138,0.3)' }}
            >
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-bold text-mellowOff mb-2">Secure Development</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Building web applications with security in mind using React, Next.js, and TypeScript.
                Emphasizing input validation, safe defaults, and defensive thinking during development.
              </p>
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="flex flex-wrap gap-4 mb-16"
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay:0.8}}
          >
            <a 
              href="mailto:percyvilyc@gmail.com"
              className="px-6 py-3 rounded-lg bg-mellowGreen text-mellowBlack font-bold text-sm hover:bg-mellowGreen/80 transition-colors"
            >
              Get in Touch
            </a>
            <a 
              href="https://www.linkedin.com/in/percy-mawela-925425271"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-lg border border-white/20 bg-white/5 text-mellowOff font-bold text-sm hover:bg-white/10 transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href="https://github.com/Everybodyhatescozee"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-lg border border-white/20 bg-white/5 text-mellowOff font-bold text-sm hover:bg-white/10 transition-colors"
            >
              GitHub
            </a>
          </motion.div>

          {/* Mode Explorer Hint */}
          <motion.div
            className="text-center mb-12"
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay:1}}
          >
            <p className="text-sm text-gray-500 font-mono mb-2">Explore different modes</p>
            <div className="flex items-center justify-center gap-3 text-xl">
              <span className="opacity-50">☯</span>
              <span className="opacity-50">◈</span>
              <span className="opacity-50">❄</span>
              <span className="opacity-50">🌬</span>
              <span className="opacity-50">🛠</span>
              <span className="opacity-50">🛡</span>
            </div>
          </motion.div>

          <motion.section
            className="mt-12 md:mt-16 max-w-4xl"
            initial={{opacity:0, y:20}}
            animate={{opacity:1, y:0}}
            transition={{delay:1.2}}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-mellowOff mb-6">About MellowOS</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                MellowOS is a personal operating system for thinking clearly in noisy environments.
              </p>
              <p>
                It's a space where systems, security, and creativity meet — built around the idea that good decisions come from calm observation, not urgency. Instead of overwhelming dashboards or performative productivity tools, MellowOS focuses on signal, pattern, and intention.
              </p>
              <p>
                At its core, MellowOS is an experiment in how people actually think:
              </p>
              <ul className="space-y-2 ml-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-mellowGreen mt-1">→</span>
                  <span>noticing before reacting</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-mellowGreen mt-1">→</span>
                  <span>understanding before acting</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-mellowGreen mt-1">→</span>
                  <span>building quietly, then letting it compound</span>
                </li>
              </ul>
              <p>
                It blends concepts from cybersecurity, systems design, and cognitive science into a toolset that values clarity over volume and depth over speed.
              </p>
              <p className="text-sm text-gray-400 italic">
                MellowOS is not finished — and it's not trying to be. It's a living system, shaped by use, reflection, and iteration.
              </p>
            </div>
          </motion.section>

        <ModeToggle mode={mode} onOpenSelector={() => setSelectorOpen(true)} />
      </div>
      )}
    </div>
  )
}

function ContactForm({mode}){
  return (
    <div className="p-4 space-y-5">
      <motion.div 
        className="relative p-5 rounded-xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(92,75,138,0.08), rgba(0,184,148,0.05))',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)'
        }}
        whileHover={{
          boxShadow: '0 0 30px rgba(92,75,138,0.3)',
          borderColor: 'rgba(92,75,138,0.4)'
        }}
      >
        <div className="font-mono text-sm">&gt; initiate_contact --to="percyvilyc@gmail.com" <span className="cursor-blink inline-block"/></div>
        <div className="absolute inset-0 bg-gradient-to-r from-mellowPurple/10 to-mellowGreen/10 opacity-50" />
      </motion.div>
      
      <div className="space-y-2 text-sm">
        <motion.a 
          href="mailto:percyvilyc@gmail.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-3 p-3 rounded-lg transition-all relative overflow-hidden group"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}
          whileHover={{x:6, backgroundColor: 'rgba(0,184,148,0.1)', borderColor: 'rgba(0,184,148,0.3)'}}
        >
          <span className="text-lg">📧</span>
          <span className="group-hover:text-mellowGreen transition-colors">percyvilyc@gmail.com</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-mellowGreen/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.a>
        
        <motion.a 
          href="https://www.linkedin.com/in/percy-mawela-925425271" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-3 p-3 rounded-lg transition-all relative overflow-hidden group"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}
          whileHover={{x:6, backgroundColor: 'rgba(0,184,148,0.1)', borderColor: 'rgba(0,184,148,0.3)'}}
        >
          <span className="text-lg">💼</span>
          <span className="group-hover:text-mellowGreen transition-colors">LinkedIn</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-mellowGreen/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.a>
        
        <motion.a 
          href="https://www.instagram.com/mellow.malik" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-3 p-3 rounded-lg transition-all relative overflow-hidden group"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}
          whileHover={{x:6, backgroundColor: 'rgba(0,184,148,0.1)', borderColor: 'rgba(0,184,148,0.3)'}}
        >
          <span className="text-lg">📸</span>
          <span className="group-hover:text-mellowGreen transition-colors">Instagram</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-mellowGreen/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.a>
      </div>
    </div>
  )
}
