'use client'

import { useState, useEffect, useRef } from 'react'
import UploadAnalyzer from '../components/UploadAnalyzer'
import ResearchInsights from '../components/ResearchInsights'



export default function AquaTrace() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  // Loader interval
  useEffect(() => {
    let p = 0
    const int = setInterval(() => {
      p += Math.floor(Math.random() * 4) + 1
      if (p >= 100) {
        p = 100
        clearInterval(int)
        setTimeout(() => setLoading(false), 900) // linger on 100% briefly
      }
      setProgress(p)
    }, 30)
    return () => clearInterval(int)
  }, [])

  // Scroll Reveal Observer
  useEffect(() => {
    if (loading) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    const els = document.querySelectorAll('.reveal')
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [loading])

  return (
    <>
      <Loader progress={progress} visible={loading} />

      {!loading && (
        <div style={{ opacity: 1, transition: 'opacity 1s ease' }}>
          {/* Section 2: Sticky Nav */}
          <nav className="sticky-nav border-b-thin">
            <div className="nav-logo">AquaTrace</div>
            <div className="nav-links">
              <span className="nav-link">Overview</span>
              <span className="nav-link">Zones</span>
              <span className="nav-link">Alerts</span>
              <span className="nav-link">Reports</span>
            </div>
            <div className="nav-status">
              <div className="nav-pulse" />
              <span className="label-mono text-muted" style={{ textTransform: 'none' }}>26 sensors live</span>
            </div>
          </nav>

          {/* Section 3: Hero */}
          <section className="bg-prim hero">
            <div className="container hero-grid">
              <div>
                <div className="hero-line reveal">
                  <div className="hero-line-rule" />
                  <span className="label-mono">Real-time water monitoring</span>
                </div>
                <h1 className="headline-large reveal delay-100">
                  Every <br /> drop, <br />
                  <span className="text-yellow" style={{ fontStyle: 'italic' }}>detected.</span>
                </h1>
                <p className="body-text reveal delay-200" style={{ marginTop: '32px', maxWidth: '380px' }}>
                  A sophisticated array of infrared spectroscopy sensors placed across critical municipal flow points, mapping microplastic density instantly.
                </p>
              </div>

              <div className="hero-stats">
                <div className="stat-row reveal delay-300">
                  <div className="stat-label">Avg<br/>Conc.</div>
                  <div className="stat-rule" />
                  <div className="stat-val"><StatCounter target={12} suffix="%" /></div>
                </div>
                <div className="stat-row reveal delay-400">
                  <div className="stat-label">Critical<br/>Zones</div>
                  <div className="stat-rule" />
                  <div className="stat-val text-critical">03</div>
                </div>
                <div className="stat-row reveal delay-500">
                  <div className="stat-label">Samples<br/>Today</div>
                  <div className="stat-rule" />
                  <div className="stat-val"><StatCounter target={452} suffix="" /></div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Marquee */}
          <section className="bg-deep marquee-wrap border-b-thin border-t-thin reveal">
            <div className="marquee-content">
              <span>ZONE A — 12.1 p/L <strong className="text-critical">CRITICAL</strong></span>
              <span>ZONE B — 4.2 p/L <strong className="text-safe">SAFE</strong></span>
              <span>ZONE C — 8.6 p/L <strong className="text-yellow">WARNING</strong></span>
              <span>ZONE D — 2.1 p/L <strong className="text-safe">SAFE</strong></span>
              <span>ZONE E — 14.5 p/L <strong className="text-critical">CRITICAL</strong></span>
              {/* Duplicate for infinite loop */}
              <span>ZONE A — 12.1 p/L <strong className="text-critical">CRITICAL</strong></span>
              <span>ZONE B — 4.2 p/L <strong className="text-safe">SAFE</strong></span>
              <span>ZONE C — 8.6 p/L <strong className="text-yellow">WARNING</strong></span>
              <span>ZONE D — 2.1 p/L <strong className="text-safe">SAFE</strong></span>
              <span>ZONE E — 14.5 p/L <strong className="text-critical">CRITICAL</strong></span>
            </div>
          </section>

          {/* Section 5: Intro */}
          <section className="bg-sec section-padding border-b-thin">
            <div className="container two-col">
              <div className="reveal">
                <span className="label-mono text-muted">/01 / The problem</span>
              </div>
              <div>
                <blockquote className="pull-quote reveal delay-100">
                  Microplastics are everywhere. Most water systems <span className="text-yellow" style={{ fontStyle: 'italic' }}>don't know yet.</span>
                </blockquote>
                <p className="body-text reveal delay-200" style={{ marginTop: '24px' }}>
                  Traditional sampling takes days to process, leaving communities exposed. AquaTrace deploys autonomous spectral imaging capable of continuously classifying polymer fragments down to 10µm directly into the data matrix.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Zones */}
          <section className="bg-prim section-padding border-b-thin">
            <div className="container">
              <div className="reveal" style={{ marginBottom: '60px' }}>
                <span className="label-mono" style={{ opacity: 0.5 }}>/02</span>
                <span className="label-mono" style={{ marginLeft: '12px' }}>Active monitoring zones</span>
              </div>

              <div className="zone-list">
                <ZoneRow num="01" name="Reservoir Alpha" loc="North Intake" val="12.1" pct="100%" status="Critical" delay="0" />
                <ZoneRow num="02" name="Treatment Plant" loc="Basin B" val="8.6" pct="62%" status="Warning" delay="100" />
                <ZoneRow num="03" name="City Grid East" loc="Sector 4" val="4.2" pct="29%" status="Safe" delay="200" />
                <ZoneRow num="04" name="Groundwater" loc="Deep Well 2" val="2.1" pct="16%" status="Safe" delay="300" />
                <ZoneRow num="05" name="Industrial Outfall" loc="South Disch." val="14.5" pct="82%" status="Critical" delay="400" />
              </div>
            </div>
          </section>

          {/* Section 7: Alerts */}
          <section className="bg-sec section-padding border-b-thin">
            <div className="container">
              <div className="reveal" style={{ marginBottom: '40px' }}>
                <span className="label-mono" style={{ opacity: 0.5 }}>/03</span>
                <span className="label-mono" style={{ marginLeft: '12px' }}>System alerts</span>
              </div>

              <div className="three-col border-thin reveal delay-200">
                <AlertCell idx="001" type="Critical" title="Concentration spike above baseline threshold" time="12:04 PM" />
                <AlertCell idx="002" type="Warning" title="Sensor node latency detected in Sector 4" time="11:42 AM" />
                <AlertCell idx="003" type="Info" title="Routine calibration sequence completed" time="09:00 AM" />
                <AlertCell idx="004" type="Warning" title="Unknown polymer composition flagged" time="Yesterday" />
                <AlertCell idx="005" type="Critical" title="Filter membrane obstruction suspected" time="Yesterday" />
                <AlertCell idx="006" type="Info" title="Data synchronization established" time="Yesterday" />
              </div>
            </div>
          </section>

          {/* Section 8: Particle Composition */}
          <section className="bg-prim section-padding border-b-thin">
            <div className="container two-col">
              <div>
                <h2 className="headline-small reveal" style={{ marginBottom: '40px' }}>
                  /04 <br /> Particle <br /> composition
                </h2>
                <div className="composition-list">
                  <ParticleBar name="Fibres" pct="42%" color="var(--accent-critical)" delay="100" />
                  <ParticleBar name="Fragments" pct="28%" color="var(--accent-yellow)" delay="200" />
                  <ParticleBar name="Pellets" pct="15%" color="var(--accent-safe)" delay="300" />
                  <ParticleBar name="Films" pct="11%" color="var(--text-muted)" delay="400" />
                  <ParticleBar name="Unknown" pct="4%" color="#2d5e28" delay="500" />
                </div>
              </div>
              <div className="reveal delay-400" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <ParticleCanvas />
              </div>
            </div>
          </section>

          {/* Section 9: Live AI Analysis */}
          <UploadAnalyzer />

          {/* Section 10: Research Insights */}
          <ResearchInsights />

          {/* Section 11: Closing */}
          <section className="bg-sec section-padding border-b-thin">
            <div className="container two-col">
              <h2 className="headline-medium reveal">
                Water is <br /> everyone's <br />
                <span className="text-yellow" style={{ fontStyle: 'italic' }}>responsibility.</span>
              </h2>
              <div className="reveal delay-200">
                <p className="body-text" style={{ marginBottom: '16px' }}>
                  AquaTrace provides the intelligence to act, turning invisible threats into transparent data. Deploy our sensor network and secure the future of your community's water supply.
                </p>
                <div style={{ display: 'flex', gap: '16px', marginTop: '40px' }}>
                  <button className="btn-filled">Deploy Network</button>
                  <button className="btn-outline">View Specs</button>
                </div>
              </div>
            </div>
          </section>

          {/* Section 10: Footer */}
          <footer className="bg-deep" style={{ padding: '32px 0' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="label-mono">AquaTrace Systems © 2026</span>
              <span className="body-text" style={{ fontSize: '12px' }}>Operational clarity for fluid ecosystems.</span>
            </div>
          </footer>
        </div>
      )}
    </>
  )
}

