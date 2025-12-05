'use client'

import Navigation from '../../components/Navigation'
import PageTransition from '../../components/PageTransition'
import PageArrival from '../../components/PageArrival'
import ZigZagSection from '../../components/ZigZagSection'
import Footer from '../../components/Footer'

export const dynamic = 'force-dynamic'

export default function AboutPage() {
  return (
    <>
      <PageArrival />
      <Navigation />
      <PageTransition>
        <div style={{
          minHeight: '100vh',
          background: 'url("/models/background6.png") no-repeat center center fixed',
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
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #D4AF37 0%, #F4E4B7 50%, #D4AF37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1rem',
              textAlign: 'center',
              padding: '0 1rem'
            }}>
              About SnapNews
            </h1>
            <div style={{
              width: 'clamp(60px, 15vw, 100px)',
              height: '3px',
              background: 'linear-gradient(90deg, #D4AF37, #F4E4B7, #D4AF37)',
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
