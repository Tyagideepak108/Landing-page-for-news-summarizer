'use client'

import { useEffect, useState } from 'react'
import './ScrollIndicator.css'

export default function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="scroll-indicator">
      <div className="scroll-text">Scroll Down</div>
      <div className="scroll-arrow">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}
