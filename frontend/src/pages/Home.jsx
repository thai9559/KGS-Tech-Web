import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Layout from "../components/Layout";
import BannerSlider from "../components/BannerSlider";
import Benefits from "../components/Benefits";
import BlogSlider from "../components/BlogData";
import VerticalCarousel from "../components/Carousel";
export default function Home() {
  const { t } = useTranslation();

  const sections = [
    { id: "bannerSlider", label: "Banner Slider", active: false },
    { id: "benefits", label: "Benefits", active: false },
    { id: "blogSlider", label: "Blog Slider", active: false },
  ];

  const [activeSection, setActiveSection] = useState("bannerSlider");

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const updatedSections = sections.map((section) => {
      const element = document.getElementById(section.id);
      const offsetTop = element?.offsetTop || 0;
      const offsetHeight = element?.offsetHeight || 0;

      if (
        scrollPosition >= offsetTop - 100 &&
        scrollPosition < offsetTop + offsetHeight
      ) {
        setActiveSection(section.id);
        return { ...section, active: true };
      }
      return { ...section, active: false };
    });

    return updatedSections;
  };

  useEffect(() => { 
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const enhancedSections = sections.map((section) => ({
    ...section,
    active: section.id === activeSection,
  }));

  return (
    <Layout>
      <VerticalCarousel sections={enhancedSections} />
      <div className="flex flex-col">
        <div id="bannerSlider"  >
          <BannerSlider />
        </div>
        <div id="benefits" className="container">
          <Benefits />
        </div>
        <div id="blogSlider" className="container">
          <BlogSlider />
        </div>
      </div>
    </Layout>
  );
}
