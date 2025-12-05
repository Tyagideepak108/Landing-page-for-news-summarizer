'use client'

import { useEffect, useRef, useState } from 'react'

export default function ZigZagSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  const content = [
    {
      heading: "Our Mission",
      paragraph: "We believe that staying informed shouldn't be time-consuming. Our AI-powered platform transforms lengthy articles and news into concise, easy-to-digest summaries, helping you stay updated without the information overload.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&crop=faces"
    },
    {
      heading: "How It Works", 
      paragraph: "Using advanced natural language processing and machine learning algorithms, our system analyzes articles, identifies key points, and generates accurate summaries in seconds. Simply paste a link or text, and let our AI do the heavy lifting.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop"
    },
    {
      heading: "Why Choose Us",
      paragraph: "Lightning-fast processing, accurate contextual summaries, and complete privacy protection. Our platform works on any device and is completely free to use. We're committed to making information accessible for everyone.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop"
    }
  ]

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0')
          if (entry.isIntersecting) {
            setVisibleItems(prev => [...prev.filter(i => i !== index), index])
          }
        })
      },
      { threshold: 0.3 }
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div style={{ padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
      {content.map((item, index) => {
        const isEven = index % 2 === 0
        const isVisible = visibleItems.includes(index)
        
        return (
          <div
            key={index}
            ref={(el) => { itemRefs.current[index] = el }}
            data-index={index}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? '2rem' : '4rem',
              alignItems: 'center',
              marginBottom: index === content.length - 1 ? '0' : (isMobile ? '3rem' : '6rem'),
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {/* Image */}
            <div style={{
              overflow: 'hidden',
              borderRadius: '12px',
              transform: isVisible ? 'scale(1)' : 'scale(1.1)',
              transition: 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
              order: isMobile ? 1 : (isEven ? 1 : 2)
            }}>
              <img
                src={item.image}
                alt={item.heading}
                style={{
                  width: '100%',
                  height: isMobile ? '250px' : '350px',
                  objectFit: 'cover',
                  borderRadius: '12px'
                }}
              />
            </div>
            
            {/* Text */}
            <div style={{
              transform: isVisible ? 'translateX(0)' : (isMobile ? 'translateY(20px)' : (isEven ? 'translateX(60px)' : 'translateX(-60px)')),
              opacity: isVisible ? 1 : 0,
              transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
              order: isMobile ? 2 : (isEven ? 2 : 1)
            }}>
              <h2 style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: isMobile ? 'clamp(1.8rem, 5vw, 2.5rem)' : '2.8rem',
                fontWeight: 700,
                color: '#D4AF37',
                marginBottom: '1rem',
                lineHeight: '1.2'
              }}>
                {item.heading}
              </h2>
              <p style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: isMobile ? 'clamp(0.95rem, 2.5vw, 1.1rem)' : '1.2rem',
                fontWeight: 400,
                color: '#ffffff',
                lineHeight: '1.8',
                opacity: 0.95
              }}>
                {item.paragraph}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}