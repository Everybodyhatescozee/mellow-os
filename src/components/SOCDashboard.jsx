import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function SOCDashboard() {
  const [threats] = useState([
    { id: 1, type: 'Malware', severity: 'critical', ip: '192.168.1.45', status: 'active', time: '2m ago' },
    { id: 2, type: 'Port Scan', severity: 'medium', ip: '10.0.0.12', status: 'investigating', time: '5m ago' },
    { id: 3, type: 'Brute Force', severity: 'high', ip: '172.16.0.8', status: 'blocked', time: '12m ago' },
    { id: 4, type: 'DDoS', severity: 'critical', ip: '203.0.113.0', status: 'mitigated', time: '18m ago' },
  ])

  const [metrics, setMetrics] = useState({
    threats: 1247,
    blocked: 892,
    investigating: 23,
    systems: 156
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        threats: prev.threats + Math.floor(Math.random() * 3),
        blocked: prev.blocked + Math.floor(Math.random() * 2),
        investigating: Math.max(0, prev.investigating + (Math.random() > 0.5 ? 1 : -1)),
        systems: prev.systems
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'critical': return 'text-red-500 border-red-500/30 bg-red-500/10'
      case 'high': return 'text-orange-500 border-orange-500/30 bg-orange-500/10'
      case 'medium': return 'text-yellow-500 border-yellow-500/30 bg-yellow-500/10'
      case 'low': return 'text-blue-500 border-blue-500/30 bg-blue-500/10'
      default: return 'text-gray-500 border-gray-500/30 bg-gray-500/10'
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'text-red-400 bg-red-500/20'
      case 'investigating': return 'text-yellow-400 bg-yellow-500/20'
      case 'blocked': return 'text-blue-400 bg-blue-500/20'
      case 'mitigated': return 'text-green-400 bg-green-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  return (
    <div className="space-y-4 w-full">
      {/* Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <motion.div 
          className="p-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
          whileHover={{ scale: 1.02, borderColor: 'rgba(239,68,68,0.3)' }}
        >
          <div className="text-xs text-gray-400 font-mono mb-1">Total Threats</div>
          <div className="text-2xl font-bold text-red-400">{metrics.threats}</div>
          <div className="text-[10px] text-gray-500 mt-1">↑ 24h</div>
        </motion.div>

        <motion.div 
          className="p-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
          whileHover={{ scale: 1.02, borderColor: 'rgba(34,197,94,0.3)' }}
        >
          <div className="text-xs text-gray-400 font-mono mb-1">Blocked</div>
          <div className="text-2xl font-bold text-green-400">{metrics.blocked}</div>
          <div className="text-[10px] text-gray-500 mt-1">✓ Auto</div>
        </motion.div>

        <motion.div 
          className="p-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
          whileHover={{ scale: 1.02, borderColor: 'rgba(234,179,8,0.3)' }}
        >
          <div className="text-xs text-gray-400 font-mono mb-1">Investigating</div>
          <div className="text-2xl font-bold text-yellow-400">{metrics.investigating}</div>
          <div className="text-[10px] text-gray-500 mt-1">⚠ Active</div>
        </motion.div>

        <motion.div 
          className="p-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
          whileHover={{ scale: 1.02, borderColor: 'rgba(0,184,148,0.3)' }}
        >
          <div className="text-xs text-gray-400 font-mono mb-1">Systems</div>
          <div className="text-2xl font-bold text-mellowGreen">{metrics.systems}</div>
          <div className="text-[10px] text-gray-500 mt-1">● Online</div>
        </motion.div>
      </div>

      {/* Threat Feed */}
      <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
        <div className="p-3 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-mellowOff">Live Threat Feed</h3>
            <p className="text-[10px] text-gray-500 font-mono">Real-time security events</p>
          </div>
          <motion.div 
            className="w-2 h-2 rounded-full bg-red-500"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        <div className="divide-y divide-white/5">
          {threats.map((threat, index) => (
            <motion.div
              key={threat.id}
              className="p-3 hover:bg-white/5 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-mellowOff">{threat.type}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getSeverityColor(threat.severity)}`}>
                      {threat.severity.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 font-mono">
                    <span className="text-gray-500">Source:</span> {threat.ip}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${getStatusColor(threat.status)}`}>
                    {threat.status}
                  </span>
                  <span className="text-[10px] text-gray-500">{threat.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Network Activity */}
      <div className="grid md:grid-cols-2 gap-3">
        <div className="p-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
          <h4 className="text-xs font-bold text-mellowOff mb-2">Network Traffic</h4>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                <span>Inbound</span>
                <span>2.4 GB/s</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-mellowGreen to-cyan-400"
                  initial={{ width: '0%' }}
                  animate={{ width: '68%' }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                <span>Outbound</span>
                <span>1.8 GB/s</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-mellowPurple to-pink-400"
                  initial={{ width: '0%' }}
                  animate={{ width: '52%' }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
          <h4 className="text-xs font-bold text-mellowOff mb-2">Alert Distribution</h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center">
              <div className="text-xl font-bold text-red-400">24%</div>
              <div className="text-[10px] text-gray-500">Critical</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-orange-400">18%</div>
              <div className="text-[10px] text-gray-500">High</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-yellow-400">42%</div>
              <div className="text-[10px] text-gray-500">Medium</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-blue-400">16%</div>
              <div className="text-[10px] text-gray-500">Low</div>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="p-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
        <h4 className="text-xs font-bold text-mellowOff mb-3">Security Systems Status</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px]">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-gray-400">Firewall: Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-gray-400">IDS/IPS: Online</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-gray-400">SIEM: Operational</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
            <span className="text-gray-400">EDR: Updating</span>
          </div>
        </div>
      </div>
    </div>
  )
}
