import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProjectCard({ project, mode }){
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <motion.div 
        onClick={() => setShowModal(true)}
        whileHover={{
          y:-8, 
          scale:1.03,
          rotateX: 2,
          rotateY: -2
        }} 
        className="relative p-5 rounded-xl cursor-pointer overflow-hidden group"
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
        
        {/* Preview Image */}
        {project.image && (
          <div className="relative w-full h-32 mb-3 rounded-lg overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}

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
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-2xl p-8"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              >
                <span className="text-2xl">×</span>
              </button>

              {/* Project Image */}
              {project.image && (
                <div className="w-full h-64 rounded-xl overflow-hidden mb-6">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <h2 className="text-3xl font-heading font-bold mb-4">{project.title}</h2>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech?.map((tech, i) => (
                  <span 
                    key={i}
                    className="text-xs px-3 py-1.5 rounded-full bg-mellowPurple/30 text-mellowGreen border border-mellowPurple/40"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                {project.fullDescription || project.description}
              </p>

              {/* Links */}
              <div className="flex gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-lg bg-mellowPurple/30 hover:bg-mellowPurple/50 border border-mellowPurple/40 transition-colors font-mono text-sm"
                  >
                    View Code
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-lg bg-mellowGreen/20 hover:bg-mellowGreen/30 border border-mellowGreen/40 transition-colors font-mono text-sm text-mellowGreen"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
