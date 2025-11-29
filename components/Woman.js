import React, { useRef, useEffect, Suspense } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

function WomanModel(props) {
  const modelRef = useRef()
  const { scene, animations } = useGLTF('/models/free_018_kana_sitting.glb')
  const { actions } = useAnimations(animations, modelRef)
  
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      actions[Object.keys(actions)[0]].play()
    }
  }, [actions])
  
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
    }
  })
  
  return <primitive ref={modelRef} object={scene} {...props} />
}

export default function Woman(props) {
  return (
    <Suspense fallback={null}>
      <WomanModel {...props} />
    </Suspense>
  )
}