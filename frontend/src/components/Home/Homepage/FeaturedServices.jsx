import React from "react";
import { FaDesktop, FaMobileAlt, FaGlobe } from "react-icons/fa"; // Import các icon

const FeaturedServices = () => {
  const services = [
    {
      title: "Phát triển hệ thống web",
      description:
        "Cung cấp giải pháp phát triển hệ thống web mạnh mẽ và tối ưu cho doanh nghiệp.",
      icon: <FaDesktop className="w-12 h-12 text-blue-500 mx-auto" />, // Icon React
    },
    {
      title: "Phát triển ứng dụng di động",
      description:
        "Thiết kế và phát triển ứng dụng di động chất lượng cao cho Android và iOS.",
      icon: <FaMobileAlt className="w-12 h-12 text-blue-500 mx-auto" />, // Icon React
    },
    {
      title: "Phát triển website",
      description:
        "Xây dựng các trang web hiện đại, chuẩn SEO và tối ưu hóa trải nghiệm người dùng.",
      icon: <FaGlobe className="w-12 h-12 text-blue-500 mx-auto" />, // Icon React
    },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-16 px-6 md:px-12 lg:px-24">
      {/* Tiêu đề */}
      <h1 className="text-4xl md:text-5xl font-notoSansJP font-semibold text-center text-gray-800 mb-12">
        Dịch vụ nổi bật
      </h1>

      {/* Grid Services */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg font-notoSansJP hover:shadow-xl transition-shadow duration-300 p-8 flex flex-col items-center"
          >
            {/* Icon */}
            <div className="bg-blue-100 rounded-full p-4 mb-6">
              {service.icon}
            </div>
            {/* Title */}
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {service.title}
            </h2>
            {/* Description */}
            <p className="text-gray-600 text-center">{service.description}</p>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="text-center mt-16">
        <a
          href="/business" // Đường dẫn tới trang Business
          className="inline-block px-8 py-4 bg-blue-500 text-white text-lg font-semibold rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-300"
        >
          Xem thêm
        </a>
      </div>
    </div>
  );
};

export default FeaturedServices;
