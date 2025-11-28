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

// GSAP ko bata rahe hain ki hum ScrollTrigger use karenge
gsap.registerPlugin(ScrollTrigger)

export default function HeroScene({ tunnelActive = false }) {
  // refs bana le taaki hum 3D objects ko pakad sakein
  const canvasRef = useRef()
  const sceneRef = useRef()
  const staticPaperRef = useRef() // Ye 'ref' ladki ke haath waale paper ke liye hai
  const flyingPapersRef = useRef() // Ye 'ref' 15 udne waale papers ke group ke liye hai
  const text1Ref = useRef() // First 3D text
  const text2Ref = useRef() // Second 3D text

  const [scrollY, setScrollY] = useState(0);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // No GSAP ScrollTrigger needed - using useFrame instead

  // Viewport and device detection
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

  // Get responsive scale factors
  const getScaleFactors = () => {
    if (isMobile) {
      return {
        scene: 0.7,
        text: 0.6,
        camera: { x: 0.8, y: 0.8, z: 1.2 },
        movement: 0.5
      };
    } else if (isTablet) {
      return {
        scene: 0.85,
        text: 0.8,
        camera: { x: 0.9, y: 0.9, z: 1.1 },
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



  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const newScrollY = window.scrollY;
      setScrollY(newScrollY);
      console.log("📜 Scroll Y:", newScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    console.log("✅ Scroll listener added");
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Animation component with idle animations and 3D text
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
      
      // Slower camera zoom out on scroll
      const scrollProgress = Math.min(scrollY / windowHeight, 1);
      state.camera.position.z = 4 + (scrollProgress * 4);
      state.camera.position.y = 1.5 + (scrollProgress * 1.5);
      
      // Mouse parallax effect (subtle)
      const mouseX = (state.mouse.x * 0.3);
      const mouseY = (state.mouse.y * 0.3);
      state.camera.position.x += (mouseX - state.camera.position.x) * 0.05;
      state.camera.position.y += (mouseY - state.camera.position.y) * 0.05;
      
      state.camera.lookAt(0, 0, 0);
      
      // Rotate entire scene 90 degrees left
      scene.rotation.y = -Math.PI / 2;
      
      // Slower model zoom out on scroll
      if (scrollY < windowHeight) {
        const scrollProgress = scrollY / windowHeight;
        const zoomOutScale = 1.5 * (1 - scrollProgress * 0.3);
        scene.scale.setScalar(zoomOutScale);
      }
      
      // More visible newspaper flutter
      if (staticPaper && scrollY < windowHeight * 0.5) {
        staticPaper.rotation.z = -0.05 + Math.sin(time * 3) * 0.05;
        staticPaper.position.y = 0.37 + Math.sin(time * 2) * 0.01;
        staticPaper.rotation.x = 0.14 + Math.cos(time * 1.5) * 0.02;
      }
      
      // Static paper disappear on scroll
      if (scrollY > windowHeight * 0.3) {
        const progress = Math.min((scrollY - windowHeight * 0.3) / (windowHeight * 0.2), 1);
        const scale = 1 - progress;
        staticPaper.scale.set(scale, scale, scale);
      } else {
        staticPaper.scale.set(1, 1, 1);
      }
      
      // Flying papers - start from lady's hand, outside scene rotation
      if (scrollY > windowHeight * 0.3) {
        flyingPapers.visible = true;
        
        // Animation until 100vh scroll
        const progress = Math.min((scrollY - windowHeight * 0.3) / (windowHeight * 0.7), 1);
        const scrollPercent = (scrollY / (document.documentElement.scrollHeight - windowHeight)) * 100;
        
        flyingPapers.children.forEach((paper, i) => {
          // Start from center (lady's hand area after rotation)
          const startX = 0;
          const startY = 0.5;
          const startZ = 0;
          
          const angle = (i / 3) * Math.PI * 2;
          const spread = progress * 5;
          
          // Fly from hand towards camera
          paper.position.x = startX + (Math.cos(angle) * spread);
          paper.position.y = startY + (Math.sin(angle) * spread * 0.5);
          paper.position.z = startZ - (progress * 2);
          
          // Smaller scale - more visible animation
          const targetScale = 0.5 + (progress * 3.5);
          paper.scale.setScalar(targetScale);
          
          // Very subtle rotation after 60% scroll (slower)
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

  // === JSX (HTML jaisa) code ===
  return (
    <Canvas
      ref={canvasRef}
      shadows
      camera={{ 
        position: [0, 1.5 * getScaleFactors().camera.y, 4 * getScaleFactors().camera.z], 
        fov: isMobile ? 40 : isTablet ? 45 : 35
      }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
      // Canvas ko screen pe chipka de (fixed position)
      style={{ 
        height: '100vh', 
        width: '100vw', 
        position: 'fixed', 
        top: 0, 
        left: 0,
        touchAction: 'none',
        zIndex: 10
      }}
    >
      {/* Fog for Depth of Field */}
      <fog attach="fog" args={['#0a0a0a', 10, 40]} />
      
      {/* Floating Elements */}
      <mesh position={[-8, 3, -5]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#00CED1" transparent opacity={0.3} />
      </mesh>
      <mesh position={[8, 2, -3]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.4} />
      </mesh>
      <mesh position={[-10, 1, -6]} rotation={[0.5, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#00CED1" transparent opacity={0.2} wireframe />
      </mesh>
      
      {/* Enhanced lighting for depth */}
      <ambientLight intensity={0.2} color="#f0f8ff" />
      
      {/* Main directional light */}
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
      
      {/* Cinematic Fill lights */}
      <pointLight position={[-4, 3, 4]} intensity={0.4} color="#00CED1" />
      <pointLight position={[4, 2, -3]} intensity={0.3} color="#FFFFFF" />
      
      {/* Volumetric Light Beams - Deep Cyan & White */}
      <spotLight 
        position={[-15, 20, -10]} 
        angle={0.5} 
        penumbra={1} 
        intensity={2.5} 
        color="#00CED1" 
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
      
      {/* Floor dramatic lighting */}
      <pointLight position={[0, 1, 0]} intensity={0.4} color="#00CED1" distance={5} />
      <pointLight position={[-2, 0.3, 2]} intensity={0.3} color="#808080" distance={3} />
      <pointLight position={[2, 0.3, -2]} intensity={0.3} color="#FFFFFF" distance={3} />
      
      {/* Background rim light */}
      <spotLight 
        position={[0, 6, -5]} 
        intensity={0.5} 
        angle={Math.PI / 3}
        penumbra={0.5}
        color="#00CED1"
      />
      

      

      
      {/* Ye group poore scene ko rakhta hai */}
      <group ref={sceneRef} visible={!tunnelActive}>
        {/* Simple Floor under chair - Deep Cyan & Gray Theme */}
        <mesh 
          position-y={-0.75} 
          rotation-x={-Math.PI / 2} 
          receiveShadow
        >
          <circleGeometry args={[1.5, 32]} />
          <meshPhysicalMaterial 
            color="#2a2a2a"
            roughness={0.3}
            metalness={0.7}
            emissive="#00CED1"
            emissiveIntensity={0.15}
          />
        </mesh>
        
        {/* Kursi */}
        <Chair scale={1.0} position={[0, -0.75, 0]} castShadow />
        
        {/* Teri 'Woman' (correct position/scale ke saath, maine chheda nahi hai) */}
        <Woman 
          scale={0.01} 
          position={[-0.020000000000000004, -0.74, -0.12999999999999987]} 
          rotation={[-0.009999999999999998, 1.41, 0.08000000000000013]}
          castShadow
        />
        
        {/* Ladki ke haath waala paper (jo ghayab hoga) */}
        <group ref={staticPaperRef}>
          <Newspaper 
            scale={0.347} 
            position={[0.05, -0.05, 0.1]} 
            rotation={[0.15, 1.5, -0.08]} 
          />
        </group>
      </group>
      

      
      {/* Flying newspapers - initially hidden */}
      <FlyingNewspapers ref={flyingPapersRef} visible={!tunnelActive && false} />
      
      {/* Tunnel Animation */}
      <TunnelAnimation isActive={tunnelActive} />
      
      {/* Animation controller */}
      <AnimationController />
    </Canvas>
  )
}