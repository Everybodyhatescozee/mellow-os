import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PhotographicRecall({ onSessionComplete }) {
  const [duration, setDuration] = useState(10) // minutes
  const [topic, setTopic] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [phase, setPhase] = useState('setup') // setup, active, recall
  const [recallText, setRecallText] = useState('')
  const [accuracy, setAccuracy] = useState(null)
  const timerRef = useRef(null)

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsActive(false)
            setPhase('recall')
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => clearInterval(timerRef.current)
  }, [isActive, timeLeft])

  const startSession = () => {
    if (!topic.trim()) return
    setTimeLeft(duration * 60)
    setIsActive(true)
    setPhase('active')
  }

  const endSession = () => {
    setIsActive(false)
    setPhase('recall')
    clearInterval(timerRef.current)
  }

  const submitRecall = () => {
    const session = {
      type: 'Recall',
      topic,
      duration,
      content: recallText,
      accuracy: accuracy || 0,
      timestamp: Date.now()
    }
    
    onSessionComplete(session)
    
    // Reset
    setPhase('setup')
    setTopic('')
    setRecallText('')
    setAccuracy(null)
    setTimeLeft(0)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = duration > 0 ? ((duration * 60 - timeLeft) / (duration * 60)) * 100 : 0

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <motion.div
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: phase === 'active' ? '#00B894' : '#5C4B8A'
          }}
          animate={{
            scale: phase === 'active' ? [1, 1.5, 1] : 1,
            opacity: phase === 'active' ? [0.5, 1, 0.5] : 1
          }}
          transition={{
            duration: 1.5,
            repeat: phase === 'active' ? Infinity : 0
          }}
        />
        <h2 className="text-xl font-mono font-bold text-mellowOff">Photographic Recall</h2>
      </div>

      <AnimatePresence mode="wait">
        {phase === 'setup' && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-4 flex-1"
          >
            <div>
              <label className="block text-xs font-mono text-gray-400 mb-2 uppercase tracking-wide">
                Visual/Topic Cue
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., System Design Diagram, Chapter 5 Summary..."
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-800 text-mellowOff font-mono text-sm placeholder-gray-600 focus:border-mellowPurple focus:outline-none transition-colors"
                onKeyPress={(e) => e.key === 'Enter' && startSession()}
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-gray-400 mb-2 uppercase tracking-wide">
                Duration: {duration} minutes
              </label>
              <input
                type="range"
                min="5"
                max="30"
                step="5"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #5C4B8A 0%, #5C4B8A ${((duration - 5) / 25) * 100}%, #1f1f1f ${((duration - 5) / 25) * 100}%, #1f1f1f 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-600 font-mono mt-1">
                <span>5m</span>
                <span>15m</span>
                <span>30m</span>
              </div>
            </div>

            <motion.button
              onClick={startSession}
              disabled={!topic.trim()}
              className="w-full py-3 px-6 rounded-lg font-mono font-semibold text-sm uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: topic.trim() 
                  ? 'linear-gradient(135deg, #5C4B8A, #00B894)' 
                  : 'rgba(255,255,255,0.05)',
                color: topic.trim() ? '#F5F5F2' : '#666'
              }}
              whileHover={topic.trim() ? { scale: 1.02 } : {}}
              whileTap={topic.trim() ? { scale: 0.98 } : {}}
            >
              Start Recall Session
            </motion.button>
          </motion.div>
        )}

        {phase === 'active' && (
          <motion.div
            key="active"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="flex-1 flex flex-col items-center justify-center"
          >
            {/* Breathing animation background */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: 'radial-gradient(circle, rgba(92,75,138,0.2), transparent 70%)',
                filter: 'blur(40px)'
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />

            <div className="relative z-10 text-center">
              <motion.div
                className="mb-4 text-xs font-mono text-mellowPurple uppercase tracking-widest"
                animate={{
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              >
                Focusing on: {topic}
              </motion.div>

              <motion.div
                className="text-7xl md:text-8xl font-mono font-bold text-mellowOff mb-6"
                style={{
                  textShadow: '0 0 40px rgba(92,75,138,0.6)'
                }}
              >
                {formatTime(timeLeft)}
              </motion.div>

              {/* Progress ring */}
              <svg className="w-32 h-32 mx-auto mb-6" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="4"
                />
                <motion.circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="#5C4B8A"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={339.29}
                  strokeDashoffset={339.29 - (339.29 * progress) / 100}
                  transform="rotate(-90 60 60)"
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(92,75,138,0.8))'
                  }}
                />
              </svg>

              <motion.button
                onClick={endSession}
                className="px-8 py-3 rounded-lg font-mono text-sm uppercase tracking-wider border-2 border-mellowPurple/50 text-mellowPurple hover:bg-mellowPurple/20 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                End Session Early
              </motion.button>
            </div>
          </motion.div>
        )}

        {phase === 'recall' && (
          <motion.div
            key="recall"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-4 flex-1 flex flex-col"
          >
            <div className="text-center mb-4">
              <div className="text-xs font-mono text-mellowGreen uppercase tracking-widest mb-2">
                Session Complete
              </div>
              <div className="text-sm text-gray-400 font-mono">
                What do you remember about: <span className="text-mellowOff">{topic}</span>?
              </div>
            </div>

            <textarea
              value={recallText}
              onChange={(e) => setRecallText(e.target.value)}
              placeholder="Write everything you can recall..."
              className="flex-1 px-4 py-3 rounded-lg bg-black/40 border border-gray-800 text-mellowOff font-mono text-sm placeholder-gray-600 focus:border-mellowGreen focus:outline-none transition-colors resize-none"
              rows={8}
            />

            <div>
              <label className="block text-xs font-mono text-gray-400 mb-2 uppercase tracking-wide">
                Self-check accuracy: {accuracy || 0}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="10"
                value={accuracy || 0}
                onChange={(e) => setAccuracy(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #00B894 0%, #00B894 ${accuracy || 0}%, #1f1f1f ${accuracy || 0}%, #1f1f1f 100%)`
                }}
              />
            </div>

            <motion.button
              onClick={submitRecall}
              disabled={!recallText.trim()}
              className="w-full py-3 px-6 rounded-lg font-mono font-semibold text-sm uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: recallText.trim() 
                  ? 'linear-gradient(135deg, #00B894, #5C4B8A)' 
                  : 'rgba(255,255,255,0.05)',
                color: recallText.trim() ? '#F5F5F2' : '#666'
              }}
              whileHover={recallText.trim() ? { scale: 1.02 } : {}}
              whileTap={recallText.trim() ? { scale: 0.98 } : {}}
            >
              Save Recall
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
