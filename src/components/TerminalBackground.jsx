import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function TerminalBackground({ mode }){
  const canvasRef = useRef(null)

  useEffect(()=>{
    const canvas = canvasRef.current
    if(!canvas) return
    
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ<>/{}[]();'
    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops = []

    for(let i = 0; i < columns; i++){
      drops[i] = Math.random() * -100
    }

    const draw = () => {
      ctx.fillStyle = mode === 'flow' ? 'rgba(10, 10, 10, 0.08)' : 'rgba(0, 0, 0, 0.12)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = fontSize + 'px monospace'
      
      for(let i = 0; i < drops.length; i++){
        const text = chars[Math.floor(Math.random() * chars.length)]
        
        if(mode === 'flow'){
          const gradient = ctx.createLinearGradient(0, drops[i] * fontSize, 0, (drops[i] + 1) * fontSize)
          gradient.addColorStop(0, 'rgba(92, 75, 138, 0.9)')
          gradient.addColorStop(0.5, 'rgba(0, 184, 148, 0.7)')
          gradient.addColorStop(1, 'rgba(92, 75, 138, 0.3)')
          ctx.fillStyle = gradient
        } else {
          // Focus mode - darker grayscale with subtle glow
          const gradient = ctx.createLinearGradient(0, drops[i] * fontSize, 0, (drops[i] + 1) * fontSize)
          gradient.addColorStop(0, 'rgba(60, 60, 60, 0.9)')
          gradient.addColorStop(0.5, 'rgba(80, 80, 80, 0.6)')
          gradient.addColorStop(1, 'rgba(40, 40, 40, 0.3)')
          ctx.fillStyle = gradient
        }
        
        ctx.shadowBlur = mode === 'flow' ? 8 : 10
        ctx.shadowColor = mode === 'flow' ? '#5C4B8A' : '#282828'
        
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if(drops[i] * fontSize > canvas.height && Math.random() > 0.975){
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 50)

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', handleResize)
    }
  }, [mode])

  return (
    <motion.canvas 
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{zIndex: 0}}
      initial={{opacity: 0}}
      animate={{opacity: mode === 'flow' ? 0.4 : 0.5}}
      exit={{opacity: 0}}
      transition={{duration: 0.8}}
    />
  )
}
