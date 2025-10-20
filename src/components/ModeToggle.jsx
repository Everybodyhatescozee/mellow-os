import React from 'react'
import { motion } from 'framer-motion'

export default function ModeToggle({mode, setMode}){
  return (
    <motion.div 
      className="fixed left-6 bottom-6 z-50"
      initial={{opacity:0, scale:0.8}}
      animate={{opacity:1, scale:1}}
      transition={{delay:0.8}}
    >
      <motion.button 
        onClick={()=> setMode(mode === 'flow' ? 'focus' : 'flow')} 
        className="relative px-6 py-3 rounded-full font-mono text-xs tracking-wider overflow-hidden"
        style={{
          background: mode === 'flow' 
            ? 'linear-gradient(135deg, rgba(92,75,138,0.2), rgba(0,184,148,0.1))'
            : 'linear-gradient(135deg, rgba(40,40,40,0.8), rgba(20,20,20,0.9))',
          border: mode === 'flow'
            ? '1px solid rgba(92,75,138,0.4)'
            : '1px solid rgba(80,80,80,0.6)',
          backdropFilter: 'blur(10px)'
        }}
        whileHover={{scale:1.05}}
        whileTap={{scale:0.95}}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            background: mode === 'flow'
              ? ['linear-gradient(90deg, transparent, rgba(92,75,138,0.3), transparent)', 
                 'linear-gradient(180deg, transparent, rgba(0,184,148,0.3), transparent)']
              : ['linear-gradient(90deg, transparent, rgba(60,60,60,0.4), transparent)',
                 'linear-gradient(180deg, transparent, rgba(80,80,80,0.4), transparent)']
          }}
          transition={{duration: 3, repeat: Infinity, repeatType: 'reverse'}}
        />
        <span className="relative z-10 flex items-center gap-2">
          <motion.span
            animate={{rotate: mode === 'flow' ? 360 : 0}}
            transition={{duration: 0.5}}
          >
            ☯
          </motion.span>
          MODE: <span className={mode === 'flow' ? 'text-mellowGreen font-bold' : 'text-gray-300 font-bold'}>{mode === 'flow' ? 'FLOW' : 'FOCUS'}</span>
        </span>
      </motion.button>
    </motion.div>
  )
}
