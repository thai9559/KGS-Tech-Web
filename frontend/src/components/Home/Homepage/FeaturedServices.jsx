import React from "react";
import { FaDesktop, FaMobileAlt, FaGlobe } from "react-icons/fa"; // Import các icon
import { useTranslation } from "react-i18next"; // Import useTranslation từ react-i18next

const FeaturedServices = () => {
  const { t } = useTranslation(); // Sử dụng hook useTranslation để lấy các chuỗi ngôn ngữ

  const services = [
    {
      title: t("FeaturedServices.services.web_development.title"),
      description: t("FeaturedServices.services.web_development.description"),
      icon: <FaDesktop className="w-12 h-12 text-blue-500 mx-auto" />, // Icon React
    },
    {
      title: t("FeaturedServices.services.mobile_development.title"),
      description: t(
        "FeaturedServices.services.mobile_development.description"
      ),
      icon: <FaMobileAlt className="w-12 h-12 text-blue-500 mx-auto" />, // Icon React
    },
    {
      title: t("FeaturedServices.services.website_development.title"),
      description: t(
        "FeaturedServices.services.website_development.description"
      ),
      icon: <FaGlobe className="w-12 h-12 text-blue-500 mx-auto" />, // Icon React
    },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-16 px-6 md:px-12 lg:px-24">
      {/* Tiêu đề */}
      <h1 className="text-3xl md:text-4xl font-notoSansJP font-semibold text-center text-gray-800 mb-12">
        {t("FeaturedServices.title")}
      </h1>

      {/* Grid Services */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-12">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg font-notoSansJP hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col items-center"
          >
            {/* Icon */}
            <div className="bg-blue-100 rounded-full p-4 mb-6">
              {service.icon}
            </div>
            {/* Title */}
            <h2 className="text-xl text-center font-bold text-gray-800 mb-4">
              {service.title}
            </h2>
            {/* Description */}
            <p className="text-gray-600 text-base text-center">
              {service.description}
            </p>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="text-center mt-16">
        <a
          href="/business" // Đường dẫn tới trang Business
          className="inline-block px-8 py-4 bg-blue-500 text-white text-lg font-semibold rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-300"
        >
          {t("FeaturedServices.cta.view_more")}
        </a>
      </div>
    </div>
  );
};

export default FeaturedServices;
