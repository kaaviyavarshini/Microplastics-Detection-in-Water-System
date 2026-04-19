'use client'

import { useState, useEffect } from 'react'

/* ─── Mock Data ─────────────────────────────────────────────────── */
const SAMPLES = [
  {
    id: 'WS-001',
    name: 'Fibre Strand Alpha',
    morphology: 'Fiber',
    source: 'River Ganges',
    location: 'Varanasi, India',
    date: '2026-03-15',
    size: '180–220 µm',
    concentration: 847,
    unit: 'particles/L',
    risk: 'High',
    polymer: 'PET',
    confidence: '98.7%',
    color: 'Blue / White',
    image: '/sample_fiber.png',
    turbidity: '12.4 NTU',
    pH: '7.8',
    temperature: '24 °C',
    conductivity: '480 µS/cm',
    dissolved_oxygen: '6.2 mg/L',
    description: 'Elongated synthetic fibres detected. Captured 1D infrared absorption signal successfully matched to PET signature via PlasticNet CNN.',
  },
  {
    id: 'WS-002',
    name: 'Fragment Cluster Beta',
    morphology: 'Fragment',
    source: 'Urban Runoff',
    location: 'Mumbai, India',
    date: '2026-03-12',
    size: '50–130 µm',
    concentration: 1243,
    unit: 'particles/L',
    risk: 'Critical',
    polymer: 'HDPE',
    confidence: '96.2%',
    color: 'Green / Yellow',
    image: '/sample_fragment.png',
    turbidity: '28.1 NTU',
    pH: '6.9',
    temperature: '27 °C',
    conductivity: '620 µS/cm',
    dissolved_oxygen: '4.8 mg/L',
    description: 'Irregular fragment clusters indicative of multi-source urban pollution. Deep learning inference confirms high-density polyethylene (HDPE).',
  },
  {
    id: 'WS-003',
    name: 'Nano Bead Gamma',
    morphology: 'Bead',
    source: 'Groundwater',
    location: 'Chennai, India',
    date: '2026-03-18',
    size: '1–10 µm',
    concentration: 3812,
    unit: 'particles/L',
    risk: 'Critical',
    polymer: 'PS',
    confidence: '99.1%',
    color: 'Silver-Grey',
    image: '/sample_bead.png',
    turbidity: '3.2 NTU',
    pH: '7.1',
    temperature: '22 °C',
    conductivity: '390 µS/cm',
    dissolved_oxygen: '7.9 mg/L',
    description: 'Spherical nanoplastic beads. PyTorch model analyzed the IR spectroscopy spectrum with near-perfect confidence for Polystyrene (PS).',
  },
  {
    id: 'WS-004',
    name: 'Thin Film Delta',
    morphology: 'Film',
    source: 'Coastal Zone',
    location: 'Kochi, India',
    date: '2026-03-20',
    size: '200–800 µm',
    concentration: 412,
    unit: 'particles/L',
    risk: 'Moderate',
    polymer: 'LDPE',
    confidence: '94.5%',
    color: 'Amber / Purple',
    image: '/sample_film.png',
    turbidity: '8.7 NTU',
    pH: '8.2',
    temperature: '28 °C',
    conductivity: '35800 µS/cm',
    dissolved_oxygen: '5.6 mg/L',
    description: 'Iridescent film fragments. The 1D signal array passed through the FastAPI backend correctly identified LDPE despite high background salt noise.',
  },
  {
    id: 'WS-005',
    name: 'Fibre Mesh Epsilon',
    morphology: 'Fiber',
    source: 'Industrial Effluent',
    location: 'Surat, India',
    date: '2026-03-10',
    size: '300–600 µm',
    concentration: 2100,
    unit: 'particles/L',
    risk: 'High',
    polymer: 'PP',
    confidence: '97.8%',
    color: 'Clear / White',
    image: '/sample_fiber.png',
    turbidity: '45.0 NTU',
    pH: '6.5',
    temperature: '31 °C',
    conductivity: '910 µS/cm',
    dissolved_oxygen: '3.1 mg/L',
    description: 'Dense fibre mesh from textile mill discharge. Automated classification tracked the continuous monitoring stream and flagged PP contamination.',
  },
  {
    id: 'WS-006',
    name: 'Fragment Sheet Zeta',
    morphology: 'Fragment',
    source: 'Lake Sediment',
    location: 'Bhopal, India',
    date: '2026-03-08',
    size: '80–200 µm',
    concentration: 654,
    unit: 'particles/L',
    risk: 'Low',
    polymer: 'PVC',
    confidence: '92.4%',
    color: 'Grey / Black',
    image: '/sample_fragment.png',
    turbidity: '5.1 NTU',
    pH: '7.4',
    temperature: '20 °C',
    conductivity: '510 µS/cm',
    dissolved_oxygen: '8.3 mg/L',
    description: 'Settled lake sediment layers. The PlasticNet CNN successfully isolated the PVC absorption spectrum from organic matter interference.',
  },
]

