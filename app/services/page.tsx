'use client';

import { useEffect, useRef, useState } from 'react';
import { FaBolt, FaChartLine, FaGlobe, FaLock, FaCheck } from 'react-icons/fa';
import Navigation from '../../components/Navigation';
import PageArrival from '../../components/PageArrival';
import Footer from '../../components/Footer';
import './services.css';

export default function Services() {
  const services = [
    { 
      icon: FaBolt, 
      title: 'Instant Summarization', 
      desc: 'AI-powered text summarization in seconds with advanced NLP algorithms',
      features: ['Real-time processing', 'Multiple formats', 'Smart extraction']
    },
    { 
      icon: FaChartLine, 
      title: 'Smart Analysis', 
      desc: 'Deep content understanding with sentiment analysis and key insights',
      features: ['Sentiment detection', 'Topic modeling', 'Entity recognition']
    },
    { 
      icon: FaGlobe, 
      title: 'Multi-Language', 
      desc: 'Support for 50+ languages with automatic translation capabilities',
      features: ['Auto-detect language', 'Cross-language summary', 'Native support']
    },
    { 
      icon: FaLock, 
      title: 'Secure & Private', 
      desc: 'Enterprise-grade security with end-to-end encryption',
      features: ['Data encryption', 'Privacy first', 'GDPR compliant']
    }
  ];

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      features: ['10 summaries/day', 'Basic analysis', 'Email support', '5 languages'],
      recommended: false
    },
    {
      name: 'Pro',
      price: '$19',
      period: '/month',
      features: ['Unlimited summaries', 'Advanced AI analysis', 'Priority support', '50+ languages', 'Export to PDF/Word', 'API access'],
      recommended: true
    }
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  const handlePlanClick = (planName: string) => {
    if (planName === 'Free') {
      window.location.href = 'https://suvidha-text-summarizer.vercel.app/';
    }
  };

  useEffect(() => {
    document.body.style.background = 'url("/models/background7.png") no-repeat center center fixed';
    document.body.style.backgroundSize = 'cover';
    
    return () => {
      document.body.style.background = '';
      document.body.style.backgroundSize = '';
    };
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
            <h1 className="services-hero-title">Our Services</h1>
            <p className="services-hero-subtitle">Powerful AI tools to transform your reading experience</p>
          </section>

          {/* Services Cards with 3D Tilt */}
          <section className="services-section">
            <div className="services-grid">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="service-card"
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="service-card-inner">
                    <div className="service-icon"><service.icon /></div>
                    <h3 className="service-title">{service.title}</h3>
                    <div className="service-expand">
                      <p className="service-desc">{service.desc}</p>
                      <ul className="service-features">
                        {service.features.map((feature, i) => (
                          <li key={i}><FaCheck className="feature-check" /> {feature}</li>
                        ))}
                      </ul>
                      <button className="service-btn">Learn More</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing Section */}
          <section className="pricing-section">
            <h2 className="pricing-title">Choose Your Plan</h2>
            <p className="pricing-subtitle">Start free, upgrade when you need more</p>
            
            <div className="pricing-grid">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`pricing-card ${plan.recommended ? 'recommended' : ''}`}
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  onMouseLeave={handleMouseLeave}
                >
                  {plan.recommended && <div className="recommended-badge">Recommended</div>}
                  <div className="pricing-card-inner">
                    <h3 className="pricing-name">{plan.name}</h3>
                    <div className="pricing-price">
                      <span className="price-amount">{plan.price}</span>
                      <span className="price-period">{plan.period}</span>
                    </div>
                    <ul className="pricing-features">
                      {plan.features.map((feature, i) => (
                        <li key={i}>
                          <FaCheck className="feature-icon" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button 
                      className={`pricing-btn ${plan.recommended ? 'primary' : 'secondary'}`}
                      onClick={() => handlePlanClick(plan.name)}
                    >
                      {plan.recommended ? 'Get Started' : 'Start Free'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </>
  );
}
