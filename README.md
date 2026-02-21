# 📰 SnapNews - AI-Powered News Summarization Platform

🚀 **Live Website:** [https://snap-news-summarizer-news.vercel.app/](https://snap-news-summarizer-news.vercel.app/)

A stunning 3D interactive landing page with modern UI/UX, built with Next.js, Three.js, and professional animations.

## ✨ Key Features

### 🎨 **Visual & Interactive**
- **3D Hero Scene** - Interactive woman reading newspaper with realistic lighting
- **Newspaper Page Flip Loader** - Animated loading screen with flipping newspaper pages
- **Tunnel Animation** - Immersive star field tunnel effect with synced audio
- **3D Tilt Effects** - Mouse-follow tilt on service cards, pricing cards, and contact forms
- **Glassmorphism UI** - Modern frosted glass effects throughout

### 🎯 **Navigation & Layout**
- **Transparent Navbar** - Adaptive navbar (transparent on home, solid on scroll for other pages)
- **Right-Side Drawer** - Mobile menu slides from right with GSAP staggered animations
- **Smooth Page Transitions** - GSAP-powered page transitions
- **Fully Responsive** - Optimized for mobile, tablet, and desktop

### 📄 **Pages**

#### **Home Page**
- 3D interactive hero section with woman reading newspaper
- Hero text with gold gradient and pulse animations
- Scroll text and Get Started button
- Tunnel animation redirects to external app

#### **About Page**
- **Animated Stats Counters** - Numbers count up from 0 using Intersection Observer
- **Vertical Timeline** - Journey milestones with glowing dots and hover effects
- **Developer Card** - Glowing border animation with rotating gradient
- Professional icons from React Icons library

#### **Services Page**
- **4 Service Cards** - 3D tilt effect on hover with expandable content
- **Pricing Section** - Free vs Pro plans with "Recommended" badge
- **Interactive Cards** - Hover to reveal features and "Learn More" button
- "Start Free" button redirects to external app

#### **Contact Page**
- **Split-Screen Layout** - Info cards on left, form on right
- **Floating Label Inputs** - Material Design style with gold animation
- **3D Tilt Effects** - Both info cards and form tilt on mouse movement
- **Bottom Border Animation** - Gold gradient border animates on focus

#### **Footer**
- **4-Column Layout** - Brand Info, Quick Links, Legal, Newsletter
- **Newsletter Subscription** - Email input with subscribe button
- **Social Media Icons** - Professional React Icons (Facebook, Twitter, Instagram, LinkedIn)
- **Responsive Design** - Adapts to single column on mobile

## 🎨 Design System

### **Color Palette**
- **Primary Gold:** `#D4AF37`
- **Light Gold:** `#F4E4B7`
- **Dark Gold:** `#B8941E`
- **Black:** `#000000`
- **White:** `#FFFFFF`

### **Typography**
- **Font Family:** Montserrat (300-900 weights)
- **Headings:** Bold with gold gradients
- **Body Text:** Clean and readable

### **Icons**
- **Library:** React Icons (Font Awesome, Material Design, Ionicons)
- **Usage:** Professional scalable icons throughout all pages

## 🛠️ Tech Stack

### **Core**
- **Framework:** Next.js 14.2.33
- **Language:** TypeScript, JavaScript
- **Styling:** CSS3, Tailwind CSS 4

### **3D & Animation**
- **3D Graphics:** Three.js, React Three Fiber
- **3D Helpers:** @react-three/drei
- **Animations:** GSAP 3.13.0
- **Smooth Scroll:** Lenis

### **Icons & UI**
- **Icons:** React Icons
- **Effects:** Glassmorphism, 3D Tilt, Floating Labels

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd cinematic-frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 🚀 Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
cinematic-frontend/
├── app/
│   ├── about/
│   │   ├── page.tsx          # About page with timeline & stats
│   │   └── about.css         # About page styles
│   ├── services/
│   │   ├── page.tsx          # Services with 3D tilt cards
│   │   └── services.css      # Services page styles
│   ├── contact/
│   │   ├── page.tsx          # Contact with floating labels
│   │   └── contact.css       # Contact page styles
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── components/
│   ├── Navigation.tsx        # Navbar with drawer
│   ├── Navigation.css        # Navbar styles
│   ├── Footer.tsx            # 4-column footer
│   ├── Footer.css            # Footer styles
│   ├── HeroScene.js          # Main 3D scene
│   ├── HeroText.tsx          # Hero section text
│   ├── TunnelAnimation.js    # Tunnel effect with audio
│   ├── LoadingScreen.js      # Newspaper flip loader
│   ├── Woman.js              # 3D woman model
│   ├── Chair.js              # 3D chair model
│   ├── Newspaper.js          # 3D newspaper model
│   └── ...
├── public/
│   └── models/
│       ├── *.glb             # 3D models
│       ├── tunnel_audio.mp3  # Tunnel sound effect
│       └── background7.png   # Background image
└── package.json
```

## 🎮 Key Components

### **3D Components**
- **HeroScene** - Main 3D scene with lighting and camera
- **Woman** - Animated 3D woman model
- **Chair** - Leather armchair model
- **Newspaper** - Interactive newspaper model
- **TunnelAnimation** - Star field tunnel with audio sync

### **UI Components**
- **Navigation** - Transparent navbar with right-side drawer
- **Footer** - Professional 4-column footer with newsletter
- **LoadingScreen** - Newspaper page flip animation
- **HeroText** - Gold gradient text with pulse animation

### **Interactive Elements**
- **3D Tilt Cards** - Mouse-follow perspective effect
- **Floating Labels** - Material Design input fields
- **Animated Counters** - Stats count up on scroll
- **Timeline** - Vertical journey with milestones

## 🎯 Features Breakdown

### **Animations**
- GSAP page transitions
- Staggered menu animations
- Pulse effects on buttons
- Count-up number animations
- 3D tilt on mouse movement
- Newspaper flip loading

### **Interactions**
- Mouse-follow 3D tilt
- Floating label inputs
- Expandable service cards
- Hover state transitions
- Scroll-based navbar changes

### **Performance**
- Lazy loading 3D models with Suspense
- Optimized particle count (1500 stars)
- Reduced DPR for better performance
- Tree-shakeable icon imports
- Next.js 14 optimizations

## 🔗 External Links

- **Main App:** [https://suvidha-text-summarizer.vercel.app/](https://suvidha-text-summarizer.vercel.app/)
- Accessible via "Start Free" button and tunnel animation

## 🎨 Design Highlights

- **Gold Theme** - Professional gold/white/black color scheme
- **Montserrat Font** - Clean, modern typography throughout
- **Glassmorphism** - Frosted glass effects on cards and navbar
- **3D Depth** - Perspective transforms and shadows
- **Smooth Animations** - 60fps animations with GSAP

## 📱 Responsive Design

- **Desktop (>1200px)** - Full 4-column layouts
- **Tablet (768-1200px)** - 2-column layouts
- **Mobile (<768px)** - Single column, hamburger menu
- **Touch Optimized** - Mobile-friendly interactions

## 🔧 Configuration

### **Next.js Config**
- App Router enabled
- SWC minification
- React Strict Mode
- Optimized for production

### **Dependencies**
```json
{
  "next": "^14.2.0",
  "react": "^18.2.0",
  "three": "^0.159.0",
  "@react-three/fiber": "^8.18.0",
  "@react-three/drei": "^9.122.0",
  "gsap": "^3.13.0",
  "react-icons": "latest",
  "lenis": "^1.3.14"
}
```

## 📝 License

All rights reserved © 2026 SnapNews

## 💡 Powered by PRL

---

**Made with ❤️ using Next.js, Three.js, GSAP, and React Icons**

🚀 **Live Website:** [https://snap-news-summarizer-news.vercel.app/](https://snap-news-summarizer-news.vercel.app/)
📧 **Contact:** tyagideepak1007@gmail.com

