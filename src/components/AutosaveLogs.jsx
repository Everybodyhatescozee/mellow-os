import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import SessionCard from './SessionCard'

export default function AutosaveLogs({ sessions, onAddSession }) {
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('Journal')
  const [searchTerm, setSearchTerm] = useState('')
  const saveTimeoutRef = useRef(null)
  const textareaRef = useRef(null)

  const categories = ['Recall', 'Journal', 'Idea', 'Study']

  useEffect(() => {
    // Auto-save logic
    if (content.trim()) {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }

      saveTimeoutRef.current = setTimeout(() => {
        handleAutoSave()
      }, 3000) // Auto-save after 3 seconds of inactivity
    }

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [content])

  const handleAutoSave = () => {
    if (!content.trim()) return

    const newSession = {
      type: category,
      content: content,
      timestamp: Date.now()
    }

    onAddSession(newSession)
    setContent('')
  }

  const handleBlur = () => {
    if (content.trim()) {
      handleAutoSave()
    }
  }

  const handleExport = () => {
    const markdown = sessions
      .map(session => {
        const date = new Date(session.timestamp).toLocaleString()
        let md = `## [${session.type}] ${session.topic || 'Entry'}\n`
        md += `**Date:** ${date}\n\n`
        if (session.duration) md += `**Duration:** ${session.duration} minutes\n`
        if (session.accuracy) md += `**Accuracy:** ${session.accuracy}%\n`
        md += `\n${session.content}\n\n---\n\n`
        return md
      })
      .join('\n')

    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `neural-core-logs-${Date.now()}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const filteredSessions = sessions.filter(session =>
    searchTerm === '' ||
    session.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (session.topic && session.topic.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
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
          <h2 className="text-xl font-mono font-bold text-mellowOff">Autosave Logs</h2>
        </div>
        <motion.button
          onClick={handleExport}
          disabled={sessions.length === 0}
          className="px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider border border-mellowGreen/40 text-mellowGreen hover:bg-mellowGreen/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          whileHover={sessions.length > 0 ? { scale: 1.05 } : {}}
          whileTap={sessions.length > 0 ? { scale: 0.95 } : {}}
        >
          Export .md
        </motion.button>
      </div>

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-4 space-y-3"
      >
        <div className="flex gap-2">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setCategory(cat)}
              className="px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-all"
              style={{
                background: category === cat 
                  ? 'linear-gradient(135deg, rgba(92,75,138,0.3), rgba(0,184,148,0.2))' 
                  : 'rgba(255,255,255,0.03)',
                border: `1px solid ${category === cat ? 'rgba(92,75,138,0.5)' : 'rgba(255,255,255,0.1)'}`,
                color: category === cat ? '#F5F5F2' : '#888'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        <div className="relative">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onBlur={handleBlur}
            placeholder={`Start typing your ${category.toLowerCase()} entry... (auto-saves in 3s)`}
            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-800 text-mellowOff font-mono text-sm placeholder-gray-600 focus:border-mellowGreen focus:outline-none transition-colors resize-none"
            rows={4}
          />
          {content.trim() && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-2 right-2 text-xs text-mellowGreen/60 font-mono"
            >
              autosaving...
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mb-4"
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search logs..."
          className="w-full px-4 py-2 rounded-lg bg-black/40 border border-gray-800 text-mellowOff font-mono text-xs placeholder-gray-600 focus:border-mellowPurple focus:outline-none transition-colors"
        />
      </motion.div>

      {/* Logs List */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
        {filteredSessions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-600 font-mono text-sm">
              {searchTerm ? 'No matching logs found' : 'No logs yet. Start typing to create your first entry.'}
            </div>
          </motion.div>
        ) : (
          filteredSessions
            .sort((a, b) => b.timestamp - a.timestamp)
            .map((session, i) => (
              <SessionCard key={session.timestamp} session={session} index={i} />
            ))
        )}
      </div>
    </div>
  )
}
