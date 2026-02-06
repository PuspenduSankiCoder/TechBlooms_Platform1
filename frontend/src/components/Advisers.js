// src/components/Advisers.js
import React, { useEffect, useRef, useState } from 'react';

const Advisers = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollContainerRef = useRef(null);
  const totalPages = 3; // Adjust based on number of cards

  const advisers = [
    {
      id: 1,
      name: "Dr. John Anderson",
      title: "Senior AI Research Director",
      expertise: "Former Google AI Lead, 15+ years in machine learning research and applications",
      icon: "fa-user-tie"
    },
    {
      id: 2,
      name: "Sarah Chen",
      title: "Biotech Entrepreneur",
      expertise: "Founder & CEO of BioGen Labs, specializes in medical device innovation",
      icon: "fa-chart-line"
    },
    {
      id: 3,
      name: "Michael Rodriguez",
      title: "Cybersecurity Expert",
      expertise: "Former CISO at Fortune 500 companies, 20+ years in network security",
      icon: "fa-shield-alt"
    },
    {
      id: 4,
      name: "Dr. Emily Wilson",
      title: "Pharmaceutical Researcher",
      expertise: "Lead researcher at PharmaCorp, specialized in oncology drug development",
      icon: "fa-flask"
    },
    {
      id: 5,
      name: "Alex Thompson",
      title: "Robotics Engineer",
      expertise: "MIT Robotics Lab alumni, developed autonomous systems for space exploration",
      icon: "fa-robot"
    },
    {
      id: 6,
      name: "Priya Sharma",
      title: "Data Science Lead",
      expertise: "Head of Data Science at TechVision, expert in big data analytics and AI",
      icon: "fa-network-wired"
    }
  ];

  const scrollLeft = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const scrollRight = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const scrollToPage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = 310; // width + gap (280px + 30px)
      const scrollAmount = currentPage * cardWidth * 2; // 2 cards per view
      container.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }, [currentPage]);

  return (
    <section id="advisers" className="advisers-section">
      <div className="container">
        <div className="section-title">
          <h2>Our Advisory </h2>
          <p>Industry experts and mentors guiding our research initiatives</p>
        </div>
        
        <div className="adviser-scroll-container">
          <div className="adviser-scroll-wrapper" ref={scrollContainerRef}>
            <div className="adviser-grid">
              {advisers.map((adviser) => (
                <div key={adviser.id} className="adviser-card">
                  <div className="adviser-img">
                    <i className={`fas ${adviser.icon}`}></i>
                  </div>
                  <div className="adviser-info">
                    <h3>{adviser.name}</h3>
                    <p className="adviser-title">{adviser.title}</p>
                    <p className="adviser-expertise">{adviser.expertise}</p>
                    <div className="adviser-contact">
                      <a href="#" title="LinkedIn"><i className="fab fa-linkedin"></i></a>
                      <a href="#" title="Email"><i className="fas fa-envelope"></i></a>
                      <a href="#" title="Website"><i className="fas fa-globe"></i></a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Scroll Navigation Arrows */}
          <div className="scroll-arrows">
            <button className="scroll-arrow" onClick={scrollLeft} id="scrollLeft">
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="scroll-arrow" onClick={scrollRight} id="scrollRight">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
          
          {/* Scroll Indicator */}
          <div className="scroll-indicator" id="scrollIndicator">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`scroll-dot ${currentPage === index ? 'active' : ''}`}
                onClick={() => scrollToPage(index)}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advisers;