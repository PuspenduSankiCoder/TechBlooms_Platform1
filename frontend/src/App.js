import React, { useState, useEffect } from 'react';
import { RobotProvider } from './context/RobotContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import RobotAssistant from './components/RobotAssistant';
import Register from './pages/Register';
import Login from './pages/Login';
import Advisers from "./components/Advisers"; // Keep this if you're using it elsewhere
import Profile from './pages/Profile';
import Home from './pages/Home'; // This is your main page component
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', !darkMode ? 'dark' : 'light');
  };

  return (
    <AuthProvider>
      <Router>
        <RobotProvider>
          <div className="App">
            <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
            <Header />
            
            {/* Add Robot Assistant */}
            <RobotAssistant />
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Footer />
          </div>
        </RobotProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;