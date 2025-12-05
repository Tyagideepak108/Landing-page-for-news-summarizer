'use client'

import { useEffect, useState } from 'react'
import './HeroText.css'

export default function HeroText() {
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const fadeStart = 0
      const fadeEnd = window.innerHeight * 0.3
      
      if (scrollY <= fadeStart) {
        setOpacity(1)
      } else if (scrollY >= fadeEnd) {
        setOpacity(0)
      } else {
        setOpacity(1 - (scrollY - fadeStart) / (fadeEnd - fadeStart))
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="hero-text-container" style={{ opacity }}>
      <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', 
          fontWeight: 800,
          marginBottom: '1rem',
          lineHeight: 1.1,
          fontFamily: 'Montserrat, sans-serif',
          background: 'linear-gradient(135deg, #D4AF37 0%, #F4E4B7 50%, #D4AF37 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.02em'
        }}>
          AI-Powered News in Seconds
        </h1>
        <p style={{ 
          fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', 
          color: 'rgba(255,255,255,0.9)',
          marginBottom: '2rem',
          fontWeight: 400,
          fontFamily: 'Montserrat, sans-serif',
          letterSpacing: '0.01em'
        }}>
          Transform lengthy articles into concise summaries
        </p>
        <button style={{
          background: 'linear-gradient(135deg, #D4AF37 0%, #B8941E 100%)',
          color: '#000',
          padding: 'clamp(0.8rem, 2vw, 1.2rem) clamp(2rem, 4vw, 3rem)',
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          fontWeight: 700,
          fontFamily: 'Montserrat, sans-serif',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(212,175,55,0.4)',
          transition: 'all 0.3s ease',
          animation: 'pulse 2s infinite',
          letterSpacing: '0.05em'
        }}
        onMouseEnter={(e) => (e.target as HTMLButtonElement).style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => (e.target as HTMLButtonElement).style.transform = 'scale(1)'}
        onClick={() => window.scrollTo({ top: document.body.scrollHeight * 0.8, behavior: 'smooth' })}
        >
          Try SnapNews Free →
        </button>
        <div style={{ 
          display: 'flex', 
          gap: '2rem', 
          justifyContent: 'center', 
          marginTop: '2.5rem',
          flexWrap: 'wrap'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: '#D4AF37', fontFamily: 'Montserrat, sans-serif' }}>10K+</div>
            <div style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', color: 'rgba(255,255,255,0.8)', fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>Articles</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: '#D4AF37', fontFamily: 'Montserrat, sans-serif' }}>99%</div>
            <div style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', color: 'rgba(255,255,255,0.8)', fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>Accuracy</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: '#D4AF37', fontFamily: 'Montserrat, sans-serif' }}>500+</div>
            <div style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', color: 'rgba(255,255,255,0.8)', fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>Users</div>
          </div>
        </div>
      </div>
    </div>
  )
}
