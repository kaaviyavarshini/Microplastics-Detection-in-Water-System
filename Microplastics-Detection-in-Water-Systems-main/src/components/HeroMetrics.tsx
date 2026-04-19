'use client'
import React from 'react'

export default function HeroMetrics() {
  const metrics = [
    { label: 'Total Particles Detected', value: '14,282', sub: '+12% from yesterday', color: '--primary' },
    { label: 'Dominant Plastic', value: 'PET-2', sub: '92% Confidence Avg', color: '--primary' },
    { label: 'System Health', value: '99.8%', sub: 'Latency: 42ms', color: '--primary' },
    { label: 'Last Detection', value: '14:28:42', sub: 'Particle ID: #TX-901', color: '--accent' }
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
      {metrics.map((m, i) => (
        <div key={i} className="panel" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', marginBottom: '0.5rem' }}>{m.label}</div>
          <div className="mono" style={{ fontSize: '1.8rem', fontWeight: 700, color: `hsl(var(${m.color}))` }}>{m.value}</div>
          <div style={{ fontSize: '0.65rem', color: m.color === '--accent' ? 'hsl(var(--accent))' : 'rgba(0, 229, 204, 0.5)', marginTop: '0.25rem' }}>{m.sub}</div>
          
          {/* Subtle corner accent */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '20px',
            height: '20px',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            borderRight: '1px solid rgba(255,255,255,0.05)'
          }} />
        </div>
      ))}
    </div>
  )
}
