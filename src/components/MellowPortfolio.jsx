import React, { useState } from 'react'
import ProjectCard from './ProjectCard'

export default function MellowPortfolio({ projects = [] }){
  const featured = projects[0]

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-heading font-bold">Portfolio</h2>
          <p className="text-xs text-gray-400 font-mono">Selected work — projects, experiments & demos</p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="text-lg">☯</div>
          <div className="text-lg">◈</div>
          <div className="text-lg">❄</div>
          <div className="text-lg">🌬</div>
          <div className="text-lg">🛠</div>
        </div>
      </div>

      {/* Featured */}
      {featured && (
        <div className="relative rounded-xl overflow-hidden p-4 md:p-6 panel-glass border">
          <div className="md:flex md:items-start md:gap-8">
            <div className="md:flex-1">
              <h3 className="text-xl md:text-2xl font-heading font-bold mb-2">Featured — {featured.title}</h3>
              <p className="text-sm text-gray-300 mb-4 leading-relaxed">{featured.description}</p>
              {featured.live && (
                <a href={featured.live} target="_blank" rel="noreferrer" className="inline-block px-4 py-2 rounded-lg bg-mellowGreen text-mellowBlack font-bold text-sm hover:bg-mellowGreen/80 transition-colors">Open</a>
              )}
            </div>
            {featured.image && (
              <div className="mt-4 md:mt-0 md:flex-shrink-0 md:w-56 h-40 md:h-48 rounded-lg overflow-hidden flex-shrink-0">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <ProjectCard key={i} project={p} />
        ))}
      </div>
    </section>
  )
}
