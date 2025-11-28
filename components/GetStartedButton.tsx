'use client'

import { useEffect, useState } from 'react'
import './GetStartedButton.css'

export default function GetStartedButton({ onTunnelStart }: { onTunnelStart: () => void }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      setIsVisible(scrollPercent >= 80)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <button className="get-started-btn" onClick={onTunnelStart}>
      Get Started
    </button>
  )
}
