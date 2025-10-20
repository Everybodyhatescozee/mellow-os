import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function NeuralNetwork({ mode }){
  const canvasRef = useRef(null)

  useEffect(()=>{
    if(mode !== 'flow') return
    
    const canvas = canvasRef.current
    if(!canvas) return
    
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Skills and certifications as nodes
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
      }

      update() {
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
          if(distance < 250) {
            const opacity = (1 - distance / 250) * 0.3
            const gradient = ctx.createLinearGradient(this.x, this.y, other.x, other.y)
            gradient.addColorStop(0, `rgba(92, 75, 138, ${opacity})`)
            gradient.addColorStop(1, `rgba(0, 184, 148, ${opacity})`)
            ctx.strokeStyle = gradient
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
          }
        })

        // Draw node
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 3)
        gradient.addColorStop(0, 'rgba(92, 75, 138, 0.8)')
        gradient.addColorStop(0.5, 'rgba(0, 184, 148, 0.4)')
        gradient.addColorStop(1, 'rgba(0, 184, 148, 0)')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = 'rgba(245, 245, 242, 0.9)'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()

        // Draw label
        ctx.fillStyle = 'rgba(245, 245, 242, 0.7)'
        ctx.font = '11px "IBM Plex Mono", monospace'
        ctx.textAlign = 'center'
        ctx.fillText(this.label, this.x, this.y - 12)
      }
    }

    // Create nodes
    const nodes = skills.map((skill, i) => {
      const angle = (i / skills.length) * Math.PI * 2
      const radius = Math.min(canvas.width, canvas.height) * 0.3
      const x = canvas.width / 2 + Math.cos(angle) * radius + (Math.random() - 0.5) * 100
      const y = canvas.height / 2 + Math.sin(angle) * radius + (Math.random() - 0.5) * 100
      return new Node(x, y, skill)
    })

    // Create connections
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
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [mode])

  if(mode !== 'flow') return null

  return (
    <motion.canvas 
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{zIndex: 0}}
      initial={{opacity: 0}}
      animate={{opacity: 0.6}}
      exit={{opacity: 0}}
      transition={{duration: 1}}
    />
  )
}
