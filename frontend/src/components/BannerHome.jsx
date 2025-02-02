import React from "react";
import { useTranslation } from "react-i18next";
import Animation from "./Animation";

const BannerHome = () => {
  const { t } = useTranslation();

  return (
    <div className="relative w-full h-[80vh] sm:h-[100vh] rounded-lg shadow-lg overflow-hidden bg-white">
      {/* Hình ảnh */}
      <div className="w-full h-full p-2 rounded-lg bg-white">
        <img
          src="https://res.cloudinary.com/dtnuj2les/image/upload/v1738202426/full-shot-students-studying-indoors-min_ykmonm.jpg"
          alt="Banner"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0  bg-opacity-40 rounded-lg flex  flex-col justify-center items-center px-10 py-10 sm:px-20 sm:py-20 z-10">
        <Animation animationType="fade-left">
          <h2 className="text-white text-center text-4xl md:text-6xl font-bold ">
            {t("companyOverview.title")}
          </h2>
        </Animation>
        <Animation>
          <p className="mt-4 text-white font-notoSansJP text-left font-medium md:text-lg">
            {t("companyOverview.description")}
          </p>
        </Animation>
      </div>
    </div>
  );
};

export default BannerHome;
