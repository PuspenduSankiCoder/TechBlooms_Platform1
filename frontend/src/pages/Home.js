import React from 'react';
import Hero from '../components/Hero';
import Carousel from '../components/Carousel';
import Features from '../components/Features';
import Projects from '../components/Projects';
import Internships from '../components/Internships';
import Faculty from '../components/Faculty';
import Workshops from '../components/Workshops';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <div id="home">
      <Hero />
      <Carousel />
      <Features />
      <Projects />
      <Internships />
      <Faculty />
      <Workshops />
      <Contact />
    </div>
  );
};

export default Home;


