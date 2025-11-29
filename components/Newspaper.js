import React, { Suspense } from 'react'
import { useGLTF } from '@react-three/drei'

function NewspaperModel(props) {
  const { scene } = useGLTF('/models/newspaper (2).glb')
  
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
    }
  })
  
  return <primitive object={scene} {...props} />
}

export default function Newspaper(props) {
  return (
    <Suspense fallback={null}>
      <NewspaperModel {...props} />
    </Suspense>
  )
}