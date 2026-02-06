import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRobot } from '../context/RobotContext';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { guideToSection, reactToUserAction } = useRobot();
  const navigate = useNavigate();

  // Enhanced navigation with robot guidance
  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
    
    // Robot reaction for navigation
    reactToUserAction('click_link', { text: `Navigate to: ${sectionId}` });
    
    // Use robot's guideToSection for smooth animation
    guideToSection(sectionId);
    
    // Also scroll for immediate navigation (fallback)
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Handle logo click (home navigation)
  const handleLogoClick = () => {
    setMobileMenuOpen(false);
    reactToUserAction('click_link', { text: 'Home Logo' });
    
    // If already on home page, scroll to top
    if (window.location.pathname === '/') {
      guideToSection('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  // Handle apply button click with robot interaction
  const handleApplyClick = (e) => {
    e.preventDefault();
    
    // Robot reaction
    reactToUserAction('click_button', { text: 'Apply Now' });
    
    if (isAuthenticated) {
      // User is logged in, navigate to home then scroll to internships
      navigate('/');
      
      setTimeout(() => {
        scrollToSection('internships');
      }, 100);
    } else {
      // User needs to register
      navigate('/register');
    }
    
    setMobileMenuOpen(false);
  };

  // Handle logout with robot interaction
  const handleLogout = () => {
    reactToUserAction('click_button', { text: 'Logout' });
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  // Handle profile navigation
  const handleProfileClick = () => {
    reactToUserAction('click_link', { text: 'Profile' });
    setMobileMenuOpen(false);
  };

  // Handle login/signin navigation
  const handleLoginClick = () => {
    reactToUserAction('click_link', { text: 'Sign In' });
    setMobileMenuOpen(false);
  };

  // Handle mobile menu toggle
  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    reactToUserAction('click_button', { text: 'Mobile Menu' });
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Enhanced section navigation with robot
  const handleSectionClick = (sectionId, e) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  // Handle route navigation (for Profile/Login)
  const handleRouteClick = (route, label) => {
    reactToUserAction('click_link', { text: label });
    navigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header>
      <div className="container">
        <nav>
          <Link 
            to="/" 
            className="logo" 
            onClick={handleLogoClick}
          >
            Tech<span>Blooms</span>
          </Link>
          
          <ul className="nav-links">
            <li>
              <a 
                href="#home" 
                onClick={(e) => handleSectionClick('home', e)}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#carousel" 
                onClick={(e) => handleSectionClick('carousel', e)}
              >
                Featured
              </a>
            </li>
            <li>
              <a 
                href="#internships" 
                onClick={(e) => handleSectionClick('internships', e)}
              >
                Internships
              </a>
            </li>
            <li>
              <a 
                href="#projects" 
                onClick={(e) => handleSectionClick('projects', e)}
              >
                Projects
              </a>
            </li>
            <li>
              <a 
                href="#faculty" 
                onClick={(e) => handleSectionClick('faculty', e)}
              >
                Felicitators
              </a>
            </li>
            <li>
              <a 
                href="#workshops" 
                onClick={(e) => handleSectionClick('workshops', e)}
              >
                Workshops
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                onClick={(e) => handleSectionClick('contact', e)}
              >
                Contact
              </a>
            </li>
            
            {isAuthenticated ? (
              <>
                <li>
                  <Link 
                    to="/profile" 
                    onClick={handleProfileClick}
                  >
                    Profile {user?.name ? `(${user.name})` : ''}
                  </Link>
                </li>
                <li>
                  <button 
                    className="apply-btn" 
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link 
                    to="/login" 
                    onClick={handleLoginClick}
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <button 
                    className="apply-btn" 
                    onClick={handleApplyClick}
                  >
                    Apply Now
                  </button>
                </li>
              </>
            )}
          </ul>
          
          <div 
            className="mobile-menu" 
            onClick={handleMobileMenuToggle}
          >
            <i className="fas fa-bars"></i>
          </div>
        </nav>
        
        {mobileMenuOpen && (
          <div className="mobile-nav" style={{ display: 'flex' }}>
            <a 
              href="#home" 
              onClick={(e) => handleSectionClick('home', e)}
            >
              Home
            </a>
            <a 
              href="#carousel" 
              onClick={(e) => handleSectionClick('carousel', e)}
            >
              Featured
            </a>
            <a 
              href="#internships" 
              onClick={(e) => handleSectionClick('internships', e)}
            >
              Internships
            </a>
            <a 
              href="#projects" 
              onClick={(e) => handleSectionClick('projects', e)}
            >
              Projects
            </a>
            <a 
              href="#faculty" 
              onClick={(e) => handleSectionClick('faculty', e)}
            >
              Faculty
            </a>
            <a 
              href="#workshops" 
              onClick={(e) => handleSectionClick('workshops', e)}
            >
              Workshops
            </a>
             <a href="#advisers"
             >Advisers</a> {/* Add this line */}
            <a 
              href="#contact" 
              onClick={(e) => handleSectionClick('contact', e)}
            >
              Contact
            </a>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile" 
                  onClick={handleProfileClick}
                >
                  Profile {user?.name ? `(${user.name})` : ''}
                </Link>
                <button 
                  className="apply-btn" 
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  onClick={handleLoginClick}
                >
                  Sign In
                </Link>
                <button 
                  className="apply-btn" 
                  onClick={handleApplyClick}
                >
                  Apply Now
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;