import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Chair(props) {
  const { scene } = useGLTF('/models/armchair__leather.glb')
  
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
    }
  })
  
  return <primitive object={scene} {...props} />
}