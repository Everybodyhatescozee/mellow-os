import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ModeSelector({ currentMode, onSelectMode, isOpen, onClose }) {
  const modes = [
    {
      id: 'flow',
      name: 'FLOW',
      icon: '☯',
      description: 'Neural network visualization',
      color: 'text-mellowGreen',
      bgColor: 'bg-mellowGreen/10',
      borderColor: 'border-mellowGreen/30',
      hoverBg: 'hover:bg-mellowGreen/20'
    },
    {
      id: 'focus',
      name: 'FOCUS',
      icon: '◈',
      description: 'Portfolio & projects interface',
      color: 'text-gray-300',
      bgColor: 'bg-gray-800/10',
      borderColor: 'border-gray-600/30',
      hoverBg: 'hover:bg-gray-800/20'
    },
    {
      id: 'freeze',
      name: 'FREEZE',
      icon: '❄',
      description: 'Neural Core cognitive tools',
      color: 'text-mellowPurple',
      bgColor: 'bg-mellowPurple/10',
      borderColor: 'border-mellowPurple/30',
      hoverBg: 'hover:bg-mellowPurple/20'
    },
    {
      id: 'float',
      name: 'FLOAT',
      icon: '🌬',
      description: 'Guided breathing & flow state',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-400/10',
      borderColor: 'border-cyan-400/30',
      hoverBg: 'hover:bg-cyan-400/20'
    }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Mode Selector Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative max-w-4xl w-full">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center mb-6 md:mb-8"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-mellowOff mb-1 md:mb-2">
                  Select Mode
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 font-mono">
                  Choose your operating mode
                </p>
              </motion.div>

              {/* Mode Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                {modes.map((mode, index) => (
                  <motion.button
                    key={mode.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    onClick={() => onSelectMode(mode.id)}
                    className={`relative p-4 md:p-5 lg:p-6 rounded-xl md:rounded-2xl border ${mode.borderColor} ${mode.bgColor} ${mode.hoverBg} transition-all group ${
                      currentMode === mode.id ? 'ring-2 ring-offset-2 ring-offset-mellowBlack' : ''
                    }`}
                    style={{
                      backdropFilter: 'blur(10px)'
                    }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Active indicator */}
                    {currentMode === mode.id && (
                      <motion.div
                        layoutId="activeMode"
                        className={`absolute -top-2 -right-2 w-5 h-5 md:w-6 md:h-6 rounded-full ${mode.bgColor} border-2 ${mode.borderColor} flex items-center justify-center`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <span className="text-[10px] md:text-xs">✓</span>
                      </motion.div>
                    )}

                    {/* Icon */}
                    <motion.div
                      className="text-3xl sm:text-4xl md:text-5xl mb-2 md:mb-4"
                      animate={{
                        rotate: currentMode === mode.id ? 360 : 0
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      {mode.icon}
                    </motion.div>

                    {/* Name */}
                    <h3 className={`text-base sm:text-lg md:text-xl font-heading font-bold mb-1 md:mb-2 ${mode.color}`}>
                      {mode.name}
                    </h3>

                    {/* Description */}
                    <p className="text-[10px] sm:text-xs text-gray-400 font-mono line-clamp-2">
                      {mode.description}
                    </p>

                    {/* Glow effect on hover */}
                    <motion.div
                      className={`absolute inset-0 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity`}
                      style={{
                        boxShadow: mode.id === 'flow' 
                          ? '0 0 30px rgba(0,184,148,0.3)' 
                          : mode.id === 'freeze'
                          ? '0 0 30px rgba(92,75,138,0.3)'
                          : mode.id === 'float'
                          ? '0 0 30px rgba(34,211,238,0.3)'
                          : '0 0 30px rgba(100,100,100,0.2)'
                      }}
                    />
                  </motion.button>
                ))}
              </div>

              {/* Close button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={onClose}
                className="w-full px-4 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-gray-800/30 border border-gray-700/30 text-gray-400 font-mono text-xs md:text-sm hover:bg-gray-800/50 hover:text-mellowOff transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
