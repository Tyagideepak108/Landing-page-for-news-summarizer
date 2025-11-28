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
      <div className="hero-text-left">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', margin: 0 }}>Read</h1>
          <h1 style={{ fontSize: 'clamp(4rem, 8vw, 7rem)', margin: 0 }}>Smarter</h1>
        </div>
      </div>
      <div className="hero-text-right">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', margin: 0 }}>Not</h1>
          <h1 style={{ fontSize: 'clamp(4rem, 8vw, 7rem)', margin: 0 }}>Harder</h1>
        </div>
      </div>
    </div>
  )
}
