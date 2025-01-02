import React, { useState, useEffect } from 'react';
import CoreValues from '../components/Company/CoreValues';
import CompanyOverview from '../components/Company/CompanyOverview';
import Leadership from '../components/Company/LeaderShip';
import Mission from '../components/Company/Misson';
import Layout from '../components/Layout';
import { useTranslation } from 'react-i18next';
import VerticalCarousel from '../components/Carousel';

const Company = () => {
  const { t } = useTranslation();

  const coreValues = [
    { 
      title: t('coreValues.innovation'), 
      description: t('coreValues.innovationDescription') 
    },
    { 
      title: t('coreValues.responsibility'), 
      description: t('coreValues.responsibilityDescription') 
    },
    { 
      title: t('coreValues.collaboration'), 
      description: t('coreValues.collaborationDescription') 
    },
    {
      title: t('coreValues.creativity'),
      description: t('coreValues.creativityDescription')
    },
    
  ];

  const leaders = [
    { name: 'Nguyễn Văn A', position: t('leadership.ceo'), avatar: 'https://i.pinimg.com/736x/ac/fb/a1/acfba1ae7dbb27565726c47aac8f3472.jpg' },
    { name: 'Trần Thị B', position: t('leadership.cto'), avatar: 'https://i.pinimg.com/736x/3c/8e/60/3c8e60e9a61ac79b61120ecd5f5edbdc.jpg' },
    { name: 'Lê Văn C', position: t('leadership.coo'), avatar: 'https://i.pinimg.com/736x/94/0e/6e/940e6e1c37f451e7efc6420947e1f1f9.jpg' },
  ];

  const sections = [
    { id: 'companyOverview', label: t('companyOverview.title'), active: false },
    { id: 'coreValues', label: t('coreValues.title'), active: false },
    { id: 'mission', label: t('mission.title'), active: false },
    { id: 'leadership', label: t('leadership.title'), active: false },
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
      const offset = element.offsetTop - 100; // Điều chỉnh offset để tránh bị che khuất
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
    <Layout>
      {/* Carousel Section */}
      <VerticalCarousel
        sections={enhancedSections}
        onSectionClick={handleSectionClick}
        activeSection={activeSection}
      />

      <div className="bg-gray-50 py-16 px-4">
        <div id="companyOverview" className="container min-h-[40vh] ">
          <CompanyOverview
            title={t('companyOverview.title')}
            description={t('companyOverview.description')}
          />
        </div>

        {/* Core Values */}
        <div id="coreValues" className="container min-h-[20vh] ">
          <CoreValues values={coreValues} />
        </div>

        {/* Mission */}
        <div id="mission" className="container min-h-[40vh]">
          <Mission mission={t('mission.description')} />
        </div>

        {/* Leadership */}
        <div id="leadership" className="container">
          <Leadership leaders={leaders} />
        </div>
      </div>
    </Layout>
  );
};

export default Company;
