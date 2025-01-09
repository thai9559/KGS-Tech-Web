import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import LayoutHeader from "../components/LayoutHeader";
import CompanyStats from "../components/Home/CompanyStats";
import Benefit from "../components/Home/Benefit";
import BlogSlider from "../components/Home/BlogData";
import VerticalCarousel from "../components/Carousel";
import LogoGrid from "../components/Company/LogoSlider";

export default function Home() {
  const { t } = useTranslation();

  const sections = [
    { id: "companyStats", label: "Company Stats", active: false },
    { id: "benefits", label: "Benefits", active: false },
    { id: "logos", label: "logos", active: false },
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

  const logos = [
    "https://res.cloudinary.com/dtnuj2les/image/upload/v1735886228/kmslogo_l2fx2y.png",
    "https://res.cloudinary.com/dtnuj2les/image/upload/v1735886295/viettel-removebg-preview_brfhlc.png",
    "https://res.cloudinary.com/dtnuj2les/image/upload/v1735886393/LG-removebg-preview_dmc3t5.png",
    "https://res.cloudinary.com/dtnuj2les/image/upload/v1735886392/fpt-removebg-preview_dlhdq6.png",
    "https://res.cloudinary.com/dtnuj2les/image/upload/v1735886392/hitachi-removebg-preview_geekow.png",
    "https://res.cloudinary.com/dtnuj2les/image/upload/v1735886392/vng-removebg-preview_sokbcl.png",
    "https://res.cloudinary.com/dtnuj2les/image/upload/v1735886519/itel-mobile-logo-vector-removebg-preview_miveta.png",
  ];

  return (
    <LayoutHeader>
      <VerticalCarousel
        sections={enhancedSections}
        onSectionClick={handleSectionClick}
      />
      <div className="flex flex-col overflow-hidden">
        <div id="companyStats" className="container">
          <h2 className="text-primary text-3xl text-center font-beVietnam font-semibold mt-10">
            {t("stats.ask")}
          </h2>
          <CompanyStats />
        </div>
        <div id="benefits" >
          <Benefit />
        </div>
        <div id="logos" className="container">
          <LogoGrid logos={logos} />
        </div>
        <div id="blogSlider" className="container">
          <BlogSlider />
        </div>
      </div>
    </LayoutHeader>
  );
}
