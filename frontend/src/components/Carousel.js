import React, { useState, useEffect, useRef } from 'react';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef(null);

  const slides = [
    {
      image: require('../assets/DISASTER.png'), // Update with your actual image names
      title: 'IoT in Disaster Management System',
      description: 'An IoT-based system that monitors disaster conditions in real time and provides early warnings to reduce loss of life and property..',
      buttonText: 'View Project Details'
    },
    {
      image: require('../assets/iot_hcmsys.png'),
      title: 'IoT in Healthcare Management System',
      description: 'A smart healthcare system that enables real-time patient monitoring and remote medical assistance using IoT.',
      buttonText: 'Explore Portal'
    },
    {
      image: require('../assets/SHELMET.png'),
      title: 'IoT in Smart Helmet',
      description: 'An IoT-enabled helmet that detects accidents, alcohol consumption, and improves rider safety.',
      buttonText: 'View Project Details'
    },
    {
      image: require('../assets/SMART_AGRICULTURE_IOT.png'),
      title: 'IoT in Smart Agriculture',
      description: 'An intelligent agriculture system that uses IoT to monitor crops and optimize irrigation.',
      buttonText: 'View project details'
    },
      {
      image: require('../assets/SMART_GARBAGE_IOT.png'),
      title: 'IoT in Smart Garbage Management',
      description: 'A smart waste management system that monitors garbage levels to improve city cleanliness.',
      buttonText: 'See Implementation'
    },
    
  ];

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="carousel-section" id="carousel">
      <div className="container">
        <div className="section-title">
          <h2>Featured Student Projects</h2>
          <p>Showcasing innovative projects developed by our talented students</p>
        </div>
        
        <div className="carousel-container">
          <div className="carousel-slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
              >
                {/* Background Image */}
                <div 
                  className="slide-bg"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    opacity: index === currentSlide ? 1 : 0.7
                  }}
                />
                
                {/* Content Overlay */}
                <div className="slide-content">
                  <h3>{slide.title}</h3>
                  <p>{slide.description}</p>
                  <button className="btn btn-primary">
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <button className="carousel-btn prev" onClick={prevSlide}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="carousel-btn next" onClick={nextSlide}>
            <i className="fas fa-chevron-right"></i>
          </button>
          
          <div className="carousel-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              ></button>
            ))}
          </div>
          
          <div className="carousel-controls">
            <button className="control-btn" onClick={togglePlayPause}>
              <i className={isPlaying ? 'fas fa-pause' : 'fas fa-play'}></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;