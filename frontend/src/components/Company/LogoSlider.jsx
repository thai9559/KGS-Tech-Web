import React from "react";
import { useTranslation } from "react-i18next";
import Animation from "../Animation";

const LogoGrid = ({ logos }) => {
  const { t } = useTranslation();

  return (
    <Animation animationType="fade-up">
      <div className="py-16 bg-gradient-to-b from-blue-50 to-white">
        {/* Tiêu đề */}
        <h2 className="text-3xl md:text-4xl font-notoSansJP font-extrabold text-center text-gray-800 mb-12">
          {t("Collabs.title")}
        </h2>

        {/* Grid container for logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 px-4 lg:px-12">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center bg-white shadow-lg rounded-lg p-6 transform transition-transform duration-300 hover:scale-110 hover:shadow-xl"
            >
              <img
                src={logo}
                alt={`Company Logo ${index + 1}`}
                className="w-auto h-24 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </Animation>
  );
};

export default LogoGrid;
