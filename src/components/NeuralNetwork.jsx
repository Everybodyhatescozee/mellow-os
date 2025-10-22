import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function NeuralNetwork({ mode }){
  const canvasRef = useRef(null)
  const [hoveredNode, setHoveredNode] = useState(null)
  const mousePos = useRef({ x: 0, y: 0 })

  useEffect(()=>{
    if(mode !== 'flow') return
    
    const canvas = canvasRef.current
    if(!canvas) return
    
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Skills and certifications as nodes - ensure uniqueness
    const skills = [
      'React', 'Python', 'Next.js', 'TailwindCSS', 'Cybersecurity',
      'MySQL', 'Firebase', 'Supabase', 'Framer Motion', 'TypeScript',
      'Node.js', 'Git', 'Vercel', 'Frontend', 'Backend'
    ]

    class Node {
      constructor(x, y, label) {
        this.x = x
        this.y = y
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.label = label
        this.connections = []
        this.radius = 4
        this.hovered = false
      }

      update() {
        // Attract to mouse if close
        const dx = mousePos.current.x - this.x
        const dy = mousePos.current.y - this.y
        const dist = Math.hypot(dx, dy)
        
        if(dist < 150) {
          this.vx += (dx / dist) * 0.02
          this.vy += (dy / dist) * 0.02
          this.hovered = true
        } else {
          this.hovered = false
        }

        // Apply friction
        this.vx *= 0.98
        this.vy *= 0.98

        this.x += this.vx
        this.y += this.vy

        // Bounce off edges
        if(this.x < 50 || this.x > canvas.width - 50) this.vx *= -1
        if(this.y < 50 || this.y > canvas.height - 50) this.vy *= -1

        // Keep in bounds
        this.x = Math.max(50, Math.min(canvas.width - 50, this.x))
        this.y = Math.max(50, Math.min(canvas.height - 50, this.y))
      }

      draw() {
        // Draw connections
        this.connections.forEach(other => {
          const distance = Math.hypot(this.x - other.x, this.y - other.y)
          if(distance < 300) {
            const baseOpacity = (1 - distance / 300) * 0.3
            const opacity = (this.hovered || other.hovered) ? baseOpacity * 2 : baseOpacity
            const gradient = ctx.createLinearGradient(this.x, this.y, other.x, other.y)
            gradient.addColorStop(0, `rgba(92, 75, 138, ${opacity})`)
            gradient.addColorStop(1, `rgba(0, 184, 148, ${opacity})`)
            ctx.strokeStyle = gradient
            ctx.lineWidth = this.hovered || other.hovered ? 2 : 1
            ctx.beginPath()
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
          }
        })

        // Draw node glow
        const glowRadius = this.hovered ? this.radius * 5 : this.radius * 3
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, glowRadius)
        gradient.addColorStop(0, `rgba(92, 75, 138, ${this.hovered ? 1 : 0.8})`)
        gradient.addColorStop(0.5, `rgba(0, 184, 148, ${this.hovered ? 0.6 : 0.4})`)
        gradient.addColorStop(1, 'rgba(0, 184, 148, 0)')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, glowRadius, 0, Math.PI * 2)
        ctx.fill()

        // Draw node
        ctx.fillStyle = this.hovered ? 'rgba(0, 184, 148, 1)' : 'rgba(245, 245, 242, 0.9)'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.hovered ? this.radius * 1.5 : this.radius, 0, Math.PI * 2)
        ctx.fill()

        // Draw label
        ctx.fillStyle = this.hovered ? 'rgba(245, 245, 242, 1)' : 'rgba(245, 245, 242, 0.7)'
        ctx.font = this.hovered ? 'bold 13px "IBM Plex Mono", monospace' : '11px "IBM Plex Mono", monospace'
        ctx.textAlign = 'center'
        ctx.fillText(this.label, this.x, this.y - (this.hovered ? 15 : 12))
      }
    }

    // Create nodes with guaranteed unique labels
    const nodes = skills.map((skill, i) => {
      const angle = (i / skills.length) * Math.PI * 2
      const radius = Math.min(canvas.width, canvas.height) * 0.3
      const x = canvas.width / 2 + Math.cos(angle) * radius + (Math.random() - 0.5) * 100
      const y = canvas.height / 2 + Math.sin(angle) * radius + (Math.random() - 0.5) * 100
      return new Node(x, y, skill)
    })

    // Create connections (avoid duplicates)
    nodes.forEach((node, i) => {
      const connectionsCount = Math.floor(Math.random() * 3) + 2
      for(let j = 0; j < connectionsCount; j++) {
        const randomIndex = Math.floor(Math.random() * nodes.length)
        if(randomIndex !== i && !node.connections.includes(nodes[randomIndex])) {
          node.connections.push(nodes[randomIndex])
        }
      }
    })

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      nodes.forEach(node => {
        node.update()
        node.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mode])

  if(mode !== 'flow') return null

  return (
    <motion.canvas 
      ref={canvasRef}
      className="fixed inset-0"
      style={{zIndex: 0, pointerEvents: 'auto', cursor: 'crosshair'}}
      initial={{opacity: 0}}
      animate={{opacity: 0.8}}
      exit={{opacity: 0}}
      transition={{duration: 1}}
    />
  )
}
