import React, { useState, useEffect, useRef } from 'react';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef(null);

  const slides = [
    {
      image: require('../assets/DISASTER.png'), // Update with your actual image names
      title: 'Autonomous GPS-Guided Aerial Surveillance System for Disaster Response',
      description: 'This project presents an autonomous aerial platform capable of navigating disaster-affected regions using GPS and onboard control algorithms.',
      buttonText: 'View Project Details'
    },
    {
      image: require('../assets/iot_hcmsys.png'),
      title: 'Cloud-Integrated Smart Health Monitoring and Emergency Response Framework',
      description: 'This system continuously monitors vital physiological parameters such as heart rate, body temperature, and oxygen saturation, transmitting data securely to a cloud server.',
      buttonText: 'Explore Portal'
    },
    {
      image: require('../assets/SHELMET.png'),
      title: 'Embedded Vision-Based Driver Safety and Accident Prevention System',
      description: 'This project implements an embedded vision system to monitor driver behavior and detect conditions such as drowsiness, distraction, and alcohol influence.',
      buttonText: 'View Project Details'
    },
    {
      image: require('../assets/SMART_AGRICULTURE_IOT.png'),
      title: 'Deep Learning–Based Crop Disease Detection and Yield Optimization System',
      description: 'The proposed system uses convolutional neural networks (CNNs) to automatically detect crop diseases from leaf images captured in natural field conditions.',
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