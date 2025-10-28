import React from 'react'
import { motion } from 'framer-motion'

export default function SessionCard({ session, index }) {
  const typeColors = {
    Recall: 'mellowPurple',
    Journal: 'mellowGreen',
    Idea: '#FFB347',
    Study: '#6C9BD1'
  }

  const bgColor = typeColors[session.type] || 'mellowPurple'

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="relative p-4 rounded-lg mb-3 overflow-hidden group cursor-pointer"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
      whileHover={{
        scale: 1.02,
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderColor: 'rgba(255,255,255,0.15)'
      }}
    >
      {/* Glow effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at top left, ${bgColor}, transparent)`
        }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span 
              className="text-xs px-2 py-1 rounded font-mono font-semibold"
              style={{
                backgroundColor: `${bgColor}20`,
                color: bgColor === 'mellowPurple' ? '#5C4B8A' : bgColor === 'mellowGreen' ? '#00B894' : bgColor
              }}
            >
              {session.type}
            </span>
            {session.duration && (
              <span className="text-xs text-gray-500 font-mono">
                {session.duration}min
              </span>
            )}
          </div>
          <span className="text-xs text-gray-500 font-mono">
            {new Date(session.timestamp).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>

        {session.topic && (
          <h4 className="text-sm font-semibold text-mellowOff mb-1 font-mono">
            {session.topic}
          </h4>
        )}

        <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
          {session.content}
        </p>

        {session.accuracy && (
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${session.accuracy}%` }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="h-full"
                style={{
                  background: session.accuracy >= 70 
                    ? '#00B894' 
                    : session.accuracy >= 40 
                      ? '#FFB347' 
                      : '#E17055'
                }}
              />
            </div>
            <span className="text-xs text-gray-500 font-mono">{session.accuracy}%</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
