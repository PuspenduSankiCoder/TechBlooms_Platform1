import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Internships = () => {
  const [activeTab, setActiveTab] = useState('2month');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  const handleApply = async (program) => {
    if (!isAuthenticated) {
      navigate('/register');
      return;
    }

    try {
      setLoading(true);
      setMessage('');

      const response = await axios.post(`${API_URL}/apply`, {
        appliedFor: program,
      });

      setMessage({ type: 'success', text: response.data.message || 'Application submitted successfully!' });
      
      setTimeout(() => {
        setMessage('');
        navigate('/profile');
      }, 2000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to submit application. Please try again.',
      });
      setLoading(false);
    }
  };

  const tabs = [
    {
      id: '2month',
      label: '2-Month Intensive',
      title: '2-Month Intensive Research Program',
      duration: '8 Weeks',
      fee: '$499',
      startDate: 'Monthly Batches',
      highlights: [
        { icon: 'fas fa-chalkboard-teacher', title: 'Weekly 1:1 Mentorship' },
        { icon: 'fas fa-project-diagram', title: 'Research Project' },
        { icon: 'fas fa-certificate', title: 'Certificate & LOR' },
        { icon: 'fas fa-network-wired', title: 'Industry Networking' }
      ],
      curriculum: [
        'Research Methodology & Literature Review',
        'Project Implementation & Testing',
        'Data Analysis & Interpretation',
        'Technical Paper Writing Guidance'
      ]
    },
    {
      id: '6month',
      label: '6-Month Research Track',
      title: '6-Month Deep Research & Publication Track',
      duration: '24 Weeks',
      fee: '$1299',
      startDate: 'Quarterly Batches',
      highlights: [
        { icon: 'fas fa-newspaper', title: 'Journal Publication' },
        { icon: 'fas fa-conference', title: 'Conference Presentation' },
        { icon: 'fas fa-briefcase', title: 'Career Counseling' },
        { icon: 'fas fa-users', title: 'Research Community' }
      ],
      curriculum: [
        'Guaranteed paper submission to Scopus/SCI journals',
        'Opportunity to present at international conferences',
        'Personalized career guidance and PhD application support',
        'Access to exclusive research community and alumni network'
      ]
    },
    {
      id: 'custom',
      label: 'Custom Programs',
      title: 'Customized Research Programs',
      duration: 'Flexible',
      fee: 'Custom Quote',
      startDate: 'Anytime',
      highlights: [
        { icon: 'fas fa-cogs', title: 'Tailored Curriculum' },
        { icon: 'fas fa-user-tie', title: 'Dedicated Mentor' },
        { icon: 'fas fa-bullseye', title: 'Goal-Oriented' },
        { icon: 'fas fa-handshake', title: 'Industry Partnership' }
      ],
      curriculum: [
        'Corporate training and upskilling programs',
        'University collaboration projects',
        'PhD preparatory research',
        'Startup product development and research'
      ]
    }
  ];

  const activeTabData = tabs.find(tab => tab.id === activeTab) || tabs[0];

  return (
    <section className="section" id="internships">
      <div className="container">
        <div className="section-title">
          <h2>Internship Programs</h2>
          <p>Choose the program that fits your career goals and timeline</p>
        </div>
        
        <div className="internship-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {message && (
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
              {message.text}
            </div>
          </div>
        )}

        <div className="tab-content active">
          <div className="internship-card">
            <h3 style={{ marginBottom: '20px' }}>{activeTabData.title}</h3>
            <p>
              <strong>Duration:</strong> {activeTabData.duration} |{' '}
              <strong>Fee:</strong> {activeTabData.fee} |{' '}
              <strong>Start Date:</strong> {activeTabData.startDate}
            </p>
            
            <div className="internship-highlights">
              {activeTabData.highlights.map((highlight, index) => (
                <div key={index} className="highlight">
                  <i className={highlight.icon}></i>
                  <h4>{highlight.title}</h4>
                </div>
              ))}
            </div>
            
            <h4 style={{ margin: '20px 0 10px' }}>
              {activeTab === 'custom' ? 'Ideal For:' : 'Curriculum Includes:'}
            </h4>
            <ul style={{ listStyle: 'none', paddingLeft: '20px' }}>
              {activeTabData.curriculum.map((item, index) => (
                <li key={index} style={{ marginBottom: '8px' }}>
                  <i className="fas fa-check" style={{ color: 'var(--success)', marginRight: '10px' }}></i>
                  {item}
                </li>
              ))}
            </ul>
            
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              {activeTab === 'custom' ? (
                <>
                  <button
                    className="btn btn-primary"
                    style={{ marginRight: '15px' }}
                    onClick={() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    Contact for Custom Program
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => handleApply(activeTabData.title)}
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Apply Now'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Internships;