/* ─────────────────────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────────────────────── */

function Loader({ progress, visible }: { progress: number; visible: boolean }) {
  return (
    <div className={`loader-overlay ${!visible ? 'hidden' : ''}`}>
      <div className="loader-number">{progress.toString().padStart(3, '0')}%</div>
      <div className="loader-bar-wrap">
        <div className="loader-bar-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="loader-label">Initialising sensors</div>
    </div>
  )
}

function StatCounter({ target, suffix }: { target: number; suffix: string }) {
  const [val, setVal] = useState(0)
  
  useEffect(() => {
    let curr = 0
    const inc = target / 50
    const int = setInterval(() => {
      curr += inc
      if (curr >= target) {
        curr = target
        clearInterval(int)
      }
      setVal(Math.floor(curr))
    }, 20)
    return () => clearInterval(int)
  }, [target])

  return <>{val}{suffix}</>
}

function ZoneRow({ num, name, loc, val, pct, status, delay }: any) {
  let scolor = 'var(--accent-safe)'
  if (status === 'Critical') scolor = 'var(--accent-critical)'
  if (status === 'Warning') scolor = 'var(--accent-yellow)'

  return (
    <div className={`zone-row border-t-thin reveal delay-${delay}`}>
      <div className="label-mono text-muted">{num}</div>
      <div>
        <div className="body-text" style={{ color: 'var(--text-ivory)' }}>{name}</div>
        <div className="label-mono text-muted" style={{ fontSize: '10px', marginTop: '4px' }}>{loc}</div>
      </div>
      <div className="anim-bar-track">
        <div className="anim-bar-fill" style={{ '--target': pct, backgroundColor: scolor } as any} />
      </div>
      <div className="label-mono" style={{ textAlign: 'right' }}>{val} p/L</div>
      <div className="label-mono" style={{ color: scolor, textAlign: 'right' }}>{status}</div>
    </div>
  )
}

