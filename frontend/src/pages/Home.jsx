import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Layout from "../components/Layout";
import BannerSlider from "../components/Home/BannerSlider";
import Benefits from "../components/Home/Benefits";
import BlogSlider from "../components/Home/BlogData";
import VerticalCarousel from "../components/Carousel";
import CompanyStats from "../components/Home/CompanyStats";

export default function Home() {
  const { t } = useTranslation();

  const sections = [
    { id: "bannerSlider", label: "Banner Slider", active: false },
    { id: "companyStats", label: "Company Stats", active: false },
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

  const handleSectionClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setActiveSection(id);
    }
  };

  const scrollToContent = () => {
    const element = document.getElementById("companyStats");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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
      <VerticalCarousel
        sections={enhancedSections}
        onSectionClick={handleSectionClick}
      />
      <div className="flex flex-col overflow-hidden">
        <div id="bannerSlider">
          <BannerSlider onScrollToContent={scrollToContent} />
        </div>
        <div id="companyStats" className="container">
          <h2 className="text-primary text-3xl text-center  font-beVietnam font-semibold mt-10">
            {t("stats.ask")}
          </h2>
          <CompanyStats />
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
