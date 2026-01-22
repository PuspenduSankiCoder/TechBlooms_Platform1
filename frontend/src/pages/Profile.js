import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    fetchApplications();
  }, [isAuthenticated, navigate]);

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/profile`);
      if (response.data.success && response.data.user.applications) {
        setApplications(response.data.user.applications);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setLoading(false);
    }
  };

  const handleApply = async (appliedFor) => {
    try {
      setLoading(true);
      setMessage('');

      const response = await axios.post(`${API_URL}/apply`, {
        appliedFor,
      });

      setMessage({ type: 'success', text: response.data.message || 'Application submitted successfully!' });
      fetchApplications();
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to submit application. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: '800px' }}>
        <h2>User Profile</h2>
        {message && (
          <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
            {message.text}
          </div>
        )}

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '15px', color: 'var(--primary)' }}>Account Information</h3>
          <div className="form-group">
            <label>Name</label>
            <div className="form-control" style={{ background: 'var(--section-bg)', cursor: 'not-allowed' }}>
              {user.name}
            </div>
          </div>
          <div className="form-group">
            <label>Email</label>
            <div className="form-control" style={{ background: 'var(--section-bg)', cursor: 'not-allowed' }}>
              {user.email}
            </div>
          </div>
          <div className="form-group">
            <label>Role</label>
            <div className="form-control" style={{ background: 'var(--section-bg)', cursor: 'not-allowed' }}>
              {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Student'}
            </div>
          </div>
          <div className="form-group">
            <label>Member Since</label>
            <div className="form-control" style={{ background: 'var(--section-bg)', cursor: 'not-allowed' }}>
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </div>
          </div>
        </div>

        <div style={{ marginTop: '40px' }}>
          <h3 style={{ marginBottom: '15px', color: 'var(--primary)' }}>Quick Actions</h3>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <button
              className="btn btn-primary"
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  const internshipsSection = document.getElementById('internships');
                  if (internshipsSection) {
                    internshipsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }}
            >
              Browse Internships
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  const projectsSection = document.getElementById('projects');
                  if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }}
            >
              View Projects
            </button>
          </div>
        </div>

        {applications.length > 0 && (
          <div style={{ marginTop: '40px' }}>
            <h3 style={{ marginBottom: '15px', color: 'var(--primary)' }}>My Applications</h3>
            <div style={{ display: 'grid', gap: '15px' }}>
              {applications.map((app, index) => (
                <div
                  key={index}
                  style={{
                    padding: '20px',
                    background: 'var(--section-bg)',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <h4 style={{ marginBottom: '10px' }}>{app.appliedFor}</h4>
                  <p style={{ marginBottom: '5px', color: 'var(--text-color)', opacity: 0.8 }}>
                    Status: <strong>{app.status || 'Pending'}</strong>
                  </p>
                  <p style={{ color: 'var(--text-color)', opacity: 0.8 }}>
                    Applied on: {app.date ? new Date(app.date).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

