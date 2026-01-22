import React, { useState } from 'react';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai', label: 'AI & ML' },
    { id: 'blockchain', label: 'Blockchain' },
    { id: 'biotech', label: 'Biotechnology' },
    { id: 'cyber', label: 'Cybersecurity' }
  ];

  const projects = [
    {
      category: 'ai',
      icon: 'fas fa-brain',
      title: 'AI-Powered Early Cancer Detection',
      description: 'Develop deep learning models for early detection of cancers using medical imaging data',
      mentor: 'Prof. Sarah Johnson (Stanford Medicine)'
    },
    {
      category: 'blockchain',
      icon: 'fas fa-link',
      title: 'Secure Voting System on Blockchain',
      description: 'Build a transparent, tamper-proof voting system using Ethereum smart contracts',
      mentor: 'Dr. Michael Chen (MIT Cryptography)'
    },
    {
      category: 'biotech',
      icon: 'fas fa-dna',
      title: 'CRISPR-based Disease Therapy',
      description: 'Research on gene editing techniques for targeted treatment of genetic disorders',
      mentor: 'Dr. Emily Wilson (Harvard Medical School)'
    },
    {
      category: 'cyber',
      icon: 'fas fa-shield-alt',
      title: 'Quantum-Resistant Cryptography',
      description: 'Develop cryptographic algorithms resistant to quantum computing attacks',
      mentor: 'Dr. Alex Rodriguez (MIT Lincoln Lab)'
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-title">
          <h2>Featured Research Projects</h2>
          <p>Choose from cutting-edge projects across multiple domains</p>
        </div>
        
        <div className="projects-filter">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div key={index} className="project-card" data-category={project.category}>
              <div className="project-img">
                <i className={project.icon}></i>
              </div>
              <div className="project-content">
                <span className="project-category">
                  {filters.find(f => f.id === project.category)?.label || project.category}
                </span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <p><strong>Mentor:</strong> {project.mentor}</p>
                <button className="btn btn-primary" style={{ marginTop: '15px', padding: '10px 20px' }}>
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

