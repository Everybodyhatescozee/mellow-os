import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function CognitiveConsole({ sessions }) {
  const [insights, setInsights] = useState([])

  useEffect(() => {
    calculateInsights()
  }, [sessions])

  const calculateInsights = () => {
    const today = new Date().toDateString()
    const todaySessions = sessions.filter(
      s => new Date(s.timestamp).toDateString() === today
    )

    const focusSessions = sessions.filter(s => s.type === 'Focus')
    const todayFocus = todaySessions.filter(s => s.type === 'Focus')
    
    // Calculate streak
    const streak = calculateStreak(focusSessions)
    
    // Emotion analysis
    const emotions = focusSessions
      .filter(s => s.emotion)
      .map(s => s.emotion.label)
    
    const emotionCounts = emotions.reduce((acc, emotion) => {
      acc[emotion] = (acc[emotion] || 0) + 1
      return acc
    }, {})
    
    const topEmotion = Object.keys(emotionCounts).length > 0
      ? Object.entries(emotionCounts).sort((a, b) => b[1] - a[1])[0][0]
      : null

    // Total time focused
    const totalMinutes = focusSessions.reduce((sum, s) => sum + (s.duration || 0), 0)
    const totalHours = Math.floor(totalMinutes / 60)
    const remainingMinutes = totalMinutes % 60

    // Average recall accuracy
    const accuracies = focusSessions
      .filter(s => s.accuracy)
      .map(s => s.accuracy)
    const avgAccuracy = accuracies.length > 0
      ? Math.round(accuracies.reduce((sum, a) => sum + a, 0) / accuracies.length)
      : 0

    // Generate insights
    const newInsights = []

    if (streak >= 3) {
      newInsights.push({
        type: 'success',
        message: `Focus streak: ${streak} days — your neural circuits are warming up.`
      })
    }

    if (todayFocus.length > 0) {
      newInsights.push({
        type: 'info',
        message: `${todayFocus.length} session${todayFocus.length > 1 ? 's' : ''} today. You're building momentum.`
      })
    }

    if (avgAccuracy >= 70) {
      newInsights.push({
        type: 'success',
        message: "System memory stable. You're retaining patterns faster."
      })
    }

    if (topEmotion) {
      newInsights.push({
        type: 'info',
        message: `Dominant state: ${topEmotion}. Your cognitive baseline is adapting.`
      })
    }

    if (totalHours > 0) {
      newInsights.push({
        type: 'metric',
        message: `Total focus time: ${totalHours}h ${remainingMinutes}m. Deep work accumulating.`
      })
    }

    if (newInsights.length === 0) {
      newInsights.push({
        type: 'info',
        message: 'Neural Core initialized. Begin your first focus session to calibrate.'
      })
    }

    setInsights(newInsights)
  }

  const calculateStreak = (focusSessions) => {
    if (focusSessions.length === 0) return 0

    const dates = focusSessions
      .map(s => new Date(s.timestamp).toDateString())
      .filter((v, i, a) => a.indexOf(v) === i) // unique dates
      .sort((a, b) => new Date(b) - new Date(a)) // newest first

    let streak = 0
    let currentDate = new Date()

    for (let date of dates) {
      const sessionDate = new Date(date)
      const diffDays = Math.floor((currentDate - sessionDate) / (1000 * 60 * 60 * 24))

      if (diffDays === streak) {
        streak++
      } else {
        break
      }
    }

    return streak
  }

  const stats = {
    totalSessions: sessions.length,
    focusSessions: sessions.filter(s => s.type === 'Focus').length,
    journalEntries: sessions.filter(s => s.type === 'Journal').length,
    streak: calculateStreak(sessions.filter(s => s.type === 'Focus'))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="relative p-6 rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
        border: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-purple-400/5"
        animate={{
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <motion.div
            className="w-2 h-2 rounded-full bg-green-400"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />
          <div className="text-xs font-mono text-gray-400">$ neural-core --status</div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            label="Sessions"
            value={stats.totalSessions}
            icon="📊"
            delay={0.1}
          />
          <StatCard
            label="Focus"
            value={stats.focusSessions}
            icon="🎯"
            delay={0.2}
          />
          <StatCard
            label="Entries"
            value={stats.journalEntries}
            icon="📝"
            delay={0.3}
          />
          <StatCard
            label="Streak"
            value={`${stats.streak}d`}
            icon="🔥"
            delay={0.4}
            highlight={stats.streak >= 3}
          />
        </div>

        {/* System Insights */}
        <div className="space-y-2">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={`p-3 rounded-lg border ${
                insight.type === 'success'
                  ? 'bg-green-400/5 border-green-400/20'
                  : insight.type === 'metric'
                  ? 'bg-cyan-400/5 border-cyan-400/20'
                  : 'bg-purple-400/5 border-purple-400/20'
              }`}
            >
              <div className="flex items-start gap-2">
                <span className="text-xs mt-0.5">
                  {insight.type === 'success' ? '✓' : insight.type === 'metric' ? '→' : '•'}
                </span>
                <span className={`text-xs font-mono flex-1 ${
                  insight.type === 'success' ? 'text-green-400' :
                  insight.type === 'metric' ? 'text-cyan-400' :
                  'text-gray-400'
                }`}>
                  {insight.message}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-4 pt-4 border-t border-gray-800"
        >
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-gray-600">
              System uptime: {new Date().toLocaleDateString()}
            </span>
            <span className="text-green-400/60">Neural Core v1.0 online</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

function StatCard({ label, value, icon, delay, highlight }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 200 }}
      className={`p-4 rounded-xl border transition-all ${
        highlight
          ? 'bg-orange-400/10 border-orange-400/30'
          : 'bg-black/20 border-gray-800'
      }`}
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{icon}</span>
        <span className="text-xs font-mono text-gray-500">{label}</span>
      </div>
      <div className={`text-2xl font-mono font-bold ${
        highlight ? 'text-orange-400' : 'text-mellowOff'
      }`}>
        {value}
      </div>
    </motion.div>
  )
}
