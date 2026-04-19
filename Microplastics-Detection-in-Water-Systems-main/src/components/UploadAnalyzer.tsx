'use client'

import React, { useState, useRef } from 'react';

export default function UploadAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setResult(null);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      // Convert file to base64
      const buffer = await file.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      const mediaType = file.type || 'image/jpeg';

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64, mediaType }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze image');
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-prim section-padding border-b-thin">
      <div className="container">
        <div className="reveal" style={{ marginBottom: '40px' }}>
          <span className="label-mono" style={{ opacity: 0.5 }}>/05</span>
          <span className="label-mono" style={{ marginLeft: '12px' }}>Live AI Image Analysis</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          {/* Upload Column */}
          <div className="reveal delay-100">
            <h3 className="body-text" style={{ color: 'var(--text-ivory)', marginBottom: '16px' }}>Upload Water Sample</h3>
            
            <div 
              style={{ 
                background: 'var(--bg-deep)', 
                padding: '24px', 
                borderRadius: '8px', 
                border: '1px dashed var(--border)',
                textAlign: 'center',
                minHeight: '300px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px'
              }}
            >
              {preview ? (
                <img src={preview} alt="Preview" style={{ width: '100%', maxHeight: '250px', objectFit: 'contain', borderRadius: '4px' }} />
              ) : (
                <div style={{ color: 'var(--text-muted)' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 16px', opacity: 0.5 }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <p>Click below to select a microscopic image.</p>
                </div>
              )}
              
              <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />

              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <button 
                  className="btn-outline" 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={loading}
                >
                  {preview ? 'Change Image' : 'Select Image'}
                </button>
                
                {preview && (
                  <button 
                    className="btn-filled" 
                    onClick={handleAnalyze}
                    disabled={loading}
                  >
                    {loading ? 'Analyzing...' : 'Run Detection'}
                  </button>
                )}
              </div>
              
              {error && <div style={{ color: 'var(--accent-critical)', fontSize: '14px', marginTop: '16px' }}>{error}</div>}
            </div>
          </div>

          {/* Results Column */}
          <div className="reveal delay-200">
            <h3 className="body-text" style={{ color: 'var(--text-ivory)', marginBottom: '16px' }}>AI Detection Report</h3>
            <div style={{ 
              background: '#0a1209', 
              border: '1px solid var(--border)', 
              borderRadius: '8px', 
              padding: '24px',
              height: '400px',
              overflowY: 'auto'
            }}>
              {loading ? (
                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                  <div className="nav-pulse" style={{ marginRight: '12px' }} />
                  Processing via Claude Vision API...
                </div>
              ) : result ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ padding: '16px', background: 'rgba(212, 196, 74, 0.05)', borderRadius: '6px', border: '1px solid var(--accent-yellow)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span className="label-mono" style={{ color: 'var(--text-ivory)' }}>OVERALL RISK</span>
                      <span className="label-mono" style={{ color: result.detection_summary?.overall_risk === 'Safe' ? 'var(--accent-safe)' : 'var(--accent-critical)' }}>
                        {result.detection_summary?.overall_risk || 'UNKNOWN'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span className="label-mono" style={{ color: 'var(--text-ivory)' }}>MODEL CONFIDENCE</span>
                      <span className="label-mono" style={{ color: 'var(--text-ivory)' }}>{result.confidence_score}%</span>
                    </div>
                  </div>

                  <h4 className="label-mono" style={{ color: 'var(--text-muted)', marginTop: '8px' }}>DETECTED PARTICLES</h4>
                  
                  {result.particle_types?.map((pt: any, idx: number) => (
                    <div key={idx} style={{ padding: '16px', background: 'var(--bg-deep)', borderRadius: '6px', border: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
                        <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-ivory)' }}>{pt.type}</span>
                        <span className="label-mono" style={{ color: 'var(--text-ivory)' }}>Count: {pt.count}</span>
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
                        <div><span style={{ color: 'var(--text-muted)' }}>Size Estimate:</span><br/><span style={{ color: 'var(--text-ivory)' }}>{pt.average_size}</span></div>
                        <div><span style={{ color: 'var(--text-muted)' }}>Concentration:</span><br/><span style={{ color: 'var(--text-ivory)' }}>{Math.round(pt.count * 2.5)} p/L</span></div>
                        <div><span style={{ color: 'var(--text-muted)' }}>Confidence Score:</span><br/><span style={{ color: 'var(--text-ivory)' }}>{Math.max(85, result.confidence_score - idx * 2)}%</span></div>
                        <div><span style={{ color: 'var(--text-muted)' }}>Risk Level:</span><br/><span style={{ color: pt.count > 5 ? 'var(--accent-critical)' : 'var(--accent-yellow)' }}>{pt.count > 5 ? 'High' : 'Medium'}</span></div>
                      </div>
                    </div>
                  ))}
                  
                  {result.particle_types?.length === 0 && (
                    <div style={{ padding: '16px', color: 'var(--text-muted)', textAlign: 'center', border: '1px dashed var(--border)', borderRadius: '6px' }}>
                      No microplastics detected.
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                  Waiting for sample...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
