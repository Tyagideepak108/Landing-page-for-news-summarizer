'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import './Navigation.css'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' }
  ]

  const handleTryNow = () => {
    window.scrollTo({ top: document.body.scrollHeight * 0.8, behavior: 'smooth' })
  }



  useEffect(() => {
    // Only add entry animation for non-home pages
    if (pathname !== '/') {
      document.body.style.opacity = '1'
      document.body.style.transform = 'scale(1) rotateY(0deg)'
      document.body.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
    } else {
      // Reset body styles for home page
      document.body.style.opacity = ''
      document.body.style.transform = ''
      document.body.style.transition = ''
    }
  }, [pathname])

  return (
    <nav className={`navbar ${isHomePage ? 'transparent' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <span className="logo-icon" style={{ fontSize: '2.2rem' }}>📰</span>
          <span className="logo-text">SnapNews</span>
        </div>
        
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {navItems.map((item, index) => (
            <li key={index} className="nav-item">
              <Link 
                href={item.href} 
                className={`nav-link ${pathname === item.href ? 'active' : ''}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li className="nav-item">
            <button onClick={handleTryNow} className="nav-cta-btn">
              Try Now
            </button>
          </li>
        </ul>

        <div className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  )
}

export default Navigation