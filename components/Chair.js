import React, { Suspense } from 'react'
import { useGLTF } from '@react-three/drei'

function ChairModel(props) {
  const { scene } = useGLTF('/models/armchair__leather.glb')
  
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
    }
  })
  
  return <primitive object={scene} {...props} />
}

export default function Chair(props) {
  return (
    <Suspense fallback={null}>
      <ChairModel {...props} />
    </Suspense>
  )
}