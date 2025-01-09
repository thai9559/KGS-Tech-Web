// src/components/Animation.js
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import CSS của AOS

const Animation = ({ children, animationType = "zoom-in", duration = 1000, once = true }) => {
  useEffect(() => {
    AOS.init({
      duration: duration, 
      easing: "ease-in-out", 
      once: once, 
    });
  }, [duration, once]);

  return (
    <div data-aos={animationType}>
      {children}
    </div>
  );
};

export default Animation;
