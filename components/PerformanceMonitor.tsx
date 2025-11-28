'use client'

import { useEffect, useState } from 'react'

export default function PerformanceMonitor() {
  const [fps, setFps] = useState(60)
  
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
  
  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      left: '10px',
      background: 'rgba(0, 0, 0, 0.7)',
      color: fps < 30 ? '#ff0000' : fps < 50 ? '#ffaa00' : '#00ff00',
      padding: '5px 10px',
      borderRadius: '5px',
      fontSize: '12px',
      fontWeight: 'bold',
      zIndex: 99999,
      display: process.env.NODE_ENV === 'development' ? 'block' : 'none'
    }}>
      FPS: {fps}
    </div>
  )
}
