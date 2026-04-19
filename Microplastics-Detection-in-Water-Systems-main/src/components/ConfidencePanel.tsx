'use client'
import React from 'react'

export default function ConfidencePanel() {
  const data = [
    { type: 'PET', confidence: 94.2, active: true },
    { type: 'HDPE', confidence: 12.5, active: false },
    { type: 'PVC', confidence: 8.1, active: false },
    { type: 'LDPE', confidence: 3.4, active: false },
    { type: 'PP', confidence: 1.2, active: false },
    { type: 'PS', confidence: 0.9, active: false },
    { type: 'Others', confidence: 19.7, active: false }
  ]

  return (
    <div className="panel" style={{ minWidth: '300px' }}>
      <h3 style={{ fontSize: '0.8rem', fontWeight: 600, color: 'hsl(var(--primary))', marginBottom: '1.5rem', letterSpacing: '1px' }}>
        &gt; CONFIDENCE ANALYSIS
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {data.sort((a,b) => b.confidence - a.confidence).map((item, i) => (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.4rem' }}>
              <span className="mono" style={{ fontWeight: 600, color: item.active ? 'hsl(var(--primary))' : 'rgba(255,255,255,0.6)' }}>{item.type}</span>
              <span className="mono" style={{ color: item.active ? 'hsl(var(--primary))' : 'rgba(255,255,255,0.4)' }}>{item.confidence}%</span>
            </div>
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ 
                height: '100%', 
                width: `${item.confidence}%`, 
                background: item.active ? 'hsl(var(--primary))' : 'rgba(0, 229, 204, 0.2)',
                boxShadow: item.active ? '0 0 10px hsl(var(--primary) / 0.5)' : 'none',
                transition: 'width 1s ease-in-out'
              }}></div>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: 'hsl(var(--primary) / 0.05)', border: '1px solid hsl(var(--primary) / 0.1)', borderRadius: '2px' }}>
        <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Primary Signal</div>
        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'hsl(var(--primary))' }}>PET (Polyethylene Terephthalate)</div>
      </div>
    </div>
  )
}
