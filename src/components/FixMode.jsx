import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

const STORAGE_KEY = 'mellow_fix_mode_scripts'

export default function FixMode(){
  const [scripts, setScripts] = useState([])
  const [code, setCode] = useState('// write a script here')
  const [name, setName] = useState('Untitled')
  const textareaRef = useRef(null)

  useEffect(()=>{
    const raw = localStorage.getItem(STORAGE_KEY)
    if(raw){
      try{ setScripts(JSON.parse(raw)) }catch(e){ console.error(e) }
    }
  },[])

  useEffect(()=>{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scripts))
  },[scripts])

  const saveScript = () => {
    if(!name.trim()) return
    const s = { id: Date.now(), name: name.trim(), code }
    setScripts(prev => [s, ...prev])
    setName('Untitled')
    setCode('// write a script here')
  }

  const loadScript = (s) => {
    setCode(s.code)
    setName(s.name)
    setTimeout(()=> textareaRef.current?.focus(), 50)
  }

  const deleteScript = (id) => {
    setScripts(prev => prev.filter(s => s.id !== id))
  }

  return (
    <div className="h-full flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-heading font-bold">🛠 Fix Mode</h2>
          <p className="text-xs text-gray-400 font-mono">Saved automations & scripts (local only)</p>
        </div>
        <div className="text-[10px] md:text-xs text-yellow-400 font-mono">Fix mode • Automations</div>
      </div>

      <div className="flex gap-3 h-full min-h-0">
        <div className="flex-1 flex flex-col min-h-0">
          <input
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder="Script name"
            className="mb-2 px-3 py-2 rounded-lg bg-black/40 border border-gray-800 text-mellowOff text-sm font-mono focus:outline-none"
          />
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e)=>setCode(e.target.value)}
            className="flex-1 w-full min-h-0 px-3 py-3 rounded-lg bg-black/30 border border-gray-800 text-mellowOff font-mono text-sm resize-none focus:outline-none"
          />

          <div className="flex gap-2 mt-3">
            <motion.button onClick={saveScript} className="px-3 py-2 rounded-lg bg-green-600 text-white text-sm touch-manipulation" whileTap={{scale:0.98}}>Save</motion.button>
            <motion.button onClick={()=>{setCode(''); setName('')}} className="px-3 py-2 rounded-lg bg-transparent border border-gray-700 text-gray-400 text-sm" whileTap={{scale:0.98}}>Clear</motion.button>
          </div>

          <div className="mt-3 text-sm font-mono text-gray-300">Preview:</div>
          <div className="mt-1 p-3 bg-black/30 rounded-lg min-h-[120px] text-xs font-mono text-gray-200 overflow-auto">
            <pre className="whitespace-pre-wrap">{code}</pre>
          </div>
        </div>

        <aside className="w-64 md:w-72 flex-shrink-0">
          <div className="mb-2 text-xs font-mono text-gray-400">Saved automations</div>
          <div className="space-y-2 overflow-y-auto max-h-[60vh] pr-2">
            {scripts.length === 0 ? (
              <div className="text-xs text-gray-600">No automations yet. Save your first script.</div>
            ) : scripts.map(s=> (
              <div key={s.id} className="p-2 rounded-lg bg-black/20 border border-gray-800 flex items-center justify-between">
                <div className="flex-1 pr-2">
                  <div className="text-sm font-semibold line-clamp-1">{s.name}</div>
                  <div className="text-[10px] text-gray-400 font-mono line-clamp-2">{s.code.split('\n')[0]}</div>
                </div>
                <div className="flex flex-col gap-1">
                  <button onClick={()=>loadScript(s)} className="text-xs px-2 py-1 rounded bg-gray-800/40 text-gray-200">Open</button>
                  <button onClick={()=>deleteScript(s.id)} className="text-xs px-2 py-1 rounded bg-transparent text-red-400">Del</button>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
