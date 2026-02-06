import React, { useState } from 'react';
import { useRobot } from '../context/RobotContext';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [message, setMessage] = useState('');
  const { reactToUserAction } = useRobot();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Robot reaction for form submission
    reactToUserAction('form_submit', { text: 'Contact Form Submission' });
    
    // In a real application, this would send the data to a backend API
    setMessage({ type: 'success', text: 'Thank you for your message! We will get back to you soon.' });
    
    // Clear form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      setMessage('');
    }, 5000);
  };

  // Handle WhatsApp click with robot reaction
  const handleWhatsAppClick = () => {
    reactToUserAction('click_button', { text: 'WhatsApp Chat' });
    // WhatsApp will open in a new tab, robot will react when user returns
  };

  // Handle contact info clicks (email, phone, address)
  const handleContactInfoClick = (type) => {
    reactToUserAction('click_link', { text: `Contact ${type}` });
    // You could add copy-to-clipboard functionality here
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="section-title">
          <h2>Contact Us</h2>
          <p>Get in touch for queries and collaboration opportunities</p>
        </div>
        
        <div className="contact-container">
          <div className="contact-info">
            <div 
              className="contact-item"
              onClick={() => handleContactInfoClick('Email')}
              style={{ cursor: 'pointer' }}
            >
              <div className="contact-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div>
                <h4>Email</h4>
                <p>contact@techblooms.edu</p>
              </div>
            </div>
            
            <div 
              className="contact-item"
              onClick={() => handleContactInfoClick('Phone')}
              style={{ cursor: 'pointer' }}
            >
              <div className="contact-icon">
                <i className="fas fa-phone"></i>
              </div>
              <div>
                <h4>Phone</h4>
                <p>+1 (234) 567-890</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fab fa-whatsapp"></i>
              </div>
              <div>
                <h4>WhatsApp</h4>
                <p>+1 (234) 567-890</p>
                <a 
                  href="https://wa.me/1234567890" 
                  className="btn btn-primary" 
                  style={{ padding: '8px 20px', marginTop: '10px', display: 'inline-block' }}
                  onClick={handleWhatsAppClick}
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-whatsapp" style={{ marginRight: '5px' }}></i>
                  Chat Now
                </a>
              </div>
            </div>
            
            <div 
              className="contact-item"
              onClick={() => handleContactInfoClick('Address')}
              style={{ cursor: 'pointer' }}
            >
              <div className="contact-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div>
                <h4>Address</h4>
                <p>123 Innovation Drive<br />Tech Park, Kolkata 700001</p>
              </div>
            </div>
          </div>
          
          <div className="contact-form">
            <h3 style={{ marginBottom: '20px' }}>Send us a Message</h3>
            {message && (
              <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
                {message.text}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  onFocus={() => reactToUserAction('form_field', { text: 'Name field focus' })}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  onFocus={() => reactToUserAction('form_field', { text: 'Email field focus' })}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="form-control"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  onFocus={() => reactToUserAction('form_field', { text: 'Subject field focus' })}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-control"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  onFocus={() => reactToUserAction('form_field', { text: 'Message field focus' })}
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '15px' }}
                onMouseEnter={() => reactToUserAction('button_hover', { text: 'Send Message button hover' })}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;