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
          background: 'linear-gradient(135deg, #00CED1 0%, #FFFFFF 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          AI-Powered News in Seconds
        </h1>
        <p style={{ 
          fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', 
          color: 'rgba(255,255,255,0.85)',
          marginBottom: '2rem',
          fontWeight: 300
        }}>
          Transform lengthy articles into concise summaries
        </p>
        <button style={{
          background: 'linear-gradient(135deg, #00CED1 0%, #008B8B 100%)',
          color: '#fff',
          padding: 'clamp(0.8rem, 2vw, 1.2rem) clamp(2rem, 4vw, 3rem)',
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          fontWeight: 600,
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(0,206,209,0.3)',
          transition: 'all 0.3s ease',
          animation: 'pulse 2s infinite'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
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
            <div style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: '#00CED1' }}>10K+</div>
            <div style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', color: 'rgba(255,255,255,0.7)' }}>Articles</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: '#00CED1' }}>99%</div>
            <div style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', color: 'rgba(255,255,255,0.7)' }}>Accuracy</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: '#00CED1' }}>500+</div>
            <div style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', color: 'rgba(255,255,255,0.7)' }}>Users</div>
          </div>
        </div>
      </div>
    </div>
  )
}
