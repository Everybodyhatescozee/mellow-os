import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SessionCard from './SessionCard'

const TAGS = [
  { id: 'idea', label: 'Idea', color: 'from-yellow-400 to-orange-400', icon: '💡' },
  { id: 'memory', label: 'Memory', color: 'from-purple-400 to-pink-400', icon: '🧠' },
  { id: 'breakthrough', label: 'Breakthrough', color: 'from-green-400 to-cyan-400', icon: '⚡' },
  { id: 'note', label: 'Note', color: 'from-blue-400 to-indigo-400', icon: '📝' }
]

export default function AutosaveJournal({ sessions, onAddSession }) {
  const [content, setContent] = useState('')
  const [selectedTag, setSelectedTag] = useState(TAGS[3]) // Default to 'note'
  const [zenMode, setZenMode] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [focusLink, setFocusLink] = useState(null)
  const saveTimeoutRef = useRef(null)
  const textareaRef = useRef(null)

  // Auto-save functionality
  useEffect(() => {
    if (content.trim()) {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }

      saveTimeoutRef.current = setTimeout(() => {
        saveEntry()
      }, 3000)
    }

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [content])

  const saveEntry = () => {
    if (!content.trim()) return

    const entry = {
      type: 'Journal',
      tag: selectedTag.id,
      tagLabel: selectedTag.label,
      content: content.trim(),
      focusLink: focusLink,
      timestamp: new Date().toISOString()
    }

    onAddSession(entry)
    setLastSaved(new Date())
    setContent('')
    setFocusLink(null)
  }

  const handleManualSave = () => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }
    saveEntry()
  }

  const exportToMarkdown = () => {
    const markdown = sessions
      .filter(s => s.type === 'Journal')
      .map(s => {
        const date = new Date(s.timestamp).toLocaleString()
        return `## ${s.tagLabel || s.tag} - ${date}\n\n${s.content}\n\n---\n`
      })
      .join('\n')

    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `neural-journal-${Date.now()}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  const filteredSessions = sessions.filter(s => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      s.content?.toLowerCase().includes(query) ||
      s.goal?.toLowerCase().includes(query) ||
      s.tag?.toLowerCase().includes(query) ||
      s.tagLabel?.toLowerCase().includes(query)
    )
  })

  const recentFocusSessions = sessions.filter(s => s.type === 'Focus').slice(0, 5)

  return (
    <div className="h-full flex flex-col">
      {!zenMode ? (
        <>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <h3 className="text-lg font-mono font-bold text-mellowOff">Autosave Journal</h3>
            </div>
            
            <div className="flex gap-2">
              <motion.button
                onClick={() => setZenMode(true)}
                className="px-3 py-1.5 rounded-lg bg-black/40 border border-gray-800 text-gray-400 font-mono text-xs hover:border-gray-700 hover:text-mellowOff transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Zen Mode"
              >
                🧘 Zen
              </motion.button>
              
              {sessions.length > 0 && (
                <motion.button
                  onClick={exportToMarkdown}
                  className="px-3 py-1.5 rounded-lg bg-black/40 border border-gray-800 text-gray-400 font-mono text-xs hover:border-gray-700 hover:text-mellowOff transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Export to Markdown"
                >
                  ↓ Export
                </motion.button>
              )}
            </div>
          </div>

          {/* Tag Selector */}
          <div className="flex gap-2 mb-4">
            {TAGS.map(tag => (
              <motion.button
                key={tag.id}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-2 rounded-lg border transition-all ${
                  selectedTag.id === tag.id
                    ? `bg-gradient-to-r ${tag.color} bg-opacity-10 border-opacity-40`
                    : 'bg-black/20 border-gray-800 hover:border-gray-700'
                }`}
                style={{
                  borderColor: selectedTag.id === tag.id ? 'rgba(255,255,255,0.3)' : ''
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm mr-1">{tag.icon}</span>
                <span className="text-xs font-mono text-mellowOff">{tag.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Focus Link Selector */}
          {recentFocusSessions.length > 0 && !focusLink && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-4"
            >
              <label className="text-xs font-mono text-gray-400 mb-2 block">
                Link to a focus session (optional)
              </label>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {recentFocusSessions.map((session, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setFocusLink(session.goal)}
                    className="px-3 py-2 rounded-lg bg-black/40 border border-gray-800 hover:border-cyan-400 transition-all whitespace-nowrap"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-xs font-mono text-gray-400">
                      🎯 {session.goal?.substring(0, 30)}...
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {focusLink && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-lg bg-cyan-400/10 border border-cyan-400/30"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400">
                  🔗 Linked to: {focusLink}
                </span>
                <button
                  onClick={() => setFocusLink(null)}
                  className="text-gray-500 hover:text-mellowOff"
                >
                  ×
                </button>
              </div>
            </motion.div>
          )}

          {/* Text Area */}
          <div className="relative mb-4">
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start typing... Auto-saves every 3 seconds. Let your thoughts flow freely."
              className="w-full h-32 px-4 py-3 rounded-lg bg-black/40 border border-gray-800 text-mellowOff font-mono text-sm placeholder-gray-600 focus:border-purple-400 focus:outline-none transition-colors resize-none"
            />
            
            {lastSaved && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-3 right-3 text-xs font-mono text-green-400/60"
              >
                ✓ Saved {new Date(lastSaved).toLocaleTimeString()}
              </motion.div>
            )}
          </div>

          {/* Manual Save Button */}
          {content.trim() && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleManualSave}
              className="w-full py-3 rounded-xl mb-4 font-mono text-sm font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-mellowBlack hover:shadow-lg hover:shadow-purple-400/30 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Save Now
            </motion.button>
          )}

          {/* Search */}
          {sessions.length > 0 && (
            <div className="mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 Search entries..."
                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-gray-800 text-mellowOff font-mono text-xs placeholder-gray-600 focus:border-purple-400 focus:outline-none transition-colors"
              />
            </div>
          )}

          {/* Entries List */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
            {filteredSessions.length > 0 ? (
              filteredSessions.map((session, index) => (
                <SessionCard key={index} session={session} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-600 font-mono text-sm">
                {searchQuery ? 'No matching entries' : 'No entries yet. Start writing...'}
              </div>
            )}
          </div>
        </>
      ) : (
        // Zen Mode
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 flex flex-col bg-mellowBlack/95 -m-6 p-6 rounded-2xl"
        >
          {/* Minimal Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="text-xs font-mono text-gray-600">
              {selectedTag.icon} {selectedTag.label}
            </div>
            <motion.button
              onClick={() => setZenMode(false)}
              className="text-gray-600 hover:text-mellowOff font-mono text-xs transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Exit Zen →
            </motion.button>
          </div>

          {/* Zen Text Area */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Breathe. Think. Write..."
            className="flex-1 w-full px-0 py-0 bg-transparent border-none text-mellowOff font-mono text-base placeholder-gray-700 focus:outline-none resize-none leading-relaxed"
            autoFocus
          />

          {/* Zen Status */}
          {content.trim() && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-xs font-mono text-gray-600 text-center"
            >
              {content.trim().split(/\s+/).length} words • Auto-saving...
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  )
}
