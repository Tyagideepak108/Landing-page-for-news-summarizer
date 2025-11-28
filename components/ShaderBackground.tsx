'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vec2 st = vUv * 3.0 + uMouse * 0.1;
    
    // Starfield
    float stars = 0.0;
    for(int i = 0; i < 3; i++) {
      float layer = float(i) + 1.0;
      vec2 starPos = st * layer * 10.0;
      float star = random(floor(starPos));
      star = step(0.99, star) * (sin(uTime * layer + star * 10.0) * 0.5 + 0.5);
      stars += star / layer;
    }
    
    // City glow
    float glow = noise(st * 2.0 + uTime * 0.1);
    glow += noise(st * 4.0 - uTime * 0.15) * 0.5;
    glow = smoothstep(0.3, 0.8, glow);
    
    // Colors
    vec3 indigo = vec3(0.102, 0.125, 0.212);
    vec3 cyan = vec3(0.0, 1.0, 1.0);
    
    vec3 color = indigo;
    color += cyan * stars * 0.8;
    color += cyan * glow * 0.15;
    
    gl_FragColor = vec4(color, 1.0);
  }
`

export default function ShaderBackground() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) }
  }), [])

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      material.uniforms.uTime.value = state.clock.elapsedTime
      material.uniforms.uMouse.value.x = state.mouse.x
      material.uniforms.uMouse.value.y = state.mouse.y
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <planeGeometry args={[50, 50]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}
