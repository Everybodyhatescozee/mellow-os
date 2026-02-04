import React from 'react'
import { motion } from 'framer-motion'

export default function ModeToggle({mode, onOpenSelector}){
  const getModeStyles = () => {
    switch(mode) {
      case 'flow':
        return {
          background: 'linear-gradient(135deg, rgba(92,75,138,0.2), rgba(0,184,148,0.1))',
          border: '1px solid rgba(92,75,138,0.4)',
          color: 'text-mellowGreen',
          icon: '☯',
          gradient: ['linear-gradient(90deg, transparent, rgba(92,75,138,0.3), transparent)', 
                    'linear-gradient(180deg, transparent, rgba(0,184,148,0.3), transparent)']
        }
      case 'focus':
        return {
          background: 'linear-gradient(135deg, rgba(40,40,40,0.8), rgba(20,20,20,0.9))',
          border: '1px solid rgba(80,80,80,0.6)',
          color: 'text-gray-300',
          icon: '◈',
          gradient: ['linear-gradient(90deg, transparent, rgba(60,60,60,0.4), transparent)',
                    'linear-gradient(180deg, transparent, rgba(80,80,80,0.4), transparent)']
        }
      case 'freeze':
        return {
          background: 'linear-gradient(135deg, rgba(92,75,138,0.3), rgba(0,184,148,0.2))',
          border: '1px solid rgba(0,184,148,0.5)',
          color: 'text-mellowPurple',
          icon: '❄',
          gradient: ['linear-gradient(90deg, transparent, rgba(92,75,138,0.4), transparent)', 
                    'linear-gradient(180deg, transparent, rgba(0,184,148,0.4), transparent)']
        }
      case 'float':
        return {
          background: 'linear-gradient(135deg, rgba(34,211,238,0.3), rgba(96,165,250,0.2))',
          border: '1px solid rgba(34,211,238,0.5)',
          color: 'text-cyan-400',
          icon: '🌬',
          gradient: ['linear-gradient(90deg, transparent, rgba(34,211,238,0.4), transparent)', 
                    'linear-gradient(180deg, transparent, rgba(96,165,250,0.4), transparent)']
        }
      case 'fix':
        return {
          background: 'linear-gradient(135deg, rgba(250,204,21,0.12), rgba(245,158,11,0.06))',
          border: '1px solid rgba(245,158,11,0.25)',
          color: 'text-yellow-400',
          icon: '🛠',
          gradient: ['linear-gradient(90deg, transparent, rgba(245,158,11,0.22), transparent)', 
                    'linear-gradient(180deg, transparent, rgba(250,204,21,0.18), transparent)']
        }
      case 'soc':
        return {
          background: 'linear-gradient(135deg, rgba(239,68,68,0.3), rgba(220,38,38,0.2))',
          border: '1px solid rgba(239,68,68,0.5)',
          color: 'text-red-400',
          icon: '🛡',
          gradient: ['linear-gradient(90deg, transparent, rgba(239,68,68,0.4), transparent)', 
                    'linear-gradient(180deg, transparent, rgba(220,38,38,0.4), transparent)']
        }
      default:
        return {
          background: 'linear-gradient(135deg, rgba(92,75,138,0.2), rgba(0,184,148,0.1))',
          border: '1px solid rgba(92,75,138,0.4)',
          color: 'text-mellowGreen',
          icon: '☯',
          gradient: ['linear-gradient(90deg, transparent, rgba(92,75,138,0.3), transparent)', 
                    'linear-gradient(180deg, transparent, rgba(0,184,148,0.3), transparent)']
        }
    }
  }

  const styles = getModeStyles()

  return (
    <motion.div 
      className="fixed left-4 md:left-6 bottom-4 md:bottom-6 z-50"
      initial={{opacity:0, scale:0.8}}
      animate={{opacity:1, scale:1}}
      transition={{delay:0.8}}
    >
      <motion.button 
        onClick={onOpenSelector} 
        aria-label={`Open mode selector. Current mode ${mode}`}
        title={`Open mode selector (current: ${mode})`}
        className="relative px-4 md:px-6 py-2.5 md:py-3 rounded-full font-mono text-[10px] sm:text-xs tracking-wider overflow-hidden"
        style={{
          background: styles.background,
          border: styles.border,
          backdropFilter: 'blur(10px)'
        }}
        whileHover={{scale:1.05}}
        whileTap={{scale:0.95}}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            background: styles.gradient
          }}
          transition={{duration: 3, repeat: Infinity, repeatType: 'reverse'}}
        />
        <span className="relative z-10 flex items-center gap-1.5 md:gap-2">
          <motion.span
            animate={{rotate: mode === 'freeze' ? 360 : 0}}
            transition={{duration: 0.5}}
            className="text-sm md:text-base"
          >
            {styles.icon}
          </motion.span>
          <span className="hidden sm:inline">MODE:</span>
          <span className={`${styles.color} font-bold`}>{mode.toUpperCase()}</span>
        </span>
      </motion.button>
    </motion.div>
  )
}
