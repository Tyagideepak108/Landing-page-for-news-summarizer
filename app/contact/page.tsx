'use client';

import { useEffect, useRef, useState } from 'react';
import Navigation from '../../components/Navigation';
import PageArrival from '../../components/PageArrival';
import Footer from '../../components/Footer';

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
      <div className="min-h-screen text-white relative">
        <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>
        
        <Navigation />
        
        <div className="pt-20 relative z-10">
          {/* Split Screen Layout */}
          <section className="py-12 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                
                {/* Left Side - Info */}
                <div className="space-y-6">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4" 
                        style={{ fontFamily: 'Playfair Display, serif' }}>
                      Let's Talk
                    </h1>
                    <p className="text-lg text-gray-300 mb-6" 
                       style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Have questions? We'd love to hear from you.
                    </p>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-cyan-500 bg-opacity-20 rounded-full flex items-center justify-center">
                        <span className="text-lg">📧</span>
                      </div>
                      <div>
                        <p className="text-cyan-400 font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>Email</p>
                        <p className="text-gray-300 text-sm">hello@newssummarizer.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-cyan-500 bg-opacity-20 rounded-full flex items-center justify-center">
                        <span className="text-lg">💼</span>
                      </div>
                      <div>
                        <p className="text-cyan-400 font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>LinkedIn</p>
                        <p className="text-gray-300 text-sm">@newssummarizer</p>
                      </div>
                    </div>
                  </div>

                  {/* 3D Globe */}
                  <div className="flex justify-center mt-8">
                    <div className="relative w-32 h-32">
                      <div ref={globeRef} className="w-full h-full rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 opacity-20"
                           style={{ 
                             background: 'conic-gradient(from 0deg, #00CED1, #0080FF, #00CED1)',
                             borderRadius: '50%'
                           }}>
                        <div className="absolute inset-2 rounded-full border border-cyan-400 opacity-30"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">🌐</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Form */}
                <div className="bg-gray-800 bg-opacity-40 backdrop-blur-lg border border-gray-600 rounded-xl p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-4 text-cyan-400" 
                          style={{ fontFamily: 'Playfair Display, serif' }}>
                        Send Message
                      </h2>
                    </div>

                    {/* Name Field */}
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField('')}
                        placeholder="Your Name"
                        className="w-full bg-transparent text-white placeholder-gray-400 py-2 px-0 border-0 border-b border-gray-600 focus:border-cyan-400 focus:outline-none transition-colors duration-300"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                        required
                      />
                      <div className={`absolute bottom-0 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${
                        focusedField === 'name' || formData.name ? 'w-full' : 'w-0'
                      }`}></div>
                    </div>

                    {/* Email Field */}
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField('')}
                        placeholder="Your Email"
                        className="w-full bg-transparent text-white placeholder-gray-400 py-2 px-0 border-0 border-b border-gray-600 focus:border-cyan-400 focus:outline-none transition-colors duration-300"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                        required
                      />
                      <div className={`absolute bottom-0 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${
                        focusedField === 'email' || formData.email ? 'w-full' : 'w-0'
                      }`}></div>
                    </div>

                    {/* Message Field */}
                    <div className="relative">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField('')}
                        placeholder="Your Message"
                        rows={3}
                        className="w-full bg-transparent text-white placeholder-gray-400 py-2 px-0 border-0 border-b border-gray-600 focus:border-cyan-400 focus:outline-none transition-colors duration-300 resize-none"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                        required
                      ></textarea>
                      <div className={`absolute bottom-0 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${
                        focusedField === 'message' || formData.message ? 'w-full' : 'w-0'
                      }`}></div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      Send Message
                    </button>
                  </form>
                </div>

              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-12 px-4 border-t border-gray-700">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8 text-cyan-400" 
                  style={{ fontFamily: 'Playfair Display, serif' }}>
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-gray-800 bg-opacity-40 backdrop-blur-lg border border-gray-600 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-700 hover:bg-opacity-30 transition-colors duration-300"
                    >
                      <span className="font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {faq.q}
                      </span>
                      <span className={`text-xl text-cyan-400 transition-transform duration-300 ${
                        openFaq === index ? 'rotate-45' : ''
                      }`}>
                        +
                      </span>
                    </button>
                    
                    <div className={`overflow-hidden transition-all duration-300 ${
                      openFaq === index ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="p-4 pt-0 text-gray-300 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
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