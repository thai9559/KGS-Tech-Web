import React from "react";
import Footer from "./Footer";
import { useTranslation } from "react-i18next";
import BannerHome from "./BannerHome";
import HeaderDemo from "./HeaderDemo";
import VideoBanner from "./Videobanner";
const LayoutHeader = ({ children }) => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col min-h-screen">
            <HeaderDemo home={t("home")}
                company={t("company")}
                business={t("business")}
                blog={t("blog")} />
            <BannerHome />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
};

export default LayoutHeader;
