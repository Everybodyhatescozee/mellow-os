import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

const STORAGE_KEY = 'mellow_fix_mode_scripts'

const PLACEHOLDER_SCRIPTS = [
  {
    id: 1,
    name: 'Morning Dashboard',
    description: 'Open daily dashboard tabs and summary',
    code: '// placeholder: open dashboard URLs'
  },
  {
    id: 2,
    name: 'Backup Notes',
    description: 'Export notes to local file',
    code: '// placeholder: export notes as JSON'
  },
  {
    id: 3,
    name: 'Quick Email',
    description: 'Compose a templated email to a contact',
    code: '// placeholder: email template generator'
  }
]

export default function FixMode(){
  const [scripts, setScripts] = useState([])
  const [code, setCode] = useState('// write a script here')
  const [name, setName] = useState('Untitled')
  const [description, setDescription] = useState('')
  const [editingId, setEditingId] = useState(null)
  const textareaRef = useRef(null)
  const fileInputRef = useRef(null)

  useEffect(()=>{
    const raw = localStorage.getItem(STORAGE_KEY)
    if(raw){
      try{ setScripts(JSON.parse(raw)) }catch(e){ console.error(e) }
    } else {
      // populate with placeholder scripts when empty — but avoid during automated tests
      if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test') {
        setScripts([])
      } else {
        setScripts(PLACEHOLDER_SCRIPTS)
      }
    }
  },[])

  useEffect(()=>{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scripts))
  },[scripts])

  const saveScript = () => {
    if(!name.trim()) return
    const s = { id: editingId || Date.now(), name: name.trim(), description: description.trim(), code }
    if (editingId) {
      // update existing
      setScripts(prev => prev.map(item => item.id === editingId ? s : item))
    } else {
      setScripts(prev => [s, ...prev])
    }
    setName('Untitled')
    setDescription('')
    setCode('// write a script here')
    setEditingId(null)
  }

  // Export all scripts as a JSON file
  const exportScripts = () => {
    try {
      const data = JSON.stringify(scripts, null, 2)
      const blob = new Blob([data], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'mellow_fix_mode_scripts.json'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (e) {
      console.error(e)
    }
  }

  // Import scripts from a JSON file input (merge)
  const handleImportClick = () => fileInputRef.current?.click()

  const handleFile = async (file) => {
    if (!file) return
    try {
      const text = await file.text()
      const parsed = JSON.parse(text)
      // accept arrays or single objects
      const incoming = Array.isArray(parsed) ? parsed : (parsed ? [parsed] : [])
      if (!incoming.length) return
      // normalize and merge (avoid duplicate ids)
      const existingIds = new Set(scripts.map(s => s.id))
      const normalized = incoming.map(item => ({
        id: item.id && !existingIds.has(item.id) ? item.id : Date.now() + Math.floor(Math.random()*1000),
        name: item.name || 'Imported',
        description: item.description || '',
        code: item.code || ''
      }))
      setScripts(prev => [...normalized, ...prev])
    } catch (e) {
      console.error('Import error', e)
    }
  }

  const loadScript = (s) => {
    setCode(s.code)
    setName(s.name)
    setDescription(s.description || '')
    setEditingId(s.id)
    setTimeout(()=> textareaRef.current?.focus(), 50)
  }

  const deleteScript = (id) => {
    setScripts(prev => prev.filter(s => s.id !== id))
  }

  return (
    <div className="h-full flex flex-col gap-3">
      {/* Localhost-visible banner to confirm FixMode is mounted and to show scripts count */}
      {/* debug banner removed */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-heading font-bold">🛠 Fix Mode</h2>
          <p className="text-xs text-gray-400 font-mono">Sticky note wall — your automations & scripts (local only)</p>
        </div>
        <div className="text-[10px] md:text-xs text-yellow-400 font-mono">Fix mode • Automations</div>
      </div>

      <div className="flex gap-3 h-full min-h-0">
        <div className="flex-1 flex flex-col min-h-0">
          <div className="mb-2">
            <input
              value={name}
              onChange={(e)=>setName(e.target.value)}
              placeholder="Script name"
              className="w-full px-3 py-2 rounded-lg bg-black/40 border border-gray-800 text-mellowOff text-sm font-mono focus:outline-none"
            />
          </div>

          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e)=>setCode(e.target.value)}
            className="flex-1 w-full min-h-0 px-3 py-3 rounded-lg bg-black/30 border border-gray-800 text-mellowOff font-mono text-sm resize-none focus:outline-none"
          />

          <div className="flex gap-2 mt-3">
            <motion.button onClick={saveScript} className="px-3 py-2 rounded-lg bg-green-600 text-white text-sm touch-manipulation" whileTap={{scale:0.98}}>Save</motion.button>
            <motion.button onClick={()=>{setCode(''); setName(''); setDescription('')}} className="px-3 py-2 rounded-lg bg-transparent border border-gray-700 text-gray-400 text-sm" whileTap={{scale:0.98}}>Clear</motion.button>
            <motion.button onClick={exportScripts} className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm" whileTap={{scale:0.98}}>Export</motion.button>
            <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={(e)=>handleFile(e.target.files?.[0])} />
            <motion.button onClick={handleImportClick} className="px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm" whileTap={{scale:0.98}}>Import</motion.button>
          </div>

          <div className="mt-3">
            <input
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              placeholder="Short description"
              className="w-full px-3 py-2 rounded-lg bg-black/40 border border-gray-800 text-mellowOff text-sm font-mono focus:outline-none"
            />
          </div>

          <div className="mt-3 text-sm font-mono text-gray-300">Preview:</div>
          <div className="mt-1 p-3 bg-black/30 rounded-lg min-h-[120px] text-xs font-mono text-gray-200 overflow-auto">
            <pre className="whitespace-pre-wrap">{code}</pre>
          </div>
        </div>

        <aside className="w-80 md:w-96 flex-shrink-0">
          <div className="mb-2 text-xs font-mono text-gray-400">Sticky wall</div>
          <div className="grid grid-cols-2 gap-3 auto-rows-fr overflow-y-auto max-h-[60vh] pr-2">
            {scripts.length === 0 ? (
              <div className="text-xs text-gray-600 col-span-2">No automations yet. Save your first script.</div>
            ) : scripts.map((s, idx)=> (
              <div
                key={s.id}
                draggable
                onDragStart={(e)=> e.dataTransfer.setData('text/plain', String(idx))}
                onDragOver={(e)=> e.preventDefault()}
                onDrop={(e)=>{
                  e.preventDefault()
                  const from = Number(e.dataTransfer.getData('text/plain'))
                  const to = idx
                  if (Number.isNaN(from)) return
                  setScripts(prev => {
                    const copy = [...prev]
                    const [moved] = copy.splice(from,1)
                    copy.splice(to,0,moved)
                    return copy
                  })
                }}
                className="relative p-3 rounded-lg shadow-md cursor-grab"
                style={{background: 'linear-gradient(135deg, #fff5b1, #ffd27a)'}}
              >
                <div className="font-semibold text-sm mb-1">{s.name}</div>
                <div className="text-[11px] text-gray-700 mb-2 line-clamp-3">{s.description || s.code.split('\n')[0]}</div>
                <div className="absolute top-2 right-2 flex flex-col gap-1">
                  <button onClick={()=>loadScript(s)} className="text-[11px] px-2 py-1 rounded bg-white/80">Open</button>
                  <button onClick={()=>deleteScript(s.id)} className="text-[11px] px-2 py-1 rounded bg-white/30 text-red-600">Del</button>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
