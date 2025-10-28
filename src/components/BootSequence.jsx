import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function BootSequence({ mode, onFinish }) {
  const getBootConfig = () => {
    switch(mode) {
      case 'flow':
        return {
          title: 'FLOW MODE',
          subtitle: 'Neural Network Interface',
          icon: '☯',
          color: 'text-mellowGreen',
          bgGradient: 'from-mellowPurple/20 to-mellowGreen/20',
          glow: '0 0 60px rgba(0,184,148,0.6)',
          lines: [
            { text: '$ mellow-os --init flow', delay: 0.3 },
            { text: '> mapping neural pathways...', delay: 0.6 },
            { text: '> activating creative cortex...', delay: 0.9 },
            { text: '> synchronizing inspiration nodes...', delay: 1.2 },
            { text: '> establishing flow state...', delay: 1.5 },
            { text: '✓ Flow mode initialized — consciousness streaming', delay: 1.8, success: true }
          ]
        }
      case 'focus':
        return {
          title: 'FOCUS MODE',
          subtitle: 'Portfolio Interface',
          icon: '◈',
          color: 'text-gray-300',
          bgGradient: 'from-gray-800/30 to-gray-600/30',
          glow: '0 0 40px rgba(100,100,100,0.4)',
          lines: [
            { text: '$ mellow-os --init focus', delay: 0.3 },
            { text: '> loading portfolio modules...', delay: 0.6 },
            { text: '> mounting project database...', delay: 0.9 },
            { text: '> initializing contact systems...', delay: 1.2 },
            { text: '> calibrating interface tiles...', delay: 1.5 },
            { text: '✓ Focus mode ready — presenting Percy Mawela', delay: 1.8, success: true }
          ]
        }
      case 'freeze':
        return {
          title: 'FREEZE MODE',
          subtitle: 'Neural Core Interface',
          icon: '❄',
          color: 'text-mellowPurple',
          bgGradient: 'from-mellowPurple/30 to-mellowGreen/20',
          glow: '0 0 50px rgba(92,75,138,0.7)',
          lines: [
            { text: '$ mellow-os --init freeze', delay: 0.3 },
            { text: '> freezing temporal state...', delay: 0.6 },
            { text: '> loading memory systems...', delay: 0.9 },
            { text: '> activating photographic recall...', delay: 1.2 },
            { text: '> mounting autosave journals...', delay: 1.5 },
            { text: '✓ Freeze mode active — Neural Core online', delay: 1.8, success: true }
          ]
        }
      case 'float':
        return {
          title: 'FLOAT MODE',
          subtitle: 'Breathing Interface',
          icon: '🌬',
          color: 'text-cyan-400',
          bgGradient: 'from-cyan-400/30 to-blue-500/20',
          glow: '0 0 60px rgba(34,211,238,0.6)',
          lines: [
            { text: '$ mellow-os --init float', delay: 0.3 },
            { text: '> calibrating breath sensors...', delay: 0.6 },
            { text: '> loading breathing frameworks...', delay: 0.9 },
            { text: '> synchronizing rhythm patterns...', delay: 1.2 },
            { text: '> activating flow state protocols...', delay: 1.5 },
            { text: '✓ Float mode ready — breathe and flow', delay: 1.8, success: true }
          ]
        }
      default:
        return getBootConfig().flow
    }
  }

  const config = getBootConfig()

  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish?.()
    }, 2200)
    return () => clearTimeout(timer)
  }, [onFinish])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-mellowBlack"
    >
      {/* Animated background gradient */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${config.bgGradient}`}
        animate={{
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Radial glow effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: mode === 'flow'
            ? 'radial-gradient(circle at 50% 50%, rgba(0,184,148,0.15), transparent)'
            : mode === 'freeze'
            ? 'radial-gradient(circle at 50% 50%, rgba(92,75,138,0.2), transparent)'
            : mode === 'float'
            ? 'radial-gradient(circle at 50% 50%, rgba(34,211,238,0.2), transparent)'
            : 'radial-gradient(circle at 50% 50%, rgba(100,100,100,0.1), transparent)'
        }}
        animate={{
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <div className="relative z-10 text-center max-w-2xl px-8">
        {/* Mode Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="text-7xl mb-6"
        >
          {config.icon}
        </motion.div>

        {/* Title */}
        <motion.h1
          className={`text-5xl md:text-7xl font-heading font-bold tracking-tight mb-2 ${config.color}`}
          style={{
            textShadow: config.glow
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          {config.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-sm text-gray-400 font-mono mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {config.subtitle}
        </motion.p>

        {/* Boot lines */}
        <div className="space-y-2 text-left max-w-lg mx-auto">
          {config.lines.map((line, index) => (
            <BootLine
              key={index}
              text={line.text}
              delay={line.delay}
              success={line.success}
              color={config.color}
            />
          ))}
        </div>

        {/* Progress bar */}
        <motion.div
          className="mt-8 h-1 bg-gray-800 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className={`h-full bg-gradient-to-r ${config.bgGradient.replace('from-', 'from-').replace('to-', 'to-')}`}
            style={{
              boxShadow: mode === 'flow' 
                ? '0 0 10px rgba(0,184,148,0.5)' 
                : mode === 'freeze'
                ? '0 0 10px rgba(92,75,138,0.5)'
                : '0 0 10px rgba(100,100,100,0.3)'
            }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: 2,
              ease: 'easeInOut'
            }}
          />
        </motion.div>

        {/* Loading indicator */}
        <motion.div
          className="mt-6 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 rounded-full ${
                mode === 'flow' ? 'bg-mellowGreen' : 
                mode === 'freeze' ? 'bg-mellowPurple' : 
                'bg-gray-400'
              }`}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

function BootLine({ text, delay, success, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={`text-xs md:text-sm font-mono tracking-wide ${
        success ? color : 'text-gray-500'
      }`}
    >
      {text}
    </motion.div>
  )
}
