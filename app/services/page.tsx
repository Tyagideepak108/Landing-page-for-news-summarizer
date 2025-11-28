'use client';

import { useEffect, useRef, useState } from 'react';
import Navigation from '../../components/Navigation';
import PageArrival from '../../components/PageArrival';
import Footer from '../../components/Footer';

export default function Services() {
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const statsRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const stats = [
    { target: 10000, suffix: '+', label: 'Articles Summarized' },
    { target: 500, suffix: '+', label: 'Active Users' },
    { target: 99, suffix: '%', label: 'Accuracy Rate' },
    { target: 24, suffix: '/7', label: 'Available' }
  ];

  const features = [
    { icon: '⚡', title: 'Instant Summarization', desc: 'AI-powered text summarization in seconds' },
    { icon: '🕐', title: 'History Tracking', desc: 'Track all your reading progress' },
    { icon: '📥', title: 'Export Options', desc: 'Download as PDF, Word, or share' },
    { icon: '🌍', title: 'Multi-Language', desc: 'Support for multiple languages' },
    { icon: '🎯', title: 'Smart Analysis', desc: 'Deep content understanding' },
    { icon: '🔒', title: 'Secure & Private', desc: 'Your data stays protected' }
  ];

  useEffect(() => {
    document.body.style.background = 'url("/models/background4.png") no-repeat center center fixed';
    document.body.style.backgroundSize = 'cover';
    
    return () => {
      document.body.style.background = '';
      document.body.style.backgroundSize = '';
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isStatsVisible) {
          setIsStatsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [isStatsVisible]);

  const animateCounters = () => {
    stats.forEach((stat, index) => {
      let current = 0;
      const increment = stat.target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.target) {
          current = stat.target;
          clearInterval(timer);
        }
        setCounters(prev => {
          const newCounters = [...prev];
          newCounters[index] = Math.floor(current);
          return newCounters;
        });
      }, 30);
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt((entry.target as HTMLElement).dataset.index || '0');
            setTimeout(() => {
              setVisibleCards(prev => {
                if (!prev.includes(index)) {
                  return [...prev, index];
                }
                return prev;
              });
            }, index * 200);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <PageArrival />
      <div className="min-h-screen text-white relative">
        <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>
        
        <Navigation />
        
        <div className="pt-20 relative z-10">
          {/* Hero Section */}
          <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto text-center">
              <h1 className="text-6xl md:text-8xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                Powerful AI Tools
              </h1>
              <p className="text-2xl md:text-3xl text-gray-300" style={{ fontFamily: 'Poppins, sans-serif' }}>
                More than just summarizing.
              </p>
            </div>
          </section>

          {/* Stats Ticker */}
          <section ref={statsRef} className="py-16 px-4 border-t border-b border-gray-700 bg-black bg-opacity-30">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {stats.map((stat, index) => (
                  <div key={index} className="transition-transform duration-300 hover:-translate-y-2">
                    <div className="text-4xl md:text-5xl font-bold mb-2" 
                         style={{ fontFamily: 'Playfair Display, serif', color: '#00CED1' }}>
                      {counters[index]}{stat.suffix}
                    </div>
                    <p className="text-gray-300 text-sm md:text-base" 
                       style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Cards Grid */}
          <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {features.map((feature, index) => {
                  const isVisible = visibleCards.includes(index);
                  
                  return (
                    <div
                      key={index}
                      ref={el => cardsRef.current[index] = el}
                      data-index={index}
                      className="bg-gray-800 bg-opacity-80 backdrop-blur-lg border border-gray-600 rounded-xl p-8 min-h-80 flex flex-col items-center text-center cursor-pointer transition-all duration-500 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20 hover:-translate-y-2"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: `translateY(${isVisible ? 0 : 50}px) scale(${isVisible ? 1 : 0.9})`,
                        filter: isVisible ? 'blur(0px)' : 'blur(3px)',
                        transition: 'all 0.6s ease'
                      }}
                    >
                      {/* Icon */}
                      <div className="text-5xl mb-6" 
                           style={{ 
                             opacity: isVisible ? 1 : 0,
                             transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                             transition: 'all 0.8s ease',
                             transitionDelay: `${index * 0.1 + 0.2}s`
                           }}>
                        {feature.icon}
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-bold mb-4" 
                          style={{ 
                            fontFamily: 'Playfair Display, serif', 
                            color: '#00CED1',
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
                            transition: 'all 0.8s ease',
                            transitionDelay: `${index * 0.1 + 0.4}s`
                          }}>
                        {feature.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-300 leading-relaxed" 
                         style={{ 
                           fontFamily: 'Poppins, sans-serif',
                           opacity: isVisible ? 1 : 0,
                           transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                           transition: 'all 0.8s ease',
                           transitionDelay: `${index * 0.1 + 0.6}s`
                         }}>
                        {feature.desc}
                      </p>
                    </div>
                  );
                })}

              </div>
            </div>
          </section>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </>
  );
}