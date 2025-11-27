import React, { useState } from 'react'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'

export default function MellowPortfolio({ projects = [] }){
  const [selected, setSelected] = useState(null)

  const open = (project) => setSelected(project)
  const close = () => setSelected(null)

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
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:flex-1 md:pr-6">
              <h3 className="text-xl md:text-2xl font-heading font-bold mb-2">Featured — {featured.title}</h3>
              <p className="text-sm text-gray-300 mb-3">{featured.description}</p>
              <div className="flex gap-2">
                <button onClick={() => open(featured)} className="px-3 py-2 rounded-lg bg-mellowGreen text-mellowBlack font-bold text-sm">Preview</button>
                {featured.live && (
                  <a href={featured.live} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm">Open</a>
                )}
              </div>
            </div>
            {featured.image && (
              <div className="hidden md:block md:w-48 md:h-32 rounded-lg overflow-hidden">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <ProjectCard key={i} project={p} onOpen={open} />
        ))}
      </div>

      <ProjectModal project={selected} isOpen={!!selected} onClose={close} />
    </section>
  )
}
