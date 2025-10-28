import React from 'react'
import { motion } from 'framer-motion'

export default function SessionCard({ session, index }) {
  const getTypeStyles = () => {
    if (session.type === 'Focus') {
      return {
        color: '#22d3ee', // cyan-400
        bg: 'rgba(34, 211, 238, 0.1)',
        border: 'rgba(34, 211, 238, 0.3)',
        emoji: '🎯'
      }
    }
    
    // Journal tags
    const tagStyles = {
      idea: { color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.1)', border: 'rgba(251, 191, 36, 0.3)', emoji: '💡' },
      memory: { color: '#a855f7', bg: 'rgba(168, 85, 247, 0.1)', border: 'rgba(168, 85, 247, 0.3)', emoji: '🧠' },
      breakthrough: { color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 0.3)', emoji: '⚡' },
      note: { color: '#60a5fa', bg: 'rgba(96, 165, 250, 0.1)', border: 'rgba(96, 165, 250, 0.3)', emoji: '📝' }
    }
    
    return tagStyles[session.tag] || tagStyles.note
  }

  const styles = getTypeStyles()

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      className="p-4 rounded-xl bg-black/30 border hover:border-gray-700 transition-all cursor-pointer"
      style={{
        borderColor: styles.border
      }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          boxShadow: `0 0 30px ${styles.color}40`
        }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">{styles.emoji}</span>
            <span 
              className="text-xs font-mono font-bold"
              style={{ color: styles.color }}
            >
              {session.type === 'Focus' ? 'FOCUS' : session.tagLabel?.toUpperCase() || session.tag?.toUpperCase() || 'JOURNAL'}
            </span>
            {session.emotion && (
              <span className="text-sm" title={session.emotion.label}>
                {session.emotion.emoji}
              </span>
            )}
          </div>
          <span className="text-xs text-gray-600 font-mono">
            {formatDate(session.timestamp)}
          </span>
        </div>

        {session.mode && (
          <div className="text-xs font-mono text-gray-500 mb-1">
            {session.mode}
          </div>
        )}

        {session.goal && (
          <h4 className="text-sm font-mono text-mellowOff mb-2">
            {session.goal}
          </h4>
        )}

        {session.topic && (
          <h4 className="text-sm font-mono text-mellowOff mb-2">
            {session.topic}
          </h4>
        )}

        {session.focusLink && (
          <div className="text-xs font-mono mb-2 flex items-center gap-1" style={{ color: styles.color, opacity: 0.6 }}>
            <span>🔗</span>
            <span className="line-clamp-1">{session.focusLink}</span>
          </div>
        )}

        {(session.content || session.recall) && (
          <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 font-mono">
            {session.content || session.recall}
          </p>
        )}

        {session.duration && (
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-gray-600 font-mono">
              ⏱ {session.duration}m
            </span>
            {session.accuracy !== undefined && (
              <div className="flex-1 max-w-[100px]">
                <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${session.accuracy}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full"
                    style={{
                      background: session.accuracy >= 70 ? '#10b981' :
                                 session.accuracy >= 40 ? '#f59e0b' : '#ef4444'
                    }}
                  />
                </div>
                <span className="text-xs text-gray-600 font-mono mt-0.5">
                  {session.accuracy}%
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}
