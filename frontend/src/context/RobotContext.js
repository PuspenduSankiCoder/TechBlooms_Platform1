import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';

// Create the context
const RobotContext = createContext();

// Custom hook to use the robot context
export const useRobot = () => {
  const context = useContext(RobotContext);
  if (!context) {
    throw new Error('useRobot must be used within a RobotProvider');
  }
  return context;
};

// Create the provider component
export const RobotProvider = ({ children }) => {
  // Robot state
  const [robotVisible, setRobotVisible] = useState(true);
  const [robotPosition, setRobotPosition] = useState({ x: 85, y: 80 });
  const [robotExpression, setRobotExpression] = useState('happy');
  const [robotMessage, setRobotMessage] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [robotMovement, setRobotMovement] = useState('idle');
  const [messageHistory, setMessageHistory] = useState([]);
  const [userActions, setUserActions] = useState([]);
  const [guideMode, setGuideMode] = useState(false);
  const [robotMessages, setRobotMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  
  // Ref to track if introduction has been shown
  const hasIntroduced = useRef(false);

  // Function to toggle robot visibility
  const toggleRobot = () => {
    setRobotVisible(prev => !prev);
  };

  // Function to update robot position
  const updatePosition = (x, y) => {
    setRobotPosition({ x, y });
  };

  // Function to add a message
  const addMessage = (message) => {
    setRobotMessages(prev => [...prev, message]);
  };

  // Function to clear messages
  const clearMessages = () => {
    setRobotMessages([]);
  };

  // Track user actions
  const trackUserAction = useCallback((actionType, element) => {
    const newAction = {
      type: actionType,
      element: element?.tagName || 'unknown',
      text: element?.text || element?.textContent?.substring(0, 50) || '',
      timestamp: new Date().toISOString(),
      url: window.location.pathname
    };
    
    setUserActions(prev => [...prev.slice(-9), newAction]);
  }, []);

  // Speak message with Web Speech API
  const speakMessage = useCallback((text) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  }, []);

  // Show robot message with expression
  const showRobotMessage = useCallback((message, expression = 'happy', autoSpeak = true, duration = 5000) => {
    setRobotExpression(expression);
    setRobotMessage(message);
    setMessageHistory(prev => [...prev.slice(-4), { 
      message, 
      expression, 
      timestamp: new Date().toISOString() 
    }]);
    
    // Also add to robot messages list
    addMessage(message);
    
    if (autoSpeak) {
      speakMessage(message);
    }
    
    setTimeout(() => {
      setRobotMessage('');
    }, duration);
  }, [speakMessage, addMessage]);

  // Move robot smoothly
  const moveRobot = useCallback((x, y, animation = 'smooth') => {
    setRobotMovement(animation);
    setRobotPosition({ x, y });
    
    setTimeout(() => {
      setRobotMovement('idle');
    }, 1000);
  }, []);

  // REACT TO USER ACTION FUNCTION
  const reactToUserAction = useCallback((actionType, element = {}) => {
    trackUserAction(actionType, element);
    
    const reactions = {
      click_button: [
        { message: "Great choice! That button will take you to exciting opportunities!", expression: 'excited' },
        { message: "Perfect click! You're making progress!", expression: 'happy' },
        { message: "That button looks interesting! Good choice!", expression: 'wink' }
      ],
      click_project: [
        { message: "Awesome project selection! This one has great potential!", expression: 'excited' },
        { message: "Great taste in projects! This could lead to amazing research!", expression: 'happy' }
      ],
      robot_click: [
        { message: "Hello again! Need guidance with anything?", expression: 'wink' },
        { message: "Thanks for checking in! How can I assist you today?", expression: 'helpful' },
        { message: "I'm here to help you navigate the site!", expression: 'happy' }
      ]
    };
    
    const actionReactions = reactions[actionType] || reactions.click_button;
    const reaction = actionReactions[Math.floor(Math.random() * actionReactions.length)];
    
    showRobotMessage(reaction.message, reaction.expression);
    
    // Add animation for robot clicks
    if (actionType === 'robot_click') {
      setRobotMovement('bounce');
      setTimeout(() => setRobotMovement('idle'), 500);
    }
  }, [trackUserAction, showRobotMessage]);

  // Guide user to specific sections
  const guideToSection = useCallback((sectionId) => {
    const sectionPositions = {
      home: { x: 85, y: 80 },
      projects: { x: 40, y: 80 },
      internships: { x: 60, y: 80 },
      faculty: { x: 20, y: 80 },
      workshops: { x: 10, y: 80 },
      contact: { x: 5, y: 80 }
    };
    
    const position = sectionPositions[sectionId] || { x: 85, y: 80 };
    setGuideMode(true);
    moveRobot(position.x, position.y, 'walk');
    
    setTimeout(() => {
      setGuideMode(false);
      showRobotMessage(`Now exploring: ${sectionId} section!`, 'happy', true, 4000);
    }, 1200);
  }, [moveRobot, showRobotMessage]);

  // Initialize robot - Only show introduction once
  useEffect(() => {
    if (!hasIntroduced.current) {
      const timer = setTimeout(() => {
        showRobotMessage("Hi! I'm your TechBlooms assistant. Click on me for guidance!", 'welcome');
        hasIntroduced.current = true;
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [showRobotMessage]);

  return (
    <RobotContext.Provider value={{
      robotVisible,
      setRobotVisible,
      robotPosition,
      setRobotPosition,
      robotExpression,
      robotMessage,
      isSpeaking,
      robotMovement,
      messageHistory,
      guideMode,
      robotMessages,
      setRobotMessages,
      userInput,
      setUserInput,
      toggleRobot,
      updatePosition,
      addMessage,
      clearMessages,
      showRobotMessage,
      reactToUserAction,
      guideToSection,
      moveRobot,
      speakMessage,
      hasIntroduced: hasIntroduced.current
    }}>
      {children}
    </RobotContext.Provider>
  );
};

export default RobotContext;                        