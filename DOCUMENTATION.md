# 📚 SnapNews - Complete Technical Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture](#architecture)
4. [Component Documentation](#component-documentation)
5. [3D Implementation](#3d-implementation)
6. [Animation System](#animation-system)
7. [Styling & Design](#styling--design)
8. [Performance Optimization](#performance-optimization)
9. [Deployment](#deployment)

---

## 1. Project Overview

### 1.1 Purpose
SnapNews is a modern, interactive 3D landing page for an AI-powered news summarization platform. It showcases cutting-edge web technologies including Three.js for 3D graphics, GSAP for animations, and Next.js for optimal performance.

### 1.2 Key Objectives
- Create an immersive 3D experience
- Provide smooth, professional animations
- Ensure responsive design across all devices
- Optimize performance for fast loading
- Implement modern UI/UX patterns

---

## 2. Technology Stack

### 2.1 Core Framework
**Next.js 14.2.33**
- **Why:** Server-side rendering, automatic code splitting, optimized performance
- **Features Used:**
  - App Router (app directory)
  - Server Components
  - Client Components ('use client')
  - Dynamic imports for code splitting
  - Image optimization
  - Font optimization (Google Fonts)

### 2.2 Programming Languages
**TypeScript & JavaScript**
- **TypeScript:** Used for type-safe components (Navigation.tsx, HeroText.tsx)
- **JavaScript:** Used for 3D components (HeroScene.js, TunnelAnimation.js)
- **Why Mix:** Three.js components work better with JS, UI components benefit from TS type safety

### 2.3 3D Graphics Stack

#### **Three.js (v0.159.0)**
- Core 3D rendering library
- WebGL-based 3D graphics
- Scene management, cameras, lights, materials

#### **React Three Fiber (v8.18.0)**
- React renderer for Three.js
- Declarative 3D scene creation
- React hooks for Three.js
- Automatic memory management

#### **@react-three/drei (v9.122.0)**
- Helper components for R3F
- **Used Components:**
  - `OrbitControls` - Camera controls
  - `useGLTF` - 3D model loading
  - `Sphere` - Geometric primitives
  - `PerspectiveCamera` - Camera setup

### 2.4 Animation Libraries

#### **GSAP 3.13.0 (GreenSock Animation Platform)**
- Professional-grade animation library
- **Features Used:**
  - Timeline animations
  - Stagger effects (menu items)
  - Easing functions (power3.out, power2.out)
  - Transform animations (x, y, rotation, scale)
  - Opacity transitions

#### **Lenis 1.3.14**
- Smooth scroll library
- Momentum-based scrolling
- Better than native scroll

### 2.5 UI Libraries

#### **React Icons**
- 10,000+ icons from popular libraries
- **Libraries Used:**
  - Font Awesome (FaBolt, FaChartLine, FaGlobe, FaLock)
  - Material Design (MdEmail, MdLocationOn, MdBusiness)
  - Ionicons (IoNewspaperOutline)
- Tree-shakeable (only imports used icons)

### 2.6 Styling

#### **CSS3**
- Custom CSS modules
- CSS Grid & Flexbox
- CSS Animations & Transitions
- CSS Variables for theming

#### **Tailwind CSS 4**
- Utility-first CSS framework
- Responsive design utilities
- Custom configuration

---

## 3. Architecture

### 3.1 Next.js App Router Structure

```
app/
├── layout.tsx              # Root layout (wraps all pages)
├── page.tsx                # Home page (/)
├── globals.css             # Global styles
├── about/
│   ├── page.tsx           # About page (/about)
│   └── about.css          # About-specific styles
├── services/
│   ├── page.tsx           # Services page (/services)
│   └── services.css       # Services-specific styles
└── contact/
    ├── page.tsx           # Contact page (/contact)
    └── contact.css        # Contact-specific styles
```

### 3.2 Component Architecture

```
components/
├── Navigation/            # Navigation system
│   ├── Navigation.tsx    # Main navbar component
│   └── Navigation.css    # Navbar styles
├── 3D/                   # 3D components
│   ├── HeroScene.js      # Main 3D scene
│   ├── Woman.js          # Woman 3D model
│   ├── Chair.js          # Chair 3D model
│   ├── Newspaper.js      # Newspaper 3D model
│   └── TunnelAnimation.js # Tunnel effect
├── UI/                   # UI components
│   ├── HeroText.tsx      # Hero section text
│   ├── Footer.tsx        # Footer component
│   └── LoadingScreen.js  # Loading animation
└── Shared/               # Shared utilities
    ├── PageTransition.tsx
    └── PageArrival.tsx
```

### 3.3 Data Flow

```
User Interaction
    ↓
React Component (State Update)
    ↓
Re-render with new state
    ↓
GSAP/Three.js Animation
    ↓
Visual Update
```

---

## 4. Component Documentation

### 4.1 Navigation Component

**File:** `components/Navigation.tsx`

**Purpose:** Responsive navigation bar with mobile drawer

**Key Features:**
- Transparent on home page, solid on scroll
- Right-side sliding drawer for mobile
- GSAP staggered animations
- Active page highlighting

**State Management:**
```typescript
const [isMenuOpen, setIsMenuOpen] = useState(false)      // Drawer state
const [isScrolled, setIsScrolled] = useState(false)      // Scroll detection
const pathname = usePathname()                            // Current route
```

**Scroll Detection:**
```typescript
useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50)  // Trigger at 50px scroll
  }
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```

**GSAP Drawer Animation:**
```typescript
gsap.to(sidebarRef.current, {
  x: 0,                    // Slide in from right
  duration: 0.5,           // 500ms animation
  ease: 'power3.out'       // Smooth easing
})

gsap.fromTo(menuItemsRef.current,
  { opacity: 0, x: 50 },   // Start state
  { 
    opacity: 1, 
    x: 0, 
    duration: 0.4, 
    stagger: 0.1,          // 100ms delay between items
    delay: 0.2,            // Wait for drawer to open
    ease: 'power2.out' 
  }
)
```

### 4.2 HeroScene Component

**File:** `components/HeroScene.js`

**Purpose:** Main 3D scene with woman reading newspaper

**Three.js Setup:**
```javascript
<Canvas
  camera={{ position: [0, 1, 5], fov: 50 }}  // Camera config
  gl={{ 
    antialias: false,                          // Disabled for performance
    powerPreference: 'high-performance' 
  }}
  dpr={[1, 1.5]}                              // Device pixel ratio limit
>
```

**Lighting System:**
```javascript
// Ambient light - overall scene illumination
<ambientLight intensity={0.5} color="#D4AF37" />

// Spotlight - focused light on woman
<spotLight
  position={[5, 5, 5]}
  angle={0.3}
  penumbra={1}
  intensity={1.5}
  castShadow
  color="#D4AF37"
/>

// Point lights - accent lighting
<pointLight position={[-5, 3, -5]} intensity={0.8} color="#F4E4B7" />
<pointLight position={[5, 3, 5]} intensity={0.6} color="#D4AF37" />
```

**3D Models:**
```javascript
// Woman model with Suspense for lazy loading
<Suspense fallback={null}>
  <Woman position={[0, -1, 0]} scale={1} />
</Suspense>

// Chair model
<Suspense fallback={null}>
  <Chair position={[0, -1, 0]} scale={1.2} />
</Suspense>

// Newspaper model (scaled and positioned)
<Suspense fallback={null}>
  <Newspaper 
    position={[0.2, 0.3, 0.5]} 
    scale={0.45}           // Increased to hide hand
    rotation={[0, -0.3, 0]} 
  />
</Suspense>
```

### 4.3 TunnelAnimation Component

**File:** `components/TunnelAnimation.js`

**Purpose:** Immersive star field tunnel with audio

**Particle System:**
```javascript
const STAR_COUNT = 1500  // Optimized from 3000

// Generate random star positions
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
```

**Animation Loop:**
```javascript
useFrame((state) => {
  particles.forEach((particle, i) => {
    particle.z += speedRef.current * 2.5  // Move towards camera
    
    if (particle.z > 25) {                // Reset if too close
      particle.z = -250
      particle.x = (Math.random() - 0.5) * 120
      particle.y = (Math.random() - 0.5) * 120
    }
    
    // Stretch effect based on speed
    const stretch = Math.max(1, speedRef.current * 4)
    dummy.scale.set(opacity, opacity, stretch)
  })
})
```

**Audio Synchronization:**
```javascript
// Play audio when tunnel starts
audioRef.current = new Audio('/models/tunnel_audio.mp3')
audioRef.current.volume = 0.7
audioRef.current.play()

// Fade out audio before redirect
const fadeOut = setInterval(() => {
  if (audioRef.current.volume > 0.1) {
    audioRef.current.volume -= 0.1
  } else {
    audioRef.current.pause()
    clearInterval(fadeOut)
  }
}, 50)
```

**Speed Progression:**
```javascript
// Ease in (0-1200ms): Accelerate to 70
const easedProgress = easeInOutQuart(progress)
speedRef.current = easedProgress * 70

// Peak (1200-1800ms): Maximum speed 80
speedRef.current = 80

// Flash effect (1500-1800ms): White screen fade in
const flashProgress = (elapsed - 1500) / 300
setFlash(easeOutQuart(Math.min(1, flashProgress)))

// Redirect (1800ms): Navigate to external app
window.location.href = 'https://suvidha-text-summarizer.vercel.app/'
```

### 4.4 LoadingScreen Component

**File:** `components/LoadingScreen.js`

**Purpose:** Newspaper page flip loading animation

**Flip Animation:**
```javascript
const [flipPage, setFlipPage] = useState(false)

// Flip every 2 seconds
const headlineInterval = setInterval(() => {
  setFlipPage(true)              // Trigger flip
  setTimeout(() => {
    setHeadline(headlines[...])  // Change headline
    setFlipPage(false)           // Reset flip
  }, 600)                        // 600ms flip duration
}, 2000)
```

**CSS 3D Transform:**
```css
.newspaper-page {
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.newspaper-page.flipping {
  transform: rotateY(180deg);  /* Flip 180 degrees */
}

.newspaper-front,
.newspaper-back {
  backface-visibility: hidden;  /* Hide back side */
}

.newspaper-back {
  transform: rotateY(180deg);   /* Pre-rotate back side */
}
```

**Progress Animation:**
```javascript
// Slower progress for more flips
const interval = setInterval(() => {
  setProgress(prev => {
    if (prev >= 100) {
      clearInterval(interval)
      setTimeout(() => setIsVisible(false), 800)
      return 100
    }
    return prev + 1  // Increment by 1% (slower)
  })
}, 80)  // Every 80ms
```

### 4.5 About Page - Animated Counters

**File:** `app/about/page.tsx`

**Purpose:** Stats that count up when scrolled into view

**Intersection Observer:**
```typescript
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true)
        animateCounters()
      }
    },
    { threshold: 0.3 }  // Trigger when 30% visible
  )
  
  if (statsRef.current) {
    observer.observe(statsRef.current)
  }
  
  return () => observer.disconnect()
}, [hasAnimated])
```

**Counter Animation:**
```typescript
const animateCounters = () => {
  stats.forEach((stat, index) => {
    let current = 0
    const increment = stat.target / 60  // 60 steps
    
    const timer = setInterval(() => {
      current += increment
      if (current >= stat.target) {
        current = stat.target
        clearInterval(timer)
      }
      
      setCounters(prev => {
        const newCounters = [...prev]
        newCounters[index] = Math.floor(current)
        return newCounters
      })
    }, 30)  // Update every 30ms (smooth animation)
  })
}
```

### 4.6 Services Page - 3D Tilt Effect

**File:** `app/services/page.tsx`

**Purpose:** Cards that tilt towards mouse cursor

**Mouse Movement Calculation:**
```typescript
const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  
  // Get mouse position relative to card
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  // Calculate center point
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  // Calculate rotation angles (divided by 10 for subtle effect)
  const rotateX = (y - centerY) / 10
  const rotateY = (centerX - x) / 10
  
  // Apply 3D transform
  card.style.transform = `
    perspective(1000px) 
    rotateX(${rotateX}deg) 
    rotateY(${rotateY}deg) 
    scale(1.05)
  `
}
```

**Reset on Mouse Leave:**
```typescript
const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
  const card = e.currentTarget
  card.style.transform = `
    perspective(1000px) 
    rotateX(0deg) 
    rotateY(0deg) 
    scale(1)
  `
}
```

**CSS Setup:**
```css
.service-card {
  transform-style: preserve-3d;  /* Enable 3D transforms */
  transition: all 0.3s ease;     /* Smooth transitions */
  cursor: pointer;
}
```

### 4.7 Contact Page - Floating Labels

**File:** `app/contact/page.tsx`

**Purpose:** Material Design style input fields

**State Management:**
```typescript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  subject: '',
  message: ''
})
const [focusedField, setFocusedField] = useState('')
```

**Label Animation Logic:**
```tsx
<div className="floating-input">
  <input
    type="text"
    name="name"
    id="name"
    value={formData.name}
    onChange={handleInputChange}
    onFocus={() => setFocusedField('name')}
    onBlur={() => setFocusedField('')}
    required
  />
  <label 
    htmlFor="name" 
    className={`form-label ${
      formData.name || focusedField === 'name' ? 'active' : ''
    }`}
  >
    Your Name
  </label>
  <div className={`form-underline ${
    focusedField === 'name' ? 'focused' : ''
  }`}></div>
</div>
```

**CSS Animation:**
```css
.form-label {
  position: absolute;
  left: 0;
  top: 1.2rem;
  transition: all 0.3s ease;
}

.form-label.active {
  top: 0;                    /* Move up */
  font-size: 0.75rem;        /* Shrink */
  color: #D4AF37;            /* Change color */
  font-weight: 600;
}

.form-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #D4AF37, #F4E4B7, #D4AF37);
  transition: width 0.4s ease;
}

.form-underline.focused {
  width: 100%;               /* Expand to full width */
}
```

### 4.8 Footer Component

**File:** `components/Footer.tsx`

**Purpose:** Professional 4-column footer with newsletter

**Newsletter Subscription:**
```typescript
const [email, setEmail] = useState('')

const handleSubscribe = (e: React.FormEvent) => {
  e.preventDefault()
  alert(`Subscribed with: ${email}`)
  setEmail('')
}
```

**Responsive Grid:**
```css
.footer-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);  /* 4 columns */
  gap: 3rem;
}

@media (max-width: 1200px) {
  .footer-container {
    grid-template-columns: repeat(2, 1fr);  /* 2 columns */
  }
}

@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;  /* 1 column */
    text-align: center;
  }
}
```

---

## 5. 3D Implementation

### 5.1 Model Loading

**GLB Format:**
- Binary format of glTF (GL Transmission Format)
- Optimized for web delivery
- Includes geometry, materials, textures, animations

**Loading with useGLTF:**
```javascript
import { useGLTF } from '@react-three/drei'

function Woman(props) {
  const { scene } = useGLTF('/models/women_sitting_animated.glb')
  return <primitive object={scene} {...props} />
}

// Preload for better performance
useGLTF.preload('/models/women_sitting_animated.glb')
```

### 5.2 Camera Configuration

**Perspective Camera:**
```javascript
camera={{ 
  position: [0, 1, 5],  // x, y, z coordinates
  fov: 50,              // Field of view (degrees)
  near: 0.1,            // Near clipping plane
  far: 1000             // Far clipping plane
}}
```

**FOV Impact:**
- Lower FOV (35°) = Telephoto lens (narrow view)
- Higher FOV (50°) = Wide angle lens (broader view)
- Changed from 35° to 50° for better scene visibility

### 5.3 Lighting Strategy

**Three-Point Lighting:**
1. **Key Light** (Spotlight) - Main illumination
2. **Fill Light** (Point Light) - Softens shadows
3. **Rim Light** (Point Light) - Separates subject from background

**Gold Theme Lighting:**
```javascript
// All lights use gold color palette
<ambientLight color="#D4AF37" />
<spotLight color="#D4AF37" />
<pointLight color="#F4E4B7" />
```

### 5.4 Performance Optimization

**Reduced Antialiasing:**
```javascript
gl={{ antialias: false }}  // Saves GPU resources
```

**Limited DPR:**
```javascript
dpr={[1, 1.5]}  // Max 1.5x device pixel ratio
```

**Instanced Meshes:**
```javascript
<instancedMesh args={[undefined, undefined, STAR_COUNT]}>
  // Renders 1500 stars with single draw call
</instancedMesh>
```

---

## 6. Animation System

### 6.1 GSAP Timeline

**Sequential Animations:**
```javascript
const tl = gsap.timeline()

tl.to('.element1', { opacity: 1, duration: 0.5 })
  .to('.element2', { x: 100, duration: 0.3 })
  .to('.element3', { scale: 1.2, duration: 0.4 })
```

### 6.2 Easing Functions

**Power Easing:**
- `power1` - Subtle easing
- `power2` - Moderate easing
- `power3` - Strong easing
- `power4` - Very strong easing

**Direction:**
- `.in` - Slow start, fast end
- `.out` - Fast start, slow end
- `.inOut` - Slow start and end

**Example:**
```javascript
ease: 'power3.out'  // Strong easing, fast start
```

### 6.3 Stagger Effect

**Sequential Delay:**
```javascript
gsap.fromTo(elements,
  { opacity: 0, x: 50 },
  { 
    opacity: 1, 
    x: 0,
    stagger: 0.1  // 100ms delay between each element
  }
)
```

### 6.4 CSS Animations

**Keyframe Animation:**
```css
@keyframes pulse {
  0%, 100% {
    box-shadow: 0 10px 30px rgba(212,175,55,0.4);
  }
  50% {
    box-shadow: 0 10px 40px rgba(212,175,55,0.7);
  }
}

.button {
  animation: pulse 2s ease-in-out infinite;
}
```

---

## 7. Styling & Design

### 7.1 CSS Variables

**Theme Colors:**
```css
:root {
  --gold: #D4AF37;
  --gold-light: #F4E4B7;
  --gold-dark: #B8941E;
  --black: #000000;
  --white: #FFFFFF;
}
```

**Usage:**
```css
.element {
  color: var(--gold);
  background: var(--black);
}
```

### 7.2 Glassmorphism Effect

**Recipe:**
```css
.glass-card {
  background: rgba(0, 0, 0, 0.7);           /* Semi-transparent */
  backdrop-filter: blur(30px);              /* Blur background */
  -webkit-backdrop-filter: blur(30px);      /* Safari support */
  border: 2px solid rgba(212, 175, 55, 0.3); /* Subtle border */
  border-radius: 20px;                      /* Rounded corners */
}
```

### 7.3 Gradient Text

**Gold Gradient:**
```css
.gradient-text {
  background: linear-gradient(135deg, #D4AF37, #F4E4B7, #D4AF37);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### 7.4 Responsive Typography

**Clamp Function:**
```css
.heading {
  font-size: clamp(2rem, 8vw, 5rem);
  /* min: 2rem, preferred: 8vw, max: 5rem */
}
```

### 7.5 Grid Layouts

**Auto-Fit Grid:**
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
```

---

## 8. Performance Optimization

### 8.1 Code Splitting

**Dynamic Imports:**
```javascript
const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,  // Disable server-side rendering
  loading: () => <LoadingScreen />
})
```

### 8.2 Lazy Loading

**React Suspense:**
```javascript
<Suspense fallback={<Loader />}>
  <Woman />
</Suspense>
```

### 8.3 Image Optimization

**Next.js Image:**
```javascript
import Image from 'next/image'

<Image
  src="/background.png"
  alt="Background"
  width={1920}
  height={1080}
  priority  // Load immediately
/>
```

### 8.4 Font Optimization

**Google Fonts:**
```css
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');
```

**Display Swap:**
- Shows fallback font immediately
- Swaps to web font when loaded
- Prevents invisible text

### 8.5 Bundle Size

**Tree Shaking:**
```javascript
// Only imports used icons
import { FaBolt, FaChartLine } from 'react-icons/fa'
```

**Reduced Dependencies:**
- Removed unused libraries
- Optimized particle count
- Minimized 3D model sizes

---

## 9. Deployment

### 9.1 Build Process

**Production Build:**
```bash
npm run build
```

**Output:**
- Optimized JavaScript bundles
- Minified CSS
- Compressed images
- Static HTML pages

### 9.2 Vercel Deployment

**Configuration:**
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install"
}
```

**Environment Variables:**
- Set in Vercel dashboard
- Accessed via `process.env`

### 9.3 Performance Metrics

**Core Web Vitals:**
- **LCP** (Largest Contentful Paint) < 2.5s
- **FID** (First Input Delay) < 100ms
- **CLS** (Cumulative Layout Shift) < 0.1

**Optimization Techniques:**
- Lazy loading 3D models
- Code splitting
- Image optimization
- Font preloading
- Reduced JavaScript bundle

---

## 10. Browser Compatibility

### 10.1 Supported Browsers

**Desktop:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Mobile:**
- iOS Safari 14+
- Chrome Android 90+
- Samsung Internet 14+

### 10.2 WebGL Support

**Requirements:**
- WebGL 2.0 support
- Hardware acceleration enabled
- Minimum 2GB RAM

**Fallback:**
- Show message if WebGL unavailable
- Provide alternative 2D experience

---

## 11. Troubleshooting

### 11.1 Common Issues

**3D Models Not Loading:**
- Check file path in `/public/models/`
- Verify GLB file format
- Check browser console for errors

**Animations Not Working:**
- Ensure GSAP installed: `npm install gsap`
- Check for JavaScript errors
- Verify ref elements exist

**Performance Issues:**
- Reduce particle count
- Lower DPR setting
- Disable antialiasing
- Use lower quality 3D models

### 11.2 Debug Mode

**Enable Logging:**
```javascript
console.log('Component mounted')
console.log('State:', state)
console.log('Props:', props)
```

**React DevTools:**
- Install browser extension
- Inspect component tree
- Monitor state changes
- Profile performance

---

## 12. Future Enhancements

### 12.1 Planned Features
- Dark/Light theme toggle
- Multi-language support
- Advanced 3D interactions
- Real-time news integration
- User authentication
- Analytics dashboard

### 12.2 Performance Improvements
- WebP image format
- Service worker caching
- Progressive Web App (PWA)
- Skeleton loading screens
- Intersection Observer for lazy loading

---

## 13. Credits & Resources

### 13.1 Libraries
- Next.js - https://nextjs.org/
- Three.js - https://threejs.org/
- GSAP - https://greensock.com/gsap/
- React Icons - https://react-icons.github.io/react-icons/

### 13.2 Assets
- 3D Models - Custom GLB files
- Fonts - Google Fonts (Montserrat)
- Icons - React Icons library
- Audio - Custom tunnel sound effect

---

## 14. Contact & Support

**Developer:** PRL Team
**Email:** tyagideepak1007@gmail.com
**Live Demo:** https://snap-news-summarizer-news.vercel.app/
**Repository:** [Your GitHub URL]

---

**Last Updated:** December 2025
**Version:** 1.0.0
**License:** All Rights Reserved © 2026 SnapNews
