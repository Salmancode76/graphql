import React, { useEffect } from "react";

const Bubbles = () => {
  useEffect(() => {
    const createBubbles = () => {
      const container = document.getElementById("bubbleContainer");
      if (!container) return;

      const bubbleCount = 20;

      for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement("div");
        bubble.classList.add("bubble");

        const size = Math.random() * 300 + 150;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;

        const x = Math.random() * 100;
        const y = Math.random() * 100;
        bubble.style.left = `${x}%`;
        bubble.style.top = `${y}%`;

        const duration = Math.random() * 25 + 15;
        const delay = Math.random() * 10;
        bubble.style.animationDuration = `${duration}s`;
        bubble.style.animationDelay = `${delay}s`;

        const opacity = Math.random() * 0.1 + 0.03;
        bubble.style.background = `rgba(156, 45, 250, ${opacity})`;

        container.appendChild(bubble);
      }
    };

    createBubbles();
  }, []);

  return <div className="bubble-container" id="bubbleContainer"></div>;
};

export default Bubbles;
