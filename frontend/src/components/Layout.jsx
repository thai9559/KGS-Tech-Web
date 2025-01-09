import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useTranslation } from "react-i18next";
import HeaderDemo from "./HeaderDemo";
import VideoBanner from "./Videobanner";
const Layout = ({ children }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col min-h-screen">
       <Header
        home={t("home")}
        company={t("company")}
        business={t("business")}
        blog={t("blog")}
      /> 
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
