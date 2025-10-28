import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BREATHING_FRAMEWORKS = {
  box: {
    name: 'Box Breathing',
    description: 'Equal phases for balance and focus',
    icon: '⬜',
    color: '#60a5fa', // blue
    pattern: [
      { phase: 'Inhale', duration: 4 },
      { phase: 'Hold', duration: 4 },
      { phase: 'Exhale', duration: 4 },
      { phase: 'Hold', duration: 4 }
    ]
  },
  fourSevenEight: {
    name: '4-7-8 Breathing',
    description: 'Deep relaxation and stress relief',
    icon: '🌙',
    color: '#a855f7', // purple
    pattern: [
      { phase: 'Inhale', duration: 4 },
      { phase: 'Hold', duration: 7 },
      { phase: 'Exhale', duration: 8 },
      { phase: 'Rest', duration: 0 }
    ]
  },
  focusPulse: {
    name: 'Focus Pulse',
    description: 'Extended breathing for deep concentration',
    icon: '⚡',
    color: '#22d3ee', // cyan
    pattern: [
      { phase: 'Inhale', duration: 6 },
      { phase: 'Hold', duration: 2 },
      { phase: 'Exhale', duration: 6 },
      { phase: 'Hold', duration: 2 }
    ]
  },
  custom: {
    name: 'Custom Mode',
    description: 'Define your own rhythm',
    icon: '⚙️',
    color: '#10b981', // green
    pattern: [
      { phase: 'Inhale', duration: 4 },
      { phase: 'Hold', duration: 4 },
      { phase: 'Exhale', duration: 4 },
      { phase: 'Hold', duration: 4 }
    ]
  }
}

