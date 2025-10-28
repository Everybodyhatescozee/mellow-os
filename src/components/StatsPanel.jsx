import React from 'react'
import { motion } from 'framer-motion'

export default function StatsPanel({ sessions }) {
  const totalSessions = sessions.length
  const recallSessions = sessions.filter(s => s.type === 'Recall').length
  const avgAccuracy = sessions
    .filter(s => s.accuracy)
    .reduce((acc, s) => acc + s.accuracy, 0) / (sessions.filter(s => s.accuracy).length || 1)
  
  const totalMinutes = sessions
    .filter(s => s.duration)
    .reduce((acc, s) => acc + parseInt(s.duration), 0)

  const stats = [
    { label: 'Total Sessions', value: totalSessions, suffix: '' },
    { label: 'Recall Sessions', value: recallSessions, suffix: '' },
    { label: 'Avg Accuracy', value: Math.round(avgAccuracy), suffix: '%' },
    { label: 'Total Time', value: totalMinutes, suffix: 'm' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="relative p-6 rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          background: 'radial-gradient(circle at 20% 50%, #5C4B8A, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <motion.div
            className="w-2 h-2 rounded-full bg-mellowGreen"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />
          <h3 className="text-sm font-mono text-mellowGreen uppercase tracking-wider">
            Neural Core Stats
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
              className="text-center"
            >
              <motion.div
                className="text-2xl md:text-3xl font-bold font-mono text-mellowOff mb-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1, type: 'spring', stiffness: 200 }}
              >
                {stat.value}{stat.suffix}
              </motion.div>
              <div className="text-xs text-gray-500 font-mono uppercase tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Console-style feedback */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-4 p-3 rounded-lg bg-black/30 border border-gray-800"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-mellowGreen text-xs font-mono">$</span>
            <span className="text-xs text-gray-400 font-mono">neural-core --status</span>
          </div>
          <motion.p
            className="text-xs text-mellowGreen/80 font-mono"
            animate={{
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          >
            System online. {totalSessions} session{totalSessions !== 1 ? 's' : ''} logged. Memory core active.
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  )
}
