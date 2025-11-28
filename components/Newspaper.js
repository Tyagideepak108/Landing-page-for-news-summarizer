import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Newspaper(props) {
  const { scene } = useGLTF('/models/newspaper (2).glb')
  
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
    }
  })
  
  return <primitive object={scene} {...props} />
}