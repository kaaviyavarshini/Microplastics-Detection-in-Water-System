'use client'

import React, { useState } from 'react'
import researchData from '../data/research_data.json'
import { FileText, MapPin, Calendar, Beaker, ChevronRight, BarChart3, Database } from 'lucide-react'

export default function ResearchInsights() {
  const [selectedPaper, setSelectedPaper] = useState(researchData[0])

  return (
    <section className="bg-sec section-padding border-b-thin">
      <div className="container">
        <div className="reveal" style={{ marginBottom: '60px' }}>
          <span className="label-mono" style={{ opacity: 0.5 }}>/05</span>
          <span className="label-mono" style={{ marginLeft: '12px' }}>Scientific Research Data</span>
          <h2 className="headline-small" style={{ marginTop: '20px' }}>
            Integrated <br /> Research <br /> <span className="text-yellow" style={{ fontStyle: 'italic' }}>Intelligence.</span>
          </h2>
        </div>

        <div className="research-grid">
          {/* Paper Sidebar */}
          <div className="paper-sidebar reveal delay-100">
            <div className="label-mono text-muted" style={{ marginBottom: '20px', fontSize: '10px' }}>SELECT SOURCE</div>
            {researchData.map((paper) => (
              <div 
                key={paper.id}
                className={`paper-tab border-t-thin ${selectedPaper.id === paper.id ? 'active' : ''}`}
                onClick={() => setSelectedPaper(paper)}
              >
                <div className="paper-tab-year label-mono">{paper.publicationYear}</div>
                <div className="paper-tab-title body-text">{paper.title}</div>
                <ChevronRight size={16} className="paper-tab-icon" />
              </div>
            ))}
          </div>

          {/* Paper Details */}
          <div className="paper-details reveal delay-200">
            <div className="paper-header">
              <div className="paper-meta-grid">
                <div className="meta-item">
                  <Calendar size={14} className="text-yellow" />
                  <span className="label-mono text-muted">{selectedPaper.publicationYear}</span>
                </div>
                <div className="meta-item">
                  <MapPin size={14} className="text-yellow" />
                  <span className="label-mono text-muted">{selectedPaper.location}</span>
                </div>
                <div className="meta-item">
                  <Database size={14} className="text-yellow" />
                  <span className="label-mono text-muted">{selectedPaper.waterSourceType}</span>
                </div>
              </div>
              <h3 className="headline-xsmall" style={{ marginTop: '24px', lineHeight: 1.2 }}>{selectedPaper.title}</h3>
              <p className="body-text text-muted" style={{ marginTop: '12px', fontSize: '14px' }}>
                Authors: {selectedPaper.authors.join(', ')}
              </p>
            </div>

            <div className="paper-content-grid">
              <div className="paper-section">
                <div className="section-label">
                  <Beaker size={16} />
                  <span className="label-mono">Methodology</span>
                </div>
                <p className="body-text" style={{ fontSize: '15px' }}>{selectedPaper.methodology}</p>
              </div>

              <div className="paper-section">
                <div className="section-label">
                  <BarChart3 size={16} />
                  <span className="label-mono">Key Findings</span>
                </div>
                <ul className="findings-list">
                  {selectedPaper.keyFindings.map((finding, i) => (
                    <li key={i} className="body-text">
                      <span className="text-yellow">—</span> {finding}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="paper-section highlight-box">
                <div className="section-label">
                  <span className="label-mono">Polymer Fingerprint</span>
                </div>
                <div className="polymer-tags">
                  {selectedPaper.polymerTypesFound.map((type, i) => (
                    <span key={i} className="polymer-tag">{type}</span>
                  ))}
                </div>
                <div className="concentration-stat" style={{ marginTop: '24px' }}>
                  <div className="label-mono text-muted" style={{ fontSize: '10px' }}>AVG CONCENTRATION</div>
                  <div className="headline-xsmall text-yellow">{selectedPaper.averageConcentration}</div>
                </div>
              </div>
            </div>

            <div className="paper-footer border-t-thin" style={{ marginTop: '40px', paddingTop: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={16} className="text-muted" />
                <span className="label-mono text-muted" style={{ fontSize: '11px' }}>Source: {selectedPaper.sourceFile}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .research-grid {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 60px;
          align-items: start;
        }

        .paper-sidebar {
          position: sticky;
          top: 100px;
        }

        .paper-tab {
          padding: 20px 0;
          cursor: pointer;
          display: grid;
          grid-template-columns: 40px 1fr 20px;
          gap: 16px;
          align-items: center;
          transition: all 0.3s ease;
          border-color: rgba(255,255,255,0.05);
        }

        .paper-tab:hover {
          padding-left: 8px;
        }

        .paper-tab.active {
          border-color: var(--accent-yellow);
        }

        .paper-tab-year {
          font-size: 10px;
          opacity: 0.5;
        }

        .paper-tab-title {
          font-size: 14px;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .paper-tab.active .paper-tab-title {
          color: var(--accent-yellow);
        }

        .paper-tab-icon {
          opacity: 0;
          transition: all 0.3s ease;
          transform: translateX(-10px);
          color: var(--accent-yellow);
        }

        .paper-tab.active .paper-tab-icon {
          opacity: 1;
          transform: translateX(0);
        }

        .paper-details {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          padding: 48px;
          border-radius: 4px;
        }

        .paper-meta-grid {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .paper-content-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 40px;
          margin-top: 48px;
        }

        .paper-section {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .section-label {
          display: flex;
          align-items: center;
          gap: 10px;
          opacity: 0.6;
          color: var(--accent-yellow);
        }

        .findings-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .findings-list li {
          font-size: 14px;
          line-height: 1.5;
        }

        .highlight-box {
          background: rgba(212, 196, 74, 0.03);
          border: 1px solid rgba(212, 196, 74, 0.1);
          padding: 32px;
          grid-column: span 2;
        }

        .polymer-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .polymer-tag {
          background: var(--bg-deep);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 4px 12px;
          border-radius: 100px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-ivory);
        }

        @media (max-width: 1024px) {
          .research-grid {
            grid-template-columns: 1fr;
          }
          .paper-sidebar {
            position: static;
          }
          .paper-content-grid {
            grid-template-columns: 1fr;
          }
          .highlight-box {
            grid-column: span 1;
          }
        }
      `}</style>
    </section>
  )
}
