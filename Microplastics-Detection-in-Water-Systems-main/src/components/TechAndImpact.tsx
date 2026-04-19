import React from 'react'

export default function TechAndImpact() {
  const techStack = [
    { num: '01', title: 'Data & Inference Layer', desc: 'An Infrared Spectrometer outputs particle spectra (CSV/JSON). A Python script processes, normalizes, and batches this data for the AI model.' },
    { num: '02', title: 'AI / Model Layer', desc: 'A PlasticNet-inspired CNN, implemented in Python/PyTorch and using pre-trained weights, identifies plastic types. A FastAPI Inference API provides a REST endpoint.' },
    { num: '03', title: 'Backend / Service Layer', desc: 'FastAPI connects the spectrometer data stream and the AI model. PostgreSQL stores spectral data, predictions, timestamps, and device info.' },
    { num: '04', title: 'Frontend / Dashboard', desc: 'A Next.js dashboard uses Chart.js to visualize real-time particle classification (type and confidence), track counts/trends, and display health indicators.' },
    { num: '05', title: 'Deployment', desc: 'The system can be deployed on an Edge PC for low-latency operation, running the spectrometer software and AI API. Azure cloud consolidates dashboards.' }
  ]

  const impacts = [
    { goal: 'SDG 6', title: 'Clean Water & Sanitation', desc: 'Enabling swift, economical, and continuous monitoring of microplastic contamination in water sources.' },
    { goal: 'SDG 3', title: 'Good Health & Well-Being', desc: 'Prompt detection of harmful microplastics, which have been linked to inflammation and health risks.' },
    { goal: 'SDG 12', title: 'Responsible Consumption', desc: 'Supports data driven formulate of policies aimed at reducing plastic usage.' },
    { goal: 'SDG 13', title: 'Climate Action', desc: 'Delivers critical data necessary for protecting aquatic ecosystems and environmental monitoring.' }
  ]

  return (
    <div id="tech">
      {/* Tech Stack Section */}
      <section className="section-padding" style={{ background: 'white' }}>
        <h2 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '4rem', fontWeight: 700 }}>
          The <span className="gradient-text">Tech Stack</span>
        </h2>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {techStack.map((tech, i) => (
            <div key={i} style={{ 
              display: 'flex', 
              gap: '2rem', 
              marginBottom: '2rem', 
              padding: '2rem', 
              borderBottom: i !== techStack.length - 1 ? '1px solid #eee' : 'none',
              alignItems: 'baseline'
            }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'hsl(var(--primary))' }}>{tech.num}</span>
              <div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 600 }}>{tech.title}</h3>
                <p style={{ opacity: 0.7, fontSize: '0.95rem' }}>{tech.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="section-padding" style={{ background: 'hsl(var(--foreground))', color: 'white' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1.5rem' }}>Impact & Global Goals</h2>
          <p style={{ maxWidth: '700px', margin: '0 auto', opacity: 0.7 }}>
            This initiative plays a crucial role in advancing several Sustainable Development Goals (SDGs) to ensure the safety of drinking water and protect aquatic ecosystems.
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '3rem', maxWidth: '1200px', margin: '0 auto' }}>
          {impacts.map((impact, i) => (
            <div key={i} className="glass" style={{ 
              padding: '2.5rem', 
              borderRadius: 'var(--radius)', 
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <div style={{ 
                color: 'hsl(var(--primary))', 
                fontWeight: 800, 
                fontSize: '1rem', 
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ width: '40px', height: '1px', background: 'hsl(var(--primary))' }} />
                {impact.goal}
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>{impact.title}</h3>
              <p style={{ opacity: 0.6, fontSize: '0.9rem', lineHeight: '1.7' }}>{impact.desc}</p>
            </div>
          ))}
        </div>
        
        <div style={{ marginTop: '5rem', textAlign: 'center' }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Sustainable_Development_Goals.png/1200px-Sustainable_Development_Goals.png" 
               alt="SDGs" 
               style={{ height: '80px', filter: 'brightness(0) invert(1)', opacity: 0.5 }} />
        </div>
      </section>
    </div>
  )
}
