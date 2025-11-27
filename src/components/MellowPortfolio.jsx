import React from 'react'
import ProjectCard from './ProjectCard'

export default function MellowPortfolio({ projects = [] }){
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-heading font-bold">Portfolio</h2>
          <p className="text-xs text-gray-400 font-mono">Selected work — projects, experiments & demos</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-lg">☯</span>
          <span className="text-lg">◈</span>
          <span className="text-lg">❄</span>
          <span className="text-lg">🌬</span>
          <span className="text-lg">🛠</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <ProjectCard key={i} project={p} />
        ))}
      </div>
    </section>
  )
}
