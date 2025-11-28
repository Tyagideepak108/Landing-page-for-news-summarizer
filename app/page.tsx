'use client'

import { useState, useEffect } from 'react'
import HeroScene from '../components/HeroScene'
import Navigation from '../components/Navigation'
import ScrollIndicator from '../components/ScrollIndicator'
import ScrollText from '../components/ScrollText'
import HeroText from '../components/HeroText'
import GetStartedButton from '../components/GetStartedButton'
import PerformanceMonitor from '../components/PerformanceMonitor'
import Footer from '../components/Footer'

export default function Home() {
  const [tunnelActive, setTunnelActive] = useState(false)

  const handleTunnelStart = () => {
    setTunnelActive(true)
  }

  useEffect(() => {
    document.body.classList.add('home-page')
    
    if (tunnelActive) {
      document.body.classList.add('tunnel-active')
    } else {
      document.body.classList.remove('tunnel-active')
    }
    
    return () => {
      document.body.classList.remove('home-page')
    }
  }, [tunnelActive])

  return (
    <>
      <PerformanceMonitor />
      {!tunnelActive && (
        <>
          <Navigation />
          <HeroText />
          <ScrollIndicator />
          <ScrollText />
          <GetStartedButton onTunnelStart={handleTunnelStart} />
          
          {/* Scrollable content */}
          <div style={{ height: '100vh' }}></div>
          <div 
            style={{ 
              height: '100vh', 
              background: '#1a1a1a'
            }}
          >
          </div>
          <div 
            style={{ 
              height: '100vh', 
              background: '#0a0a0a'
            }}
          >
          </div>
          <div 
            style={{ 
              height: '100vh', 
              background: '#000000'
            }}
          >
          </div>
          
          {/* Footer at the very end */}
          <Footer />
        </>
      )}
      
      {/* This is our 3D scene, which is now 'fixed' */}
      <HeroScene tunnelActive={tunnelActive} />
    </>
  )
}