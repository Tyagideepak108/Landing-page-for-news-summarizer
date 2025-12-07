'use client';
import { useState } from 'react';
import { IoNewspaperOutline } from 'react-icons/io5';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-container">
          
          {/* Column 1: Brand Info */}
          <div className="footer-column">
            <div className="footer-brand">
              <IoNewspaperOutline className="footer-logo" />
              <span className="footer-name">SnapNews</span>
            </div>
            <p className="footer-description">
              AI-powered news summarization platform delivering instant, accurate news insights in seconds.
            </p>
            <div className="footer-social">
              <a href="#" className="social-icon" aria-label="Facebook"><FaFacebook /></a>
              <a href="#" className="social-icon" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" className="social-icon" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" className="social-icon" aria-label="LinkedIn"><FaLinkedin /></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-column">
            <h3 className="footer-heading">Quick Links</h3>
            <div className="footer-links">
              <a href="/" className="footer-link">Home</a>
              <a href="/about" className="footer-link">About Us</a>
              <a href="/services" className="footer-link">Services</a>
              <a href="/contact" className="footer-link">Contact</a>
              <a href="#" className="footer-link">Blog</a>
              <a href="#" className="footer-link">FAQ</a>
            </div>
          </div>

          {/* Column 3: Legal */}
          <div className="footer-column">
            <h3 className="footer-heading">Legal</h3>
            <div className="footer-links">
              <a href="#" className="footer-link">Privacy Policy</a>
              <a href="#" className="footer-link">Terms of Service</a>
              <a href="#" className="footer-link">Cookie Policy</a>
              <a href="#" className="footer-link">Disclaimer</a>
              <a href="#" className="footer-link">GDPR</a>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="footer-column">
            <h3 className="footer-heading">Newsletter</h3>
            <p className="newsletter-text">
              Subscribe to get the latest news and updates delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <div className="newsletter-input-wrapper">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-btn">
                  Subscribe
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="footer-copyright">
            © 2026 SnapNews. All rights reserved.
          </p>
          <div className="footer-powered">
            <span>Powered by</span>
            <span className="footer-powered-brand">PRL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
