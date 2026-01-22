import { useEffect, useState, useRef } from "react";
import Lottie from "lottie-react";
import robotAnimation from "../assets/robot.lottie";
import "../styles/aiRobot.css";

export default function AIRobot() {
  const [visible, setVisible] = useState(false);
  const [speech, setSpeech] = useState("");
  const synthRef = useRef(window.speechSynthesis);

  // show robot only once (first visit)
  useEffect(() => {
    if (!localStorage.getItem("aiRobotShown")) {
      setTimeout(() => {
        setVisible(true);
        speak(
          "Hello! I am your AI mentor. I will guide you through this platform."
        );
        localStorage.setItem("aiRobotShown", "true");
      }, 3500);
    }
  }, []);

  // voice function
  const speak = (text) => {
    setSpeech(text);
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.95;
    utterance.pitch = 1.05;

    synthRef.current.speak(utterance);
  };

  // expose function globally (important)
  window.aiRobotSpeak = speak;

  if (!visible) return null;

  return (
    <div className="ai-robot-container">
      {speech && <div className="ai-speech-box">{speech}</div>}

      <Lottie
        animationData={robotAnimation}
        loop
        style={{ width: "140px" }}
      />
    </div>
  );
}
