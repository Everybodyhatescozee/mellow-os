import React, { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import SystemBoot from './components/SystemBoot'
import MainInterface from './components/MainInterface'

export default function App(){
  const [systemBooted, setSystemBooted] = useState(false)

  return (
    <div className="min-h-screen relative font-mono">
      <AnimatePresence>
        {!systemBooted && (
          <SystemBoot onFinish={() => setSystemBooted(true)} />
        )}
      </AnimatePresence>

      {systemBooted && <MainInterface />}
    </div>
  )
}
