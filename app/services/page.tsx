'use client';

import { useEffect, useRef, useState } from 'react';
import Navigation from '../../components/Navigation';
import PageArrival from '../../components/PageArrival';
import Footer from '../../components/Footer';
import './services.css';

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
    document.body.style.background = 'url("/models/background6.png") no-repeat center center fixed';
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
      <div className="services-container">
        <div className="services-overlay"></div>
        
        <Navigation />
        
        <div className="services-content">
          {/* Hero Section */}
          <section className="services-hero">
            <div className="services-hero-content">
              <h1>Powerful AI Tools</h1>
              <p>More than just summarizing.</p>
            </div>
          </section>

          {/* Stats Ticker */}
          <section ref={statsRef} className="services-stats">
            <div className="services-stats-container">
              <div className="services-stats-grid">
                {stats.map((stat, index) => (
                  <div key={index} className="services-stat-item">
                    <div className="services-stat-number">
                      {counters[index]}{stat.suffix}
                    </div>
                    <p className="services-stat-label">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Cards Grid */}
          <section className="services-cards">
            <div className="services-cards-container">
              <div className="services-cards-grid">
                
                {features.map((feature, index) => {
                  const isVisible = visibleCards.includes(index);
                  
                  return (
                    <div
                      key={index}
                      ref={el => { cardsRef.current[index] = el; }}
                      data-index={index}
                      className="services-card"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: `translateY(${isVisible ? 0 : 50}px) scale(${isVisible ? 1 : 0.9})`,
                        filter: isVisible ? 'blur(0px)' : 'blur(3px)'
                      }}
                    >
                      <div className="services-card-icon" 
                           style={{ 
                             opacity: isVisible ? 1 : 0,
                             transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                             transition: 'all 0.8s ease',
                             transitionDelay: `${index * 0.1 + 0.2}s`
                           }}>
                        {feature.icon}
                      </div>
                      
                      <h3 className="services-card-title" 
                          style={{ 
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
                            transition: 'all 0.8s ease',
                            transitionDelay: `${index * 0.1 + 0.4}s`
                          }}>
                        {feature.title}
                      </h3>
                      
                      <p className="services-card-desc" 
                         style={{ 
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