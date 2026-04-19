'use client'
import React from 'react'

export default function AlertPanel() {
  const alerts = [
    { title: 'CONTAMINATION SPIKE', site: 'Pacific-NE', severity: 'high', time: '2m ago', msg: 'Particle density exceeded 50ppm threshold.' },
    { title: 'SENSOR LATENCY', site: 'Indian-OB', severity: 'medium', time: '14m ago', msg: 'Spectrometer Node-039 reporting >100ms lag.' }
  ]

  return (
    <div className="panel" style={{ minWidth: '350px' }}>
      <h3 style={{ fontSize: '0.8rem', fontWeight: 600, color: 'hsl(var(--primary))', marginBottom: '1.5rem', letterSpacing: '1px' }}>
        &gt; ACTIVE THRESHOLD ALERTS
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {alerts.map((alert, i) => (
          <div key={i} style={{ 
            padding: '1rem', 
            background: alert.severity === 'high' ? 'rgba(239, 68, 68, 0.05)' : 'rgba(255, 184, 0, 0.05)',
            borderLeft: `3px solid ${alert.severity === 'high' ? '#ef4444' : 'hsl(var(--accent))'}`,
            borderRadius: '2px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span className="mono" style={{ fontSize: '0.75rem', fontWeight: 800, color: alert.severity === 'high' ? '#ef4444' : 'hsl(var(--accent))' }}>
                {alert.title}
              </span>
              <span className="mono" style={{ fontSize: '0.6rem', opacity: 0.4 }}>{alert.time}</span>
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>{alert.site}</div>
            <div style={{ fontSize: '0.7rem', opacity: 0.6, lineHeight: '1.4' }}>{alert.msg}</div>
          </div>
        ))}
      </div>
      
      <button className="btn-ghost" style={{ width: '100%', marginTop: '1.5rem' }}>SYSTEM DIAGNOSTICS</button>
    </div>
  )
}
