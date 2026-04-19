import React from 'react'

export default function SampleAnalysis() {
  const jsonReport = {
    "detection_summary": {
      "microplastics_detected": true,
      "total_particle_count": 50,
      "contamination_level": "High",
      "overall_risk": "Hazardous"
    },
    "particle_types": [
      {
        "type": "Fiber",
        "count": 30,
        "percentage": 60.0,
        "average_size": "Medium(1-5mm)",
        "color": "Brown/Dark",
        "probable_source": "Synthetic textiles, localized washing discharge"
      },
      {
        "type": "Fragment",
        "count": 20,
        "percentage": 40.0,
        "average_size": "Small(<1mm)",
        "color": "Dark/Opaque",
        "probable_source": "Degraded rigid plastics, infrastructure wear"
      }
    ],
    "water_quality": {
      "water_clarity": "Cloudy",
      "visible_sediment": true,
      "other_contaminants": "Organic matter, potential rust/soil runoff",
      "estimated_turbidity": "High"
    },
    "health_risk_assessment": {
      "risk_level": "Critical",
      "potential_health_impacts": [
        "High risk of bioaccumulation",
        "Pathogen carrier on microplastic surfaces",
        "Gastrointestinal distress if ingested"
      ],
      "safe_for_consumption": false,
      "safe_for_agriculture": false,
      "safe_for_aquatic_life": false
    },
    "recommendations": [
      "Immediate isolation of the water source from municipal intake.",
      "Implement multi-stage RO and ultrafiltration.",
      "Conduct upstream source tracking to identify the primary pollution point."
    ],
    "confidence_score": 90,
    "analysis_notes": "Image analysis confirms severe contamination. High density of visible brown fibers and dark fragments. High turbidity slightly obfuscates smaller nanoparticles, meaning actual particle count is likely much higher."
  }

  return (
    <section className="bg-prim section-padding border-b-thin">
      <div className="container">
        <div className="reveal" style={{ marginBottom: '40px' }}>
          <span className="label-mono" style={{ opacity: 0.5 }}>/05</span>
          <span className="label-mono" style={{ marginLeft: '12px' }}>AI Image Analysis</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          {/* Images Column */}
          <div className="reveal delay-100">
            <h3 className="body-text" style={{ color: 'var(--text-ivory)', marginBottom: '16px' }}>Captured Samples</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div style={{ background: 'var(--bg-deep)', padding: '8px', borderRadius: '4px', border: '1px solid var(--border)' }}>
                <img src="/dirty water1.jpg" alt="Dirty Sample 1" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '2px' }} />
                <div className="label-mono text-muted" style={{ marginTop: '8px', fontSize: '10px' }}>Sample 1 (Analyzed)</div>
              </div>
              <div style={{ background: 'var(--bg-deep)', padding: '8px', borderRadius: '4px', border: '1px solid var(--border)' }}>
                <img src="/dirty water 2.jpg" alt="Dirty Sample 2" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '2px' }} />
                <div className="label-mono text-muted" style={{ marginTop: '8px', fontSize: '10px' }}>Sample 2</div>
              </div>
              <div style={{ background: 'var(--bg-deep)', padding: '8px', borderRadius: '4px', border: '1px solid var(--border)' }}>
                <img src="/dirty water 3.webp" alt="Dirty Sample 3" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '2px' }} />
                <div className="label-mono text-muted" style={{ marginTop: '8px', fontSize: '10px' }}>Sample 3</div>
              </div>
              <div style={{ background: 'var(--bg-deep)', padding: '8px', borderRadius: '4px', border: '1px solid var(--border)' }}>
                <img src="/clean water 1.jpg" alt="Clean Sample 1" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '2px' }} />
                <div className="label-mono text-muted" style={{ marginTop: '8px', fontSize: '10px' }}>Baseline 1 (Clean)</div>
              </div>
              <div style={{ background: 'var(--bg-deep)', padding: '8px', borderRadius: '4px', border: '1px solid var(--border)', gridColumn: 'span 2' }}>
                <img src="/clean water 2.webp" alt="Clean Sample 2" style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '2px' }} />
                <div className="label-mono text-muted" style={{ marginTop: '8px', fontSize: '10px' }}>Baseline 2 (Clean)</div>
              </div>
            </div>
          </div>

          {/* JSON Report Column */}
          <div className="reveal delay-200">
            <h3 className="body-text" style={{ color: 'var(--text-ivory)', marginBottom: '16px' }}>Detection Report (Sample 1)</h3>
            <div style={{ 
              background: '#0a1209', 
              border: '1px solid var(--border)', 
              borderRadius: '4px', 
              padding: '24px',
              height: 'calc(100% - 40px)',
              overflowY: 'auto'
            }}>
              <pre style={{ 
                margin: 0, 
                color: 'var(--accent-safe)', 
                fontFamily: 'monospace', 
                fontSize: '12px',
                whiteSpace: 'pre-wrap'
              }}>
                {JSON.stringify(jsonReport, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
