'use client'

import { useEffect, useState } from 'react'
import './PerformanceMonitor.css'

export default function PerformanceMonitor() {
  const [fps, setFps] = useState(60)
  const [isMobile, setIsMobile] = useState(true)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    
    const measureFPS = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)))
        frameCount = 0
        lastTime = currentTime
      }
      
      requestAnimationFrame(measureFPS)
    }
    
    const rafId = requestAnimationFrame(measureFPS)
    return () => cancelAnimationFrame(rafId)
  }, [])
  
  if (isMobile) return null
  
  return (
    <div className="fps-monitor" style={{
      color: fps < 30 ? '#ff0000' : fps < 50 ? '#ffaa00' : '#00ff00',
      display: isMobile ? 'none' : 'block'
    }}>
      FPS: {fps}
    </div>
  )
}
