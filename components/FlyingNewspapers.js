import React, { useMemo, forwardRef } from 'react'
import { useGLTF } from '@react-three/drei'

// Single paper instance - no animation
function PaperInstance({ ...props }) {
  const { scene } = useGLTF('/models/newspaper (2).glb')
  
  scene.traverse((child) => { 
    if (child.isMesh) child.castShadow = true 
  })

  return <primitive object={scene.clone()} {...props} />
}

// Main component - 3 newspapers
const FlyingNewspapers = forwardRef(({ count = 4, ...props }, ref) => {
  const papers = useMemo(() => {
    return [
      { position: [0, 0, 0], rotation: [0, 0, 0] },
      { position: [0, 0, 0], rotation: [0, 0.5, 0] },
      { position: [0, 0, 0], rotation: [0, -0.5, 0] }
    ]
  }, [])

  return (
    <group ref={ref} {...props}>
      {papers.map((paper, i) => (
        <PaperInstance 
          key={i}
          position={paper.position} 
          rotation={paper.rotation} 
          scale={0.9}
        />
      ))}
    </group>
  )
})

FlyingNewspapers.displayName = 'FlyingNewspapers'
export default FlyingNewspapers