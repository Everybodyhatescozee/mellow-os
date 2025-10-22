import React from 'react'
import { motion } from 'framer-motion'

export default function ProjectCard({ project, mode }){
  return (
    <motion.a 
      href={project.live}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{
        y:-8, 
        scale:1.03,
        rotateX: 2,
        rotateY: -2
      }} 
      className="relative p-5 rounded-xl cursor-pointer overflow-hidden group block"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(10px)',
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      transition={{type: 'spring', stiffness: 300, damping: 20}}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-mellowPurple/20 via-transparent to-mellowGreen/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <h4 className="font-heading text-base font-semibold mb-2 tracking-wide">{project.title}</h4>
        <p className="text-xs text-gray-400 leading-relaxed mb-3">{project.description}</p>
        
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech?.map((tech, i) => (
            <span 
              key={i}
              className="text-[10px] px-2 py-1 rounded-full bg-mellowPurple/20 text-mellowGreen border border-mellowPurple/30"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <motion.div 
        className="absolute -bottom-10 -right-10 w-32 h-32 bg-mellowPurple/20 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.a>
  )
}
