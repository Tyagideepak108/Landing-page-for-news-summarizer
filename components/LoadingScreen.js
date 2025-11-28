'use client'

import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import './LoadingScreen.css'

function Logo3D() {
  return (
    <mesh rotation={[0, 0, 0]}>
      <torusKnotGeometry args={[1, 0.3, 128, 16]} />
      <meshStandardMaterial color="#00d4ff" metalness={0.8} roughness={0.2} />
    </mesh>
  )
}

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsVisible(false), 300)
          return 100
        }
        return prev + 5
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  return (
    <div className={`loading-screen ${progress === 100 ? 'fade-out' : ''}`}>
      <div className="loading-canvas">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Logo3D />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={4} />
        </Canvas>
      </div>
      <div className="loading-content">
        <h1 className="loading-title">News Summarizer</h1>
        <div className="loading-bar">
          <div className="loading-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="loading-percentage">{progress}%</p>
      </div>
    </div>
  )
}
