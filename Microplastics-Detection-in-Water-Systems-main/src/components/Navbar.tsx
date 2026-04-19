'use client'
import React, { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-4 shadow-sm' : 'bg-transparent py-6'}`} style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: '5%',
      paddingRight: '5%',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-1px' }}>
        ZY<span style={{ color: 'hsl(var(--primary))' }}>PH</span>
      </div>
      <div style={{ display: 'flex', gap: '2rem', fontWeight: 500 }}>
        <a href="#solution" className="nav-link">Solution</a>
        <a href="#features" className="nav-link">Features</a>
        <a href="#tech" className="nav-link">Tech Stack</a>
        <a href="#impact" className="nav-link">Impact</a>
        <a href="#dashboard" style={{ 
          background: 'hsl(var(--primary))', 
          color: 'white', 
          padding: '0.5rem 1.5rem', 
          borderRadius: '2rem',
          fontSize: '0.9rem'
        }}>Dashboard</a>
      </div>
    </nav>
  )
}