const RISK_COLOR: Record<string, string> = {
  Low: '#4ade80',
  Moderate: '#facc15',
  High: '#fb923c',
  Critical: '#f87171',
}

const POLYMER_COLOR: Record<string, string> = {
  PET: '#93c5fd',
  HDPE: '#6ee7b7',
  PVC: '#fcd34d',
  LDPE: '#fca5a5',
  PP: '#c4b5fd',
  PS: '#cbd5e1',
  Others: '#a1a1aa'
}

const ALL_POLYMERS = ['All', 'PET', 'HDPE', 'PVC', 'LDPE', 'PP', 'PS', 'Others']
const ALL_RISKS = ['All', 'Low', 'Moderate', 'High', 'Critical']
const ALL_SOURCES = ['All', 'River Ganges', 'Urban Runoff', 'Groundwater', 'Coastal Zone', 'Industrial Effluent', 'Lake Sediment']

type Sample = typeof SAMPLES[0]

/* ─────────────────────────────────────────────────────────────────
   IMAGE MODAL with roll + spin animation
───────────────────────────────────────────────────────────────── */
function ImageModal({ sample, onClose }: { sample: Sample; onClose: () => void }) {
  const [phase, setPhase] = useState<'enter' | 'active' | 'exit'>('enter')

  useEffect(() => {
    // tiny delay then switch to active (settled) state
    const t1 = setTimeout(() => setPhase('active'), 50)
    return () => clearTimeout(t1)
  }, [])

  const handleClose = () => {
    setPhase('exit')
    setTimeout(onClose, 500)
  }

  // Intercept backdrop click
  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) handleClose()
  }

  return (
    <div
      className={`modal-backdrop modal-backdrop--${phase}`}
      onClick={handleBackdrop}
    >
      <div className={`modal-container modal-container--${phase}`}>

        {/* ── Image Side ────────── */}
        <div className="modal-image-side">
          <div className={`modal-image-frame modal-image-frame--${phase}`}>
            <img src={sample.image} alt={sample.name} className="modal-image" />

            {/* floating badges */}
            <div className="modal-img-badge modal-img-badge--risk" style={{
              background: RISK_COLOR[sample.risk] + '22',
              color: RISK_COLOR[sample.risk],
              border: `1px solid ${RISK_COLOR[sample.risk]}55`,
            }}>
              {sample.risk} Risk
            </div>
            <div className="modal-img-badge modal-img-badge--type" style={{
              background: POLYMER_COLOR[sample.polymer] + '22',
              color: POLYMER_COLOR[sample.polymer],
              border: `1px solid ${POLYMER_COLOR[sample.polymer]}55`,
            }}>
              {sample.polymer}
            </div>

            {/* scan lines overlay */}
            <div className="modal-scanlines" />
          </div>

          {/* ID tag below image */}
          <div className={`modal-id-tag modal-id-tag--${phase}`}>
            <span className="modal-id-line" />
            <span className="modal-id-text">{sample.id} — IR SPECTRUM ASSESSED</span>
            <span className="modal-id-line" />
          </div>
        </div>

        {/* ── Info Side ─────────── */}
        <div className={`modal-info-side modal-info-side--${phase}`}>
          {/* close */}
          <button className="modal-close" onClick={handleClose}>✕</button>

          <p className="modal-info-sup">AI-POWERED INFRARED SPECTROSCOPY</p>
          <h2 className="modal-info-title">{sample.name}</h2>
          <p className="modal-info-location">{sample.location} · {sample.date}</p>

          <p className="modal-info-desc">{sample.description}</p>

          <div className="modal-divider" />

          <p className="modal-section-label">PLASTICNET CNN CLASSIFICATION</p>
          <div className="modal-grid">
            <InfoRow label="Polymer Match" value={sample.polymer} accent />
            <InfoRow label="Confidence Score" value={sample.confidence} accent />
            <InfoRow label="Particle Morphology" value={sample.morphology} />
            <InfoRow label="Size Estimate" value={sample.size} />
            <InfoRow label="Live Concentration" value={`${sample.concentration.toLocaleString()} ${sample.unit}`} />
          </div>

          <div className="modal-divider" />

          <p className="modal-section-label">WATER CHEMISTRY TELEMETRY</p>
          <div className="modal-grid modal-grid--2col">
            <InfoRow label="Turbidity"  value={sample.turbidity} />
            <InfoRow label="pH"         value={sample.pH} />
            <InfoRow label="Temp"       value={sample.temperature} />
            <InfoRow label="Conductivity" value={sample.conductivity} />
            <InfoRow label="Dissolved O₂" value={sample.dissolved_oxygen} />
          </div>

          <div className="modal-divider" />

          <p className="modal-section-label">ORIGIN</p>
          <div className="modal-source-tag">{sample.source}</div>
        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="modal-info-row">
      <span className="modal-row-label">{label}</span>
      <span className="modal-row-value" style={accent ? { color: 'var(--accent)', fontWeight: 500 } : {}}>
        {value}
      </span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   MAIN CATALOG
───────────────────────────────────────────────────────────────── */
export default function WaterSampleCatalog() {
  const [activePolymer, setActivePolymer] = useState('All')
  const [activeRisk, setActiveRisk] = useState('All')
  const [activeSource, setActiveSource] = useState('All')
  const [sortBy, setSortBy] = useState<'date' | 'concentration' | 'id'>('date')
  const [modalSample, setModalSample] = useState<Sample | null>(null)

  const filtered = SAMPLES
    .filter(s => activePolymer === 'All' || s.polymer === activePolymer)
    .filter(s => activeRisk === 'All' || s.risk === activeRisk)
    .filter(s => activeSource === 'All' || s.source === activeSource)
    .sort((a, b) => {
      if (sortBy === 'concentration') return b.concentration - a.concentration
      if (sortBy === 'date') return b.date.localeCompare(a.date)
      return a.id.localeCompare(b.id)
    })

  return (
    <>
      <div className="catalog-root">
        {/* ── Sidebar ─────────────────────────── */}
        <aside className="catalog-sidebar">
          <div className="sidebar-brand">
            <div className="sidebar-brand-dot" />
            <span>H₂O SCAN</span>
          </div>

          <nav className="sidebar-nav">
            <div className="sidebar-nav-item active-nav">Live Inference</div>
            <div className="sidebar-nav-item">Network Nodes</div>
            <div className="sidebar-nav-item">Diagnostics</div>
            <div className="sidebar-nav-item">PostgreSQL Archive</div>
          </nav>

          <div className="sidebar-divider" />

          <div className="sidebar-section">
            <p className="sidebar-label">POLYMER CLASSIFICATION</p>
            {ALL_POLYMERS.map(p => (
              <button
                key={p}
                className={`sidebar-filter-btn ${activePolymer === p ? 'filter-active' : ''}`}
                onClick={() => setActivePolymer(p)}
              >
                {p !== 'All' && <span className="filter-dot" style={{ background: POLYMER_COLOR[p] }} />}
                {p}
              </button>
            ))}
          </div>

          <div className="sidebar-section">
            <p className="sidebar-label">RISK LEVEL</p>
            {ALL_RISKS.map(r => (
              <button
                key={r}
                className={`sidebar-filter-btn ${activeRisk === r ? 'filter-active' : ''}`}
                onClick={() => setActiveRisk(r)}
              >
                {r !== 'All' && <span className="filter-dot" style={{ background: RISK_COLOR[r] }} />}
                {r}
              </button>
            ))}
          </div>

          <div className="sidebar-section">
            <p className="sidebar-label">WATER SOURCE</p>
            {ALL_SOURCES.map(s => (
              <button
                key={s}
                className={`sidebar-filter-btn ${activeSource === s ? 'filter-active' : ''}`}
                onClick={() => setActiveSource(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="sidebar-divider" />
          
          <div className="sidebar-section">
            <p className="sidebar-label" style={{ color: 'var(--accent)' }}>SDG TARGETS</p>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.5rem', padding: '0 0.75rem' }}>
              {['SDG 3', 'SDG 6', 'SDG 12', 'SDG 13'].map(sdg => (
                <span key={sdg} style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.55rem',
                  padding: '0.2rem 0.4rem',
                  border: '1px solid var(--border-2)',
                  borderRadius: '2px',
                  color: 'var(--text-3)'
                }}>{sdg}</span>
              ))}
            </div>
          </div>

          <div className="sidebar-footer">
            <p className="sidebar-label">SYSTEM STATUS</p>
            <p className="sidebar-stat" style={{ fontSize: '1rem', fontFamily: 'var(--mono)' }}>
              PyTorch <span style={{ color: '#4ade80' }}>● ONLINE</span>
            </p>
          </div>
        </aside>

        {/* ── Main ────────────────────────────── */}
        <main className="catalog-main">
          <header className="catalog-header">
            <div className="catalog-header-left">
              <h1 className="catalog-title">Live Particle Classification</h1>
              <p className="catalog-subtitle" style={{ maxWidth: '600px', lineHeight: '1.4' }}>
                AI-powered platform for real-time detection of microplastics in water systems using infrared spectroscopy and deep learning. PlasticNet-style CNN models served via FastAPI.
              </p>
            </div>
            <div className="catalog-header-right" style={{ alignSelf: 'flex-start' }}>
              <span className="catalog-label">SORT BY</span>
              {(['date', 'concentration', 'id'] as const).map(s => (
                <button
                  key={s}
                  className={`sort-btn ${sortBy === s ? 'sort-active' : ''}`}
                  onClick={() => setSortBy(s)}
                >
                  {s === 'id' ? 'ID' : s === 'concentration' ? 'Conc.' : 'Date'}
                </button>
              ))}
            </div>
          </header>

          <div className="catalog-count">
            <span>{filtered.length} particle{filtered.length !== 1 ? 's' : ''} captured — <em>click an image to view 1D signal analysis</em></span>
            <div className="header-line" />
          </div>

          <div className="sample-grid">
            {filtered.map(sample => (
              <article key={sample.id} className="sample-card">
                {/* Clickable image triggers modal */}
                <div
                  className="card-image-wrap card-image-wrap--clickable"
                  onClick={() => setModalSample(sample)}
                  title="Click to inspect"
                >
                  <img src={sample.image} alt={sample.name} className="card-image" />
                  <div className="card-image-overlay">
                    <div className="card-risk-badge" style={{ background: RISK_COLOR[sample.risk] + '22', color: RISK_COLOR[sample.risk], border: `1px solid ${RISK_COLOR[sample.risk]}44` }}>
                      {sample.risk}
                    </div>
                    <div className="card-type-badge" style={{ background: POLYMER_COLOR[sample.polymer] + '22', color: POLYMER_COLOR[sample.polymer], border: `1px solid ${POLYMER_COLOR[sample.polymer]}44` }}>
                      {sample.polymer} · {sample.confidence}
                    </div>
                  </div>
                  {/* Inspect hint */}
                  <div className="card-inspect-hint">
                    <span>⊕ INSPECT CNN</span>
                  </div>
                </div>

                <div className="card-meta">
                  <div className="card-id">{sample.id}</div>
                  <h2 className="card-name">{sample.name}</h2>
                  <p className="card-location">{sample.location}</p>
                  <div className="card-divider" />
                  <div className="card-stats">
                    <div className="card-stat">
                      <span className="stat-label">AI Match</span>
                      <span className="stat-value" style={{ color: 'var(--accent)' }}>{sample.polymer} ({sample.confidence})</span>
                    </div>
                    <div className="card-stat">
                      <span className="stat-label">Morphology</span>
                      <span className="stat-value">{sample.morphology}</span>
                    </div>
                    <div className="card-stat">
                      <span className="stat-label">Concentration</span>
                      <span className="stat-value">{sample.concentration.toLocaleString()} <small>{sample.unit}</small></span>
                    </div>
                  </div>
                  <div className="card-footer-row">
                    <span className="card-date">{sample.date}</span>
                    <span className="card-source">{sample.source}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="empty-state">No particles match the selected filters.</div>
          )}
        </main>
      </div>

      {/* ── Modal ───────────────────────────── */}
      {modalSample && (
        <ImageModal
          sample={modalSample}
          onClose={() => setModalSample(null)}
        />
      )}
    </>
  )
}
