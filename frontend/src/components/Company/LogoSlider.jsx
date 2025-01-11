import React from "react";
import { useTranslation } from "react-i18next";
import Animation from "../Animation";
const LogoGrid = ({ logos }) => {
  const { t } = useTranslation();

  return (
    <Animation animationType="fade-up">
      <div className="py-8">
        <h2 className="text-4xl font-semibold font-notoSansJP text-center text-black mb-12">
          {t("Collabs.title")}
        </h2>

        {/* Grid container for logos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex justify-center border-2 border-gray-400 p-2"
            >
              <img
                src={logo}
                alt={`Company Logo ${index + 1}`}
                className="w-auto h-32 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </Animation>
  );
};

export default LogoGrid;
