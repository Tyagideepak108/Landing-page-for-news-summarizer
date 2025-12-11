import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Woman from './Woman'
import Chair from './Chair'
import Newspaper from './Newspaper'
import FlyingNewspapers from './FlyingNewspapers'
import TunnelAnimation from './TunnelAnimation'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

export default function HeroScene({ tunnelActive = false }) {
  const canvasRef = useRef()
  const sceneRef = useRef()
  const staticPaperRef = useRef()
  const flyingPapersRef = useRef()
  const text1Ref = useRef()
  const text2Ref = useRef()

  const [scrollY, setScrollY] = useState(0);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setViewport({ width, height });
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  const getScaleFactors = () => {
    if (isMobile) {
      return {
        scene: 0.5,
        text: 0.6,
        camera: { x: 0.8, y: 1.2, z: 1.4 },
        movement: 0.5
      };
    } else if (isTablet) {
      return {
        scene: 0.75,
        text: 0.8,
        camera: { x: 0.9, y: 1.0, z: 1.2 },
        movement: 0.7
      };
    }
    return {
      scene: 1,
      text: 1,
      camera: { x: 1, y: 1, z: 1 },
      movement: 1
    };
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function AnimationController() {
    useFrame((state) => {
      const staticPaper = staticPaperRef.current;
      const flyingPapers = flyingPapersRef.current;
      const scene = sceneRef.current;
      const text1 = text1Ref.current;
      const text2 = text2Ref.current;
      
      if (!staticPaper || !flyingPapers || !scene) return;
      
      const time = state.clock.elapsedTime;
      const windowHeight = window.innerHeight;
      const scales = getScaleFactors();
      
      const scrollProgress = Math.min(scrollY / windowHeight, 1);
      state.camera.position.z = 4 + (scrollProgress * 4);
      state.camera.position.y = 1.5 + (scrollProgress * 1.5);
      
      const mouseX = (state.mouse.x * 0.3);
      const mouseY = (state.mouse.y * 0.3);
      state.camera.position.x += (mouseX - state.camera.position.x) * 0.05;
      state.camera.position.y += (mouseY - state.camera.position.y) * 0.05;
      
      state.camera.lookAt(0, 0, 0);
      
      scene.rotation.y = -Math.PI / 2;
      
      if (scrollY < windowHeight) {
        const scrollProgress = scrollY / windowHeight;
        const baseScale = scales.scene * 1.5;
        const zoomOutScale = baseScale * (1 - scrollProgress * 0.3);
        scene.scale.setScalar(zoomOutScale);
      }
      
      if (staticPaper && scrollY < windowHeight * 0.5) {
        staticPaper.rotation.z = -0.05 + Math.sin(time * 3) * 0.05;
        staticPaper.position.y = 0.37 + Math.sin(time * 2) * 0.01;
        staticPaper.rotation.x = 0.14 + Math.cos(time * 1.5) * 0.02;
      }
      
      if (scrollY > windowHeight * 0.3) {
        const progress = Math.min((scrollY - windowHeight * 0.3) / (windowHeight * 0.2), 1);
        const scale = 1 - progress;
        staticPaper.scale.set(scale, scale, scale);
      } else {
        staticPaper.scale.set(1, 1, 1);
      }
      
      if (scrollY > windowHeight * 0.3) {
        flyingPapers.visible = true;
        
        const progress = Math.min((scrollY - windowHeight * 0.3) / (windowHeight * 0.7), 1);
        const scrollPercent = (scrollY / (document.documentElement.scrollHeight - windowHeight)) * 100;
        
        flyingPapers.children.forEach((paper, i) => {
          const startX = 0;
          const startY = 0.5;
          const startZ = 0;
          
          const angle = (i / 3) * Math.PI * 2;
          const spread = progress * 5;
          
          paper.position.x = startX + (Math.cos(angle) * spread);
          paper.position.y = startY + (Math.sin(angle) * spread * 0.5);
          paper.position.z = startZ - (progress * 2);
          
          const targetScale = 0.5 + (progress * 3.5);
          paper.scale.setScalar(targetScale);
          
          if (scrollPercent >= 60) {
            paper.rotation.x = Math.sin(time * 0.3 + i) * 0.02;
            paper.rotation.y = Math.cos(time * 0.3 + i) * 0.02;
            paper.rotation.z = Math.sin(time * 0.2 + i) * 0.015;
          }
        });
      } else {
        flyingPapers.visible = false;
      }
    });
    
    return null;
  } 

  return (
    <Canvas
      ref={canvasRef}
      shadows
      camera={{ 
        position: [0, 1.5 * getScaleFactors().camera.y, 4 * getScaleFactors().camera.z], 
        fov: isMobile ? 50 : isTablet ? 55 : 50
      }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
      style={{ 
        height: '100vh', 
        width: '100vw', 
        position: 'fixed', 
        top: 0, 
        left: 0,
        pointerEvents: 'none',
        zIndex: 10
      }}
    >
      <fog attach="fog" args={['#0a0a0a', 10, 40]} />
      
      <ambientLight intensity={0.2} color="#f0f8ff" />
      
      <directionalLight 
        position={[8, 10, 6]} 
        intensity={1.2} 
        castShadow 
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      <pointLight position={[-4, 3, 4]} intensity={0.4} color="#D4AF37" />
      <pointLight position={[4, 2, -3]} intensity={0.3} color="#FFFFFF" />
      
      <spotLight 
        position={[-15, 20, -10]} 
        angle={0.5} 
        penumbra={1} 
        intensity={2.5} 
        color="#D4AF37" 
        distance={50}
      />
      <spotLight 
        position={[15, 20, -10]} 
        angle={0.5} 
        penumbra={1} 
        intensity={2.5} 
        color="#FFFFFF" 
        distance={50}
      />
      <spotLight 
        position={[0, 25, -15]} 
        angle={0.6} 
        penumbra={1} 
        intensity={1.8} 
        color="#808080" 
        distance={50}
      />
      
      <pointLight position={[0, 1, 0]} intensity={0.4} color="#D4AF37" distance={5} />
      <pointLight position={[-2, 0.3, 2]} intensity={0.3} color="#808080" distance={3} />
      <pointLight position={[2, 0.3, -2]} intensity={0.3} color="#FFFFFF" distance={3} />
      
      <spotLight 
        position={[0, 6, -5]} 
        intensity={0.5} 
        angle={Math.PI / 3}
        penumbra={0.5}
        color="#D4AF37"
      />
      
      <group ref={sceneRef} visible={!tunnelActive} onPointerDown={(e) => e.stopPropagation()}>
        <mesh 
          position-y={-0.75} 
          rotation-x={-Math.PI / 2} 
          receiveShadow
        >
          <circleGeometry args={[1.5, 32]} />
          <meshPhysicalMaterial 
            color="#1a1a1a"
            roughness={0.3}
            metalness={0.7}
            emissive="#D4AF37"
            emissiveIntensity={0.15}
          />
        </mesh>
        
        <Chair scale={1.0} position={[0, -0.75, 0]} castShadow />
        
        <Woman 
          scale={0.01} 
          position={[-0.02, -0.74, -0.13]} 
          rotation={[-0.01, 1.41, 0.08]}
          castShadow
        />
        
        <group ref={staticPaperRef}>
          <Newspaper 
            scale={0.45} 
            position={[0.03, -0.03, 0.12]} 
            rotation={[0.12, 1.48, -0.06]} 
          />
        </group>
      </group>
      
      <FlyingNewspapers ref={flyingPapersRef} visible={!tunnelActive && false} />
      
      <TunnelAnimation isActive={tunnelActive} />
      
      <AnimationController />
    </Canvas>
  )
}
