'use client'

import Navigation from '../../components/Navigation'
import PageTransition from '../../components/PageTransition'
import PageArrival from '../../components/PageArrival'
import ZigZagSection from '../../components/ZigZagSection'
import Footer from '../../components/Footer'

export default function AboutPage() {
  return (
    <>
      <PageArrival />
      <Navigation />
      <PageTransition>
        <div style={{
          minHeight: '100vh',
          background: 'url("/models/background4.png") no-repeat center center fixed',
          backgroundSize: 'cover',
          padding: 'clamp(5rem, 15vw, 8rem) clamp(1rem, 3vw, 2rem) 4rem',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.6)',
            zIndex: 1
          }} />
          <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 8vw, 5rem)',
              fontFamily: 'Playfair Display, serif',
              color: '#FFFFFF',
              marginBottom: '1rem',
              textAlign: 'center',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
              padding: '0 1rem'
            }}>
              About SnapNews
            </h1>
            <div style={{
              width: 'clamp(60px, 15vw, 100px)',
              height: '3px',
              background: '#00CED1',
              margin: '0 auto clamp(2rem, 5vw, 3rem)',
              borderRadius: '2px'
            }} />
          
            <ZigZagSection />
          </div>
        </div>
      </PageTransition>
      
      {/* Footer */}
      <Footer />
    </>
  )
}
