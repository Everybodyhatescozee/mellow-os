import React, { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import BootSequence from './components/BootSequence'
import MainInterface from './components/MainInterface'

const BOOT_DURATION = 3200

export default function App(){
  const [booted, setBooted] = useState(false)

  useEffect(()=>{
    const timer = setTimeout(()=> setBooted(true), BOOT_DURATION)
    return ()=> clearTimeout(timer)
  },[])

  return (
    <div className="min-h-screen relative font-mono">
      <AnimatePresence>
        {!booted && <BootSequence onFinish={()=> setBooted(true)} />}
      </AnimatePresence>

      {booted && <MainInterface />}
    </div>
  )
}
