import React, { useState, useEffect, Suspense, lazy } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import LayoutCompany from "../components/LayoutCompanyt";
import Timeline from "../components/Company/TimeLine";
import ScrollToTop from "../components/ScrollToTop";
// Lazy load components
const CoreValues = lazy(() => import("../components/Company/CoreValues"));
const CompanyOverview = lazy(() =>
  import("../components/Company/CompanyOverview")
);
const Leadership = lazy(() => import("../components/Company/LeaderShip"));
const Mission = lazy(() => import("../components/Company/Misson"));
const VerticalCarousel = lazy(() => import("../components/Carousel"));
const Banner = lazy(() => import("../components/Company/Banner"));
const TechnologyPage = lazy(() =>
  import("../components/Company/TechnologyPage")
);

const DevelopmentTimeline = lazy(() =>
  import("../components/Company/DevelopmentTimeline")
);
const Carrers = lazy(() => import("../components/Company/Careers"));

const Company = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const coreValues = [
    {
      title: t("coreValues.innovation"),
      description: t("coreValues.innovationDescription"),
    },
    {
      title: t("coreValues.responsibility"),
      description: t("coreValues.responsibilityDescription"),
    },
    {
      title: t("coreValues.collaboration"),
      description: t("coreValues.collaborationDescription"),
    },
  ];

  const leaders = [
    {
      name: "Yamada Tarou",
      position: "ceo",
      avatar:
        "https://i.pinimg.com/736x/ac/fb/a1/acfba1ae7dbb27565726c47aac8f3472.jpg",
    },
    {
      name: "Satou Ichirou",
      position: "cto",
      avatar:
        "https://i.pinimg.com/736x/3c/8e/60/3c8e60e9a61ac79b61120ecd5f5edbdc.jpg",
    },
    {
      name: "Suzuki Jirou",
      position: "coo",
      avatar:
        "https://i.pinimg.com/736x/94/0e/6e/940e6e1c37f451e7efc6420947e1f1f9.jpg",
    },
  ];

  const sections = [
    {
      id: "developerTimeline",
      label: t("developerTimeline.title"),
      active: false,
    },
    { id: "TechnologyPage", label: t("TechnologyPage.title"), active: false },
    { id: "mission", label: t("mission.title"), active: false },
    { id: "coreValues", label: t("coreValues.title"), active: false },

    { id: "Carrers", label: "Carrers", active: false },
    { id: "leadership", label: t("leadership.title"), active: false },
  ];

  const [activeSection, setActiveSection] = useState("companyOverview");

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    let activeId = "";

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;

        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          activeId = section.id;
        }
      }
    });

    if (activeId && activeId !== activeSection) {
      setActiveSection(activeId);
    }
  };

  const handleSectionClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = element.offsetTop - 80;
      window.scrollTo({
        top: offset,
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

  const enhancedSections = sections.map((section) => ({
    ...section,
    active: section.id === activeSection,
  }));

  return (
    <LayoutCompany>
      <Suspense fallback={<div>Loading...</div>}>
        <VerticalCarousel
          sections={enhancedSections}
          onSectionClick={handleSectionClick}
          activeSection={activeSection}
        />

        <div className="bg-gray-50 ">
          {/* <div>
            <Timeline />
          </div> */}

          <div id="developerTimeline" className=" min-h-[30vh]">
            <DevelopmentTimeline />
          </div>
          <div id="TechnologyPage" className=" min-h-[30vh]">
            <TechnologyPage />
          </div>
          <div id="mission" className=" min-h-[40vh]">
            <Mission mission={t("mission.description")} />
          </div>
          <div id="coreValues" className=" min-h-[30vh] ">
            <CoreValues values={coreValues} />
          </div>

          <div id="Carrers" className=" min-h-[40vh]">
            <Carrers />
          </div>

          <div id="leadership" className="">
            <Leadership leaders={leaders} />
          </div>
        </div>
        <ScrollToTop />
      </Suspense>
    </LayoutCompany>
  );
};

export default Company;
