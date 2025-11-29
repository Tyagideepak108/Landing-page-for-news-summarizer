'use client';

import { useEffect, useRef, useState } from 'react';
import Navigation from '../../components/Navigation';
import PageArrival from '../../components/PageArrival';
import Footer from '../../components/Footer';
import './contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focusedField, setFocusedField] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const globeRef = useRef<HTMLDivElement>(null);

  const faqs = [
    { q: 'Is it free?', a: 'Yes! Our basic plan is completely free with up to 10 summaries per day.' },
    { q: 'How accurate is it?', a: 'Our AI achieves 99% accuracy using advanced NLP and machine learning algorithms.' },
    { q: 'What languages are supported?', a: 'Currently English, with Spanish, French, and German coming soon.' },
    { q: 'Can I export summaries?', a: 'Yes, you can export as PDF, Word documents, or share directly via email.' }
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
    const globe = globeRef.current;
    if (globe) {
      let rotation = 0;
      const animate = () => {
        rotation += 0.5;
        globe.style.transform = `rotateY(${rotation}deg)`;
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Message sent! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      <PageArrival />
      <div className="contact-container">
        <div className="contact-overlay"></div>
        
        <Navigation />
        
        <div className="contact-content">
          {/* Split Screen Layout */}
          <section className="contact-split-section">
            <div className="contact-split-container">
              <div className="contact-grid">
                
                {/* Left Side - Info */}
                <div className="contact-info">
                  <div className="contact-header">
                    <h1>Let's Talk</h1>
                    <p>Have questions? We'd love to hear from you.</p>
                  </div>

                  {/* Contact Info */}
                  <div className="contact-info-items">
                    <div className="contact-info-item">
                      <div className="contact-icon">
                        <span>📧</span>
                      </div>
                      <div className="contact-info-text">
                        <p>Email</p>
                        <p>hello@newssummarizer.com</p>
                      </div>
                    </div>
                    
                    <div className="contact-info-item">
                      <div className="contact-icon">
                        <span>💼</span>
                      </div>
                      <div className="contact-info-text">
                        <p>LinkedIn</p>
                        <p>@newssummarizer</p>
                      </div>
                    </div>
                  </div>

                  {/* 3D Globe */}
                  <div className="contact-globe-wrapper">
                    <div className="contact-globe">
                      <div ref={globeRef} className="contact-globe-inner">
                        <div className="contact-globe-ring"></div>
                        <div className="contact-globe-icon">🌐</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Form */}
                <div className="contact-form-wrapper">
                  <form onSubmit={handleSubmit} className="contact-form">
                    <h2>Send Message</h2>

                    {/* Name Field */}
                    <div className="contact-input-group">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField('')}
                        placeholder="Your Name"
                        className="contact-input"
                        required
                      />
                      <div className={`contact-input-underline ${
                        focusedField === 'name' || formData.name ? 'w-full' : 'w-0'
                      }`}></div>
                    </div>

                    {/* Email Field */}
                    <div className="contact-input-group">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField('')}
                        placeholder="Your Email"
                        className="contact-input"
                        required
                      />
                      <div className={`contact-input-underline ${
                        focusedField === 'email' || formData.email ? 'w-full' : 'w-0'
                      }`}></div>
                    </div>

                    {/* Message Field */}
                    <div className="contact-input-group">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField('')}
                        placeholder="Your Message"
                        rows={3}
                        className="contact-textarea"
                        required
                      ></textarea>
                      <div className={`contact-input-underline ${
                        focusedField === 'message' || formData.message ? 'w-full' : 'w-0'
                      }`}></div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="contact-submit-btn">
                      Send Message
                    </button>
                  </form>
                </div>

              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="contact-faq-section">
            <div className="contact-faq-container">
              <h2 className="contact-faq-title">
                Frequently Asked Questions
              </h2>
              
              <div className="contact-faq-list">
                {faqs.map((faq, index) => (
                  <div key={index} className="contact-faq-item">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="contact-faq-question"
                    >
                      <span>{faq.q}</span>
                      <span className={`contact-faq-icon ${openFaq === index ? 'open' : ''}`}>
                        +
                      </span>
                    </button>
                    
                    <div className={`contact-faq-answer ${openFaq === index ? 'open' : 'closed'}`}>
                      <div className="contact-faq-answer-text">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                ))}
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