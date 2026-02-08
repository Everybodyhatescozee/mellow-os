import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FocusTrainer from './FocusTrainer'
import MinimalIntervalTimer from './MinimalIntervalTimer'
import AutosaveJournal from './AutosaveJournal'
import CognitiveConsole from './CognitiveConsole'

const STORAGE_KEY = 'mellow_neural_core_sessions'

export default function NeuralCore({ mode }) {
  const [booting, setBooting] = useState(true)
  const [bootCompleted, setBootCompleted] = useState(() => {
    // Check if boot has been completed in this session
    return sessionStorage.getItem('neural_core_boot_completed') === 'true'
  })
  const [sessions, setSessions] = useState([])

  // Load sessions from LocalStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setSessions(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to parse stored sessions:', e)
      }
    }

    // Boot animation - only show once per session
    if (!bootCompleted) {
      const timer = setTimeout(() => {
        setBooting(false)
        setBootCompleted(true)
        sessionStorage.setItem('neural_core_boot_completed', 'true')
      }, 2000)
      return () => clearTimeout(timer)
    } else {
      setBooting(false)
    }
  }, [bootCompleted])

  // Save sessions to LocalStorage
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
    }
  }, [sessions])

  const addSession = (session) => {
    setSessions(prev => [session, ...prev])
  }

  return (
    <div className="h-full">
      <AnimatePresence mode="wait">
        {booting ? (
          <motion.div
            key="boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                className="text-6xl md:text-7xl font-mono font-bold text-mellowOff mb-6"
                style={{
                  textShadow: '0 0 40px rgba(92,75,138,0.6)'
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                NEURAL CORE
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <BootLine text="$ initializing neural core..." delay={0.6} />
                <BootLine text="$ loading memory systems..." delay={0.9} />
                <BootLine text="$ activating recall protocols..." delay={1.2} />
                <BootLine text="$ mounting autosave logs..." delay={1.5} />
                <BootLine text="✓ Mellow OS v1.4 — Neural Core online" delay={1.8} success />
              </motion.div>

              <motion.div
                className="mt-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.8, type: 'spring', stiffness: 200 }}
              >
                <div className="w-16 h-1 bg-gradient-to-r from-mellowPurple to-mellowGreen rounded-full mx-auto" />
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="interface"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="h-full w-full"
          >
            {/* Freeze Mode: Full-screen Minimal Interval Timer */}
            <MinimalIntervalTimer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function BootLine({ text, delay, success }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={`text-xs md:text-sm font-mono tracking-wide ${
        success ? 'text-mellowGreen' : 'text-gray-500'
      }`}
    >
      {text}
    </motion.div>
  )
}
