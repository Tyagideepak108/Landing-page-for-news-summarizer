
'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const STAR_COUNT = 1500

function StarField({ speedRef, opacityRef }) {
  const mesh = useRef(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < STAR_COUNT; i++) {
      const x = (Math.random() - 0.5) * 120
      const y = (Math.random() - 0.5) * 120
      const z = -Math.random() * 250
      temp.push({ x, y, z })
    }
    return temp
  }, [])

  useFrame((state) => {
    if (!mesh.current) return

    const mat = mesh.current.material
    mat.opacity = THREE.MathUtils.lerp(mat.opacity, opacityRef.current, 0.15)

    // FOV warp effect - smoother
    const targetFov = speedRef.current > 20 ? 110 : 70
    if (state.camera.fov !== undefined) {
      state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, targetFov, 0.03)
      state.camera.updateProjectionMatrix()
    }

    // Camera shake at high speed - smoother
    if (speedRef.current > 30) {
      const shakeIntensity = Math.min((speedRef.current - 30) / 30, 1) * 0.12
      state.camera.position.x = Math.sin(state.clock.elapsedTime * 25) * shakeIntensity
      state.camera.position.y = Math.cos(state.clock.elapsedTime * 25) * shakeIntensity
    } else {
      state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, 0, 0.1)
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 0, 0.1)
    }

    particles.forEach((particle, i) => {
      particle.z += speedRef.current * 2.5

      if (particle.z > 25) {
        particle.z = -250
        particle.x = (Math.random() - 0.5) * 120
        particle.y = (Math.random() - 0.5) * 120
      }

      const stretch = Math.max(1, speedRef.current * 4)
      const distance = Math.abs(particle.z)
      const opacity = Math.max(0.3, 1 - distance / 200)
      
      dummy.position.set(particle.x, particle.y, particle.z)
      dummy.scale.set(opacity, opacity, stretch)
      dummy.updateMatrix()
      
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, STAR_COUNT]}>
      <boxGeometry args={[0.15, 0.15, 6]} />
      <meshBasicMaterial 
        color="#4A9B9B" 
        transparent 
        opacity={0}
      />
    </instancedMesh>
  )
}

export default function TunnelAnimation({ isActive }) {
  const speedRef = useRef(0)
  const opacityRef = useRef(0)
  const [flash, setFlash] = useState(0)

  useEffect(() => {
    if (!isActive) return

    const startTime = Date.now()

    const easeInOutQuart = (t) => {
      return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2
    }

    const easeOutQuart = (t) => {
      return 1 - Math.pow(1 - t, 4)
    }

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime

      if (elapsed < 1200) {
        const progress = Math.min(elapsed / 1200, 1)
        const easedProgress = easeInOutQuart(progress)
        speedRef.current = easedProgress * 70
        opacityRef.current = Math.min(1, easedProgress * 1.4)
      } 
      else if (elapsed >= 1200 && elapsed < 1800) {
        speedRef.current = 80
        
        if (elapsed > 1500) {
          const flashProgress = (elapsed - 1500) / 300
          setFlash(easeOutQuart(Math.min(1, flashProgress)))
        }
      }
      else if (elapsed >= 1800) {
        clearInterval(interval)
        if (typeof window !== 'undefined') {
          window.location.href = 'https://suvidha-text-summarizer.vercel.app/'
        }
      }
    }, 16)

    return () => clearInterval(interval)
  }, [isActive])

  if (!isActive) return null

  return (
    <>
      <color attach="background" args={['#000']} />
      
      <StarField speedRef={speedRef} opacityRef={opacityRef} />

      <ambientLight intensity={0.3} />

      {flash > 0 && (
        <mesh position={[0, 0, 5]}>
          <planeGeometry args={[200, 200]} />
          <meshBasicMaterial 
            color="white" 
            transparent 
            opacity={flash}
          />
        </mesh>
      )}
    </>
  )
}
