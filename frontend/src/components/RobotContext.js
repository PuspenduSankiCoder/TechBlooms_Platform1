import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

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
  const [robotMessages, setRobotMessages] = useState([
    "Welcome to TechBlooms! I'm your research assistant.",
    "Ask me about Dr. Himadri Saha's innovative projects!"
  ]);
  const [userInput, setUserInput] = useState('');
  
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

  // DR. HIMADRI NATH SAHA INTRODUCTION FUNCTION
  const introduceHimadriSaha = useCallback(() => {
    const introductionParts = [
      "Hello everyone, I am Dr. Himadri Nath Saha. It is a pleasure to share with you the journey of innovation and research that I have been leading.",
      "In the field of Smart Agriculture, I have developed an IoT-based Drone system specifically designed to improve crop quality and monitor field health.",
      "Healthcare is another core pillar of my research. I have built an IoT-based Healthcare Monitoring System and low-cost Ultrasonic Smart Glasses for the visually impaired.",
      "For public safety, I designed a Bluetooth-enabled Smart Helmet with accident and alcohol detection for motorbikes.",
      "In Disaster Management, I developed a low-cost, autonomous GPS-based Quadcopter for reaching difficult disaster zones.",
      "My work also includes research on Mobile Ad-hoc Networks security and a Smart Voting System using Blockchain technology.",
      "My goal has always been to create technology that is advanced, affordable, and accessible to everyone. Thank you!"
    ];
    
    // Show first part immediately
    showRobotMessage(introductionParts[0], 'happy');
    
    // Queue remaining parts with delays
    introductionParts.slice(1).forEach((part, index) => {
      setTimeout(() => {
        showRobotMessage(part, index % 2 === 0 ? 'excited' : 'happy');
      }, (index + 1) * 7000); // 7-second intervals
    });
  }, [showRobotMessage]);

  // React to different user actions
  const reactToUserAction = useCallback((actionType, element = {}) => {
    trackUserAction(actionType, element);
    
    const reactions = {
      click_button: [
        { message: "Excellent choice! This leads to innovative research opportunities!", expression: 'excited' },
        { message: "Perfect selection! You're exploring cutting-edge technology!", expression: 'happy' },
        { message: "Great choice! This aligns with Dr. Saha's research philosophy!", expression: 'wink' }
      ],
      click_project: [
        { message: "Innovative project selection! This could lead to impactful research!", expression: 'excited' },
        { message: "Great research interest! This aligns with IoT and smart technology domains!", expression: 'happy' }
      ],
      robot_click: [
        { message: "Hello! I'm your research assistant. Ask me about Dr. Himadri Saha's innovations!", expression: 'happy' },
        { message: "Need research guidance? I can tell you about IoT projects or smart technologies!", expression: 'helpful' },
        { message: "Click 'Research' to learn about Dr. Saha's groundbreaking work!", expression: 'wink' }
      ],
      research_interest: [
        { message: "Interested in IoT? Dr. Saha has developed smart agriculture and healthcare systems!", expression: 'excited' },
        { message: "Curious about blockchain? Ask about the secure voting system research!", expression: 'happy' },
        { message: "Want to know about disaster management? The autonomous quadcopter is revolutionary!", expression: 'excited' }
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
    
    const sectionMessages = {
      home: "Welcome to our research hub! Explore Dr. Saha's innovative projects!",
      projects: "Discover research projects in IoT, healthcare, and smart technologies!",
      internships: "Find hands-on research opportunities with expert mentorship!",
      faculty: "Learn about Dr. Himadri Saha's groundbreaking research work!",
      workshops: "Enhance your skills with research methodology workshops!",
      contact: "Connect with our research team for collaborations!"
    };
    
    setTimeout(() => {
      setGuideMode(false);
      showRobotMessage(sectionMessages[sectionId] || "Explore this research section!", 'happy', true, 4000);
    }, 1200);
  }, [moveRobot, showRobotMessage]);

  // Share random research topic
  const shareResearchTopic = useCallback(() => {
    const researchTopics = [
      "IoT-based Smart Agriculture Drone System for crop monitoring",
      "Healthcare Monitoring System with real-time patient tracking",
      "Ultrasonic Smart Glasses for visually impaired navigation",
      "Smart Helmet with accident and alcohol detection",
      "Autonomous GPS Quadcopter for disaster management",
      "Blockchain-based Secure Voting System",
      "MANET security research for mobile networks"
    ];
    
    const randomTopic = researchTopics[Math.floor(Math.random() * researchTopics.length)];
    showRobotMessage(`Research Focus: ${randomTopic}`, 'excited');
  }, [showRobotMessage]);

  // Initialize robot
  useEffect(() => {
    // Welcome message after 2 seconds
    const timer = setTimeout(() => {
      showRobotMessage("Welcome to TechBlooms Research! I'm your assistant. Click 'Research' to learn about Dr. Himadri Saha's work!", 'welcome');
    }, 2000);
    
    return () => clearTimeout(timer);
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
      introduceHimadriSaha,  // ← Added this
      shareResearchTopic     // ← Added this
    }}>
      {children}
    </RobotContext.Provider>
  );
};

export default RobotContext;