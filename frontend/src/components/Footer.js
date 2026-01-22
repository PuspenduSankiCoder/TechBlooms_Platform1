import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      alert('Thank you for subscribing to our newsletter!');
      setEmail('');
    } else {
      alert('Please enter a valid email address.');
    }
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div>
            <Link to="/" className="footer-logo">
              Tech<span style={{ color: 'var(--secondary)' }}>Blooms</span>
            </Link>
            <p style={{ color: '#bbb', marginBottom: '20px' }}>
              Bridging academia and industry through innovative research and mentorship.
            </p>
            <div className="social-links">
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
              <a href="#"><i className="fab fa-researchgate"></i></a>
            </div>
          </div>
          
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
              <li><a href="#carousel" onClick={(e) => { e.preventDefault(); scrollToSection('carousel'); }}>Featured</a></li>
              <li><a href="#internships" onClick={(e) => { e.preventDefault(); scrollToSection('internships'); }}>Internships</a></li>
              <li><a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>Projects</a></li>
              <li><a href="#faculty" onClick={(e) => { e.preventDefault(); scrollToSection('faculty'); }}>Faculty</a></li>
              <li><a href="#workshops" onClick={(e) => { e.preventDefault(); scrollToSection('workshops'); }}>Workshops</a></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4>Programs</h4>
            <ul>
              <li><a href="#internships" onClick={(e) => { e.preventDefault(); scrollToSection('internships'); }}>2-Month Intensive</a></li>
              <li><a href="#internships" onClick={(e) => { e.preventDefault(); scrollToSection('internships'); }}>6-Month Research Track</a></li>
              <li><a href="#workshops" onClick={(e) => { e.preventDefault(); scrollToSection('workshops'); }}>Workshop Series</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Corporate Partnerships</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>University Collaborations</a></li>
            </ul>
          </div>
          
          <div className="footer-newsletter">
            <h4>Stay Updated</h4>
            <p style={{ color: '#bbb', marginBottom: '15px' }}>
              Subscribe to our newsletter for updates on new programs and workshops.
            </p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '12px 20px' }}>
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="copyright">
          <p>
            &copy; 2024 TechBlooms. All rights reserved. | Designed with{' '}
            <i className="fas fa-heart" style={{ color: '#e74c3c' }}></i> for researchers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

