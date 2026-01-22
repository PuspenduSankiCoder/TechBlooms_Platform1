export const initRobotObserver = (messages) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && window.aiRobotSpeak) {
          const msg = messages[entry.target.id];
          if (msg) window.aiRobotSpeak(msg);
        }
      });
    },
    { threshold: 0.6 }
  );

  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });
};
