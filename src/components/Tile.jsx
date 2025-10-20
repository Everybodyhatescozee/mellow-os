import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function Tile({title, children, index, mode}){
  const [open, setOpen] = useState(false)
  return (
    <motion.div 
      layout 
      onClick={()=> setOpen(!open)} 
      className="relative p-8 rounded-3xl cursor-pointer backdrop-blur-xl overflow-hidden group" 
      initial={{opacity:0, y:30, rotateX: -15}} 
      animate={{
        opacity:1, 
        y:0, 
        rotateX: 0,
        transition:{
          delay:index*0.2, 
          duration:0.8,
          ease: [0.22, 1, 0.36, 1]
        }
      }}
      whileHover={{
        y:-6, 
        scale: 1.02,
        boxShadow: mode === 'flow' 
          ? '0 25px 50px rgba(92,75,138,0.35), 0 0 60px rgba(0,184,148,0.15)' 
          : '0 30px 60px rgba(0,0,0,0.8), 0 0 40px rgba(60,60,60,0.3)'
      }}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
        border: '1px solid rgba(255,255,255,0.08)',
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      transition={{type: 'spring', stiffness: 260, damping: 20}}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-mellowPurple/10 via-transparent to-mellowGreen/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <motion.div 
        className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl"
        style={{
          background: mode === 'flow' 
            ? 'radial-gradient(circle, rgba(92,75,138,0.3), transparent)'
            : 'radial-gradient(circle, rgba(60,60,60,0.4), transparent)'
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 20, 0],
          y: [0, -20, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="relative z-10">
        <motion.h3 className="font-heading text-2xl mb-4 font-bold tracking-tight flex items-center gap-2">
          {title}
          <motion.span 
            className="text-mellowGreen text-sm"
            animate={{opacity: [0.5, 1, 0.5]}}
            transition={{duration: 2, repeat: Infinity}}
          >
            {open ? '▼' : '▶'}
          </motion.span>
        </motion.h3>
        <motion.div layout>
          {open ? (
            <motion.div 
              initial={{opacity:0, y:10}} 
              animate={{opacity:1, y:0}} 
              exit={{opacity:0, y:-10}}
              transition={{duration:0.4}}
            >
              {children}
            </motion.div>
          ) : (
            <motion.div 
              className="text-sm text-gray-400/80 font-mono"
              initial={{opacity:0.8}}
              whileHover={{opacity:1}}
            >
              {title} — click to expand
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
