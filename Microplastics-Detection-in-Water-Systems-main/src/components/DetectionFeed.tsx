'use client'
import React, { useState, useEffect } from 'react'

export default function DetectionFeed() {
  const [logs, setLogs] = useState([
    { id: 'TX-901', time: '14:28:42', type: 'PET', conf: 98.4, status: 'normal' },
    { id: 'TX-898', time: '14:26:15', type: 'HDPE', conf: 92.1, status: 'normal' },
    { id: 'TX-895', time: '14:24:08', type: 'PVC', conf: 89.7, status: 'warning' },
    { id: 'TX-892', time: '14:22:55', type: 'LDPE', conf: 95.3, status: 'normal' },
    { id: 'TX-889', time: '14:19:30', type: 'PET', conf: 97.2, status: 'normal' },
  ])

  useEffect(() => {
    const types = ['PET', 'HDPE', 'PVC', 'LDPE', 'PP', 'PS']
    const interval = setInterval(() => {
      const newLog = {
        id: `TX-${Math.floor(Math.random() * 1000)}`,
        time: new Date().toLocaleTimeString('en-GB', { hour12: false }),
        type: types[Math.floor(Math.random() * types.length)],
        conf: parseFloat((90 + Math.random() * 9).toFixed(1)),
        status: Math.random() > 0.9 ? 'warning' : 'normal'
      }
      setLogs(prev => [newLog, ...prev.slice(0, 9)])
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="panel scrollbar-hide" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ fontSize: '0.8rem', fontWeight: 600, color: 'hsl(var(--primary))', marginBottom: '1rem', letterSpacing: '1px' }}>
        &gt; DETECTION EVENT FEED
      </h3>
      
      <div style={{ flex: 1, overflowY: 'auto' }} className="scrollbar-hide">
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
          <thead>
            <tr style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <th style={{ padding: '0.75rem 0' }}>TIMESTAMP</th>
              <th>PARTICLE ID</th>
              <th>TYPE</th>
              <th>CONF %</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => (
              <tr key={i} style={{ 
                borderBottom: '1px solid rgba(255,255,255,0.05)', 
                color: log.status === 'warning' ? 'hsl(var(--accent))' : 'white',
                animation: i === 0 ? 'entry 0.5s ease-out' : 'none'
              }}>
                <td className="mono" style={{ padding: '1rem 0', opacity: 0.6 }}>{log.time}</td>
                <td className="mono" style={{ fontWeight: 600 }}>#{log.id}</td>
                <td>
                  <span style={{ 
                    padding: '0.2rem 0.5rem', 
                    borderRadius: '2px', 
                    background: log.status === 'warning' ? 'hsl(var(--accent) / 0.1)' : 'hsl(var(--primary) / 0.1)',
                    border: `1px solid ${log.status === 'warning' ? 'hsl(var(--accent) / 0.3)' : 'hsl(var(--primary) / 0.3)'}`,
                    fontSize: '0.65rem',
                    fontWeight: 700
                  }}>
                    {log.type}
                  </span>
                </td>
                <td className="mono" style={{ fontWeight: 700 }}>{log.conf}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <style jsx>{`
        @keyframes entry {
          from { opacity: 0; transform: translateY(-10px); background: hsl(var(--primary) / 0.1); }
          to { opacity: 1; transform: translateY(0); background: transparent; }
        }
      `}</style>
    </div>
  )
}
