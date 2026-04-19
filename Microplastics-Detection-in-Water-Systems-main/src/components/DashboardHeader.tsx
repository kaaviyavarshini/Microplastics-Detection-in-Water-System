'use client'
import React from 'react'

export default function DashboardHeader() {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      background: 'rgba(10, 14, 26, 0.95)',
      borderBottom: '1px solid hsl(var(--border))',
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <div style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-1px' }}>
          ZY<span style={{ color: 'hsl(var(--primary))' }}>PH</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,255,255,0.03)', padding: '0.4rem 1rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <span className="status-indicator status-live"></span>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Node-042 [LIVE]</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <select style={{
          background: 'transparent',
          color: 'white',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '0.4rem 1rem',
          borderRadius: '4px',
          fontSize: '0.8rem',
          outline: 'none'
        }}>
          <option>Site: Pacific North-East</option>
          <option>Site: Atlantic Mid-Stream</option>
          <option>Site: Indian Ocean Basin</option>
        </select>
        
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            width: '8px',
            height: '8px',
            background: 'hsl(var(--accent))',
            borderRadius: '50%',
            border: '2px solid #0A0E1A'
          }}></span>
        </div>
        
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'hsl(var(--primary) / 0.1)', border: '1px solid hsl(var(--primary) / 0.3)', display: 'flex', alignItems: 'center', justifySelf: 'center' }}>
          <svg style={{ margin: 'auto' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      </div>
    </header>
  )
}
