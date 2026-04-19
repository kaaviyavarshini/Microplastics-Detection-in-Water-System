import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AquaTrace | Real-time Microplastics Monitoring',
  description: 'Editorial and minimal single-page animated website for a microplastics detection system.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Sutera uses simple web-safe fonts so no external imports needed here */}
      </head>
      <body>{children}</body>
    </html>
  )
}
