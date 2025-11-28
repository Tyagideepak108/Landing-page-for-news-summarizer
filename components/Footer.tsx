'use client';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <span className="footer-logo">📰</span>
          <span className="footer-name">NewsSummarizer</span>
        </div>
        
        <div className="footer-links">
          <a href="/" className="footer-link">Home</a>
          <a href="/about" className="footer-link">About</a>
          <a href="/services" className="footer-link">Services</a>
          <a href="/contact" className="footer-link">Contact</a>
        </div>
        
        <div className="footer-powered">
          <span>Powered by</span>
          <span className="footer-powered-brand">PRL</span>
        </div>
      </div>
    </footer>
  );
}