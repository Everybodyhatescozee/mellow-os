import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MinimalIntervalTimer() {
  const [phase, setPhase] = useState('setup') // setup, timing, complete
  const [mode, setMode] = useState('work') // work or break
  const [workDuration, setWorkDuration] = useState(25) // minutes
  const [breakDuration, setBreakDuration] = useState(5) // minutes
  const [rounds, setRounds] = useState(4)
  const [currentRound, setCurrentRound] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [sessionsCompleted, setSessionsCompleted] = useState(0)
  const timerRef = useRef(null)

  // Timer logic
  useEffect(() => {
    if (phase === 'timing' && isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Time's up, switch modes or complete
            handleTimeComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [phase, isRunning, timeLeft])

  const handleTimeComplete = () => {
    if (mode === 'work') {
      // Completed a work session
      setSessionsCompleted(prev => prev + 1)
      
      // Check if we've completed all rounds
      if (currentRound === rounds - 1) {
        setPhase('complete')
        setIsRunning(false)
      } else {
        // Switch to break
        setMode('break')
        setTimeLeft(breakDuration * 60)
      }
    } else {
      // Break complete, switch back to work
      setCurrentRound(prev => prev + 1)
      setMode('work')
      setTimeLeft(workDuration * 60)
    }
  }

  const startSession = () => {
    setCurrentRound(0)
    setSessionsCompleted(0)
    setMode('work')
    setTimeLeft(workDuration * 60)
    setPhase('timing')
    setIsRunning(true)
  }

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const stopSession = () => {
    setIsRunning(false)
    setPhase('setup')
    setSessionsCompleted(0)
  }

  const resetAndRestart = () => {
    setPhase('setup')
    setSessionsCompleted(0)
    setCurrentRound(0)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progressPercent = mode === 'work'
    ? ((workDuration * 60 - timeLeft) / (workDuration * 60)) * 100
    : ((breakDuration * 60 - timeLeft) / (breakDuration * 60)) * 100

  // Setup Phase
  if (phase === 'setup') {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full space-y-6"
        >
          <div className="text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-mono font-bold text-mellowOff mb-2"
              style={{
                textShadow: '0 0 30px rgba(92,75,138,0.4)'
              }}
            >
              FREEZE
            </motion.h1>
            <p className="text-sm text-gray-400 font-mono">Minimal interval timer</p>
          </div>

          {/* Work Duration */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-mono text-gray-300">Focus Duration</label>
              <span className="text-2xl font-mono font-bold text-mellowOff">{workDuration}</span>
            </div>
            <input
              type="range"
              min="1"
              max="60"
              step="1"
              value={workDuration}
              onChange={(e) => setWorkDuration(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, rgb(147,51,234) 0%, rgb(147,51,234) ${(workDuration/60)*100}%, rgb(31,41,55) ${(workDuration/60)*100}%, rgb(31,41,55) 100%)`
              }}
            />
            <div className="text-xs text-gray-500 text-right">minutes</div>
          </div>

          {/* Break Duration */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-mono text-gray-300">Break Duration</label>
              <span className="text-2xl font-mono font-bold text-cyan-400">{breakDuration}</span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="1"
              value={breakDuration}
              onChange={(e) => setBreakDuration(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, rgb(34,211,238) 0%, rgb(34,211,238) ${(breakDuration/15)*100}%, rgb(31,41,55) ${(breakDuration/15)*100}%, rgb(31,41,55) 100%)`
              }}
            />
            <div className="text-xs text-gray-500 text-right">minutes</div>
          </div>

          {/* Rounds */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-mono text-gray-300">Rounds</label>
              <span className="text-2xl font-mono font-bold text-green-400">{rounds}</span>
            </div>
            <input
              type="range"
              min="1"
              max="12"
              step="1"
              value={rounds}
              onChange={(e) => setRounds(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, rgb(16,185,129) 0%, rgb(16,185,129) ${(rounds/12)*100}%, rgb(31,41,55) ${(rounds/12)*100}%, rgb(31,41,55) 100%)`
              }}
            />
            <div className="text-xs text-gray-500 text-right">cycles</div>
          </div>

          {/* Summary */}
          <motion.div
            className="p-4 rounded-lg border border-gray-800 bg-black/40 space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-xs text-gray-500 font-mono">session breakdown</div>
            <div className="space-y-1 text-sm font-mono text-gray-300">
              <div className="flex justify-between">
                <span>Total focus time:</span>
                <span className="text-mellowOff font-bold">{workDuration * rounds}m</span>
              </div>
              <div className="flex justify-between">
                <span>Total break time:</span>
                <span className="text-cyan-400 font-bold">{breakDuration * (rounds - 1)}m</span>
              </div>
              <div className="border-t border-gray-800 pt-1 mt-1 flex justify-between">
                <span>Estimated total:</span>
                <span className="text-green-400 font-bold">
                  {workDuration * rounds + breakDuration * (rounds - 1)}m
                </span>
              </div>
            </div>
          </motion.div>

          {/* Start Button */}
          <motion.button
            onClick={startSession}
            className="w-full py-4 rounded-lg bg-gradient-to-r from-mellowPurple to-mellowGreen text-mellowBlack font-mono font-bold text-lg hover:shadow-lg hover:shadow-mellowPurple/30 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Begin Session
          </motion.button>
        </motion.div>
      </div>
    )
  }

  // Timing Phase
  if (phase === 'timing') {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Background gradient based on mode */}
        <motion.div
          className="absolute inset-0 opacity-30 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            background: mode === 'work'
              ? 'radial-gradient(circle, rgb(147,51,234), transparent)'
              : 'radial-gradient(circle, rgb(34,211,238), transparent)'
          }}
        />

        <motion.div
          className="relative z-10 flex flex-col items-center justify-center space-y-8 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Mode Indicator */}
          <motion.div
            key={mode}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center"
          >
            <div className={`text-xs md:text-sm font-mono font-bold tracking-widest mb-2 ${
              mode === 'work' ? 'text-mellowOff' : 'text-cyan-400'
            }`}>
              {mode === 'work' ? '⚙ FOCUS TIME' : '☕ BREAK TIME'}
            </div>
            <div className={`text-lg md:text-xl font-mono ${
              mode === 'work' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Round {currentRound + 1} of {rounds}
            </div>
          </motion.div>

          {/* Main Timer */}
          <motion.div
            key={`timer-${currentRound}-${mode}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <motion.div
              className={`text-7xl md:text-9xl font-mono font-bold tracking-tighter ${
                mode === 'work' ? 'text-mellowOff' : 'text-cyan-400'
              }`}
              animate={{
                textShadow: mode === 'work'
                  ? ['0 0 20px rgba(147,51,234,0.5)', '0 0 40px rgba(147,51,234,0.3)', '0 0 20px rgba(147,51,234,0.5)']
                  : ['0 0 20px rgba(34,211,238,0.5)', '0 0 40px rgba(34,211,238,0.3)', '0 0 20px rgba(34,211,238,0.5)']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              {formatTime(timeLeft)}
            </motion.div>
          </motion.div>

          {/* Progress Ring */}
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            <svg className="w-full h-full" viewBox="0 0 120 120">
              {/* Background circle */}
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="3"
              />
              {/* Progress circle */}
              <motion.circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke={mode === 'work' ? 'rgb(147,51,234)' : 'rgb(34,211,238)'}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="339.29"
                strokeDashoffset={339.29 - (339.29 * progressPercent) / 100}
                transform="rotate(-90 60 60)"
                animate={{ strokeDashoffset: 339.29 - (339.29 * progressPercent) / 100 }}
                transition={{ duration: 0.5 }}
              />
            </svg>
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-xs font-mono text-gray-500">
                {currentRound + 1}/{rounds}
              </div>
              <div className="text-xs font-mono text-gray-400 mt-1">
                ✓ {sessionsCompleted}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-4 items-center">
            <motion.button
              onClick={toggleTimer}
              className="px-8 py-3 rounded-lg font-mono font-bold text-sm bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isRunning ? '⏸ Pause' : '▶ Resume'}
            </motion.button>
            <motion.button
              onClick={stopSession}
              className="px-8 py-3 rounded-lg font-mono font-bold text-sm bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ✕ Stop
            </motion.button>
          </div>

          {/* Session Info */}
          <motion.div
            className="text-center space-y-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-xs text-gray-500 font-mono">
              Sessions completed: <span className="text-green-400 font-bold">{sessionsCompleted}/{rounds}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  // Complete Phase
  if (phase === 'complete') {
    const totalFocusTime = workDuration * rounds
    const totalBreakTime = breakDuration * (rounds - 1)
    const totalTime = totalFocusTime + totalBreakTime

    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full space-y-6 text-center"
        >
          {/* Completion Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              delay: 0.2
            }}
          >
            <div className="text-6xl mb-4">✨</div>
          </motion.div>

          <div>
            <h2 className="text-4xl font-mono font-bold text-mellowOff mb-2">Session Complete</h2>
            <p className="text-sm text-gray-400 font-mono">You've crushed it!</p>
          </div>

          {/* Stats */}
          <motion.div
            className="p-6 rounded-lg border border-gray-800 bg-black/40 space-y-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="space-y-2 text-sm font-mono text-gray-300">
              <div className="flex justify-between">
                <span>Focus sessions:</span>
                <span className="text-mellowOff">{rounds}</span>
              </div>
              <div className="flex justify-between">
                <span>Focus time:</span>
                <span className="text-mellowOff">{totalFocusTime}m</span>
              </div>
              <div className="flex justify-between">
                <span>Break time:</span>
                <span className="text-cyan-400">{totalBreakTime}m</span>
              </div>
              <div className="border-t border-gray-800 pt-2 flex justify-between">
                <span>Total time:</span>
                <span className="text-green-400 font-bold">{totalTime}m</span>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <motion.button
              onClick={startSession}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-mellowPurple to-mellowGreen text-mellowBlack font-mono font-bold hover:shadow-lg hover:shadow-mellowPurple/30 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Another Session
            </motion.button>
            <motion.button
              onClick={resetAndRestart}
              className="w-full py-3 rounded-lg border border-gray-800 text-gray-400 font-mono font-bold hover:border-gray-700 hover:text-mellowOff transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Adjust Settings
            </motion.button>
          </div>
        </motion.div>
      </div>
    )
  }
}
