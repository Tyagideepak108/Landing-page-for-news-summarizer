'use client'

import { useEffect, useState } from 'react'

export default function ScrollText() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const scrollY = window.scrollY
      const scrollPercent = (scrollY / (document.documentElement.scrollHeight - windowHeight)) * 100
      
      const progress = Math.max(0, Math.min((scrollY - windowHeight * 0.3) / (windowHeight * 1.5), 1))
      setScrollProgress(scrollPercent >= 80 ? -1 : progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const opacity = scrollProgress === -1 ? 0 : scrollProgress
  const scale = scrollProgress === -1 ? 2 : 0.5 + (scrollProgress * 0.5)

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-20 pointer-events-none"
      style={{ 
        opacity,
        transform: `scale(${scale})`,
        transition: scrollProgress === -1 ? 'opacity 0.5s, transform 0.5s' : 'opacity 0.1s, transform 0.1s'
      }}
    >
      <div className="text-center px-4" style={{
        position: 'relative',
        padding: '3rem',
        background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.5) 0%, transparent 70%)',
        borderRadius: '20px'
      }}>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight" style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 800,
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)'
        }}>
          Are you frustrated with{' '}
          <span style={{
            background: 'linear-gradient(135deg, #D4AF37, #F4E4B7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            long news?
          </span>
        </h2>
        <p className="text-2xl md:text-4xl lg:text-5xl font-light" style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 400,
          color: '#D4AF37',
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)'
        }}>
          Don't worry, we got you covered.
        </p>
      </div>
    </div>
  )
}
