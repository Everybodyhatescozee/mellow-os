import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

const STORAGE_KEY = 'mellow_fix_mode_scripts'

export default function FixMode(){
  const [scripts, setScripts] = useState([])
  const [code, setCode] = useState('// write a script here\nconsole.log("hello from Fix mode")')
  const [name, setName] = useState('Untitled')
  const [output, setOutput] = useState('')
  const [logs, setLogs] = useState([])
  const [isRunning, setIsRunning] = useState(false)
  const textareaRef = useRef(null)
  const workerRef = useRef(null)
  const runTimeoutRef = useRef(null)

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
  }

  const runScript = () => {
    setOutput('running...')

    // terminate previous worker if running
    if (workerRef.current) {
      try { workerRef.current.terminate() } catch (e) { /* ignore */ }
      workerRef.current = null
    }

  setIsRunning(true)
  // create a new worker instance
    try {
      const worker = new Worker(new URL('../workers/fixRunner.worker.js', import.meta.url), { type: 'module' })
      workerRef.current = worker

  const logs = []
      const clearRun = () => {
        if (runTimeoutRef.current) {
          clearTimeout(runTimeoutRef.current)
          runTimeoutRef.current = null
        }
        if (workerRef.current) {
          try { workerRef.current.terminate() } catch (e) {}
          workerRef.current = null
        }
      }

      worker.onmessage = (ev) => {
        const { type, payload, error } = ev.data || {}
        if (type === 'log') {
          logs.push(payload)
          setLogs([...logs])
          setOutput(logs.join('\n'))
        }
        if (type === 'error') {
          clearRun()
          setOutput('Error: ' + error)
        }
        if (type === 'done') {
          clearRun()
          setIsRunning(false)
          if (logs.length === 0) setOutput('Script executed (no output)')
        }
      }

      worker.onerror = (err) => {
        clearRun()
        setIsRunning(false)
        setOutput('Error: ' + (err?.message || 'Worker error'))
      }

      // post the run request
      worker.postMessage({ type: 'run', code })

      // enforce a timeout to avoid infinite loops
      runTimeoutRef.current = setTimeout(() => {
        if (workerRef.current) {
          try { workerRef.current.terminate() } catch (e) {}
          workerRef.current = null
        }
        setIsRunning(false)
        setOutput('Error: script timed out')
      }, 6000)
    } catch (e) {
      setIsRunning(false)
      setOutput('Error: ' + e.message)
    }
  }

  const stopRun = () => {
    if (workerRef.current) {
      try { workerRef.current.terminate() } catch (e) {}
      workerRef.current = null
    }
    if (runTimeoutRef.current) {
      clearTimeout(runTimeoutRef.current)
      runTimeoutRef.current = null
    }
    setIsRunning(false)
    setOutput((prev) => prev + '\n[stopped]')
  }

  const loadScript = (s) => {
    setCode(s.code)
    setName(s.name)
    // focus editor
    setTimeout(()=> textareaRef.current?.focus(), 50)
  }

  const deleteScript = (id) => {
    setScripts(prev => prev.filter(s => s.id !== id))
  }

  // cleanup worker on unmount
  useEffect(() => {
    return () => {
      if (workerRef.current) {
        try { workerRef.current.terminate() } catch (e) {}
        workerRef.current = null
      }
      if (runTimeoutRef.current) {
        clearTimeout(runTimeoutRef.current)
        runTimeoutRef.current = null
      }
    }
  }, [])

  return (
    <div className="h-full flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-heading font-bold">🛠 Fix Mode</h2>
          <p className="text-xs text-gray-400 font-mono">Custom scripts & automations — local only</p>
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
            <motion.button onClick={runScript} className="px-3 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-400 text-mellowBlack font-bold text-sm touch-manipulation flex items-center gap-2" whileTap={{scale:0.98}} disabled={isRunning}>
              {isRunning ? (
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/></svg>
              ) : null}
              <span>{isRunning ? 'Running' : 'Run'}</span>
            </motion.button>
            <motion.button onClick={stopRun} className="px-3 py-2 rounded-lg bg-red-600 text-white text-sm touch-manipulation" whileTap={{scale:0.98}} disabled={!isRunning}>Stop</motion.button>
            <motion.button onClick={saveScript} className="px-3 py-2 rounded-lg bg-gray-800/40 border border-gray-700 text-gray-300 text-sm touch-manipulation" whileTap={{scale:0.98}}>Save</motion.button>
            <motion.button onClick={()=>{setCode('') ; setName('')}} className="px-3 py-2 rounded-lg bg-transparent border border-gray-700 text-gray-400 text-sm" whileTap={{scale:0.98}}>Clear</motion.button>
            <motion.button onClick={()=>{ setLogs([]); setOutput('') }} className="px-3 py-2 rounded-lg bg-transparent border border-gray-700 text-gray-400 text-sm" whileTap={{scale:0.98}}>Clear Logs</motion.button>
          </div>

          <div className="mt-3 text-sm font-mono text-gray-300 flex items-center justify-between">
            <div>Output:</div>
            <div className="text-xs text-gray-400">{logs.length} log{logs.length !== 1 ? 's' : ''}</div>
          </div>
          <div className="mt-1 p-3 bg-black/30 rounded-lg min-h-[80px] text-xs font-mono text-gray-200 overflow-auto">
            {logs.length === 0 ? (
              <div className="text-gray-500">{output || 'No output yet'}</div>
            ) : (
              logs.map((l, i) => (
                <div key={i} className="py-1 border-b border-white/5">{l}</div>
              ))
            )}
          </div>
        </div>

        <aside className="w-64 md:w-72 flex-shrink-0">
          <div className="mb-2 text-xs font-mono text-gray-400">Saved scripts</div>
          <div className="space-y-2 overflow-y-auto max-h-[60vh] pr-2">
            {scripts.length === 0 ? (
              <div className="text-xs text-gray-600">No scripts yet. Save your first automation.</div>
            ) : scripts.map(s=> (
              <div key={s.id} className="p-2 rounded-lg bg-black/20 border border-gray-800 flex items-center justify-between">
                <div className="flex-1 pr-2">
                  <div className="text-sm font-semibold line-clamp-1">{s.name}</div>
                  <div className="text-[10px] text-gray-400 font-mono line-clamp-2">{s.code.split('\n')[0]}</div>
                </div>
                <div className="flex flex-col gap-1">
                  <button onClick={()=>loadScript(s)} className="text-xs px-2 py-1 rounded bg-gray-800/40 text-gray-200">Load</button>
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
