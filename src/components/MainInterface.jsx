import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Tile from './Tile'
import ModeToggle from './ModeToggle'
import ModeSelector from './ModeSelector'
import CursorTrail from './CursorTrail'
import TerminalBackground from './TerminalBackground'
import NeuralNetwork from './NeuralNetwork'
import ProjectCard from './ProjectCard'
import NeuralCore from './NeuralCore'
import FloatBreather from './FloatBreather'
import BootSequence from './BootSequence'

const PROJECTS = [
  {
    title: "Marauders' Memory Map",
    description: "Interactive memory mapping application with real-time data synchronization",
    fullDescription: "A modern full-stack memory mapping application showcasing advanced React and Next.js capabilities. Built with Next.js 16, React 19, and Supabase for real-time data management. Features include an intuitive interface for creating and organizing memories, dark mode support, responsive design optimized for all devices, and type-safe TypeScript implementation. Leverages cutting-edge technologies including Turbopack for performance optimization and shadcn/ui for a polished component library. The project demonstrates expertise in modern web development, real-time database management, and creating seamless user experiences.",
    tech: ["Next.js 16", "React 19", "TypeScript", "Supabase", "Tailwind CSS v4", "shadcn/ui", "Vercel"],
    github: "https://github.com/Everybodyhatescozee/Naheedv2",
    live: "https://naheedmap.vercel.app",
    image: "/marauders-memory-map.png"
  },
  {
    title: "Shepherd Studios",
    description: "Faith-driven motion design studio website with animated brand identity",
    tech: ["Next.js", "React", "TypeScript", "Framer Motion", "Tailwind CSS v4", "shadcn/ui"],
    github: "https://github.com/Everybodyhatescozee/shepherd-studios",
    live: "https://shepherd-studios.vercel.app"
  }
]

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
              Percy Mawela — 22 — creative technologist & designer
            </motion.p>
            <motion.p
              className="mt-6 text-sm text-mellowGreen/80 font-mono"
              initial={{opacity:0}}
              animate={{opacity: [0, 1, 1, 0]}}
              transition={{duration: 4, times: [0, 0.3, 0.7, 1]}}
            >
              Neural network of skills & expertise
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
                  Memory training & cognitive journaling system
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
            className="flex-1 overflow-hidden"
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
      ) : (
        // Focus mode - Full interface with cards
        <div className="max-w-7xl mx-auto py-12 md:py-16 px-4 md:px-8 relative z-10">
          <header className="mb-12 md:mb-16 max-w-4xl">
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-8xl font-heading font-bold tracking-tight"
              initial={{opacity:0, y:-30}}
              animate={{opacity:1, y:0}}
              transition={{duration:1, ease: [0.22, 1, 0.36, 1]}}
            >
              Mellow OS
            </motion.h1>
            <motion.p 
              className="mt-3 md:mt-4 text-sm md:text-base text-gray-400 font-mono tracking-wide"
              initial={{opacity:0}}
              animate={{opacity:1}}
              transition={{delay:0.4, duration:0.8}}
            >
              Percy Mawela — 22 — creative technologist & designer
            </motion.p>
          </header>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          <Tile title="About" index={0} mode={mode}>
            <div className="p-4 text-sm leading-relaxed space-y-3">
              <p>I'm Percy Mawela, a 22-year-old computer science student and creative technologist from South Africa. I design and build digital systems where aesthetic precision meets technical clarity — blending code, motion, and storytelling into functional art.</p>
              
              <p>My current focus lies in cybersecurity, Python development, and frontend engineering — mastering how systems interact, secure themselves, and express intelligence through design. I'm driven by the balance between creativity and control: how code can protect, perform, and communicate all at once.</p>
              
              <p>Technically, I work with React, Next.js, TailwindCSS, Framer Motion, Supabase, Firebase, MySQL, Python, and Vercel — tools that help me turn concepts into interactive realities. My curiosity extends beyond aesthetics; it's about building digital experiences that feel human yet engineered for precision.</p>
              
              <p>At its core, Mellow OS isn't just a portfolio — it's a system of self-evolution. A reflection of how I think, learn, and build: technical, calm, and alive.</p>
            </div>
          </Tile>

          <Tile title="Projects" index={1} mode={mode}>
            <div className="p-4 space-y-3">
              {PROJECTS.map((project, i) => (
                <ProjectCard key={i} project={project} mode={mode}/>
              ))}
            </div>
          </Tile>

          <Tile title="Contact" index={2} mode={mode}>
            <ContactForm mode={mode}/>
          </Tile>
        </main>

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
