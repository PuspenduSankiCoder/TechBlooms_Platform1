import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleApplyClick = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate('/');
      // Scroll to internships section
      setTimeout(() => {
        const internshipsSection = document.getElementById('internships');
        if (internshipsSection) {
          internshipsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      navigate('/register');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    closeMobileMenu();
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header>
      <div className="container">
        <nav>
          <Link to="/" className="logo" onClick={closeMobileMenu}>
            Tech<span>Blooms</span>
          </Link>
          
          <ul className="nav-links">
            <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
            <li><a href="#carousel" onClick={(e) => { e.preventDefault(); scrollToSection('carousel'); }}>Featured</a></li>
            <li><a href="#internships" onClick={(e) => { e.preventDefault(); scrollToSection('internships'); }}>Internships</a></li>
            <li><a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>Projects</a></li>
            <li><a href="#faculty" onClick={(e) => { e.preventDefault(); scrollToSection('faculty'); }}>Faculty</a></li>
            <li><a href="#workshops" onClick={(e) => { e.preventDefault(); scrollToSection('workshops'); }}>Workshops</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
            {isAuthenticated ? (
              <>
                <li><Link to="/profile">Profile</Link></li>
                <li><button className="apply-btn" onClick={handleLogout}>Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Sign In</Link></li>
                <li><button className="apply-btn" onClick={handleApplyClick}>Apply Now</button></li>
              </>
            )}
          </ul>
          
          <div className="mobile-menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <i className="fas fa-bars"></i>
          </div>
        </nav>
        
        {mobileMenuOpen && (
          <div className="mobile-nav" style={{ display: 'flex' }}>
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a>
            <a href="#carousel" onClick={(e) => { e.preventDefault(); scrollToSection('carousel'); }}>Featured</a>
            <a href="#internships" onClick={(e) => { e.preventDefault(); scrollToSection('internships'); }}>Internships</a>
            <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>Projects</a>
            <a href="#faculty" onClick={(e) => { e.preventDefault(); scrollToSection('faculty'); }}>Faculty</a>
            <a href="#workshops" onClick={(e) => { e.preventDefault(); scrollToSection('workshops'); }}>Workshops</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a>
            {isAuthenticated ? (
              <>
                <Link to="/profile" onClick={closeMobileMenu}>Profile</Link>
                <button className="apply-btn" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMobileMenu}>Sign In</Link>
                <button className="apply-btn" onClick={handleApplyClick}>Apply Now</button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

