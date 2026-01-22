import React from 'react';

const Features = () => {
  const features = [
    {
      icon: 'fas fa-user-graduate',
      title: 'Global Faculty Mentors',
      description: 'Learn from professors at top universities worldwide with extensive research experience'
    },
    {
      icon: 'fas fa-flask',
      title: 'Hands-on Projects',
      description: 'Work on real-world research projects with publication opportunities in reputed journals'
    },
    {
      icon: 'fas fa-certificate',
      title: 'Certified Programs',
      description: 'Receive certificates endorsed by global faculty and industry partners'
    },
    {
      icon: 'fas fa-network-wired',
      title: 'Career Network',
      description: 'Connect with researchers, industry professionals, and alumni worldwide'
    }
  ];

  return (
    <section className="section features">
      <div className="container">
        <div className="section-title">
          <h2>Why Choose TechBlooms?</h2>
          <p>We bridge the gap between academic learning and real-world application with our unique platform</p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                <i className={feature.icon}></i>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

