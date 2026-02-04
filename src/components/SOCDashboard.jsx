import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function SOCDashboard() {
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'Malware', severity: 'critical', ip: '192.168.1.45', status: 'active', time: '2m ago', triaged: false, rule: 'YARA: Trojan.Generic.Win32', confidence: 94, eventCount: 47 },
    { id: 2, type: 'Port Scan', severity: 'medium', ip: '10.0.0.12', status: 'investigating', time: '5m ago', triaged: false, rule: 'Network Reconnaissance', confidence: 72, eventCount: 12 },
    { id: 3, type: 'Lateral Movement', severity: 'high', ip: '172.16.0.8', status: 'blocked', time: '12m ago', triaged: true, rule: 'Mimikatz Detection', confidence: 89, eventCount: 28 },
    { id: 4, type: 'DDoS Attack', severity: 'critical', ip: '203.0.113.0/24', status: 'mitigated', time: '18m ago', triaged: true, rule: 'Traffic Volumetric', confidence: 98, eventCount: 156 },
    { id: 5, type: 'Credential Theft', severity: 'high', ip: '192.168.2.67', status: 'investigating', time: '22m ago', triaged: false, rule: 'Credential Dumping', confidence: 85, eventCount: 33 },
    { id: 6, type: 'Exfiltration', severity: 'critical', ip: '10.1.1.200', status: 'active', time: '31m ago', triaged: false, rule: 'Data Exfil Pattern', confidence: 91, eventCount: 89 },
  ])

  const [selectedAlert, setSelectedAlert] = useState(null)
  const [filterSeverity, setFilterSeverity] = useState('all')
  const [showTriaged, setShowTriaged] = useState(false)
  const [networkStats, setNetworkStats] = useState({
    inbound: 68,
    outbound: 52,
    packetLoss: 0.3
  })

  const [metrics, setMetrics] = useState({
    threats: 1247,
    blocked: 892,
    investigating: 23,
    systems: 156,
    triaged: 892,
    falsePositives: 34,
    mttr: 4.2 // Mean time to respond in minutes
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        threats: prev.threats + Math.floor(Math.random() * 5),
        blocked: prev.blocked + Math.floor(Math.random() * 3),
        investigating: Math.max(1, prev.investigating + (Math.random() > 0.6 ? 1 : -1)),
        systems: prev.systems,
        triaged: prev.triaged + Math.floor(Math.random() * 2),
        falsePositives: Math.max(0, prev.falsePositives + (Math.random() > 0.75 ? 1 : 0)),
        mttr: Math.max(2, prev.mttr + (Math.random() - 0.5) * 0.3)
      }))
      
      setNetworkStats(prev => ({
        inbound: Math.max(20, Math.min(95, prev.inbound + (Math.random() - 0.5) * 15)),
        outbound: Math.max(15, Math.min(85, prev.outbound + (Math.random() - 0.5) * 12)),
        packetLoss: Math.max(0, Math.min(5, prev.packetLoss + (Math.random() - 0.5) * 0.5))
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const triageAlert = (alertId) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, triaged: !alert.triaged } : alert
    ))
  }

  const filteredAlerts = alerts.filter(alert => {
    if (filterSeverity !== 'all' && alert.severity !== filterSeverity) return false
    if (!showTriaged && alert.triaged) return false
    return true
  })

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
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        <motion.div 
          className="p-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
          whileHover={{ scale: 1.02, borderColor: 'rgba(239,68,68,0.3)' }}
        >
          <div className="text-xs text-gray-400 font-mono mb-1">Total Alerts</div>
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
          <div className="text-xs text-gray-400 font-mono mb-1">Triaged</div>
          <div className="text-2xl font-bold text-mellowGreen">{metrics.triaged}</div>
          <div className="text-[10px] text-gray-500 mt-1">✓ Analyzed</div>
        </motion.div>

        <motion.div 
          className="p-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
          whileHover={{ scale: 1.02, borderColor: 'rgba(59,130,246,0.3)' }}
        >
          <div className="text-xs text-gray-400 font-mono mb-1">False Pos</div>
          <div className="text-2xl font-bold text-blue-400">{metrics.falsePositives}</div>
          <div className="text-[10px] text-gray-500 mt-1">⊘ Noise</div>
        </motion.div>

        <motion.div 
          className="p-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
          whileHover={{ scale: 1.02, borderColor: 'rgba(0,184,148,0.3)' }}
        >
          <div className="text-xs text-gray-400 font-mono mb-1">MTTR</div>
          <div className="text-2xl font-bold text-mellowGreen">{metrics.mttr.toFixed(1)}m</div>
          <div className="text-[10px] text-gray-500 mt-1">⏱ Response Time</div>
        </motion.div>
      </div>

      {/* Alert Feed with Triaging Controls */}
      <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
        <div className="p-3 border-b border-white/10 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-mellowOff">Alert Triage Queue</h3>
            <p className="text-[10px] text-gray-500 font-mono">Real-time security events with priority assessment</p>
          </div>
          <motion.div 
            className="w-2 h-2 rounded-full bg-red-500"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* Filter Controls */}
        <div className="p-3 border-b border-white/10 flex gap-2 flex-wrap">
          <button
            onClick={() => setFilterSeverity('all')}
            className={`text-[10px] px-2 py-1 rounded border transition-colors ${
              filterSeverity === 'all' 
                ? 'border-mellowGreen bg-mellowGreen/20 text-mellowGreen' 
                : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterSeverity('critical')}
            className={`text-[10px] px-2 py-1 rounded border transition-colors ${
              filterSeverity === 'critical' 
                ? 'border-red-500 bg-red-500/20 text-red-400' 
                : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
            }`}
          >
            Critical
          </button>
          <button
            onClick={() => setFilterSeverity('high')}
            className={`text-[10px] px-2 py-1 rounded border transition-colors ${
              filterSeverity === 'high' 
                ? 'border-orange-500 bg-orange-500/20 text-orange-400' 
                : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
            }`}
          >
            High
          </button>
          <button
            onClick={() => setShowTriaged(!showTriaged)}
            className={`text-[10px] px-2 py-1 rounded border ml-auto transition-colors ${
              showTriaged 
                ? 'border-mellowGreen bg-mellowGreen/20 text-mellowGreen' 
                : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
            }`}
          >
            {showTriaged ? 'Showing Triaged' : 'Hide Triaged'}
          </button>
        </div>

        <div className="divide-y divide-white/5 max-h-96 overflow-y-auto">
          {filteredAlerts.length === 0 ? (
            <div className="p-4 text-center text-gray-500 text-sm">
              No alerts match the current filter
            </div>
          ) : (
            filteredAlerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                className={`p-3 hover:bg-white/5 transition-colors cursor-pointer ${alert.triaged ? 'opacity-60' : ''}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedAlert(selectedAlert?.id === alert.id ? null : alert)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-mellowOff">{alert.type}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getSeverityColor(alert.severity)}`}>
                        {alert.severity.toUpperCase()}
                      </span>
                      {alert.triaged && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full border border-mellowGreen/30 bg-mellowGreen/10 text-mellowGreen">
                          ✓ TRIAGED
                        </span>
                      )}
                    </div>
                  <div className="text-xs text-gray-400 font-mono mb-1">
                    <span className="text-gray-500">Rule:</span> {alert.rule}
                  </div>
                  <div className="text-xs text-gray-400 font-mono">
                    <span className="text-gray-500">Source:</span> {alert.ip}
                  </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${getStatusColor(alert.status)}`}>
                      {alert.status}
                    </span>
                    <span className="text-[10px] text-gray-500">{alert.time}</span>
                  </div>
                </div>

                {/* Expanded Alert Details */}
                {selectedAlert?.id === alert.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t border-white/10 space-y-2"
                  >
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="text-gray-500 mb-1">Alert ID</p>
                        <p className="text-gray-300 font-mono">#{alert.id.toString().padStart(4, '0')}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Confidence</p>
                        <p className="text-gray-300 font-mono">{alert.confidence}%</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Status</p>
                        <p className={`font-mono ${getStatusColor(alert.status).replace('bg-', 'text-')}`}>
                          {alert.status.toUpperCase()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Event Count</p>
                        <p className="text-gray-300 font-mono">{alert.eventCount}</p>
                      </div>
                    </div>
                    
                    {/* Threat Intelligence */}
                    <div className="bg-black/40 rounded p-2 border border-white/5 text-[9px]">
                      <p className="text-gray-500 mb-1">Threat Intel</p>
                      <p className="text-gray-400">MITRE ATT&CK: T1055 (Process Injection) | CVE Score: 8.9</p>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          triageAlert(alert.id)
                        }}
                        className={`text-[10px] px-3 py-1.5 rounded border transition-colors ${
                          alert.triaged
                            ? 'border-mellowGreen bg-mellowGreen/20 text-mellowGreen'
                            : 'border-mellowGreen/50 bg-mellowGreen/10 text-mellowGreen hover:border-mellowGreen hover:bg-mellowGreen/20'
                        }`}
                      >
                        {alert.triaged ? '✓ Triaged' : 'Mark Triaged'}
                      </button>
                      <button
                        className="text-[10px] px-3 py-1.5 rounded border border-orange-500/50 bg-orange-500/10 text-orange-400 hover:border-orange-500 hover:bg-orange-500/20 transition-colors"
                      >
                        Escalate
                      </button>
                      <button
                        className="text-[10px] px-3 py-1.5 rounded border border-blue-500/50 bg-blue-500/10 text-blue-400 hover:border-blue-500 hover:bg-blue-500/20 transition-colors"
                      >
                        Investigate
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))
          )}
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
                <span className="text-mellowGreen">{networkStats.inbound.toFixed(1)} Mbps</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-mellowGreen to-cyan-400"
                  initial={{ width: '0%' }}
                  animate={{ width: `${networkStats.inbound}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                <span>Outbound</span>
                <span className="text-mellowGreen">{networkStats.outbound.toFixed(1)} Mbps</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-mellowPurple to-pink-400"
                  initial={{ width: '0%' }}
                  animate={{ width: `${networkStats.outbound}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                <span>Packet Loss</span>
                <span className={networkStats.packetLoss > 2 ? 'text-orange-400' : 'text-green-400'}>{networkStats.packetLoss.toFixed(2)}%</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full ${networkStats.packetLoss > 2 ? 'bg-orange-500' : 'bg-green-500'}`}
                  initial={{ width: '0%' }}
                  animate={{ width: `${Math.min(networkStats.packetLoss * 20, 100)}%` }}
                  transition={{ duration: 0.5 }}
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
        <div className="space-y-2 text-[10px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-gray-400">Firewall</span>
            </div>
            <span className="text-gray-500">Active - 99.9% Uptime</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-gray-400">IDS/IPS</span>
            </div>
            <span className="text-gray-500">Online - 1,247 Threats</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-gray-400">SIEM</span>
            </div>
            <span className="text-gray-500">Operational - 156 Systems</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
              <span className="text-gray-400">EDR</span>
            </div>
            <span className="text-gray-500">Updating - 2 min remaining</span>
          </div>
        </div>
      </div>
    </div>
  )
}
