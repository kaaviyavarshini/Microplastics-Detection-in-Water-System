'use client'
import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const PLASTIC_TYPES = ['PET', 'HDPE', 'PVC', 'LDPE', 'PP', 'PS', 'Others']

export default function Dashboard() {
  const [data, setData] = useState([12, 19, 3, 5, 2, 3, 7])
  const [latestDetection, setLatestDetection] = useState({
    type: 'PET',
    confidence: 98.4,
    time: new Date().toLocaleTimeString()
  })

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time data updates
      const newData = data.map(v => Math.max(0, v + Math.floor(Math.random() * 3) - 1))
      setData(newData)
      
      const randomType = PLASTIC_TYPES[Math.floor(Math.random() * PLASTIC_TYPES.length)]
      const randomConf = (90 + Math.random() * 9).toFixed(1)
      setLatestDetection({
        type: randomType,
        confidence: parseFloat(randomConf),
        time: new Date().toLocaleTimeString()
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [data])

  const barData = {
    labels: PLASTIC_TYPES,
    datasets: [
      {
        label: 'Particle Count',
        data: data,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  }

  const pieData = {
    labels: PLASTIC_TYPES,
    datasets: [
      {
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(201, 203, 207, 0.6)',
        ],
        borderWidth: 0,
      },
    ],
  }

  return (
    <section id="dashboard" className="section-padding" style={{ background: '#f8fafc' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700 }}>Real-Time <span className="gradient-text">Inference Dashboard</span></h2>
            <p style={{ opacity: 0.6 }}>Live feed from Spectrometer Node-042</p>
          </div>
          <div className="glass" style={{ padding: '0.5rem 1.5rem', borderRadius: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>System Healthy</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
          {/* Latest Detection Card */}
          <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div style={{ borderRight: '1px solid #eee' }}>
              <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', opacity: 0.5, marginBottom: '2rem' }}>Latest Classification</h3>
              <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'hsl(var(--primary))', lineHeight: '1' }}>{latestDetection.type}</div>
              <div style={{ fontSize: '1.2rem', marginTop: '0.5rem', opacity: 0.8 }}>Confidence: {latestDetection.confidence}%</div>
              <div style={{ fontSize: '0.8rem', marginTop: '2rem', opacity: 0.4 }}>Timestamp: {latestDetection.time}</div>
            </div>
            <div>
              <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', opacity: 0.5, marginBottom: '1.5rem' }}>Type Distribution</h3>
              <div style={{ height: '200px' }}>
                <Pie data={pieData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
              </div>
            </div>
          </div>

          {/* Stats Summary */}
          <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '1rem' }}>
             <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius)' }}>
                <h3 style={{ fontSize: '0.8rem', opacity: 0.5 }}>Total Particles Detected (1h)</h3>
                <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>1,284</div>
                <div style={{ color: '#ef4444', fontSize: '0.8rem' }}>+12% vs last hour</div>
             </div>
             <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius)' }}>
                <h3 style={{ fontSize: '0.8rem', opacity: 0.5 }}>Average Confidence</h3>
                <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>96.2%</div>
                <div style={{ color: '#10b981', fontSize: '0.8rem' }}>Optimal performance</div>
             </div>
          </div>
        </div>

        <div className="glass" style={{ marginTop: '2rem', padding: '2rem', borderRadius: 'var(--radius)' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>Historical Particle Flow</h3>
          <div style={{ height: '300px' }}>
            <Bar data={barData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

    </section>
  )
}
