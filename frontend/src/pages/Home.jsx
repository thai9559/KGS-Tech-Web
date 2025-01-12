import React, { useState, useEffect, Suspense } from "react";
import { useTranslation } from "react-i18next";
import LayoutHeader from "../components/LayoutHeader";
import { Link } from "react-router-dom";
import VerticalCarousel from "../components/Carousel";
import ScrollToTop from "../components/ScrollToTop";

// Lazy load các component
const CompanyStats = React.lazy(() =>
  import("../components/Home/CompanyStats")
);
const Benefit = React.lazy(() => import("../components/Home/Benefit"));
const BlogSlider = React.lazy(() => import("../components/Home/BlogData"));
const LogoGrid = React.lazy(() => import("../components/Company/LogoSlider"));
const Message = React.lazy(() => import("../components/Home/message"));
const ImageBanner = React.lazy(() => import("../components/Home/ImageBanner"));

export default function Home() {
  const { t } = useTranslation();

  const sections = [
    { id: "companyStats", label: "Company Stats", active: false },
    { id: "benefits", label: "Benefits", active: false },
    { id: "images", label: "Images", active: false },
    { id: "logos", label: "Logos", active: false },
    { id: "message", label: "Message", active: false },
    { id: "blogSlider", label: "Blog Slider", active: false },
  ];

  const [activeSection, setActiveSection] = useState("bannerSlider");

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const headerHeight = 60; // Điều chỉnh chiều cao của header nếu cần
    const updatedSections = sections.map((section) => {
      const element = document.getElementById(section.id);
      const offsetTop = element?.offsetTop || 0;
      const offsetHeight = element?.offsetHeight || 0;

      if (
        scrollPosition >= offsetTop - headerHeight &&
        scrollPosition < offsetTop + offsetHeight - headerHeight
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
      const headerHeight = 60; // Điều chỉnh độ cao của header nếu cần
      const offsetTop = element.offsetTop;

      // Cuộn đến vị trí phần tử, trừ đi độ cao của header
      window.scrollTo({
        top: offsetTop - headerHeight,
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
  ];

  const title = t("message.title");
  const slogan = t("message.slogan");

  const message = [
    {
      quote: t("message.message1"),
      image:
        "https://res.cloudinary.com/dtnuj2les/image/upload/v1736487629/b_hnlxy0.jpg",
      name: t("message.name1"),
      position: t("message.position"),
    },
  ];

  return (
    <LayoutHeader>
      <VerticalCarousel
        sections={enhancedSections}
        onSectionClick={handleSectionClick}
      />
      <div className="flex flex-col overflow-hidden">
        <div id="companyOverview">
          <div className="bg-[#B6CBBD] p-4 h-[200px] flex flex-col justify-center items-center sm:hidden">
            <h1 className="text-xl text-primary font-notoSansJP font-bold">
              {t("banner.title")}
            </h1>
            <p className="text-sm text-gray-700 font-notoSansJP font-medium ">
              {t("banner.slogan")}
            </p>
            <button className="mt-6 px-6 py-3 text-black font-notoSansJP font-medium rounded-lg border-2 border-white bg-transparent hover:text-white hover:bg-primary focus:outline-none">
              <Link to="business/#services">{t("banner.description")}</Link>
            </button>
          </div>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <div id="companyStats" className="container">
            <h2 className="text-black text-3xl text-center font-notoSansJP font-semibold mt-10">
              {t("stats.ask")}
            </h2>
            <CompanyStats />
          </div>
          <div id="benefits">
            <Benefit />
          </div>
          <div id="images" className="bannerImage">
            <ImageBanner />
          </div>
          <div id="logos" className="container ">
            <LogoGrid logos={logos} />
          </div>
          <div id="message" className="bannerImage">
            <Message slogan={slogan} title={title} message={message} />
          </div>
          <div id="blogSlider" className="container">
            <BlogSlider />
          </div>
        </Suspense>
      </div>

      {/* Gọi component ScrollToTop ở đây */}
      <ScrollToTop />
    </LayoutHeader>
  );
}
