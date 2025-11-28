import { useEffect, useState } from 'react';

export default function ResponsiveWrapper({ children }) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Initial setup
    updateDimensions();
    setIsMounted(true);

    // Add event listeners
    window.addEventListener('resize', updateDimensions);
    window.addEventListener('orientationchange', () => {
      setTimeout(updateDimensions, 100); // Delay for orientation change
    });

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('orientationchange', updateDimensions);
    };
  }, []);

  // Don't render until mounted to prevent hydration issues
  if (!isMounted) {
    return <div style={{ width: '100vw', height: '100vh', background: 'white' }} />;
  }

  return (
    <div 
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        overflow: 'hidden',
        touchAction: 'none',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      {children}
    </div>
  );
}