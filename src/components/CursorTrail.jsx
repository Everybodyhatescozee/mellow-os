import React, { useEffect, useRef } from 'react'

export default function CursorTrail({mode}){
  const el = useRef(null)

  useEffect(()=>{
    const handle = (e) =>{
      const x = e.clientX
      const y = e.clientY
      let dot = document.createElement('div')
      dot.className = 'cursor-ripple'
      dot.style.left = x - 8 + 'px'
      dot.style.top = y - 8 + 'px'
      dot.style.width = '18px'
      dot.style.height = '18px'
      dot.style.borderRadius = '50%'
      dot.style.background = mode === 'flow' 
        ? 'radial-gradient(circle, rgba(92,75,138,0.9), rgba(0,184,148,0.6))' 
        : 'radial-gradient(circle, rgba(60,60,60,0.8), rgba(40,40,40,0.5))'
      dot.style.opacity = '0.8'
      dot.style.pointerEvents = 'none'
      dot.style.transition = 'transform 500ms ease, opacity 500ms ease'
      dot.style.transform = 'scale(1)'
      document.body.appendChild(dot)
      requestAnimationFrame(()=>{
        dot.style.transform = 'scale(3)'
        dot.style.opacity = '0'
      })
      setTimeout(()=> dot.remove(), 600)
    }
    window.addEventListener('mousemove', handle)
    return ()=> window.removeEventListener('mousemove', handle)
  },[mode])

  return null
}
