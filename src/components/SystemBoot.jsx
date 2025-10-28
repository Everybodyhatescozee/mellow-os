import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

const BOOT_LINES = [
    "> initializing System protocol...",
    "> loading neural modules...",
    "> calibrating creative systems...",
    "> syncing temporal awareness...",
    "> establishing neural pathways...",
    "> welcome to Mellow OS_"
]

export default function SystemBoot({ onFinish }){
  useEffect(()=>{
    const timer = setTimeout(()=> onFinish?.(), 4200)
    return ()=> clearTimeout(timer)
  },[onFinish])

  return (
    <motion.div 
      className="boot-screen fixed inset-0 flex items-center justify-center z-50 bg-mellowBlack"
      initial={{opacity:1}}
      exit={{opacity:0, transition:{duration:0.8}}}
    >
      <div className="text-[15px] font-mono text-mellowOff whitespace-pre leading-7">
        {BOOT_LINES.map((line, index)=> (
          <motion.div 
            key={index}
            initial={{opacity:0, y:8}}
            animate={{opacity:1, y:0}}
            transition={{delay: index * 0.7, duration:0.5}}
            className="mb-3"
            style={{textShadow: '0 0 10px rgba(92,75,138,0.6)'}}
          >
            <span className={index === BOOT_LINES.length - 1 ? 'cursor-blink' : ''}>
              {line}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
