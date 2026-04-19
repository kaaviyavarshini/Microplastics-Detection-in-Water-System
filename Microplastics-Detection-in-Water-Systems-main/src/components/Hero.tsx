import React from 'react'

export default function Hero() {
  return (
    <section style={{
      height: '100vh',
      width: '100%',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      padding: '0 5%'
    }}>
      {/* Background Image with Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("/hero.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -2
      }} />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, rgba(4, 11, 20, 0.9) 0%, rgba(4, 11, 20, 0.4) 100%)',
        zIndex: -1
      }} />

      <div style={{ maxWidth: '800px', color: 'white' }}>
        <h1 style={{ 
          fontSize: '4.5rem', 
          lineHeight: 1.1, 
          fontWeight: 700, 
          marginBottom: '1.5rem',
          letterSpacing: '-2px'
        }}>
          Revolutionizing <span className="gradient-text">Microplastics</span> Detection
        </h1>
        <p style={{ 
          fontSize: '1.25rem', 
          opacity: 0.9, 
          marginBottom: '2.5rem', 
          maxWidth: '600px',
          fontWeight: 300
        }}>
          Protecting our water systems through advanced Infrared Spectroscopy and real-time AI classification. Ensuring clean water for a sustainable future.
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button style={{
            background: 'hsl(var(--primary))',
            color: 'white',
            border: 'none',
            padding: '1rem 2.5rem',
            borderRadius: '2.5rem',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}>Explore Technology</button>
          <button style={{
            background: 'transparent',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.3)',
            padding: '1rem 2.5rem',
            borderRadius: '2.5rem',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            backdropFilter: 'blur(5px)'
          }}>Watch Demo</button>
        </div>
      </div>
      
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        animation: 'bounce 2s infinite'
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
        </svg>
      </div>

    </section>
  )
}
