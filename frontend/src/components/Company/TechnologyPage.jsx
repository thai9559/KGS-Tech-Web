import React from "react";
import {
  FaBrain,
  FaDatabase,
  FaCloud,
  FaTabletAlt,
  FaWifi,
  FaBolt,
} from "react-icons/fa"; // Import các icon phù hợp
import { useTranslation } from "react-i18next"; // Import useTranslation từ react-i18next

const TechnologyPage = () => {
  const { t } = useTranslation(); // Shook để lấy chuỗi từ i18n

  const technologies = [
    {
      icon: <FaBrain className="w-16 h-16 text-blue-500 mx-auto" />, // Trí tuệ nhân tạo
      title: t("TechnologyPage.technologies.0.title"), // Sử dụng chuỗi từ i18n
    },
    {
      icon: <FaDatabase className="w-16 h-16 text-blue-500 mx-auto" />, // Phân tích dữ liệu
      title: t("TechnologyPage.technologies.1.title"),
    },
    {
      icon: <FaWifi className="w-16 h-16 text-blue-500 mx-auto" />, // IoT
      title: t("TechnologyPage.technologies.2.title"),
    },
    {
      icon: <FaTabletAlt className="w-16 h-16 text-blue-500 mx-auto" />, // Thiết bị thông minh
      title: t("TechnologyPage.technologies.3.title"),
    },
    {
      icon: <FaCloud className="w-16 h-16 text-blue-500 mx-auto" />, // Điện toán đám mây
      title: t("TechnologyPage.technologies.4.title"),
    },
    {
      icon: <FaBolt className="w-16 h-16 text-blue-500 mx-auto" />, // Thiết kế hệ thống
      title: t("TechnologyPage.technologies.5.title"),
    },
  ];

  return (
    <div className="bg-[#f8fbff] py-16 px-6 md:px-12 lg:px-24">
      {/* Tiêu đề */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
        {t("TechnologyPage.title")} {/* Dùng chuỗi dịch cho tiêu đề */}
      </h1>

      {/* Grid Technologies */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {technologies.map((tech, index) => (
          <div
            key={index}
            className="bg-white border border-blue-200 rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow duration-300"
          >
            {/* Icon */}
            {tech.icon}
            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-800 mt-6">
              {tech.title} {/* Dùng chuỗi dịch cho tiêu đề công nghệ */}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnologyPage;
