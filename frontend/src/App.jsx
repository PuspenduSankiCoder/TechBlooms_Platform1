import { useEffect } from "react";
import AIRobot from "./components/AIRobot";
import { initRobotObserver } from "./utils/sectionObserver";

function App() {
  useEffect(() => {
    initRobotObserver({
      hero: "Welcome to a global innovation-driven education platform.",
      projects:
        "Here students work on real world AI, Cyber Security, and Blockchain projects.",
      courses:
        "Our courses are guided by world-class leaders and researchers.",
      login:
        "Sign up to collaborate, publish research, and grow your career."
    });
  }, []);

  return (
    <>
      {/* Your existing layout */}
      <section id="hero">...</section>
      <section id="projects">...</section>
      <section id="courses">...</section>
      <section id="login">...</section>

      {/* AI Robot */}
      <AIRobot />
    </>
  );
}

export default App;
