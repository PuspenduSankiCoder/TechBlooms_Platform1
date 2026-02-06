import React, { useState } from 'react';
import { useRobot } from '../context/RobotContext';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const { reactToUserAction } = useRobot();

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai', label: 'AI & ML' },
    { id: 'blockchain', label: 'Blockchain' },
    { id: 'ultrasonic sensing', label: 'Arduino' },
    { id: 'cyber', label: 'Cybersecurity' }
  ];

  const projects = [
    {
      id: 1,
      category: 'ai',
      icon: 'fas fa-brain',
      title: 'AI-Powered Early Cancer Detection',
      description: 'Develop deep learning models for early detection of cancers using medical imaging data',
      mentor: 'Prof. Sarah Johnson (Stanford Medicine)'
    },
    {
      id: 2,
      category: 'blockchain',
      icon: 'fas fa-link',
      title: 'Secure Voting System on Blockchain',
      description: 'Build a transparent, tamper-proof voting system using Ethereum smart contracts',
      mentor: 'Dr. Michael Chen (MIT Cryptography)'
    },
    {
      id: 3,
      category: 'gpstech',
      icon: 'fas fa-dna',
      title: '“Low-Cost Autonomous GPS-Based Quadcopter for Disaster Management”',
      description: 'A low cost fully autonomous GPS (Global Positioning System) based quad copter for disaster management',
      mentor: 'Dr.Susmita Ganguly (Harvard Lab)'
    },
    {
      id: 4,
      category: 'cyber',
      icon: 'fas fa-shield-alt',
      title: '“Raspberry Pi–Based Cloud-Enabled Air and Sound Pollution Monitoring System”',
      description: 'A raspberry Pi controlled cloud based air and sound pollution monitoring system with temperature and humidity sensing',
      mentor: 'Dr. Alex Rodriguez (MIT Lincoln Lab)'
    },
      {
      id: 5,
      category: 'Emergency',
      icon: 'fas fa-shield-alt',
      title: 'Secure Wireless Ad-Hoc Communication Framework for Emergency Networks',
      description: 'This project investigates the design and performance of wireless ad-hoc networks for emergency communication scenarios where traditional infrastructure is unavailable.',
      mentor: 'Dr. Alex Rodriguez (MIT Lincoln Lab)'
    },
      {
      id: 6,
      category: 'ultrasonic sensing',
      icon: 'fas fa-shield-alt',
      title: 'Low-Cost Assistive Navigation System for Visually Impaired Individuals',
      description: 'The proposed assistive system uses ultrasonic sensing and audio feedback to help visually impaired users detect obstacles and navigate safely',
      mentor: 'Dr. Alex Rodriguez (MIT Lincoln Lab)'
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  // Handle filter change - FIXED: Added proper element parameter
  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    const filterLabel = filters.find(f => f.id === filterId)?.label || filterId;
    // Added element parameter with proper structure
    reactToUserAction('click_button', { 
      tagName: 'BUTTON', 
      text: `Filter: ${filterLabel}` 
    });
  };

  // Handle project card click - FIXED: Added proper element parameter
  const handleProjectClick = (projectTitle, projectCategory) => {
    // Added element parameter with proper structure
    reactToUserAction('click_project', { 
      tagName: 'DIV', 
      text: projectTitle,
      category: projectCategory 
    });
  };

  // Handle learn more button click - FIXED: Added proper element parameter
  const handleLearnMoreClick = (projectTitle, e) => {
    e.stopPropagation(); // Prevent card click from triggering
    
    // Added element parameter with proper structure
    reactToUserAction('click_button', { 
      tagName: 'BUTTON', 
      text: `Learn More: ${projectTitle}` 
    });
    
    // Add your navigation or modal logic here
    alert(`More details about "${projectTitle}" would open here.`);
  };

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
              onClick={() => handleFilterChange(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="project-card" 
              data-category={project.category}
              onClick={() => handleProjectClick(project.title, project.category)}
            >
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
                <button 
                  className="btn btn-primary" 
                  style={{ marginTop: '15px', padding: '10px 20px' }}
                  onClick={(e) => handleLearnMoreClick(project.title, e)}
                >
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