function AlertCell({ idx, type, title, time }: any) {
  let tcolor = 'var(--accent-safe)'
  if (type === 'Critical') tcolor = 'var(--accent-critical)'
  if (type === 'Warning') tcolor = 'var(--accent-yellow)'

  return (
    <div className="alert-cell">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span className="label-mono text-muted">{idx}</span>
        <span className="label-mono" style={{ color: tcolor }}>{type}</span>
      </div>
      <div className="font-serif" style={{ fontSize: '18px', lineHeight: 1.4, flex: 1 }}>{title}</div>
      <div className="label-mono text-muted">{time}</div>
    </div>
  )
}

function ParticleBar({ name, pct, color, delay }: any) {
  return (
    <div className={`reveal delay-${delay}`} style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span className="body-text" style={{ color: 'var(--text-ivory)' }}>{name}</span>
        <span className="label-mono">{pct}</span>
      </div>
      <div className="anim-bar-track">
        <div className="anim-bar-fill" style={{ '--target': pct, backgroundColor: color } as any} />
      </div>
    </div>
  )
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let reqId: number

    const particles = Array.from({ length: 60 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      phase: Math.random() * Math.PI * 2,
      isRect: Math.random() > 0.5
    }))

    let time = 0
    const render = () => {
      time += 0.015

      // BG
      ctx.fillStyle = '#0a1209'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Grid
      ctx.strokeStyle = 'rgba(74, 138, 66, 0.12)'
      ctx.lineWidth = 0.5
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke()
      }
      for (let i = 0; i < canvas.height; i += 40) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke()
      }

      // Sine Waves (Yellow)
      ctx.strokeStyle = 'rgba(212, 196, 74, 0.25)'
      ctx.lineWidth = 1
      ctx.beginPath()
      for(let x = 0; x < canvas.width; x++) {
        ctx.lineTo(x, canvas.height/2 + Math.sin(x/40 + time) * 30)
      }
      ctx.stroke()

      ctx.beginPath()
      for(let x = 0; x < canvas.width; x++) {
        ctx.lineTo(x, canvas.height/2 + Math.sin(x/30 - time*0.8) * 45 + 15)
      }
      ctx.stroke()

      // Particles
      ctx.fillStyle = '#7a9670'
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy + Math.sin(time*2 + p.phase) * 0.3

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        if (p.isRect) {
          ctx.fillRect(p.x, p.y, p.size * 1.5, p.size * 1.5)
        } else {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      reqId = requestAnimationFrame(render)
    }
    render()

    return () => cancelAnimationFrame(reqId)
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      width={380} 
      height={300} 
      style={{ border: '0.5px solid var(--border)', background: 'var(--bg-deep)' }} 
    />
  )
}
