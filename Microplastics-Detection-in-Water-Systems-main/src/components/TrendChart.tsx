'use client'
import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function TrendChart() {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(10, 14, 26, 0.9)',
        titleFont: { family: 'Outfit' },
        bodyFont: { family: 'JetBrains Mono' },
        borderColor: 'rgba(0, 229, 204, 0.2)',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: 'rgba(255, 255, 255, 0.3)', font: { size: 10, family: 'JetBrains Mono' } }
      },
      x: {
        grid: { display: false },
        ticks: { color: 'rgba(255, 255, 255, 0.3)', font: { size: 10, family: 'JetBrains Mono' } }
      }
    }
  }

  const data = {
    labels: ['10 MAR', '11 MAR', '12 MAR', '13 MAR', '14 MAR', '15 MAR', '16 MAR'],
    datasets: [
      {
        fill: true,
        label: 'Particle Count',
        data: [1200, 1900, 1300, 2500, 2200, 3100, 2800],
        borderColor: 'hsl(var(--primary))',
        backgroundColor: 'rgba(0, 229, 204, 0.1)',
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: 'hsl(var(--primary))',
        borderWidth: 2,
      },
    ],
  }

  return (
    <div className="panel" style={{ flex: 1 }}>
      <h3 style={{ fontSize: '0.8rem', fontWeight: 600, color: 'hsl(var(--primary))', marginBottom: '1.5rem', letterSpacing: '1px' }}>
        &gt; 7-DAY CONTAMINATION TREND
      </h3>
      <div style={{ height: '300px' }}>
        <Line options={options as any} data={data} />
      </div>
    </div>
  )
}
