'use client'

import { useEffect, useRef, useState } from 'react'

export default function ZigZagSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
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

    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ padding: '4rem 0', maxWidth: '1200px', margin: '0 auto' }}>
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
              gridTemplateColumns: '1fr 1fr',
              gap: '4rem',
              alignItems: 'center',
              marginBottom: index === content.length - 1 ? '0' : '6rem',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {isEven ? (
              <>
                {/* Image Left */}
                <div style={{
                  overflow: 'hidden',
                  borderRadius: '12px',
                  transform: isVisible ? 'scale(1)' : 'scale(1.1)',
                  transition: 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
                }}>
                  <img
                    src={item.image}
                    alt={item.heading}
                    style={{
                      width: '100%',
                      height: '350px',
                      objectFit: 'cover',
                      borderRadius: '12px'
                    }}
                  />
                </div>
                
                {/* Text Right */}
                <div style={{
                  transform: isVisible ? 'translateX(0)' : 'translateX(60px)',
                  opacity: isVisible ? 1 : 0,
                  transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.3s'
                }}>
                  <h2 style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '2.8rem',
                    color: '#00CED1',
                    marginBottom: '1.5rem',
                    lineHeight: '1.2'
                  }}>
                    {item.heading}
                  </h2>
                  <p style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.2rem',
                    color: '#ffffff',
                    lineHeight: '1.8',
                    opacity: 0.9
                  }}>
                    {item.paragraph}
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* Text Left */}
                <div style={{
                  transform: isVisible ? 'translateX(0)' : 'translateX(-60px)',
                  opacity: isVisible ? 1 : 0,
                  transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.3s'
                }}>
                  <h2 style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '2.8rem',
                    color: '#00CED1',
                    marginBottom: '1.5rem',
                    lineHeight: '1.2'
                  }}>
                    {item.heading}
                  </h2>
                  <p style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.2rem',
                    color: '#ffffff',
                    lineHeight: '1.8',
                    opacity: 0.9
                  }}>
                    {item.paragraph}
                  </p>
                </div>
                
                {/* Image Right */}
                <div style={{
                  overflow: 'hidden',
                  borderRadius: '12px',
                  transform: isVisible ? 'scale(1)' : 'scale(1.1)',
                  transition: 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
                }}>
                  <img
                    src={item.image}
                    alt={item.heading}
                    style={{
                      width: '100%',
                      height: '350px',
                      objectFit: 'cover',
                      borderRadius: '12px'
                    }}
                  />
                </div>
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}