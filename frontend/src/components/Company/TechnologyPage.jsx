import React from "react";
import {
  FaBrain,
  FaDatabase,
  FaCloud,
  FaTabletAlt,
  FaWifi,
  FaBolt,
} from "react-icons/fa"; // Import các icon phù hợp

const TechnologyPage = () => {
  const technologies = [
    {
      icon: <FaBrain className="w-16 h-16 text-blue-500 mx-auto" />, // Trí tuệ nhân tạo
      title: "Trí tuệ nhân tạo",
    },
    {
      icon: <FaDatabase className="w-16 h-16 text-blue-500 mx-auto" />, // Phân tích dữ liệu
      title: "Phân tích dữ liệu",
    },
    {
      icon: <FaWifi className="w-16 h-16 text-blue-500 mx-auto" />, // IoT
      title: "IoT",
    },
    {
      icon: <FaTabletAlt className="w-16 h-16 text-blue-500 mx-auto" />, // Thiết bị thông minh
      title: "Thiết bị thông minh",
    },
    {
      icon: <FaCloud className="w-16 h-16 text-blue-500 mx-auto" />, // Điện toán đám mây
      title: "Điện toán đám mây",
    },
    {
      icon: <FaBolt className="w-16 h-16 text-blue-500 mx-auto" />, // 5G
      title: "Thiết kê hệ thống",
    },
  ];

  return (
    <div className="bg-[#f8fbff] py-16 px-6 md:px-12 lg:px-24">
      {/* Tiêu đề */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
        Công nghệ tiên phong
      </h1>

      {/* Grid Services */}
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
              {tech.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnologyPage;
