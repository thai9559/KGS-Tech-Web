import React from "react";
import Header from "./Header";
import HeroSection from "./Hero";
import Services from "./Services";
const Homepage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <HeroSection />
      <Services />
    </div>
  );
};

export default Homepage;
