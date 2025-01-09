import React from "react";
import { useTranslation } from "react-i18next";
const BannerHome = () => {
  const { t } = useTranslation();
  return (
    <div
      className="relative w-full h-[117vh] sm:h-[100vh] overflow-hidden bg-cover bg-top"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dtnuj2les/image/upload/v1736130775/full-shot-smiley-people-work-min_qreonb.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute p-8 top-0 left-0 w-full h-full bg-black bg-opacity-40 flex flex-col justify-center items-center z-10 hidden md:flex">
        <h2 className="text-white text-4xl md:text-6xl font-bold text-center">
          {t("companyOverview.title")}
        </h2>
        <p className="text-sm text-white font-notoSansJP font-medium md:text-lg mt-2">
          {t("companyOverview.description")}
        </p>
      </div>
    </div>
  );
};

export default BannerHome;
