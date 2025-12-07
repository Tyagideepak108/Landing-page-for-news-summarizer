'use client';

import { useEffect, useState } from 'react';
import { MdEmail, MdLocationOn, MdBusiness } from 'react-icons/md';
import { FaArrowRight } from 'react-icons/fa';
import Navigation from '../../components/Navigation';
import PageArrival from '../../components/PageArrival';
import Footer from '../../components/Footer';
import './contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [focusedField, setFocusedField] = useState('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  useEffect(() => {
    document.body.style.background = 'url("/models/background7.png") no-repeat center center fixed';
    document.body.style.backgroundSize = 'cover';
    
    return () => {
      document.body.style.background = '';
      document.body.style.backgroundSize = '';
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Message sent! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      <PageArrival />
      <div className="contact-container">
        <div className="contact-overlay"></div>
        
        <Navigation />
        
        <div className="contact-content">
          <div className="contact-split">
            
            {/* Left Column - Info & Globe */}
            <div className="contact-left">
              <h1 className="contact-title">Get In Touch</h1>
              <p className="contact-subtitle">We're here to help and answer any questions</p>
              
              <div className="contact-info-cards">
                <div 
                  className="info-card"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="info-icon"><MdEmail /></div>
                  <div className="info-text">
                    <h4>Email</h4>
                    <p>hello@snapnews.com</p>
                  </div>
                </div>
                <div 
                  className="info-card"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="info-icon"><MdLocationOn /></div>
                  <div className="info-text">
                    <h4>Global Reach</h4>
                    <p>Available Worldwide</p>
                  </div>
                </div>
                <div 
                  className="info-card"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="info-icon"><MdBusiness /></div>
                  <div className="info-text">
                    <h4>LinkedIn</h4>
                    <p>@snapnews</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form with Floating Labels */}
            <div className="contact-right">
              <div 
                className="contact-form-wrapper"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <form onSubmit={handleSubmit} className="contact-form">
                <h2 className="form-title">Send Us a Message</h2>

                {/* Floating Label Input - Name */}
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
                    className="form-input"
                  />
                  <label 
                    htmlFor="name" 
                    className={`form-label ${formData.name || focusedField === 'name' ? 'active' : ''}`}
                  >
                    Your Name
                  </label>
                  <div className={`form-underline ${focusedField === 'name' ? 'focused' : ''}`}></div>
                </div>

                {/* Floating Label Input - Email */}
                <div className="floating-input">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    required
                    className="form-input"
                  />
                  <label 
                    htmlFor="email" 
                    className={`form-label ${formData.email || focusedField === 'email' ? 'active' : ''}`}
                  >
                    Email Address
                  </label>
                  <div className={`form-underline ${focusedField === 'email' ? 'focused' : ''}`}></div>
                </div>

                {/* Floating Label Input - Subject */}
                <div className="floating-input">
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField('')}
                    required
                    className="form-input"
                  />
                  <label 
                    htmlFor="subject" 
                    className={`form-label ${formData.subject || focusedField === 'subject' ? 'active' : ''}`}
                  >
                    Subject
                  </label>
                  <div className={`form-underline ${focusedField === 'subject' ? 'focused' : ''}`}></div>
                </div>

                {/* Floating Label Textarea - Message */}
                <div className="floating-input">
                  <textarea
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField('')}
                    required
                    rows={4}
                    className="form-textarea"
                  ></textarea>
                  <label 
                    htmlFor="message" 
                    className={`form-label ${formData.message || focusedField === 'message' ? 'active' : ''}`}
                  >
                    Your Message
                  </label>
                  <div className={`form-underline ${focusedField === 'message' ? 'focused' : ''}`}></div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="form-submit-btn">
                  <span>Send Message</span>
                  <FaArrowRight className="btn-arrow" />
                </button>
              </form>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}
