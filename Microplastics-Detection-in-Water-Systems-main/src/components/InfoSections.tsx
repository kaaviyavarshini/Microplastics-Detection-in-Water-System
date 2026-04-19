import React from 'react'

export default function InfoSections() {
  return (
    <div id="solution">
      {/* Solution Section */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <span style={{ 
              background: 'hsl(var(--primary) / 0.1)', 
              color: 'hsl(var(--primary))', 
              padding: '0.5rem 1rem', 
              borderRadius: '2rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>Our Solution</span>
            <h2 style={{ fontSize: '3rem', marginTop: '1.5rem', marginBottom: '2rem', fontWeight: 700 }}>
              Microplastics Detection in Water Systems
            </h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <li className="info-item">
                <div className="icon">✓</div>
                <p>The light-transmission/absorption spectra of each particle can be recorded as a 1D signal using infrared spectroscopy.</p>
              </li>
              <li className="info-item">
                <div className="icon">✓</div>
                <p>A deep learning model (CNN) in the PlasticNet style that has been trained on thousands of labeled plastic spectra (PET, HDPE, PVC, LDPE, PP, PS, Others) is fed spectra.</p>
              </li>
              <li className="info-item">
                <div className="icon">✓</div>
                <p>Inline or almost real-time microplastics monitoring is made possible by the model's real-time output of plastic type and confidence score.</p>
              </li>
            </ul>
          </div>
          <div className="glass" style={{ height: '500px', borderRadius: 'var(--radius)', position: 'relative', overflow: 'hidden' }}>
             <div style={{ 
               position: 'absolute', 
               top: '50%', 
               left: '50%', 
               transform: 'translate(-50%, -50%)',
               width: '80%',
               height: '60%',
               background: 'linear-gradient(90deg, transparent 49%, hsl(var(--primary) / 0.2) 50%, transparent 51%)',
               backgroundSize: '20% 100%',
               animation: 'scan 3s infinite linear'
             }} />
             <div style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <pre style={{ fontSize: '0.7rem', color: 'hsl(var(--primary))' }}>
                  {`[SIGNAL_IN] >>> 0.12 0.45 0.78 0.23 0.11 ...
[PROCESSING] ...
[IDENTIFIED] : PET (Polyethylene Terephthalate)
[CONFIDENCE] : 98.4%`}
                </pre>
             </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-padding" style={{ background: 'hsl(var(--background))' }}>
        <h2 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '4rem', fontWeight: 700 }}>
          Key <span className="gradient-text">Features</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {[
            {
              id: '01',
              title: 'Automated Material Identification',
              desc: 'Infrared spectroscopy captures the unique light-absorption "fingerprint" of each microplastic particle as a 1D spectrum. A PlasticNet-style deep learning model (CNN) then classifies this spectrum into plastic types with a confidence score.'
            },
            {
              id: '02',
              title: 'Real-Time, Inline Monitoring',
              desc: 'The system processes spectra on the fly, so plastic type and confidence are output in real time. This enables continuous, inline or near-real-time monitoring of microplastics in water or wastewater streams.'
            },
            {
              id: '03',
              title: 'Scalable, Software-First Design',
              desc: 'The core detection logic runs in software, using pre-trained models on thousands of labeled plastic spectra. This avoids heavy manual analysis and makes it easier to deploy and scale across multiple monitoring sites.'
            }
          ].map((feature, i) => (
            <div key={i} className="glass" style={{ padding: '3rem', borderRadius: 'var(--radius)' }}>
              <div style={{ fontSize: '3rem', fontWeight: 800, opacity: 0.1, marginBottom: '-1.5rem' }}>{feature.id}</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 600 }}>{feature.title}</h3>
              <p style={{ opacity: 0.8, fontSize: '0.95rem' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
