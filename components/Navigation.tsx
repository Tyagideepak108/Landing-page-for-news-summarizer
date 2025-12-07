'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import './Navigation.css'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const sidebarRef = useRef(null)
  const menuItemsRef = useRef([])

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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (pathname !== '/') {
      document.body.style.opacity = '1'
      document.body.style.transform = 'scale(1) rotateY(0deg)'
      document.body.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
    } else {
      document.body.style.opacity = ''
      document.body.style.transform = ''
      document.body.style.transition = ''
    }
  }, [pathname])

  useEffect(() => {
    if (isMenuOpen && sidebarRef.current) {
      gsap.to(sidebarRef.current, {
        x: 0,
        duration: 0.5,
        ease: 'power3.out'
      })
      if (menuItemsRef.current.length > 0) {
        gsap.fromTo(menuItemsRef.current.filter(el => el !== null),
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, delay: 0.2, ease: 'power2.out' }
        )
      }
    } else if (!isMenuOpen && sidebarRef.current) {
      gsap.to(sidebarRef.current, {
        x: '100%',
        duration: 0.4,
        ease: 'power3.in'
      })
    }
  }, [isMenuOpen])

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isHomePage ? 'home-page' : ''} ${isHomePage && !isScrolled ? 'home-transparent' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <span className="logo-icon" style={{ fontSize: '2.2rem' }}>📰</span>
          <span className="logo-text">SnapNews</span>
        </div>
        
        <ul className="nav-menu-desktop">
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

        <div className={`nav-toggle ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && <div className="sidebar-overlay" onClick={() => setIsMenuOpen(false)} />}

      {/* Right Side Drawer */}
      <div ref={sidebarRef} className="sidebar-drawer">
        <div className="sidebar-content">
          {navItems.map((item, index) => (
            <div 
              key={index} 
              ref={el => { menuItemsRef.current[index] = el }}
              className="sidebar-item"
            >
              <Link 
                href={item.href} 
                className={`sidebar-link ${pathname === item.href ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            </div>
          ))}
          <div 
            ref={el => { menuItemsRef.current[navItems.length] = el }}
            className="sidebar-item"
          >
            <button 
              onClick={() => { handleTryNow(); setIsMenuOpen(false); }} 
              className="sidebar-cta-btn"
            >
              Try Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
