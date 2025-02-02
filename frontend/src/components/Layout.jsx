import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useTranslation } from "react-i18next";
import HeaderDemo from "./HeaderDemo";
import BannerSlider from "./Home/BannerSlider";

const Layout = ({ children, showBanner = false }) => {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col min-h-screen">
      {/* Sử dụng HeaderDemo nếu có banner, ngược lại dùng Header */}
      {showBanner ? (
        <HeaderDemo
          home={t("home")}
          company={t("company")}
          business={t("business")}
          blog={t("blog")}
        />
      ) : (
        <Header
          home={t("home")}
          company={t("company")}
          business={t("business")}
          blog={t("blog")}
        />
      )}
      {/* Hiển thị BannerSlider khi showBanner = true */}
      {showBanner && <BannerSlider />}
      <main className="flex-grow">{children}</main>
      <Footer />
    </section>
  );
};

export default Layout;
