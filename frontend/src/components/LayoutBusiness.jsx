import React from "react";
import Footer from "./Footer";
import { useTranslation } from "react-i18next";
import BannerHome from "./BannerHome";
import HeaderDemo from "./HeaderDemo";
import Services from "./Home/Homepage/Services";
import HeroSection from "./Home/Homepage/Hero";
const LayoutBusiness = ({ children }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderDemo
        home={t("home")}
        company={t("company")}
        business={t("business")}
        blog={t("blog")}
      />
      <HeroSection />

      <Services />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutBusiness;
