'use client'
import React, { useEffect, useRef, useState } from 'react'

export default function LiveSpectrum() {
  const [points, setPoints] = useState<string>('')
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    let frame = 0
    const generateWave = () => {
      frame += 0.05
      let p = ''
      const width = 800
      const height = 200
      const segments = 100
      
      for (let i = 0; i <= segments; i++) {
        const x = (i / segments) * width
        // Create a multi-harmonic wave to simulate IR spectrum
        const y = height / 2 + 
                 Math.sin(i * 0.1 + frame) * 30 + 
                 Math.sin(i * 0.25) * 15 + 
                 Math.random() * 2 // adding noise
        
        // Add random "absorption peaks"
        let peak = 0
        if (i > 30 && i < 45) peak = Math.sin((i - 30) * 0.2) * 40
        if (i > 65 && i < 80) peak = Math.sin((i - 65) * 0.15) * 60
        
        p += `${i === 0 ? 'M' : 'L'} ${x} ${y + peak}`
      }
      setPoints(p)
      requestAnimationFrame(generateWave)
    }
    
    const anim = requestAnimationFrame(generateWave)
    return () => cancelAnimationFrame(anim)
  }, [])

  return (
    <div className="panel" style={{ flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'hsl(var(--primary))' }}>&gt; LIVE SPECTRUM ANALYSIS</h3>
        <div className="mono" style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>REF: 284.92 cm⁻¹</div>
      </div>
      
      <div style={{ position: 'relative', height: '240px', background: 'rgba(0, 229, 204, 0.02)', borderRadius: '2px', border: '1px solid rgba(0, 229, 204, 0.05)' }}>
        <svg ref={svgRef} viewBox="0 0 800 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          {/* Static Grid Lines */}
          {[1, 2, 3].map(i => (
            <line key={i} x1="0" y1={i * 50} x2="800" y2={i * 50} stroke="rgba(0, 229, 204, 0.05)" strokeWidth="1" />
          ))}
          
          {/* Animated Path */}
          <path 
            d={points} 
            fill="none" 
            stroke="hsl(var(--primary))" 
            strokeWidth="2" 
            style={{ filter: 'drop-shadow(0 0 5px hsl(var(--primary) / 0.5))' }}
          />
        </svg>
        
        {/* Axes Labels */}
        <div style={{ position: 'absolute', bottom: '-20px', left: '0', width: '100%', display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)' }}>
          <span>4000 cm⁻¹</span>
          <span>2500 cm⁻¹</span>
          <span>1000 cm⁻¹</span>
          <span>400 cm⁻¹</span>
        </div>
        <div style={{ position: 'absolute', left: '-25px', top: '50%', transform: 'rotate(-90deg)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)' }}>
          ABSORBANCE
        </div>
      </div>
    </div>
  )
}
