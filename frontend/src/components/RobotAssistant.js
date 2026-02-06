import React, { useState, useEffect, useRef } from 'react';
import { useRobot } from '../context/RobotContext';
import './RobotAssistant.css';

// Image import with fallback options
// Option 1: Import from assets (if you moved image to src/assets/images/robot.png)
// import robotImage from '../assets/images/robot.png';

// Option 2: Use public folder image
// const robotImage = "/images/robot.png";

// Option 3: Use your existing image from root
const robotImage = "/cartoon-robot.avif"; // Your existing cartoon-robot.avif in public folder

// Option 4: Fallback online image
const fallbackImage = "https://cdn-icons-png.flaticon.com/512/4712/4712035.png";

const RobotAssistant = () => {
  const {
    robotVisible,
    setRobotVisible,
    robotPosition,
    robotExpression,
    robotMessage,
    isSpeaking,
    robotMovement,
    guideMode,
    showRobotMessage,
    guideToSection,
    reactToUserAction // ← This is now properly imported
  } = useRobot();
  
  const [expanded, setExpanded] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [currentImage, setCurrentImage] = useState(robotImage);
  const robotRef = useRef(null);

  // Handle image loading errors
  const handleImageError = (e) => {
    console.log('Robot image failed to load, using fallback');
    setCurrentImage(fallbackImage);
    e.target.src = fallbackImage;
  };

  // Handle robot click - UPDATED TO USE reactToUserAction
  const handleRobotClick = () => {
    // Track the robot click action
    reactToUserAction('robot_click', { tagName: 'ROBOT', text: 'Robot Assistant' });
    
    if (!expanded) {
      setExpanded(true);
      showRobotMessage(
        "Hi! Hello everyone, I am Dr. Himadri Nath Saha. It is a pleasure to share with you the journey of innovation and research that I have been leading. My work primarily focuses on leveraging cutting-edge technology to solve real-world problems, ranging from agriculture and healthcare to public safety and disaster management.",
        'welcome'
      );
    } else {
      setExpanded(false);
      setShowHistory(false);
    }
  };

  // Handle section navigation
  const handleNavigate = (section) => {
    // Track navigation action
    reactToUserAction('click_button', { tagName: 'BUTTON', text: `Navigate to ${section}` });
    guideToSection(section);
    setExpanded(false);
  };

  // Handle quick action button click
  const handleQuickAction = (action, label) => {
    if (action) {
      // If action is provided, call it
      action();
    } else {
      // Otherwise track as a button click
      reactToUserAction('click_button', { tagName: 'BUTTON', text: label });
    }
  };

  // Expression-based image styling
  const getExpressionStyle = () => {
    const styles = {
      happy: { filter: 'brightness(1.1) saturate(1.2)' },
      excited: { filter: 'brightness(1.3) saturate(1.5)', animation: 'pulse 0.5s infinite' },
      thinking: { filter: 'brightness(0.9) sepia(0.3)', animation: 'thinking 2s infinite' },
      helpful: { filter: 'brightness(1.1) hue-rotate(180deg)' },
      welcome: { filter: 'brightness(1.2) saturate(1.3)', animation: 'welcome 2s infinite' },
      thumbsup: { filter: 'brightness(1.1)' },
      wink: { filter: 'brightness(1.15) hue-rotate(-20deg)' },
      pointing: { filter: 'brightness(1.1) saturate(1.1)' },
      default: { filter: 'brightness(1) saturate(1)' }
    };
    
    return styles[robotExpression] || styles.default;
  };

  // Quick actions for the robot
  const quickActions = [
    { icon: '🏠', label: 'Home', section: 'home' },
    { icon: '📚', label: 'Projects', section: 'projects' },
    { icon: '💼', label: 'Internships', section: 'internships' },
    { icon: '👨‍🏫', label: 'Faculty', section: 'faculty' },
    { icon: '📞', label: 'Contact', section: 'contact' },
    { 
      icon: '🚀', 
      label: 'Apply Now', 
      section: 'internships', 
      action: () => reactToUserAction('click_button', { tagName: 'BUTTON', text: 'Apply Now' }) 
    }
  ];

  // Add workshops to quick actions
  useEffect(() => {
    // You can dynamically add workshops if needed
    if (!quickActions.find(action => action.section === 'workshops')) {
      quickActions.splice(4, 0, { icon: '🎓', label: 'Workshops', section: 'workshops' });
    }
  }, [reactToUserAction]); // Added reactToUserAction as dependency

  // Handle window resize for responsive positioning
  useEffect(() => {
    const handleResize = () => {
      // Adjust robot position on resize if needed
      if (window.innerWidth < 768) {
        // Mobile adjustments
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize robot image
  useEffect(() => {
    // Check if image loads properly
    const img = new Image();
    img.src = robotImage;
    img.onerror = () => {
      console.log('Primary robot image not found, using fallback');
      setCurrentImage(fallbackImage);
    };
    img.onload = () => {
      console.log('Robot image loaded successfully');
      setCurrentImage(robotImage);
    };
  }, [robotImage]);

  return (
    <>
      {/* Robot Assistant */}
      {robotVisible && (
        <div 
          className={`robot-assistant ${robotMovement} ${guideMode ? 'guide-mode' : ''} ${expanded ? 'expanded' : ''}`}
          style={{ 
            '--robot-x': `${robotPosition.x}vw`,
            '--robot-y': `${robotPosition.y}px`
          }}
          ref={robotRef}
        >
          {/* Main Robot - UPDATED CLICK HANDLER */}
          <div className="robot-main" onClick={handleRobotClick}>
            <div className="robot-image-container">
              <img 
                src={currentImage} 
                alt="TechBlooms Assistant Robot" 
                className="robot-img"
                style={getExpressionStyle()}
                onError={handleImageError}
                loading="lazy"
              />
              
              {/* Voice indicator */}
              {isSpeaking && (
                <div className="voice-indicator">
                  <span className="voice-dot"></span>
                  <span className="voice-dot"></span>
                  <span className="voice-dot"></span>
                </div>
              )}
              
              {/* Guide mode indicator */}
              {guideMode && (
                <div className="guide-indicator">
                  <i className="fas fa-compass"></i>
                </div>
              )}
            </div>
            
            {/* Robot status */}
            <div className="robot-status">
              <span className="status-dot active"></span>
              <span className="status-text">Online</span>
            </div>
          </div>

          {/* Expanded Controls Panel */}
          {expanded && (
            <div className="robot-controls-panel">
              <div className="panel-header">
                <h4>🤖 TechBlooms Assistant</h4>
                <button 
                  className="close-panel" 
                  onClick={() => setExpanded(false)}
                  aria-label="Close robot controls"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              {/* Quick Navigation */}
              <div className="quick-navigation">
                <h5>Quick Navigation</h5>
                <div className="nav-grid">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      className="nav-btn"
                      onClick={() => {
                        if (action.action) {
                          handleQuickAction(action.action, action.label);
                        } else {
                          handleNavigate(action.section);
                        }
                      }}
                      title={action.label}
                      aria-label={`Navigate to ${action.label}`}
                    >
                      <span className="nav-icon">{action.icon}</span>
                      <span className="nav-label">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Current Message */}
              {robotMessage && (
                <div className="current-message">
                  <div className="message-bubble">
                    <p>{robotMessage}</p>
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="action-buttons">
                <button 
                  className="action-btn" 
                  onClick={() => {
                    reactToUserAction('click_button', { tagName: 'BUTTON', text: 'View History' });
                    setShowHistory(!showHistory);
                  }}
                  aria-label="View interaction history"
                >
                  <i className="fas fa-history"></i> History
                </button>
                <button 
                  className="action-btn" 
                  onClick={() => {
                    reactToUserAction('click_button', { tagName: 'BUTTON', text: 'Get Help' });
                    showRobotMessage("I can help you navigate the website! Click on any section above to get started.", 'helpful');
                  }}
                  aria-label="Get help from robot"
                >
                  <i className="fas fa-question-circle"></i> Help
                </button>
                <button 
                  className="action-btn" 
                  onClick={() => {
                    reactToUserAction('click_button', { tagName: 'BUTTON', text: 'Hide Robot' });
                    setRobotVisible(false);
                  }}
                  aria-label="Hide robot assistant"
                >
                  <i className="fas fa-eye-slash"></i> Hide
                </button>
              </div>
            </div>
          )}

          {/* Speech Bubble (always visible when message exists) */}
          {robotMessage && !expanded && (
            <div className="speech-bubble">
              <div className="bubble-content">
                <p>{robotMessage}</p>
              </div>
              <div className="bubble-tail"></div>
            </div>
          )}
        </div>
      )}

      {/* Robot History Modal */}
      {showHistory && (
        <div className="robot-history-modal">
          <div className="history-content">
            <h4>Recent Interactions</h4>
            <button 
              className="close-history" 
              onClick={() => {
                reactToUserAction('click_button', { tagName: 'BUTTON', text: 'Close History' });
                setShowHistory(false);
              }}
              aria-label="Close history"
            >
              <i className="fas fa-times"></i>
            </button>
            <div className="history-list">
              <div className="history-item">
                <span className="history-time">Just now</span>
                <span className="history-text">{robotMessage || "Welcome to TechBlooms!"}</span>
              </div>
              <div className="history-item">
                <span className="history-time">2 mins ago</span>
                <span className="history-text">Navigated to Projects section</span>
              </div>
              <div className="history-item">
                <span className="history-time">5 mins ago</span>
                <span className="history-text">Clicked on Apply Now button</span>
              </div>
              <div className="history-item">
                <span className="history-time">10 mins ago</span>
                <span className="history-text">Viewed internship programs</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Robot Activation Button (for mobile when hidden) */}
      {!robotVisible && (
        <button 
          className="robot-activation-btn"
          onClick={() => {
            reactToUserAction('click_button', { tagName: 'BUTTON', text: 'Show Robot' });
            setRobotVisible(true);
          }}
          aria-label="Show robot assistant"
        >
          <i className="fas fa-robot"></i>
        </button>
      )}
    </>
  );
};

export default RobotAssistant;