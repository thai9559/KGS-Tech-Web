import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Thêm useLocation
import Layout from "../components/Layout";
import AboutUs from "../components/Bussiness/AboutUs";
import Services from "../components/Bussiness/Services";
import Testimonials from "../components/Bussiness/Testimonials";
import Contact from "../components/Bussiness/Contact";

import VerticalCarousel from "../components/Carousel";
import { FaLaptopCode, FaMobileAlt, FaGlobe } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function Business() {
  const { t } = useTranslation();
  const location = useLocation(); // Lấy thông tin URL
  const [activeSection, setActiveSection] = useState("aboutUs");

  const testimonials = [
    {
      quote: t("BusinessPage.whatClientsSay.testimony1"),
      name: t("BusinessPage.whatClientsSay.name1"),
      position: t("BusinessPage.whatClientsSay.position1"),
    },
    {
      quote: t("BusinessPage.whatClientsSay.testimony2"),
      name: t("BusinessPage.whatClientsSay.name2"),
      position: t("BusinessPage.whatClientsSay.position2"),
    },
    {
      quote: t("BusinessPage.whatClientsSay.testimony3"),
      name: t("BusinessPage.whatClientsSay.name3"),
      position: t("BusinessPage.whatClientsSay.position3"),
    },
    {
      quote: t("BusinessPage.whatClientsSay.testimony4"),
      name: t("BusinessPage.whatClientsSay.name4"),
      position: t("BusinessPage.whatClientsSay.position4"),
    },
  ];

  const sections = [
    { id: "aboutUs", label: t("BusinessPage.aboutUs.title"), active: false },
    { id: "services", label: t("BusinessPage.services.title"), active: false },
    { id: "testimonials", label: t("BusinessPage.whatClientsSay.title"), active: false },
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
    if (location.hash === "#contact") {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        window.scrollTo({
          top: contactSection.offsetTop - 50, // Điều chỉnh khoảng cách
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
    <Layout>
      <VerticalCarousel 
        sections={enhancedSections} 
        onSectionClick={handleSectionClick} 
      />
      <div className="bg-gray-50 py-16 px-4">
        <div id="aboutUs" className="container">
          <AboutUs
            title={t("BusinessPage.aboutUs.title")}
            description={t("BusinessPage.aboutUs.description")}
            image="https://i.pinimg.com/736x/31/a4/9c/31a49cc7862d3d096852e91a0193a39c.jpg"
          />
        </div>
        <div id="services" className="container">
          <Services
            title={t("BusinessPage.services.title")}
            services={[
              {
                title: t("BusinessPage.services.webDevelopment.title"),
                description: t("BusinessPage.services.webDevelopment.description"),
                icon: <FaLaptopCode size={40} color="#074799" />,
              },
              {
                title: t("BusinessPage.services.smartphoneAppDevelopment.title"),
                description: t("BusinessPage.services.smartphoneAppDevelopment.description"),
                icon: <FaMobileAlt size={40} color="#074799" />,
              },
              {
                title: t("BusinessPage.services.websiteDevelopment.title"),
                description: t("BusinessPage.services.websiteDevelopment.description"),
                icon: <FaGlobe size={40} color="#074799" />,
              },
            ]}
          />
        </div>
        <div id="testimonials" className="container">
          <Testimonials
            title={t("BusinessPage.whatClientsSay.title")}
            testimonials={testimonials}
          />
        </div>
        <div id="contact" className="container">
          <Contact
            title={t("BusinessPage.contact.title")}
            description={t("BusinessPage.contact.description")}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Business;
