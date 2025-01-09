import React from "react";
import { useTranslation } from "react-i18next";

const LogoGrid = ({ logos }) => {
  const { t } = useTranslation();

  return (
    <div className="py-8">
      <h2 className="text-3xl font-semibold font-notoSansJP text-center text-primary mb-12">
        {t("Collabs.title")}
      </h2>

      {/* Grid container for logos */}
      <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
        {logos.map((logo, index) => (
          <div key={index} className="flex justify-center">
            <img
              src={logo}
              alt={`Company Logo ${index + 1}`}
              className="w-auto h-24 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoGrid;
