'use client';

import { useEffect, useState, useRef } from 'react';
import { IoNewspaperOutline } from 'react-icons/io5';
import { FaChartBar, FaUsers, FaClock, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import Navigation from '../../components/Navigation';
import PageArrival from '../../components/PageArrival';
import Footer from '../../components/Footer';
import './about.css';

export const dynamic = 'force-dynamic';

export default function AboutPage() {
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const stats = [
    { target: 10000, suffix: '+', label: 'Articles Summarized', icon: IoNewspaperOutline },
    { target: 99, suffix: '%', label: 'Accuracy Rate', icon: FaChartBar },
    { target: 500, suffix: '+', label: 'Active Users', icon: FaUsers },
    { target: 24, suffix: '/7', label: 'Available', icon: FaClock }
  ];

  const timeline = [
    { year: '2023', title: 'Inception', desc: 'The idea was born to revolutionize news consumption' },
    { year: '2023', title: 'Development', desc: 'Built AI-powered summarization engine with NLP' },
    { year: '2024', title: 'Beta Launch', desc: 'Released beta version to early adopters' },
    { year: '2024', title: 'Growth', desc: 'Reached 500+ users and 10K+ summaries' }
  ];

  useEffect(() => {
    document.body.style.background = 'url("/models/background7.png") no-repeat center center fixed';
    document.body.style.backgroundSize = 'cover';
    
    return () => {
      document.body.style.background = '';
      document.body.style.backgroundSize = '';
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    stats.forEach((stat, index) => {
      let current = 0;
      const increment = stat.target / 60;
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

  return (
    <>
      <PageArrival />
      <div className="about-container">
        <div className="about-overlay"></div>
        
        <Navigation />
        
        <div className="about-content">
          {/* Hero Section */}
          <section className="about-hero">
            <h1 className="about-hero-title">About SnapNews</h1>
            <p className="about-hero-subtitle">Transforming how you consume news with AI</p>
          </section>

          {/* Stats Section with Animated Counters */}
          <section ref={statsRef} className="about-stats">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-icon"><stat.icon /></div>
                  <div className="stat-number">
                    {counters[index].toLocaleString()}{stat.suffix}
                  </div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Journey Timeline */}
          <section className="about-timeline">
            <h2 className="timeline-title">Our Journey</h2>
            <div className="timeline-container">
              {timeline.map((item, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="timeline-year">{item.year}</div>
                    <h3 className="timeline-heading">{item.title}</h3>
                    <p className="timeline-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Meet the Developer Card */}
          <section className="about-developer">
            <h2 className="developer-title">Meet the Developer</h2>
            <div className="developer-card">
              <div className="developer-glow"></div>
              <div className="developer-content">
                <div className="developer-avatar">
                  <div className="avatar-circle">👨‍💻</div>
                </div>
                <div className="developer-info">
                  <h3 className="developer-name">PRL Team</h3>
                  <p className="developer-role">Full Stack Developer & AI Enthusiast</p>
                  <p className="developer-bio">
                    Passionate about leveraging AI to solve real-world problems. 
                    Built SnapNews to help people stay informed without information overload.
                  </p>
                  <div className="developer-social">
                    <a href="#" className="dev-social-link"><FaLinkedin /> LinkedIn</a>
                    <a href="#" className="dev-social-link"><FaGithub /> GitHub</a>
                    <a href="#" className="dev-social-link"><FaTwitter /> Twitter</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </>
  );
}
