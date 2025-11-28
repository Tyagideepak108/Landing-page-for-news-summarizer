'use client'

import React from 'react'
import './HeroSection.css'

const HeroSection = () => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <div className="hero-layout">
          <div className="left-text">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <h1 className="hero-title-left" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', margin: 0, lineHeight: 1 }}>Read</h1>
              <h1 className="hero-title-left" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', margin: 0, lineHeight: 1 }}>Smarter</h1>
            </div>
          </div>
          <div className="center-model">
            {/* 3D Model space */}
          </div>
          <div className="right-text">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <h1 className="hero-title-right" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', margin: 0, lineHeight: 1 }}><span className="gradient-text">Not</span></h1>
              <h1 className="hero-title-right" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', margin: 0, lineHeight: 1 }}><span className="gradient-text">Harder</span></h1>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-bg-animation"></div>
    </section>
  )
}

export default HeroSection