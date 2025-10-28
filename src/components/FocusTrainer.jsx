import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SESSION_MODES = [
  { id: 'micro', name: 'Micro-Focus', duration: 5, description: '5 min burst' },
  { id: 'deep', name: 'Deep Dive', duration: 20, description: '20 min flow' },
  { id: 'custom', name: 'Flow Mode', duration: 25, description: 'Custom time' }
]

const EMOTIONS = [
  { emoji: '🎯', label: 'Focused' },
  { emoji: '✨', label: 'Inspired' },
  { emoji: '🌊', label: 'Flowing' },
  { emoji: '⚡', label: 'Energized' },
  { emoji: '🧘', label: 'Calm' },
  { emoji: '💡', label: 'Insightful' }
]

export default function FocusTrainer({ onSessionComplete }) {
  const [phase, setPhase] = useState('setup') // setup, active, recall
  const [selectedMode, setSelectedMode] = useState(SESSION_MODES[0])
  const [customDuration, setCustomDuration] = useState(25)
  const [goal, setGoal] = useState('')
  const [timeLeft, setTimeLeft] = useState(0)
  const [recallText, setRecallText] = useState('')
  const [selectedEmotion, setSelectedEmotion] = useState(null)
  const timerRef = useRef(null)

  useEffect(() => {
    if (phase === 'active' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current)
            setPhase('recall')
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [phase, timeLeft])

  const startSession = () => {
    if (!goal.trim()) return
    
    const duration = selectedMode.id === 'custom' ? customDuration : selectedMode.duration
    setTimeLeft(duration * 60)
    setPhase('active')
  }

  const endSession = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    setPhase('recall')
  }

  const completeSession = () => {
    const duration = selectedMode.id === 'custom' ? customDuration : selectedMode.duration
    const session = {
      type: 'Focus',
      mode: selectedMode.name,
      goal,
      duration,
      recall: recallText,
      emotion: selectedEmotion,
      timestamp: new Date().toISOString(),
      accuracy: calculateAccuracy(recallText)
    }
    
    onSessionComplete(session)
    
    // Reset
    setPhase('setup')
    setGoal('')
    setRecallText('')
    setSelectedEmotion(null)
  }

  const calculateAccuracy = (text) => {
    // Simple heuristic: longer, more detailed recalls = higher accuracy
    const wordCount = text.trim().split(/\s+/).length
    if (wordCount < 10) return 30
    if (wordCount < 30) return 50
    if (wordCount < 60) return 70
    if (wordCount < 100) return 85
    return 95
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = selectedMode.id === 'custom' 
    ? ((customDuration * 60 - timeLeft) / (customDuration * 60)) * 100
    : ((selectedMode.duration * 60 - timeLeft) / (selectedMode.duration * 60)) * 100

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <AnimatePresence mode="wait">
        {phase === 'setup' && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <h3 className="text-base md:text-lg font-mono font-bold text-mellowOff">Focus Trainer</h3>
            </div>

            {/* Session Mode Selection */}
            <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4 md:mb-6">
              {SESSION_MODES.map(mode => (
                <motion.button
                  key={mode.id}
                  onClick={() => setSelectedMode(mode)}
                  className={`p-2.5 md:p-4 rounded-lg md:rounded-xl border transition-all touch-manipulation ${
                    selectedMode.id === mode.id
                      ? 'bg-cyan-400/10 border-cyan-400/40'
                      : 'bg-black/20 border-gray-800 hover:border-gray-700'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-xs md:text-sm font-mono font-bold text-mellowOff mb-0.5 md:mb-1">
                    {mode.name}
                  </div>
                  <div className="text-[10px] md:text-xs text-gray-500">{mode.description}</div>
                </motion.button>
              ))}
            </div>

            {/* Custom Duration Slider */}
            {selectedMode.id === 'custom' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 md:mb-6"
              >
                <label className="text-xs font-mono text-gray-400 mb-2 block">
                  Custom Duration: {customDuration} minutes
                </label>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="5"
                  value={customDuration}
                  onChange={(e) => setCustomDuration(parseInt(e.target.value))}
                  className="w-full touch-manipulation"
                />
              </motion.div>
            )}

            {/* Focus Goal Input */}
            <div className="mb-4 md:mb-6">
              <label className="text-xs font-mono text-gray-400 mb-2 block">
                What's your focus goal?
              </label>
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g., Study React hooks..."
                className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg bg-black/40 border border-gray-800 text-mellowOff font-mono text-sm placeholder-gray-600 focus:border-cyan-400 focus:outline-none transition-colors touch-manipulation"
              />
            </div>

            {/* Start Button */}
            <motion.button
              onClick={startSession}
              disabled={!goal.trim()}
              className={`w-full py-3 md:py-4 rounded-lg md:rounded-xl font-mono text-sm font-bold transition-all touch-manipulation ${
                goal.trim()
                  ? 'bg-gradient-to-r from-cyan-400 to-green-400 text-mellowBlack hover:shadow-lg hover:shadow-cyan-400/30'
                  : 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
              }`}
              whileHover={goal.trim() ? { scale: 1.02 } : {}}
              whileTap={goal.trim() ? { scale: 0.98 } : {}}
            >
              {goal.trim() ? 'Begin Focus Session →' : 'Enter a goal to start'}
            </motion.button>
          </motion.div>
        )}

        {phase === 'active' && (
          <motion.div
            key="active"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 flex flex-col items-center justify-center relative px-4"
          >
            {/* Breathing Background */}
            <motion.div
              className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-cyan-400/5 to-green-400/5"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [0.98, 1.02, 0.98]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />

            {/* Timer Display */}
            <motion.div
              className="relative z-10 text-center"
              animate={{
                scale: [1, 1.02, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-mono font-bold text-cyan-400 mb-3 md:mb-4">
                {formatTime(timeLeft)}
              </div>
              
              {/* Progress Ring */}
              <svg className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto mb-4 md:mb-6" viewBox="0 0 120 120">
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
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="339.29"
                  strokeDashoffset={339.29 - (339.29 * progress) / 100}
                  transform="rotate(-90 60 60)"
                  initial={{ strokeDashoffset: 339.29 }}
                  animate={{ strokeDashoffset: 339.29 - (339.29 * progress) / 100 }}
                  transition={{ duration: 0.5 }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="text-xs md:text-sm font-mono text-gray-400 mb-1 md:mb-2">Focusing on:</div>
              <div className="text-sm md:text-base lg:text-lg font-mono text-mellowOff mb-6 md:mb-8 line-clamp-2">{goal}</div>
            </motion.div>

            {/* End Session Button */}
            <motion.button
              onClick={endSession}
              className="absolute bottom-4 px-6 py-2 rounded-lg bg-black/40 border border-gray-800 text-gray-400 font-mono text-xs hover:border-gray-700 hover:text-mellowOff transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              End Session Early
            </motion.button>
          </motion.div>
        )}

        {phase === 'recall' && (
          <motion.div
            key="recall"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <h3 className="text-lg font-mono font-bold text-mellowOff">Recall & Reflect</h3>
            </div>

            <div className="text-sm font-mono text-gray-400 mb-4">
              Session complete! What did you accomplish, learn, or create?
            </div>

            {/* Emotion Selector */}
            <div className="mb-4">
              <label className="text-xs font-mono text-gray-400 mb-2 block">
                How did the session feel?
              </label>
              <div className="flex gap-2 flex-wrap">
                {EMOTIONS.map(emotion => (
                  <motion.button
                    key={emotion.label}
                    onClick={() => setSelectedEmotion(emotion)}
                    className={`px-3 py-2 rounded-lg border transition-all ${
                      selectedEmotion?.label === emotion.label
                        ? 'bg-green-400/10 border-green-400/40'
                        : 'bg-black/20 border-gray-800 hover:border-gray-700'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-lg mr-1">{emotion.emoji}</span>
                    <span className="text-xs font-mono text-gray-400">{emotion.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Recall Text Area */}
            <textarea
              value={recallText}
              onChange={(e) => setRecallText(e.target.value)}
              placeholder="Describe what you accomplished..."
              className="flex-1 min-h-[120px] px-3 md:px-4 py-2.5 md:py-3 rounded-lg bg-black/40 border border-gray-800 text-mellowOff font-mono text-sm placeholder-gray-600 focus:border-green-400 focus:outline-none transition-colors resize-none mb-3 md:mb-4 touch-manipulation"
            />

            {/* Complete Button */}
            <motion.button
              onClick={completeSession}
              className="w-full py-3 md:py-4 rounded-lg md:rounded-xl font-mono text-sm font-bold bg-gradient-to-r from-green-400 to-cyan-400 text-mellowBlack hover:shadow-lg hover:shadow-green-400/30 transition-all touch-manipulation"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Save Session →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
