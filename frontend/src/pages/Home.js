import React from 'react';
import Hero from '../components/Hero';
import Carousel from '../components/Carousel';
import Features from '../components/Features';
import Projects from '../components/Projects';
import Internships from '../components/Internships';
import Faculty from '../components/Faculty';
import Advisers from '../components/Advisers'; // Import Advisers
import Workshops from '../components/Workshops';
import Contact from '../components/Contact';

const Home = () => {
  // Robot interaction functions would be handled in RobotAssistant component
  // You can pass callbacks if needed
  
  return (
    <main>
      <Hero id="home" />
      <Carousel id="carousel" />
      <Features id="features" />
      <Projects id="projects" />
      <Internships id="internships" />
      <Faculty id="faculty" />
      <Workshops id="workshops" />
       <Advisers id="advisers"></Advisers>
      <Contact id="contact" />
    </main>
  );
};

export default Home;