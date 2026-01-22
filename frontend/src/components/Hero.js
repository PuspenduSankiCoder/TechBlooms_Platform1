import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Hero = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleApplyClick = () => {
    if (isAuthenticated) {
      const internshipsSection = document.getElementById('internships');
      if (internshipsSection) {
        internshipsSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/register');
    }
  };

  const handleBrowseProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="home">
      <video autoPlay muted loop className="hero-video">
        <source src="https://assets.mixkit.co/videos/preview/mixkit-scientist-checking-samples-in-a-laboratory-43844-large.mp4" type="video/mp4" />
      </video>
      
      <div className="container">
        <div className="hero-content">
          <h1>Innovate • Learn • Build</h1>
          <p>Learn from top global professors, work on cutting-edge research projects, and launch your career with hands-on internships and mentorship from industry experts.</p>
          
          <div className="hero-btns">
            <button className="btn btn-primary" onClick={handleApplyClick}>
              Apply for Internship
            </button>
            <button className="btn btn-secondary" onClick={handleBrowseProjects}>
              Browse Projects
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

