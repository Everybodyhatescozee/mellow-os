import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProjectModal({ project, isOpen, onClose }) {
  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div 
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-mellowBlack border border-white/10 rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="sticky top-4 right-4 float-right z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              >
                <span className="text-xl">×</span>
              </button>

              <div className="p-6 md:p-8">
                {/* Project Image/Preview */}
                {project.image && (
                  <motion.div
                    className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-mellowBlack/50 to-transparent" />
                  </motion.div>
                )}

                {/* Project Title */}
                <motion.h2
                  className="text-3xl md:text-4xl font-heading font-bold mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {project.title}
                </motion.h2>

                {/* Tech Stack Tags */}
                {project.tech && (
                  <motion.div
                    className="flex flex-wrap gap-2 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-mono bg-mellowPurple/20 text-mellowGreen border border-mellowPurple/30 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </motion.div>
                )}

                {/* Description */}
                <motion.div
                  className="text-gray-300 leading-relaxed space-y-4 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {project.description.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </motion.div>

                {/* Links */}
                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-mellowGreen text-mellowBlack font-mono text-sm rounded-lg hover:bg-mellowGreen/90 transition-all flex items-center gap-2"
                    >
                      <span>View Live</span>
                      <span>→</span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-white/5 border border-white/10 font-mono text-sm rounded-lg hover:bg-white/10 transition-all flex items-center gap-2"
                    >
                      <span>View Code</span>
                      <span>→</span>
                    </a>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
