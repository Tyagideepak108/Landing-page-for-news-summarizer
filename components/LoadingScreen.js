'use client'

import { useEffect, useState } from 'react'
import './LoadingScreen.css'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [headline, setHeadline] = useState('Breaking News...')
  const [flipPage, setFlipPage] = useState(false)

  const headlines = [
    'Breaking News...',
    'Loading Stories...',
    'Preparing Headlines...',
    'Fetching Updates...',
    'Almost Ready...'
  ]

  useEffect(() => {
    let flipInterval
    let flipSpeed = 1500

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2
        
        if (newProgress >= 100) {
          clearInterval(progressInterval)
          if (flipInterval) clearInterval(flipInterval)
          setTimeout(() => setIsVisible(false), 300)
          return 100
        }
        
        flipSpeed = Math.max(300, 1000 - (newProgress * 8))
        
        return newProgress
      })
    }, 40)

    const startFlipping = () => {
      flipInterval = setInterval(() => {
        setFlipPage(true)
        setTimeout(() => {
          setHeadline(headlines[Math.floor(Math.random() * headlines.length)])
          setFlipPage(false)
        }, 600)
      }, flipSpeed)
    }

    startFlipping()

    return () => {
      clearInterval(progressInterval)
      if (flipInterval) clearInterval(flipInterval)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className={`loading-screen ${progress === 100 ? 'fade-out' : ''}`}>
      <div className="newspaper-container">
        <div className={`newspaper-page ${flipPage ? 'flipping' : ''}`}>
          <div className="newspaper-front">
            <div className="newspaper-header">
              <div className="newspaper-logo">📰</div>
              <h1 className="newspaper-title">SNAPNEWS</h1>
              <div className="newspaper-date">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
            </div>
            <div className="newspaper-divider"></div>
            <div className="newspaper-headline">{headline}</div>
            <div className="newspaper-content">
              <div className="newspaper-column"></div>
              <div className="newspaper-column"></div>
              <div className="newspaper-column"></div>
            </div>
          </div>
          <div className="newspaper-back">
            <div className="newspaper-header">
              <div className="newspaper-logo">📰</div>
              <h1 className="newspaper-title">SNAPNEWS</h1>
            </div>
            <div className="newspaper-divider"></div>
            <div className="newspaper-headline">AI-Powered News</div>
            <div className="newspaper-content">
              <div className="newspaper-column"></div>
              <div className="newspaper-column"></div>
              <div className="newspaper-column"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="loading-content">
        <p className="loading-text">Loading... {progress}%</p>
      </div>
    </div>
  )
}
