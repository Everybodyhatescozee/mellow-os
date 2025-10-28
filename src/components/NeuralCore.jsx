import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PhotographicRecall from './PhotographicRecall'
import AutosaveLogs from './AutosaveLogs'
import StatsPanel from './StatsPanel'

const STORAGE_KEY = 'mellow_neural_core_sessions'

export default function NeuralCore({ mode }) {
  const [booting, setBooting] = useState(true)
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

    // Boot animation
    const timer = setTimeout(() => {
      setBooting(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="h-full flex flex-col gap-6"
          >
            {/* Top panels - Recall and Logs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
              {/* Left: Photographic Recall */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="relative p-6 rounded-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <motion.div
                  className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20"
                  style={{
                    background: 'radial-gradient(circle, #5C4B8A, transparent)'
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
                <div className="relative z-10 h-full">
                  <PhotographicRecall onSessionComplete={addSession} />
                </div>
              </motion.div>

              {/* Right: Autosave Logs */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="relative p-6 rounded-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <motion.div
                  className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-20"
                  style={{
                    background: 'radial-gradient(circle, #00B894, transparent)'
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1
                  }}
                />
                <div className="relative z-10 h-full">
                  <AutosaveLogs sessions={sessions} onAddSession={addSession} />
                </div>
              </motion.div>
            </div>

            {/* Bottom: Stats Panel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <StatsPanel sessions={sessions} />
            </motion.div>
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
