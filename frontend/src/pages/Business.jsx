import React, { useState, useEffect, Suspense, lazy } from "react";
import Layout from "../components/Layout";
import LayoutBusiness from "../components/LayoutBusiness";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Lazy load components
const AboutUs = lazy(() => import("../components/Bussiness/AboutUs"));
const Services = lazy(() => import("../components/Bussiness/Services"));
const Testimonials = lazy(() => import("../components/Bussiness/Testimonials"));
const Contact = lazy(() => import("../components/Bussiness/Contact"));
const Service = lazy(() => import("../components/Bussiness/Service"));
const VerticalCarousel = lazy(() => import("../components/Carousel"));

function Business() {
  const { t } = useTranslation();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("aboutUs");

  const sections = [
    { id: "aboutUs", label: t("BusinessPage.aboutUs.title"), active: false },
    { id: "services", label: t("BusinessPage.services.title"), active: false },
    {
      id: "testimonials",
      label: t("BusinessPage.whatClientsSay.title"),
      active: false,
    },
    { id: "contact", label: t("BusinessPage.contact.title"), active: false },
  ];

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    let activeId = "";

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      const offsetTop = element?.offsetTop || 0;
      const offsetHeight = element?.offsetHeight || 0;

      if (
        scrollPosition >= offsetTop &&
        scrollPosition < offsetTop + offsetHeight
      ) {
        activeId = section.id;
      }
    });
    if (activeId && activeId !== activeSection) {
      setActiveSection(activeId);
    }
  };

  const handleSectionClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeSection]);

  // Cuộn đến phần "Contact" nếu URL có chứa #contact
  useEffect(() => {
    const hash = location.hash;
    let targetId = "";

    if (hash === "#contact") {
      targetId = "contact";
    } else if (hash === "#services") {
      targetId = "services";
    }

    if (targetId) {
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 50,
          behavior: "smooth",
        });
      }
    }
  }, [location]);

  const enhancedSections = sections.map((section) => ({
    ...section,
    active: section.id === activeSection,
  }));

  return (
    <LayoutBusiness>
      <Suspense fallback={<div>Loading...</div>}>
        <VerticalCarousel
          sections={enhancedSections}
          onSectionClick={handleSectionClick}
        />
        <div className=" py-6 px-4">
          <div id="services" className="container">
            <Service />
          </div>

          <div id="contact" className="container">
            <Contact
              title={t("BusinessPage.contact.title")}
              description={t("BusinessPage.contact.description")}
            />
          </div>
        </div>
      </Suspense>
    </LayoutBusiness>
  );
}

export default Business;