export default function FloatBreather() {
  const [selectedFramework, setSelectedFramework] = useState(null)
  const [isActive, setIsActive] = useState(false)
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [customPattern, setCustomPattern] = useState(BREATHING_FRAMEWORKS.custom.pattern)
  const [isEditingCustom, setIsEditingCustom] = useState(false)
  const timerRef = useRef(null)
  const particlesRef = useRef([])

  // Generate floating particles
  useEffect(() => {
    particlesRef.current = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5
    }))
  }, [])

  // Breathing cycle logic
  useEffect(() => {
    if (!isActive || !selectedFramework) return

    const pattern = selectedFramework === 'custom' 
      ? customPattern 
      : BREATHING_FRAMEWORKS[selectedFramework].pattern

    const currentPhase = pattern[currentPhaseIndex]
    
    if (currentPhase.duration === 0) {
      // Skip phases with 0 duration
      setCurrentPhaseIndex((currentPhaseIndex + 1) % pattern.length)
      return
    }

    setTimeRemaining(currentPhase.duration)

    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setCurrentPhaseIndex((currentPhaseIndex + 1) % pattern.length)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isActive, selectedFramework, currentPhaseIndex, customPattern])

  const handleStart = (framework) => {
    setSelectedFramework(framework)
    setCurrentPhaseIndex(0)
    setIsActive(true)
    setIsEditingCustom(false)
  }

  const handleStop = () => {
    setIsActive(false)
    if (timerRef.current) clearInterval(timerRef.current)
  }

  const handleReset = () => {
    handleStop()
    setSelectedFramework(null)
    setCurrentPhaseIndex(0)
  }

  const updateCustomDuration = (phaseIndex, newDuration) => {
    const newPattern = [...customPattern]
    newPattern[phaseIndex].duration = Math.max(0, Math.min(20, newDuration))
    setCustomPattern(newPattern)
  }

  const getCurrentPhase = () => {
    if (!selectedFramework) return null
    const pattern = selectedFramework === 'custom' 
      ? customPattern 
      : BREATHING_FRAMEWORKS[selectedFramework].pattern
    return pattern[currentPhaseIndex]
  }

  const getFrameworkColor = () => {
    if (!selectedFramework) return '#60a5fa'
    return BREATHING_FRAMEWORKS[selectedFramework].color
  }

  const getCircleScale = () => {
    const phase = getCurrentPhase()
    if (!phase) return 1
    
    if (phase.phase === 'Inhale') return 1.8
    if (phase.phase === 'Hold') return 1.8
    if (phase.phase === 'Exhale') return 0.6
    return 0.6
  }

  // Framework selection view
  if (!selectedFramework) {
    return (
      <div className="h-full flex flex-col items-center justify-center relative overflow-hidden">
        {/* Floating particles background */}
        {particlesRef.current.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white/10"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center mb-8 md:mb-12 px-4"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold text-mellowOff mb-2 md:mb-3">
            Float Mode
          </h1>
          <p className="text-xs sm:text-sm font-mono text-gray-500">
            Guided breathing for focus, calm, and creativity
          </p>
        </motion.div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-4xl w-full px-4 md:px-6">
          {Object.entries(BREATHING_FRAMEWORKS).map(([key, framework], index) => (
            <motion.button
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (key === 'custom') {
                  setIsEditingCustom(true)
                  setSelectedFramework(key)
                } else {
                  handleStart(key)
                }
              }}
              className="relative p-4 sm:p-5 md:p-6 rounded-xl md:rounded-2xl text-left overflow-hidden group"
              style={{
                background: `linear-gradient(135deg, ${framework.color}15, ${framework.color}05)`,
                border: `1px solid ${framework.color}40`
              }}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `radial-gradient(circle at center, ${framework.color}30, transparent)`,
                  filter: 'blur(20px)'
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                  <span className="text-2xl md:text-3xl">{framework.icon}</span>
                  <div>
                    <h3 className="text-base md:text-lg font-mono font-bold text-mellowOff">
                      {framework.name}
                    </h3>
                    <p className="text-xs font-mono text-gray-500 hidden sm:block">
                      {framework.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2 text-xs font-mono" style={{ color: framework.color }}>
                  {framework.pattern
                    .filter(p => p.duration > 0)
                    .map((p, i) => (
                      <React.Fragment key={i}>
                        <span>{p.duration}s</span>
                        {i < framework.pattern.filter(p => p.duration > 0).length - 1 && (
                          <span className="text-gray-600">–</span>
                        )}
                      </React.Fragment>
                    ))}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Custom mode editor */}
        <AnimatePresence>
          {isEditingCustom && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
              onClick={() => {
                setIsEditingCustom(false)
                setSelectedFramework(null)
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative p-6 md:p-8 rounded-xl md:rounded-2xl max-w-md w-full mx-4"
                style={{
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))',
                  border: '1px solid rgba(16,185,129,0.4)'
                }}
              >
                <h3 className="text-xl md:text-2xl font-mono font-bold text-mellowOff mb-4 md:mb-6">
                  Custom Breathing Pattern
                </h3>

                <div className="space-y-3 md:space-y-4">
                  {customPattern.map((phase, index) => (
                    <div key={index}>
                      <label className="text-xs font-mono text-gray-500 mb-1.5 md:mb-2 block">
                        {phase.phase} Duration (seconds)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={phase.duration}
                        onChange={(e) => updateCustomDuration(index, parseInt(e.target.value) || 0)}
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-black/30 border border-green-400/30 text-mellowOff font-mono text-sm focus:outline-none focus:border-green-400/60 transition-colors"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 md:gap-3 mt-6 md:mt-8">
                  <button
                    onClick={() => {
                      setIsEditingCustom(false)
                      setSelectedFramework(null)
                    }}
                    className="flex-1 px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl font-mono text-xs md:text-sm font-semibold bg-gray-800/50 text-gray-400 hover:bg-gray-800/70 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleStart('custom')}
                    className="flex-1 px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl font-mono text-xs md:text-sm font-semibold bg-green-400/20 text-green-400 border border-green-400/50 hover:bg-green-400/30 transition-colors"
                  >
                    Start Custom
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  // Active breathing view
  const currentPhase = getCurrentPhase()
  const frameworkColor = getFrameworkColor()

  return (
    <div className="h-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            `radial-gradient(circle at 20% 30%, ${frameworkColor}20, transparent 50%)`,
            `radial-gradient(circle at 80% 70%, ${frameworkColor}20, transparent 50%)`,
            `radial-gradient(circle at 20% 30%, ${frameworkColor}20, transparent 50%)`
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Floating particles */}
      {particlesRef.current.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: `${frameworkColor}40`
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}

      {/* Main breathing circle */}
      <div className="relative z-10 flex flex-col items-center px-4">
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            scale: getCircleScale()
          }}
          transition={{
            duration: currentPhase?.duration || 4,
            ease: 'easeInOut'
          }}
        >
          {/* Outer ring */}
          <motion.div
            className="absolute rounded-full border-2"
            style={{
              width: 'min(300px, 80vw)',
              height: 'min(300px, 80vw)',
              borderColor: frameworkColor,
              opacity: 0.2
            }}
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear'
            }}
          />

          {/* Middle ring */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 'min(250px, 66vw)',
              height: 'min(250px, 66vw)',
              background: `radial-gradient(circle, ${frameworkColor}30, transparent 70%)`,
              filter: 'blur(20px)'
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: currentPhase?.duration || 4,
              ease: 'easeInOut',
              repeat: Infinity
            }}
          />

          {/* Center circle */}
          <motion.div
            className="relative rounded-full flex items-center justify-center"
            style={{
              width: 'min(200px, 53vw)',
              height: 'min(200px, 53vw)',
              background: `radial-gradient(circle, ${frameworkColor}40, ${frameworkColor}10)`,
              border: `2px solid ${frameworkColor}60`
            }}
          >
            <div className="text-center">
              <motion.div
                key={currentPhase?.phase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold mb-1 md:mb-2"
                style={{ color: frameworkColor }}
              >
                {currentPhase?.phase}
              </motion.div>
              <motion.div
                className="text-4xl sm:text-5xl md:text-6xl font-mono font-bold"
                style={{ color: frameworkColor }}
              >
                {timeRemaining}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Framework name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 md:mt-12 text-center"
        >
          <h2 className="text-xl sm:text-2xl font-mono font-bold text-mellowOff mb-1 md:mb-2">
            {BREATHING_FRAMEWORKS[selectedFramework].name}
          </h2>
          <p className="text-xs sm:text-sm font-mono text-gray-500">
            {BREATHING_FRAMEWORKS[selectedFramework].description}
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex gap-3 md:gap-4 mt-6 md:mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={isActive ? handleStop : () => setIsActive(true)}
            className="px-4 sm:px-5 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl font-mono text-xs sm:text-sm font-semibold transition-colors"
            style={{
              background: isActive ? `${frameworkColor}20` : `${frameworkColor}30`,
              color: frameworkColor,
              border: `1px solid ${frameworkColor}60`
            }}
          >
            {isActive ? '⏸ Pause' : '▶ Resume'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="px-4 sm:px-5 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl font-mono text-xs sm:text-sm font-semibold bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-800/70 transition-colors"
          >
            ← Back
          </motion.button>
        </div>
      </div>
    </div>
  )
}
