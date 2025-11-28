'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Phase 3: The Arrival (New Page Logic)
export default function PageArrival() {
  const pathname = usePathname()
  
  useEffect(() => {
    // Only apply to non-home pages
    if (pathname === '/') return
    
    // Initial State (Chhup ke aao) - Page load hote hi State C set kar do
    document.body.style.opacity = '0'
    document.body.style.transform = 'scale(0.95)'
    document.body.style.transition = 'none'
    
    // DOM Ready hone ka wait kar
    const timer = setTimeout(() => {
      // Trigger Enter Animation (Swagat) - State C se State A
      document.body.style.transition = 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
      document.body.style.opacity = '1'
      document.body.style.transform = 'scale(1)'
    }, 100)

    return () => {
      clearTimeout(timer)
      // Reset styles when component unmounts
      if (pathname !== '/') {
        document.body.style.opacity = ''
        document.body.style.transform = ''
        document.body.style.transition = ''
      }
    }
  }, [pathname])

  return null
}